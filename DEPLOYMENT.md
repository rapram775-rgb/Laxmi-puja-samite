# Vercel deployment

1. Upload/replace the project files in the GitHub `main` branch.
2. Confirm `package.json`, `package-lock.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/styles.css`, and `src/data/content.js` are in the repository root/project root.
3. Redeploy the Vercel project.
4. The project uses `npm ci` for installation and `npm run build` for production.
5. Do not add `tsconfig.node.json` or a `tsc -b` build command; the previous deployment failure came from that TypeScript build step.

All content marked `[ ... ]` is intentionally a placeholder for the committee's final details.
