import { useState, useMemo } from 'react';
import { WILAYAS, BLOOD_TYPES, getPreferredContactLabel, isAvailable, createDonorReport, type Donor, type ReportReason } from '../data';
import {
  Phone,
  SearchX,
  MapPin,
  Droplets,
  ChevronLeft,
  ChevronRight,
  Share2,
  Copy,
  Check,
  User,
  CircleDot,
  Calendar,
  Clock,
  CircleCheck,
  Filter,
  TriangleAlert
} from 'lucide-react';

const ITEMS_PER_PAGE = 15;

function DonorCard({ donor }: { donor: Donor }) {
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState<ReportReason>('wrong_phone');
  const [otherReason, setOtherReason] = useState('');
  const [reportSent, setReportSent] = useState(false);
  const [reportError, setReportError] = useState('');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  
  const avail = isAvailable(donor.lastDon);
  const donorName = donor.name?.trim() || 'فاعل خير';
  const cleanPhone = donor.phone.replace(/\s/g, '');
  
  const shareText = `تبرع بالدم! المتبرع ${donorName} (فصيلة ${donor.blood}) متواجد في ${donor.wilaya}، ${donor.commune}. للتواصل: ${donor.phone} | أوقات الاتصال: ${getPreferredContactLabel(donor.contactTimes)} #وتين`;
  const shareUrl = window.location.origin;

  const handleCopy = () => {
    navigator.clipboard.writeText(`الاسم: ${donorName}\nالفصيلة: ${donor.blood}\nالولاية: ${donor.wilaya}\nالبلدية: ${donor.commune}\nالهاتف: ${donor.phone}\nأوقات الاتصال: ${getPreferredContactLabel(donor.contactTimes)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReportSubmit = async () => {
    if (reportReason === 'other' && !otherReason.trim()) return;

    try {
      setIsSubmittingReport(true);
      setReportError('');

      await createDonorReport({
        donorId: donor.id,
        donorPhone: cleanPhone,
        reason: reportReason,
        otherReason,
      });

      setReportSent(true);
      setTimeout(() => {
        setReportSent(false);
        setShowReport(false);
        setReportReason('wrong_phone');
        setOtherReason('');
      }, 1400);
    } catch (error) {
      setReportError('فشل إرسال البلاغ. تحقق من إعدادات Supabase ثم حاول مرة أخرى.');
      console.error(error);
    } finally {
      setIsSubmittingReport(false);
    }
  };

  // Calculate days since last donation
  const daysSince = Math.floor((new Date().getTime() - new Date(donor.lastDon).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="donor-card-pro">
      {/* Header with Blood Badge */}
      <div className="donor-card-header">
        {/* Avatar with Blood Group - replacing initials */}
        <div className="donor-avatar" style={{ background: 'linear-gradient(135deg, var(--primary), #b91c1c)' }}>
          <span>{donor.blood}</span>
        </div>
        
        <div className="donor-header-info">
          <h4 className="donor-name">
            <User size={14} />
            {donorName}
          </h4>
          <p className="donor-location">
            <MapPin size={13} />
            {donor.wilaya} — {donor.commune}
          </p>
        </div>
        
        <div className="donor-blood-tag">
          <Droplets size={14} />
          <span>{donor.blood}</span>
        </div>
      </div>

      {/* Body with Chips */}
      <div className="donor-card-body">
        <div className="donor-chips">
          <span className="donor-chip chip-type">
            <CircleDot size={13} />
            {donor.type === 'both' ? 'دم وصفائح دموية' : 'دم فقط'}
          </span>
          <span className={`donor-chip ${avail ? 'chip-available' : 'chip-unavailable'}`}>
            {avail ? <CircleCheck size={13} /> : <Clock size={13} />}
            {avail ? 'متاح للتبرع' : `متاح بعد ${daysSince} يوم`}
          </span>
          <span className="donor-chip chip-date">
            <span className="donor-chip-content">
              <span className="donor-chip-row">
                <Calendar size={12} />
                <strong className="donor-chip-main">آخر تبرع: منذ {daysSince} يوم</strong>
              </span>
              <span className="donor-chip-row donor-chip-sub">
                <Clock size={12} />
                <span>يفضل الاتصال: {getPreferredContactLabel(donor.contactTimes)}</span>
              </span>
            </span>
          </span>
        </div>
      </div>

      {/* Footer with Actions */}
      <div className="donor-card-footer">
        <button
          className="action-icon-btn"
          onClick={handleCopy}
          title="نسخ المعلومات"
        >
          {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
        </button>

        <div className="share-wrapper" onMouseLeave={() => setShowShare(false)}>
          <button
            className="action-icon-btn"
            onClick={() => setShowShare(!showShare)}
            title="مشاركة"
          >
            <Share2 size={18} />
          </button>

          {showShare && (
            <div className="share-menu">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noreferrer"
                className="share-item fb"
              >
                فيسبوك
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noreferrer"
                className="share-item wa"
              >
                واتساب
              </a>
            </div>
          )}
        </div>

        <div className="report-wrapper" onMouseLeave={() => setShowReport(false)}>
          <button
            className="action-icon-btn"
            onClick={() => setShowReport(!showReport)}
            title="الإبلاغ عن المستخدم"
            aria-label="الإبلاغ عن المستخدم"
          >
            <TriangleAlert size={18} />
          </button>

          {showReport && (
            <div className="report-menu">
              <p className="report-title">الإبلاغ عن المستخدم</p>

              <label className="report-option">
                <input
                  type="radio"
                  name={`report-${cleanPhone}`}
                  checked={reportReason === 'wrong_phone'}
                  onChange={() => setReportReason('wrong_phone')}
                />
                <span>رقم خاطئ</span>
              </label>

              <label className="report-option">
                <input
                  type="radio"
                  name={`report-${cleanPhone}`}
                  checked={reportReason === 'not_available'}
                  onChange={() => setReportReason('not_available')}
                />
                <span>لا يريد التبرع</span>
              </label>

              <label className="report-option">
                <input
                  type="radio"
                  name={`report-${cleanPhone}`}
                  checked={reportReason === 'other'}
                  onChange={() => setReportReason('other')}
                />
                <span>سبب آخر</span>
              </label>

              {reportReason === 'other' && (
                <textarea
                  className="report-textarea"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  placeholder="اكتب السبب..."
                />
              )}

              <button
                className="report-submit-btn"
                onClick={handleReportSubmit}
                disabled={(reportReason === 'other' && !otherReason.trim()) || isSubmittingReport}
              >
                {reportSent ? 'تم الإرسال' : isSubmittingReport ? 'جارٍ الإرسال...' : 'إرسال البلاغ'}
              </button>
              {reportError && <p className="report-error-text">{reportError}</p>}
            </div>
          )}
        </div>

        <a href={`tel:${cleanPhone}`} className="donor-call-btn">
          <Phone size={16} />
          <span>{donor.phone}</span>
        </a>
      </div>
    </div>
  );
}

export default function Search({ donors }: { donors: Donor[] }) {
  const [wilaya, setWilaya] = useState('');
  const [blood, setBlood] = useState('');
  const [type, setType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return donors.filter(d => {
      if (wilaya && d.wilaya !== wilaya) return false;
      if (blood && d.blood !== blood) return false;
      if (type && d.type !== type) return false;
      return true;
    });
  }, [donors, wilaya, blood, type]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, totalPages || 1);

  const paginatedDonors = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, safeCurrentPage]);

  const availableCount = filtered.filter(d => isAvailable(d.lastDon)).length;

  function handleFilterChange(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
      setter(e.target.value);
      setCurrentPage(1);
    };
  }

  function goToPage(page: number) {
    setCurrentPage(page);
    document.getElementById('search')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function getPageNumbers(): (number | '...')[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | '...')[] = [];
    if (safeCurrentPage <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } else if (safeCurrentPage >= totalPages - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = safeCurrentPage - 1; i <= safeCurrentPage + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }

  return (
    <section id="search">
      <div className="section-inner">
        <div className="section-tag">
          <Filter size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
          البحث
        </div>
        <h2 className="section-title">ابحث عن متبرع بالدم</h2>
        <p className="section-sub">ابحث بالولاية أو فصيلة الدم للعثور على متبرعين مستعدين لمساعدتك.</p>

        {/* Filters */}
        <div className="search-filters">
          <div className="filter-group">
            <MapPin size={16} className="filter-icon" />
            <select value={wilaya} onChange={handleFilterChange(setWilaya)}>
              <option value="">كل الولايات</option>
              {WILAYAS.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <Droplets size={16} className="filter-icon" />
            <select value={blood} onChange={handleFilterChange(setBlood)}>
              <option value="">كل الفصائل</option>
              {BLOOD_TYPES.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <Filter size={16} className="filter-icon" />
            <select value={type} onChange={handleFilterChange(setType)}>
              <option value="">الكل</option>
              <option value="blood">دم فقط</option>
              <option value="both">دم وصفائح</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        {filtered.length > 0 && (
          <div className="results-summary">
            <div className="summary-item">
              <strong>{filtered.length}</strong> متبرع
            </div>
            <div className="summary-item summary-available">
              <strong>{availableCount}</strong> متاح حالياً
            </div>
            {totalPages > 1 && (
              <div className="summary-item summary-page">
              صفحة <strong>{safeCurrentPage}</strong> من <strong>{totalPages}</strong>
              </div>
            )}
          </div>
        )}

        {/* Results Grid */}
        <div className="results-grid-pro">
          {paginatedDonors.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">
                <SearchX size={56} strokeWidth={1.5} />
              </div>
              <h3>لا يوجد متبرعون</h3>
              <p>لا يوجد متبرعون بهذه المعايير حالياً.<br />غيّر فلاتر البحث أو حاول لاحقاً.</p>
            </div>
          ) : (
            paginatedDonors.map((d, i) => <DonorCard key={`${safeCurrentPage}-${i}`} donor={d} />)
          )}
        </div>

        {/* Pagination with Numbers and Arrows */}
        {totalPages > 1 && (
          <div className="pagination-wrapper">
            <div className="pagination">
              <button
                className="page-btn page-nav"
                onClick={() => goToPage(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                title="الصفحة السابقة"
              >
                <ChevronRight size={18} />
                <span>السابق</span>
              </button>

              <div className="page-numbers">
                {getPageNumbers().map((page, idx) =>
                  page === '...' ? (
                    <span key={`dots-${idx}`} className="page-dots">...</span>
                  ) : (
                    <button
                      key={page}
                      className={`page-btn page-num ${safeCurrentPage === page ? 'page-active' : ''}`}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                className="page-btn page-nav"
                onClick={() => goToPage(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                title="الصفحة التالية"
              >
                <span>التالي</span>
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
