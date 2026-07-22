# Bubble House Nutrition — Project Rules

These instructions apply to every future task and to every file in this repository.

## Project identity

- This project belongs to **Bubble House Nutrition**.
- Preserve the brand's visual identity, tone, business information, and official assets.
- Do not modify, redraw, replace, recolor, crop, distort, or generate variants of the official logo unless the user gives explicit authorization.

## Protected files and assets

- `components/Hero.tsx` is finished and must not be modified without explicit user authorization.
- Never replace real photographs with AI-generated images.
- Use the original photographs provided by Bubble House Nutrition whenever possible.
- Do not delete files or assets unless the user explicitly requests it.

## Design standards

- Maintain a premium, modern, clean, and elegant visual design.
- Prioritize generous whitespace, clear visual hierarchy, polished typography, balanced composition, and a high-quality interface.
- Keep the existing visual language consistent across all sections and responsive breakpoints.
- Do not change the design of unrelated sections while implementing a requested task.
- Preserve accessibility, semantic HTML, keyboard usability, readable contrast, and responsive behavior.

## Engineering standards

- Keep the code clean, readable, reusable, maintainable, and appropriately typed.
- Follow the current best practices for Next.js 16, React 19, TypeScript, and Tailwind CSS 4.
- This version of Next.js may contain breaking changes to APIs, conventions, and file structure. Before writing code, read the relevant guide in `node_modules/next/dist/docs/` and heed all deprecation notices.
- Prefer Server Components by default. Use Client Components only when interactivity or browser-only APIs require them.
- Reuse existing components, data, types, styles, and assets when appropriate instead of duplicating them.
- Keep business content centralized in the existing `data` directory when practical.
- Avoid adding dependencies unless they are necessary and explicitly justified by the requested task.

## Change scope

- Modify only the files explicitly requested by the user or files strictly required to complete the requested change.
- Do not make opportunistic refactors, formatting changes, cleanup, renames, or unrelated fixes.
- If an additional change appears necessary, stop and request explicit authorization before applying it.
- Preserve existing user work and do not overwrite unrelated changes.

## Validation and handoff

- Before finishing every task, run ESLint with `npm run lint`.
- Run additional focused checks when appropriate, but do not modify unrelated files merely to make those checks pass.
- If validation cannot be completed, clearly explain why and report any remaining errors.
- At the end of every task, list and briefly explain every file that was modified.
