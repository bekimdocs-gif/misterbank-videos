import json, numpy as np, wave
SR=48000
d=json.load(open("events.json")); tl=json.load(open("timeline.json"))
N=int((d["total"]+0.5)*SR); rs=np.random.default_rng(1)
def env(n,a=0.005,r=None):
    t=np.arange(n)/SR; e=np.minimum(1,t/a); 
    if r: e*=np.exp(-t/r)
    return e
def noise(n): return rs.standard_normal(n)
def lp(x,k):  # simple one-pole lowpass, k in (0,1)
    y=np.empty_like(x); acc=0.
    for i in range(len(x)): acc+=k*(x[i]-acc); y[i]=acc
    return y
def bp_sweep(n,f0,f1):
    x=noise(n); t=np.arange(n)/SR; f=np.linspace(f0,f1,n); 
    return x*np.sin(2*np.pi*np.cumsum(f)/SR)
def sine_sweep(n,f0,f1): f=np.geomspace(f0,f1,n); return np.sin(2*np.pi*np.cumsum(f)/SR)
def S(sec): return int(sec*SR)
def sfx(type_,amp):
    if type_ in("whoosh","whoosh_up"):
        n=S(.45); x=lp(noise(n),.12); e=np.sin(np.linspace(0,np.pi,n))**2
        if type_=="whoosh_up": x=x*0.6+0.4*sine_sweep(n,200,1200)*0.5
        return x*e*1.6
    if type_=="swish":
        n=S(.22); x=lp(noise(n),.25)*np.sin(np.linspace(0,np.pi,n))**2; return x*1.0
    if type_=="pop":
        n=S(.12); return sine_sweep(n,900,250)*env(n,.002,.035)*0.7
    if type_=="impact":
        n=S(.9); boom=sine_sweep(n,110,40)*env(n,.002,.25); cr=lp(noise(n),.3)*env(n,.001,.05)
        return (boom*1.2+cr*.6)*max(amp,.4)
    if type_=="riser":
        n=S(.7); x=lp(noise(n),.2)*np.linspace(0,1,n)**2+0.3*sine_sweep(n,300,1400)*np.linspace(0,1,n); return x*0.5
    if type_=="count":
        dur=amp; n=S(dur+.1); out=np.zeros(n); k=0
        tk=S(.012); click=np.sin(2*np.pi*2400*np.arange(tk)/SR)*np.exp(-np.arange(tk)/SR/.003)
        for tt in np.arange(0,dur,0.045):
            i=S(tt); out[i:i+tk]+=click*0.35
        return out
    if type_=="ding":
        n=S(.8); t=np.arange(n)/SR; return (np.sin(2*np.pi*1318*t)+.5*np.sin(2*np.pi*1976*t))*env(n,.002,.22)*0.35
    if type_=="bell":
        n=S(1.0); t=np.arange(n)/SR; x=np.sin(2*np.pi*1046*t)*env(n,.002,.2); x[S(.15):]+=np.sin(2*np.pi*1568*t[:n-S(.15)])*env(n-S(.15),.002,.3)
        return x*.35
    if type_=="drop":
        n=S(.25); return sine_sweep(n,220,90)*env(n,.002,.07)*0.8
    if type_=="down":
        n=S(.9); return sine_sweep(n,700,160)*env(n,.01)*np.linspace(1,0,n)*0.35
    if type_=="shine":
        n=S(.9); t=np.arange(n)/SR; x=sum(np.sin(2*np.pi*f*t)*np.exp(-t/.4)*np.minimum(1,t/.01) for f in (2093,2637,3136)); return x*0.12
    if type_=="coins":
        n=S(1.2); out=np.zeros(n)
        for k in range(10):
            i=S(k*0.09+rs.random()*0.03); m=S(.15); tt=np.arange(m)/SR; f=3000+rs.random()*1500
            seg=(np.sin(2*np.pi*f*tt)+.5*np.sin(2*np.pi*f*1.5*tt))*np.exp(-tt/.04)*0.25; out[i:i+m]+=seg[:max(0,min(m,n-i))]
        return out
    if type_=="vault":
        n=S(1.4); x=np.zeros(n); tk=S(.03)
        for k in range(8):
            i=S(k*0.16); seg=lp(noise(tk),.4)*np.exp(-np.arange(tk)/SR/.008); x[i:i+tk]+=seg*0.8
        i=S(1.3); m=min(n-i,S(.1)); x[i:i+m]+=(sine_sweep(m,120,60)*0.8)[:m]; return x
    if type_=="tick":
        dur=amp; n=S(dur+.1); out=np.zeros(n); tk=S(.02); click=lp(noise(tk),.6)*np.exp(-np.arange(tk)/SR/.004)
        for tt in np.arange(0,dur,0.25): i=S(tt); out[i:i+tk]+=click*0.6
        return out
    return np.zeros(10)
fx=np.zeros(N)
for e in d["ev"]:
    x=sfx(e["type"],e["amp"]); i=max(0,S(e["t"])); j=min(N,i+len(x)); fx[i:j]+=x[:j-i]
# music
mu=np.zeros(N); bpm=118; beat=60/bpm; start=0.3
chords=[(48,52,55),(55,59,62),(57,60,64),(53,57,60)]  # Am F C G
m2f=lambda m:440*2**((m-69)/12)
kick_n=S(.35); kt=np.arange(kick_n)/SR; kick=np.sin(2*np.pi*np.cumsum(np.geomspace(150,45,kick_n))/SR)*np.exp(-kt/.12)
hat_n=S(.05); hat=np.diff(noise(hat_n+1))*np.exp(-np.arange(hat_n)/SR/.012)*0.25
b=0; t=start
while t<d["total"]+.2:
    i=S(t); bar=int(b//4); ch=chords[bar%4]
    def add(x,at):
        j=min(N,at+len(x)); 
        if at<N: mu[at:j]+=x[:j-at]
    add(kick*0.9,i)
    add(hat,S(t+beat/2))
    if b%4 in(1,3): add(lp(noise(S(.15)),.5)*np.exp(-np.arange(S(.15))/SR/.04)*0.35,i)  # snare-ish
    for k in range(2):  # bass eighths
        n=S(beat/2*0.9); tt=np.arange(n)/SR; f=m2f(ch[0]-24)
        add(np.tanh(2*np.sin(2*np.pi*f*tt))*np.exp(-tt/.15)*0.35,S(t+k*beat/2))
    if b%4==0:  # pad
        n=S(beat*4); tt=np.arange(n)/SR; pad=sum(np.sin(2*np.pi*m2f(m)*tt)+.3*np.sin(2*np.pi*m2f(m)*2.003*tt) for m in ch)
        pad*=np.minimum(1,tt/.3)*np.minimum(1,(tt[::-1])/.3)*0.07; add(pad,i)
    b+=1; t+=beat
# voice
vo=np.zeros(N)
for c in tl["cues"]:
    w=wave.open(f"vo/{c['id']}.wav"); x=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16)/32768; i=S(c["start"]); vo[i:i+len(x)]+=x
def save(name,x):
    x=x/ (np.abs(x).max()+1e-9)*0.9; w=wave.open(name,"wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x*32767).astype(np.int16).tobytes()); w.close()
save("a_vo.wav",vo); save("a_fx.wav",fx); save("a_mu.wav",mu)
print("ok",N/SR)
