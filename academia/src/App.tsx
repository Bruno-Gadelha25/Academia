import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Dumbbell, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Star, 
  CheckCircle2, 
  Instagram, 
  Facebook,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

// --- Shared Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const variants: any = {
    primary: 'gold-gradient text-black font-bold uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all text-sm',
    secondary: 'border border-gray-800 text-gray-400 font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all text-sm',
    outline: 'border border-gold text-gold font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all text-sm'
  };

  return (
    <button 
      className={`py-4 px-8 rounded-none flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-16">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <div className="w-12 h-1 gold-gradient mb-6" />
      <h2 className="text-4xl md:text-5xl font-display font-extrabold uppercase leading-tight tracking-tight text-white">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i === 1 ? 'text-gold' : ''}>{word} </span>
        ))}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-xl text-sm uppercase tracking-widest leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Planos', href: '#planos', active: true },
    { name: 'Localização', href: '#contato' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-deep-black/95 py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <div className="w-8 h-8 gold-gradient rounded-sm transform rotate-45 flex items-center justify-center">
            <span className="text-black font-bold transform -rotate-45">E</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tighter text-white uppercase whitespace-nowrap">
            EVOLUÇÃO <span className="font-light text-gray-400 uppercase text-xs tracking-[.4em] ml-2">Fitness</span>
          </h1>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors ${link.active ? 'text-gold' : 'text-gray-400 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-deep-black py-8 px-6 md:hidden flex flex-col gap-6 shadow-2xl"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/5 pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="container mx-auto px-6 grid grid-cols-12 gap-8 items-center h-full">
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-[10px] font-bold text-gold tracking-[0.3em] uppercase">Alta Performance</span>
            <h1 className="text-6xl md:text-7xl font-display font-extrabold leading-[1.1] tracking-tight text-white uppercase">
              Transforme seu corpo.<br />
              <span className="text-gold">Evolua</span> sua mente.
            </h1>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Treinos de alta performance com estrutura profissional e foco absoluto em resultados reais.
            </p>
            <div className="flex flex-col space-y-4 pt-4">
              <Button className="w-max px-10">
                <span>Falar no WhatsApp</span>
                <MessageCircle size={18} />
              </Button>
              <div className="flex items-center space-x-6 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                <span>24H ABERTA</span>
                <span className="text-gold">●</span>
                <span>PERSONAL TRAINER</span>
                <span className="text-gold">●</span>
                <span>SPA</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Background Imagery - Handled via gradients and abstract feel if generator not working */}
        <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full opacity-40 lg:opacity-70 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-transparent to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover grayscale"
            alt="Gym background"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre" className="py-32 bg-deep-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeading 
              title="Estrutura de Elite" 
              subtitle="O CT mais moderno da região para quem não abre mão da excelência." 
            />
            <div className="space-y-12">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="w-10 h-1 gold-gradient mb-4" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white">Equipamentos</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider leading-relaxed">Tecnologia Matrix e Life Fitness de última geração.</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-1 gold-gradient mb-4" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white">Profissionais</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider leading-relaxed">Equipe qualificada com foco no seu objetivo.</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-1 gold-gradient mb-4" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white">Ambiente</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider leading-relaxed">Arquitetura moderna e sistema de som imersivo.</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-1 gold-gradient mb-4" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white">Resultados</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider leading-relaxed">Metodologia exclusiva para evolução constante.</p>
                </div>
              </div>
              <Button variant="secondary" className="w-max">Agendar Visita</Button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="glass p-1 transform rotate-2">
                <img 
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
                  className="w-full h-[600px] object-cover grayscale"
                  alt="Academia Interior"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 gold-gradient opacity-20 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: 'Mensal',
      price: '159',
      description: 'Acesso total sem fidelidade.',
      features: ['Acesso Total', 'Sem Fidelidade', 'Área de Cardio'],
      isPopular: false
    },
    {
      name: 'Anual',
      price: '99',
      description: 'O melhor CT com o melhor custo-benefício.',
      features: ['Consultoria VIP', 'Acesso Spa', 'Toalhas Inclusas', 'Avaliação Física'],
      isPopular: true
    },
    {
      name: 'Trimestral',
      price: '129',
      description: 'Ideal para o seu primeiro ciclo de evolução.',
      features: ['Acesso Total', 'Avaliação Física', 'Fidelidade 90 dias'],
      isPopular: false
    }
  ];

  return (
    <section id="planos" className="py-32 bg-deep-black">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Planos & Investimento" 
          subtitle="Escolha a jornada que melhor se adapta ao seu estilo de vida."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 flex flex-col justify-between h-[450px] transition-all duration-500 group border-t-2 border-transparent hover:border-gold ${plan.isPopular ? 'bg-white text-black scale-105 z-10 shadow-3xl' : 'glass'}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-3 py-1 font-black uppercase tracking-[0.3em]">
                  Mais Vendido
                </div>
              )}
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold uppercase tracking-widest">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs uppercase font-bold opacity-50">R$</span>
                  <span className="text-5xl font-display font-extrabold">{plan.price}</span>
                  <span className="text-[10px] uppercase font-bold opacity-50">/mês</span>
                </div>
                <p className={`text-[10px] uppercase tracking-widest font-bold ${plan.isPopular ? 'opacity-50' : 'text-gray-500'}`}>
                  {plan.isPopular ? 'Fidelidade 12 meses' : plan.description}
                </p>
              </div>

              <ul className="space-y-4 my-8">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-1 h-1 rounded-full ${plan.isPopular ? 'bg-black' : 'bg-gold'}`} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.isPopular ? 'primary' : 'secondary'} 
                className={`w-full py-3 ${plan.isPopular ? 'bg-black text-white' : ''}`}
              >
                Garantir Agora
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Benefits = () => null; // Benefits are integrated into About in this theme

const Testimonials = () => null; // Depoimentos are integrated into Footer/specific sections

const Contact = () => null; // Integrated into Footer location grid

const Footer = () => (
  <footer className="py-20 bg-deep-black border-t border-gray-900">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-16">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gold opacity-10 blur-sm" />
            <img src="https://i.pravatar.cc/150?u=platinum" className="w-full h-full object-cover grayscale opacity-50" />
          </div>
          <div>
            <p className="text-[10px] font-bold italic leading-tight text-white">"Mudou minha rotina e minha auto-estima. Melhor CT da região."</p>
            <p className="text-[9px] text-gold uppercase mt-1 font-bold tracking-widest">— Ricardo Mendes, Aluno Platinum</p>
          </div>
        </div>

        <div className="text-center md:border-x md:border-gray-900 px-8">
          <p className="text-[9px] uppercase text-gray-500 font-bold tracking-widest mb-2">Horários</p>
          <p className="text-[10px] font-bold text-white uppercase tracking-wider">Seg–Sex: 05h às 00h • Sáb–Dom: 08h às 16h</p>
        </div>

        <div className="text-right">
          <p className="text-[9px] uppercase text-gray-500 font-bold tracking-widest mb-2">Localização</p>
          <p className="text-[10px] font-bold text-white uppercase tracking-wider">Av. das Américas, 4200 — Barra da Tijuca, RJ</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-900 gap-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 gold-gradient rounded-xs transform rotate-45 flex items-center justify-center">
            <span className="text-black text-[10px] font-black transform -rotate-45">E</span>
          </div>
          <span className="text-xs font-display font-black uppercase tracking-tighter text-white">
            EVOLUÇÃO <span className="text-gold">FITNESS</span>
          </span>
        </div>
        <div className="flex gap-8">
          {['Instagram', 'Facebook', 'WhatsApp'].map(social => (
            <a key={social} href="#" className="text-[9px] font-bold uppercase tracking-widest text-gray-500 hover:text-gold transition-colors">{social}</a>
          ))}
        </div>
        <p className="text-gray-600 text-[8px] uppercase tracking-[0.4em] font-bold">
          © 2024 Evolução Fitness. Professional Polish.
        </p>
      </div>
    </div>
  </footer>
);

const WhatsAppFloat = () => (
  <motion.a 
    href="https://wa.me/"
    target="_blank"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-8 right-8 z-[100] w-14 h-14 gold-gradient flex items-center justify-center shadow-2xl hover:brightness-110 transition-all rounded-none"
  >
    <MessageCircle size={28} color="black" fill="black" />
  </motion.a>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 bg-gold z-[1000] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      <Hero />
      <About />
      <Pricing />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}


