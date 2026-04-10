import { useState, useEffect } from 'react';
import { Menu, X, Heart, Search, HelpCircle, UserPlus, Droplets } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="logo">
          <Droplets size={22} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
          وتين <span>منصة التبرع بالدم</span>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="القائمة">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#search" onClick={() => setMenuOpen(false)}>
            <Search size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
            البحث عن متبرع
          </a>
          <a href="#why" onClick={() => setMenuOpen(false)}>
            <Heart size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
            لماذا أتبرع؟
          </a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>
            <HelpCircle size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
            الأسئلة الشائعة
          </a>
          <a href="#register" className="nav-cta" onClick={() => setMenuOpen(false)}>
            <UserPlus size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
            سجّل كمتبرع
          </a>
        </div>
      </div>
    </nav>
  );
}
