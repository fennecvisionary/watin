import { useState, useMemo } from 'react';
import { WILAYAS, BLOOD_TYPES, isAvailable, nextDate, type Donor } from '../data';
import {
  Phone,
  SearchX,
  MapPin,
  Filter,
  Droplets,
  Clock,
  CircleCheck,
  CircleDot,
} from 'lucide-react';

function DonorCard({ donor }: { donor: Donor }) {
  const avail = isAvailable(donor.lastDon);
  return (
    <div className="donor-card">
      <div className="donor-top">
        <div className="blood-badge">
          <Droplets size={14} style={{ marginBottom: 2 }} />
          {donor.blood}
        </div>
        <div className="donor-info">
          <h4>{donor.name}</h4>
          <p>
            <MapPin size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 3 }} />
            {donor.wilaya} — {donor.commune}
          </p>
        </div>
      </div>
      <div className="donor-meta">
        <span className="meta-chip">
          <CircleDot size={11} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 3 }} />
          {donor.type === 'both' ? 'دم وصفائح' : 'دم فقط'}
        </span>
        <span className={`meta-chip ${avail ? 'status-available' : 'status-unavailable'}`}>
          {avail ? (
            <>
              <CircleCheck size={11} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 3 }} />
              متاح للتبرع
            </>
          ) : (
            <>
              <Clock size={11} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 3 }} />
              متاح بعد {nextDate(donor.lastDon)}
            </>
          )}
        </span>
      </div>
      <a href={`tel:${donor.phone}`} className="call-btn">
        <Phone size={16} />
        {donor.phone}
      </a>
    </div>
  );
}

export default function Search({ donors }: { donors: Donor[] }) {
  const [wilaya, setWilaya] = useState('');
  const [blood, setBlood] = useState('');
  const [type, setType] = useState('');

  const filtered = useMemo(() => {
    return donors.filter(d => {
      if (wilaya && d.wilaya !== wilaya) return false;
      if (blood && d.blood !== blood) return false;
      if (type && d.type !== type) return false;
      return true;
    });
  }, [donors, wilaya, blood, type]);

  return (
    <section id="search">
      <div className="section-inner">
        <div className="section-tag">
          <Filter size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
          البحث
        </div>
        <h2 className="section-title">ابحث عن متبرع بالدم</h2>
        <p className="section-sub">ابحث بالولاية أو فصيلة الدم للعثور على متبرعين مستعدين لمساعدتك.</p>

        <div className="search-filters">
          <div className="filter-group">
            <MapPin size={16} className="filter-icon" />
            <select value={wilaya} onChange={e => setWilaya(e.target.value)}>
              <option value="">كل الولايات</option>
              {WILAYAS.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <Droplets size={16} className="filter-icon" />
            <select value={blood} onChange={e => setBlood(e.target.value)}>
              <option value="">كل الفصائل</option>
              {BLOOD_TYPES.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <Filter size={16} className="filter-icon" />
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="">الكل</option>
              <option value="blood">دم فقط</option>
              <option value="both">دم وصفائح</option>
            </select>
          </div>
        </div>

        <div className="results-grid">
          {filtered.length === 0 ? (
            <div className="no-results">
              <div className="big-icon">
                <SearchX size={56} strokeWidth={1.5} />
              </div>
              <p>لا يوجد متبرعون بهذه المعايير حالياً.<br />غيّر فلاتر البحث أو حاول لاحقاً.</p>
            </div>
          ) : (
            filtered.map((d, i) => <DonorCard key={i} donor={d} />)
          )}
        </div>
      </div>
    </section>
  );
}
