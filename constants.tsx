import { NavLink, HelpArea, Service, ProcessStep, SuccessStory, Testimonial, ClientLogo, LocationInfo } from './types';

// Icons
const CareerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const BusinessIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const PublicSpeakingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const PersonalDevIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const YouthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" /></svg>;
const AntiMobbingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6" /></svg>;

const DiagnosisIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
const PlanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m0 10l-6-3m6 3V7" /></svg>;
const ImplementationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const EvaluationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>;

// Content
export const NAV_LINKS: NavLink[] = [
  { name: 'Start', href: '#hero' },
  { name: 'O mnie', href: '#o-mnie' },
  { name: 'Oferta', href: '#oferta' },
  { name: 'Historie Sukcesu', href: '#historie-sukcesu' },
  { name: 'Opinie', href: '#opinie' },
  { name: 'Lokalizacja', href: '#lokalizacja' },
  { name: 'Kontakt', href: '#kontakt' },
];

export const AREAS_OF_HELP: HelpArea[] = [
    { icon: <CareerIcon />, title: 'Coaching kariery', description: 'Zmiana branży, rozwój kompetencji, planowanie ścieżki zawodowej.' },
    { icon: <BusinessIcon />, title: 'Coaching biznesowy', description: 'Strategia rozwoju firmy, zarządzanie zespołem, efektywna komunikacja.' },
    { icon: <PublicSpeakingIcon />, title: 'Wystąpienia publiczne', description: 'Techniki radzenia sobie ze stresem, budowanie autorytetu.' },
    { icon: <PersonalDevIcon />, title: 'Rozwój osobisty', description: 'Pewność siebie, asertywność, skuteczność w działaniu.' },
    { icon: <YouthIcon />, title: 'Coaching młodzieżowy', description: 'Wybór ścieżki edukacyjnej i zawodowej, wzmacnianie poczucia własnej wartości.' },
    { icon: <AntiMobbingIcon />, title: 'Asertywność i Antymobbing', description: 'Praktyczne warsztaty z asertywności i procedur antymobbingowych.' }
];

export const SERVICES: Service[] = [
    { title: 'Mentoring Indywidualny 1:1', description: 'Spersonalizowany program rozwojowy, skoncentrowany na Twoich celach zawodowych i osobistych.' },
    { title: 'Szkolenia dla Zespołów', description: 'Warsztaty i szkolenia grupowe mające na celu zwiększenie efektywności, komunikacji i współpracy w zespole.' },
    { title: 'Warsztaty Rozwoju Kompetencji', description: 'Intensywne sesje skoncentrowane na rozwijaniu konkretnych umiejętności, takich jak przywództwo, negocjacje czy zarządzanie czasem.' },
    { title: 'Audyt i Doradztwo Strategiczne', description: 'Analiza obecnej sytuacji i opracowanie strategii rozwoju dla Twojej firmy lub kariery.' }
];

export const PROCESS_STEPS: ProcessStep[] = [
    { icon: <DiagnosisIcon />, title: 'Diagnoza Potrzeb', description: 'Zaczynamy od dogłębnej analizy Twoich celów, wyzwań i obecnej sytuacji, aby zrozumieć, gdzie jesteś i dokąd zmierzasz.' },
    { icon: <PlanIcon />, title: 'Plan Działania', description: 'Tworzymy spersonalizowany plan rozwoju z jasno określonymi krokami, narzędziami i kamieniami milowymi.' },
    { icon: <ImplementationIcon />, title: 'Wdrożenie i Wsparcie', description: 'Aktywnie wspieram Cię w realizacji planu, dostarczając wiedzę, motywację i narzędzia niezbędne do pokonania przeszkód.' },
    { icon: <EvaluationIcon />, title: 'Ewaluacja i Dalsze Kroki', description: 'Regularnie mierzymy postępy i analizujemy wyniki, aby optymalizować strategię i planować kolejne etapy Twojego wzrostu.' }
];

export const SUCCESS_STORIES: SuccessStory[] = [
    { image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop', title: 'Transformacja Liderska', category: 'Mentoring 1:1' },
    { image: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=1740&auto=format&fit=crop', title: 'Wzrost Efektywności Zespołu', category: 'Szkolenia dla Zespołów' },
    { image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1740&auto=format&fit=crop', title: 'Nowa Ścieżka Kariery', category: 'Coaching Kariery' },
    { image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1740&auto=format&fit=crop', title: 'Skuteczne Wystąpienia', category: 'Wystąpienia Publiczne' },
    { image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop', title: 'Rozwój Biznesu', category: 'Coaching Biznesowy' },
    { image: 'https://images.unsplash.com/photo-1573496130407-57329f01f769?q=80&w=1738&auto=format&fit=crop', title: 'Zbudowanie Pewności Siebie', category: 'Rozwój Osobisty' },
];

export const TESTIMONIALS: Testimonial[] = [
    { stars: 5, quote: 'Współpraca z Łukaszem to czysta przyjemność. Jego profesjonalizm i zaangażowanie pomogły mi zrestrukturyzować mój zespół i znacząco poprawić wyniki. Polecam każdemu menedżerowi!', author: 'Anna Kowalska', role: 'Dyrektor HR, TechCorp', date: '15.06.2024' },
    { stars: 5, quote: 'Dzięki sesjom coachingowym z Łukaszem odważyłem się na zmianę branży. Jego wsparcie, trafne pytania i narzędzia, które mi dał, były bezcenne. To była najlepsza inwestycja w moją karierę.', author: 'Piotr Nowak', role: 'Software Developer', date: '02.05.2024' },
    { stars: 5, quote: 'Szkolenie z wystąpień publicznych przerosło moje oczekiwania. Łukasz w praktyczny sposób pokazał, jak radzić sobie ze stresem i budować pewność siebie na scenie. Moje prezentacje są teraz na zupełnie innym poziomie.', author: 'Ewa Wiśniewska', role: 'Marketing Manager', date: '20.04.2024' }
];

const PlaceholderLogo = ({ name, theme }: { name: string; theme: 'light' | 'dark' }) => (
    <div className={`flex items-center justify-center h-12 text-2xl font-bold ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
      {name}
    </div>
  );
  
  export const CLIENT_LOGOS: ClientLogo[] = [
    { name: 'TechSolutions', logoLight: <PlaceholderLogo name="TechSolutions" theme="light" />, logoDark: <PlaceholderLogo name="TechSolutions" theme="dark" /> },
    { name: 'InnovateCo', logoLight: <PlaceholderLogo name="InnovateCo" theme="light" />, logoDark: <PlaceholderLogo name="InnovateCo" theme="dark" /> },
    { name: 'Quantum Leap', logoLight: <PlaceholderLogo name="Quantum Leap" theme="light" />, logoDark: <PlaceholderLogo name="Quantum Leap" theme="dark" /> },
    { name: 'FutureWorks', logoLight: <PlaceholderLogo name="FutureWorks" theme="light" />, logoDark: <PlaceholderLogo name="FutureWorks" theme="dark" /> },
    { name: 'Progresja', logoLight: <PlaceholderLogo name="Progresja" theme="light" />, logoDark: <PlaceholderLogo name="Progresja" theme="dark" /> },
    { name: 'Synergia', logoLight: <PlaceholderLogo name="Synergia" theme="light" />, logoDark: <PlaceholderLogo name="Synergia" theme="dark" /> }
  ];

export const LOCATION_INFO: LocationInfo = {
  address: 'ul. Przykładowa 123',
  city: 'Warszawa, Polska',
  description: 'Mój gabinet coachingowy znajduje się w samym sercu Warszawy, w łatwo dostępnej lokalizacji z doskonałym dojazdem komunikacją publiczną.',
  image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1740&auto=format&fit=crop',
  coordinates: {
    lat: 52.2297,
    lng: 21.0122
  },
  features: [
    'Centralna lokalizacja w Warszawie',
    'Doskonały dojazd komunikacją publiczną',
    'Parking dla klientów',
    'Komfortowe warunki spotkań',
    'Sesje online również dostępne'
  ]
};