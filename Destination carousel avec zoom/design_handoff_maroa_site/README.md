# Handoff : Site touristique « Maroa »

## Overview

Site vitrine d'une agence de voyage locale à Madagascar (« Maroa Voyages »), en français.
Cinq pages : **Accueil** (avec carrousel plein écran de destinations), **Destinations** (grille filtrable), **Circuits** (fiches itinéraire détaillées), **À propos**, **Contact** (formulaire + FAQ accordéon).

L'élément signature est le hero de l'accueil : un carrousel plein écran dont les **miniatures en bas à droite représentent les prochaines destinations**. Au clic sur une miniature, la photo de fond est remplacée avec une **animation de zoom** (la nouvelle image entre en scale 1.3 → 1) et tous les textes du hero (région, titre sur 3 lignes, description) se rejouent en fondu montant.

## About the Design Files

Les fichiers `.dc.html` de ce dossier sont des **références de design réalisées en HTML** : des prototypes qui montrent l'apparence et le comportement voulus, **pas du code de production à copier tel quel**.

La tâche est de **recréer ces designs dans l'environnement du codebase cible** (React, Next.js, Vue, Astro…) en suivant ses patterns et ses bibliothèques existants. S'il n'existe pas encore de codebase, choisir le framework le plus adapté (une stack Next.js + Tailwind, ou Astro pour un site vitrine, conviennent très bien ici) et y implémenter les designs.

Points techniques propres au prototype, à **ne pas reproduire** :
- Les styles sont **tous inline** — contrainte de l'outil de prototypage. Dans le vrai projet, utiliser la convention du codebase (Tailwind, CSS modules, styled-components…).
- Les balises `<image-slot>` sont des **emplacements photo** du prototype. Les remplacer par de vraies `<img>` / `next/image` avec `object-fit: cover`.
- Les balises `<sc-for>` / `{{ variable }}` sont la syntaxe de template du prototype : ce sont des boucles et des interpolations ordinaires (`.map()`, JSX).
- Les liens pointent vers des fichiers `.dc.html` ; les remplacer par les routes réelles (`/`, `/destinations`, `/circuits`, `/a-propos`, `/contact`).

## Fidelity

**High-fidelity.** Couleurs, typographie, espacements, transitions et copy sont définitifs et doivent être reproduits fidèlement. Seules les **photographies** sont absentes (emplacements vides) — le client fournit ses propres visuels.

## Design Tokens

### Couleurs

| Rôle | Hex | Usage |
|---|---|---|
| Ink (fond principal) | `#0c0b0a` | Fond de toutes les sections sombres, header, footer |
| Ink-2 (fond alterné) | `#12110f` | Bandes CTA, section contact |
| Surface sombre (carte) | `#15130f` | Cartes sur fond sombre (fiches destinations, circuits) |
| Surface sombre (photo vide) | `#1c1a17` | Placeholder derrière une photo |
| Ambre (accent) | `#f0a623` | Accent principal : logo, liens, filets, boutons, état actif |
| Ambre clair (hover) | `#ffbe4d` | Hover des boutons ambre pleins |
| Ambre foncé (accent sur clair) | `#b9791a` | Accent sur les sections claires |
| Bone (fond clair) | `#f4efe6` | Fond des sections claires |
| Blanc (carte sur bone) | `#ffffff` | Cartes sur fond bone |
| Encre texte clair | `#1b1917` | Texte sur fond bone/blanc |
| Texte secondaire clair | `#4a443d` | Paragraphes sur fond clair |
| Texte tertiaire clair | `#8b8175` | Métadonnées sur fond clair |
| Séparateur clair | `#e0d7c8` / `#ece5d9` | Filets sur fond bone / blanc |
| Bordure claire (placeholder) | `#e2dacd` | Fond des emplacements photo sur fond clair |
| Succès | `#2f7d5b` | Bouton d'envoi après soumission |

Sur fond sombre, le texte utilise du blanc à opacité variable : `#fff` (titres), `rgba(255,255,255,0.82)` (chapeau), `rgba(255,255,255,0.72)`–`0.68` (paragraphes de carte), `rgba(255,255,255,0.5)`–`0.45` (métadonnées), `rgba(255,255,255,0.35)` (copyright).
Bordures sur fond sombre : `rgba(255,255,255,0.16)` (header), `rgba(255,255,255,0.09)`–`0.12` (cartes, filets), `rgba(255,255,255,0.2)`–`0.22` (champs de formulaire).

**Règle :** deux fonds seulement (ink `#0c0b0a` et bone `#f4efe6`), en alternance section par section. Un seul accent (ambre). Pas de troisième couleur.

### Typographie

- **Titres / UI :** `Oswald` (Google Fonts, poids 400, 500, 600, 700) — toujours `text-transform: uppercase`.
- **Texte courant :** `Barlow` (Google Fonts, poids 300, 400, 500).
- Import : `https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Barlow:wght@300;400;500&display=swap`

| Élément | Police | Taille | Poids | Interlettrage | Autre |
|---|---|---|---|---|---|
| H1 hero (accueil) | Oswald | `min(clamp(34px,6.4vw,96px), 9.5vh)` | 700 | `-1px` | `line-height: .98`, 3 lignes empilées |
| H1 page intérieure | Oswald | `clamp(34px,5.4vw,78px)` | 700 | `-1px` | `line-height: 1` |
| H2 section | Oswald | `clamp(28px,3.4vw,50px)` | 600 | — | `line-height: 1.05` |
| H2 bande CTA | Oswald | `clamp(26px,3.2vw,44px)` | 700 | — | `max-width: 24ch` |
| H3 carte | Oswald | `19px`–`24px` | 600 | — | `line-height: 1.15` |
| Eyebrow (sur-titre) | Oswald | `12px` | 400 | `3px` | précédé d'un filet 38×1px ambre |
| Nav | Oswald | `13px` | 400 | `1.6px` | |
| Métadonnée / label | Oswald | `10px`–`11px` | 400 | `1.8px`–`2px` | |
| Bouton | Oswald | `12px`–`13px` | 400 | `2.2px`–`2.4px` | |
| Chapeau | Barlow | `17px` | 400 | — | `line-height: 1.7`, `max-width: 44–56ch` |
| Corps de carte | Barlow | `14.5px`–`15.5px` | 400 | — | `line-height: 1.6`–`1.7` |
| Citation | Oswald | `clamp(20px,2.2vw,30px)` | 400 | — | `line-height: 1.4` |
| Chiffre statistique | Oswald | `44px` | 700 | — | `line-height: 1` |

Les paragraphes utilisent `text-wrap: pretty`, les titres `text-wrap: balance`.

### Espacements

- Gouttière horizontale de page : `clamp(20px, 4vw, 58px)`
- Padding vertical de section : `clamp(56px, 9vw, 120px)` (sections principales), `clamp(48px, 7vw, 90px)` (bandes CTA), `clamp(32px, 4vw, 48px)` (footer)
- Largeur de contenu max : `1240px`, centrée (`margin: 0 auto`) ; `980px` pour les blocs citation
- Gap de grille de cartes : `clamp(16px, 2vw, 28px)`
- Gap de colonnes en deux parties : `clamp(32px, 5vw, 80px)`
- Padding interne de carte : `22px`–`28px` (26px typique)

### Rayons, ombres, bordures

- Rayon : `3px` (champs, miniatures), `4px`–`5px` (cartes, photos), `6px` (grandes cartes circuit), `999px` (pilules, boutons, avatars ronds)
- Ombre de carte claire au repos : `0 2px 0 rgba(27,25,23,0.06)` ; au survol : `0 22px 44px rgba(27,25,23,0.16)`
- Ombre de miniature au survol : `0 18px 40px rgba(0,0,0,0.45)`
- Bordure de miniature du carrousel : `3px solid rgba(255,255,255,0.9)`

### Courbes et durées

- Zoom / grands mouvements : `cubic-bezier(.16,.84,.24,1)`
- Survols de miniature : `cubic-bezier(.2,.7,.2,1)`
- Durées : `.25s` (couleur de bouton), `.3s` (bouton), `.35s` (élévation de carte), `.8s` (zoom photo au survol), `1s` (fondu du fond), `1.5s` (zoom du fond)

---

## Screens / Views

### 1. Accueil (`Destination Slider.dc.html` → `/`)

Page longue, empilement de sections. Alternance ink / bone.

#### 1.1 Header (commun à toutes les pages)

- `display: flex`, `align-items: center`, `justify-content: space-between`, gap `24px`
- Padding `22px clamp(20px,4vw,58px) 18px`, bordure basse `1px solid rgba(255,255,255,0.16)`, `z-index: 40`
- **Logo** (lien vers `/`) : cercle `54×54px` `border-radius: 50%` fond `#f0a623` contenant la lettre « M » (Oswald 700, 22px, `#12110f`, `letter-spacing: -0.5px`) ; à droite, gap `12px`, le mot-logo « MAROA » (Oswald 700, 30px, `letter-spacing: 2px`, blanc) suivi d'un point ambre `#f0a623`.
- **Nav** : 5 liens — Accueil, Destinations, Circuits, À propos, Contact. Gap `clamp(16px,2.4vw,38px)`. Le lien de la page courante est en `#f0a623`, les autres en `rgba(255,255,255,0.82)`. Hover → blanc.
- **Menu mobile** : sous `880px` (`matchMedia('(max-width: 880px)')`), la nav disparaît et un bouton burger apparaît à droite du logo : `46×46px`, `border-radius: 999px`, bordure `1px solid rgba(255,255,255,0.32)`, fond `rgba(12,11,10,0.5)`, glyphe `≡` (20px, blanc) qui devient `✕` à l'ouverture, `z-index: 70`. Ouvert, la nav devient un plein écran `position: fixed; inset: 0; z-index: 60`, fond `rgba(10,9,8,0.97)`, liens empilés centrés verticalement et horizontalement avec gap `30px`.
  *Note implémentation : le prototype utilise un listener JS `matchMedia` parce qu'il ne peut pas écrire de media queries. Dans le vrai projet, utiliser une media query CSS (`@media (max-width: 880px)`) + un state d'ouverture.*

#### 1.2 Hero carrousel — l'élément clé

Section `height: 100vh`, `overflow: hidden`, colonne flex : header en haut, contenu collé en bas (`justify-content: flex-end`).

**Données (5 destinations)** — chaque entrée : `id`, `name`, `region`, trois lignes de titre `l1/l2/l3`, `text`.

| id | name | region | titre (3 lignes) |
|---|---|---|---|
| `baobabs` | Allée des Baobabs | Menabe · Morondava | Marcher / sous les / géants |
| `tsingy` | Tsingy de Bemaraha | Melaky · Bemaraha | Une forêt / de pierre / coupante |
| `nosyiranja` | Nosy Iranja | Diana · Nosy Be | Deux îles / un banc / de sable |
| `isalo` | Massif de l'Isalo | Ihorombe · Ranohira | Des canyons / et des / piscines |
| `pangalanes` | Canal des Pangalanes | Atsinanana · Toamasina | Six cents / kilomètres / d'eau calme |

Textes descriptifs : voir le tableau complet en fin de README (section Copy).

**Couches de fond** (`z-index: 0`) : les **5 images sont montées simultanément** en `position: absolute; inset: 0`, une seule visible. Chaque couche :
```
opacity:    active ? 1 : 0
visibility: active ? visible : hidden
transform:  active ? scale(1) : scale(1.3)
transition: opacity 1s ease,
            transform 1.5s cubic-bezier(.16,.84,.24,1),
            visibility 1s
will-change: transform, opacity
```
C'est tout le mécanisme du zoom : la couche inactive est **déjà** en `scale(1.3)`, donc quand elle devient active elle se détend vers `scale(1)` sur 1.5 s pendant que son opacité monte sur 1 s. Le `visibility: hidden` évite que les emplacements photo vides des slides inactives apparaissent derrière.
Le facteur de zoom est paramétrable (1 → 1.8, défaut **1.3**).

**Deux voiles** par-dessus (`z-index: 1`, `pointer-events: none`) :
1. `linear-gradient(100deg, rgba(8,8,7,.88) 0%, rgba(8,8,7,.62) 34%, rgba(8,8,7,.12) 62%, rgba(8,8,7,.35) 100%)` — assombrit la gauche pour la lisibilité du titre
2. `linear-gradient(to bottom, rgba(8,8,7,.55) 0%, rgba(8,8,7,0) 26%, rgba(8,8,7,0) 55%, rgba(8,8,7,.6) 100%)` — ancre le header et la barre de miniatures

**Bloc texte** (`z-index: 3`) : eyebrow (filet 38×1px ambre + région en Oswald 12px/3px ambre), H1 sur trois `<span style="display:block">` dont **la ligne du milieu est en ambre**, `max-width: 15ch` ; paragraphe `max-width: 46ch` ; bouton fantôme « DÉCOUVRIR LE CIRCUIT » (bordure `1px solid #f0a623`, `border-radius: 999px`, padding `clamp(11px,1.6vh,15px) 34px`, texte ambre → au survol fond ambre plein et texte `#12110f`), lien vers `/circuits`.

À chaque changement de slide, **tout le bloc texte se rejoue** : animation `from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none }`, `.9s cubic-bezier(.16,.84,.24,1) both`.
*Détail d'implémentation important : le prototype alterne entre deux keyframes identiques (`riseA`/`riseB`) via un compteur `tick % 2`, pour forcer le rejeu de l'animation à chaque clic. En React, la méthode équivalente et plus propre est une `key` qui change sur le bloc, ou un retrait/ajout de classe via `requestAnimationFrame`.*

**Barre inférieure** : `display: flex`, `justify-content: space-between`, `align-items: flex-end`, wrap.
- À gauche : deux boutons ronds `44×44px` (`‹` / `›`, bordure `rgba(255,255,255,0.4)`, fond `rgba(12,11,10,0.35)`, survol → fond ambre + texte `#12110f`) ; compteur `01 / 05` (Oswald 13px, `letter-spacing: 2px`, `rgba(255,255,255,0.65)`, index et total sur 2 chiffres) ; mention « ↓ FAIRE DÉFILER » avec la flèche animée `@keyframes bob { 0%,100% { translateY(0) } 50% { translateY(7px) } }`, `2.4s ease-in-out infinite`.
- À droite : **4 miniatures** = les 4 **prochaines** destinations, dans l'ordre cyclique `(i+1) … (i+4)` modulo 5. Chacune : `width: clamp(104px,13vw,168px)`, `height: min(clamp(80px,11vw,138px), 16vh)`, bordure `3px solid rgba(255,255,255,0.9)`, `border-radius: 3px`, `overflow: hidden`, curseur pointeur. Survol → `translateY(-8px) scale(1.03)` + ombre, `.35s cubic-bezier(.2,.7,.2,1)`. Voile bas `linear-gradient(to top, rgba(8,8,7,.85), transparent)` avec le nom de la destination (Oswald 11px, `letter-spacing: 1.4px`, uppercase, blanc).
  **Au clic → la destination cliquée devient active** (zoom du fond + rejeu des textes), et la barre de miniatures se recalcule donc autour du nouvel index.
- Les flèches ‹ › décrémentent / incrémentent l'index, cycliquement.

**Autoplay** : option désactivée par défaut ; activée, avance d'un slide toutes les **7 s** (`setInterval`, nettoyé au démontage).

**Une même image sert le fond et la miniature** d'une destination (un seul asset par destination, `object-fit: cover` dans les deux cas).

#### 1.3 Section « À propos » (fond bone `#f4efe6`)

Grille deux colonnes `repeat(auto-fit, minmax(min(100%,320px), 1fr))`, gap `clamp(32px,5vw,80px)`, `align-items: center`.
- Colonne gauche : eyebrow « AGENCE LOCALE · ANTANANARIVO » (filet + texte `#b9791a`), H2 « Des voyages écrits par ceux qui vivent ici » (`max-width: 22ch`), paragraphe `max-width: 52ch`, puis **trois statistiques** en ligne (gap `clamp(24px,4vw,56px)`, wrap) : `14` / Années sur le terrain, `32` / Villages partenaires, `6` / Voyageurs par groupe. Chiffre Oswald 700 44px `#1b1917`, label Oswald 11px `letter-spacing: 2px` uppercase `#8b8175`.
- Colonne droite : mosaïque `grid-template-columns: 1fr 1fr`, `grid-template-rows: 180px 180px`, gap `14px` — la photo de gauche occupe `grid-row: span 2`, deux photos à droite. Rayon `4px`.

#### 1.4 Section « Destinations phares » (fond ink)

En-tête de section : à gauche eyebrow « OÙ ALLER » + H2 « Quatre terrains / qui ne se ressemblent pas » ; à droite un lien souligné « VOIR LES 12 DESTINATIONS → » (Oswald 12px `letter-spacing: 2.4px`, `border-bottom: 1px solid #f0a623`, `padding-bottom: 6px`).

Grille `repeat(auto-fit, minmax(min(100%,250px), 1fr))`, gap `16px`. Quatre cartes-photo, chacune un lien vers `/destinations` :
- `height: clamp(300px,34vw,420px)`, `border-radius: 4px`, `overflow: hidden`, `position: relative`
- Photo en couche absolue, **au survol de la carte** `transform: scale(1.07)` sur `.8s cubic-bezier(.16,.84,.24,1)`
- Voile `linear-gradient(to top, rgba(8,8,7,.86) 0%, rgba(8,8,7,.1) 62%)`
- En bas, padding `26px 22px` : région (Oswald 11px `letter-spacing: 2px` ambre), nom (Oswald 600 24px uppercase blanc), une phrase (14px `rgba(255,255,255,0.78)`)

Contenu : Menabe / Allée des Baobabs / « Coucher de soleil sur la piste de Morondava. » — Melaky / Tsingy de Bemaraha / « Deux jours dans un labyrinthe de calcaire. » — Diana / Nosy Iranja / « Un banc de sable entre deux îlots. » — Ihorombe / Massif de l'Isalo / « Canyons de grès et piscines naturelles. »

#### 1.5 Section « Trois circuits signature » (fond bone)

En-tête identique en structure (accent `#b9791a`), lien « TOUS LES CIRCUITS → ».
Grille `repeat(auto-fit, minmax(min(100%,290px), 1fr))`, gap `clamp(16px,2vw,28px)`. Trois cartes verticales blanches, `border-radius: 5px`, lien vers `/circuits` :
- Photo `height: 220px` en haut
- Corps `padding: 26px 24px 28px`, colonne flex gap `14px` : ligne de métadonnées séparées par des `·` (durée, zone, niveau — Oswald 11px `letter-spacing: 2px` `#8b8175`), H3, paragraphe (`flex: 1` pour aligner les pieds de carte), puis un pied séparé par `1px solid #ece5d9` avec le prix (Oswald 600 20px) et « VOIR LE DÉTAIL → » (Oswald 11px `#b9791a`)
- Survol de carte : `translateY(-6px)` + ombre `0 22px 44px rgba(27,25,23,0.16)`, `.35s`

Contenu : *La piste des baobabs* — 9 jours · Ouest · Modéré — 1 840 € ; *Hauts plateaux & canyons* — 12 jours · Sud · Sportif — 2 260 € ; *Archipel du nord* — 7 jours · Nord · Facile — 1 490 €.

#### 1.6 Témoignage (fond ink)

`max-width: 980px`, ligne flex gap `clamp(24px,4vw,48px)`, wrap : avatar rond `120×120px` (`border-radius: 50%`), puis un guillemet ouvrant `“` (Oswald 56px, `line-height: .6`, ambre), la citation (Oswald 400 `clamp(20px,2.2vw,30px)`, `line-height: 1.4`, blanc) et l'attribution (Oswald 12px `letter-spacing: 2px` uppercase `rgba(255,255,255,0.55)`).

#### 1.7 Bande CTA finale + footer

Bande `#12110f` : H2 à gauche, bouton ambre plein à droite, `justify-content: space-between`, wrap.
Footer `#0c0b0a`, bordure haute `rgba(255,255,255,0.12)` : mot-logo, nav secondaire (Oswald 11px `letter-spacing: 2px` `rgba(255,255,255,0.6)`), copyright « © 2026 Maroa Voyages — Antananarivo » (13px `rgba(255,255,255,0.35)`).

---

### 2. Destinations (`Destinations.dc.html` → `/destinations`)

1. **Hero titre** : `min-height: clamp(320px,42vh,460px)`, photo plein cadre + voile `linear-gradient(to top, rgba(8,8,7,.95) 0%, rgba(8,8,7,.55) 55%, rgba(8,8,7,.35) 100%)`, contenu aligné en bas. Eyebrow « 12 LIEUX · 6 RÉGIONS », H1 « DESTINATIONS », chapeau `max-width: 56ch`.
2. **Barre de filtres** (collante visuellement sous le hero, fond ink, bordure basse) : pilules `padding: 10px 20px`, `border-radius: 999px`, Oswald 11px `letter-spacing: 1.8px` uppercase. État inactif : bordure `rgba(255,255,255,0.22)`, fond transparent, texte `rgba(255,255,255,0.78)`. État actif : fond `#f0a623`, bordure ambre, texte `#12110f`. Transition `.25s`. À droite de la barre, le compte de résultats (« 12 lieux ») en Oswald 11px `rgba(255,255,255,0.45)`.
   Filtres : **Toutes, Nord, Ouest, Sud, Est, Hauts plateaux**. Le filtrage se fait via une table région → zone :
   `Diana → Nord`, `Analanjirofo → Est`, `Atsinanana → Est`, `Melaky → Ouest`, `Menabe → Ouest`, `Ihorombe → Sud`, `Atsimo-Andrefana → Sud`, `Haute Matsiatra → Hauts plateaux`.
3. **Grille de 12 fiches** : `repeat(auto-fill, minmax(min(100%,330px), 1fr))`, gap `clamp(16px,2vw,26px)`. Carte `#15130f`, bordure `1px solid rgba(255,255,255,0.09)`, rayon `5px`. Photo `height: 230px` avec, en haut à gauche, un badge région : `padding: 7px 13px`, fond `rgba(12,11,10,0.78)`, `backdrop-filter: blur(4px)`, `border-radius: 999px`, Oswald 10px `letter-spacing: 1.8px` ambre. Corps `padding: 22px 22px 24px` : H3 22px, paragraphe `flex: 1`, pied séparé par `1px solid rgba(255,255,255,0.1)` avec la saison à gauche (`rgba(255,255,255,0.5)`) et la durée à droite (ambre). Survol : `translateY(-6px)`, bordure → `rgba(240,166,35,0.55)`.
4. **Section « L'année en quatre saisons »** (fond bone) : 4 cartes blanches `repeat(auto-fit, minmax(min(100%,220px), 1fr))`, chacune avec une période en Oswald 700 13px `#b9791a`, un H3 20px et un paragraphe.
   Avr–Juin « Vert et calme » ; Juil–Août « Baleines » ; Sep–Nov « Lémuriens » ; Déc–Mar « Saison humide ».
5. **Bande CTA** + footer.

Les 12 destinations (nom / région / saison / durée / texte) sont listées en section Copy.

---

### 3. Circuits (`Circuits.dc.html` → `/circuits`)

1. **En-tête** (fond ink, pas de photo) : grille deux colonnes `align-items: end` — à gauche eyebrow « ITINÉRAIRES GUIDÉS · 6 VOYAGEURS MAX » + H1 « CIRCUITS », à droite un chapeau `max-width: 52ch`.
2. **Trois fiches circuit** empilées, gap `clamp(20px,3vw,36px)`. Chaque fiche : `<article>` en grille `repeat(auto-fit, minmax(min(100%,320px), 1fr))` — photo à gauche (`min-height: 340px`) avec un **badge plein ambre** en haut à gauche (`padding: 8px 14px`, fond `#f0a623`, Oswald 600 10px `letter-spacing: 1.8px`, texte `#12110f`) ; contenu à droite, `padding: clamp(26px,3vw,40px)`, colonne flex gap `18px` :
   - ligne de métadonnées (durée / zone / niveau) en Oswald 11px `letter-spacing: 2px` `rgba(255,255,255,0.5)`
   - H2 `clamp(24px,2.6vw,34px)`
   - paragraphe `max-width: 56ch`
   - **itinéraire jour par jour** : lignes `display: flex` gap `16px`, `padding: 11px 0`, séparées par `border-top: 1px solid rgba(255,255,255,0.09)` ; colonne jour fixe `width: 62px` en Oswald 11px ambre (« J1 — 2 »), libellé en 14.5px `rgba(255,255,255,0.8)`
   - pied `margin-top: auto`, séparé par `1px solid rgba(255,255,255,0.12)`, `padding-top: 20px` : prix (Oswald 600 26px blanc) + mention « PAR PERSONNE · VOLS INTÉRIEURS INCLUS » (Oswald 10px `rgba(255,255,255,0.45)`) à gauche, bouton fantôme ambre « RÉSERVER CE CIRCUIT » à droite (lien `/contact`)
3. **Section « Pas de surprise au départ »** (fond bone) : 4 blocs `repeat(auto-fit, minmax(min(100%,240px), 1fr))`, chacun avec `border-top: 2px solid #1b1917`, `padding-top: 20px`, H3 19px + paragraphe — Transport, Hébergement, Guides, Non inclus.
4. **Bande CTA** « Aucun circuit ne colle ? On en écrit un pour vous. » + bouton ambre plein « VOYAGE SUR MESURE » → `/contact`. Footer.

---

### 4. À propos (`A propos.dc.html` → `/a-propos`)

1. **Hero titre** : `min-height: clamp(340px,52vh,540px)`, photo + voile, eyebrow « AGENCE LOCALE · ANTANANARIVO », H1 « Onze personnes, une île » (`max-width: 18ch`), chapeau.
2. **Histoire** (fond bone) : grille deux colonnes `align-items: start`. Gauche : eyebrow « NOTRE HISTOIRE », H2 « Un 4x4 emprunté et deux carnets », deux paragraphes (`max-width: 54ch`, 16.5px, `line-height: 1.75`). Droite : **frise de 5 jalons** — lignes `grid-template-columns: 92px 1fr`, gap `20px`, `padding: 20px 0`, `border-top: 1px solid #e0d7c8` ; année en Oswald 700 18px `#b9791a`, libellé 15.5px.
   2012 / 2015 / 2018 / 2021 / 2026 (libellés en section Copy).
3. **Équipe** (fond ink) : 4 portraits `repeat(auto-fit, minmax(min(100%,240px), 1fr))`, gap `clamp(16px,2vw,26px)`. Photo `height: 300px`, rayon `5px`, zoom `scale(1.06)` au survol sur `.8s`. Sous la photo : nom (Oswald 600 20px), rôle (Oswald 11px `letter-spacing: 2px` ambre), une phrase (14.5px `rgba(255,255,255,0.7)`).
   Rivo (Cofondateur · guide), Hanta (Cofondatrice · itinéraires), Fetra (Chauffeur · ouest), Soa (Cuisinière de camp).
4. **Engagements** (fond bone) : 4 cartes blanches `repeat(auto-fit, minmax(min(100%,250px), 1fr))`, `padding: 28px 26px`, chacune numérotée `01`–`04` en Oswald 700 32px `#e0d7c8`, puis H3 19px + paragraphe.
5. **Citation presse** (fond ink), centrée, `max-width: 980px`.
6. **Bande CTA** « Parlons de votre voyage, pas de nous. » + footer.

---

### 5. Contact (`Contact.dc.html` → `/contact`)

1. **Section formulaire** : photo de fond à `opacity: .22` + voile `linear-gradient(to right, rgba(12,11,10,.95), rgba(12,11,10,.72))`. Grille deux colonnes `align-items: start`, gap `clamp(32px,5vw,72px)`.
   - **Gauche** : eyebrow « RÉPONSE SOUS 48 H », H1 « Dites-nous quand vous partez » (`max-width: 16ch`), chapeau, puis un **tableau de coordonnées** — lignes `grid-template-columns: 130px 1fr`, gap `18px`, `padding: 16px 0`, `border-top: 1px solid rgba(255,255,255,0.14)` ; libellé en Oswald 11px `letter-spacing: 2px` `rgba(255,255,255,0.45)`, valeur en 15.5px blanc.
     Téléphone `+261 34 12 345 67 — WhatsApp` · E-mail `bonjour@maroa.mg` · Bureau `Lot II M 74, Antananarivo 101` + `Lun — Ven, 8 h — 17 h (UTC+3)` en `rgba(255,255,255,0.6)` · Antenne `Hell-Ville, Nosy Be — sur rendez-vous`.
   - **Droite** : carte formulaire `rgba(21,19,15,0.86)`, bordure `1px solid rgba(255,255,255,0.12)`, rayon `6px`, `padding: clamp(24px,3vw,38px)`, colonne flex gap `16px`.
     Champs : **Nom** + **E-mail** sur une ligne (`repeat(auto-fit, minmax(min(100%,150px), 1fr))`), puis un groupe de **pilules « Ce qui vous intéresse »** (mêmes styles que les filtres de la page Destinations : *Un circuit existant, Voyage sur mesure, Voyage de noces, Groupe / famille*, défaut « Un circuit existant »), puis **Dates envisagées** + **Voyageurs** sur une ligne, puis **Votre message** (`textarea` 4 lignes, `resize: vertical`).
     Style de champ : `padding: 14px 16px`, fond `rgba(255,255,255,0.06)`, bordure `1px solid rgba(255,255,255,0.2)`, rayon `3px`, texte blanc Barlow 15px, `outline: none`, **focus → bordure `#f0a623`**. Libellé au-dessus en Oswald 10.5px `letter-spacing: 2px` `rgba(255,255,255,0.55)`.
     Bouton d'envoi pleine largeur, `padding: 16px 34px`, `border-radius: 999px`, fond `#f0a623`, texte `#12110f`. **Après soumission** : libellé « Message envoyé ✓ », fond `#2f7d5b`, texte blanc, et la note sous le bouton passe de « Vos coordonnées ne servent qu'à vous répondre. Aucune newsletter. » à « Merci — Hanta vous répond sous 48 h ouvrées. »
     *Le prototype ne fait que `preventDefault()` + bascule d'état. À brancher sur un vrai endpoint, avec validation (nom requis, e-mail valide) et gestion d'erreur — non maquettée, à traiter selon les conventions du codebase.*
2. **FAQ** (fond bone) : grille deux colonnes — à gauche eyebrow « QUESTIONS FRÉQUENTES » + H2 « Avant de nous écrire » + une phrase ; à droite un **accordéon de 5 questions**, une seule ouverte à la fois (la première par défaut, refermable). Ligne cliquable : `border-top: 1px solid #e0d7c8`, `padding: 20px 0`, question en Oswald 500 18px et signe `+` / `−` en Oswald 20px `#b9791a` à droite.
   Animation d'ouverture : `display: grid` + `grid-template-rows: 0fr → 1fr` avec `overflow: hidden` et `opacity 0 → 1`, transition `grid-template-rows .4s cubic-bezier(.16,.84,.24,1), opacity .3s`.
3. Footer.

---

## Interactions & Behavior — récapitulatif

| Interaction | Comportement |
|---|---|
| Clic sur une miniature du hero | La destination devient active : fond en zoom 1.3 → 1 (1.5 s) + fondu (1 s), textes rejoués en fondu montant (.9 s), barre de miniatures recalculée sur `(i+1…i+4) mod 5` |
| Flèches ‹ › du hero | Index −1 / +1, cyclique, même animation |
| Autoplay (option) | +1 slide toutes les 7 s |
| Survol d'une miniature | `translateY(-8px) scale(1.03)` + ombre portée |
| Survol d'une carte-photo | Photo `scale(1.07)` sur `.8s` (la carte ne bouge pas) |
| Survol d'une carte circuit / destination | `translateY(-6px)` + ombre / bordure ambre |
| Survol d'un bouton fantôme | Remplissage ambre, texte `#12110f` |
| Filtres Destinations | Filtrage client immédiat, compteur de résultats mis à jour |
| Pilules de sujet (Contact) | Sélection unique |
| FAQ | Accordéon exclusif, refermable |
| Envoi du formulaire | État « envoyé » : libellé, couleur et note changent |
| Burger < 880px | Ouvre / ferme le plein écran de navigation ; se ferme sur changement de breakpoint |

## State Management

Par page, tout est local — aucun store global, aucun fetch.

- **Accueil** : `i` (index du slide, 0–4), `tick` (compteur pour rejouer l'animation de texte), `sent` (formulaire — déplacé sur la page Contact dans la version finale), `narrow` + `menuOpen` (nav).
- **Destinations** : `filter` (zone active), `narrow`, `menuOpen`.
- **Circuits** : `narrow`, `menuOpen`.
- **À propos** : `narrow`, `menuOpen`.
- **Contact** : `topic`, `open` (index FAQ ouverte, `-1` = toutes fermées), `sent`, `narrow`, `menuOpen`.

Les données (destinations, circuits, équipe, jalons, FAQ) sont des **tableaux constants en haut de chaque fichier**. Dans le vrai projet, elles devraient venir d'un CMS ou de fichiers de contenu (MDX / JSON) plutôt que d'être codées en dur — le site est destiné à être mis à jour par l'agence.

## Assets

**Aucune image n'est fournie.** Toutes les photos sont des emplacements vides (`<image-slot>`), identifiés pour que le client puisse déposer ses visuels. Liste des emplacements à remplacer par de vraies images :

| id de l'emplacement | Page | Contenu attendu | Cadrage |
|---|---|---|---|
| `thumb-baobabs`, `thumb-tsingy`, `thumb-nosyiranja`, `thumb-isalo`, `thumb-pangalanes` | Accueil | Les 5 destinations du hero — **sert à la fois de fond plein écran et de miniature** | Paysage, sujet légèrement à droite (la gauche est assombrie par le voile) ; prévoir du 2400px de large |
| `home-about-1` | Accueil | Guide en forêt | Portrait (occupe 2 rangées) |
| `home-about-2`, `home-about-3` | Accueil | Repas au campement, piste en 4x4 | Paysage ~1:1 |
| `home-dest-baobabs`, `home-dest-tsingy`, `home-dest-nosyiranja`, `home-dest-isalo` | Accueil | 4 destinations phares | Portrait 3:4 |
| `home-circ-ouest`, `home-circ-sud`, `home-circ-nord` | Accueil | 3 circuits | Paysage 16:9 |
| `home-quote-portrait` | Accueil | Portrait voyageuse | Carré, recadré en rond |
| `home-cta-bg` | Accueil | Lagon ou piste au crépuscule | Panoramique, affiché à faible opacité |
| `dest-hero` | Destinations | Côte ou hauts plateaux | Panoramique |
| `place-*` (12) | Destinations | Une photo par lieu | Paysage 3:2 |
| `tour-ouest`, `tour-sud`, `tour-nord` | Circuits | Une photo par circuit | Portrait ou carré, `min-height: 340px` |
| `about-hero` | À propos | L'équipe sur une piste | Panoramique |
| `team-rivo`, `team-hanta`, `team-fetra`, `team-soa` | À propos | 4 portraits | Portrait 3:4 |
| `contact-bg` | Contact | Lagon ou piste au crépuscule | Panoramique, `opacity: .22` |

Toutes en `object-fit: cover`. Prévoir des `alt` descriptifs (absents du prototype), du lazy-loading sous la ligne de flottaison, et des formats modernes (AVIF/WebP) avec `srcset`.

Aucune icône externe : le prototype utilise des caractères (`‹ › ⌕ ≡ ✕ ↓ + − ✓ “`). À remplacer par un jeu d'icônes SVG propre (Lucide, Phosphor…) dans le vrai projet.

## Accessibilité — à traiter à l'implémentation

Non couvert par le prototype, à ajouter :
- `alt` sur toutes les images ; les voiles décoratifs en `aria-hidden`
- Les miniatures du carrousel doivent être de vrais `<button>` avec un libellé explicite (« Voir Nosy Iranja ») ; les flèches aussi (`aria-label="Destination précédente"`)
- `prefers-reduced-motion` : neutraliser le zoom du fond, le rejeu des textes et l'animation `bob`
- L'accordéon FAQ en `<button aria-expanded>` + région associée ; actuellement le `div` cliquable n'est pas focusable
- Le menu plein écran : piéger le focus, fermer sur `Escape`, `aria-expanded` sur le burger
- Contrastes : les textes sur photo reposent sur les voiles dégradés — vérifier sur les vraies images et renforcer le voile si nécessaire

## Responsive

Une seule vraie rupture, à **880px**, pour la navigation. Tout le reste est fluide : `clamp()` sur les tailles de titre et les paddings, grilles en `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` qui se replient d'elles-mêmes, `flex-wrap` sur toutes les lignes.

Le hero est en `height: 100vh` avec des tailles bornées en `vh` (`min(clamp(...), 9.5vh)` pour le H1, `16vh` pour la hauteur des miniatures) afin que titre **et** miniatures tiennent toujours dans la fenêtre sans défilement. Sur mobile, envisager `100dvh` plutôt que `100vh`, et réduire à 3 miniatures sous ~520px.

---

## Copy (textes exacts)

### Hero accueil — descriptions

- **Allée des Baobabs** : « Vingt-cinq baobabs centenaires bordent la piste de terre rouge. Arrivez une heure avant le coucher du soleil : la lumière fait le reste. »
- **Tsingy de Bemaraha** : « Passerelles suspendues, canyons calcaires et lémuriens invisibles. Deux jours de randonnée dans un labyrinthe classé au patrimoine mondial. »
- **Nosy Iranja** : « Une langue de sable blanc relie les deux îlots à marée basse. Pirogue au départ de Nosy Be, masque et tuba dans le sac. »
- **Massif de l'Isalo** : « Grès sculpté par le vent, piscines naturelles turquoise et nuits sous les étoiles au cœur du parc national de l'Isalo. »
- **Canal des Pangalanes** : « Un chapelet de lagunes relié par un canal colonial. On y navigue lentement, de village de pêcheurs en forêt littorale. »

### Les 12 destinations

| Nom | Région | Saison | Durée | Texte |
|---|---|---|---|---|
| Allée des Baobabs | Menabe | Avr — Nov | 2 jours | Vingt-cinq géants alignés sur la piste de Morondava. On y arrive pour la lumière de fin de journée. |
| Tsingy de Bemaraha | Melaky | Mai — Oct | 3 jours | Un labyrinthe de calcaire coupant, passerelles et via ferrata. Patrimoine mondial. |
| Massif de l'Isalo | Ihorombe | Avr — Oct | 3 jours | Canyons de grès, piscines naturelles et bivouac sous les étoiles au bord du plateau. |
| Nosy Iranja | Diana | Mai — Nov | 1 jour | Deux îlots reliés par un banc de sable blanc à marée basse. Tortues et snorkeling. |
| Nosy Be | Diana | Toute l'année | 4 jours | Le camp de base du nord : marché de Hell-Ville, plantations d'ylang-ylang, récifs. |
| Île Sainte-Marie | Analanjirofo | Juil — Sep | 4 jours | Baie des baleines, cimetière des pirates et une seule route bordée de cocotiers. |
| Ranomafana | Haute Matsiatra | Avr — Nov | 2 jours | Forêt pluviale dense, sources chaudes et douze espèces de lémuriens à repérer de nuit. |
| Canal des Pangalanes | Atsinanana | Avr — Nov | 3 jours | Six cents kilomètres de lagunes reliées. Navigation lente entre villages de pêcheurs. |
| Andringitra | Haute Matsiatra | Mai — Oct | 4 jours | Le trek du Pic Boby, 2 658 m : granit, troupeaux zébus et nuits à 5 °C. |
| Réserve d'Anja | Haute Matsiatra | Toute l'année | ½ journée | Réserve gérée par le village. Makis catta entre les blocs de granit, à portée d'objectif. |
| Ifaty & Mangily | Atsimo-Andrefana | Avr — Nov | 3 jours | Forêt d'épineux, baobabs nains et le troisième plus grand récif corallien du monde. |
| Baie de Diego-Suarez | Diana | Mai — Nov | 3 jours | Kitesurf dans la baie de Sakalava, tsingy rouges et mer d'Émeraude en boutre. |

### Les 3 circuits

**La piste des baobabs** — badge « Le plus demandé » — 9 jours · Ouest · Modéré · 1 840 €
« Descente de la Tsiribihina en pirogue, deux jours dans les Tsingy, puis l'allée des baobabs au coucher du soleil. Le classique de l'ouest, sans course contre le temps. »
- J1 — 2 : Antananarivo, marché d'Analakely et route vers Miandrivazo
- J3 — 4 : Descente de la Tsiribihina en pirogue, bivouac sur les bancs de sable
- J5 — 7 : Bekopaka, Petits et Grands Tsingy de Bemaraha
- J8 — 9 : Allée des baobabs, Morondava, vol retour

**Hauts plateaux & canyons** — badge « Randonnée » — 12 jours · Sud · Sportif · 2 260 €
« La RN7 comme fil rouge : forêt pluviale de Ranomafana, makis d'Anja, trois jours de marche dans l'Isalo, puis le lagon d'Ifaty pour terminer les pieds dans l'eau. »
- J1 — 3 : Antsirabe, ateliers d'artisans et Ranomafana de nuit
- J4 — 5 : Ambalavao, réserve d'Anja et vallée du Tsaranoro
- J6 — 8 : Isalo : canyon des singes, piscine naturelle, bivouac au plateau
- J9 — 12 : Forêt d'épineux, Ifaty, récif et vol depuis Tuléar

**Archipel du nord** — badge « Mer & farniente » — 7 jours · Nord · Facile · 1 490 €
« Nosy Be comme camp de base, les îlots en boutre et deux nuits chez les pêcheurs de Sakatia. Le circuit le plus léger, idéal en famille. »
- J1 — 2 : Hell-Ville, plantations d'ylang-ylang, coucher de soleil au Mont Passot
- J3 — 4 : Nosy Iranja en boutre, banc de sable et snorkeling
- J5 — 6 : Nosy Sakatia, tortues vertes et nuits chez les pêcheurs
- J7 : Réserve de Lokobe puis vol retour

### Jalons « À propos »

- **2012** — Premier départ : six voyageurs, un 4x4 emprunté, dix jours dans l'Isalo.
- **2015** — Ouverture du bureau d'Antananarivo et recrutement de Fetra et Soa.
- **2018** — Partenariat avec la réserve communautaire d'Anja, gérée par le village.
- **2021** — Année blanche : l'équipe reste salariée, on répare les véhicules.
- **2026** — Onze salariés, 32 villages partenaires, toujours six voyageurs par départ.

### Équipe

- **Rivo** — Cofondateur · guide — « Ancien guide du parc de l'Isalo. Repère un lémurien à quarante mètres, dans le noir. »
- **Hanta** — Cofondatrice · itinéraires — « Écrit chaque programme à la main. C'est elle qui vous répondra sous 48 h. »
- **Fetra** — Chauffeur · ouest — « Vingt ans de pistes du Menabe. Change une roue en huit minutes, chrono vérifié. »
- **Soa** — Cuisinière de camp — « Fait un romazava au feu de bois qui met fin aux débats sur la cuisine malgache. »

### FAQ (Contact)

1. **Faut-il un visa ?** — Oui, délivré à l'arrivée à Ivato contre 37 € et un passeport valable six mois après le retour. Nous envoyons la liste complète des papiers avec le devis.
2. **Quel budget prévoir en plus du circuit ?** — Comptez le vol international, l'assurance, les boissons et vos achats. Sur place, nos circuits sont en pension complète : 15 à 20 € par jour suffisent largement.
3. **Est-ce adapté aux enfants ?** — Le circuit nord se fait très bien dès six ans. Les treks de l'Andringitra et de l'Isalo demandent une bonne habitude de la marche.
4. **Combien de temps à l'avance réserver ?** — Trois à quatre mois pour juillet-août, six semaines le reste de l'année. Les vols intérieurs sont la vraie contrainte.
5. **Et si je veux partir seul ?** — C'est possible sur tous les circuits, avec un supplément chambre individuelle. Nous pouvons aussi vous proposer un départ groupé existant.

### Témoignage accueil

« Rivo a changé notre itinéraire au troisième jour parce que la mer était mauvaise. On a dormi dans son village. C'est devenu le meilleur souvenir du voyage. » — Claire & Damien — Circuit Nord, juillet

### Citation presse (À propos)

« Ils connaissent le nom du grand-père qui tient la pirogue. C'est tout le contraire d'une agence. » — Revue Grands Reportages — mars 2025

---

## Files

Fichiers de design inclus dans ce dossier (à ouvrir dans un navigateur pour voir le rendu et les animations) :

| Fichier | Route cible |
|---|---|
| `Destination Slider.dc.html` | `/` (accueil + hero carrousel) |
| `Destinations.dc.html` | `/destinations` |
| `Circuits.dc.html` | `/circuits` |
| `A propos.dc.html` | `/a-propos` |
| `Contact.dc.html` | `/contact` |
| `image-slot.js` | dépendance du prototype (emplacements photo) — **à ne pas porter** |
| `support.js` | runtime du prototype — **à ne pas porter** |

Pour lire un fichier de design, chercher :
- le **template** entre `<x-dc>` et `</x-dc>` — c'est le markup ;
- la **logique** dans le `<script data-dc-script>` en bas — c'est l'équivalent d'un composant React (state, handlers, données).

## Ordre d'implémentation suggéré

1. Layout partagé : header (avec menu mobile), footer, tokens de couleur et de typo, bande CTA réutilisable.
2. Page d'accueil sans le carrousel (sections statiques) — valide la grille et les tokens.
3. Le hero carrousel — la pièce la plus délicate ; commencer par le changement d'image et le zoom, ajouter le rejeu des textes ensuite.
4. Destinations (le filtrage est trivial) puis Circuits (purement statique).
5. À propos, puis Contact (accordéon + branchement du formulaire).
6. Passe accessibilité et `prefers-reduced-motion`.
