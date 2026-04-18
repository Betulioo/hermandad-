export type ProductCategory = 'devocionario' | 'publicaciones' | 'indumentaria';

export const productCategoryLabels: Record<ProductCategory, string> = {
  devocionario: 'Artículos devocionales',
  publicaciones: 'Libros y publicaciones',
  indumentaria: 'Indumentaria',
};

export const productCategoryDescriptions: Record<ProductCategory, string> = {
  devocionario: 'Medallas, escapularios, rosarios y artículos de devoción de la Hermandad.',
  publicaciones: 'Historia, espiritualidad y patrimonio de la Parroquia y la Hermandad.',
  indumentaria: 'Camisetas, bolsas y complementos con el emblema de la Hermandad.',
};


export const tiendaHero = {
  title: 'Tienda',
  subtitle: 'Artículos devocionales, publicaciones e indumentaria de la Hermandad.',
};

export const tiendaNote =
  'Los artículos están disponibles en la secretaría parroquial en horario de oficina. La venta online estará disponible próximamente.';
