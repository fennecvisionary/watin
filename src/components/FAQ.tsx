import { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  CalendarDays,
  Syringe,
  Pill,
  Utensils,
  ShieldCheck,
  Clock,
} from 'lucide-react';

const faqData = [
  {
    q: 'كم مرة يمكنني التبرع بالدم في السنة؟',
    a: 'يمكن التبرع بالدم الكامل كل 3 أشهر (4 مرات في السنة للرجال، و3 مرات للنساء). أما التبرع بالصفائح الدموية فيمكن كل أسبوعين إلى ثلاثة أسابيع.',
    icon: <CalendarDays size={18} />,
  },
  {
    q: 'هل التبرع بالدم مؤلم؟',
    a: 'الإحساس يشبه وخز بسيط عند إدخال الإبرة، ولا يستغرق التبرع الكامل عادةً أكثر من 10-15 دقيقة. معظم المتبرعين يصفون التجربة بأنها سهلة ومريحة.',
    icon: <Syringe size={18} />,
  },
  {
    q: 'هل يمكن لمريض السكر التبرع بالدم؟',
    a: 'يعتمد الأمر على نوع العلاج. مرضى السكر المعالجون بالنظام الغذائي أو الحبوب فقط قد يتبرعون إن كانت حالتهم مستقرة. أما الذين يستخدمون الأنسولين فقد لا يُقبلون. استشر الطبيب أو مركز نقل الدم في ولايتك.',
    icon: <Pill size={18} />,
  },
  {
    q: 'ماذا أفعل قبل التبرع لضمان التجربة الأفضل؟',
    a: 'تناول وجبة خفيفة صحية واشرب كميات كافية من الماء قبل التبرع. تجنب الأطعمة الدسمة. ارتدِ ملابس مريحة بأكمام قصيرة أو قابلة للطي. احصل على نوم كافٍ ليلة التبرع.',
    icon: <Utensils size={18} />,
  },
  {
    q: 'هل بياناتي محمية على منصة وتين؟',
    a: 'نعم. تُخزّن بياناتك بشكل آمن باستخدام تشفير عالي المستوى. لا يظهر للمحتاجين إلا اسمك الأول، فصيلة دمك، ورقم هاتفك. يمكنك طلب حذف بياناتك في أي وقت.',
    icon: <ShieldCheck size={18} />,
  },
  {
    q: 'كيف أعرف متى يمكنني التبرع مجدداً؟',
    a: 'عند تسجيلك، أدخل تاريخ آخر تبرع لك. المنصة تحسب تلقائياً متى تصبح مؤهلاً مجدداً (بعد 3 أشهر) وتعرض حالتك للباحثين بألوان دلالية: أخضر (متاح) وبرتقالي (غير جاهز بعد).',
    icon: <Clock size={18} />,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq">
      <div className="section-inner">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="section-tag">
            <HelpCircle size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
            الأسئلة الشائعة
          </div>
          <h2 className="section-title">كل ما تريد معرفته</h2>
        </div>
        <div className="faq-list">
          {faqData.map((item, i) => (
            <div className={`faq-item ${openIndex === i ? 'open' : ''}`} key={i}>
              <div className="faq-q" onClick={() => toggle(i)}>
                <div className="faq-q-content">
                  <span className="faq-q-icon">{item.icon}</span>
                  <span>{item.q}</span>
                </div>
                <span className="chevron">
                  <ChevronDown size={18} />
                </span>
              </div>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
