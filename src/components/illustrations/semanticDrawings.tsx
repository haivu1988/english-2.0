import React from 'react';

type RenderCardFn = (
  bgClass: string,
  borderClass: string,
  svgContent: React.ReactNode,
  captionText?: string,
  badgeEmoji?: string
) => React.ReactNode;

/**
 * High-quality semantic vector drawings covering all domains so NO word
 * ever looks identical or unrelated.
 */
export function getSemanticDrawing(
  cleanWord: string,
  cleanMeaning: string,
  renderCard: RenderCardFn,
  icon?: string
): React.ReactNode | null {
  // 1. Animals / Pets / Wildlife
  if (
    /animal|dog|cat|bird|fish|lion|tiger|bear|horse|rabbit|duck|monkey|pet|wild/i.test(cleanWord) ||
    /chó|mèo|chim|cá|hổ|sư tử|gấu|ngựa|thỏ|vịt|khỉ|thú cưng|động vật/i.test(cleanMeaning)
  ) {
    return renderCard(
      'bg-amber-50/90',
      'border-amber-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="32" fill="#FEF3C7" />
        {/* Cute Animal Head */}
        <circle cx="80" cy="54" r="22" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
        {/* Ears */}
        <polygon points="62,38 70,22 78,36" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
        <polygon points="98,38 90,22 82,36" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
        {/* Eyes & Nose */}
        <circle cx="72" cy="50" r="3" fill="#1E293B" />
        <circle cx="88" cy="50" r="3" fill="#1E293B" />
        <polygon points="80,56 76,60 84,60" fill="#EF4444" />
        <path d="M76 62 Q80 66 84 62" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>,
      cleanMeaning || 'Thế giới động vật sinh động',
      icon || '🐾🦁'
    );
  }

  // 2. Food, Dining, Drinks, Cooking
  if (
    /food|eat|drink|cook|meal|dish|soup|bread|coffee|tea|cafe|cake|fruit|vegetable/i.test(cleanWord) ||
    /ăn|uống|món|bữa|nấu|cà phê|trà|bánh|trái cây|rau củ|ẩm thực/i.test(cleanMeaning)
  ) {
    return renderCard(
      'bg-amber-50/90',
      'border-amber-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#FEF3C7" />
        {/* Coffee Mug */}
        <rect x="52" y="38" width="40" height="34" rx="8" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
        <path d="M92 46 Q102 52 92 60" stroke="#B45309" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Steam */}
        <path d="M64 26 Q60 18 66 12" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M72 24 Q78 16 72 10" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>,
      cleanMeaning || 'Ẩm thực & đồ uống',
      icon || '☕🥐'
    );
  }

  // 3. Tech, Computer, Code, Software
  if (
    /tech|computer|laptop|code|software|app|program|data|internet|screen|web|system/i.test(cleanWord) ||
    /công nghệ|máy tính|lập trình|mã|phần mềm|ứng dụng|dữ liệu|mạng/i.test(cleanMeaning)
  ) {
    return renderCard(
      'bg-indigo-50/90',
      'border-indigo-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <rect x="42" y="24" width="76" height="48" rx="4" fill="#1E293B" stroke="#4F46E5" strokeWidth="2" />
        <rect x="46" y="28" width="68" height="40" fill="#0F172A" />
        <text x="50" y="42" fill="#10B981" fontSize="10" fontFamily="monospace">&gt; code()</text>
        <line x1="50" y1="52" x2="80" y2="52" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="58" x2="95" y2="58" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 76 L130 76" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      </svg>,
      cleanMeaning || 'Công nghệ & phần mềm',
      icon || '💻⚡'
    );
  }

  // 4. Travel, Vehicles, Transport
  if (
    /travel|trip|car|flight|plane|train|bus|ship|boat|ticket|passport|luggage|journey/i.test(cleanWord) ||
    /du lịch|chuyến đi|xe hơi|máy bay|tàu|vé|hành lý|hành trình/i.test(cleanMeaning)
  ) {
    return renderCard(
      'bg-blue-50/90',
      'border-blue-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#DBEAFE" />
        <rect x="54" y="32" width="52" height="42" rx="6" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
        <path d="M68 32 L68 24 Q68 20 74 20 L86 20 Q92 20 92 24 L92 32" stroke="#0369A1" strokeWidth="2" fill="none" />
        <line x1="54" y1="52" x2="106" y2="52" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="64" cy="74" r="3" fill="#0F172A" />
        <circle cx="96" cy="74" r="3" fill="#0F172A" />
      </svg>,
      cleanMeaning || 'Du lịch & phương tiện',
      icon || '🧳✈️'
    );
  }

  // 5. Nature, Weather, Outdoor
  if (
    /nature|sun|rain|cloud|tree|flower|weather|storm|wind|sea|ocean|forest|mountain/i.test(cleanWord) ||
    /thiên nhiên|mặt trời|mưa|mây|cây|hoa|thời tiết|gió|biển|rừng|núi/i.test(cleanMeaning)
  ) {
    return renderCard(
      'bg-emerald-50/90',
      'border-emerald-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="114" cy="30" r="14" fill="#FBBF24" />
        <polygon points="30,82 70,36 110,82" fill="#10B981" />
        <polygon points="75,82 105,48 135,82" fill="#059669" />
        <circle cx="50" cy="65" r="8" fill="#34D399" />
        <circle cx="120" cy="68" r="6" fill="#34D399" />
      </svg>,
      cleanMeaning || 'Thiên nhiên tươi đẹp',
      icon || '🌲☀️'
    );
  }

  // 6. Study, Education, Books
  if (
    /study|learn|book|read|write|school|exam|knowledge|student|teacher/i.test(cleanWord) ||
    /học|đọc|viết|sách|trường|thi|kiến thức|học sinh|giáo viên/i.test(cleanMeaning)
  ) {
    return renderCard(
      'bg-amber-50/90',
      'border-amber-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#FEF3C7" />
        {/* Open Book */}
        <path d="M48 62 Q64 58 80 64 Q96 58 112 62 L112 78 Q96 74 80 80 Q64 74 48 78 Z" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.5" />
        {/* Glowing bulb */}
        <circle cx="80" cy="32" r="12" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
        <line x1="80" y1="16" x2="80" y2="10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <line x1="66" y1="22" x2="62" y2="18" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <line x1="94" y1="22" x2="98" y2="18" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      </svg>,
      cleanMeaning || 'Học tập & tri thức',
      icon || '📚💡'
    );
  }

  // 7. Time, Clock, Speed, Urgency
  if (
    /time|clock|hour|minute|second|speed|fast|slow|hurry|delay|schedule/i.test(cleanWord) ||
    /thời gian|giờ|phút|nhanh|chậm|vội|lịch trình/i.test(cleanMeaning)
  ) {
    return renderCard(
      'bg-purple-50/90',
      'border-purple-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="50" r="28" fill="#FAF5FF" stroke="#9333EA" strokeWidth="2.5" />
        <line x1="80" y1="50" x2="80" y2="32" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="80" y1="50" x2="96" y2="50" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        <line x1="56" y1="36" x2="44" y2="36" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" />
        <line x1="52" y1="46" x2="38" y2="46" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" />
      </svg>,
      cleanMeaning || 'Thời gian & khoảnh khắc',
      icon || '⏰⚡'
    );
  }

  // 8. Business, Money, Finance
  if (
    /business|money|cash|dollar|coin|bank|profit|cost|price|finance|salary/i.test(cleanWord) ||
    /kinh doanh|tiền|đồng xu|ngân hàng|lợi nhuận|giá|tài chính|lương/i.test(cleanMeaning)
  ) {
    return renderCard(
      'bg-emerald-50/90',
      'border-emerald-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#D1FAE5" />
        <circle cx="70" cy="52" r="16" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
        <text x="70" y="58" fill="#78350F" fontSize="16" fontWeight="bold" textAnchor="middle">$</text>
        <circle cx="94" cy="46" r="14" fill="#34D399" stroke="#047857" strokeWidth="1.5" />
        <polyline points="105,34 125,20 125,28" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>,
      cleanMeaning || 'Tài chính & kinh doanh',
      icon || '💰📈'
    );
  }

  return null;
}
