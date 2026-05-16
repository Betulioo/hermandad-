# Codex Guide - Frontend

## Scope

This folder contains the Next.js 16 frontend for Hermandad. It owns public pages, login, client-side auth state, route middleware for `/admin`, the admin UI, and HTTP consumption of the API in `../db/api/`.

Do not change backend code from a frontend task unless a real contract mismatch has been confirmed.

## Stack And Structure

- `src/app/` - App Router routes.
- `src/components/` - UI, layout, cards, home sections, and domain components.
- `src/services/` - API clients by domain.
- `src/lib/api.ts` - shared HTTP client.
- `src/lib/env.ts` - public API URL handling.
- `src/lib/auth.ts` - token/session helpers.
- `src/lib/config/` - site and navigation config.
- `src/context/AuthContext.tsx` - authenticated user/session state.
- `src/store/` - Zustand state, currently cart persistence.
- `src/types/` - domain types.
- `src/content/` - static typed content and fallbacks.

## Commands

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm start`

`NEXT_PUBLIC_API_URL` belongs in `.env.local`. If it is missing, `src/lib/env.ts` falls back to `http://localhost:3000`.

## Implementation Rules

- Keep UI sober, warm, traditional, clear, and mobile-first.
- Reuse existing components, helpers, service patterns, and admin layout before creating new structures.
- Components should not call `axios` or `fetch` directly; create/use a service in `src/services/`.
- Model backend contracts with types in `src/types/` and verify field names against API DTOs/controllers.
- Every page or admin flow should handle loading, error, empty, and data states where applicable.
- Forms should validate before submit and show API errors honestly.
- Keep public/admin navigation in shared config when a route needs a nav entry.
- Do not invent endpoints that do not exist.
- Preserve accessibility basics: semantic headings, labels, visible focus, contrast, `aria-current` for active navigation.

## Admin Rules

- `/admin` is protected by server-side middleware using session cookies and role `ADMIN`.
- Client-side auth is still used for UX, redirects, and hiding UI, but backend/API auth is the security source of truth.
- Admin pages are MVP-focused: manage only existing supported operations.
- Orders can be viewed by admins and their status can be changed manually.
- Destructive actions require explicit confirmation.

## Current MVP State

Implemented in the frontend: public pages, shop catalog/detail/cart/order with email capture, login and JWT session, and admin for announcements, parish info, schedules, products, and orders with manual status changes.

Out of immediate scope unless explicitly decided: payments, automatic emails beyond the approved Resend order confirmation slice, user order history, advanced order/stock management beyond the approved stock validation slice in `../docs/verticals/orders/current-state.md`, PrayerRoutines UI, and large new public sections not tied to consolidation.

## Event Module Debt

Before touching `HomeUpcomingEvents`, `EventCard`, or `src/content/home.ts`, read root `.cursor/rules/pending-eventos.mdc` and `../docs/verticals/eventos/current-state.md`.

Current documented state: events are connected in the frontend. `HomeUpcomingEvents` consumes `GET /events` through `events.service.ts` with a static fallback, `/eventos` provides a public list, `/eventos/[id]` provides public detail, `EventCard` renders `imageUrl` when present, event images use `next/image` with Cloudinary HEIC-to-JPEG normalization in `src/utils/event-format.ts`, and `/admin/eventos` provides minimal admin create/edit/deactivate/reactivate.

## Frontend Verification

- Run `npm run lint` for UI/service/type changes.
- Run `npm run build` when routing, middleware, config, or server/client boundaries changed.
- Manually smoke test affected routes when a dev server is available.
- For contract work, confirm backend endpoint shape in `db/api/src/**`.

## Documentation Notes

Cursor frontend docs contain useful state in `.cursor/rules/base-del-proyecto.md`, `.cursor/plans/current-phase.md`, and `.cursor/plans/frontend-mvp-roadmap.md`.

Possible documentation debt: `.cursor/rules/project-context.md` and `.cursor/rules/frontend-conventions.md` are deprecated pointers.
