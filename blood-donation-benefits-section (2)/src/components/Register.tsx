import { useState } from 'react';
import { WILAYAS, COMMUNES_MAP, BLOOD_TYPES, type Donor } from '../data';
import {
  UserPlus,
  User,
  Phone,
  Mail,
  Calendar,
  Droplets,
  MapPin,
  Building2,
  MapPinned,
  Syringe,
  CheckCircle2,
  Eye,
  ShieldCheck,
} from 'lucide-react';

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

interface RegisterProps {
  onRegister: (donor: Donor) => void;
}

export default function Register({ onRegister }: RegisterProps) {
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [terms, setTerms] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [lastDon, setLastDon] = useState('');
  const [blood, setBlood] = useState('');
  const [wilayaIdx, setWilayaIdx] = useState('');
  const [commune, setCommune] = useState('');
  const [donationType, setDonationType] = useState('');
  const [address, setAddress] = useState('');

  const communes = wilayaIdx !== '' ? (COMMUNES_MAP[parseInt(wilayaIdx)] || ['بلدية 1', 'بلدية 2', 'بلدية 3']) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDonor: Donor = {
      name,
      blood,
      type: (donationType as 'blood' | 'both') || 'blood',
      wilaya: wilayaIdx !== '' ? WILAYAS[parseInt(wilayaIdx)] : 'الجزائر',
      commune: commune || 'مركز',
      phone,
      lastDon: lastDon ? new Date(lastDon) : daysAgo(200),
    };

    onRegister(newDonor);
    setSubmitted(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <>
      <section id="register">
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="section-tag">
              <UserPlus size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
              التسجيل
            </div>
            <h2 className="section-title">سجل كمتبرع بالدم</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              انضم إلى آلاف المتبرعين في الجزائر وكن حاضراً عندما يحتاجك أحدهم.
            </p>
          </div>

          <div className="register-wrap">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="reg-grid">
                  {/* Terms */}
                  <div className="checkbox-row full">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={terms}
                      onChange={e => setTerms(e.target.checked)}
                      required
                    />
                    <label htmlFor="terms">
                      <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                      أقرّ بأنني قرأت <strong>شروط وموانع التبرع بالدم</strong> وأؤكد أنني مؤهل للتبرع، وأوافق على نشر بيانات التواصل الخاصة بي لأغراض التبرع فقط.
                    </label>
                  </div>

                  <div className="reg-section-title">
                    <User size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                    البيانات الشخصية
                  </div>

                  <div className="form-group full">
                    <label className="form-label">
                      <User size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                      الاسم الكامل <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="مثال: أحمد بوعلام"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Phone size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                      رقم الهاتف <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="0550 00 00 00"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Mail size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="example@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Calendar size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                      تاريخ الميلاد
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={dob}
                      onChange={e => setDob(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Calendar size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                      تاريخ آخر تبرع
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={lastDon}
                      onChange={e => setLastDon(e.target.value)}
                    />
                  </div>

                  <div className="reg-section-title">
                    <Syringe size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                    بيانات التبرع
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Droplets size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                      فصيلة الدم <span className="required">*</span>
                    </label>
                    <select
                      className="form-control"
                      value={blood}
                      onChange={e => setBlood(e.target.value)}
                      required
                    >
                      <option value="">اختر الفصيلة</option>
                      {BLOOD_TYPES.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <MapPin size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                      الولاية <span className="required">*</span>
                    </label>
                    <select
                      className="form-control"
                      value={wilayaIdx}
                      onChange={e => {
                        setWilayaIdx(e.target.value);
                        setCommune('');
                      }}
                      required
                    >
                      <option value="">اختر الولاية</option>
                      {WILAYAS.map((w, i) => (
                        <option key={i} value={i}>{w}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Building2 size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                      البلدية <span className="required">*</span>
                    </label>
                    <select
                      className="form-control"
                      value={commune}
                      onChange={e => setCommune(e.target.value)}
                      required
                    >
                      <option value="">اختر البلدية أولاً</option>
                      {communes.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group full">
                    <label className="form-label">
                      <Syringe size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                      نوع التبرع <span className="required">*</span>
                    </label>
                    <div className="radio-group">
                      <label className="radio-opt">
                        <input
                          type="radio"
                          name="donation-type"
                          value="blood"
                          checked={donationType === 'blood'}
                          onChange={e => setDonationType(e.target.value)}
                          required
                        />
                        <Droplets size={14} />
                        دم فقط
                      </label>
                      <label className="radio-opt">
                        <input
                          type="radio"
                          name="donation-type"
                          value="both"
                          checked={donationType === 'both'}
                          onChange={e => setDonationType(e.target.value)}
                        />
                        <Syringe size={14} />
                        دم وصفائح دموية
                      </label>
                    </div>
                  </div>

                  <div className="form-group full">
                    <label className="form-label">
                      <MapPinned size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
                      العنوان التفصيلي
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="الحي أو الشارع (اختياري)"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="form-group full">
                    <button type="submit" className="btn-submit">
                      <UserPlus size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
                      سجّل الآن كمتبرع
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="form-success">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={56} strokeWidth={1.5} />
                </div>
                <h3>شكراً لك، بطل!</h3>
                <p>
                  تم تسجيلك بنجاح كمتبرع بالدم.<br />
                  ستظهر بياناتك للمحتاجين في ولايتك قريباً.
                </p>
                <a href="#search" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                  <Eye size={14} />
                  مشاهدة المتبرعين
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className={`toast ${showToast ? 'show' : ''}`}>
        <CheckCircle2 size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />
        تم التسجيل بنجاح!
      </div>
    </>
  );
}
