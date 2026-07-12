# Fase actual

## Estado
**Cierre y estabilización del MVP full stack.** El bloque **Tienda MVP** (público + carrito + pedido + admin mínimo de productos y pedidos) está **cerrado en lo esencial**. **Eventos** está integrado end-to-end. El admin es **mínimo y protegido** con middleware en `/admin` (cookies de sesión + rol ADMIN).

## Validado (sincronizado con el backend)
- Home y secciones públicas con datos reales donde aplica. Reenfocada hacia comunidad: `CommunitySection` (carrusel) va justo tras el hero, y `HomeQuickLinks` está oculto.
- Login y sesión integrados; protección server-side de `/admin`. El enlace público "Acceder" está oculto en header (desktop y móvil); el login sigue accesible por `/login` directo.
- Admin protegido y operativo en alcance mínimo: avisos, parish info, horarios, **productos**, **pedidos con cambio manual de estado**, **eventos**.
- Tienda: `/tienda`, `/tienda/[slug]`, `/tienda/carrito`, `/tienda/pedido`; carrito **Zustand** persistido; pedido sin pagos y con email de contacto para confirmacion por Resend cuando este configurado. Decision actualizada para el siguiente slice acotado: el checkout mantiene validacion previa de disponibilidad, pero `POST /orders` debe reservar/descontar stock transaccionalmente al crear el pedido.
- **Eventos**: listado público `/eventos`, detalle `/eventos/[id]` con `notFound()` real, admin operativo en alcance MVP; fallback estático solo ante error de API en Home/listado y sin enlaces a detalle fallback; utilidades compartidas en `src/utils/event-format.ts`.
- **Avisos en Home**: `HomeLatestAnnouncements` muestra solo avisos reales de la API; si no hay (vacío o error), la sección no se renderiza (sin datos placeholder).
- **Comunidad**: carrusel público reutilizable (`CommunitySection` + `CommunityCarousel`, scroll-snap + flechas, sin librerías) en Home y `/hermandad`, con contenido estático en `src/content/comunidad.ts` (fotos reales de procesiones en Cloudinary). Incluye lightbox: al pulsar una foto se abre modal con imagen ampliada, caption y navegación anterior/siguiente (flechas y teclas, cierre por botón/backdrop/Escape).
- **Navegación**: `/parroquia` retirada del menú (ruta aún accesible por URL directa, oculta blanda). Participación reducida a "Hazte hermano" en Home y `/hermandad`; anclas `#joven`/`#voluntariado` retiradas.
- **Refinado visual de Home (contenido escaso)**: `Section` admite variante `spacing="none"` para control fino de padding. `HomeEssentialInfo` centra las tarjetas (flex-wrap) y reduce la separación superior. `HomeUpcomingEvents` muestra una card destacada grande y centrada (imagen + datos, estilo detalle) cuando hay 1 evento, dos centradas cuando hay 2, grid cuando hay 3+; spacing compacto. `HomeParticipation` presenta el ítem único ("Hazte hermano") como banner CTA horizontal en lugar de card aislada. `HomeLocationContact` incrusta el mapa real de Google Maps (iframe sin API key, coords de la parroquia en `content/home.ts` como `mapsEmbedSrc`) y mejora el contraste (tarjeta blanca + textos `text-secondary`). `SiteFooter` mejora contraste usando tonos `text-white/*` sobre fondo oscuro.
- **No** hay historial de pedidos por usuario ni integración de pagos.

## Siguiente línea de trabajo (no excluyente; requiere decisión)
1. Consolidación: documentación, pequeña deuda técnica y tests selectivos.
2. Resolver deuda no bloqueante de Next.js 16: migrar convención `middleware` a `proxy`.
3. Definir la siguiente fase de producto **sin** asumir por defecto PrayerRoutines, pagos, historial de pedidos ni ecommerce avanzado.

## Fuera del foco inmediato
Ver `frontend-mvp-roadmap.md` (pagos, historial de pedidos, admin complejo de pedidos, UI de PrayerRoutines). La confirmacion de pedido por Resend y el slice acotado de proteccion de stock quedan aprobados; el detalle de reglas vive en `../../../docs/verticals/orders/current-state.md`.

## Último gran bloque cerrado
**Tienda MVP** end-to-end (catálogo, detalle, carrito, pedido, admin de productos y consulta de pedidos) + middleware de admin.
