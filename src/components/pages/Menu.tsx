import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Coffee, Croissant, Utensils, Wine, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useLanguage } from "../../contexts/LanguageContext";
import { useLocation } from "react-router-dom";

export function Menu() {
  const [activeCategory, setActiveCategory] = useState("breakfast");
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#categories") {
      const element = document.getElementById("categories");
      if (element) {
        setTimeout(() => {
          const yOffset = -100; // Offset für Navbar
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  type Category = {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    image: string;
  };

  const categories: Category[] = [
    {
      id: "breakfast",
      name: t("menu.categories.breakfast"),
      icon: Coffee,
      color: "var(--cafe-cream)",
      image:
        "https://images.unsplash.com/photo-1685280778004-f9fcf807e30f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBiaXN0cm8lMjBmb29kfGVufDF8fHx8MTc2NzMxMjExOHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "lunch",
      name: t("menu.categories.lunch"),
      icon: Utensils,
      color: "var(--cafe-gold)",
      image:
        "https://images.unsplash.com/photo-1570818996995-fae698c843f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdW5jaCUyMHBsYXRlfGVufDF8fHx8MTc2NzMxMjExOXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "drinks",
      name: t("menu.categories.drinks"),
      icon: Wine,
      color: "var(--cafe-brown-light)",
      image:
        "https://images.unsplash.com/photo-1683544599381-be284dbd9abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGRyaW5rcyUyMGJhcnxlbnwxfHx8fDE3NjczMTIxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  type MenuItem = {
    name: string;
    description: string;
    price: string;
    featured?: boolean;
  };

  const menuItems: Record<string, MenuItem[]> = {
    breakfast: t("menu.items.breakfast") as any,
    lunch: t("menu.items.lunch") as any,
    drinks: t("menu.items.drinks") as any,
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1650588825807-a4192fff2d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzcGVjaWFsdHklMjBkcmlua3N8ZW58MXx8fHwxNzY3MzEyMTE3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Menu"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--cafe-brown-darkest)]/80 to-[var(--cafe-brown-darkest)]/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <h1
            className="text-5xl md:text-7xl mb-6"
            style={{ color: "var(--cafe-cream)" }}
          >
            {t("menu.hero.title")}
          </h1>
          <p
            className="text-xl md:text-2xl"
            style={{ color: "var(--cafe-sand)" }}
          >
            {t("menu.hero.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* Category Selector */}
      <CategorySelector
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Menu Items */}
      <MenuItemsSection activeCategory={activeCategory} />

      {/* Special Offers */}
      <SpecialOffersSection />
    </div>
  );
}

function CategorySelector({
  categories,
  activeCategory,
  setActiveCategory,
}: {
  categories: Array<{
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    image: string;
  }>;
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="categories"
      ref={ref}
      className="sticky top-20 z-40 py-8 backdrop-blur-lg"
      style={{ backgroundColor: "var(--cafe-brown-darkest)/95" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center gap-4">
          {categories.map((category: any, index: number) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveCategory(category.id)}
              className="relative px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-300"
              style={{
                backgroundColor:
                  activeCategory === category.id
                    ? category.color
                    : "var(--cafe-brown-medium)",
                color:
                  activeCategory === category.id
                    ? "var(--cafe-brown-darkest)"
                    : "var(--cafe-sand)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: "var(--cafe-brown-darkest)" }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuItemsSection({ activeCategory }: { activeCategory: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  type MenuItem = {
    name: string;
    description: string;
    price: string;
    featured?: boolean;
  };

  type Category = {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    image: string;
  };

  const menuItems: Record<string, MenuItem[]> = {
    breakfast: t("menu.items.breakfast") as any,
    lunch: t("menu.items.lunch") as any,
    drinks: t("menu.items.drinks") as any,
  };
  const items = menuItems[activeCategory as keyof typeof menuItems];
  const categories: Category[] = [
    {
      id: "breakfast",
      name: t("menu.categories.breakfast"),
      icon: Coffee,
      color: "var(--cafe-cream)",
      image:
        "https://images.unsplash.com/photo-1685280778004-f9fcf807e30f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBiaXN0cm8lMjBmb29kfGVufDF8fHx8MTc2NzMxMjExOHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "lunch",
      name: t("menu.categories.lunch"),
      icon: Utensils,
      color: "var(--cafe-gold)",
      image:
        "https://images.unsplash.com/photo-1570818996995-fae698c843f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdW5jaCUyMHBsYXRlfGVufDF8fHx8MTc2NzMxMjExOXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: "drinks",
      name: t("menu.categories.drinks"),
      icon: Wine,
      color: "var(--cafe-brown-light)",
      image:
        "https://images.unsplash.com/photo-1683544599381-be284dbd9abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGRyaW5rcyUyMGJhcnxlbnwxfHx8fDE3NjczMTIxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];
  const category = categories.find((c) => c.id === activeCategory);

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Category Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative h-96 rounded-3xl overflow-hidden mb-16"
            >
              <ImageWithFallback
                src={category?.image || ""}
                alt={category?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                <div className="flex items-center gap-4">
                  {category?.icon && (
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: category.color }}
                    >
                      <category.icon className="w-8 h-8 text-[var(--cafe-brown-darkest)]" />
                    </div>
                  )}
                  <h2 className="text-4xl text-white">{category?.name}</h2>
                </div>
              </div>
            </motion.div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((item: any, index: number) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative p-6 rounded-2xl hover:scale-105 transition-all duration-300"
                  style={{
                    backgroundColor: item.featured
                      ? "var(--cafe-brown-medium)"
                      : "var(--cafe-sand)",
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3
                      className="text-xl font-semibold flex-1"
                      style={{
                        color: item.featured
                          ? "var(--cafe-cream)"
                          : "var(--cafe-brown-darkest)",
                      }}
                    >
                      {item.name}
                    </h3>
                    <span
                      className="text-xl font-bold ml-4"
                      style={{
                        color: item.featured
                          ? "var(--cafe-cream)"
                          : "var(--cafe-brown-darkest)",
                      }}
                    >
                      €{item.price}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{
                      color: item.featured
                        ? "var(--cafe-sand)"
                        : "var(--cafe-brown)",
                    }}
                  >
                    {item.description}
                  </p>
                  {item.featured && (
                    <div className="flex justify-between items-end">
                      <div
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: "var(--cafe-brown-darkest)",
                          color: "var(--cafe-cream)",
                        }}
                      >
                        {t("menu.houseSpecial")}
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Sparkles
                          className="w-5 h-5"
                          style={{ color: "var(--cafe-gold)" }}
                        />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function SpecialOffersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const offers = [
    {
      title: t("menu.specials.businessLunch.title"),
      description: t("menu.specials.businessLunch.description"),
      time: t("menu.specials.businessLunch.time"),
      icon: Utensils,
    },
    {
      title: t("menu.specials.happyHour.title"),
      description: t("menu.specials.happyHour.description"),
      time: t("menu.specials.happyHour.time"),
      icon: Wine,
    },
    {
      title: t("menu.specials.breakfast.title"),
      description: t("menu.specials.breakfast.description"),
      time: t("menu.specials.breakfast.time"),
      icon: Croissant,
    },
  ];

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
            {t("menu.specials.title")}
          </h2>
          <p className="text-lg" style={{ color: "var(--cafe-sand)" }}>
            {t("menu.specials.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl text-center"
              style={{ backgroundColor: "var(--cafe-gold)" }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: "var(--cafe-brown-darkest)" }}
              >
                <offer.icon
                  className="w-8 h-8"
                  style={{ color: "var(--cafe-cream)" }}
                />
              </motion.div>
              <h3
                className="mb-3"
                style={{ color: "var(--cafe-brown-darkest)" }}
              >
                {offer.title}
              </h3>
              <p className="mb-4" style={{ color: "var(--cafe-brown)" }}>
                {offer.description}
              </p>
              <div
                className="inline-block px-4 py-2 rounded-full text-sm"
                style={{
                  backgroundColor: "var(--cafe-brown-darkest)",
                  color: "var(--cafe-cream)",
                }}
              >
                {offer.time}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
