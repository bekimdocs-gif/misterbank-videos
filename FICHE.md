# Format d'une fiche vidéo (`fiches/AAAA-MM-JJ-sujet.json`)

```json
{
 "id": "2026-11-12-livret-a",
 "series": "L'ACTU DE TON ARGENT",            // bandeau en haut (ou "LES SECRETS DE TON BANQUIER · ÉP. N"), null pour aucun
 "footer": "Contenu pédagogique, pas un conseil personnalisé",
 "sources": "Sources : ... (date)",            // affiché en petit à la fin, obligatoire si chiffres
 "scenes": [ ... ]
}
```

Chaque scène a `type` et `cues` (phrases dites par l'avatar). Une cue = `{"text": "...", "say": "...", "cap": "..."}` :
- `text` : phrase (affichée en sous-titres) ; `say` (optionnel) : version écrite en toutes lettres pour la voix (nombres décimaux, sigles) ;
- `cap` (optionnel) : sous-titre différent. La 1re cue du hook n'a pas de sous-titre (le texte est déjà à l'écran).

Types de scènes :
- `hook` : `line1` (blanc), `line2` (jaune), `badge` (tampon rouge, optionnel), `sub` (petit, optionnel). Avatar en grand. 3 premières secondes = accroche choc.
- `point` : `n` ("1".."4" ou ""), `color` (y, g, b, r), `title`, `big` (chiffre/texte fort, ≤ 16 caractères), `sub`, `chips` (0 à 4 étiquettes courtes ≤ 22 caractères), `note` (bandeau final ≤ 40 caractères).
- `conseil` : `lines` (1 ou 2 phrases ≤ 60 caractères) — le conseil personnel de Mister Bank.
- `cta` : `main` (ex. ABONNE-TOI / ENREGISTRE / PARTAGE), `sub`, `next` (["Prochain épisode :", "titre"]) pour annoncer la suite.

Durée cible : 25 à 35 s (hook + 2 à 3 points + conseil + cta). Pas de vidéo de présentation. Textes courts, un chiffre concret par point.

- `table` : tableau récapitulatif qui se remplit ligne par ligne. `title`, `color`, `rows` (8 max) : `{"l": libellé, "sub": précision (optionnel), "v": valeur, "color": y/g/b/r, "hl": true pour la ligne mise en avant, "cue": numéro de la phrase qui fait apparaître la ligne, "at": moment dans cette phrase (0 à 1)}`.
