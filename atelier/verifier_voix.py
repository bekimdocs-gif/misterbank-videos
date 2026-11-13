"""Contrôle de la voix avant publication.

Réécoute chaque phrase synthétisée (dossier *_build/vo) avec une reconnaissance vocale
et la compare au texte prévu. Si une phrase est mal prononcée (mot avalé, accent étranger,
mot inventé), le script l'affiche et sort en erreur : il faut alors reformuler cette phrase
dans la fiche (champ "say" ou "text") et refabriquer la vidéo.

Usage : python3 verifier_voix.py ../videos/AAAA-MM-JJ-sujet.mp4
Dépendance : pip install --break-system-packages faster-whisper
"""
import sys, os, json, re, subprocess, unicodedata, difflib
import numpy as np

SEUIL = 0.80  # ressemblance minimale entre ce qui est dit et ce qui est prévu

UNITES = {"zero": "0", "un": "1", "une": "1", "deux": "2", "trois": "3", "quatre": "4", "cinq": "5",
          "six": "6", "sept": "7", "huit": "8", "neuf": "9", "dix": "10", "vingt": "20"}

def norm(t):
    t = unicodedata.normalize("NFD", t.lower())
    t = "".join(ch for ch in t if unicodedata.category(ch) != "Mn")
    t = re.sub(r"[^a-z0-9 ]", " ", t.replace("'", " ").replace("-", " "))
    return [UNITES.get(w, w) for w in t.split()]

def score(a, b):
    return difflib.SequenceMatcher(None, " ".join(norm(a)), " ".join(norm(b))).ratio()

def main(video):
    build = os.path.splitext(os.path.abspath(video))[0] + "_build"
    tl = json.load(open(os.path.join(build, "timeline.json")))
    from faster_whisper import WhisperModel
    m = WhisperModel("small", device="cpu", compute_type="int8")
    mauvais = []
    for cu in tl["cues"]:
        raw = subprocess.check_output(["ffmpeg", "-v", "error", "-i", os.path.join(build, "vo", cu["id"] + ".wav"),
                                       "-ar", "16000", "-ac", "1", "-f", "s16le", "-"])
        audio = np.frombuffer(raw, dtype="int16").astype("float32") / 32768
        entendu = " ".join(s.text for s in m.transcribe(audio, language="fr", beam_size=5)[0]).strip()
        s = score(cu["text"], entendu)
        print(f"{'OK ' if s >= SEUIL else 'KO '} {s:.2f} | prévu : {cu['text']}\n          entendu : {entendu}")
        if s < SEUIL: mauvais.append(cu["text"])
    if mauvais:
        print("\nVOIX À CORRIGER - reformuler ces phrases dans la fiche puis refabriquer :")
        for t in mauvais: print(" -", t)
        sys.exit(1)
    print("\nVoix OK")

if __name__ == "__main__":
    main(sys.argv[1])
