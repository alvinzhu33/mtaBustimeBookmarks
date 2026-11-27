# My Bus Board — directed network starter

A mobile-first static website for GitHub Pages. Locations are reusable nodes and connections are directional edges between them.

## Files

- `index.html` — page structure
- `styles.css` — responsive styling
- `data.js` — edit this file to configure `locations_data` and `connections_data`
- `app.js` — renders cards and handles navigation

## Data model

### Locations

```js
const locations_data = {
  home: { id: "home", name: "Home", color: "#356AE6" },
  work: { id: "work", name: "Work", color: "#198754" }
};
```

Every location can be either an origin or a destination.

### Directed connections

```js
const connections_data = {
  home: {
    work: [
      {
        id: "b42-to-work",
        busLine: "B42",
        stopName: "Stop name",
        stopcode: "123456"
      }
    ]
  }
};
```

The key `home` is the origin and `work` is the destination. To configure the reverse trip, add a separate `work: { home: [...] }` entry. Reverse connections are not generated automatically.

## Navigation behavior

- Starting points, destinations, and bus options are displayed together on one page.
- Selecting a starting point updates the destination cards to show connections configured under `connections[selectedOriginId]`.
- Selecting a destination with one bus option opens its MTA Bus Time stop search directly.
- Selecting a destination with multiple bus options displays them in Step 3.
- Selecting a bus option opens its MTA Bus Time stop search.
- If the stop code is blank, the app displays an instruction rather than navigating to a broken link.

The configuration supports a single option object or an array of option objects per directed connection, but arrays are recommended for consistency.

## Find the MTA Bus Time stop code

1. Visit https://bustime.mta.info/
2. Find the stop you want to use.
3. Copy its stop code into that option's `stopcode` field.
4. The app builds the search URL using `https://bustime.mta.info/?search=` and the stop code.
5. Test the link on your phone.

## Preview locally

Open `index.html` in a browser. If local-file restrictions interfere, run a local server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish on GitHub Pages

1. Create a GitHub repository.
2. Upload `index.html`, `styles.css`, `data.js`, and `app.js`.
3. Go to **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Open the published Pages URL.

No build step, server, account system, or API key is required for this link-based version.

## Privacy note

If the repository is public, the `data.js` contents are public too. Avoid storing private details such as exact home addresses; use labels like "Home" instead.
