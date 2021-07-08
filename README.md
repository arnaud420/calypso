# Calypso

Calypso est une applicaiton mobile développée en React Native. C'est un réseau social autour de la musique.   
L'application permet à des utilisateurs authentifiés de voir les news musicales, de partager son top de morceaux favoris, et de publier du contenu.

Voir [Cahier des charges](https://gitlab.com/simontlz/calypso/-/wikis/Cahier-des-charges).

[[_TOC_]]

## Installation
```bash
git clone https://gitlab.com/simontlz/calypso.git
cd calypso
npm install
```

## Lancer le projet
```bash
npm run start

# Android 
npm run android

# IOS
npm run ios

# Web
npm run web
```

## Cloud Functions

Les clouds fonctions sont dans le dossier `firebase/functions`.

### Installation

Aller sur https://console.firebase.google.com/project/<PROJECT_NAME>/settings/serviceaccounts/adminsdk et générer une **clé privée**.   
Renommer le fichier `credentials.json` et le placer dans `firebase/`.

```bash
cd firebase/functions
npm install
```

### Utilisation

Les functions sont écrites en _Typescript_, il faut donc penser à compiler avant de tester et déployer.

* **Build** : `npm run build`
* **Tester en local** : `npm run serve`
* **Déployer** : `npm run deploy`