import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import {
  ArrowRight,
  Coffee,
  Utensils,
  Wine,
  Clock,
  MapPin,
  Star,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useLanguage } from "../../contexts/LanguageContext";

const heroImages = [
  "https://images.unsplash.com/photo-1648808694138-6706c5efc80a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY3MjQwMjM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1756397481872-ed981ef72a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc2NzI2MDY0OHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1539021897569-06e9fa3c6bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJpc3RhJTIwbWFraW5nJTIwY29mZmVlfGVufDF8fHx8MTc2NzI2ODQ2OXww&ixlib=rb-4.1.0&q=80&w=1080",
];

const menuImages = {
  breakfast:
    "https://images.unsplash.com/photo-1685280778004-f9fcf807e30f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBiaXN0cm8lMjBmb29kfGVufDF8fHx8MTc2NzMxMjExOHww&ixlib=rb-4.1.0&q=80&w=1080",
  lunch:
    "https://images.unsplash.com/photo-1570818996995-fae698c843f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdW5jaCUyMHBsYXRlfGVufDF8fHx8MTc2NzMxMjExOXww&ixlib=rb-4.1.0&q=80&w=1080",
  drinks:
    "https://images.unsplash.com/photo-1683544599381-be284dbd9abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGRyaW5rcyUyMGJhcnxlbnwxfHx8fDE3NjczMTIxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
};

const galleryImages = [
  "https://images.unsplash.com/photo-1650588825807-a4192fff2d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzcGVjaWFsdHklMjBkcmlua3N8ZW58MXx8fHwxNzY3MzEyMTE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1737700089128-cbbb2dc71631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBhc3RyaWVzJTIwYmFrZXJ5fGVufDF8fHx8MTc2NzMxMjExOXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1767034228661-cf4e67345167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYXZlbGVyJTIwY2FmZXxlbnwxfHx8fDE3NjczMTIxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1759038086403-c607d67bb245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwaG90ZWwlMjBhcmVhfGVufDF8fHx8MTc2NzMxMjEyMHww&ixlib=rb-4.1.0&q=80&w=1080",
];

export function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const menuCategories = [
    {
      title: t("home.menu.breakfast.title"),
      description: t("home.menu.breakfast.description"),
      icon: Coffee,
      image: menuImages.breakfast,
      color: "var(--cafe-cream)",
    },
    {
      title: t("home.menu.lunch.title"),
      description: t("home.menu.lunch.description"),
      icon: Utensils,
      image: menuImages.lunch,
      color: "var(--cafe-gold)",
    },
    {
      title: t("home.menu.drinks.title"),
      description: t("home.menu.drinks.description"),
      icon: Wine,
      image: menuImages.drinks,
      color: "var(--cafe-brown-light)",
    },
  ];

  const features = [
    {
      icon: MapPin,
      title: t("home.features.location.title"),
      description: t("home.features.location.description"),
    },
    {
      icon: Clock,
      title: t("home.features.hours.title"),
      description: t("home.features.hours.description"),
    },
    {
      icon: Star,
      title: t("home.features.quality.title"),
      description: t("home.features.quality.description"),
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <motion.div style={{ scale }} className="w-full h-full">
                <ImageWithFallback
                  src={image}
                  alt="AeroLounge Interior"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--cafe-brown-darkest)]/70 via-[var(--cafe-brown-darkest)]/50 to-[var(--cafe-brown-darkest)]/80" />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tight"
            style={{ color: "var(--cafe-cream)" }}
          >
            {t("home.hero.title")}
            <br />
            AeroLounge
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl mb-12 max-w-2xl mx-auto"
            style={{ color: "var(--cafe-sand)" }}
          >
            {t("home.hero.subtitle")}
            <br />
            {t("home.hero.subtitle2")}
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/menu#categories">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300"
                style={{
                  backgroundColor: "var(--cafe-gold)",
                  color: "var(--cafe-brown-darkest)",
                }}
              >
                {t("home.hero.menuBtn")}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/contact#reservation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor: "var(--cafe-cream)",
                  color: "var(--cafe-cream)",
                }}
              >
                {t("home.hero.reserveBtn")}
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
            style={{ borderColor: "var(--cafe-cream)" }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--cafe-cream)" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* Menu Categories Section */}
      <MenuCategoriesSection menuCategories={menuCategories} />

      {/* Gallery Preview Section */}
      <GalleryPreviewSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

function FeaturesSection({ features }: { features: any[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: "var(--cafe-brown-dark)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl mb-4"
            style={{ color: "var(--cafe-cream)" }}
          >
            {t("home.features.title")}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--cafe-sand)" }}
          >
            {t("home.features.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-8 rounded-2xl text-center group hover:scale-105 transition-transform duration-300"
              style={{ backgroundColor: "var(--cafe-brown-medium)" }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: "var(--cafe-gold)" }}
              >
                <feature.icon
                  className="w-8 h-8"
                  style={{ color: "var(--cafe-brown-darkest)" }}
                />
              </motion.div>
              <h3 className="mb-3" style={{ color: "var(--cafe-cream)" }}>
                {feature.title}
              </h3>
              <p style={{ color: "var(--cafe-sand)" }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuCategoriesSection({ menuCategories }: { menuCategories: any[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
          <h2
            className="text-4xl md:text-5xl mb-4"
            style={{ color: "var(--cafe-brown-darkest)" }}
          >
            {t("home.menu.title")}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--cafe-brown)" }}
          >
            {t("home.menu.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <Link to="/menu">
                <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <motion.div
                    className="absolute top-6 left-6 w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: category.color }}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <category.icon
                      className="w-7 h-7"
                      style={{ color: "var(--cafe-brown-darkest)" }}
                    />
                  </motion.div>
                </div>
                <h3
                  className="mb-2"
                  style={{ color: "var(--cafe-brown-darkest)" }}
                >
                  {category.title}
                </h3>
                <p style={{ color: "var(--cafe-brown)" }}>
                  {category.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryPreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: "var(--cafe-brown-darkest)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl mb-4"
            style={{ color: "var(--cafe-cream)" }}
          >
            {t("home.gallery.title")}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--cafe-sand)" }}
          >
            {t("home.gallery.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative h-64 rounded-xl overflow-hidden cursor-pointer"
            >
              <ImageWithFallback
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/gallery">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border-2 transition-all duration-300"
              style={{
                borderColor: "var(--cafe-gold)",
                color: "var(--cafe-gold)",
              }}
            >
              {t("home.gallery.viewAll")}
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--cafe-gold)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <h2
          className="text-4xl md:text-5xl mb-6"
          style={{ color: "var(--cafe-brown-darkest)" }}
        >
          {t("home.cta.title")}
        </h2>
        <p
          className="text-lg mb-8 max-w-2xl mx-auto"
          style={{ color: "var(--cafe-brown)" }}
        >
          {t("home.cta.subtitle")}
        </p>
        <Link to="/contact#reservation">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-full text-lg flex items-center gap-3 mx-auto transition-all duration-300"
            style={{
              backgroundColor: "var(--cafe-brown-darkest)",
              color: "var(--cafe-cream)",
            }}
          >
            {t("home.cta.button")}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-20"
        style={{ backgroundColor: "var(--cafe-brown-darkest)" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-24 h-24 rounded-full opacity-20"
        style={{ backgroundColor: "var(--cafe-brown-darkest)" }}
      />
    </section>
  );
}
