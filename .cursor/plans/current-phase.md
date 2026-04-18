# Fase actual

## Estado
**Cierre y estabilización del MVP full stack.** El bloque **Tienda MVP** (público + carrito + pedido + admin mínimo de productos y pedidos) está **cerrado en lo esencial**. El admin cuenta con **middleware** en `/admin` (cookies de sesión + rol ADMIN).

## Validado (sincronizado con el backend)
- Home y secciones públicas con datos reales donde aplica (avisos con fallback).
- Login y sesión integrados; protección server-side de `/admin`.
- Admin operativo: avisos, parish info, horarios, **productos**, **pedidos (solo lectura)**.
- Tienda: `/tienda`, `/tienda/[slug]`, `/tienda/carrito`, `/tienda/pedido`; carrito **Zustand** persistido; pedido sin pagos ni emails.
- **No** hay historial de pedidos por usuario ni integración de pagos.

## Siguiente línea de trabajo (no excluyente; requiere decisión)
1. Consolidación: documentación, pequeña deuda técnica, tests selectivos.
2. Coordinación con backend sobre **persistencia en producción** (`synchronize` / migraciones en la API).
3. Definir la siguiente fase de producto **sin** asumir por defecto PrayerRoutines ni ecommerce avanzado.

## Fuera del foco inmediato
Ver `frontend-mvp-roadmap.md` (pagos, emails, historial de pedidos, admin complejo de pedidos, UI de PrayerRoutines).

## Último gran bloque cerrado
**Tienda MVP** end-to-end (catálogo, detalle, carrito, pedido, admin de productos y consulta de pedidos) + middleware de admin.
