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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Users,
  Heart,
  Calendar,
  Share2,
  Copy,
  Check
} from 'lucide-react';

const ITEMS_PER_PAGE = 15;

function DonorCard({ donor }: { donor: Donor }) {
  const avail = isAvailable(donor.lastDon);
  const daysSince = Math.floor((new Date().getTime() - new Date(donor.lastDon).getTime()) / (1000 * 60 * 60 * 24));
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const shareText = `تبرع بالدم! المتبرع ${donor.name} (فصيلة ${donor.blood}) متواجد في ${donor.wilaya}، ${donor.commune}. للتواصل: ${donor.phone} #وتين`;
  const shareUrl = window.location.origin;

  const handleCopy = () => {
    navigator.clipboard.writeText(`الاسم: ${donor.name}\nالفصيلة: ${donor.blood}\nالولاية: ${donor.wilaya}\nالهاتف: ${donor.phone}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`donor-card-pro ${avail ? 'donor-available' : 'donor-unavailable'}`}>
      {/* Status indicator strip — لون الزمرة الأحمر */}
      <div className="donor-status-strip" style={{ background: avail ? '#22c55e' : '#f59e0b' }} />

      {/* Card header */}
      <div className="donor-card-header">
        <div className="donor-avatar">
          <span>{donor.blood}</span>
        </div>
        <div className="donor-header-info">
          <h4 className="donor-name">
            {donor.name}
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

      {/* Card body — info chips */}
      <div className="donor-card-body">
        <div className="donor-chips">
          <span className="donor-chip chip-type">
            <CircleDot size={13} />
            {donor.type === 'both' ? 'دم وصفائح دموية' : 'دم فقط'}
          </span>
          <span className={`donor-chip ${avail ? 'chip-available' : 'chip-unavailable'}`}>
            {avail ? <CircleCheck size={13} /> : <Clock size={13} />}
            {avail ? 'متاح للتبرع' : `متاح بعد ${nextDate(donor.lastDon)}`}
          </span>
          <span className="donor-chip chip-date">
            <Calendar size={13} />
            آخر تبرع: منذ {daysSince} يوم
          </span>
        </div>
      </div>

      {/* Card footer — call button */}
      {/* Card footer — call button + actions perfectly inline */}
      <div className="donor-card-footer-inline">
        <button className={`action-btn-inline copy-btn-inline ${copied ? 'copied' : ''}`} onClick={handleCopy}>
          {copied ? <Check size={15} /> : <Copy size={15} />}
          <span>نسخ</span>
        </button>

        <div className="share-wrapper-inline">
          <button className="action-btn-inline share-btn-inline" onClick={() => setShowShare(!showShare)}>
            <Share2 size={15} />
            <span>نشر</span>
          </button>
          {showShare && (
            <div className="share-popup-inline">
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="share-item wa-item">
                واتساب
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="share-item fb-item">
                فيسبوك
              </a>
            </div>
          )}
        </div>

        <a href={`tel:${donor.phone}`} className="call-btn-inline">
          <span>{donor.phone}</span>
          <Phone size={17} />
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
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
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

        {/* Results summary */}
        {filtered.length > 0 && (
          <div className="results-summary">
            <div className="summary-item">
              <Users size={16} />
              <span><strong>{filtered.length}</strong> متبرع</span>
            </div>
            <div className="summary-item summary-available">
              <Heart size={16} />
              <span><strong>{availableCount}</strong> متاح حالياً</span>
            </div>
            {totalPages > 1 && (
              <div className="summary-item summary-page">
                <span>صفحة <strong>{safeCurrentPage}</strong> من <strong>{totalPages}</strong></span>
              </div>
            )}
          </div>
        )}

        {/* Results grid */}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-wrapper">
            <div className="pagination">
              <button
                className="page-btn page-nav"
                onClick={() => goToPage(1)}
                disabled={safeCurrentPage === 1}
                title="الصفحة الأولى"
              >
                <ChevronsRight size={18} />
              </button>
              <button
                className="page-btn page-nav"
                onClick={() => goToPage(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                title="الصفحة السابقة"
              >
                <ChevronRight size={18} />
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
                <ChevronLeft size={18} />
              </button>
              <button
                className="page-btn page-nav"
                onClick={() => goToPage(totalPages)}
                disabled={safeCurrentPage === totalPages}
                title="الصفحة الأخيرة"
              >
                <ChevronsLeft size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
