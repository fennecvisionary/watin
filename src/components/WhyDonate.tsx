import {
  Heart,
  Microscope,
  HeartPulse,
  Stethoscope,
  Scale,
  Sparkles,
  Check,
  X,
  UserCheck,
  CalendarClock,
  ShieldCheck,
  Baby,
  ShieldX,
  Pen,
} from 'lucide-react';

const whyCards = [
  {
    icon: <Heart size={28} />,
    title: 'إنقاذ الأرواح',
    desc: 'كل وحدة دم قد تُنقذ حتى 3 أرواح. مريض واحد قد يحتاج إلى عشرات الوحدات خلال علاجه.',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
  },
  {
    icon: <Microscope size={28} />,
    title: 'تجديد الخلايا',
    desc: 'جسمك يجدد خلايا الدم المفقودة خلال 24 ساعة فقط، مما يُحفز إنتاج خلايا دموية أحدث وأكثر فاعلية.',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
  },
  {
    icon: <HeartPulse size={28} />,
    title: 'صحة القلب',
    desc: 'دراسات أثبتت أن التبرع المنتظم يُقلل من خطر الإصابة بأمراض القلب والسكتة الدماغية.',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.08)',
  },
  {
    icon: <Stethoscope size={28} />,
    title: 'فحص صحي مجاني',
    desc: 'عند كل تبرع يتم فحص دمك للتأكد من سلامتك من الأمراض المُعدية، وهو فحص دوري مجاني.',
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
  },
  {
    icon: <Scale size={28} />,
    title: 'تنظيم الحديد',
    desc: 'التبرع يُساعد في تنظيم مستوى الحديد في الدم وتفادي ارتفاعه الضار.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
  },
  {
    icon: <Sparkles size={28} />,
    title: 'شعور بالرضا',
    desc: 'منح الحياة لشخص آخر يُولّد شعوراً عميقاً بالرضا والسعادة يصعب تعويضه.',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.08)',
  },
];

const conditionsOk = [
  {
    icon: <UserCheck size={16} />,
    title: 'السن بين 18 و65 سنة',
    desc: 'والوزن لا يقل عن 50 كيلوغرام',
  },
  {
    icon: <CalendarClock size={16} />,
    title: 'الفترة بين التبرعين',
    desc: '3 أشهر على الأقل بين كل تبرع وآخر',
  },
  {
    icon: <ShieldCheck size={16} />,
    title: 'صحة جيدة',
    desc: 'لا تعاني من أي مرض مزمن أو حاد وقت التبرع',
  },
];

const conditionsNo = [
  {
    icon: <Baby size={16} />,
    title: 'موانع مؤقتة',
    desc: 'الحمل — الرضاعة — الجراحة الحديثة — نزلة البرد',
  },
  {
    icon: <ShieldX size={16} />,
    title: 'موانع دائمة',
    desc: 'أمراض القلب — السكري المزمن — ارتفاع ضغط الدم غير المُعالج',
  },
  {
    icon: <Pen size={16} />,
    title: 'الوشم والثقب',
    desc: 'يُمنع التبرع لمدة 12 شهراً من تاريخ الوشم أو الثقب',
  },
];

export default function WhyDonate() {
  return (
    <section id="why">
      <div className="section-inner">
        <div className="section-tag">
          <Heart size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
          التوعية
        </div>
        <h2 className="section-title">لماذا تتبرع بدمك؟</h2>
        <p className="section-sub">التبرع بالدم لا يُنقذ الآخرين فحسب، بل يُفيدك أنت أيضاً.</p>

        <div className="why-grid">
          {whyCards.map((card, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon-wrap" style={{ background: card.bg, color: card.color }}>
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gray-800)', marginBottom: '1.25rem' }}>
            شروط وموانع التبرع
          </h3>
          <div className="conditions-grid">
            {conditionsOk.map((c, i) => (
              <div className="condition-card cond-ok" key={`ok-${i}`}>
                <span className="cond-icon">
                  <Check size={15} strokeWidth={3} />
                </span>
                <div className="cond-content">
                  <div className="cond-label-icon">{c.icon}</div>
                  <div>
                    <h4>{c.title}</h4>
                    <p>{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
            {conditionsNo.map((c, i) => (
              <div className="condition-card cond-no" key={`no-${i}`}>
                <span className="cond-icon">
                  <X size={15} strokeWidth={3} />
                </span>
                <div className="cond-content">
                  <div className="cond-label-icon">{c.icon}</div>
                  <div>
                    <h4>{c.title}</h4>
                    <p>{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
