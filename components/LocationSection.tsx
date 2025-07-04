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
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <section id="lokalizacja" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Lokalizacja
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {LOCATION_INFO.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Location Image */}
          <div className="relative">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={LOCATION_INFO.image}
                alt="Gabinet coachingowy Łukasza Pietrzyka"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <MapIcon />
                  <span className="font-semibold">Warszawa, Polska</span>
                </div>
                <p className="text-sm opacity-90">Centrum miasta</p>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Informacje o lokalizacji
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapIcon />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {LOCATION_INFO.address}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {LOCATION_INFO.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Udogodnienia
              </h4>
              <div className="space-y-3">
                {LOCATION_INFO.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckIcon />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Preview */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapIcon />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Interaktywna mapa
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Sprawdź dokładną lokalizację i zaplanuj swoją wizytę
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200">
                <MapIcon />
                <span className="ml-2">Otwórz mapę</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Zaplanuj spotkanie
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Skontaktuj się ze mną, aby umówić spotkanie w moim gabinecie lub online.
              Pierwsze 30 minut konsultacji jest bezpłatne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#kontakt"
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Umów spotkanie
              </a>
              <a
                href="tel:+48123456789"
                className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-colors duration-200"
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
