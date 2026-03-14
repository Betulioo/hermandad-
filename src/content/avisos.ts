export type AvisoCategory = 'comunidad' | 'cultos' | 'hermandad' | 'parroquia';

export const avísoCategoryLabels: Record<AvisoCategory, string> = {
  comunidad: 'Comunidad',
  cultos: 'Cultos',
  hermandad: 'Hermandad',
  parroquia: 'Parroquia',
};

export interface AvisoMock {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  isImportant: boolean;
  category?: AvisoCategory;
}

export const mockAvisos: AvisoMock[] = [
  {
    id: '1',
    title: 'Campaña de recogida de alimentos',
    excerpt:
      'Hasta el 30 de junio, la Parroquia recoge alimentos no perecederos para las familias más vulnerables del barrio. Depositadlos en las cajas habilitadas en la entrada.',
    content: `Hasta el 30 de junio, la Parroquia de Santa María la Antigua pone en marcha su campaña anual de recogida de alimentos no perecederos para las familias más vulnerables del barrio.

Podéis depositar vuestra aportación en las cajas habilitadas en la entrada principal de la Parroquia, de lunes a viernes en horario de 9:00 a 13:00 h y de 17:00 a 20:00 h.

Se agradecen especialmente: legumbres, pasta, arroz, aceite, leche y conservas. No se aceptan productos caducados ni artículos de higiene.

Toda la recogida será gestionada a través de Cáritas Parroquial y distribuida entre las familias en seguimiento durante el mes de julio.

Para más información, podéis dirigiros a la secretaría parroquial o al grupo de voluntariado.`,
    date: '1 de junio de 2025',
    isImportant: true,
    category: 'comunidad',
  },
  {
    id: '2',
    title: 'Cambio de horario de verano',
    excerpt:
      'A partir del 15 de junio, la misa vespertina del domingo se adelanta a las 20:00 h. El resto de horarios se mantienen sin cambios hasta septiembre.',
    content: `Con la llegada del verano, la Parroquia adapta su horario de misas para facilitar la asistencia de los fieles durante los meses de calor.

A partir del domingo 15 de junio y hasta el domingo 14 de septiembre inclusive, los cambios son los siguientes:

— Misa vespertina del domingo: se adelanta a las 20:00 h (antes 20:30 h).
— Misa de laborables: se mantiene a las 9:00 h.
— Misa del sábado: se mantiene a las 19:00 h.
— Misa del domingo de 12:00 h: sin cambios.

Durante el mes de agosto, en caso de ausencia del párroco, las misas serán atendidas por sacerdotes colaboradores. Se avisará con antelación de cualquier variación puntual.

Quedáis todos convocados a participar con regularidad en la Eucaristía, fuente y culmen de la vida cristiana.`,
    date: '28 de mayo de 2025',
    isImportant: false,
    category: 'parroquia',
  },
  {
    id: '3',
    title: 'Nuevo grupo de voluntariado juvenil',
    excerpt:
      'Se constituye un nuevo grupo de voluntariado para jóvenes de 18 a 30 años. Primera reunión el próximo jueves a las 19:30 h en la sala parroquial.',
    content: `La Parroquia de Santa María la Antigua pone en marcha un nuevo grupo de voluntariado dirigido a jóvenes de entre 18 y 30 años, con el objetivo de canalizar la energía y el compromiso de los jóvenes de la comunidad en obras concretas de servicio.

La primera reunión de presentación tendrá lugar el próximo jueves a las 19:30 h en la sala parroquial. En ella se explicará el proyecto, los ámbitos de acción previstos (banco de alimentos, acompañamiento a ancianos, apoyo escolar) y el funcionamiento del grupo.

No es necesaria inscripción previa. Basta con presentarse con ganas de participar.

El grupo estará coordinado por Dña. Laura Fernández, miembro de la Junta Parroquial, y contará con el acompañamiento espiritual del diácono D. Fernando Ruiz.

Si tienes entre 18 y 30 años y quieres comprometerte con tu comunidad, este es tu grupo.`,
    date: '20 de mayo de 2025',
    isImportant: false,
    category: 'comunidad',
  },
  {
    id: '4',
    title: 'Vía Crucis de la Hermandad — Semana Santa 2025',
    excerpt:
      'El próximo viernes 21 de marzo, la Hermandad celebra su tradicional Vía Crucis por las calles del casco histórico. Salida desde la Parroquia a las 20:00 h.',
    content: `La Hermandad de Santa María la Antigua celebra su tradicional Vía Crucis el próximo Viernes de Dolores, 21 de marzo de 2025, a las 20:00 h.

El recorrido saldrá desde la puerta principal de la Parroquia y discurrirá por las calles del casco histórico, con paradas en catorce estaciones. Se espera que el cortejo regrese al templo hacia las 21:30 h aproximadamente.

Todos los hermanos deberán presentarse con el hábito reglamentario. Los cofrades de la Sección Joven desfilarán en los primeros puestos junto a la Cruz de Guía.

Los fieles y devotos que deseen incorporarse al cortejo podrán hacerlo desde la primera estación.

Se ruega puntualidad. No habrá ensayo previo.

Para cualquier consulta, podéis dirigiros al secretario de la Hermandad.`,
    date: '10 de marzo de 2025',
    isImportant: true,
    category: 'hermandad',
  },
  {
    id: '5',
    title: 'Catequesis de Primera Comunión — inscripciones abiertas',
    excerpt:
      'Se abren las inscripciones para la catequesis de Primera Comunión del próximo curso. Niños nacidos en 2016 y 2017. Plazo hasta el 30 de septiembre.',
    content: `La Parroquia de Santa María la Antigua abre el plazo de inscripción para la catequesis de preparación a la Primera Comunión correspondiente al curso 2025–2026.

Pueden inscribirse niños y niñas nacidos en los años 2016 y 2017, que estén bautizados en la fe católica.

Las inscripciones se realizarán en la secretaría parroquial en horario de oficina (lunes a viernes, 10:00 – 13:00 h), hasta el 30 de septiembre de 2025.

Documentación necesaria:
— Partida de bautismo (original o fotocopia)
— Fotografía reciente del niño/a
— DNI de uno de los progenitores

Las clases comenzarán el primer sábado de octubre y se impartirán cada sábado de 10:30 a 12:00 h en la sala de catequesis.

Para más información, consultar con la coordinadora de catequesis, Dña. Isabel Morales.`,
    date: '5 de septiembre de 2025',
    isImportant: false,
    category: 'parroquia',
  },
  {
    id: '6',
    title: 'Cabildo General Ordinario de la Hermandad',
    excerpt:
      'El próximo jueves 10 de abril, a las 19:30 h, se celebra el Cabildo General Ordinario de la Hermandad. Se presentarán las cuentas del ejercicio y la programación de cultos.',
    content: `Por disposición del Hermano Mayor, D. Antonio García López, se convoca a todos los hermanos al Cabildo General Ordinario de la Hermandad de Santa María la Antigua, que tendrá lugar el próximo jueves 10 de abril de 2025 a las 19:30 h en primera convocatoria, y a las 20:00 h en segunda, en el Salón de Actos de la Parroquia.

Orden del día:
1. Lectura y aprobación del acta anterior.
2. Informe del Hermano Mayor.
3. Presentación y aprobación de cuentas del ejercicio 2024.
4. Programación de cultos y actos del año 2025.
5. Ruegos y preguntas.

La asistencia es obligatoria para los hermanos con cargo y muy recomendada para el resto. Se ruega puntualidad.

Para ejercer el derecho a voto en los puntos que lo requieran, los hermanos deberán estar al corriente del pago de su cuota anual.`,
    date: '1 de abril de 2025',
    isImportant: true,
    category: 'hermandad',
  },
];
