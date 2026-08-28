# ScaleForge IT — Deployment

## GitHub

1. Extract this ZIP.
2. Upload the **contents** of the extracted folder to the root of the GitHub repository. Do not upload the ZIP as the only repository file.
3. Make sure `package.json` and `package-lock.json` are in the repository root.
4. GitHub Actions should run `npm ci` + `npm run build`. TypeScript checking is available separately with `npm run typecheck`.

## Vercel

Use the existing Vercel project connected to the repository.

- Framework Preset: Vite
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: 22.x

If Vercel shows **Deployment rate limited — retry in 24 hours**, that is an account/project deployment limit, not an application-code build error. Do not create duplicate Vercel projects to work around it.

## Location map

The FIND US IN POKHARA section uses a normal Google Maps embed for the ScaleForge IT location and does not apply a dark/inverting CSS filter over the map.
