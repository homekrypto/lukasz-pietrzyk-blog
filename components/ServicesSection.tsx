
import React from 'react';
import { SERVICES } from '../constants';

const ServicesSection: React.FC = () => {
  return (
    <section id="oferta" className="py-20 md:py-32 bg-slate-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">MOJA OFERTA</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-slate-600 dark:text-slate-300">
            Oferuję kompleksowe wsparcie w rozwoju zawodowym i osobistym, dostosowane do Twoich unikalnych potrzeb.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-accent dark:text-accent-dark mb-3">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
