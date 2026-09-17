# Maroa Voyages — site vitrine

Site statique en HTML / CSS / JavaScript, sans build ni dépendance.
Implémentation du handoff `Destination carousel avec zoom/design_handoff_maroa_site/`.

## Lancer

Ouvrir `index.html` dans un navigateur. Rien à installer.

Pour un aperçu servi en local (utile si vous ajoutez des polices ou des images
avec des chemins absolus) :

```bash
python -m http.server 8000
# puis http://localhost:8000
```

## Structure

```
index.html          Accueil — carrousel plein écran + sections
destinations.html   12 fiches filtrables par zone
circuits.html       3 fiches circuit détaillées
a-propos.html       Histoire, frise, équipe, engagements
contact.html        Formulaire + FAQ accordéon
css/style.css       Tokens, layout et composants (feuille unique)
js/app.js           Carrousel, menu, filtres, accordéon, formulaire
assets/             Les images — voir assets/README.md
```

## Les images

Le dossier `assets/` est vide : **39 images** sont attendues, la liste complète
avec les noms de fichiers et les cadrages est dans
[`assets/README.md`](assets/README.md).

Tant qu'une image manque, son emplacement reste visible avec son libellé
(« Allée des Baobabs — photo plein écran »…) : la mise en page ne casse pas.
Dès qu'un fichier au bon nom est déposé, il s'affiche.

## Le carrousel

C'est la pièce centrale de l'accueil.

Les **cinq images sont montées en même temps**, en couches superposées. Une seule
est visible ; les autres attendent **déjà en `scale(1.3)`**. Quand une couche
devient active, elle se détend vers `scale(1)` en 1,5 s pendant que son opacité
monte en 1 s — c'est tout le mécanisme du zoom, il n'y a pas de JavaScript
d'animation.

Le JavaScript ne fait que trois choses : déplacer la classe `is-active`,
réécrire le bloc de texte, et recalculer les quatre miniatures — qui sont
toujours les **quatre destinations suivantes**, en boucle : `(i+1) … (i+4) mod 5`.
Le texte du hero rejoue son fondu montant à chaque changement (redémarrage de
l'animation CSS via `requestAnimationFrame`).

Les données de chaque slide (région, trois lignes de titre, description) sont
portées par les attributs `data-*` de sa couche dans `index.html` : pour changer
une destination, il suffit d'éditer le HTML.

### Options

Sur la balise `<section class="hero" …>` de `index.html` :

| Attribut | Défaut | Effet |
|---|---|---|
| `data-autoplay` | `false` | `true` fait avancer le carrousel tout seul |
| `data-delay` | `7000` | Intervalle de l'autoplay, en millisecondes |

Le facteur de zoom se règle dans `css/style.css`, variable `--zoom` (1 → 1.8).

## Design

Deux fonds seulement, en alternance section par section : ink `#0c0b0a` et bone
`#f4efe6`. Un seul accent, l'ambre `#f0a623`. Titres en Oswald (toujours en
capitales), texte courant en Barlow — chargés depuis Google Fonts.

Toutes les valeurs sont centralisées en variables CSS en haut de
`css/style.css` (couleurs, gouttières, courbes d'animation).

## Responsive

Une seule rupture réelle, à **880 px**, pour la navigation (le menu devient un
plein écran ouvert par le bouton burger). Tout le reste est fluide : `clamp()`
sur les titres et les paddings, grilles en `repeat(auto-fit, minmax(…))` qui se
replient d'elles-mêmes. Sous 520 px, le hero n'affiche plus que trois
miniatures.

## Accessibilité

Miniatures et flèches sont de vrais `<button>` avec libellé explicite, la
destination active est annoncée en région live, l'accordéon FAQ utilise
`aria-expanded`, le menu se ferme avec `Échap`, les voiles décoratifs sont en
`aria-hidden` et `prefers-reduced-motion` neutralise le zoom, le fondu et la
flèche animée.

## À brancher

Le formulaire de contact est une maquette : il valide les champs puis bascule en
état « envoyé » sans rien envoyer. Pour le mettre en service, remplacer le
`preventDefault()` de `initForms()` dans `js/app.js` par un envoi vers votre
endpoint (ou poser un `action` sur le `<form>` et supprimer le handler).
