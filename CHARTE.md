# Charte des vidéos Mister Bank (TikTok)

## Identité
- **Mister Bank**, 34 ans, directeur dans une banque française. Angle : « la banque de l'intérieur », pédagogique, sans jargon, sans promesse miracle. Tutoiement.
- Avatar illustré (ne jamais utiliser de photo réelle) : `atelier/avatar.js`, animé par le générateur (bouche synchronisée, clignements).
- Couleurs : fond bleu nuit, jaune #FFC83D, rouge #FF4757, vert #2EE59D, bleu #4D8BFF. Police Inter Black. 1080×1920, 30 i/s.
- Voix : fr-FR-RemyMultilingualNeural, dynamique (+12 %).
- Hashtag de marque : #misterbank.

## Animation : des personnages en scène (règle depuis le 12 novembre 2026)
**Toutes les vidéos sont animées avec des personnages en pied qui jouent la situation** (saynètes), y compris celles déjà programmées. Mister Bank raconte en haut de l'écran (avatar rond), et en dessous un client, une cliente, un couple ou le conseiller vivent ce qu'il explique : ils entrent en marchant, réagissent (content, inquiet, choqué), tiennent une carte, un téléphone ou un dossier, dans un décor simple (comptoir, bureau de banque, maison).
- Chaque idée = une saynète : une situation, une réaction, un chiffre fort qui « tombe » (étiquette) au moment où la voix le dit.
- Les cartes de texte seules (`point`, `table`, `conseil`) ne sont plus utilisées comme scènes principales. Les chiffres passent par le panneau, l'étiquette ou le bandeau d'une saynète.
- Un changement visible toutes les 2 à 3 secondes : entrée d'un personnage, geste, changement d'humeur, étiquette, bulle.
- Mêmes personnages d'une vidéo à l'autre (le client au pull vert, la cliente au pull corail, le conseiller en costume gris) pour créer l'attachement.
- Format technique : scènes `saynete` (voir `FICHE.md`), code dans `atelier/saynete.js`. Si une situation demande un décor ou un accessoire qui n'existe pas, l'ajouter dans `atelier/saynete.js` plutôt que de revenir aux cartes de texte.

## Structure (25 à 35 s)
1. Accroche choc dite par l'avatar dès la 1re seconde (question qui touche, chiffre, alerte), chiffre fort à l'écran dans les 2 premières secondes. Mot-clé de recherche dans les 5 premières secondes.
2. 2 à 3 saynètes avec personnages, un chiffre concret par saynète, un seul message par vidéo.
3. Conseil de banquier (avis personnel, prudent), donné dans la dernière saynète (bulle ou bandeau).
4. Fin : abonnement + suite annoncée (prochain épisode) ou « partage à quelqu'un que ça concerne ».
5. Mentions : sources datées, « contenu pédagogique, pas un conseil personnalisé ».

## Séries
- 12 h : **L'ACTU DE TON ARGENT** — une actualité récente qui touche le portefeuille des Français.
- 18 h : **LES SECRETS DE TON BANQUIER · ÉP. N** — pédagogie crédit / épargne / budget / banque, numérotée.

## Description TikTok (texte du post)
Mot-clé au début, une phrase avec un chiffre, une seule demande (commente / enregistre / partage), 3 à 5 hashtags dont #misterbank. Moins de 300 caractères.

## Règles impératives
- Chiffres vérifiés le jour même sur des sources fiables (sites officiels, Banque de France, service-public, presse financière reconnue), avec la source à l'écran. Taux toujours datés.
- Jamais de conseil personnalisé, de promesse de gain, de placement risqué présenté comme sûr, ni de produit d'une banque précise mis en avant.
- Jamais de client réel. Jamais de rumeur non confirmée présentée comme un fait (dire « projection », « pourrait »).
- Toujours déclarer le contenu généré par IA (isAigc = true).
- En cas de doute sur un fait : ne pas publier le sujet, en choisir un autre.
