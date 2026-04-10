import {
  Droplets,
  Search,
  UserPlus,
  Heart,
  HelpCircle,
  HeartPulse,
  MapPin,
  Phone,
  Code2,
  ExternalLink,
  HandHeart,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-pro">
      {/* Quranic Verse Section - Super Elegant */}
      <div className="footer-verse-section">
        <div className="footer-verse-card">
          <div className="verse-icon-wrap">
            <HandHeart size={32} strokeWidth={1.5} />
            <Droplets size={16} className="verse-icon-drop" />
          </div>
          <p className="footer-verse">
            ﴿ وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا ٱلنَّاسَ جَمِيعًا ﴾
          </p>
          <p className="footer-verse-source">— سورة المائدة، الآية 32</p>
        </div>
      </div>

      {/* Main Footer Content - Compact & Professional */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col footer-brand-col">
            <div className="footer-brand">
              <Droplets size={24} />
              <span>وتين</span>
            </div>
            <p className="footer-brand-desc">
              منصة جزائرية لإنقاذ الأرواح عبر تسهيل الوصول إلى المتبرعين بالدم في جميع ولايات الوطن.
            </p>
            <div className="footer-stats-mini">
              <div className="footer-stat-item">
                <HeartPulse size={14} />
                <span>+3,800 متبرع</span>
              </div>
              <div className="footer-stat-item">
                <MapPin size={14} />
                <span>58 ولاية</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">روابط سريعة</h4>
            <nav className="footer-nav">
              <a href="#hero">
                <HeartPulse size={14} />
                الرئيسية
              </a>
              <a href="#search">
                <Search size={14} />
                البحث عن متبرع
              </a>
              <a href="#register">
                <UserPlus size={14} />
                سجل كمتبرع
              </a>
              <a href="#why">
                <Heart size={14} />
                لماذا أتبرع
              </a>
              <a href="#faq">
                <HelpCircle size={14} />
                الأسئلة الشائعة
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4 className="footer-col-title">تواصل معنا</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <Phone size={14} />
                <span dir="ltr">+213 696 947 598</span>
              </div>
              <div className="footer-contact-item">
                <MapPin size={14} />
                <span>الشلف — أولاد محمد</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">
            © {new Date().getFullYear()} منصة وتين — جميع الحقوق محفوظة
          </p>
          <a
            href="https://fennecvisionary.vercel.app/DevProfile.html"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-dev"
          >
            <Code2 size={15} />
            <span>صمم و طور بواسطة</span>
            <strong>برادعي عبد الرحمن</strong>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
