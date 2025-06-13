"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Menu, X, Play, Pause, Volume2, VolumeX } from "lucide-react"

export default function RevistaRomantica() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [loading, setLoading] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Inicializar áudio com URL direta
  useEffect(() => {
    // Criar elemento de áudio com URL direta da música Sailor Song
    audioRef.current = new Audio()
    audioRef.current.src = "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" // Placeholder - você precisará da URL real da música
    audioRef.current.loop = true
    audioRef.current.volume = volume
    audioRef.current.preload = "auto"

    // Tentar carregar uma versão alternativa se disponível
    const tryAlternativeSource = () => {
      if (audioRef.current) {
        // Aqui você pode adicionar a URL real da música Sailor Song
        audioRef.current.src = "/audio/sailor-song.mp3"
        audioRef.current.load()
      }
    }

    tryAlternativeSource()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Controlar volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Controlar reprodução de áudio
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Erro ao reproduzir áudio:", error)
          setIsPlaying(false)
        })
      }
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  // Efeito de carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 4000) // 4 segundos

    return () => clearTimeout(timer)
  }, [])

  // Cronômetro desde 3 de novembro de 2024
  useEffect(() => {
    const startDate = new Date("2024-11-03T00:00:00")

    const updateTimer = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeElapsed(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [])

  // Efeito de parallax no scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animações de entrada
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [loading])

  // Nova paleta de cores
  const colors = {
    background: "#e8eef1",
    primary: "#7a93a7",
    secondary: "#d4b8c6",
    accent: "#a5b7bd",
    navy: "#0a2342",
    text: {
      dark: "#3a4a54",
      medium: "#5d6e78",
      light: "#8a9aa6",
    },
    white: {
      default: "rgba(255, 255, 255, 0.75)",
      intense: "rgba(255, 255, 255, 0.9)",
      soft: "rgba(255, 255, 255, 0.5)",
    },
  }

  // Função para controlar o áudio
  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
  }

  // Função para controlar o mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Função para navegar para seções
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  if (loading) {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.navy} 0%, #1a365d 50%, ${colors.navy} 100%)`,
        }}
      >
        <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
        
        @keyframes float-gentle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-10px) rotate(180deg); 
            opacity: 0.6;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.5);
            transform: scale(1.02);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 1s ease forwards;
        }
        
        .fade-in-up-delay-1 {
          opacity: 0;
          animation: fadeInUp 1s ease forwards 0.5s;
        }
        
        .fade-in-up-delay-2 {
          opacity: 0;
          animation: fadeInUp 1s ease forwards 1s;
        }
        
        .fade-in-up-delay-3 {
          opacity: 0;
          animation: fadeInUp 1s ease forwards 1.5s;
        }
        
        .shimmer-text {
          background: linear-gradient(90deg, #ffffff 25%, #f0f8ff 50%, #ffffff 75%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 2s infinite;
        }
        
        .floating-flower {
          animation: float-gentle 6s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .handwriting-font {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>

        {/* Flores sutis de fundo - apenas algumas */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute floating-flower"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${5 + Math.random() * 3}s`,
              }}
            >
              <div
                className="w-4 h-4 rounded-full opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 70%, transparent 100%)",
                  filter: "blur(0.5px)",
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Círculo principal limpo */}
        <div className="relative mb-16">
          <div
            className="w-56 h-56 rounded-full pulse-glow flex items-center justify-center border border-white/20 relative"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          >
            {/* Nome central com melhor visibilidade */}
            <div className="text-center z-10">
              <div
                className="text-white text-5xl handwriting-font font-bold tracking-wide drop-shadow-2xl"
                style={{
                  textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)",
                  filter: "brightness(1.2)",
                }}
              >
                Franciele
              </div>
            </div>
          </div>
        </div>

        {/* Flores decorativas simples embaixo */}
        <div className="flex items-center justify-center space-x-3 mb-12 fade-in-up-delay-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="floating-flower" style={{ animationDelay: `${i * 0.3}s` }}>
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 70%, transparent 100%)",
                  filter: "blur(0.3px)",
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Barra de progresso limpa */}
        <div className="w-80 h-2 bg-white/20 rounded-full overflow-hidden fade-in-up-delay-2">
          <div
            className="h-full bg-gradient-to-r from-white/70 to-white rounded-full"
            style={{
              width: "100%",
              animation: "shimmer 2.5s ease-in-out infinite",
            }}
          ></div>
        </div>

        <p className="text-white/90 text-base mt-10 tracking-widest fade-in-up-delay-3 font-light text-center">
          CARREGANDO O NOSSO AMOR...
        </p>
      </div>
    )
  }

  return (
    <div
      className="w-full min-h-screen relative overflow-x-hidden"
      style={{
        backgroundColor: colors.background,
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0dbffbc20bbcef0c6919ae50323b713a.jpg-uHWQiQAUsgKDKVdn49XsXLXa9ZYwwV.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: colors.text.dark,
      }}
    >
      {/* ESTILOS DE ANIMAÇÃO */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(5px, -5px) rotate(1deg); }
          50% { transform: translate(0, -10px) rotate(0deg); }
          75% { transform: translate(-5px, -5px) rotate(-1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes floatReverse {
          0% { transform: translate(0, 0) rotate(180deg); }
          25% { transform: translate(-5px, 5px) rotate(181deg); }
          50% { transform: translate(0, 10px) rotate(180deg); }
          75% { transform: translate(5px, 5px) rotate(179deg); }
          100% { transform: translate(0, 0) rotate(180deg); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1) rotate(45deg); opacity: 0.6; }
          50% { transform: scale(1.05) rotate(45deg); opacity: 0.7; }
          100% { transform: scale(1) rotate(45deg); opacity: 0.6; }
        }
        
        @keyframes pulseReverse {
          0% { transform: scale(1) rotate(-30deg); opacity: 0.35; }
          50% { transform: scale(1.03) rotate(-30deg); opacity: 0.4; }
          100% { transform: scale(1) rotate(-30deg); opacity: 0.35; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .float-animation {
          animation: float 8s ease-in-out infinite;
        }
        
        .float-reverse-animation {
          animation: floatReverse 10s ease-in-out infinite;
        }
        
        .pulse-animation {
          animation: pulse 12s ease-in-out infinite;
        }
        
        .pulse-reverse-animation {
          animation: pulseReverse 9s ease-in-out infinite;
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }
        
        .animate-fade-in-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .first-letter-styled::first-letter {
          font-size: 2.5em;
          font-weight: 300;
          float: left;
          margin-right: 0.5rem;
          margin-top: 0.2rem;
          color: ${colors.text.dark};
        }
        
        .first-letter-styled-large::first-letter {
          font-size: 3em;
          font-weight: 300;
          float: left;
          margin-right: 0.75rem;
          margin-top: 0.2rem;
          color: ${colors.text.dark};
        }
        
        .dog-filter {
          filter: sepia(0.5) hue-rotate(-15deg) saturate(1.2) contrast(1.1);
        }
      `}</style>

      {/* FLORES DECORATIVAS FIXAS PARA DESKTOP */}
      <div className="hidden lg:block fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute w-32 xl:w-40 2xl:w-48 h-32 xl:h-40 2xl:h-48 opacity-60 float-animation"
          style={{
            top: "5%",
            right: "5%",
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0dbffbc20bbcef0c6919ae50323b713a.jpg-uHWQiQAUsgKDKVdn49XsXLXa9ZYwwV.jpeg')`,
            backgroundSize: "300% 300%",
            backgroundPosition: "80% 20%",
            borderRadius: "50%",
            filter: "blur(0.5px)",
          }}
        ></div>

        <div
          className="absolute w-28 xl:w-36 2xl:w-44 h-28 xl:h-36 2xl:h-44 opacity-50 float-reverse-animation"
          style={{
            bottom: "8%",
            left: "3%",
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0dbffbc20bbcef0c6919ae50323b713a.jpg-uHWQiQAUsgKDKVdn49XsXLXa9ZYwwV.jpeg')`,
            backgroundSize: "300% 300%",
            backgroundPosition: "20% 80%",
            borderRadius: "50%",
            filter: "blur(0.5px)",
          }}
        ></div>

        <div
          className="absolute w-24 xl:w-32 2xl:w-36 h-24 xl:h-32 2xl:h-36 opacity-40 pulse-animation"
          style={{
            top: "40%",
            right: "2%",
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0dbffbc20bbcef0c6919ae50323b713a.jpg-uHWQiQAUsgKDKVdn49XsXLXa9ZYwwV.jpeg')`,
            backgroundSize: "250% 250%",
            backgroundPosition: "70% 30%",
            borderRadius: "50%",
            filter: "blur(1px)",
          }}
        ></div>

        <div
          className="absolute w-20 xl:w-28 2xl:w-32 h-20 xl:h-28 2xl:h-32 opacity-35 pulse-reverse-animation"
          style={{
            top: "60%",
            left: "1%",
            backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0dbffbc20bbcef0c6919ae50323b713a.jpg-uHWQiQAUsgKDKVdn49XsXLXa9ZYwwV.jpeg')`,
            backgroundSize: "250% 250%",
            backgroundPosition: "30% 70%",
            borderRadius: "50%",
            filter: "blur(1px)",
          }}
        ></div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="relative z-10 w-full">
        {/* BOTÃO HAMBÚRGUER */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-4 right-4 md:top-6 md:right-6 z-50 p-2 md:p-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          style={{
            backgroundColor: colors.white.default,
            backdropFilter: "blur(8px)",
            color: colors.text.dark,
            borderColor: colors.white.soft,
            borderWidth: "1px",
          }}
        >
          {isMenuOpen ? <X size={18} className="md:w-5 md:h-5" /> : <Menu size={18} className="md:w-5 md:h-5" />}
        </button>

        {/* MENU LATERAL */}
        <div
          className={`fixed top-0 right-0 h-full transform transition-transform duration-500 z-40 border-l ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          style={{
            width: "20rem",
            backgroundColor: colors.white.intense,
            backdropFilter: "blur(12px)",
            color: colors.text.dark,
            borderColor: colors.white.soft,
          }}
        >
          <div className="p-6 sm:p-8 lg:p-10 pt-20 sm:pt-24 lg:pt-28">
            <div className="mb-8 lg:mb-12">
              <div
                className="w-16 lg:w-20 h-px mx-auto mb-6 lg:mb-8"
                style={{
                  background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
                }}
              ></div>
              <h3
                className="text-center text-lg lg:text-xl font-serif tracking-wide"
                style={{ color: colors.text.medium }}
              >
                Menu
              </h3>
              <div
                className="w-16 lg:w-20 h-px mx-auto mt-6 lg:mt-8"
                style={{
                  background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
                }}
              ></div>
            </div>
            <nav className="space-y-6 lg:space-y-8">
              <button
                onClick={() => scrollToSection("inicio")}
                className="block w-full text-left py-3 lg:py-4 px-4 lg:px-6 rounded-lg transition-all duration-300 text-sm lg:text-base font-serif tracking-wide border border-transparent hover:bg-white/50 hover:border-white/30"
                style={{ color: colors.text.medium }}
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("amor")}
                className="block w-full text-left py-3 lg:py-4 px-4 lg:px-6 rounded-lg transition-all duration-300 text-sm lg:text-base font-serif tracking-wide border border-transparent hover:bg-white/50 hover:border-white/30"
                style={{ color: colors.text.medium }}
              >
                Você é o meu amor
              </button>
              <button
                onClick={() => scrollToSection("historia")}
                className="block w-full text-left py-3 lg:py-4 px-4 lg:px-6 rounded-lg transition-all duration-300 text-sm lg:text-base font-serif tracking-wide border border-transparent hover:bg-white/50 hover:border-white/30"
                style={{ color: colors.text.medium }}
              >
                Nossa História
              </button>
              <button
                onClick={() => scrollToSection("cronometro")}
                className="block w-full text-left py-3 lg:py-4 px-4 lg:px-6 rounded-lg transition-all duration-300 text-sm lg:text-base font-serif tracking-wide border border-transparent hover:bg-white/50 hover:border-white/30"
                style={{ color: colors.text.medium }}
              >
                Cronômetro
              </button>
            </nav>
          </div>
        </div>

        {/* OVERLAY */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-30 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

        {/* CABEÇALHO PRINCIPAL */}
        <header
          className="text-center pt-16 pb-8 sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 w-full animate-on-scroll"
          id="inicio"
        >
          <div className="mb-8 sm:mb-12 lg:mb-16 max-w-7xl mx-auto">
            <div
              className="w-24 sm:w-28 lg:w-32 h-px mx-auto mb-8 sm:mb-10 lg:mb-12"
              style={{
                background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
              }}
            ></div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-extralight tracking-[0.2em] sm:tracking-[0.3em] lg:tracking-[0.4em] mb-6 sm:mb-8 leading-tight px-2"
              style={{ color: colors.text.dark }}
            >
              FRANCIELE E GUSTAVO
            </h1>
            <div
              className="w-24 sm:w-28 lg:w-32 h-px mx-auto"
              style={{
                background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
              }}
            ></div>
          </div>

          {/* LAYOUT DE DESKTOP COM GRID */}
          <div className="hidden lg:grid grid-cols-12 gap-6 max-w-7xl mx-auto">
            <div className="col-span-7">
              <div
                className="h-[32rem] xl:h-[36rem] relative rounded-lg overflow-hidden shadow-2xl border backdrop-blur-sm"
                style={{ borderColor: colors.white.soft }}
              >
                <Image
                  src="/images/franciele-2.jpeg"
                  alt="Franciele - Foto com efeito"
                  fill
                  className="object-cover dog-filter"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            <div className="col-span-5 flex flex-col justify-center">
              <div
                className="shadow-2xl rounded-lg p-8 xl:p-10 border h-full flex flex-col justify-center"
                style={{
                  backgroundColor: colors.white.default,
                  backdropFilter: "blur(12px)",
                  borderColor: colors.white.soft,
                }}
              >
                <p
                  className="text-sm uppercase tracking-widest mb-6 rounded-lg px-4 py-2 inline-block mx-auto"
                  style={{
                    color: colors.text.light,
                    backgroundColor: colors.white.default,
                    borderColor: colors.white.soft,
                    borderWidth: "1px",
                  }}
                >
                  EDIÇÃO ESPECIAL
                </p>
                <h2 className="text-3xl xl:text-4xl font-serif mb-8 font-light" style={{ color: colors.text.dark }}>
                  "o nosso amor"
                </h2>
                <p
                  className="text-lg xl:text-xl font-serif italic mb-8 leading-relaxed"
                  style={{ color: colors.text.medium }}
                >
                  "Uma jornada de amor, descobertas e momentos inesquecíveis."
                </p>
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Momento especial"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LAYOUT MOBILE */}
          <div
            className="lg:hidden w-full max-w-xl mx-auto h-64 sm:h-80 relative rounded-lg overflow-hidden shadow-2xl border backdrop-blur-sm"
            style={{ borderColor: colors.white.soft }}
          >
            <Image
              src="/images/franciele-2.jpeg"
              alt="Franciele - Foto com efeito"
              fill
              className="object-cover dog-filter"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
          </div>
        </header>

        {/* SEÇÃO VOCÊ É O MEU AMOR */}
        <section
          className="px-4 sm:px-6 lg:px-8 xl:px-16 py-12 sm:py-16 lg:py-24 w-full max-w-7xl mx-auto animate-on-scroll"
          id="amor"
        >
          <div
            className="shadow-2xl rounded-lg p-6 sm:p-8 lg:p-12 xl:p-16 border"
            style={{
              backgroundColor: colors.white.default,
              backdropFilter: "blur(12px)",
              borderColor: colors.white.soft,
            }}
          >
            <div className="text-center mb-12 lg:mb-16">
              <div
                className="w-16 lg:w-20 h-px mx-auto mb-8 lg:mb-12"
                style={{
                  background: `linear-gradient(to right, transparent, ${colors.secondary}, transparent)`,
                }}
              ></div>

              <h2
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-extralight mb-8 lg:mb-12 leading-relaxed tracking-wide px-2"
                style={{ color: colors.text.dark }}
              >
                VOCÊ É O MEU AMOR...
              </h2>

              <div className="relative mb-12 lg:mb-16">
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-60"
                  style={{
                    background: `linear-gradient(to right, ${colors.secondary}50, ${colors.primary}50)`,
                  }}
                ></div>

                {/* Controles de áudio */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={toggleAudio}
                    className="relative border rounded-full p-4 sm:p-5 lg:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    style={{
                      backgroundColor: colors.white.intense,
                      backdropFilter: "blur(8px)",
                      borderColor: colors.white.soft,
                    }}
                  >
                    {isPlaying ? (
                      <Pause size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" style={{ color: colors.text.medium }} />
                    ) : (
                      <Play
                        size={20}
                        className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 ml-1"
                        style={{ color: colors.text.medium }}
                      />
                    )}
                  </button>

                  {/* Controle de volume */}
                  <div className="relative">
                    <button
                      onClick={() => setShowVolumeControl(!showVolumeControl)}
                      onMouseEnter={() => setShowVolumeControl(true)}
                      className="border rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                      style={{
                        backgroundColor: colors.white.intense,
                        backdropFilter: "blur(8px)",
                        borderColor: colors.white.soft,
                      }}
                    >
                      {isMuted ? (
                        <VolumeX size={16} style={{ color: colors.text.medium }} />
                      ) : (
                        <Volume2 size={16} style={{ color: colors.text.medium }} />
                      )}
                    </button>

                    {/* Slider de volume */}
                    {showVolumeControl && (
                      <div
                        className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 p-3 rounded-lg shadow-xl border"
                        style={{
                          backgroundColor: colors.white.intense,
                          backdropFilter: "blur(12px)",
                          borderColor: colors.white.soft,
                        }}
                        onMouseLeave={() => setShowVolumeControl(false)}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
                            className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, ${colors.primary} 0%, ${colors.primary} ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`,
                            }}
                          />
                          <button
                            onClick={toggleMute}
                            className="text-xs px-2 py-1 rounded transition-colors"
                            style={{
                              color: colors.text.medium,
                              backgroundColor: isMuted ? colors.secondary + "30" : "transparent",
                            }}
                          >
                            {isMuted ? "Unmute" : "Mute"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-xs opacity-70" style={{ color: colors.text.medium }}>
                  {isPlaying ? "♪ Sailor Song - Gigi Perez ♪" : "te dedico essa musica"}
                </p>
              </div>

              {/* LAYOUT DESKTOP */}
              <div className="hidden lg:grid grid-cols-2 gap-12 items-center">
                <div className="text-left">
                  <div
                    className="text-lg xl:text-xl font-serif leading-relaxed space-y-6"
                    style={{ color: colors.text.medium }}
                  >
                    <p className="first-letter-styled-large">
                      A verdade é que o amor é uma decisão e não apenas um sentimento. Ele não busca os seus próprios
                      interesses, é sofredor e transformador.
                    </p>
                    <p>
                      Quando o amor é demonstrado verdadeiramente, como foi planejado para ser, tudo é possível. Cada
                      dia juntos é uma nova oportunidade de escolher amar.
                    </p>
                  </div>
                </div>
                <div
                  className="relative h-80 xl:h-96 rounded-lg overflow-hidden shadow-xl border"
                  style={{ borderColor: colors.white.soft }}
                >
                  <Image
                    src="/images/foto-efeito-cachorro.jpeg"
                    alt="Franciele - Momentos de amor"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
              </div>

              {/* LAYOUT MOBILE */}
              <div
                className="lg:hidden text-base sm:text-lg font-serif leading-relaxed space-y-6 text-left max-w-2xl mx-auto"
                style={{ color: colors.text.medium }}
              >
                <p className="first-letter-styled">
                  A verdade é que o amor é uma decisão e não apenas um sentimento. Ele não busca os seus próprios
                  interesses, é sofredor e transformador.
                </p>
                <p
                  className="italic text-center rounded-lg p-4 lg:p-6 border"
                  style={{
                    color: colors.text.medium,
                    backgroundColor: colors.white.soft,
                    borderColor: colors.white.soft,
                  }}
                >
                  E quando o amor é demonstrado verdadeiramente, como foi planejado para ser, tudo é possível.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CRONÔMETRO - CENTRALIZADO */}
        <section
          className="px-4 sm:px-6 py-12 sm:py-16 lg:py-20 w-full max-w-7xl mx-auto animate-on-scroll"
          id="cronometro"
        >
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <div
                className="border p-6 sm:p-8 lg:p-12 shadow-2xl rounded-lg text-center"
                style={{
                  backgroundColor: colors.white.default,
                  backdropFilter: "blur(12px)",
                  borderColor: colors.white.soft,
                }}
              >
                <div
                  className="w-16 lg:w-20 h-px mx-auto mb-6 lg:mb-10"
                  style={{
                    background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
                  }}
                ></div>
                <h3
                  className="text-xl sm:text-2xl font-serif mb-6 lg:mb-10 tracking-wide font-light"
                  style={{ color: colors.text.dark }}
                >
                  JUNTOS HÁ
                </h3>
                <div
                  className="text-2xl sm:text-3xl font-serif mb-6 lg:mb-8 rounded-lg p-4 lg:p-6 shadow-inner border"
                  style={{
                    color: colors.text.medium,
                    backgroundColor: colors.white.default,
                    borderColor: colors.white.soft,
                  }}
                >
                  {timeElapsed}
                </div>
                <p className="text-xs sm:text-sm uppercase tracking-widest" style={{ color: colors.text.light }}>
                  Desde 3 de novembro de 2024
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO NOSSA HISTÓRIA - APENAS TEXTO */}
        <section
          className="px-4 sm:px-6 py-16 sm:py-20 lg:py-24 w-full max-w-7xl mx-auto animate-on-scroll"
          id="historia"
        >
          <div
            className="shadow-2xl rounded-lg p-6 sm:p-8 lg:p-12 xl:p-16 border"
            style={{
              backgroundColor: colors.white.default,
              backdropFilter: "blur(12px)",
              borderColor: colors.white.soft,
            }}
          >
            <div className="max-w-3xl mx-auto">
              <div className="text-lg font-serif leading-relaxed space-y-6" style={{ color: colors.text.medium }}>
                <p className="first-letter-styled-large">
                  Cada dia juntos foi uma descoberta. Aprendemos a amar não apenas as qualidades, mas também os defeitos
                  que nos tornam únicos.
                </p>
                <p>
                  O amor cresceu em cada conversa, em cada silêncio compartilhado, em cada momento que escolhemos estar
                  juntos. Construímos memórias que durarão para sempre.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO POR ONDE VOCÊ ESTIVER, QUERO SEMPRE ESTAR */}
        <section className="px-4 sm:px-6 py-16 sm:py-20 lg:py-24 w-full max-w-7xl mx-auto animate-on-scroll">
          <div
            className="shadow-2xl rounded-lg p-6 sm:p-8 lg:p-12 xl:p-16 border"
            style={{
              backgroundColor: colors.white.default,
              backdropFilter: "blur(12px)",
              borderColor: colors.white.soft,
            }}
          >
            <div className="text-center mb-12">
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-10 font-light px-2"
                style={{ color: colors.text.dark }}
              >
                POR ONDE VC ESTIVER,
                <br />
                QUERO SEMPRE ESTAR
              </h3>

              {/* LAYOUT DESKTOP */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-8 mb-12">
                <div
                  className="aspect-square relative rounded-lg overflow-hidden shadow-xl border hover:scale-105 transition-transform duration-500 group"
                  style={{ borderColor: colors.white.soft }}
                >
                  <Image
                    src="/images/franciele-1.jpeg"
                    alt="Franciele - Momento juntos 1"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div
                  className="aspect-square relative rounded-lg overflow-hidden shadow-xl border hover:scale-105 transition-transform duration-500 group"
                  style={{ borderColor: colors.white.soft }}
                >
                  <Image src="/images/foto-escada.jpeg" alt="Momento juntos 2" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* LAYOUT MOBILE */}
              <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10 max-w-2xl mx-auto">
                <div
                  className="aspect-square relative rounded-lg overflow-hidden shadow-xl border hover:scale-105 transition-transform duration-500"
                  style={{ borderColor: colors.white.soft }}
                >
                  <Image
                    src="/images/franciele-1.jpeg"
                    alt="Franciele - Momento juntos 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  className="aspect-square relative rounded-lg overflow-hidden shadow-xl border hover:scale-105 transition-transform duration-500"
                  style={{ borderColor: colors.white.soft }}
                >
                  <Image src="/images/foto-escada.jpeg" alt="Momento juntos 2" fill className="object-cover" />
                </div>
              </div>

              <div
                className="w-16 lg:w-20 h-px mx-auto mb-6 lg:mb-10"
                style={{
                  background: `linear-gradient(to right, transparent, ${colors.secondary}, transparent)`,
                }}
              ></div>
              <h4
                className="text-xl sm:text-2xl font-serif mb-6 lg:mb-10 font-light"
                style={{ color: colors.text.dark }}
              >
                OBRIGADO POR TUDO!
              </h4>

              <div
                className="text-base sm:text-lg font-serif leading-relaxed text-left space-y-6 lg:space-y-10 max-w-3xl mx-auto"
                style={{ color: colors.text.medium }}
              >
                <p>
                  Por cada momento compartilhado, por cada risada, por cada lágrima enxugada. Por ser minha companheira e minha melhor amiga.
                </p>
                <p
                  className="italic text-center rounded-lg p-4 lg:p-6 border"
                  style={{
                    color: colors.text.medium,
                    backgroundColor: colors.white.soft,
                    borderColor: colors.white.soft,
                  }}
                >
                  Hoje olhamos para frente com esperança e certeza. Sabemos que juntos podemos enfrentar qualquer
                  desafio e celebrar cada vitória.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO EU TE AMO! */}
        <section className="px-4 sm:px-6 py-16 sm:py-20 lg:py-24 w-full max-w-7xl mx-auto animate-on-scroll">
          <div
            className="shadow-2xl rounded-lg p-6 sm:p-8 lg:p-12 xl:p-16 border"
            style={{
              backgroundColor: colors.white.default,
              backdropFilter: "blur(12px)",
              borderColor: colors.white.soft,
            }}
          >
            {/* LAYOUT DESKTOP */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-12 gap-8 items-center">
                <div className="col-span-5">
                  <div className="text-left">
                    <p
                      className="text-sm uppercase tracking-widest mb-6 rounded-lg px-4 py-2 inline-block border"
                      style={{
                        color: colors.text.light,
                        backgroundColor: colors.white.default,
                        borderColor: colors.white.soft,
                      }}
                    >
                      EDIÇÃO ESPECIAL
                    </p>
                    <h2
                      className="text-4xl xl:text-5xl font-serif mb-8 tracking-wide font-light"
                      style={{ color: colors.text.dark }}
                    >
                      EU TE AMO!
                    </h2>
                    <p className="text-lg font-serif leading-relaxed mb-8" style={{ color: colors.text.medium }}>
                      A cada dia que passa, vejo que tudo isso sempre valera apena.. eu te amo como o mar pois ninguém sabe o quão profundo ele é
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      <div
                        className="aspect-square relative rounded-lg overflow-hidden shadow-lg border hover:scale-105 transition-transform duration-500"
                        style={{ borderColor: colors.white.soft }}
                      >
                        <Image
                          src="/images/foto-efeito-cachorro.jpeg"
                          alt="Franciele - Momento especial"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-7">
                  <div
                    className="h-[32rem] relative rounded-lg overflow-hidden shadow-2xl border"
                    style={{ borderColor: colors.white.soft }}
                  >
                    <Image
                      src="/images/franciele-2.jpeg"
                      alt="Franciele - Momento especial"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* LAYOUT MOBILE */}
            <div className="lg:hidden text-center">
              <p
                className="text-xs sm:text-sm uppercase tracking-widest mb-6 lg:mb-10 rounded-lg px-4 sm:px-6 py-2 inline-block border"
                style={{
                  color: colors.text.light,
                  backgroundColor: colors.white.default,
                  borderColor: colors.white.soft,
                }}
              >
                EDIÇÃO ESPECIAL
              </p>
              <h2
                className="text-2xl sm:text-3xl font-serif mb-8 lg:mb-12 tracking-wide font-light px-2"
                style={{ color: colors.text.dark }}
              >
                EU TE AMO!
              </h2>

              <div
                className="w-full max-w-sm sm:max-w-md mx-auto h-64 sm:h-72 relative mb-8 rounded-lg overflow-hidden shadow-2xl border"
                style={{ borderColor: colors.white.soft }}
              >
                <Image
                  src="/images/franciele-2.jpeg"
                  alt="Franciele - Momento especial"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
              </div>

              <p className="text-lg font-serif leading-relaxed mb-8" style={{ color: colors.text.medium }}>
              eu te amo como o mar pois ninguém sabe o quão profundo ele é.
              </p>
            </div>
          </div>
        </section>

        {/* RODAPÉ */}
        <footer
          className="text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 border-t w-full animate-on-scroll"
          style={{ borderColor: colors.white.soft }}
        >
          <div
            className="rounded-lg p-6 sm:p-8 lg:p-10 max-w-md lg:max-w-lg mx-auto shadow-xl border"
            style={{
              backgroundColor: colors.white.default,
              backdropFilter: "blur(12px)",
              borderColor: colors.white.soft,
            }}
          >
            <div
              className="w-16 lg:w-20 h-px mx-auto mb-6 lg:mb-8"
              style={{
                background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
              }}
            ></div>
            <p
              className="text-sm sm:text-base font-serif uppercase tracking-widest"
              style={{ color: colors.text.medium }}
            >
              Carta Digital • 2025
            </p>
            <p className="text-xs sm:text-sm mt-2 lg:mt-3" style={{ color: colors.text.light }}>
              De Gustavo Para Franciele 
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
