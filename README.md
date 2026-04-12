# BJJ Dojo Manager - Landing Page (Next.js)

This is a Next.js (App Router) conversion of the provided single-file HTML landing page.
The UI (layout, spacing, animations) is preserved, while the copy was rewritten for **BJJ Dojo Manager**.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Where to edit content

- Main page: `components/LandingPage.tsx`
- Styles: `app/globals.css`
- Images: `public/images/*` (replace with BJJ photos whenever you like)

## Notes

- Scroll animations use Intersection Observer (same behavior as the original HTML).
- Mobile menu is handled with React state.
