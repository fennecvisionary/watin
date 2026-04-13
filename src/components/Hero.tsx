import { Search, UserPlus, HeartPulse } from 'lucide-react';
import heroBg from '../assets/hero-bg.jpg';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-layer" aria-hidden="true">
        <img src={heroBg} alt="" loading="eager" />
      </div>

      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-badge">
          <HeartPulse size={16} />
          الجزائر تحتاجك
        </div>
        <h1>
          تبرّع بدمك،
          <br />
          <span className="highlight">أنقذ حياة</span> إنسان
        </h1>
        <p>
          منصة وتين تربط بين المتبرعين والمحتاجين للدم في جميع ولايات الجزائر.
          سجّل كمتبرع أو ابحث عن متبرع بفصيلة الدم التي تحتاجها.
        </p>
        <div className="hero-btns">
          <a href="#register" className="btn-primary">
            <UserPlus size={18} />
            سجّل كمتبرع
          </a>
          <a href="#search" className="btn-ghost">
            <Search size={18} />
            ابحث عن متبرع
          </a>
        </div>
      </div>
    </section>
  );
}
