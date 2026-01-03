import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Target, Heart, Award, Users, Plane, Building2 } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '../../contexts/LanguageContext';

export function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const { t } = useLanguage();

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const values = [
    {
      icon: Heart,
      title: t('about.values.passion.title'),
      description: t('about.values.passion.description'),
    },
    {
      icon: Award,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description'),
    },
    {
      icon: Users,
      title: t('about.values.hospitality.title'),
      description: t('about.values.hospitality.description'),
    },
    {
      icon: Target,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description'),
    },
  ];

  const advantages = [
    {
      icon: Plane,
      title: t('about.location.airport.title'),
      description: t('about.location.airport.description'),
      stat: t('about.location.airport.stat'),
    },
    {
      icon: Building2,
      title: t('about.location.hotels.title'),
      description: t('about.location.hotels.description'),
      stat: t('about.location.hotels.stat'),
      statLabel: t('about.location.hotels.statLabel'),
    },
  ];

  return (
    <div ref={containerRef} className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1648808694138-6706c5efc80a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY3MjQwMjM5fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="AeroLounge Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--cafe-brown-darkest)]/80 via-[var(--cafe-brown-darkest)]/60 to-[var(--cafe-brown-darkest)]/90" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6" style={{ color: 'var(--cafe-cream)' }}>
            {t('about.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl" style={{ color: 'var(--cafe-sand)' }}>
            {t('about.hero.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <StorySection />

      {/* Values Section */}
      <ValuesSection values={values} />

      {/* Location Advantages */}
      <LocationSection advantages={advantages} />

      {/* Mission Section */}
      <MissionSection />
    </div>
  );
}

function StorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      className="py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6" style={{ color: 'var(--cafe-brown-darkest)' }}>
            {t('about.story.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1539021897569-06e9fa3c6bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJpc3RhJTIwbWFraW5nJTIwY29mZmVlfGVufDF8fHx8MTc2NzI2ODQ2OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Barista"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed" style={{ color: 'var(--cafe-brown)' }}>
              {t('about.story.p1')}
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--cafe-brown)' }}>
              {t('about.story.p2')}
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--cafe-brown)' }}>
              {t('about.story.p3')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection({ values }: { values: any[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: 'var(--cafe-brown-dark)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4" style={{ color: 'var(--cafe-cream)' }}>
            {t('about.values.title')}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--cafe-sand)' }}>
            {t('about.values.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: 'var(--cafe-gold)' }}
              >
                <value.icon className="w-10 h-10" style={{ color: 'var(--cafe-brown-darkest)' }} />
              </motion.div>
              <h3 className="mb-3" style={{ color: 'var(--cafe-cream)' }}>
                {value.title}
              </h3>
              <p style={{ color: 'var(--cafe-sand)' }}>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationSection({ advantages }: { advantages: any[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4" style={{ color: 'var(--cafe-brown-darkest)' }}>
            {t('about.location.title')}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--cafe-brown)' }}>
            {t('about.location.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-8 rounded-2xl"
              style={{ backgroundColor: 'var(--cafe-cream)' }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--cafe-gold)' }}
                  >
                    <advantage.icon className="w-8 h-8" style={{ color: 'var(--cafe-brown-darkest)' }} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2" style={{ color: 'var(--cafe-brown-darkest)' }}>
                    {advantage.title}
                  </h3>
                  <p className="mb-4" style={{ color: 'var(--cafe-brown)' }}>
                    {advantage.description}
                  </p>
                  <div className="text-3xl" style={{ color: 'var(--cafe-gold)' }}>
                    {advantage.stat}
                    {advantage.statLabel && (
                      <span className="text-lg ml-2" style={{ color: 'var(--cafe-brown)' }}>
                        {advantage.statLabel}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center p-8 rounded-2xl"
          style={{ backgroundColor: 'var(--cafe-cream)' }}
        >
          <p className="text-xl mb-4" style={{ color: 'var(--cafe-brown-darkest)' }}>
            📍 {t('about.location.address')}
          </p>
          <p style={{ color: 'var(--cafe-brown)' }}>
            {t('about.location.addressDesc')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: 'var(--cafe-gold)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-8" style={{ color: 'var(--cafe-brown-darkest)' }}>
            {t('about.mission.title')}
          </h2>
          <p className="text-xl leading-relaxed" style={{ color: 'var(--cafe-brown)' }}>
            {t('about.mission.text')}
          </p>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-10"
        style={{ backgroundColor: 'var(--cafe-brown-darkest)' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-10 left-10 w-24 h-24 rounded-full opacity-10"
        style={{ backgroundColor: 'var(--cafe-brown-darkest)' }}
      />
    </section>
  );
}
