import { useState } from 'react';
import { WILAYAS, COMMUNES_MAP, BLOOD_TYPES, isAvailable } from '../data';
import { 
  User, Phone, Mail, Calendar, Droplets, MapPin, 
  MapPinned, Syringe, FileText, CheckCircle
} from 'lucide-react';
import TermsModal from './TermsModal';

// Format phone: 0XXX XX XX XX (Exactly 10 digits starting with 0)
function formatPhone(value: string): string {
  // Only keep digits
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (!digits.startsWith('0') && digits.length > 0) {
    return '0' + digits.slice(0, 9);
  }
  
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  if (digits.length <= 8) return `${digits.slice(0, 4)} ${digits.slice(4, 6)} ${digits.slice(6)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
}

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 && digits.startsWith('0');
}

// Check if age is at least 18
function isAtLeast18(dateString: string): boolean {
  if (!dateString) return false;
  const dob = new Date(dateString);
  const today = new Date();
  
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age >= 18;
}

// Preview Card Component — Professional
function PreviewCard({ name, blood, wilaya, commune, phone, type, lastDon }: {
  name: string;
  blood: string;
  wilaya: string;
  commune: string;
  phone: string;
  type: string;
  lastDon: string;
}) {
  const avail = lastDon ? isAvailable(new Date(lastDon)) : true;
  const displayPhone = phone || '0550 00 00 00';
  const displayName = name || 'اسمك هنا';
  const displayBlood = blood || '?';
  const displayWilaya = wilaya || 'الولاية';
  const displayCommune = commune || 'البلدية';
  const isComplete = name && blood && wilaya && phone.replace(/\D/g,'').length === 10;

  return (
    <div className="preview-card-wrapper">
      {/* Decorative header */}
      <div className="preview-header">
        <div className="preview-header-badge">
          <CheckCircle size={14} />
          <span>معاينة</span>
        </div>
        <h3 className="preview-title">هكذا ستظهر بطاقتك</h3>
        {!isComplete && (
          <p className="preview-hint">أكمل البيانات لرؤية بطاقتك الكاملة</p>
        )}
      </div>

      {/* Professional Card */}
      <div className="donor-card-pro preview-card-actual">
        {/* Top status strip */}
        <div className="donor-status-strip" style={{ background: avail ? '#22c55e' : '#f59e0b' }} />

        {/* Blood circle */}
        <div className="donor-blood-circle preview-blood-circle">
          <div className="blood-circle-ring"></div>
          <div className="blood-circle-ring blood-ring-2"></div>
          <span>{displayBlood}</span>
        </div>

        {/* Info section */}
        <div className="donor-info-section">
          <h4 className="donor-name preview-donor-name">
            {displayName}
          </h4>
          <p className="donor-location preview-location">
            <MapPin size={13} className="location-icon" />
            {displayWilaya} — {displayCommune}
          </p>
        </div>

        {/* Chips */}
        <div className="donor-chips preview-chips">
          <span className="donor-chip chip-type">
            <Droplets size={12} />
            {type === 'both' ? 'دم وصفائح دموية' : 'دم فقط'}
          </span>
          <span className={`donor-chip ${avail ? 'chip-available' : 'chip-unavailable'}`}>
            {avail ? (
              <><span className="status-dot-available"></span> متاح للتبرع</>
            ) : (
              <><span className="status-dot-unavailable"></span> غير جاهز بعد</>
            )}
          </span>
        </div>

        {/* Call button */}
        <div className="donor-actions preview-actions">
          <a className="donor-call-btn preview-call-btn" style={{ pointerEvents: 'none' }}>
            <span className="call-number">{displayPhone}</span>
            <Phone size={16} className="call-icon" />
          </a>
        </div>

        {/* Decorative corner elements */}
        <div className="preview-corner preview-corner-tl"></div>
        <div className="preview-corner preview-corner-br"></div>
      </div>
    </div>
  );
}

export default function Register({ onRegister }: { onRegister: (donor: any) => void }) {
  const [showTerms, setShowTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [dobError, setDobError] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [lastDon, setLastDon] = useState('');
  const [blood, setBlood] = useState('');
  const [wilayaIdx, setWilayaIdx] = useState('');
  const [commune, setCommune] = useState('');
  const [type, setType] = useState('blood');
  const [terms, setTerms] = useState(false);

  const communesList = wilayaIdx ? COMMUNES_MAP[parseInt(wilayaIdx)] || [] : [];
  const selectedWilaya = wilayaIdx ? WILAYAS[parseInt(wilayaIdx)] : '';

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    
    const digits = formatted.replace(/\D/g, '');
    if (digits.length > 0 && !digits.startsWith('0')) {
      setPhoneError('رقم الهاتف يجب أن يبدأ بالرقم 0');
    } else if (digits.length > 0 && digits.length < 10) {
      setPhoneError('رقم الهاتف يجب أن يتكون من 10 أرقام');
    } else {
      setPhoneError('');
    }
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDob(val);
    if (val && !isAtLeast18(val)) {
      setDobError('يجب أن يكون عمرك 18 سنة على الأقل للتسجيل والتبرع');
    } else {
      setDobError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terms) {
      alert('يجب الموافقة على شروط التبرع أولاً.');
      return;
    }
    if (!validatePhone(phone)) {
      setPhoneError('رقم الهاتف يجب أن يبدأ بـ 0 ويتكون من 10 أرقام بالضبط');
      return;
    }
    if (!dob || !isAtLeast18(dob)) {
      setDobError('يجب أن يكون عمرك 18 سنة على الأقل للتسجيل والتبرع');
      return;
    }
    
    onRegister({
      name,
      phone: phone.replace(/\s/g, ''),
      wilaya: selectedWilaya,
      commune,
      blood,
      type,
      lastDon: lastDon || new Date().toISOString().split('T')[0]
    });
    
    setIsSubmitted(true);
    
    // Show toast
    const toast = document.getElementById('toast');
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
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

        <div className="register-wrap">
          {isSubmitted ? (
            <div className="form-success-wrapper">
              <div className="form-success active" id="form-success">
                <div className="success-icon-wrap">
                  <Droplets size={48} />
                </div>
                <h3>شكراً لك، بطل!</h3>
                <p>تم تسجيلك بنجاح كمتبرع بالدم.<br />ستظهر بياناتك للمحتاجين في ولايتك قريباً.</p>
                
                {/* Show final card after success */}
                <div className="success-card-preview">
                  <PreviewCard 
                    name={name}
                    blood={blood}
                    wilaya={selectedWilaya}
                    commune={commune}
                    phone={phone}
                    type={type}
                    lastDon={lastDon}
                  />
                </div>

                <button onClick={() => window.location.hash = '#search'} className="btn-secondary" style={{ marginTop: '2rem' }}>
                  البحث عن متبرعين
                </button>
              </div>
            </div>
          ) : (
            <div className="register-layout">
              {/* Form Section */}
              <div className="register-form-section">
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
                      <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="مثال: أحمد بوعلام" required />
                    </div>

                    <div className="form-group">
                      <label className="form-label"><Phone size={16}/> رقم الهاتف <span className="required">*</span></label>
                      <input 
                        type="tel" 
                        className={`form-control ${phoneError ? 'input-error' : ''}`} 
                        dir="ltr" 
                        style={{textAlign: 'right'}} 
                        value={phone} 
                        onChange={handlePhoneChange} 
                        placeholder="0550 12 34 56" 
                        required 
                      />
                      {phoneError && <span className="field-error" style={{color: '#dc2626', fontSize: '0.85rem', display: 'block', marginTop: '4px'}}>{phoneError}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label"><Calendar size={16}/> تاريخ الميلاد <span className="required">*</span></label>
                      <input 
                        type="date" 
                        className={`form-control ${dobError ? 'input-error' : ''}`} 
                        value={dob} 
                        onChange={handleDobChange} 
                        required 
                      />
                      {dobError && <span className="field-error" style={{color: '#dc2626', fontSize: '0.85rem', display: 'block', marginTop: '4px'}}>{dobError}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label"><Mail size={16}/> البريد الإلكتروني <span className="optional">(اختياري)</span></label>
                      <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" />
                    </div>

                    <div className="form-group">
                      <label className="form-label"><Calendar size={16}/> تاريخ آخر تبرع <span className="optional">(اختياري)</span></label>
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
                          <input type="radio" name="d-type" value="blood" checked={type==='blood'} onChange={e=>setType(e.target.value)} />
                          <Droplets size={16}/> دم فقط
                        </label>
                        <label className="radio-opt">
                          <input type="radio" name="d-type" value="both" checked={type==='both'} onChange={e=>setType(e.target.value)} />
                          <Droplets size={16}/> دم وصفائح
                        </label>
                      </div>
                    </div>

                    <div className="form-group full">
                      <button type="submit" className="btn-submit">
                        <User size={20} /> سجّل الآن كمتبرع
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Preview Card Section - Hidden on mobile */}
              <div className="register-preview-section">
                <PreviewCard 
                  name={name}
                  blood={blood}
                  wilaya={selectedWilaya}
                  commune={commune}
                  phone={phone}
                  type={type}
                  lastDon={lastDon}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </section>
  );
}