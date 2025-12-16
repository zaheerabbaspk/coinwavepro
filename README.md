# coinwavepro

An Ionic + Angular project.

## Tailwind CSS (installed)

- Added Tailwind configuration and PostCSS integration so you can use Tailwind utility classes across the app.
- Files added: `tailwind.config.cjs`, `postcss.config.cjs`.
- Changes: injected Tailwind directives into `src/global.scss` (base, components, utilities).
- Note: To keep compatibility with the current Angular build, Tailwind v3 was installed. If you want Tailwind v4, install `@tailwindcss/postcss` and follow Tailwind v4 migration instructions.

### How to verify

- Run `npm run build` or `npm start` and confirm the build finishes without errors and `styles` bundle contains Tailwind utilities.
- Use Tailwind classes in templates, e.g. `<div class="p-4 bg-blue-500 text-white">Hello</div>`.
