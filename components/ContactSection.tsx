
import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section id="kontakt" className="py-20 md:py-32 bg-white dark:bg-gray-800/50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">Chcesz ruszyć do przodu?</h2>
        <p className="mt-4 mb-12 text-lg max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
          Skontaktuj się ze mną i umów na bezpłatną sesję wstępną. Razem zdefiniujemy Twoje cele i zaplanujemy pierwsze kroki.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <a href="tel:+48723262802" className="group block bg-slate-50 dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl hover:bg-accent dark:hover:bg-accent-dark transition-all duration-300 text-slate-800 dark:text-white hover:text-white">
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 mb-4 text-accent dark:text-accent-dark group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <h3 className="text-2xl font-bold">Telefon</h3>
              <p className="text-lg mt-2">723 262 802</p>
            </div>
          </a>
          <a href="mailto:lukaszpietrzyk@icloud.com" className="group block bg-slate-50 dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl hover:bg-accent dark:hover:bg-accent-dark transition-all duration-300 text-slate-800 dark:text-white hover:text-white">
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 mb-4 text-accent dark:text-accent-dark group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <h3 className="text-2xl font-bold">E-mail</h3>
              <p className="text-lg mt-2">lukaszpietrzyk@icloud.com</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
