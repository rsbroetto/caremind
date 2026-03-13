export interface Psychologist {
  id: string;
  name: string;
  crp: string;
  specialties: string[];
  approaches: string[];
  demands: string[];
  bio: string;
  email: string;
  phone: string;
  location: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
}

export type Specialty = 'Psicologia Clínica' | 'Interculturalidade' | 'Psicologia Educacional' | 'Apoio ao Imigrante' | 'Saúde Mental Acadêmica';
export type Approach = 'Terapia Cognitivo-Comportamental (TCC)' | 'Psicanálise' | 'Abordagem Intercultural' | 'Gestalt-terapia' | 'Humanismo' | 'Terapia Narrativa';
export type Demand = 'Adaptação Cultural' | 'Saudade (Homesickness)' | 'Ansiedade Acadêmica' | 'Solidão' | 'Barreira Linguística' | 'Gestão de Carreira Internacional' | 'Depressão' | 'Relacionamentos à Distância';

export interface FilterState {
  specialty: string;
  approach: string;
  demand: string;
  searchQuery: string;
}
