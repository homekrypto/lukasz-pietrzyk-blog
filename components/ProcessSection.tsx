
import React from 'react';
import { PROCESS_STEPS } from '../constants';

const ProcessSection: React.FC = () => {
  return (
    <section id="proces" className="py-20 md:py-32 bg-white dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">MÓJ PROCES WSPÓŁPRACY</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-slate-600 dark:text-slate-300">
            Moja sprawdzona metodyka gwarantuje, że nasza współpraca przyniesie wymierne i trwałe rezultaty.
          </p>
        </div>
        <div className="relative">
          {/* Dotted line for desktop */}
          <div className="hidden md:block absolute top-5 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-300 dark:border-gray-600"></div>
          
          <div className="relative flex flex-col md:flex-row justify-between">
            {PROCESS_STEPS.map((step, index) => (
              <div key={index} className="flex md:flex-col items-center text-center md:w-1/4 p-4">
                <div className="flex-shrink-0 mb-4 bg-slate-100 dark:bg-gray-800 rounded-full p-4 border-2 border-dashed border-slate-300 dark:border-gray-600 z-10">
                  {step.icon}
                </div>
                {/* Vertical line for mobile */}
                {index < PROCESS_STEPS.length - 1 && <div className="md:hidden h-16 w-0.5 border-l-2 border-dashed border-slate-300 dark:border-gray-600 -mt-4 mb-4 ml-9"></div>}
                <div className="md:mt-4 text-left md:text-center ml-6 md:ml-0">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{index + 1}. {step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
