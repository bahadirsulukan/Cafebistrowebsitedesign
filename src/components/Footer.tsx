import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer
      className="pt-16 pb-8"
      style={{ backgroundColor: 'var(--cafe-brown-darkest)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--cafe-cream)] to-[var(--cafe-gold)] rounded-full flex items-center justify-center">
                <span className="text-xl">☕</span>
              </div>
              <div className="flex flex-col">
                <span className="tracking-tight" style={{ color: 'var(--cafe-cream)' }}>
                  AeroLounge
                </span>
                <span className="text-xs tracking-widest" style={{ color: 'var(--cafe-sand)' }}>
                  CAFÉ & BISTRO
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--cafe-sand)' }}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4" style={{ color: 'var(--cafe-cream)' }}>
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/about', label: t('nav.about') },
                { to: '/menu', label: t('nav.menu') },
                { to: '/gallery', label: t('nav.gallery') },
                { to: '/contact', label: t('nav.contact') }
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm hover:text-[var(--cafe-cream)] transition-colors duration-300"
                    style={{ color: 'var(--cafe-sand)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4" style={{ color: 'var(--cafe-cream)' }}>
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--cafe-gold)' }} />
                <span className="text-sm" style={{ color: 'var(--cafe-sand)' }}>
                  {t('contact.info.addressText')}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--cafe-gold)' }} />
                <span className="text-sm" style={{ color: 'var(--cafe-sand)' }}>
                  {t('contact.info.phoneText')}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--cafe-gold)' }} />
                <span className="text-sm" style={{ color: 'var(--cafe-sand)' }}>
                  {t('contact.info.emailText')}
                </span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="mb-4" style={{ color: 'var(--cafe-cream)' }}>
              {t('contact.info.hours')}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--cafe-gold)' }} />
                <div className="text-sm" style={{ color: 'var(--cafe-sand)' }}>
                  <div>{t('contact.info.hoursText').split('\n')[0]}</div>
                  <div>{t('contact.info.hoursText').split('\n')[1]}</div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="mb-3 text-sm" style={{ color: 'var(--cafe-cream)' }}>
                {t('footer.followUs')}
              </h4>
              <div className="flex space-x-4">
                {[Facebook, Instagram, Twitter].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                    style={{
                      backgroundColor: 'var(--cafe-brown-medium)',
                      color: 'var(--cafe-gold)',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
          style={{ borderColor: 'var(--cafe-brown-medium)' }}
        >
          <p className="text-sm" style={{ color: 'var(--cafe-sand)' }}>
            {t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm hover:text-[var(--cafe-cream)] transition-colors duration-300"
              style={{ color: 'var(--cafe-sand)' }}
            >
              {t('footer.privacy')}
            </a>
            <a
              href="#"
              className="text-sm hover:text-[var(--cafe-cream)] transition-colors duration-300"
              style={{ color: 'var(--cafe-sand)' }}
            >
              {t('footer.imprint')}
            </a>
            <a
              href="#"
              className="text-sm hover:text-[var(--cafe-cream)] transition-colors duration-300"
              style={{ color: 'var(--cafe-sand)' }}
            >
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}