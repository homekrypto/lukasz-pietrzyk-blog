
import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section id="kontakt" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
          Kontakt
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
          Skontaktuj się ze mną i umów na bezpłatną sesję wstępną. Razem zdefiniujemy Twoje cele i zaplanujemy pierwsze kroki.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <a 
            href="tel:+48723262802" 
            className="group block bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Telefon</h3>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">723 262 802</p>
            </div>
          </a>
          
          <a 
            href="mailto:lukaszpietrzyk@icloud.com" 
            className="group block bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">E-mail</h3>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-medium break-all">lukaszpietrzyk@icloud.com</p>
            </div>
          </a>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl">
          <h3 className="text-3xl font-semibold mb-4">Zaplanuj spotkanie</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Skontaktuj się ze mną, aby umówić spotkanie w moim gabinecie lub online. 
            Pierwsze 30 minut konsultacji jest bezpłatne.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#kontakt"
              className="inline-flex items-center px-10 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Umów spotkanie
            </a>
            <a
              href="tel:+48723262802"
              className="inline-flex items-center px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Zadzwoń teraz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
