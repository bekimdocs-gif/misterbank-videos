# Statistiques et leçons (à lire avant de choisir les sujets)

## Leçons actuelles (mises à jour le 13/11/2026)
0. **Les saynètes avec personnages retiennent mieux** (premiers chiffres, à confirmer sur plusieurs jours) : 33 % de la vidéo regardée en moyenne et 8 % de vues complètes, contre 20 % et 4,5 % pour les anciennes vidéos à cartes de texte. Garder le format.
1. **L'actu concrète qui touche le portefeuille marche le mieux.** « Découvert : ce qui change le 20 novembre » : 11,1 s de visionnage moyen (2× les autres), 10 j'aime et 3 partages sur 22 j'aime / 4 partages au total.
2. **Les présentations retiennent peu** (3-4 s) : ne plus en produire ; la vidéo avatar est épinglée sur le profil.
3. **Le décrochage est rapide** (10 à 20 % de la vidéo regardée en moyenne) : vidéos courtes (25-35 s), avatar + phrase choc dès la 1re seconde, chiffre fort dans les 2 premières secondes, un seul message par vidéo.
5. **Toutes les vidéos plafonnent entre 240 et 300 vues** : TikTok ne les pousse pas au-delà du premier cercle. Leviers à tester : accroche encore plus courte, sujets d'actu dans l'heure, réponses aux commentaires.
4. **Les formats « partage à quelqu'un que ça concerne »** génèrent des partages : les utiliser sur les sujets d'actu.

## Relevés
| Date du relevé | Abonnés | Vues cumulées | Meilleure vidéo (vues · temps moyen) | Remarque |
|---|---|---|---|---|
| 2026-11-11 13:30 | 4 | 877 | Découvert 20 novembre (158 · 11,1 s) | 5 vidéos publiées en 1 h, compte neuf |
| 2026-11-12 08:35 | 10 | 1 875 | Faillite banque Paraguay (286 · 7,5 s) ; meilleure rétention : Découvert 20 novembre (277 · 12,6 s, 26 j'aime, 4 partages) | 8 vidéos ; « Poutine 3 impacts » 258 vues · 8,8 s · 1 abonné en 13 h ; ép. 1 négocier taux bloqué à 3 vues |
| 2026-11-13 08:40 | 12 | ≈ 2 520 (10 vidéos sur 7 j) | Faillite banque Paraguay (300 · 7,5 s) ; meilleure rétention et engagement : Découvert 20 novembre (282 · 12,5 s, 26 j'aime, 4 partages, 2 abonnés) | Poutine 264 · 8,7 s ; ép. 2 refus crédit 259 · 4,7 s ; Livret A 242 · 4,2 s ; commissions d'intervention (publiée 8 h) 59 vues · 5,2 s · 10,5 % vue en entier ; ép. 1 négocier taux absent des données ; 69 j'aime au total |
| 2026-11-13 12:20 | 12 | ≈ 2 990 (13 vidéos) | Faillite banque Paraguay (300 · 7,5 s) ; meilleur engagement : Découvert 20 novembre (26 j'aime, 4 partages, 2 abonnés) | 1ers relevés des saynètes (quelques heures seulement) : 250 000 € 165 vues · 9,9 s · 35 % de la vidéo regardée ; panne Microsoft 191 · 7,8 s · 28 % ; commissions 190 · 6,4 s · 36 % · 9,1 % vue en entier · 1 abonné. Moyenne saynètes 33 % regardé et 8 % vue en entier, contre 20 % et 4,5 % pour les anciennes. 88 j'aime, 24 enregistrements, 5 partages, 1 commentaire au total |

## Comment relever les statistiques
- Windsor.ai (connecteur `tiktok_organic`, `get_data`, sans `force_refresh` — offre d'essai) : champs `video_create_datetime, video_caption, video_duration, video_views_count, video_average_time_watched, video_full_watched_rate, video_likes, video_comments, video_shares, video_favorites, video_new_followers`, période `last_7dT` ; compte : `total_followers_count, total_likes, videos_count`.
- Si Windsor ne répond plus (fin d'essai) : Metricool `getAnalyticsDataByMetrics` (brandId 8028968, métriques TKPO05, TKPO07, TKPO08, TKPO10, TKPO13, TKPO15).
