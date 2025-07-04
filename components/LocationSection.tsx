import React from 'react';
import { LOCATION_INFO } from '../constants';

const LocationSection: React.FC = () => {
  const MapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <section id="lokalizacja" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
            Lokalizacja
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {LOCATION_INFO.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Location Image */}
          <div className="relative">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={LOCATION_INFO.image}
                alt="Gabinet coachingowy Łukasza Pietrzyka"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <MapIcon />
                  </div>
                  <span className="font-semibold text-lg">Gabinet coachingowy Łukasza Pietrzyka</span>
                </div>
                <p className="text-base opacity-90 ml-11">Warszawa, Polska</p>
                <p className="text-sm opacity-75 ml-11">Centrum miasta</p>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Informacje o lokalizacji
              </h3>
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapIcon />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-lg">
                      {LOCATION_INFO.address}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {LOCATION_INFO.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Udogodnienia
              </h4>
              <div className="space-y-4">
                {LOCATION_INFO.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-white dark:bg-gray-700 rounded-xl p-4 shadow-sm">
                    <CheckIcon />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Preview */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MapIcon />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Interaktywna mapa
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Sprawdź dokładną lokalizację i zaplanuj swoją wizytę
              </p>
              <div className="flex justify-center">
                <button className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <MapIcon />
                  <span className="ml-3">Otwórz mapę</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center">
          <div className="bg-white dark:bg-gray-700 rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
              Zaplanuj spotkanie
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Skontaktuj się ze mną, aby umówić spotkanie w moim gabinecie lub online.
              Pierwsze 30 minut konsultacji jest bezpłatne.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="#kontakt"
                className="inline-flex items-center px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Umów spotkanie
              </a>
              <a
                href="tel:+48723262802"
                className="inline-flex items-center px-10 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Zadzwoń teraz
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
