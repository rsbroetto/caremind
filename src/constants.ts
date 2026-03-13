import { Psychologist, Specialty, Approach, Demand } from './types';

export const SPECIALTIES: Specialty[] = [
  'Psicologia Clínica',
  'Interculturalidade',
  'Psicologia Educacional',
  'Apoio ao Imigrante',
  'Saúde Mental Acadêmica'
];

export const APPROACHES: Approach[] = [
  'Terapia Cognitivo-Comportamental (TCC)',
  'Psicanálise',
  'Abordagem Intercultural',
  'Gestalt-terapia',
  'Humanismo',
  'Terapia Narrativa'
];

export const DEMANDS: Demand[] = [
  'Adaptação Cultural',
  'Saudade (Homesickness)',
  'Ansiedade Acadêmica',
  'Solidão',
  'Barreira Linguística',
  'Gestão de Carreira Internacional',
  'Depressão',
  'Relacionamentos à Distância'
];

export const MOCK_PSYCHOLOGISTS: Psychologist[] = [
  {
    id: '1',
    name: 'Dra. Valentina Rossi',
    crp: 'MN 45.678 (AR)',
    specialties: ['Interculturalidade', 'Psicologia Clínica'],
    approaches: ['Abordagem Intercultural'],
    demands: ['Adaptação Cultural', 'Saudade (Homesickness)', 'Solidão'],
    bio: 'Especialista em mobilidade humana. Ajudo estudantes brasileiros e colombianos a navegarem os desafios emocionais de viver em Buenos Aires.',
    email: 'valentina.rossi@caremind.ar',
    phone: '+54 9 11 1234-5678',
    location: 'Palermo, Buenos Aires',
    imageUrl: 'https://picsum.photos/seed/psych1/400/400',
    rating: 4.9,
    reviewsCount: 156
  },
  {
    id: '2',
    name: 'Lic. Mateo Fernandes',
    crp: 'MN 32.145 (AR)',
    specialties: ['Saúde Mental Acadêmica'],
    approaches: ['Terapia Cognitivo-Comportamental (TCC)'],
    demands: ['Ansiedade Acadêmica', 'Gestão de Carreira Internacional'],
    bio: 'Focado em alta performance acadêmica e manejo de estresse para estudantes de Medicina e Psicologia na UBA/Barceló.',
    email: 'mateo.f@caremind.ar',
    phone: '+54 9 11 8765-4321',
    location: 'Recoleta, Buenos Aires',
    imageUrl: 'https://picsum.photos/seed/psych2/400/400',
    rating: 4.8,
    reviewsCount: 92
  },
  {
    id: '3',
    name: 'Dra. Camila Duarte',
    crp: 'MN 51.234 (AR)',
    specialties: ['Apoio ao Imigrante', 'Psicologia Clínica'],
    approaches: ['Psicanálise'],
    demands: ['Relacionamentos à Distância', 'Barreira Linguística', 'Depressão'],
    bio: 'Psicanalista com foco em processos de subjetivação no estrangeiro. Atendimento bilíngue para a comunidade latina.',
    email: 'camila.duarte@caremind.ar',
    phone: '+54 9 11 5566-7788',
    location: 'Almagro, Buenos Aires',
    imageUrl: 'https://picsum.photos/seed/psych3/400/400',
    rating: 5.0,
    reviewsCount: 74
  }
];
