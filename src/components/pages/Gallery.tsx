import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1648808694138-6706c5efc80a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY3MjQwMjM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Interior',
    title: 'Moderne Atmosphäre',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1756397481872-ed981ef72a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc2NzI2MDY0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Interior',
    title: 'Elegante Einrichtung',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1650588825807-a4192fff2d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzcGVjaWFsdHklMjBkcmlua3N8ZW58MXx8fHwxNzY3MzEyMTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Drinks',
    title: 'Kaffee Spezialitäten',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1669162364316-a74b2d661d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydCUyMGNvZmZlZXxlbnwxfHx8fDE3NjcyODY4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Drinks',
    title: 'Latte Art',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1685280778004-f9fcf807e30f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBiaXN0cm8lMjBmb29kfGVufDF8fHx8MTc2NzMxMjExOHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Food',
    title: 'Frühstück',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1570818996995-fae698c843f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdW5jaCUyMHBsYXRlfGVufDF8fHx8MTc2NzMxMjExOXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Food',
    title: 'Lunch Spezialitäten',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1737700088850-d0b53f9d39ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZGVzc2VydHxlbnwxfHx8fDE3NjcyOTc0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Food',
    title: 'Gourmet Desserts',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1683544599381-be284dbd9abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGRyaW5rcyUyMGJhcnxlbnwxfHx8fDE3NjczMTIxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Drinks',
    title: 'Cocktails',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1737700089128-cbbb2dc71631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBhc3RyaWVzJTIwYmFrZXJ5fGVufDF8fHx8MTc2NzMxMjExOXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Food',
    title: 'Frische Backwaren',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1539021897569-06e9fa3c6bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJpc3RhJTIwbWFraW5nJTIwY29mZmVlfGVufDF8fHx8MTc2NzI2ODQ2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Behind the Scenes',
    title: 'Barista bei der Arbeit',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1640703935937-5e6ec134977d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwdGFibGUlMjBzZXR0aW5nfGVufDF8fHx8MTc2NzI4ODI1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Interior',
    title: 'Tischgedeck',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1544986581-efac024faf62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwZ2xhc3NlcyUyMGVsZWdhbnR8ZW58MXx8fHwxNzY3MzEyNDM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Drinks',
    title: 'Weinauswahl',
  },
];

const categories = ['Alle', 'Interior', 'Food', 'Drinks', 'Behind the Scenes'];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === 'Alle'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const handlePrevImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
      setSelectedImage(filteredImages[prevIndex].id);
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
      const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(filteredImages[nextIndex].id);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1767034228661-cf4e67345167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYXZlbGVyJTIwY2FmZXxlbnwxfHx8fDE3NjczMTIxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Gallery"
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
          <h1 className="text-5xl md:text-7xl mb-6" style={{ color: 'var(--cafe-cream)' }}>
            Galerie
          </h1>
          <p className="text-xl md:text-2xl" style={{ color: 'var(--cafe-sand)' }}>
            Entdecken Sie die Welt der AeroLounge
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Gallery Grid */}
      <GalleryGrid
        images={filteredImages}
        onImageClick={(id) => setSelectedImage(id)}
      />

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />
    </div>
  );
}

function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) {
  return (
    <section className="py-12 bg-white sticky top-20 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  selectedCategory === category
                    ? 'var(--cafe-gold)'
                    : 'var(--cafe-cream)',
                color: 'var(--cafe-brown-darkest)',
              }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryGrid({
  images,
  onImageClick,
}: {
  images: typeof galleryImages;
  onImageClick: (id: number) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={images.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                layout
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => onImageClick(image.id)}
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white mb-2">{image.title}</p>
                    <span
                      className="text-sm px-3 py-1 rounded-full inline-block"
                      style={{
                        backgroundColor: 'var(--cafe-gold)',
                        color: 'var(--cafe-brown-darkest)',
                      }}
                    >
                      {image.category}
                    </span>
                  </div>
                  
                  {/* Zoom Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--cafe-gold)' }}
                    >
                      <ZoomIn className="w-8 h-8" style={{ color: 'var(--cafe-brown-darkest)' }} />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Lightbox({
  images,
  selectedImage,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof galleryImages;
  selectedImage: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const currentImage = images.find((img) => img.id === selectedImage);

  return (
    <AnimatePresence>
      {selectedImage !== null && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
          onClick={onClose}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center z-50"
            style={{ backgroundColor: 'var(--cafe-gold)' }}
          >
            <X className="w-6 h-6" style={{ color: 'var(--cafe-brown-darkest)' }} />
          </motion.button>

          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 w-12 h-12 rounded-full flex items-center justify-center z-50"
            style={{ backgroundColor: 'var(--cafe-gold)' }}
          >
            <ChevronLeft className="w-6 h-6" style={{ color: 'var(--cafe-brown-darkest)' }} />
          </motion.button>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 w-12 h-12 rounded-full flex items-center justify-center z-50"
            style={{ backgroundColor: 'var(--cafe-gold)' }}
          >
            <ChevronRight className="w-6 h-6" style={{ color: 'var(--cafe-brown-darkest)' }} />
          </motion.button>

          {/* Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl max-h-[90vh] w-full"
          >
            <ImageWithFallback
              src={currentImage.src}
              alt={currentImage.title}
              className="w-full h-full object-contain rounded-2xl"
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-6 rounded-b-2xl"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              }}
            >
              <h3 className="text-white text-xl mb-2">{currentImage.title}</h3>
              <span
                className="text-sm px-3 py-1 rounded-full inline-block"
                style={{
                  backgroundColor: 'var(--cafe-gold)',
                  color: 'var(--cafe-brown-darkest)',
                }}
              >
                {currentImage.category}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
