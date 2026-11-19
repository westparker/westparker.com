# westparker.com

Personal site. Plain HTML, CSS and JavaScript. No framework, no build step.

## Pages

| URL | File |
|---|---|
| `/` | `index.html`: the star chart. Stars come from `assets/projects.js` |
| `/about/` | `about/index.html` |
| `/apps/` | `apps/index.html`: live apps people can try |
| `/apps/calories/` | `apps/calories/index.html`: daily calorie calculator |
| `/contact/` | `contact/index.html` |
| `/links/` | `links/index.html`: put this URL in your Instagram/LinkedIn bio |

## Common edits

- **Add a star:** copy a block in `assets/projects.js`, change the text, links, and position.
- **Add an app:** copy an `<li class="app">` block in `apps/index.html`.
- **Change colors or fonts:** the `:root` block at the top of `assets/site.css`.

## Run it locally

```
bin/server
```
then open http://localhost:3000

## Deploy (Render)

Static Site. Build command: leave blank. Publish directory: `.`

## Fonts

Cardo (SIL Open Font License) and Gillius ADF (GPL with font exception), self-hosted in `assets/fonts/`.
