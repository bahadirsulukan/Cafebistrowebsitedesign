import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'de' as const, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en' as const, name: 'English', flag: '🇬🇧' },
  { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
  { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
  { code: 'tr' as const, name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar' as const, name: 'العربية', flag: '🇸🇦' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/menu', label: t('nav.menu') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[var(--cafe-brown-darkest)]/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--cafe-cream)] to-[var(--cafe-gold)] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">☕</span>
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl tracking-tight" style={{ color: 'var(--cafe-cream)' }}>
                AeroLounge
              </span>
              <span className="text-xs tracking-widest" style={{ color: 'var(--cafe-sand)' }}>
                CAFÉ & BISTRO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative group"
              >
                <span
                  className={`transition-colors duration-300 ${
                    location.pathname === link.to
                      ? 'text-[var(--cafe-cream)]'
                      : 'text-[var(--cafe-sand)] hover:text-[var(--cafe-cream)]'
                  }`}
                >
                  {link.label}
                </span>
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--cafe-gold)]"
                  />
                )}
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300"
                style={{
                  backgroundColor: isLangMenuOpen ? 'var(--cafe-brown-medium)' : 'transparent',
                  color: 'var(--cafe-sand)',
                }}
              >
                <Globe className="w-4 h-4" />
                <span>{currentLang.code.toUpperCase()}</span>
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden"
                    style={{ backgroundColor: 'var(--cafe-brown-medium)' }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 flex items-center space-x-3 transition-colors duration-200"
                        style={{
                          backgroundColor:
                            currentLang.code === lang.code
                              ? 'var(--cafe-brown-light)'
                              : 'transparent',
                          color: 'var(--cafe-sand)',
                        }}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            style={{ color: 'var(--cafe-cream)' }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ backgroundColor: 'var(--cafe-brown-darkest)' }}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block py-2 transition-colors duration-300 ${
                    location.pathname === link.to
                      ? 'text-[var(--cafe-cream)]'
                      : 'text-[var(--cafe-sand)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t" style={{ borderColor: 'var(--cafe-brown-medium)' }}>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className="px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
                      style={{
                        backgroundColor:
                          currentLang.code === lang.code
                            ? 'var(--cafe-brown-light)'
                            : 'var(--cafe-brown-medium)',
                        color: 'var(--cafe-sand)',
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}