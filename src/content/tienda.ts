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

export interface ProductMock {
  id: string;
  name: string;
  price: string;
  description: string;
  fullDescription: string;
  category: ProductCategory;
  featured?: boolean;
}

export const mockProductos: ProductMock[] = [
  // Artículos devocionales
  {
    id: '1',
    name: 'Medalla de la Hermandad',
    price: '12,00 €',
    description: 'Medalla oficial en plata de ley con esmalte azul. Incluye cadena.',
    fullDescription:
      'Medalla oficial de la Hermandad de Santa María la Antigua, fabricada en plata de ley 925 con esmalte azul en el anverso. Incluye cadena plateada de 45 cm. Presentada en estuche con el emblema de la Hermandad. Disponible en tamaño estándar (2,5 cm) y grande (3,5 cm). Solicitar tamaño en secretaría.',
    category: 'devocionario',
    featured: true,
  },
  {
    id: '2',
    name: 'Escapulario de la Hermandad',
    price: '8,00 €',
    description: 'Escapulario bordado a mano sobre tela de seda natural.',
    fullDescription:
      'Escapulario oficial de la Hermandad, confeccionado artesanalmente con tela de seda natural y bordado a mano con el escudo de la Hermandad en hilo dorado. Medidas: 8 × 6 cm. Incluye cordón de lana en color granate. Cada pieza es única y puede presentar ligeras variaciones propias del bordado artesanal.',
    category: 'devocionario',
  },
  {
    id: '3',
    name: 'Rosario de madera',
    price: '10,00 €',
    description: 'Rosario artesanal de madera de olivo con crucifijo plateado.',
    fullDescription:
      'Rosario artesanal elaborado con cuentas de madera de olivo de 8 mm, engarzadas en hilo de acero inoxidable. Crucifijo de metal plateado de 4 cm. Medalla central con imagen de Santa María la Antigua. Presentado en bolsita de tela con el sello de la Hermandad. Bendecido por el párroco antes de su venta.',
    category: 'devocionario',
  },
  {
    id: '4',
    name: 'Pin esmaltado',
    price: '5,00 €',
    description: 'Pin esmaltado con el escudo de la Hermandad. Cierre de mariposa.',
    fullDescription:
      'Pin esmaltado de alta calidad con el escudo oficial de la Hermandad de Santa María la Antigua. Dimensiones: 2 × 1,8 cm. Acabado en metal dorado con esmalte de colores vivos. Cierre de mariposa. Ideal como recuerdo o para lucir en la solapa. Presentado en tarjeta de cartón con el nombre de la Hermandad.',
    category: 'devocionario',
    featured: true,
  },
  // Libros y publicaciones
  {
    id: '5',
    name: 'Historia de la Hermandad',
    price: '18,00 €',
    description: 'Historia de la Hermandad desde sus orígenes hasta la actualidad. 320 páginas.',
    fullDescription:
      'Obra definitiva sobre la historia de la Hermandad de Santa María la Antigua, desde su fundación en el siglo XVII hasta nuestros días. 320 páginas con ilustraciones, documentos históricos originales y fotografías del archivo de la Hermandad. Prólogo del Hermano Mayor. Edición en tapa dura con sobrecubierta. Texto de D. Manuel Cortés Herrera, historiador parroquial.',
    category: 'publicaciones',
  },
  {
    id: '6',
    name: 'Guía de Semana Santa',
    price: '6,00 €',
    description: 'Guía oficial de la Semana Santa con itinerarios, horarios y patrimonio.',
    fullDescription:
      'Guía oficial de la Semana Santa editada por la Parroquia de Santa María la Antigua. Incluye los itinerarios completos de todas las cofradías, horarios de salida y entrada, mapa del recorrido, fichas de patrimonio artístico y notas históricas. 96 páginas. Edición actualizada para el año en curso. Texto e ilustraciones del equipo parroquial.',
    category: 'publicaciones',
  },
  {
    id: '7',
    name: 'Libro de Reglas de la Hermandad',
    price: '10,00 €',
    description: 'Edición facsímil del Libro de Reglas original del siglo XVIII.',
    fullDescription:
      'Edición facsímil del Libro de Reglas original de la Hermandad, datado en 1748 y conservado en el archivo parroquial. Reproducción completa del manuscrito con transcripción paleográfica y notas a pie de página. 88 páginas en papel envejecido. Encuadernación en rústica con cubierta imitación pergamino. Estudio introductorio de la Dra. Carmen Álvarez, de la Universidad de Sevilla.',
    category: 'publicaciones',
  },
  // Indumentaria
  {
    id: '8',
    name: 'Camiseta oficial',
    price: '15,00 €',
    description: 'Camiseta de algodón 100 % con el escudo de la Hermandad. Tallas S–XXL.',
    fullDescription:
      'Camiseta oficial de la Hermandad de Santa María la Antigua. Confeccionada en algodón 100 % de alta calidad (180 g/m²). Serigrafía del escudo de la Hermandad en el pecho izquierdo y nombre en la espalda. Disponible en blanco y azul marino. Tallas: S, M, L, XL y XXL. Indicar talla y color al realizar el pedido en secretaría. Lavado a máquina hasta 40 °C.',
    category: 'indumentaria',
  },
  {
    id: '9',
    name: 'Bolsa de tela',
    price: '8,00 €',
    description: 'Bolsa de algodón con asas largas y escudo bordado. Apta para uso diario.',
    fullDescription:
      'Bolsa de tela de algodón natural con el escudo de la Hermandad bordado en el frente. Medidas: 38 × 42 cm. Asas largas de 65 cm para llevar al hombro. Capacidad: 10 litros. Sin forro interior. Resistente al uso cotidiano. Ideal como bolsa de compra o de playa. Color: crudo natural. Lavado a mano.',
    category: 'indumentaria',
  },
  {
    id: '10',
    name: 'Bufanda de la Hermandad',
    price: '12,00 €',
    description: 'Bufanda oficial en colores corporativos con el nombre de la Hermandad.',
    fullDescription:
      'Bufanda oficial de la Hermandad confeccionada en punto acrílico suave en los colores corporativos azul marino y blanco. Franjas horizontales con el nombre de la Hermandad bordado en el extremo. Medidas: 20 × 150 cm. Ideal para los meses de invierno y para actos de la Hermandad. Presentada en bolsa de tela con tarjeta identificativa.',
    category: 'indumentaria',
  },
];

export const tiendaHero = {
  title: 'Tienda',
  subtitle: 'Artículos devocionales, publicaciones e indumentaria de la Hermandad.',
};

export const tiendaNote =
  'Los artículos están disponibles en la secretaría parroquial en horario de oficina. La venta online estará disponible próximamente.';
