import { useEffect, useRef, useState } from 'react';
import {
  Users,
  MapPin,
  Droplets,
  HeartHandshake
} from 'lucide-react';
import { type Donor } from '../data';

interface CounterProps {
  target: number;
  label: string;
  icon: React.ReactNode;
}

function Counter({ target, label, icon }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let current = 0;
          const step = Math.ceil(target / 80);
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            setCount(current);
            if (current >= target) clearInterval(timer);
          }, 20);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-icon">{icon}</div>
      <h3>{count.toLocaleString('ar-DZ')}</h3>
      <p>{label}</p>
    </div>
  );
}

interface StatsProps {
  donors?: Donor[];
}

export default function Stats({ donors = [] }: StatsProps) {
  return (
    <section id="stats" className="stats-section" style={{ paddingBottom: '3rem' }}>
      {/* 1. General Stats Counters */}
      <div className="stats-bar">
        <div className="stats-inner">
          <Counter target={donors.length > 0 ? donors.length : 3847} label="متبرع مسجل" icon={<Users size={22} />} />
          <Counter target={58} label="ولاية مغطاة" icon={<MapPin size={22} />} />
          <Counter target={12490} label="عملية تبرع" icon={<Droplets size={22} />} />
          <Counter target={8230} label="حياة أُنقذت" icon={<HeartHandshake size={22} />} />
        </div>
      </div>
    </section>
  );
}
