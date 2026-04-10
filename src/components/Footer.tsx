import {
  Droplets,
  Search,
  UserPlus,
  Heart,
  HelpCircle,
  ExternalLink,
  Mail,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <Droplets size={24} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
        وتين
      </div>
      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', maxWidth: '400px', margin: '0.75rem auto', lineHeight: 1.8 }}>
        ﴿ وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا ﴾
      </div>
      <div className="footer-links">
        <a href="#search">
          <Search size={13} />
          البحث عن متبرع
        </a>
        <a href="#register">
          <UserPlus size={13} />
          سجل كمتبرع
        </a>
        <a href="#why">
          <Heart size={13} />
          لماذا أتبرع
        </a>
        <a href="#faq">
          <HelpCircle size={13} />
          الأسئلة الشائعة
        </a>
      </div>
      <div className="footer-socials">
        <a href="#" aria-label="Link"><ExternalLink size={18} /></a>
        <a href="#" aria-label="Email"><Mail size={18} /></a>
      </div>
      <p>© 2025 منصة وتين — صُنع بـ <Heart size={12} fill="currentColor" style={{ display: 'inline', verticalAlign: 'middle', color: '#ef4444' }} /> في الجزائر</p>
    </footer>
  );
}
