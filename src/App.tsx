/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  UserCircle, 
  Filter, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  PlusCircle, 
  ChevronRight,
  Brain,
  Heart,
  Users,
  X
} from 'lucide-react';
import { Psychologist, FilterState } from './types';
import { MOCK_PSYCHOLOGISTS, SPECIALTIES, APPROACHES, DEMANDS } from './constants';

export default function App() {
  const [view, setView] = useState<'patient' | 'professional'>('patient');
  const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    specialty: '',
    approach: '',
    demand: '',
    searchQuery: ''
  });
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [psychologists, setPsychologists] = useState<Psychologist[]>(MOCK_PSYCHOLOGISTS);

  const filteredPsychologists = useMemo(() => {
    return psychologists.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                          p.bio.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesSpecialty = !filters.specialty || p.specialties.includes(filters.specialty);
      const matchesApproach = !filters.approach || p.approaches.includes(filters.approach);
      const matchesDemand = !filters.demand || p.demands.includes(filters.demand);
      
      return matchesSearch && matchesSpecialty && matchesApproach && matchesDemand;
    });
  }, [psychologists, filters]);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPsych: Psychologist = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.get('name') as string,
      crp: formData.get('crp') as string,
      specialties: [formData.get('specialty') as string],
      approaches: [formData.get('approach') as string],
      demands: (formData.get('demands') as string).split(',').map(s => s.trim()),
      bio: formData.get('bio') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      imageUrl: `https://picsum.photos/seed/${Math.random()}/400/400`,
      rating: 5.0,
      reviewsCount: 0
    };
    setPsychologists([newPsych, ...psychologists]);
    setShowRegisterForm(false);
    alert('Cadastro realizado com sucesso! (Simulação)');
  };

  return (
    <div className="min-h-screen bg-bg-light text-text-dark font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('patient')}>
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                <Brain size={24} />
              </div>
              <span className="text-xl font-serif font-bold tracking-tight text-text-dark">CareMind</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setView('patient')}
                className={`text-sm font-medium transition-colors ${view === 'patient' ? 'text-primary' : 'text-gray-500 hover:text-text-dark'}`}
              >
                Encontrar Psicólogo
              </button>
              <button 
                onClick={() => setView('professional')}
                className={`text-sm font-medium transition-colors ${view === 'professional' ? 'text-primary' : 'text-gray-500 hover:text-text-dark'}`}
              >
                Área do Profissional
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-500 hover:text-text-dark transition-colors">
                <UserCircle size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {selectedPsychologist ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          >
            <button 
              onClick={() => setSelectedPsychologist(null)}
              className="flex items-center gap-2 text-gray-500 hover:text-text-dark mb-8 transition-colors group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform" />
              <span>Voltar para a busca</span>
            </button>

            <div className="bg-white rounded-[40px] border border-gray-200 overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Left Column - Photo & Basic Info */}
                <div className="lg:col-span-1 bg-bg-light p-8 lg:p-12 border-r border-gray-200">
                  <div className="aspect-square rounded-3xl overflow-hidden mb-8 shadow-lg">
                    <img 
                      src={selectedPsychologist.imageUrl} 
                      alt={selectedPsychologist.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-serif font-medium mb-2 text-text-dark">{selectedPsychologist.name}</h1>
                      <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">CRP: {selectedPsychologist.crp}</p>
                    </div>

                    <div className="flex items-center gap-2 text-primary">
                      <Star size={20} className="fill-primary" />
                      <span className="font-bold text-lg text-text-dark">{selectedPsychologist.rating}</span>
                      <span className="text-sm text-gray-500">({selectedPsychologist.reviewsCount} avaliações)</span>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-3 text-gray-600">
                        <MapPin size={18} className="text-primary" />
                        <span className="text-sm">{selectedPsychologist.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Mail size={18} className="text-primary" />
                        <span className="text-sm">{selectedPsychologist.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Phone size={18} className="text-primary" />
                        <span className="text-sm">{selectedPsychologist.phone}</span>
                      </div>
                    </div>

                    <div className="pt-8 space-y-3">
                      <a 
                        href={`https://wa.me/${selectedPsychologist.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-primary text-white rounded-2xl font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                      >
                        Agendar Consulta
                      </a>
                      <a 
                        href={`mailto:${selectedPsychologist.email}`}
                        className="w-full py-4 bg-white text-primary border border-primary rounded-2xl font-medium hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                      >
                        Enviar Mensagem
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column - Details */}
                <div className="lg:col-span-2 p-8 lg:p-16 space-y-12">
                  <section>
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Sobre o Profissional</h2>
                    <p className="text-lg text-text-dark leading-relaxed font-serif italic">
                      "{selectedPsychologist.bio}"
                    </p>
                  </section>

                  <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Especialidades</h2>
                      <div className="flex flex-wrap gap-2">
                        {selectedPsychologist.specialties.map(s => (
                          <span key={s} className="px-4 py-2 bg-bg-light rounded-full text-sm text-primary font-medium border border-gray-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Abordagem</h2>
                      <div className="flex flex-wrap gap-2">
                        {selectedPsychologist.approaches.map(a => (
                          <span key={a} className="px-4 py-2 bg-secondary/10 rounded-full text-sm text-secondary font-bold border border-secondary/20">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Foco de Atendimento</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedPsychologist.demands.map(d => (
                        <div key={d} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl">
                          <div className="w-2 h-2 rounded-full bg-support" />
                          <span className="text-sm font-medium text-text-dark">{d}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="pt-8 border-t border-gray-200">
                    <div className="bg-bg-light p-8 rounded-[32px] border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="text-center md:text-left">
                        <h3 className="text-xl font-serif font-medium mb-2 text-text-dark">Dúvidas sobre o atendimento?</h3>
                        <p className="text-sm text-gray-500">Entre em contato diretamente para entender como funciona o processo terapêutico.</p>
                      </div>
                      <button className="px-8 py-4 bg-white border border-gray-200 rounded-2xl font-medium hover:shadow-md transition-all text-text-dark">
                        Ver FAQ do Profissional
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </motion.div>
        ) : view === 'patient' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <section className="mb-16 text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-serif font-medium mb-6 leading-tight text-text-dark"
              >
                Sua jornada em Buenos Aires <br />
                <span className="italic text-primary">não precisa ser solitária</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
              >
                Conectamos estudantes latino-americanos a psicólogos especialistas em adaptação cultural, saudade e desafios acadêmicos na Argentina.
              </motion.p>

              {/* Search Bar */}
              <div className="max-w-3xl mx-auto relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                  <Search size={20} />
                </div>
                <input 
                  type="text"
                  placeholder="Busque por nome, especialidade ou demanda..."
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                />
              </div>
            </section>

            {/* Filters */}
            <section className="mb-12">
              <div className="flex flex-wrap items-center gap-4 p-6 bg-white rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-primary font-medium mr-4">
                  <Filter size={18} />
                  <span>Filtros:</span>
                </div>
                
                <select 
                  className="bg-bg-light border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary"
                  value={filters.specialty}
                  onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
                >
                  <option value="">Todas Especialidades</option>
                  {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <select 
                  className="bg-bg-light border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary"
                  value={filters.approach}
                  onChange={(e) => setFilters({ ...filters, approach: e.target.value })}
                >
                  <option value="">Todas Abordagens</option>
                  {APPROACHES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>

                <select 
                  className="bg-bg-light border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary"
                  value={filters.demand}
                  onChange={(e) => setFilters({ ...filters, demand: e.target.value })}
                >
                  <option value="">Todas Demandas</option>
                  {DEMANDS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>

                <button 
                  onClick={() => setFilters({ specialty: '', approach: '', demand: '', searchQuery: '' })}
                  className="text-xs text-gray-500 hover:text-text-dark underline underline-offset-4 ml-auto"
                >
                  Limpar filtros
                </button>
              </div>
            </section>

            {/* Results Grid */}
            <section>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif font-medium text-text-dark">Profissionais Disponíveis</h2>
                <span className="text-sm text-gray-500">{filteredPsychologists.length} resultados encontrados</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredPsychologists.map((psych, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      key={psych.id}
                      className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all group"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={psych.imageUrl} 
                          alt={psych.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span>{psych.rating}</span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-serif font-medium mb-1 text-text-dark">{psych.name}</h3>
                          <p className="text-xs text-gray-500 font-mono tracking-wider uppercase">CRP: {psych.crp}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {psych.approaches.map(a => (
                            <span key={a} className="text-[10px] uppercase tracking-wider font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md">
                              {a}
                            </span>
                          ))}
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-6">
                          {psych.bio}
                        </p>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <MapPin size={14} className="text-primary" />
                            <span>{psych.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Heart size={14} className="text-support" />
                            <span>{psych.demands.slice(0, 3).join(', ')}...</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <a 
                            href={`mailto:${psych.email}`}
                            className="flex items-center justify-center gap-2 py-2.5 bg-bg-light text-primary rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all"
                          >
                            <Mail size={14} />
                            E-mail
                          </a>
                          <a 
                            href={`https://wa.me/${psych.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-2.5 bg-bg-light text-secondary rounded-xl text-xs font-bold hover:bg-secondary hover:text-white transition-all"
                          >
                            <Phone size={14} />
                            WhatsApp
                          </a>
                        </div>

                        <button 
                          onClick={() => setSelectedPsychologist(psych)}
                          className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group"
                        >
                          Ver Perfil Completo
                          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredPsychologists.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                  <Users size={48} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-serif font-medium mb-2">Nenhum profissional encontrado</h3>
                  <p className="text-gray-500">Tente ajustar seus filtros ou termo de busca.</p>
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Para Profissionais</span>
                <h1 className="text-5xl md:text-6xl font-serif font-medium mb-8 leading-tight text-text-dark">
                  Apoie a comunidade <span className="italic">estudantil latina</span> em Buenos Aires.
                </h1>
                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                  Você é um profissional que entende os desafios da migração e vida acadêmica? Junte-se à CareMind e ajude milhares de estudantes a encontrarem equilíbrio em sua nova jornada na Argentina.
                </p>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-text-dark">Visibilidade Qualificada</h4>
                      <p className="text-sm text-gray-500">Seja encontrado por pessoas que realmente buscam sua especialidade.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                      <Star className="text-secondary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-text-dark">Reputação Profissional</h4>
                      <p className="text-sm text-gray-500">Construa autoridade através de avaliações e um perfil detalhado.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowRegisterForm(true)}
                  className="px-8 py-4 bg-primary text-white rounded-2xl font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <PlusCircle size={20} />
                  Cadastrar meu Perfil
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="aspect-square rounded-[40px] overflow-hidden border-8 border-white shadow-2xl">
                  <img 
                    src="https://picsum.photos/seed/therapy-office/800/800" 
                    alt="Consultório" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-gray-200 max-w-[240px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                    </div>
                    <span className="text-sm font-medium">Novos Pacientes</span>
                  </div>
                  <p className="text-xs text-gray-500">Mais de 500 buscas diárias por profissionais na sua região.</p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </main>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegisterForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRegisterForm(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-gray-200 flex justify-between items-center bg-bg-light">
                <div>
                  <h2 className="text-2xl font-serif font-medium text-text-dark">Cadastro Profissional</h2>
                  <p className="text-sm text-gray-500">Preencha seus dados para começar na plataforma.</p>
                </div>
                <button 
                  onClick={() => setShowRegisterForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleRegister} className="p-8 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Nome Completo</label>
                    <input required name="name" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">CRP</label>
                    <input required name="crp" type="text" placeholder="Ex: 06/123456" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Especialidade Principal</label>
                    <select required name="specialty" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                      {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Abordagem Terapêutica</label>
                    <select required name="approach" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                      {APPROACHES.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Demandas (separadas por vírgula)</label>
                  <input required name="demands" type="text" placeholder="Ex: Ansiedade, Depressão, Luto" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Biografia Profissional</label>
                  <textarea required name="bio" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email</label>
                    <input required name="email" type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Telefone</label>
                    <input required name="phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                  </div>
                </div>

                <div className="space-y-2 pb-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Localização (Cidade/Estado)</label>
                  <input required name="location" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>

                <div className="sticky bottom-0 pt-4 bg-white border-t border-gray-200">
                  <button type="submit" className="w-full py-4 bg-primary text-white rounded-2xl font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                    Finalizar Cadastro
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <Brain size={18} />
                </div>
                <span className="text-lg font-serif font-bold tracking-tight text-text-dark">CareMind</span>
              </div>
              <p className="text-gray-500 max-w-sm mb-6">
                Promovendo o acesso à saúde mental de qualidade através da tecnologia e conexão humana.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-bg-light flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-bg-light flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-all">
                  <Mail size={18} />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-text-dark mb-6">Plataforma</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="hover:text-primary cursor-pointer transition-colors">Como funciona</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Buscar psicólogos</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Área do profissional</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Planos e Preços</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-text-dark mb-6">Suporte</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="hover:text-primary cursor-pointer transition-colors">Central de Ajuda</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Termos de Uso</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Privacidade</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Contato</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">© 2026 CareMind. Todos os direitos reservados.</p>
            <p className="text-xs text-gray-400 italic">Cuidar da mente é cuidar da vida.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
