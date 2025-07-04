
import React from 'react';
import { AREAS_OF_HELP } from '../constants';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-8 text-center">{children}</h2>
);

const SubTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">{children}</h3>
);

const AboutSection: React.FC = () => {
  const dailyRoles = [
    "Założyciel i prezes Centrum Szkoleń Coachingu i Mediacji sp. z o.o.",
    "Trener kompetencji społecznych, handlowych i menedżerskich.",
    "Mediator sądowy i biznesowy.",
    "Współpracuję z firmami, uczelniami, samorządami oraz szkołami.",
    "Wdrażam sztuczną inteligencję do firm i samorządów.",
    "Prowadzę zajęcia z procedur antymobbingowych i asertywności.",
    "Buduję przyszłe kadry w firmach i samorządach.",
  ];
  
  const forWhom = [
    "Osób, które chcą się przebranżowić i znaleźć nowy kierunek zawodowy.",
    "Liderów, menedżerów i dyrektorów pragnących podnieść swoje kompetencje.",
    "Przedsiębiorców, którzy chcą skuteczniej zarządzać swoim biznesem.",
    "Osób planujących awans lub chcących odnaleźć się w nowym środowisku pracy.",
    "Młodzieży i studentów szukających swojej drogi zawodowej."
  ];

  const experience = [
      "Ukończona specjalizacja z coachingu biznesu i kariery.",
      "Grant naukowy na Uniwersytecie Masaryka (katedra psychologii).",
      "Ponad 9 lat doświadczenia w indywidualnej praktyce coachingowej.",
      "Szkolenia u uznanych ekspertów (Maciej Bennewicz, Mateusz Grzesiak).",
      "Projekty międzynarodowe w Europie i poza nią."
  ];

  return (
    <section id="o-mnie" className="py-20 md:py-32 bg-white dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <SectionTitle>O MNIE</SectionTitle>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-16">
          <div className="lg:col-span-2">
            <img src="https://media.licdn.com/dms/image/v2/C5603AQHckhcfwwkZgg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1620039741657?e=1756944000&v=beta&t=8S_19HsucFSEF56K3pvrI999_HsR0YMiIAQLH4q2BaY" alt="Łukasz Pietrzyk" className="rounded-full shadow-2xl mx-auto w-64 h-64 md:w-80 md:h-80 object-cover" />
          </div>
          <div className="lg:col-span-3">
            <p className="mb-4 text-lg">Jestem doświadczonym coachem biznesu i kariery, absolwentem coachingu na Uniwersytecie Śląskim w Katowicach oraz stypendystą grantu naukowego na Uniwersytecie Masaryka w Brnie na katedrze psychologii.</p>
            <p className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Dlaczego coaching ze mną?</p>
            <p>Moje podejście opiera się na najnowszych badaniach z zakresu psychologii poznawczo-behawioralnej, neuropsychologii i komunikacji interpersonalnej. Zajmuję się mechanizmami uczenia się emocji oraz ich wpływem na podejmowanie decyzji, motywację i zmiany.</p>
          </div>
        </div>

        <div className="mb-16">
            <SubTitle>Obszary, w których mogę Ci pomóc</SubTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {AREAS_OF_HELP.map((area, index) => (
                    <div key={index} className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center mb-4">
                            {area.icon}
                            <h4 className="font-bold text-xl ml-4 text-slate-800 dark:text-white">{area.title}</h4>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">{area.description}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div>
                <SubTitle>Dla kogo jest coaching?</SubTitle>
                <ul className="space-y-3">
                    {forWhom.map((item, i) => (
                        <li key={i} className="flex items-start">
                           <svg className="w-5 h-5 text-accent flex-shrink-0 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                           <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
             <div>
                <SubTitle>Moje doświadczenie</SubTitle>
                <ul className="space-y-3">
                    {experience.map((item, i) => (
                         <li key={i} className="flex items-start">
                           <svg className="w-5 h-5 text-accent flex-shrink-0 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                           <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div>
            <SubTitle>Kim jestem na co dzień</SubTitle>
            <div className="bg-slate-100 dark:bg-gray-800 p-8 rounded-lg border border-slate-200 dark:border-gray-700">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                     {dailyRoles.map((item, i) => (
                         <li key={i} className="flex items-start">
                           <svg className="w-5 h-5 text-accent-dark flex-shrink-0 mr-3 mt-1" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                           <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;