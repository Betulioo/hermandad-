# Fase actual

## Estado
**Cierre y estabilización del MVP full stack.** El bloque **Tienda MVP** (público + carrito + pedido + admin mínimo de productos y pedidos) está **cerrado en lo esencial**. **Eventos** está integrado end-to-end. El admin es **mínimo y protegido** con middleware en `/admin` (cookies de sesión + rol ADMIN).

## Validado (sincronizado con el backend)
- Home y secciones públicas con datos reales donde aplica (avisos con fallback).
- Login y sesión integrados; protección server-side de `/admin`.
- Admin protegido y operativo en alcance mínimo: avisos, parish info, horarios, **productos**, **pedidos con cambio manual de estado**, **eventos**.
- Tienda: `/tienda`, `/tienda/[slug]`, `/tienda/carrito`, `/tienda/pedido`; carrito **Zustand** persistido; pedido sin pagos y con email de contacto para confirmación por Resend cuando esté configurado. El checkout valida disponibilidad antes de crear pedido, sin reservar/descontar stock al crear el pedido.
- **Eventos**: listado público `/eventos`, detalle `/eventos/[id]` con `notFound()` real, admin operativo en alcance MVP; fallback estático solo ante error de API en Home/listado y sin enlaces a detalle fallback; utilidades compartidas en `src/utils/event-format.ts`.
- **No** hay historial de pedidos por usuario ni integración de pagos.

## Siguiente línea de trabajo (no excluyente; requiere decisión)
1. Consolidación: documentación, pequeña deuda técnica y tests selectivos.
2. Resolver deuda no bloqueante de Next.js 16: migrar convención `middleware` a `proxy`.
3. Definir la siguiente fase de producto **sin** asumir por defecto PrayerRoutines, pagos, historial de pedidos ni ecommerce avanzado.

## Fuera del foco inmediato
Ver `frontend-mvp-roadmap.md` (pagos, historial de pedidos, admin complejo de pedidos, UI de PrayerRoutines). La confirmación de pedido por Resend y el slice acotado de validación de stock quedan aprobados; el detalle de reglas vive en `../../../docs/verticals/orders/current-state.md`.

## Último gran bloque cerrado
**Tienda MVP** end-to-end (catálogo, detalle, carrito, pedido, admin de productos y consulta de pedidos) + middleware de admin.
