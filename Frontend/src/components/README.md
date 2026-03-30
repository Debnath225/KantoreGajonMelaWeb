# Components Structure

- `layout/`: app shell components (`Navbar`, `Footer`, `Loader`)
- `sections/`: page-level sections (`Hero`, `CTA`, `Map`, `FAQSection`, etc.)
- `shared/`: reusable shared pieces (`AccordionItem`, `LanguageToggle`, `ProjectCard`)
- `common/`: legacy location kept for backward compatibility.

New imports should prefer `layout/`, `sections/`, and `shared/`.

## Styling Consistency (Design Tokens)

Global style tokens are centralized in:

- `src/styles/globals.css`

Use these base utility classes for consistent layout/typography:

- `.app-shell`: app-level background/foreground and overflow behavior
- `.section-shell`: standard section padding
- `.section-inner`: shared max-width and horizontal centering
- `.section-title`: consistent heading size/weight
- `.section-subtitle`: consistent supporting text style
- `.card-surface`: reusable card border/radius treatment

Core change points for easy theme updates:

- Typography scale: `--fs-display`, `--fs-h1`, `--fs-h2`, `--fs-h3`, `--fs-body`, `--fs-small`
- Spacing/layout: `--section-px`, `--section-py`, `--container-max`
- Brand colors: `--color-bg`, `--color-fg`, `--color-primary`, `--color-primary-strong`
- Surface style: `--radius-card`, `--radius-section`, `--border-soft`

Typography defaults:

- Families: `--font-family-base`, `--font-family-heading`, `--font-family-mono`
- Weights: `--fw-regular`, `--fw-medium`, `--fw-semibold`, `--fw-bold`, `--fw-extrabold`
- Scale helpers: `.typo-display`, `.typo-h1`, `.typo-h2`, `.typo-h3`, `.typo-body`, `.typo-small`, `.typo-micro`
