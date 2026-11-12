# Procédure quotidienne (tâche programmée)

Objectif : chaque jour, 2 vidéos TikTok publiées automatiquement via Metricool à **12:00** et **18:00** (Europe/Paris).

## 1. Préparer
- Cloner ce dépôt (shallow) et installer : `pip install --break-system-packages edge-tts` (Playwright/Chromium, ffmpeg et numpy sont normalement présents ; sinon les installer).
- Lire `CHARTE.md`, `FICHE.md`, `HISTORIQUE.md`, `IDEES.md`, `EXPERTISE.md` et **`STATS.md` (leçons à appliquer)**.

## 1 bis. Relever les statistiques
- À chaque passage : relever les stats des 7 derniers jours (voir `STATS.md`), ajouter une ligne au tableau « Relevés ».
- **Le lundi** : analyse complète de la semaine (vidéos qui ont le mieux retenu, partagé, fait gagner des abonnés ; sujets et formats qui marchent) et mise à jour de la section « Leçons actuelles ». Appliquer ces leçons aux vidéos du jour.

## 2. Déterminer les créneaux à remplir
- Jour cible = aujourd'hui si l'heure de Paris est avant 11:15, sinon demain.
- Avec Metricool `getScheduledPosts` (brandId 8028968, timezone Europe/Paris) sur le jour cible : ne remplir que les créneaux 12:00 et/ou 18:00 qui n'ont pas déjà une publication TikTok. Si les deux sont pris, s'arrêter.

## 3. Choisir les sujets
- 12:00 « L'ACTU DE TON ARGENT » : rechercher sur le web l'actualité de la semaine qui touche le portefeuille des Français. **Priorité aux changements concrets et datés** (« ce qui change pour ton argent le JJ mois » : règles bancaires, taux, aides, impôts, prix réglementés), sur le modèle de la vidéo découvert, la plus performante. Choisir le sujet le plus utile, non déjà traité (HISTORIQUE). Fin de vidéo : « Partage à quelqu'un que ça concerne » + abonnement.
- 18:00 « LES SECRETS DE TON BANQUIER · ÉP. N » : prendre le prochain sujet non coché de `IDEES.md` (N = dernier épisode + 1). Respecter la suite annoncée à la fin de l'épisode précédent. Utiliser `EXPERTISE.md` en priorité ; si l'expertise manque pour un sujet qui en dépend, prendre le sujet suivant.

## 4. Vérifier les faits
- Chaque chiffre/règle vérifié sur au moins une source fiable ouverte le jour même. Noter les sources dans la fiche (`sources`).
- Si un fait ne peut pas être confirmé : le retirer ou changer de sujet.

## 5. Fabriquer
- Écrire `fiches/AAAA-MM-JJ-sujet.json` (format `FICHE.md`), **25 à 35 s** : accroche choc dite par l'avatar dès la 1re seconde, chiffre fort dans les 2 premières secondes (`line2` ou `badge`), puis **2 à 3 saynètes avec personnages (`type: saynete`) — obligatoire pour toutes les vidéos depuis le 12/11/2026, plus de cartes de texte seules** —, un seul message. Chaque saynète : une situation jouée, une réaction, un chiffre fort en étiquette.
- `cd atelier && python3 make_video.py ../fiches/X.json ../videos/AAAA-MM-JJ-sujet.mp4`
- **Couverture** : remplir `cover` dans la fiche (titre accrocheur, voir `FICHE.md`). Le générateur crée `videos/AAAA-MM-JJ-sujet.jpg` ; la regarder (Read) et la committer avec la vidéo.
- Regarder la planche `videos/AAAA-MM-JJ-sujet_build/planche.jpg` (Read) : textes lisibles, pas de chevauchement, personnages visibles et non masqués par les étiquettes. Corriger la fiche et regénérer si besoin.
- Supprimer le dossier `_build` (ne pas le committer).

## 6. Publier
- `git add fiches videos (vidéo .mp4 + couverture .jpg) HISTORIQUE.md IDEES.md && git commit && git push` (avant le push : `git fetch origin main && git rebase origin/main`).
- Lien public : `https://raw.githubusercontent.com/bekimdocs-gif/misterbank-videos/main/videos/<fichier>.mp4` — vérifier qu'il répond 200 (`curl -sI`).
- Metricool `createScheduledPost` : blogId 8028968, date `AAAA-MM-JJT12:00:00+01:00` (ou 18:00), info avec `autoPublish: true`, `providers: [{"network":"tiktok"}]`, `media: [lien]`, **`videoThumbnailUrl` = lien public de la couverture `.jpg` (même adresse que la vidéo, extension .jpg ; vérifier qu'il répond 200)**, `text` = description, `tiktokData` avec `title` = même description (obligatoire), `privacyOption: "PUBLIC_TO_EVERYONE"`, `isAigc: true`, `autoAddMusic: false`, `publicationDate: {dateTime, timezone: "Europe/Paris"}`.
- Mettre à jour `HISTORIQUE.md` (et cocher `IDEES.md`), commit + push.

## 7. Compte rendu
Terminer par un court résumé : sujets, heures, liens Metricool (plannerUrl), sources, chiffres clés du relevé de stats (abonnés, meilleure vidéo) et tout problème rencontré. Le lundi, ajouter les leçons de la semaine.
