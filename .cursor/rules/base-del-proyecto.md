---
description: Base rules for Hermandad web MVP
alwaysApply: true
---

- Este proyecto corresponde a una web de parroquia/hermandad con **tienda MVP integrada** (catálogo, carrito, pedido vía API; sin pagos y con confirmacion de pedido por Resend cuando este configurado).
- Mantener tono visual sobrio, cálido, tradicional y claro.
- Priorizar mobile first.
- No inventar páginas ni ampliar alcance sin que se pida explícitamente.
- Priorizar componentes reutilizables antes que soluciones específicas.
- Pensar siempre en MVP mantenible.
- Stack objetivo: Next.js + Tailwind.
- Favorecer accesibilidad básica: jerarquía semántica, labels, contraste, focus visible.
- Evitar sobreingeniería en el MVP.
- En UI pública priorizar: horarios, avisos, agenda, participación y tienda (ya enlazadas en el MVP actual).
- Cuando se propongan nuevas pantallas o componentes, indicar si son genéricos o específicos del MVP.
- Cuando se escriba código, usar naming consistente y estructura clara de componentes.
- En el panel Admin: mantener un enfoque MVP. Reutilizar patrones existentes (como `extractErrorMessage`, `inputClass`, layouts comunes) y aceptar las limitaciones reales del backend en lugar de inventar endpoints no existentes o añadir sobreingeniería.
- No tocar el backend al trabajar en el frontend salvo necesidad estricta y real.
