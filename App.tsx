
import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Heart,
  CheckCircle,
  Shirt,
  CalendarPlus,
  Music,
  Send,
  Copy,
  ChevronDown,
  ExternalLink,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';

const EVENT_DATE = new Date('2026-08-22T21:00:00'); 
const WHATSAPP_NUMBER = "59895239386"; 
const EVENT_ADDRESS = "Granaderos 3875, 12300 Montevideo";
const MAPS_EMBED = "https://maps.google.com/maps?q=Salón%20My%20Father%2C%20Granaderos%203875%2C%20Montevideo&t=&z=17&ie=UTF8&iwloc=&output=embed";
const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/playlist/4RAVjizGdBtJx18kkwttqn?utm_source=generator&theme=0";

const PHOTOS = [
  { src: './photos/milu-vestido.jpg', alt: 'Milagros con su vestido de XV' },
  { src: './photos/milu-patinando.jpg', alt: 'Milagros patinando de pequena' },
  { src: './photos/milu-camara.jpg', alt: 'Milagros con una camara de pequena' },
];

/* Collage de fotos superpuestas con bordes difusos que se funden entre si */
const MemoryCollage = ({ 
  variant = 1 
}: { 
  variant?: 1 | 2 | 3 
}) => {
  const layouts: Record<number, React.ReactNode> = {
    /* Variante 1: Las 3 fotos superpuestas, la del vestido al centro mas grande */
    1: (
      <div className="memory-collage relative w-full h-[320px] md:h-[500px] animate-drift-slow" aria-hidden="true">
        {/* Foto izquierda - patinando */}
        <div className="memory-layer mask-fade-left absolute -left-8 md:-left-16 top-4 md:top-0 w-[65%] h-[90%] opacity-60">
          <img src={PHOTOS[1].src} alt="" loading="lazy" className="rounded-none" />
        </div>
        {/* Foto derecha - camara */}
        <div className="memory-layer mask-fade-right absolute -right-8 md:-right-16 bottom-4 md:bottom-0 w-[65%] h-[90%] opacity-55">
          <img src={PHOTOS[2].src} alt="" loading="lazy" className="rounded-none" />
        </div>
        {/* Foto centro - vestido (mas prominente) */}
        <div className="memory-layer mask-fade absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-full opacity-70">
          <img src={PHOTOS[0].src} alt="" loading="lazy" className="rounded-none" />
        </div>
        {/* Resplandor bordeaux sutil */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(109,11,11,0.15) 0%, transparent 60%)' }} />
      </div>
    ),
    /* Variante 2: Dos fotos de nina superpuestas, desplazadas */
    2: (
      <div className="memory-collage relative w-full h-[250px] md:h-[400px] animate-drift-slow-delay" aria-hidden="true">
        {/* Foto patinando */}
        <div className="memory-layer mask-fade-left absolute left-0 md:-left-10 top-0 w-[70%] h-full opacity-40">
          <img src={PHOTOS[1].src} alt="" loading="lazy" className="rounded-none" />
        </div>
        {/* Foto camara, superpuesta */}
        <div className="memory-layer mask-fade-right absolute right-0 md:-right-10 top-0 w-[70%] h-full opacity-40">
          <img src={PHOTOS[2].src} alt="" loading="lazy" className="rounded-none" />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(109,11,11,0.1) 0%, transparent 55%)' }} />
      </div>
    ),
    /* Variante 3: Solo vestido, ancho completo, muy sutil */
    3: (
      <div className="memory-collage relative w-full h-[200px] md:h-[350px] animate-drift-slow-delay-2" aria-hidden="true">
        <div className="memory-layer mask-fade-wide absolute inset-0 w-full h-full opacity-30">
          <img src={PHOTOS[0].src} alt="" loading="lazy" className="rounded-none" />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(109,11,11,0.12) 0%, transparent 50%)' }} />
      </div>
    ),
  };

  return layouts[variant] || null;
};

const App = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [envelopeClosing, setEnvelopeClosing] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ D: 0, H: 0, M: 0, S: 0 });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [copiedAbitab, setCopiedAbitab] = useState(false);

  // Refs para Scroll
  const galaRef = useRef<HTMLDivElement>(null);
  const recuerdosRef = useRef<HTMLDivElement>(null);
  const musicaRef = useRef<HTMLDivElement>(null);
  const rsvpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = EVENT_DATE.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          D: Math.floor(diff / (1000 * 60 * 60 * 24)),
          H: Math.floor((diff / (1000 * 60 * 60)) % 24),
          M: Math.floor((diff / 1000 / 60) % 60),
          S: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const offset = 80;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };


  if (!isOpened) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6 overflow-hidden">
        <div className={`text-center z-10 transition-all duration-1000 ${envelopeClosing ? 'scale-150 opacity-0 blur-3xl' : 'scale-100 opacity-100'}`}>
          <p className="text-bordeaux uppercase tracking-[0.5em] text-sm md:text-xl mb-6 opacity-80 font-semibold">Te invitamos a los XV de</p>
          <div className="font-cursive text-7xl md:text-9xl text-white mb-10 tracking-[0.1em] animate-pulse leading-none">Milagros</div>
          <button 
            onClick={() => { setEnvelopeClosing(true); setTimeout(() => setIsOpened(true), 800); }} 
            aria-label="Abrir invitacion"
            className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#6D0B0B] to-black rounded-full flex items-center justify-center border-2 border-white/20 shadow-[0_0_80px_rgba(109,11,11,0.9)] active:scale-95 transition-all hover:scale-110 mx-auto focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
          >
            <span className="font-serif font-bold text-white/70 text-4xl md:text-6xl" aria-hidden="true">M</span>
          </button>
          <p className="mt-12 text-silver/40 text-[10px] md:text-xs uppercase tracking-[1em]">Toca para abrir</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#6D0B0B] selection:text-white pb-32">
      
      {/* NAV BAR FLOTANTE */}
      <nav aria-label="Navegacion principal" className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[999] glass rounded-full px-5 md:px-10 py-4 md:py-6 flex gap-6 md:gap-12 items-center border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-3xl animate-fade-in w-max">
        <button onClick={() => scrollTo(galaRef)} aria-label="Ir a la seccion de la gala" className="text-white/60 hover:text-bordeaux transition-all hover:scale-125 focus:text-bordeaux focus:outline-none focus-visible:ring-2 focus-visible:ring-bordeaux focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full p-1"><Calendar size={22}/></button>
        <button onClick={() => scrollTo(recuerdosRef)} aria-label="Ir a la seccion de recuerdos" className="text-white/60 hover:text-bordeaux transition-all hover:scale-125 focus:text-bordeaux focus:outline-none focus-visible:ring-2 focus-visible:ring-bordeaux focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full p-1"><ImageIcon size={22}/></button>
        <button onClick={() => scrollTo(musicaRef)} aria-label="Ir a la seccion de musica" className="text-white/60 hover:text-bordeaux transition-all hover:scale-125 focus:text-bordeaux focus:outline-none focus-visible:ring-2 focus-visible:ring-bordeaux focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full p-1"><Music size={22}/></button>
        <button onClick={() => scrollTo(rsvpRef)} aria-label="Ir a la seccion de confirmacion" className="text-white/60 hover:text-bordeaux transition-all hover:scale-125 focus:text-bordeaux focus:outline-none focus-visible:ring-2 focus-visible:ring-bordeaux focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full p-1"><CheckCircle size={22}/></button>
      </nav>

      {/* PORTADA HERO */}
      <header role="banner" className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] z-10"></div>
        <div className="z-20 animate-fade-in w-full max-w-4xl">
          <p className="text-bordeaux uppercase tracking-[0.8em] text-lg md:text-3xl mb-4 font-bold drop-shadow-lg">Mis XV</p>
          <h1 className="font-cursive text-7xl md:text-[11rem] text-white leading-none drop-shadow-2xl py-2">Milagros</h1>
          <p className="text-silver/40 font-serif italic text-lg md:text-3xl mt-6 tracking-[0.2em] md:tracking-[0.4em]">Agosto 22, 2026</p>
          <div className="mt-16 md:mt-24 flex flex-col items-center opacity-30">
            <span className="text-[10px] uppercase tracking-[0.5em] mb-4 font-light">Desliza para ver más</span>
            <ChevronDown className="animate-bounce" size={28} />
          </div>
        </div>
      </header>

      {/* FOTOS SUPERPUESTAS 1 - Las 3 fotos fundidas (entre hero y gala) */}
      <div className="relative -mt-16 mb-0 md:-mt-28 md:mb-4 max-w-5xl mx-auto overflow-hidden">
        <MemoryCollage variant={1} />
      </div>

      <main role="main" className="max-w-4xl mx-auto px-4 md:px-8 space-y-32 md:space-y-48">
        
        {/* SECCIÓN 1: LA GALA */}
        <section ref={galaRef} className="pt-10">
          <div className="glass p-6 md:p-14 rounded-[2.5rem] md:rounded-[4rem] border-white/10 relative bg-gradient-to-br from-white/[0.04] to-transparent shadow-2xl">
            {/* CUENTA REGRESIVA OPTIMIZADA */}
            <div role="timer" aria-label="Cuenta regresiva para el evento" className="grid grid-cols-4 gap-2 md:gap-6 mb-12 md:mb-20">
              {Object.entries(timeLeft).map(([label, val]) => (
                <div key={label} className="flex flex-col items-center justify-center bg-white/[0.03] rounded-2xl md:rounded-3xl py-4 md:py-8 border border-white/5 aspect-square md:aspect-auto">
                  <span aria-live="polite" className="text-2xl sm:text-3xl md:text-7xl font-light text-white leading-none tabular-nums group-hover:text-bordeaux transition-all duration-500">{val}</span>
                  <span className="text-[9px] md:text-xs uppercase text-silver/40 tracking-widest font-bold mt-2">{label === 'D' ? 'Dias' : label === 'H' ? 'Hrs' : label === 'M' ? 'Min' : 'Seg'}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <div className="flex items-center gap-5 md:gap-8 group">
                <div className="w-14 h-14 md:w-20 md:h-20 glass rounded-full flex items-center justify-center text-bordeaux shrink-0 border-white/10 shadow-2xl group-hover:scale-110 transition-transform"><Clock size={28} className="md:w-10 md:h-10" /></div>
                <div className="text-left overflow-hidden">
                  <h3 className="text-white text-sm md:text-xl font-bold uppercase tracking-widest mb-1 md:mb-2">Horario</h3>
                  <p className="text-silver/50 text-xs md:text-sm uppercase leading-relaxed tracking-wider font-medium">21:00 Horas<br/>Puntualidad solicitada</p>
                </div>
              </div>

              <div className="flex items-center gap-5 md:gap-8 group">
                <div className="w-14 h-14 md:w-20 md:h-20 glass rounded-full flex items-center justify-center text-bordeaux shrink-0 border-white/10 shadow-2xl group-hover:scale-110 transition-transform"><Shirt size={28} className="md:w-10 md:h-10" /></div>
                <div className="text-left overflow-hidden">
                  <h3 className="text-white text-sm md:text-xl font-bold uppercase tracking-widest mb-1 md:mb-2 whitespace-nowrap">Vestimenta Formal</h3>
                  <p className="text-silver/50 text-xs md:text-sm uppercase leading-relaxed tracking-wider font-medium">Gala Elegante<br/>Noche de Brillos</p>
                </div>
              </div>
            </div>

            {/* UBICACIÓN */}
            <div className="mt-16 md:mt-24">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-3 md:gap-5">
                  <MapPin size={24} className="text-bordeaux md:w-8 md:h-8" />
                  <p className="text-white text-xs md:text-lg font-bold uppercase tracking-[0.2em] md:tracking-[0.4em]">Salón My Father</p>
                </div>
                <button 
                  onClick={() => window.open(`https://maps.app.goo.gl/uXq5HCuF54u8DqJj8`, '_blank')} 
                  aria-label="Ver ubicacion del Salon My Father en Google Maps (abre en nueva ventana)"
                  className="bg-bordeaux px-5 md:px-8 py-2 md:py-3 rounded-full text-white text-[10px] md:text-xs uppercase font-bold flex items-center gap-3 hover:bg-white hover:text-black transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  VER MAPA <ExternalLink size={14} aria-hidden="true" />
                </button>
              </div>
              <div className="h-64 md:h-96 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 grayscale-[0.3] hover:grayscale-0 transition-all duration-1000 shadow-inner">
                <iframe src={MAPS_EMBED} title="Mapa de ubicacion del Salon My Father" className="w-full h-full border-0" allowFullScreen loading="lazy"></iframe>
              </div>
            </div>

            <button 
              onClick={() => window.open(`https://www.google.com/calendar/render?action=TEMPLATE&text=Mis+XV+-+Milagros&dates=20260822T210000/20260823T050000&location=Salón+My+Father`, '_blank')} 
              aria-label="Agregar evento a Google Calendar (abre en nueva ventana)"
              className="mt-12 md:mt-16 w-full bg-white text-black font-bold py-5 md:py-7 rounded-2xl md:rounded-[2.5rem] text-[11px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.6em] flex items-center justify-center gap-4 hover:bg-bordeaux hover:text-white transition-all shadow-2xl active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-bordeaux">
              <CalendarPlus size={22} className="md:w-7 md:h-7" aria-hidden="true" /> AGENDAR EVENTO
            </button>
          </div>
        </section>

        {/* FOTOS SUPERPUESTAS 2 - Ninas fundidas (entre gala y recuerdos) */}
        <div className="relative -my-12 md:-my-20 overflow-hidden">
          <MemoryCollage variant={2} />
        </div>

        {/* SECCIÓN 2: RECUERDOS */}
        <section ref={recuerdosRef} className="pt-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-4xl md:text-6xl italic mb-4">Galería de Momentos</h2>
            <p className="text-silver/40 text-[10px] md:text-xs uppercase tracking-[0.4em] max-w-sm mx-auto">Momentos especiales de Milu</p>
          </div>

          <div className="glass p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border-white/10 bg-gradient-to-tr from-white/[0.03] to-transparent">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {PHOTOS.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-black shadow-2xl hover:shadow-[0_0_40px_rgba(109,11,11,0.5)] transition-all duration-500 group cursor-pointer">
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover filter brightness-75 group-hover:brightness-90 transition-all duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                    <p className="text-white text-sm md:text-base text-center px-4 font-serif italic">{photo.alt}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 md:mt-16 text-center">
              <button
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola Milu! Tus fotos en los XV están hermosas')}`, '_blank')}
                aria-label="Enviar mensaje a Milagros via WhatsApp (abre en nueva ventana)"
                className="bg-bordeaux text-white px-10 md:px-16 py-5 md:py-7 rounded-2xl md:rounded-3xl font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-xl hover:scale-[1.02] transition-all mx-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                <Send size={20} className="md:w-6 md:h-6" aria-hidden="true" /> COMPARTIR CON MILU
              </button>
            </div>
          </div>
        </section>

        {/* FOTOS SUPERPUESTAS 3 - Vestido sutil (entre recuerdos y musica) */}
        <div className="relative -my-12 md:-my-20 overflow-hidden">
          <MemoryCollage variant={3} />
        </div>

        {/* SECCIÓN 3: RITMO */}
        <section ref={musicaRef} className="pt-10">
          <div className="glass p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border-white/10 bg-gradient-to-t from-white/[0.03] to-transparent">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-serif text-4xl md:text-6xl italic mb-4">Playlist de la Noche</h2>
              <p className="text-silver/40 text-[10px] md:text-xs uppercase tracking-[0.4em]">Temas para bailar</p>
            </div>

            <div className="rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl border border-white/5">
              <iframe src={SPOTIFY_EMBED_URL} title="Playlist de Spotify para los XV de Milagros" width="100%" height="450" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
          </div>
        </section>

        {/* FOTOS SUPERPUESTAS 4 - Ninas fundidas (entre musica y RSVP) */}
        <div className="relative -my-12 md:-my-20 overflow-hidden">
          <MemoryCollage variant={2} />
        </div>

        {/* SECCIÓN 4: RSVP + REGALO */}
        <section ref={rsvpRef} className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 pb-20">
          {/* RSVP */}
          <div className="glass p-10 md:p-16 rounded-[3rem] md:rounded-[4rem] text-center border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent shadow-2xl flex flex-col justify-between min-h-[500px]">
            <div>
              <h2 className="font-serif text-4xl md:text-6xl italic mb-10 md:mb-14">Confirmación</h2>
              {!isConfirmed ? (
                <div className="space-y-8 md:space-y-10">
                  <label htmlFor="guest-name" className="sr-only">Tu nombre y apellido</label>
                  <input 
                    id="guest-name"
                    type="text" 
                    value={guestName} 
                    onChange={(e) => setGuestName(e.target.value)} 
                    placeholder="Nombre y Apellido" 
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl md:rounded-3xl px-4 md:px-8 py-6 text-center text-sm md:text-xl focus:border-bordeaux focus:ring-2 focus:ring-bordeaux/50 outline-none tracking-wide md:tracking-widest shadow-inner placeholder:text-silver/30 placeholder:tracking-normal md:placeholder:tracking-wide" 
                  />
                  <button 
                    onClick={() => { if(guestName.length < 3) return; window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola+Milu,+confirmo+asistencia.+Soy+${guestName}`, '_blank'); setIsConfirmed(true); }} 
                    aria-label="Confirmar asistencia via WhatsApp (abre en nueva ventana)"
                    disabled={guestName.length < 3}
                    className="w-full bg-white text-black font-bold py-6 md:py-8 rounded-2xl md:rounded-3xl text-xs md:text-sm uppercase tracking-[0.4em] md:tracking-[0.6em] hover:bg-bordeaux hover:text-white transition-all shadow-2xl active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-bordeaux disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirmar asistencia Aqui
                  </button>
                </div>
              ) : (
                <div className="py-14 text-green-500/90 flex flex-col items-center animate-fade-in">
                  <div className="w-24 h-24 rounded-full border-2 border-green-500/20 flex items-center justify-center mb-8 bg-green-500/5">
                    <CheckCircle size={60} className="animate-bounce" />
                  </div>
                  <p className="text-sm md:text-lg font-bold uppercase tracking-[0.6em] italic">¡Lugar Reservado!</p>
                </div>
              )}
            </div>
            <p className="text-silver/30 text-[9px] md:text-[11px] uppercase tracking-widest font-medium pt-12 border-t border-white/5">Te agradecemos confirmar antes del 10.08</p>
          </div>

          {/* REGALO */}
          <div className="glass p-10 md:p-16 rounded-[3rem] md:rounded-[4rem] text-center border-white/10 flex flex-col justify-center relative overflow-hidden shadow-2xl min-h-[500px]">
            <div className="absolute -top-10 -right-10 p-10 opacity-[0.05] pointer-events-none rotate-12" aria-hidden="true"><Heart size={250} className="text-bordeaux" /></div>
            <h2 className="font-serif text-4xl md:text-6xl italic mb-8 md:mb-12">Presente</h2>
            <p className="text-silver/50 text-sm md:text-base mb-12 md:mb-20 italic leading-relaxed tracking-wide px-4 font-light max-w-sm mx-auto">
              "Mi mayor regalo es verte ese día, pero si deseas colaborar con mis sueños de futuro:"
            </p>
            <div className="bg-black/50 p-10 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 backdrop-blur-2xl relative z-10 shadow-inner group w-full">
              <p className="text-[10px] md:text-xs text-silver/40 uppercase tracking-[0.6em] md:tracking-[0.8em] mb-6 md:mb-8 font-bold">Abitab Nº 145920</p>
              <div className="h-px w-20 md:w-32 bg-bordeaux/40 mx-auto mb-10 group-hover:w-48 transition-all duration-700"></div>
              <button 
                onClick={() => { navigator.clipboard.writeText("145920"); setCopiedAbitab(true); setTimeout(() => setCopiedAbitab(false), 2000); }} 
                aria-label={copiedAbitab ? "Numero copiado" : "Copiar numero de Abitab 145920"}
                className="flex items-center justify-center gap-5 mx-auto text-white font-bold text-xs md:text-lg hover:text-bordeaux transition-all uppercase tracking-[0.3em] md:tracking-[0.5em] group/btn outline-none focus-visible:ring-2 focus-visible:ring-bordeaux rounded-lg p-2"
              >
                {copiedAbitab ? (
                  <span className="text-green-500 flex items-center gap-3 tracking-widest">COPIADO <CheckCircle size={22} aria-hidden="true" /></span>
                ) : (
                  <><Copy size={24} className="md:w-8 md:h-8 group-hover/btn:scale-125 transition-all" aria-hidden="true" /> COPIAR NUMERO</>
                )}
              </button>
            </div>
          </div>
        </section>

      </main>

      <footer role="contentinfo" className="text-center py-48 md:py-64 border-t border-white/5 relative bg-gradient-to-b from-transparent to-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-bordeaux/40 to-transparent"></div>
        <h2 className="font-cursive text-8xl md:text-[11rem] text-white/5 mb-12 select-none tracking-widest leading-none">Milagros</h2>
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-12">
           <div className="h-px w-16 md:w-32 bg-white/5"></div>
           <Sparkles className="text-bordeaux/30 animate-pulse w-8 h-8" />
           <div className="h-px w-16 md:w-32 bg-white/5"></div>
        </div>
        <p className="text-silver/10 text-[10px] md:text-sm uppercase tracking-[1.5em] md:tracking-[3em] font-light">MONTEVIDEO • URUGUAY • 2026</p>
      </footer>
    </div>
  );
};

export default App;
