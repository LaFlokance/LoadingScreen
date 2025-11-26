# 🎮 Loading Screen by La Flokance

> Un loading screen moderne et immersif pour serveur FiveM, inspiré de l'univers GTA avec des transitions fluides, une playlist musicale intégrée et une interface premium entièrement personnalisable.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![FiveM](https://img.shields.io/badge/FiveM-Compatible-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

---

## ✨ Fonctionnalités principales

### 🎬 Système de scènes dynamiques
- **Rotation automatique** toutes les 5 secondes avec transitions fade ultra fluides
- **Animations avancées** : blobs animés, gradients dynamiques et effet vignette premium
- **Personnalisation totale** : images, titres et descriptions modifiables facilement

### 🎶 Lecteur audio intégré
- Contrôles complets : **Play/Pause**, **Suivant/Précédent**
- Slider de volume vertical avec mémorisation des préférences
- Support de playlist avec covers d'albums
- Gestion intelligente de l'autoplay avec fallback

### 📚 Interface interactive
- **Modales modulaires** : Règlement RP, Histoires du serveur, Crédits, Paramètres
- **UI auto-masquée** : disparaît après 3 secondes d'inactivité, réapparaît au mouvement
- **Barre de progression** synchronisée avec le chargement FiveM
- **Raccourcis clavier** pour une navigation rapide

### 📱 Design responsive
- Optimisé pour PC, laptop et écrans larges
- Adaptation automatique pour mobile
- Interface fluide et performante

---

## 📦 Installation

### Étape 1 : Structure des fichiers

Créez le dossier suivant dans votre serveur :

```
resources/
└── flokance_loading/
    ├── fxmanifest.lua
    ├── index.html
    ├── assets/
    │   ├── css/
    │   │   └── style.css
    │   ├── js/
    │   │   └── script.js
    │   ├── images/
    │   │   ├── 1.png
    │   │   ├── 2.png
    │   │   └── ...
    │   ├── covers/
    │   │   ├── nocif.png
    │   │   └── ...
    │   └── music/
    │       ├── nocif.mp3
    │       └── ...
    └── README.md
```

### Étape 2 : Configuration du server.cfg

**⚠️ IMPORTANT** : Le loading screen **doit être en première position** dans votre `server.cfg`, avant ESX et tous les autres scripts.

```cfg
# Loading Screen (OBLIGATOIRE EN PREMIER)
ensure flokance_loading

# Autres ressources...
ensure es_extended
ensure ...
```

### Étape 3 : Vider le cache FiveM

**Cette étape est cruciale** pour éviter les problèmes d'affichage.

**Sur Windows :**
1. Ouvrez l'explorateur de fichiers
2. Collez dans la barre d'adresse : `%localappdata%\FiveM\FiveM.app\data\cache`
3. Supprimez **tout** le contenu du dossier
4. Relancez FiveM

**Sur Linux :**
```bash
rm -rf ~/.fivem/FiveM.app/data/cache
```

### Étape 4 : Démarrage

Redémarrez votre serveur ou utilisez :

```
restart flokance_loading
refresh
```

---

## 🎨 Personnalisation complète

### 🖼️ Modifier les scènes du slider

Ouvrez `assets/js/script.js` et localisez le tableau `scenes` :

```javascript
const scenes = [
  {
    title: "Bienvenue sur le serveur",
    description: "Préparez-vous à vivre une expérience roleplay unique.",
    image: "assets/images/1.png"
  },
  {
    title: "Explorez la ville",
    description: "Des milliers de possibilités vous attendent.",
    image: "assets/images/2.png"
  },
  {
    title: "Créez votre histoire",
    description: "Incarnez le personnage de vos rêves.",
    image: "assets/images/3.png"
  }
];
```

**Options disponibles :**
- ✏️ Modifier le texte des titres et descriptions
- 🖼️ Changer les images (ajoutez vos fichiers dans `assets/images/`)
- ➕ Ajouter autant de scènes que vous souhaitez
- ➖ Supprimer des scènes existantes

### 🎧 Personnaliser la playlist musicale

Dans le même fichier `script.js`, modifiez le tableau `playlist` :

```javascript
const playlist = [
  {
    title: "Nocif",
    artist: "Hamza ft. Damso",
    file: "assets/music/nocif.mp3",
    cover: "assets/covers/nocif.png"
  },
  {
    title: "Votre titre",
    artist: "Votre artiste",
    file: "assets/music/votre_fichier.mp3",
    cover: "assets/covers/votre_cover.png"
  }
];
```

**Formats supportés :** MP3, WAV, OGG

### 📜 Modifier le contenu des modales

Localisez la fonction `openSection(section)` dans `script.js` pour personnaliser :

- **📖 Règlement** : Règles de votre serveur RP
- **📚 Histoires** : Lore et background de votre univers
- **👥 Crédits** : Votre équipe et contributeurs
- **⚙️ Paramètres** : Options utilisateur

Exemple de personnalisation du règlement :

```javascript
case "rules":
  content.innerHTML = `
    <h2>📖 Règlement du Serveur</h2>
    <div class="rules-section">
      <h3>1. Respect et Fair-Play</h3>
      <p>Le respect entre joueurs est obligatoire...</p>
    </div>
    <!-- Ajoutez vos règles ici -->
  `;
  break;
```

### 🔊 Ajuster le volume par défaut

Modifiez cette ligne dans `script.js` :

```javascript
let currentVolume = 50; // Valeur entre 0 et 100
```

### 🎨 Personnaliser les couleurs et le style

Éditez `assets/css/style.css` pour modifier :
- Les gradients de fond
- Les couleurs d'accent
- Les animations
- Les effets visuels

---

## ⌨️ Raccourcis clavier

| Touche | Action |
|--------|--------|
| **← →** | Changer de scène manuellement |
| **↑ ↓** | Régler le volume |
| **Espace** | Lecture / Pause |
| **Échap** | Fermer les modales |

---

## 🔧 Résolution de problèmes

### ❌ Le loading screen n'apparaît pas

**Solutions :**
1. ✅ Vérifiez que `ensure flokance_loading` est **en premier** dans `server.cfg`
2. ✅ Videz le cache FiveM (voir Étape 3 de l'installation)
3. ✅ Redémarrez complètement votre serveur
4. ✅ Vérifiez les logs serveur pour des erreurs

```bash
# Console serveur
restart flokance_loading
refresh
```

### 🔇 Les musiques ne se lancent pas

**Cause :** Les navigateurs (Chromium/FiveM) bloquent l'autoplay audio par sécurité.

**Solutions :**
- L'utilisateur doit effectuer une **action utilisateur** (clic, touche clavier) pour démarrer l'audio
- Ajoutez un bouton "Démarrer" visible au chargement
- Les musiques démarreront après la première interaction

### 🖼️ Images non chargées

**Vérifications :**
1. ✅ Le dossier `assets/images/` existe
2. ✅ Les chemins sont corrects dans `script.js`
3. ✅ Les fichiers sont déclarés dans `fxmanifest.lua` :

```lua
files {
    'index.html',
    'assets/css/style.css',
    'assets/js/script.js',
    'assets/images/*.png',
    'assets/covers/*.png',
    'assets/music/*.mp3'
}
```

4. ✅ Les noms de fichiers correspondent exactement (sensible à la casse)

### 🐌 Chargement lent

**Optimisations :**
- Compressez vos images (format WebP recommandé)
- Limitez la taille des fichiers audio (128-192 kbps suffisent)
- Réduisez le nombre de scènes si nécessaire

---

## 📁 Architecture des fichiers

| Fichier | Description |
|---------|-------------|
| `fxmanifest.lua` | Configuration FiveM et déclaration des ressources |
| `index.html` | Structure HTML de l'interface |
| `assets/css/style.css` | Styles, animations et thème visuel |
| `assets/js/script.js` | Logique JavaScript (scènes, musique, modales) |
| `assets/images/` | Images du slider de scènes |
| `assets/music/` | Fichiers audio de la playlist |
| `assets/covers/` | Covers d'albums pour le lecteur |

---

## 🆕 Changelog

### Version 1.0.0 (Actuelle)
- 🎉 Release initiale
- ✨ Système de scènes avec transitions fluides
- 🎵 Lecteur audio complet avec playlist
- 📚 Modales interactives (Règlement, Histoires, Crédits)
- ⌨️ Raccourcis clavier intégrés
- 📱 Design responsive

---

## 💡 Support et contribution

### Besoin d'aide ?
- 📧 Contact : [laflokancedev@gmail.com]
- 💬 Discord : [Lien vers votre serveur Discord]
- 🐛 Issues : [Lien GitHub Issues]

### Contribuer au projet
Les pull requests sont les bienvenues ! Pour des changements majeurs, ouvrez d'abord une issue pour discuter de vos idées.

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 💎 Crédits

**Développé avec ❤️ par La Flokance**

- Version : **1.0.0**
- Dernière mise à jour : Novembre 2024
- Pour la communauté FiveM

---

<div align="center">

### ⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile !

**Made for the FiveM Community**

</div>
