import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner@2.0.3';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import { Menu } from './components/pages/Menu';
import { Gallery } from './components/pages/Gallery';
import { Contact } from './components/pages/Contact';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/überuns" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menü" element={<Menu />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/galerie" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/kontakt" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" richColors />
        </div>
      </Router>
    </LanguageProvider>
  );
}
