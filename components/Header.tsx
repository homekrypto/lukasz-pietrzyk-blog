import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import Logo from './Logo';
import GooeyNav from './GooeyNav';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Convert NAV_LINKS to the format expected by GooeyNav
  const gooeyNavItems = NAV_LINKS.map(link => ({
    label: link.name,
    href: link.href
  }));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerElement = document.querySelector('header');
      const headerOffset = headerElement ? headerElement.offsetHeight : 70;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    setIsMenuOpen(false);
  };

  const handleGooeyNavClick = (item: { label: string; href: string }) => {
    const targetId = item.href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerElement = document.querySelector('header');
      const headerOffset = headerElement ? headerElement.offsetHeight : 70;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-slate-50/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent backdrop-blur-sm'
  }`;
  
  return (
    <header className={headerClasses}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Desktop Logo */}
        <div className="hidden sm:block">
          <Logo onClick={(e) => handleLinkClick(e, '#hero')} />
        </div>
        {/* Mobile Logo */}
        <div className="block sm:hidden">
          <Logo onClick={(e) => handleLinkClick(e, '#hero')} compact />
        </div>
        
        {/* Desktop GooeyNav */}
        <div className="hidden md:block">
          <GooeyNav
            items={gooeyNavItems}
            particleCount={12}
            particleDistances={[60, 8]}
            particleR={80}
            initialActiveIndex={0}
            animationTime={500}
            timeVariance={200}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            onItemClick={handleGooeyNavClick}
          />
        </div>

        {/* Right side - Theme Toggle and Mobile Menu */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-800 dark:text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-50/70 dark:bg-gray-900/70 backdrop-blur-md border-t border-slate-200/30 dark:border-gray-700/30">
          <div className="container mx-auto px-6 py-6">
            <GooeyNav
              items={gooeyNavItems}
              particleCount={8}
              particleDistances={[40, 5]}
              particleR={60}
              initialActiveIndex={0}
              animationTime={400}
              timeVariance={150}
              colors={[1, 2, 3, 1]}
              onItemClick={(item) => {
                handleGooeyNavClick(item);
                setIsMenuOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;