# Frontend — Hermandad

Aplicación Next.js 16 (App Router) + React 19 + Tailwind v4. Consume la API de `db/api/`.

## Requisitos

- Node 20+
- Backend `db/api/` corriendo y accesible vía HTTP.

## Configuración

Crear `frontend/.env.local`:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:<puerto-backend>
\`\`\`

Si no se define, `src/lib/env.ts` usa `http://localhost:3000` como fallback.

## Scripts

- `npm run dev` — servidor de desarrollo.
- `npm run build` — build de producción.
- `npm start` — servir el build.
- `npm run lint` — ESLint.

## Rutas

Públicas:

- `/` — home
- `/parroquia`, `/hermandad`
- `/horarios`
- `/avisos`, `/avisos/[id]`
- `/tienda`, `/tienda/[slug]`
- `/tienda/carrito`, `/tienda/pedido`
- `/login`

Admin (requieren sesión con rol ADMIN):

- `/admin/avisos`
- `/admin/productos`
- `/admin/pedidos`, `/admin/pedidos/[id]` (consulta y cambio de estado)
- `/admin/parish-info`
- `/admin/horarios`

El guardado de sesión y la redirección al `/login` cuando no hay usuario se resuelven en `src/app/admin/layout.tsx` y `src/context/AuthContext`.

## Estructura relevante

- `src/app/` — rutas (App Router).
- `src/components/` — componentes UI.
- `src/services/` — clientes HTTP por dominio (`products`, `orders`, `orders-admin`, `announcements`, `parish-info`, `prayer-schedules`, `auth`).
- `src/lib/` — utilidades (`api.ts`, `env.ts`, `auth.ts`, mappers, config).
- `src/context/` — `AuthContext`.
- `src/types/` — tipos del dominio.

## Estado y alcance

El alcance del MVP y lo que queda fuera está en el README raíz del repositorio.
