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
  Share2,
  MessageCircle,
  Link2,
  Check,
} from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const shareText =
    'ساهم في نشر الخير: إدعمنا بمشاركة الموقع في المنتديات والدردشات ومواقع التواصل، وانشره بين أصدقائك. سجل كمتطوع وادعُ لنا بظهر الغيب.';

  const handleShareFacebook = () => {
    const shareUrl = window.location.origin;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl,
    )}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${window.location.origin}`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer className="footer-pro">
      {/* Quranic Verse Section */}
      <div className="footer-verse-section">
        <div className="footer-verse-ornament">
          <HandHeart size={40} strokeWidth={1.5} />
          <Droplets size={20} className="ornament-drop" />
        </div>
        <p className="footer-verse option-a-verse">
          <span className="option-a-verse-main">﴿ وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا ٱلنَّاسَ جَمِيعًا ﴾</span>
          <br />
          <span className="verse-source-inline">سورة المائدة، الآية 32</span>
        </p>
      </div>

      <div className="footer-support-message" id="support">
        <div className="footer-support-content">
          <p>
            <strong>ساهم في نشر الخير:</strong> إدعمنا بمشاركة الموقع في المنتديات والدردشات ومواقع التواصل، وانشره بين أصدقائك.{' '}
            <a href="#register" className="support-register-link">
              سجل كمتطوع
            </a>{' '}
            وادعُ لنا بظهر الغيب.
          </p>

          <div className="footer-support-actions" role="group" aria-label="أزرار نشر الموقع">
            <button type="button" className="support-action-btn" onClick={handleShareFacebook}>
              <Share2 size={14} />
              نشر على فيسبوك
            </button>
            <button type="button" className="support-action-btn" onClick={handleShareWhatsApp}>
              <MessageCircle size={14} />
              نشر على واتساب
            </button>
            <button type="button" className="support-action-btn" onClick={handleCopyLink}>
              {copied ? <Check size={14} /> : <Link2 size={14} />}
              {copied ? 'تم النسخ' : 'نسخ الرابط'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col footer-brand-col">
            <div className="footer-brand">
              <Droplets size={28} />
              <span>وتين</span>
            </div>
            <p className="footer-brand-desc">
              منصة جزائرية تربط بين المتبرعين بالدم والمحتاجين إليه. هدفنا إنقاذ الأرواح من خلال تسهيل الوصول إلى المتبرعين في جميع ولايات الوطن.
            </p>
            <div className="footer-stats-mini">
              <div className="footer-stat-item">
                <HeartPulse size={16} />
                <span>+3,800 متبرع</span>
              </div>
              <div className="footer-stat-item">
                <MapPin size={16} />
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
                <span dir="ltr">+213696947598</span>
              </div>
              <div className="footer-contact-item">
                <MapPin size={14} />
                <span>الشلف - أولاد محمد</span>
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
