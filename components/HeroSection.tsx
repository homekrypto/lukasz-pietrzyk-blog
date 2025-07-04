
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover"
        poster="https://picsum.photos/seed/hero-poster/1920/1080"
      >
        {/* Placeholder video - replace with actual business/training footage */}
        <source src="https://assets.mixkit.co/videos/preview/mixkit-business-people-working-in-a-modern-office-4384-large.mp4" type="video/mp4" />
      </video>
      <div className="absolute z-10 w-full h-full bg-black/60"></div>
      
      <div className="z-20 text-center animate-fade-in px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-wider">
          Inwestuj w rozwój, Osiągaj rezultaty
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-slate-200">
          Mentoring i szkolenia, które odblokują Twój potencjał i przyspieszą Twoją karierę.
        </p>
        
        {/* Attractive CTA buttons and stats */}
        <div className="mt-8 flex flex-col items-center">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a 
              href="#kontakt" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Rozpocznij swoją transformację
            </a>
            <a 
              href="#uslugi" 
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Poznaj moje usługi
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-blue-400">500+</div>
              <div className="text-sm text-slate-200">Zadowolonych klientów</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-purple-400">10+</div>
              <div className="text-sm text-slate-200">Lat doświadczenia</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-green-400">95%</div>
              <div className="text-sm text-slate-200">Skuteczność</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">24/7</div>
              <div className="text-sm text-slate-200">Wsparcie</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 z-20 animate-bounce">
        <a href="#o-mnie" aria-label="Przewiń w dół">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
