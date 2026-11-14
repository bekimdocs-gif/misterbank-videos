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

## Image de présentation (règle depuis le 12 novembre 2026)
Chaque vidéo a une **couverture avec un titre accrocheur** : avatar de Mister Bank, titre en deux lignes (blanc + jaune), bandeau rouge, logo. Elle sert d'image dans le fil d'actualité et la grille du profil. Champ `cover` de la fiche (voir `FICHE.md`) ; elle est incrustée en première image de la vidéo et envoyée à Metricool (`videoThumbnailUrl`). Le titre doit donner envie de cliquer sans jamais promettre autre chose que le contenu.

## Structure (25 à 35 s)
1. Accroche choc dite par l'avatar dès la 1re seconde (question qui touche, chiffre, alerte), chiffre fort à l'écran dans les 2 premières secondes. Mot-clé de recherche dans les 5 premières secondes.
2. 2 à 3 saynètes avec personnages, un chiffre concret par saynète, un seul message par vidéo.
3. Conseil de banquier (avis personnel, prudent), donné dans la dernière saynète (bulle ou bandeau).
4. Fin : abonnement + suite annoncée (prochain épisode) ou « partage à quelqu'un que ça concerne ».
5. Mentions : sources datées, « contenu pédagogique, pas un conseil personnalisé ».

## Séries
- 12 h : **L'ACTU DE TON ARGENT** — une actualité récente qui touche le portefeuille des Français.
- 18 h : **LES SECRETS DE TON BANQUIER · ÉP. N** — pédagogie crédit / épargne / budget / banque, numérotée.
- 20 h 30 : **À TOI DE JOUER** — vidéo participative (vote ou réponse en commentaire), un format par jour de la semaine. Voir ci-dessous.

## « À toi de jouer » : la vidéo participative de 20 h 30 (décision du 14 novembre 2026)
Demande de Mister Bank : une vidéo par jour, **en complément** des deux autres (qui ne changent pas), pour faire commenter et s'abonner. Six formats en rotation :

| Jour | Format | Principe |
|---|---|---|
| Lundi | **Vrai ou faux ?** | Une idée reçue sur la banque. Le public répond, verdict à la fin. |
| Mardi | **Le duel** | Deux options face à face (Livret A ou assurance-vie, louer ou acheter, 20 ou 25 ans). Chiffres des deux côtés, pas de gagnant imposé : « ça dépend de… ». |
| Mercredi | **Accepté ou refusé ?** | Un dossier de crédit fictif (revenus, apport, relevés). Le public vote, verdict du banquier à la fin, avec la raison. |
| Jeudi | **Tu as X € : tu en fais quoi ?** | Une somme (500, 1 000, 10 000 €…), 2 ou 3 usages possibles expliqués. |
| Vendredi | **Le mot du banquier** | Un mot de jargon expliqué en 15 à 20 s (TAEG, taux d'usure, agios…). |
| Samedi | **Réponse à un commentaire** | La vidéo répond à un vrai commentaire reçu (texte cité sans le nom de la personne). S'il n'y en a aucun d'exploitable : « la question qu'on pose le plus à un banquier ». Ne jamais inventer un commentaire. |
| Dimanche | **Accepté ou refusé ?** (rendez-vous de la semaine) | Nouveau dossier, numéroté (« dossier n° N »), suite annoncée : « prochain dossier mercredi ». |

Règles propres à ce créneau :
- **Le vote est demandé dans les 5 premières secondes** : « Écris VRAI ou FAUX », « A ou B », « ACCEPTÉ ou REFUSÉ » en commentaire, écrit en gros à l'écran. **La réponse n'arrive qu'à la fin** (la saynète fait monter le suspense).
- 20 à 30 s (15 à 20 s pour le mot du banquier). Saynètes avec personnages comme les autres vidéos ; pour « Accepté ou refusé », le dossier est joué au bureau entre le client et le conseiller, et le verdict ACCEPTÉ (vert) ou REFUSÉ (rouge) tombe à la fin en étiquette choc (un vrai effet « tampon » peut être ajouté dans `atelier/saynete.js`).
- Fin : « Tu avais bon ? Dis-le en commentaire » + abonnement + annonce du rendez-vous suivant.
- Commentaire à épingler fourni dans le compte rendu (la question du vote).
- Dossiers et situations **toujours fictifs**, mention « exemple fictif — chaque banque a ses propres critères ». Jamais de conseil d'investissement : on explique les options, on ne dit pas quoi choisir.
- Le sticker « Sondage » de TikTok ne peut pas être ajouté en publication automatique (il n'existe que dans l'application) : le vote passe par les commentaires.

## Description TikTok (texte du post)
Mot-clé au début, une phrase avec un chiffre, une seule demande (commente / enregistre / partage), 3 à 5 hashtags dont #misterbank. Moins de 300 caractères.

## Règles impératives
- Chiffres vérifiés le jour même sur des sources fiables (sites officiels, Banque de France, service-public, presse financière reconnue), avec la source à l'écran. Taux toujours datés.
- Jamais de conseil personnalisé, de promesse de gain, de placement risqué présenté comme sûr, ni de produit d'une banque précise mis en avant.
- Jamais de client réel. Jamais de rumeur non confirmée présentée comme un fait (dire « projection », « pourrait »).
- Toujours déclarer le contenu généré par IA (isAigc = true).
- En cas de doute sur un fait : ne pas publier le sujet, en choisir un autre.
