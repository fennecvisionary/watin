import { useEffect } from 'react';
import {
  X,
  ShieldCheck,
  ShieldX,
  UserCheck,
  CalendarClock,
  HeartPulse,
  Weight,
  Clock,
  Baby,
  Syringe,
  Pen,
  Pill,
  Thermometer,
  AlertTriangle,
  Droplets,
  CheckCircle2,
  XCircle,
  Info,
  ArrowLeft,
} from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-content">
            <div className="modal-icon-wrap">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="modal-title">شروط وموانع التبرع بالدم</h2>
              <p className="modal-subtitle">تأكد من استيفائك لجميع الشروط قبل التسجيل</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="إغلاق">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* شروط التبرع */}
          <div className="modal-section">
            <div className="modal-section-header ok">
              <CheckCircle2 size={20} />
              <h3>شروط التبرع بالدم</h3>
            </div>
            <div className="modal-items-list">
              <div className="modal-item ok">
                <div className="modal-item-icon ok">
                  <UserCheck size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>السن المناسب</h4>
                  <p>يجب أن يكون عمرك بين <strong>18 و65 سنة</strong></p>
                </div>
              </div>

              <div className="modal-item ok">
                <div className="modal-item-icon ok">
                  <Weight size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>الوزن المناسب</h4>
                  <p>يجب ألا يقل وزنك عن <strong>50 كيلوغرام</strong></p>
                </div>
              </div>

              <div className="modal-item ok">
                <div className="modal-item-icon ok">
                  <CalendarClock size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>الفترة بين التبرعين</h4>
                  <p><strong>3 أشهر</strong> على الأقل بين كل تبرع وآخر</p>
                </div>
              </div>

              <div className="modal-item ok">
                <div className="modal-item-icon ok">
                  <HeartPulse size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>صحة جيدة</h4>
                  <p>لا تعاني من أي مرض مزمن أو حاد وقت التبرع</p>
                </div>
              </div>

              <div className="modal-item ok">
                <div className="modal-item-icon ok">
                  <Droplets size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>نسبة الهيموغلوبين</h4>
                  <p>يجب أن تكون نسبة الهيموغلوبين <strong>12.5 غ/دل</strong> على الأقل</p>
                </div>
              </div>

              <div className="modal-item ok">
                <div className="modal-item-icon ok">
                  <Thermometer size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>ضغط الدم طبيعي</h4>
                  <p>ضغط الدم الانقباضي بين <strong>100-180</strong> والانبساطي بين <strong>60-100</strong></p>
                </div>
              </div>
            </div>
          </div>

          {/* موانع مؤقتة */}
          <div className="modal-section">
            <div className="modal-section-header warn">
              <AlertTriangle size={20} />
              <h3>موانع مؤقتة</h3>
            </div>
            <div className="modal-items-list">
              <div className="modal-item warn">
                <div className="modal-item-icon warn">
                  <Baby size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>الحمل والرضاعة</h4>
                  <p>يُمنع التبرع أثناء الحمل وحتى <strong>6 أشهر بعد الولادة</strong> أو انتهاء الرضاعة</p>
                </div>
              </div>

              <div className="modal-item warn">
                <div className="modal-item-icon warn">
                  <Syringe size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>الجراحة الحديثة</h4>
                  <p>يجب الانتظار <strong>6 أشهر</strong> بعد أي عملية جراحية كبرى</p>
                </div>
              </div>

              <div className="modal-item warn">
                <div className="modal-item-icon warn">
                  <Pill size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>تناول الأدوية</h4>
                  <p>بعض الأدوية كالمضادات الحيوية تستوجب الانتظار <strong>أسبوعين</strong> بعد إيقافها</p>
                </div>
              </div>

              <div className="modal-item warn">
                <div className="modal-item-icon warn">
                  <Thermometer size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>الحمى ونزلات البرد</h4>
                  <p>يجب الانتظار حتى الشفاء التام ومرور <strong>أسبوع</strong> على الأقل</p>
                </div>
              </div>

              <div className="modal-item warn">
                <div className="modal-item-icon warn">
                  <Pen size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>الوشم والثقب</h4>
                  <p>يُمنع التبرع لمدة <strong>12 شهراً</strong> من تاريخ الوشم أو الثقب</p>
                </div>
              </div>

              <div className="modal-item warn">
                <div className="modal-item-icon warn">
                  <Clock size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>علاج الأسنان</h4>
                  <p>يجب الانتظار <strong>72 ساعة</strong> بعد خلع أو علاج الأسنان</p>
                </div>
              </div>
            </div>
          </div>

          {/* موانع دائمة */}
          <div className="modal-section">
            <div className="modal-section-header no">
              <ShieldX size={20} />
              <h3>موانع دائمة</h3>
            </div>
            <div className="modal-items-list">
              <div className="modal-item no">
                <div className="modal-item-icon no">
                  <HeartPulse size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>أمراض القلب والأوعية الدموية</h4>
                  <p>أمراض القلب الخلقية أو المكتسبة، قصور القلب، جراحة القلب</p>
                </div>
              </div>

              <div className="modal-item no">
                <div className="modal-item-icon no">
                  <Droplets size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>أمراض الدم المزمنة</h4>
                  <p>فقر الدم المنجلي، الثلاسيميا، أمراض النزيف الوراثية</p>
                </div>
              </div>

              <div className="modal-item no">
                <div className="modal-item-icon no">
                  <XCircle size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>الأمراض المعدية</h4>
                  <p>التهاب الكبد B وC، فيروس نقص المناعة (HIV)، الزهري</p>
                </div>
              </div>

              <div className="modal-item no">
                <div className="modal-item-icon no">
                  <Pill size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>السكري المعالج بالأنسولين</h4>
                  <p>مرضى السكري من النوع الأول أو الذين يعتمدون على حقن الأنسولين</p>
                </div>
              </div>

              <div className="modal-item no">
                <div className="modal-item-icon no">
                  <AlertTriangle size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>الصرع والأمراض العصبية</h4>
                  <p>الصرع المزمن والأمراض العصبية التنكسية</p>
                </div>
              </div>

              <div className="modal-item no">
                <div className="modal-item-icon no">
                  <ShieldX size={18} />
                </div>
                <div className="modal-item-content">
                  <h4>أمراض المناعة الذاتية</h4>
                  <p>الذئبة الحمراء، التصلب اللويحي، وأمراض المناعة الأخرى</p>
                </div>
              </div>
            </div>
          </div>

          {/* تنبيه */}
          <div className="modal-notice">
            <Info size={18} />
            <p>
              هذه الشروط إرشادية عامة. القرار النهائي يعود للطبيب المختص في مركز نقل الدم الذي سيقوم بفحصك قبل التبرع.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="modal-btn-close" onClick={onClose}>
            <ArrowLeft size={16} />
            فهمت، العودة للتسجيل
          </button>
        </div>
      </div>
    </div>
  );
}
