import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Users, MapPin, Droplets, HeartHandshake, BarChart3, X, Activity, Trophy } from 'lucide-react';
import { isAvailable, type Donor } from '../data';

interface CounterProps {
  target: number;
  label: string;
  icon: ReactNode;
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
  donors: Donor[];
}

const BLOOD_TYPES = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

export default function Stats({ donors }: StatsProps) {
  const coveredWilayas = useMemo(() => new Set(donors.map(d => d.wilaya)).size, [donors]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bloodCounts = useMemo(() => {
    return BLOOD_TYPES.map((blood) => ({
      blood,
      count: donors.filter((d) => d.blood === blood).length,
    }));
  }, [donors]);

  const topWilayas = useMemo(() => {
    const map = new Map<string, number>();
    donors.forEach((d) => {
      map.set(d.wilaya, (map.get(d.wilaya) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([wilaya, count]) => ({ wilaya, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [donors]);

  const availableNow = useMemo(() => donors.filter((d) => isAvailable(d.lastDon)).length, [donors]);

  const topBlood = useMemo(() => {
    return [...bloodCounts].sort((a, b) => b.count - a.count)[0];
  }, [bloodCounts]);

  const bloodMax = Math.max(...bloodCounts.map((row) => row.count), 1);
  const wilayaMax = Math.max(...topWilayas.map((row) => row.count), 1);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === '#stats') {
        setIsModalOpen(true);
      }
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <section className="stats-bar" id="stats">
      <div className="stats-inner">
        <Counter target={donors.length} label="متبرع مسجل" icon={<Users size={22} />} />
        <Counter target={coveredWilayas} label="ولاية مغطاة" icon={<MapPin size={22} />} />
        <Counter target={12490} label="عملية تبرع" icon={<Droplets size={22} />} />
        <Counter target={8230} label="حياة أُنقذت" icon={<HeartHandshake size={22} />} />
      </div>

      <div className="stats-actions">
        <button type="button" className="stats-open-btn" onClick={() => setIsModalOpen(true)}>
          <BarChart3 size={18} />
          عرض الإحصائيات التفصيلية
        </button>
      </div>

      {isModalOpen && (
        <div className="stats-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="stats-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="stats-modal-close"
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="إغلاق"
            >
              <X size={18} />
            </button>

            <h3 className="stats-modal-title">الإحصائيات التفصيلية</h3>

            <div className="stats-kpis">
              <div className="stats-kpi-item">
                <span className="stats-kpi-icon"><Users size={16} /></span>
                <div>
                  <p className="stats-kpi-label">إجمالي المتبرعين</p>
                  <strong>{donors.length.toLocaleString('ar-DZ')}</strong>
                </div>
              </div>
              <div className="stats-kpi-item">
                <span className="stats-kpi-icon"><Activity size={16} /></span>
                <div>
                  <p className="stats-kpi-label">متاحون الآن</p>
                  <strong>{availableNow.toLocaleString('ar-DZ')}</strong>
                </div>
              </div>
              <div className="stats-kpi-item">
                <span className="stats-kpi-icon"><MapPin size={16} /></span>
                <div>
                  <p className="stats-kpi-label">ولايات مغطاة</p>
                  <strong>{coveredWilayas.toLocaleString('ar-DZ')}</strong>
                </div>
              </div>
              <div className="stats-kpi-item">
                <span className="stats-kpi-icon"><Trophy size={16} /></span>
                <div>
                  <p className="stats-kpi-label">أعلى زمرة</p>
                  <strong>{topBlood ? `${topBlood.blood} (${topBlood.count.toLocaleString('ar-DZ')})` : '-'}</strong>
                </div>
              </div>
            </div>

            <div className="stats-modal-grid">
              <div className="stats-modal-block">
                <h4>توزيع المتبرعين حسب الزمرة</h4>
                <div className="stats-table-wrap">
                  <table className="stats-table">
                    <thead>
                      <tr>
                        <th>الزمرة</th>
                        <th>عدد المتبرعين</th>
                        <th>النسبة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bloodCounts.map((row) => (
                        <tr key={row.blood}>
                          <td>{row.blood}</td>
                          <td>{row.count.toLocaleString('ar-DZ')}</td>
                          <td className="stats-progress-cell">
                            <div className="stats-progress-track">
                              <span
                                className="stats-progress-fill"
                                style={{ width: `${Math.max(6, (row.count / bloodMax) * 100)}%` }}
                              />
                            </div>
                            <span className="stats-progress-value">{Math.round((row.count / Math.max(donors.length, 1)) * 100)}%</span>
                          </td>
                        </tr>
                      ))}
                      <tr className="stats-total-row">
                        <td>الإجمالي</td>
                        <td>{donors.length.toLocaleString('ar-DZ')}</td>
                        <td>100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="stats-modal-block">
                <h4>أكثر 10 ولايات تبرعا</h4>
                <div className="stats-table-wrap">
                  <table className="stats-table">
                    <thead>
                      <tr>
                        <th>الترتيب</th>
                        <th>الولاية</th>
                        <th>عدد المتبرعين</th>
                        <th>المساهمة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topWilayas.map((row, index) => (
                        <tr key={row.wilaya}>
                          <td><span className="rank-badge">{index + 1}</span></td>
                          <td>{row.wilaya}</td>
                          <td>{row.count.toLocaleString('ar-DZ')}</td>
                          <td className="stats-progress-cell">
                            <div className="stats-progress-track">
                              <span
                                className="stats-progress-fill"
                                style={{ width: `${Math.max(6, (row.count / wilayaMax) * 100)}%` }}
                              />
                            </div>
                            <span className="stats-progress-value">{Math.round((row.count / Math.max(donors.length, 1)) * 100)}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
