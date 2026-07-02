# 💰 Haushalts-App

Statisches Frontend für die Haushalts-App, gehostet auf [GitHub Pages](https://pages.github.com). Kommuniziert mit dem [haushalts-backend](https://github.com/Michdo93/haushalts-backend) über eine REST-API.

## Features

- **Login & Registrierung** mit JWT-Token (7 Tage gültig)
- **Dashboard** – Monatsübersicht, Einnahmen/Ausgaben/Saldo, Balkendiagramm nach Kategorie, Monatsverlauf
- **Transaktionen** – Liste mit Filter (Monat, Typ), Erstellen, Bearbeiten, Löschen
- **Kategorien** – Standard-Kategorien + eigene Kategorien mit Emoji

## Seiten

| Datei | Beschreibung |
|-------|-------------|
| `index.html` | Login / Registrierung |
| `pages/dashboard.html` | Monatsübersicht & Diagramme |
| `pages/transaktionen.html` | Transaktionsliste & -verwaltung |
| `pages/kategorien.html` | Kategorien verwalten |

## Setup

### 1. Backend-URL eintragen

In `js/api.js` Zeile 5 die Render.com-URL eintragen:

```js
const BACKEND_URL = 'https://haushalts-backend-xxxx.onrender.com';
```

### 2. Repo erstellen & pushen

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Michdo93/haushalts-app.git
git push -u origin main
```

### 3. GitHub Pages aktivieren

Repository → **Settings → Pages → Source: Deploy from branch → main / root** → Save

Die App ist dann unter `https://Michdo93.github.io/haushalts-app/` erreichbar.

## Architektur

```
haushalts-app/          ← GitHub Pages (dieses Repo)
├── index.html          ← Login-Seite
├── css/style.css       ← Design-System (Dunkel, Grün)
├── js/
│   ├── api.js          ← API-Client (fetch + JWT)
│   └── nav.js          ← Navigation & Auth-Guard
└── pages/
    ├── dashboard.html
    ├── transaktionen.html
    └── kategorien.html

haushalts-backend       ← Render.com (separates Repo)
```

## Standard-Kategorien

Beim Registrieren werden automatisch 13 Kategorien angelegt:

**Einnahmen:** Gehalt, Nebeneinkommen, Sonstiges  
**Ausgaben:** Miete, Lebensmittel, Transport, Gesundheit, Freizeit, Kleidung, Versicherung, Strom/Gas, Telefon/Internet, Sonstiges
