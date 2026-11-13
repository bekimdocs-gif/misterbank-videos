# Statistiques et leçons (à lire avant de choisir les sujets)

## Leçons actuelles (mises à jour le 11/11/2026)
1. **L'actu concrète qui touche le portefeuille marche le mieux.** « Découvert : ce qui change le 20 novembre » : 11,1 s de visionnage moyen (2× les autres), 10 j'aime et 3 partages sur 22 j'aime / 4 partages au total.
2. **Les présentations retiennent peu** (3-4 s) : ne plus en produire ; la vidéo avatar est épinglée sur le profil.
3. **Le décrochage est rapide** (10 à 20 % de la vidéo regardée en moyenne) : vidéos courtes (25-35 s), avatar + phrase choc dès la 1re seconde, chiffre fort dans les 2 premières secondes, un seul message par vidéo.
4. **Les formats « partage à quelqu'un que ça concerne »** génèrent des partages : les utiliser sur les sujets d'actu.

## Relevés
| Date du relevé | Abonnés | Vues cumulées | Meilleure vidéo (vues · temps moyen) | Remarque |
|---|---|---|---|---|
| 2026-11-11 13:30 | 4 | 877 | Découvert 20 novembre (158 · 11,1 s) | 5 vidéos publiées en 1 h, compte neuf |
| 2026-11-12 08:35 | 10 | 1 875 | Faillite banque Paraguay (286 · 7,5 s) ; meilleure rétention : Découvert 20 novembre (277 · 12,6 s, 26 j'aime, 4 partages) | 8 vidéos ; « Poutine 3 impacts » 258 vues · 8,8 s · 1 abonné en 13 h ; ép. 1 négocier taux bloqué à 3 vues |
| 2026-11-13 08:40 | 12 | ≈ 2 520 (10 vidéos sur 7 j) | Faillite banque Paraguay (300 · 7,5 s) ; meilleure rétention et engagement : Découvert 20 novembre (282 · 12,5 s, 26 j'aime, 4 partages, 2 abonnés) | Poutine 264 · 8,7 s ; ép. 2 refus crédit 259 · 4,7 s ; Livret A 242 · 4,2 s ; commissions d'intervention (publiée 8 h) 59 vues · 5,2 s · 10,5 % vue en entier ; ép. 1 négocier taux absent des données ; 69 j'aime au total |

## Comment relever les statistiques
- Windsor.ai (connecteur `tiktok_organic`, `get_data`, sans `force_refresh` — offre d'essai) : champs `video_create_datetime, video_caption, video_duration, video_views_count, video_average_time_watched, video_full_watched_rate, video_likes, video_comments, video_shares, video_favorites, video_new_followers`, période `last_7dT` ; compte : `total_followers_count, total_likes, videos_count`.
- Si Windsor ne répond plus (fin d'essai) : Metricool `getAnalyticsDataByMetrics` (brandId 8028968, métriques TKPO05, TKPO07, TKPO08, TKPO10, TKPO13, TKPO15).
