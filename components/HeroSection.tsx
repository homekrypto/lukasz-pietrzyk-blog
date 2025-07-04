
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <div
        className="absolute z-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')"
        }}
      />
      <div className="absolute z-10 w-full h-full bg-black/50"></div>
      
      <div className="z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wide text-center">
          Łukasz Pietrzyk
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 text-slate-100 text-center">
          Coach • Mentor • Transformacja
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#kontakt" 
            className="bg-white text-slate-900 font-medium py-4 px-10 rounded-full hover:bg-slate-100 transition-all duration-300 uppercase tracking-wider text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Rozpocznij współpracę
          </a>
          <a 
            href="#opinie" 
            className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-medium py-4 px-10 rounded-full transition-all duration-300 uppercase tracking-wider text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Zobacz opinie
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 z-20 animate-bounce">
        <a href="#o-mnie" aria-label="Przewiń w dół">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 9l-7 7-7-7"></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
