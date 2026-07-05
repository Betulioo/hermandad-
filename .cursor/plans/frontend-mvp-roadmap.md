# Frontend MVP Roadmap

## Objetivo
Construir un frontend funcional y mantenible para la app web de la parroquia Santa María la Antigua, integrado con el backend real.

---

## Estado de fases

### [x] Fase 1 — Setup técnico y estructura base
Next.js, Tailwind, estructura de carpetas, cliente API, contexto de auth.

### [x] Fase 2 — Layout + Home
Layout global, cabecera, pie, navegación. Home con **avisos reales** desde backend con fallback estático.

### [x] Fase 3 — Páginas públicas principales
- Avisos: listado y detalle con datos reales.
- Horarios: listado público con datos reales.
- Parroquia / Hermandad: datos reales desde ParishInfo.
- **Tienda:** catálogo público real, detalle por slug (`/tienda/[slug]`). Carrito con **Zustand + persistencia en localStorage**. Sin pagos; captura email de contacto para confirmación por Resend cuando esté configurado.

### [x] Fase 4 — Login
Login integrado con backend. Sesión con JWT; cookies usadas también para **middleware** de `/admin`.

### [x] Fase 5 — Admin MVP
Layout admin común. Secciones operativas:
- **Avisos**: listar, crear, editar, desactivar, reactivar.
- **Horarios**: activos e inactivos; crear, editar, desactivar, reactivar.
- **Parish Info**: lectura y edición.
- **Productos**: gestión acorde al backend (incl. desactivación).
- **Pedidos**: listado, detalle y cambio manual de estado (`GET /orders/admin`, `GET /orders/admin/:id`, `PATCH /orders/admin/:id/status`).

**Protección de `/admin`:** middleware Next.js que exige cookie de token y rol `ADMIN` (no solo guard en cliente).

### [x] Fase 6 — Tienda MVP + hardening admin (cerrado en lo esencial)
- Rutas: `/tienda`, `/tienda/[slug]`, `/tienda/carrito`, `/tienda/pedido`.
- Pedido: `POST /orders` con `customerEmail` y líneas **`productId` + `quantity`**; vaciado de carrito tras éxito. El checkout debe validar stock actual antes de confirmar como feedback temprano; la decision actualizada para el siguiente slice acotado es que `POST /orders` reserve/descuente stock transaccionalmente al crear el pedido.
- Middleware server-side de `/admin` operativo.

### [ ] Fase 7 — Consolidación (siguiente foco razonable)
- Limpieza técnica menor (p. ej. duplicación en helpers de error/estilos si molesta).
- Alineación documental y tests donde aporten valor.
- Decisión explícita de **siguiente fase** (sin asumir PrayerRoutines ni ecommerce avanzado por defecto).

---

## Fuera del foco inmediato del MVP
- Pagos y pasarelas.
- Emails automáticos fuera del slice aprobado de confirmación de pedido con Resend.
- Historial de pedidos por usuario autenticado.
- Panel admin avanzado de pedidos (edición de líneas, stock fino). El slice aprobado de stock se limita a validar antes de confirmar, reservar/descontar al crear pedido, restaurar al cancelar pedido pendiente, mostrar “agotado”/bloqueos de líneas y respetar las reglas backend documentadas en `../../../docs/verticals/orders/current-state.md`.
- UI de **PrayerRoutines** (backend existe; no es el siguiente foco por defecto).
- Registro público amplio, recuperación de contraseña (salvo decisión contraria).

*Nota:* “Registro/recuperación” pueden valorarse en el futuro; no son parte del alcance cerrado aquí.

---

## Restricciones
- No hacer panel admin innecesariamente complejo.
- No tratar la tienda como ecommerce completo (sin pagos en este MVP).
- Priorizar coherencia con la API real sobre features nuevas no acordadas.
