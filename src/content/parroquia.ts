export const parroquiaHero = {
  title: 'Parroquia',
  subtitle: 'Santa María la Antigua: comunidad de fe abierta a todos en el corazón de la ciudad.',
};

export const parroquiaIntro = {
  title: 'Un hogar de fe para todos',
  text: 'La Parroquia de Santa María la Antigua acoge a familias, jóvenes y personas de toda condición. Celebramos los sacramentos, anunciamos el Evangelio y servimos a los más vulnerables. Una comunidad que camina junta desde hace siglos, con vocación de apertura y misión.',
  cta: { label: 'Ver horarios y servicios', href: '/horarios' },
};

export const parroquiaSchedule = {
  heading: {
    title: 'Horarios',
    subtitle: 'Misas y servicios pastorales',
  },
  items: [
    {
      id: 'misas',
      title: 'Santa Misa',
      description:
        'Laborables: 9:00 h · Sábados: 19:00 h · Domingos: 12:00 y 20:00 h. En agosto el horario puede variar.',
      cta: { label: 'Todos los horarios', href: '/horarios' },
    },
    {
      id: 'confesion',
      title: 'Confesión',
      description:
        'Martes y jueves: 18:00 – 19:00 h. Sábados: 18:00 – 19:00 h. Otros horarios previa cita con secretaría.',
      cta: undefined,
    },
    {
      id: 'adoracion',
      title: 'Adoración al Santísimo',
      description:
        'Primeros viernes de mes: 17:00 – 19:00 h en la capilla interior. Todos los fieles son bienvenidos.',
      cta: undefined,
    },
  ],
};

export const parroquiaSacraments = [
  {
    id: 'bautismo',
    title: 'Bautismo',
    description:
      'Celebrado en domingos señalados. Preparación familiar previa en grupo parroquial. Inscripción en secretaría.',
  },
  {
    id: 'comunion',
    title: 'Primera Comunión',
    description:
      'Catequesis de dos años para niños de 8 a 10 años. Inscripción en septiembre. Grupos los sábados por la mañana.',
  },
  {
    id: 'confirmacion',
    title: 'Confirmación',
    description:
      'Itinerario de formación para jóvenes y adultos. Grupos los martes a las 19:30 h en la sala parroquial.',
  },
  {
    id: 'matrimonio',
    title: 'Matrimonio',
    description:
      'Preparación prematrimonial en pareja. Contacta con secretaría con al menos 6 meses de antelación.',
  },
  {
    id: 'uncion',
    title: 'Unción de enfermos',
    description:
      'Celebración comunitaria el primer domingo de mes y visita a enfermos a domicilio o en hospital.',
  },
  {
    id: 'penitencia',
    title: 'Reconciliación',
    description:
      'Sacramento de la penitencia disponible en los horarios de confesión indicados y por cita previa.',
  },
];

export const parroquiaContact = {
  heading: {
    title: 'Contacto y secretaría',
    subtitle: 'Estamos a tu disposición de lunes a viernes',
  },
  pastor: 'D. José María Ruiz García, párroco',
  note: 'Para bautismos, bodas, certificados o cualquier consulta pastoral, puedes acercarte a la secretaría o escribirnos por correo.',
  cta: { label: 'Ver últimos avisos', href: '/avisos' },
};
