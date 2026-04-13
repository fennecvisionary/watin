import { useState } from 'react';
import { WILAYAS, COMMUNES_MAP, BLOOD_TYPES, isAvailable, nextDate, getPreferredContactLabel } from '../data';
import type { Donor } from '../data';
import { 
  User, Phone, Mail, Calendar, Droplets, MapPin, 
  MapPinned, Syringe, FileText, Clock
} from 'lucide-react';
import TermsModal from './TermsModal';

export default function Register({ onRegister }: { onRegister: (donor: Donor) => Promise<void> }) {
  const [showTerms, setShowTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [hideName, setHideName] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [lastDon, setLastDon] = useState('');
  const [blood, setBlood] = useState('');
  const [wilayaIdx, setWilayaIdx] = useState('');
  const [commune, setCommune] = useState('');
  const [type, setType] = useState<'blood' | 'both'>('blood');
  const [contactTimes, setContactTimes] = useState<'morning' | 'evening' | 'night' | 'any'>('any');
  const [terms, setTerms] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [dobError, setDobError] = useState('');
  const [nameError, setNameError] = useState('');

  const communesList = wilayaIdx ? COMMUNES_MAP[parseInt(wilayaIdx)] || [] : [];
  const selectedWilaya = wilayaIdx ? WILAYAS[parseInt(wilayaIdx)] : '';
  const lastDonDate = lastDon ? new Date(lastDon) : null;
  const previewAvailable = lastDonDate ? isAvailable(lastDonDate) : false;
  const previewName = hideName ? 'فاعل خير' : name.trim();
  const previewPhone = phone.trim() || '0550 00 00 00';
  const minAdultDate = new Date();
  minAdultDate.setFullYear(minAdultDate.getFullYear() - 18);
  const maxDob = minAdultDate.toISOString().split('T')[0];

  const normalizeDigits = (value: string) =>
    value
      .replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
      .replace(/\D/g, '')
      .slice(0, 10);

  const formatPhone = (digits: string) => {
    if (!digits) return '';
    const p1 = digits.slice(0, 4);
    const p2 = digits.slice(4, 6);
    const p3 = digits.slice(6, 8);
    const p4 = digits.slice(8, 10);
    return [p1, p2, p3, p4].filter(Boolean).join(' ');
  };

  const getAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age -= 1;
    }
    return age;
  };

  const handlePhoneChange = (value: string) => {
    const digits = normalizeDigits(value);
    const formatted = formatPhone(digits);
    setPhone(formatted);

    if (!digits) {
      setPhoneError('');
      return;
    }

    if (digits[0] !== '0') {
      setPhoneError('رقم الهاتف يجب أن يبدأ بـ 0.');
      return;
    }

    if (digits.length < 10) {
      setPhoneError('رقم الهاتف يجب أن يكون 10 أرقام بصيغة 0000 00 00 00.');
      return;
    }

    setPhoneError('');
  };

  const handleDobChange = (value: string) => {
    setDob(value);
    if (!value) {
      setDobError('');
      return;
    }
    setDobError(getAge(value) < 18 ? 'العمر الأدنى للتسجيل والتبرع هو 18 سنة.' : '');
  };

  const renderPreviewField = (value: string, placeholder: string) => (
    <span className={value ? 'preview-value' : 'preview-value preview-empty'}>
      {value || placeholder}
    </span>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneDigits = normalizeDigits(phone);
    const finalName = hideName ? 'فاعل خير' : name.trim();

    if (!finalName) {
      setNameError('الاسم مطلوب أو فعّل خيار عدم التصريح بالاسم.');
      return;
    }
    setNameError('');

    if (phoneDigits.length !== 10 || phoneDigits[0] !== '0') {
      setPhoneError('رقم الهاتف يجب أن يكون 10 أرقام ويبدأ بـ 0 (0000 00 00 00).');
      return;
    }

    if (!dob || getAge(dob) < 18) {
      setDobError('العمر الأدنى للتسجيل والتبرع هو 18 سنة.');
      return;
    }

    if (!terms) {
      alert('يجب الموافقة على شروط التبرع أولاً.');
      return;
    }
    
    try {
      await onRegister({
        name: finalName,
        phone: formatPhone(phoneDigits),
        wilaya: selectedWilaya,
        commune,
        blood,
        type,
        lastDon: lastDon ? new Date(lastDon) : new Date(),
        contactTimes
      });

      setIsSubmitted(true);

      // Show toast
      const toast = document.getElementById('toast');
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
      }
    } catch (error) {
      console.error('Register donor error:', error);
      alert('حدث خطأ أثناء حفظ البيانات، يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <section id="register">
      <div className="section-inner">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag">التسجيل</div>
          <h2 className="section-title">سجل كمتبرع بالدم</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>انضم إلى آلاف المتبرعين في الجزائر وكن حاضراً عندما يحتاجك أحدهم.</p>
        </div>

        <div className="register-container">
          <aside className="preview-column" aria-label="معاينة بطاقة المتبرع">
            <div className="live-preview-wrapper">
              <div className="live-preview-tag">معاينة</div>
              <p className="live-preview-hint">هكذا ستظهر بطاقتك - أكمل البيانات لرؤية بطاقتك الكاملة</p>
              {hideName && <p className="live-anon-note">الاسم سيظهر للآخرين: فاعل خير</p>}
              <div className="live-donor-card">
                <div className="live-donor-top">
                  <div className="live-blood-badge" aria-label="زمرة الدم">
                    <Droplets size={16} />
                    <span className="live-blood-value">{blood || 'O+'}</span>
                  </div>
                  <div className={`live-status ${previewAvailable ? 'is-available' : 'is-unavailable'}`}>
                    <span className="status-dot" />
                    <span>{previewAvailable ? 'متاح للتبرع' : 'غير جاهز'}</span>
                  </div>
                </div>

                <h3 className="live-name">
                  {renderPreviewField(previewName, 'اسمك سيظهر هنا')}
                </h3>

                <p className="live-meta-row">
                  <Syringe size={14} />
                  <span>{type === 'both' ? 'نوع التبرع: دم وصفائح' : 'نوع التبرع: دم فقط'}</span>
                </p>

                <p className="live-location">
                  <MapPin size={14} />
                  {selectedWilaya ? (
                    <>
                      <span>{selectedWilaya}</span>
                      <span className="live-separator">—</span>
                      <span>{commune || 'البلدية'}</span>
                    </>
                  ) : (
                    renderPreviewField('', 'الولاية والبلدية')
                  )}
                </p>

                <div className="live-phone-row">
                  <span className="live-phone-icon">
                    <Phone size={16} />
                  </span>
                  <span className={phone ? 'live-phone-number' : 'live-phone-number preview-empty'}>
                    {previewPhone}
                  </span>
                </div>

                <div className="live-footer-note">
                  <span>آخر تبرع:</span>
                  <strong>{lastDonDate ? nextDate(lastDonDate) : 'سيظهر هنا'}</strong>
                </div>
                <div className="live-footer-note live-contact-note">
                  <span>
                    <Clock size={13} />
                    يفضل الاتصال:
                  </span>
                   <strong>{getPreferredContactLabel(contactTimes)}</strong>
                </div>
              </div>
            </div>
          </aside>

          <div className="register-wrap">
          {isSubmitted ? (
            <div className="form-success active" id="form-success">
              <div className="success-icon-wrap">
                <Droplets size={48} />
              </div>
              <h3>شكراً لك، بطل!</h3>
              <p>تم تسجيلك بنجاح كمتبرع بالدم.<br />ستظهر بياناتك للمحتاجين في ولايتك قريباً.</p>
              <button onClick={() => window.location.hash = '#search'} className="btn-secondary" style={{ marginTop: '2rem' }}>
                البحث عن متبرعين
              </button>
            </div>
          ) : (
            <form id="reg-form" onSubmit={handleSubmit}>
              <div className="reg-grid">
                {/* Terms */}
                <div className="checkbox-row full">
                  <input type="checkbox" id="terms" checked={terms} onChange={e => setTerms(e.target.checked)} required />
                  <label htmlFor="terms">
                    أقرّ بأنني قرأت <button type="button" className="terms-link" onClick={() => setShowTerms(true)}><FileText size={16} /> شروط وموانع التبرع بالدم</button> وأؤكد أنني مؤهل للتبرع، وأوافق على نشر بيانات التواصل الخاصة بي لأغراض التبرع فقط.
                  </label>
                </div>

                <div className="reg-section-title"><User size={20} /> البيانات الشخصية</div>

                <div className="form-group full">
                  <label className="form-label"><User size={16}/> الاسم الكامل <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={e => {
                      setName(e.target.value);
                      if (nameError) setNameError('');
                    }}
                    placeholder="مثال: أحمد بوعلام"
                    required={!hideName}
                    disabled={hideName}
                  />
                  {nameError && <small style={{ color: '#dc2626', fontSize: '0.78rem' }}>{nameError}</small>}
                </div>

                <div className="checkbox-row checkbox-row-subtle full">
                  <input
                    type="checkbox"
                    id="hide-name"
                    checked={hideName}
                    onChange={e => {
                      setHideName(e.target.checked);
                      if (e.target.checked) setNameError('');
                    }}
                  />
                  <label htmlFor="hide-name">لا أرغب في التصريح بالاسم (سيظهر الاسم: <strong>فاعل خير</strong>)</label>
                </div>

                <div className="form-group">
                  <label className="form-label"><Phone size={16}/> رقم الهاتف <span className="required">*</span></label>
                  <input
                    type="tel"
                    className="form-control"
                    dir="ltr"
                    style={{ textAlign: 'right' }}
                    value={phone}
                    onChange={e => handlePhoneChange(e.target.value)}
                    placeholder="0550 00 00 00"
                    inputMode="numeric"
                    pattern="0\d{3}\s\d{2}\s\d{2}\s\d{2}"
                    title="أدخل رقم هاتف بصيغة: 0550 00 00 00"
                    required
                  />
                  {phoneError && <small style={{ color: '#dc2626', fontSize: '0.78rem' }}>{phoneError}</small>}
                </div>

                <div className="form-group">
                  <label className="form-label"><Mail size={16}/> البريد الإلكتروني</label>
                  <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" />
                </div>

                <div className="form-group">
                  <label className="form-label"><Calendar size={16}/> تاريخ الميلاد <span className="required">*</span></label>
                  <input
                    type="date"
                    className="form-control"
                    value={dob}
                    onChange={e => handleDobChange(e.target.value)}
                    max={maxDob}
                    required
                  />
                  {dobError && <small style={{ color: '#dc2626', fontSize: '0.78rem' }}>{dobError}</small>}
                </div>

                <div className="form-group">
                  <label className="form-label"><Calendar size={16}/> تاريخ آخر تبرع</label>
                  <input type="date" className="form-control" value={lastDon} onChange={e => setLastDon(e.target.value)} />
                </div>

                <div className="reg-section-title"><Droplets size={20} /> بيانات التبرع</div>

                <div className="form-group">
                  <label className="form-label"><Droplets size={16}/> فصيلة الدم <span className="required">*</span></label>
                  <select className="form-control" value={blood} onChange={e => setBlood(e.target.value)} required>
                    <option value="">اختر الفصيلة</option>
                    {BLOOD_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label"><MapPin size={16}/> الولاية <span className="required">*</span></label>
                  <select className="form-control" value={wilayaIdx} onChange={e => {setWilayaIdx(e.target.value); setCommune('');}} required>
                    <option value="">اختر الولاية</option>
                    {WILAYAS.map((w, i) => <option key={i} value={i}>{w}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label"><MapPinned size={16}/> البلدية <span className="required">*</span></label>
                  <select className="form-control" value={commune} onChange={e => setCommune(e.target.value)} required disabled={!wilayaIdx}>
                    <option value="">{wilayaIdx ? 'اختر البلدية' : 'اختر الولاية أولاً'}</option>
                    {communesList.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="form-group full">
                  <label className="form-label"><Syringe size={16}/> نوع التبرع <span className="required">*</span></label>
                  <div className="radio-group">
                    <label className="radio-opt">
                      <input type="radio" name="d-type" value="blood" checked={type==='blood'} onChange={() => setType('blood')} />
                      <Droplets size={16}/> دم فقط
                    </label>
                    <label className="radio-opt">
                      <input type="radio" name="d-type" value="both" checked={type==='both'} onChange={() => setType('both')} />
                      <Droplets size={16}/> دم وصفائح
                    </label>
                  </div>
                </div>

                <div className="form-group full">
                  <label className="form-label"><Clock size={16}/> أوقات الاتصال (اختياري)</label>
                  <select className="form-control" value={contactTimes} onChange={e => setContactTimes(e.target.value as 'morning' | 'evening' | 'night' | 'any')}>
                    <option value="any">أي وقت</option>
                    <option value="morning">صباحاً</option>
                    <option value="evening">مساءً</option>
                    <option value="night">ليلاً</option>
                  </select>
                </div>

                <div className="form-group full">
                  <button type="submit" className="btn-submit">
                    <User size={20} /> سجّل الآن كمتبرع
                  </button>
                </div>
              </div>
            </form>
          )}
          </div>
        </div>
      </div>

      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </section>
  );
}