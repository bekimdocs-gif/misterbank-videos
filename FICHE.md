# Format d'une fiche vidéo (`fiches/AAAA-MM-JJ-sujet.json`)

```json
{
 "id": "2026-11-12-livret-a",
 "series": "L'ACTU DE TON ARGENT",            // bandeau en haut (ou "LES SECRETS DE TON BANQUIER · ÉP. N"), null pour aucun
 "footer": "Contenu pédagogique, pas un conseil personnalisé",
 "sources": "Sources : ... (date)",            // affiché en petit à la fin, obligatoire si chiffres
 "cover": {"l1": "1 € DÉPENSÉ", "l2": "8 € DE FRAIS ?!", "badge": "LE PIÈGE DU DÉCOUVERT"},   // image de présentation, OBLIGATOIRE
 "scenes": [ ... ]
}
```

### Couverture (`cover`) — obligatoire
Image de présentation de la vidéo (fil d'actualité, grille du profil), avec le **titre accrocheur**. Le générateur la dessine, l'enregistre à côté de la vidéo (`videos/<nom>.jpg`) et l'incruste en toute première image de la vidéo.
- `l1` (blanc, ≤ 20 caractères) + `l2` (jaune, ≤ 20 caractères) = le titre accrocheur : un chiffre ou une question qui pique la curiosité, compréhensible sans le son ni la description. `badge` (rouge, ≤ 26 caractères) = la promesse ou le contexte.
- Exemples : « 1 € DÉPENSÉ / 8 € DE FRAIS ?! / LE PIÈGE DU DÉCOUVERT », « EMPRUNTER 250 000 € / TON SALAIRE MINIMUM / LE CALCUL EN 30 SECONDES ».
- Pas de promesse mensongère : le titre doit correspondre exactement au contenu. Si `cover` est absent, le générateur reprend `line1`, `line2`, `badge` du hook.
- Vérifier l'image `videos/<nom>.jpg` (Read) : titre lisible en petit, rien de coupé.

Chaque scène a `type` et `cues` (phrases dites par l'avatar). Une cue = `{"text": "...", "say": "...", "cap": "..."}` :
- `text` : phrase (affichée en sous-titres) ; `say` (optionnel) : version écrite en toutes lettres pour la voix (nombres décimaux, sigles) ;
- `cap` (optionnel) : sous-titre différent. La 1re cue du hook n'a pas de sous-titre (le texte est déjà à l'écran).

**Règle : une vidéo = `hook` + 2 à 3 `saynete` + `cta`.** Les types `point`, `table`, `conseil` restent disponibles mais ne doivent plus servir de scènes principales (voir CHARTE.md).

### Scène `saynete` (personnages en pied)
```json
{"type":"saynete","title":"À LA BANQUE","color":"b","decor":"bureau","decorLabel":null,
 "persos":[
   {"qui":"conseiller","derriere":true,"x":790,"regarde":"gauche","tient":"dossier"},
   {"qui":"client","x":270,"humeur":"ok","reactions":[{"mot":"1 356","humeur":"choc","bras":"haut"},{"mot":"Maximum","humeur":"ok","bras":"repos"}]}],
 "panneau":[{"l":"Durée","sub":"optionnel","v":"25 ans","color":"y","mot":"25 ans"}],
 "bulles":[{"perso":1,"texte":"Combien ?!","mot":"1 356"}],
 "tag":{"big":"1 356 € / mois","sub":"assurance comprise","mot":"1 356","color":"y","w":620},
 "note":{"texte":"Maximum : 35 % de tes revenus","mot":"Maximum","color":"r"},
 "cues":[{"text":"...","say":"..."}]}
```
- `decor` : `pyramide` (pyramide de l'épargne à 3 étages ; `etage` = 0 précaution, 1 moyen terme, 2 long terme, l'étage actif s'allume ; `etages` pour changer les libellés), `comptoir` (caisse + terminal de paiement, `decorLabel` = enseigne, défaut CAFÉ), `bureau` (bureau de banque), `maison` (`decorLabel` = pancarte, ex. un prix), ou absent. Le décor occupe la droite (x 480 à 940).
- `persos` (1 à 3) : `qui` = `client`, `cliente`, `client2`, `cliente2`, `conseiller`. `x` = position (défaut 300, ou 230 et 440 à deux ; rester à gauche du décor, sauf `derriere`). `derriere: true` = placé derrière le bureau ou le comptoir (x ≈ 790, `regarde: "gauche"`). `tient` = `carte`, `telephone`, `dossier`. `humeur` = `content`, `ok`, `inquiet`, `choc`. `bras` = `repos`, `haut`, `pointe`, `tend`, `salut`, `hanches`. `nom` = prénom affiché sous le personnage (ex. "HERVÉ"). `entre` = `{"mot": "..."}` pour faire entrer le personnage plus tard. `taille` (défaut 0.9, ou 0.8 avec un panneau).
- `reactions` : changements d'humeur ou de bras déclenchés par un mot de la voix. **`mot` doit être un extrait exact du champ `text` d'une cue de la scène** (sinon erreur). On peut aussi utiliser `"at": 0.5` (fraction de la scène).
- `panneau` : 1 à 3 lignes en haut (libellé `l`, précision `sub`, valeur `v`), chacune déclenchée par `mot`.
- `tag` (ou `tags`) : l'étiquette choc avec le chiffre fort (`big` ≤ 14 caractères, `sub` ≤ 34), couleur `r`, `y`, `g`, `b`. Position par défaut : au-dessus des personnages (ou à droite s'il y a un panneau) ; `x`, `y`, `w` pour ajuster.
- `bulles` : bulle de dialogue au-dessus d'un personnage (`perso` = rang dans la liste, texte ≤ 22 caractères). Ne pas combiner avec un panneau.
- `note` : bandeau en bas (≤ 40 caractères), texte simple ou `{"texte","mot","color"}`.
- Toujours vérifier la planche : personne ne doit être caché par l'étiquette, rien ne doit déborder.

Saynètes spéciales déjà prêtes (exemple : `fiches/essai-commissions-intervention.json`) : `sk_comptoir` (paiement par carte, jauge du découvert, étiquette de frais), `sk_compteur` (10 tickets qui s'additionnent jusqu'à un plafond), `sk_calendrier` (frise de deux mois, prélèvement qui tombe plus tard).

Types de scènes :
- `hook` : `line1` (blanc), `line2` (jaune), `badge` (tampon rouge, optionnel), `sub` (petit, optionnel). Avatar en grand. 3 premières secondes = accroche choc.
- `point` : `n` ("1".."4" ou ""), `color` (y, g, b, r), `title`, `big` (chiffre/texte fort, ≤ 16 caractères), `sub`, `chips` (0 à 4 étiquettes courtes ≤ 22 caractères), `note` (bandeau final ≤ 40 caractères).
- `conseil` : `lines` (1 ou 2 phrases ≤ 60 caractères) — le conseil personnel de Mister Bank.
- `cta` : `main` (ex. ABONNE-TOI / ENREGISTRE / PARTAGE), `sub`, `next` (["Prochain épisode :", "titre"]) pour annoncer la suite.

Durée cible : 25 à 35 s (hook + 2 à 3 saynètes + cta). Pas de vidéo de présentation. Textes courts, un chiffre concret par point.

- `table` : tableau récapitulatif qui se remplit ligne par ligne. `title`, `color`, `rows` (8 max) : `{"l": libellé, "sub": précision (optionnel), "v": valeur, "color": y/g/b/r, "hl": true pour la ligne mise en avant, "cue": numéro de la phrase qui fait apparaître la ligne, "at": moment dans cette phrase (0 à 1)}`.
