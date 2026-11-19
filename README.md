# westparker.com

The personal website of West Parker. Built by hand in plain HTML, CSS and JavaScript, with no framework, template or build step.

The homepage is an interactive star chart. Each named star is a project; hover over it or tap it to read about the project.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| About | `about/index.html` |
| Apps | `apps/index.html` |
| Calorie calculator | `apps/calories/index.html` |
| Contact | `contact/index.html` |
| Links | `links/index.html` (not in the menu; reached by its URL) |

## How it's built

- `assets/sky.js` draws the star chart on a canvas.
- `assets/projects.js` holds the projects shown as stars.
- `assets/site.css` holds all styling. Colors and fonts are set in the `:root` block at the top.

## Common edits

- **Add a project star:** copy a block in `assets/projects.js`, then change the text, links and position.
- **Add an app:** copy an `<li class="app">` block in `apps/index.html`.

## Run it locally

```
python3 -m http.server 3000
```

Then open http://localhost:3000.

## Hosting

Deployed on Render as a static site. Every push to `main` goes live automatically.

## Credits

- Font: [Space Grotesk](https://github.com/floriankarsten/space-grotesk), SIL Open Font License, hosted in `assets/fonts/`.
- The Special Forces crest, Chicago Booth logo and Deloitte logo belong to their respective owners.
