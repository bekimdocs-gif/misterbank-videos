#!/usr/bin/env python3
"""Mister Bank video generator.
Usage: python3 make_video.py fiche.json sortie.mp4
Builds voice (edge-tts), lip-sync avatar animation (Playwright canvas), sound design, captions -> MP4 1080x1920 30fps.
Dependencies: pip install --break-system-packages edge-tts ; playwright + chromium ; ffmpeg ; numpy."""
import asyncio, ssl, os, sys, json, subprocess, shutil, wave
import numpy as np
HERE=os.path.dirname(os.path.abspath(__file__))
VOICE=os.environ.get("VOICE","fr-FR-RemyMultilingualNeural"); FPS=30

def tts(text,out):
    # cache : une phrase déjà synthétisée n'est plus redemandée (utile quand le service de voix coupe)
    import hashlib
    cdir=os.path.expanduser("~/.cache/misterbank-voix");os.makedirs(cdir,exist_ok=True)
    cf=os.path.join(cdir,hashlib.sha1((VOICE+"|"+text).encode()).hexdigest()+".mp3")
    if os.path.exists(cf) and os.path.getsize(cf)>1000: shutil.copy(cf,out); return
    _tts(text,out)
    if os.path.exists(out) and os.path.getsize(out)>1000: shutil.copy(out,cf)
def _tts(text,out):
    import edge_tts, edge_tts.communicate as c
    ca=os.path.expanduser("~/.ccr/ca-bundle.crt")
    if os.path.exists(ca): c._SSL_CTX=ssl.create_default_context(cafile=ca)
    async def go(rate): await edge_tts.Communicate(text,VOICE,**({"rate":rate} if rate else {})).save(out)
    import time
    for k in range(4):
        try: asyncio.run(go("+12%")); return
        except Exception as e: time.sleep(3)
    # secours : le service refuse parfois le réglage de vitesse -> voix normale accélérée de 12 % par ffmpeg
    for k in range(3):
        try:
            asyncio.run(go(None)); tmp=out+".lent.mp3"; os.replace(out,tmp)
            subprocess.run(["ffmpeg","-v","error","-y","-i",tmp,"-filter:a","atempo=1.12",out],check=True); os.remove(tmp); return
        except Exception as e:
            if k==2: raise
def run(*a): subprocess.run(list(a),check=True)
def dur(p): return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",p]))

def main(spec_path,out_path):
    spec=json.load(open(spec_path))
    work=os.path.abspath(os.path.splitext(out_path)[0]+"_build"); shutil.rmtree(work,ignore_errors=True); os.makedirs(work+"/vo")
    # 1. voice per cue + timeline
    cues=[];t=0.3;k=0
    for i,sc in enumerate(spec["scenes"]):
        for j,cu in enumerate(sc["cues"]):
            cid=f"c{k}";k+=1
            tts(cu.get("say",cu["text"]),f"{work}/vo/{cid}.mp3")
            run("ffmpeg","-v","error","-y","-i",f"{work}/vo/{cid}.mp3","-af","silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse","-ar","48000","-ac","1",f"{work}/vo/{cid}.wav")
            d=dur(f"{work}/vo/{cid}.wav")
            cap=cu.get("cap",cu["text"]) if sc["type"]!="hook" or j>0 else cu.get("cap")
            cues.append(dict(scene=f"s{i}",id=cid,start=round(t,3),dur=round(d,3),text=cu["text"],cap=cap))
            t+=d+(0.35 if j==len(sc["cues"])-1 else 0.12)
    total=round(t+0.6,2); TL=dict(cues=cues,total=total)
    json.dump(TL,open(f"{work}/timeline.json","w"),ensure_ascii=False)
    open(f"{work}/timeline.js","w").write("window.TL="+json.dumps(TL,ensure_ascii=False)+";")
    open(f"{work}/spec.js","w").write("window.SPEC="+json.dumps(spec,ensure_ascii=False)+";")
    # 2. lip sync
    SR=48000;N=int((total+.5)*SR);vo=np.zeros(N)
    for c in cues:
        w=wave.open(f"{work}/vo/{c['id']}.wav");x=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16)/32768;i=int(c['start']*SR);vo[i:i+len(x)]+=x[:max(0,N-i)]
    F=int(total*FPS)+2;hop=SR//FPS;r=np.array([np.sqrt(np.mean(vo[q*hop:(q+1)*hop]**2)) if q*hop<N else 0 for q in range(F)])
    p=np.percentile(r[r>0.005],90);m=np.clip((r-0.01)/(p-0.01),0,1);sm=m.copy()
    for q in range(1,F): sm[q]=0.55*m[q]+0.45*sm[q-1]
    open(f"{work}/mouth.js","w").write("window.MOUTH="+json.dumps([round(float(v),3) for v in sm])+";")
    # 3. html
    shutil.copy(f"{HERE}/avatar.js",work)
    js="\n".join(open(f"{HERE}/{f}").read() for f in ["base.js","engine.js","saynete.js","captions_engine.js","events_main.js","cover.js"])
    html=('<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#000}canvas{display:block}</style>'
          '<script src="timeline.js"></script><script src="spec.js"></script><script src="avatar.js"></script><script src="mouth.js"></script>'
          '</head><body><canvas id="c" width="1080" height="1920"></canvas><script>'+js+'</script></body></html>')
    open(f"{work}/index.html","w").write(html)
    # 4. render
    from playwright.sync_api import sync_playwright
    with sync_playwright() as pw:
        b=pw.chromium.launch();pg=b.new_page(viewport={"width":1080,"height":1920})
        errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
        pg.goto("file://"+work+"/index.html");pg.wait_for_timeout(600);pg.evaluate("document.fonts.ready")
        if errs: raise RuntimeError("JS error: "+"; ".join(errs))
        if os.environ.get("STILLS"):
            os.makedirs(work+"/t",exist_ok=True)
            for q in os.environ["STILLS"].split(","):
                pg.evaluate(f"draw({q})");pg.screenshot(path=f"{work}/t/{q}.jpg",type="jpeg",quality=80)
            print("stills",pg.evaluate("JSON.stringify(SCN.map(s=>[SS[s],SE[s]]))"));return
        json.dump(pg.evaluate("({ev:EVENTS,total:TOTAL})"),open(f"{work}/events.json","w"))
        # cover image (also baked into the first frames of the video)
        cover=os.path.splitext(os.path.abspath(out_path))[0]+".jpg"
        pg.evaluate("drawCover()");pg.screenshot(path=cover,type="jpeg",quality=92)
        # check stills (one per scene, at 80% of scene)
        os.makedirs(work+"/stills",exist_ok=True)
        ss=pg.evaluate("SCN.map(s=>[SS[s],SE[s]])")
        for n,(a,e) in enumerate(ss):
            pg.evaluate(f"draw({a+(e-a)*0.8})");pg.screenshot(path=f"{work}/stills/scene{n}.jpg",type="jpeg",quality=80)
        tmp=f"{work}/video.tmp.mp4"
        ff=subprocess.Popen(["ffmpeg","-v","error","-y","-f","image2pipe","-framerate",str(FPS),"-c:v","mjpeg","-i","-","-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p",tmp],stdin=subprocess.PIPE)
        for f in range(int(total*FPS)):
            pg.evaluate(f"draw({f/FPS})");ff.stdin.write(pg.screenshot(type="jpeg",quality=90))
        ff.stdin.close()
        if ff.wait()!=0: raise RuntimeError("ffmpeg render failed")
        b.close()
    os.rename(tmp,f"{work}/video_only.mp4")
    run("ffmpeg","-v","error","-y","-pattern_type","glob","-i",f"{work}/stills/scene*.jpg","-vf","scale=270:-1,tile=8x1","-frames:v","1",f"{work}/planche.jpg")
    # 5. audio
    subprocess.run([sys.executable,"-I",f"{HERE}/audio.py"],cwd=work,check=True)
    run("ffmpeg","-v","error","-y","-i",f"{work}/a_vo.wav","-i",f"{work}/a_fx.wav","-i",f"{work}/a_mu.wav","-filter_complex",
        "[0:a]asplit=2[v][vsc];[2:a]volume=0.22[m];[m][vsc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[md];[1:a]volume=0.30[f];[v][f][md]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[out]",
        "-map","[out]","-ar","48000",f"{work}/mix.wav")
    run("ffmpeg","-v","error","-y","-i",f"{work}/video_only.mp4","-i",f"{work}/mix.wav","-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","192k","-shortest",out_path)
    print(json.dumps({"video":os.path.abspath(out_path),"couverture":os.path.splitext(os.path.abspath(out_path))[0]+".jpg","duree":total,"planche":work+"/planche.jpg"}))

if __name__=="__main__": main(sys.argv[1],sys.argv[2])
