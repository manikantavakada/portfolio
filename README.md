# Vakada Manikanta Portfolio

Premium personal developer portfolio built as a static site with HTML, CSS, JavaScript, and JSON-driven content.

## Run locally

From the project root:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Update content

Main content lives in:

- `data/site-content.json`

Project screenshots live in:

- `assets/projects/`

## Free deployment options

### Netlify

1. Push this folder to a GitHub repository.
2. Go to Netlify and import the repository.
3. Use these settings:

```text
Build command: leave empty
Publish directory: .
```

### Vercel

1. Push this folder to a GitHub repository.
2. Go to Vercel and import the repository.
3. Use these settings:

```text
Framework preset: Other
Build command: leave empty
Output directory: .
```

### GitHub Pages

1. Push this folder to a GitHub repository.
2. In GitHub, open `Settings > Pages`.
3. Under `Build and deployment`, choose:

```text
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

## Suggested next steps

- Replace any placeholder content in `data/site-content.json`
- Verify all screenshot file names match the JSON
- Add a custom domain later if needed
