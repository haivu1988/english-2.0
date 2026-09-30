import React from 'react';

type RenderCardFn = (
  bgClass: string,
  borderClass: string,
  svgContent: React.ReactNode,
  captionText?: string,
  badgeEmoji?: string
) => React.ReactNode;

export function getCuratedDrawingPart2(
  cleanWord: string,
  cleanMeaning: string,
  renderCard: RenderCardFn,
  icon?: string
): React.ReactNode | null {
  // 25. Prioritize: Award podium with #1 gold star flag
  if (cleanWord.includes('prioritize') || cleanMeaning.includes('ưu tiên')) {
    return renderCard(
      'bg-amber-50/90',
      'border-amber-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="40" r="30" fill="#FEF3C7" />
        <rect x="25" y="62" width="34" height="28" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
        <text x="42" y="80" fill="#64748B" fontSize="13" fontWeight="bold" textAnchor="middle">2</text>
        <rect x="59" y="46" width="42" height="44" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
        <text x="80" y="70" fill="#78350F" fontSize="18" fontWeight="bold" textAnchor="middle">1</text>
        <rect x="101" y="68" width="34" height="22" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
        <text x="118" y="83" fill="#94A3B8" fontSize="12" fontWeight="bold" textAnchor="middle">3</text>
        <polygon points="80,18 84,28 94,28 86,34 89,44 80,38 71,44 74,34 66,28 76,28" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      </svg>,
      'Ưu tiên, đặt lên hàng đầu',
      '🥇⭐'
    );
  }

  // 26. Collaborate / Colleague: 4 puzzle pieces fitting together
  if (cleanWord.includes('collaborate') || cleanWord.includes('colleague') || cleanMeaning.includes('hợp tác') || cleanMeaning.includes('đồng nghiệp')) {
    return renderCard(
      'bg-indigo-50/90',
      'border-indigo-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#EEF2FF" />
        <rect x="52" y="28" width="24" height="22" rx="3" fill="#6366F1" />
        <rect x="80" y="28" width="24" height="22" rx="3" fill="#EC4899" />
        <rect x="52" y="54" width="24" height="22" rx="3" fill="#3B82F6" />
        <rect x="80" y="54" width="24" height="22" rx="3" fill="#10B981" />
        <circle cx="78" cy="38" r="4.5" fill="#6366F1" />
        <circle cx="78" cy="64" r="4.5" fill="#3B82F6" />
        <circle cx="64" cy="52" r="4.5" fill="#3B82F6" />
        <circle cx="92" cy="52" r="4.5" fill="#10B981" />
      </svg>,
      'Hợp tác chung sức cùng đồng đội',
      '🤝🧩'
    );
  }

  // 27. Negotiate: Handshake across signed agreement
  if (cleanWord.includes('negotiate') || cleanMeaning.includes('đàm phán') || cleanMeaning.includes('thương lượng')) {
    return renderCard(
      'bg-blue-50/90',
      'border-blue-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#DBEAFE" />
        <rect x="42" y="20" width="76" height="58" rx="4" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="1.5" />
        <line x1="52" y1="30" x2="88" y2="30" stroke="#93C5FD" strokeWidth="2" />
        <line x1="52" y1="38" x2="108" y2="38" stroke="#93C5FD" strokeWidth="2" />
        <g transform="translate(56, 44)">
          <path d="M0 16 L14 16 L22 8 L32 16 L48 16" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
          <path d="M14 16 L20 22 L28 16" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <circle cx="106" cy="62" r="6" fill="#10B981" />
        <polyline points="103,62 105,64 109,59" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
      </svg>,
      'Đàm phán đôi bên cùng có lợi',
      '💼🤝'
    );
  }

  // 28. Deadline: Hourglass running out of sand
  if (cleanWord.includes('deadline') || cleanMeaning.includes('hạn chót')) {
    return renderCard(
      'bg-rose-50/90',
      'border-rose-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#FFE4E6" />
        <g transform="translate(65, 18)">
          <rect x="0" y="0" width="30" height="5" rx="1.5" fill="#BE123C" />
          <rect x="0" y="52" width="30" height="5" rx="1.5" fill="#BE123C" />
          <path d="M3 5 L15 28 L3 52 L27 52 L15 28 L27 5 Z" fill="#FFFFFF" stroke="#E11D48" strokeWidth="1.5" />
          <path d="M6 10 L24 10 L15 24 Z" fill="#FBBF24" />
          <line x1="15" y1="24" x2="15" y2="40" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M6 48 Q15 40 24 48 Z" fill="#FBBF24" />
        </g>
      </svg>,
      'Hạn chót thời gian khẩn cấp',
      '⏳🚨'
    );
  }

  // 29. Meticulous / Scrutinize: Magnifying glass inspecting tiny gears
  if (cleanWord.includes('meticulous') || cleanWord.includes('scrutinize') || cleanMeaning.includes('tỉ mỉ') || cleanMeaning.includes('soi xét')) {
    return renderCard(
      'bg-indigo-50/90',
      'border-indigo-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#EEF2FF" />
        <g transform="translate(48, 22)">
          <circle cx="28" cy="28" r="18" fill="#FBBF24" stroke="#D97706" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="28" cy="28" r="8" fill="#FFFFFF" stroke="#B45309" strokeWidth="2" />
        </g>
        <circle cx="86" cy="44" r="22" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="3" opacity="0.85" />
        <line x1="102" y1="60" x2="124" y2="82" stroke="#4338CA" strokeWidth="5" strokeLinecap="round" />
        <polygon points="90,36 92,30 96,33 92,36" fill="#F59E0B" />
      </svg>,
      'Tỉ mỉ soi xét từng chi tiết nhỏ',
      '🔍💎'
    );
  }

  // 30. Implement: Wrench turning gear to start machine
  if (cleanWord.includes('implement') || cleanMeaning.includes('thực thi') || cleanMeaning.includes('triển khai')) {
    return renderCard(
      'bg-blue-50/90',
      'border-blue-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#DBEAFE" />
        <circle cx="70" cy="48" r="20" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="3" strokeDasharray="8 4" />
        <circle cx="70" cy="48" r="8" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="2" />
        <g transform="translate(68, 22) rotate(45)">
          <rect x="0" y="0" width="8" height="42" rx="2" fill="#475569" stroke="#1E293B" strokeWidth="1.5" />
          <circle cx="4" cy="4" r="6" fill="#94A3B8" stroke="#1E293B" strokeWidth="1.5" />
        </g>
        <polyline points="105,48 112,55 125,40" stroke="#10B981" strokeWidth="3" strokeLinecap="round" fill="none" />
      </svg>,
      'Bắt tay thực thi, triển khai kế hoạch',
      '⚙️🏗️'
    );
  }

  // 31. Feasibility: Balance scale weighing options
  if (cleanWord.includes('feasibility') || cleanMeaning.includes('khả thi')) {
    return renderCard(
      'bg-emerald-50/90',
      'border-emerald-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#D1FAE5" />
        <line x1="80" y1="26" x2="80" y2="78" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
        <polygon points="68,78 92,78 80,70" fill="#065F46" />
        <line x1="45" y1="36" x2="115" y2="36" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
        <path d="M45 36 L36 56 L54 56 Z" fill="#6EE7B7" stroke="#059669" strokeWidth="1.5" />
        <path d="M115 36 L106 56 L124 56 Z" fill="#6EE7B7" stroke="#059669" strokeWidth="1.5" />
        <circle cx="45" cy="52" r="3" fill="#F59E0B" />
        <circle cx="115" cy="52" r="3" fill="#F59E0B" />
      </svg>,
      'Tính khả thi, khả năng thực hiện được',
      '📋⚖️'
    );
  }

  // 32. Scalability: Blocks stacking up tall
  if (cleanWord.includes('scalability') || cleanMeaning.includes('mở rộng quy mô')) {
    return renderCard(
      'bg-indigo-50/90',
      'border-indigo-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#EEF2FF" />
        <rect x="55" y="68" width="50" height="14" rx="2" fill="#4338CA" />
        <rect x="62" y="52" width="36" height="14" rx="2" fill="#6366F1" />
        <rect x="70" y="36" width="20" height="14" rx="2" fill="#818CF8" />
        <rect x="75" y="20" width="10" height="14" rx="2" fill="#A5B4FC" stroke="#4338CA" strokeWidth="1" />
        <polyline points="120,65 125,25 115,35" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>,
      'Khả năng mở rộng quy mô linh hoạt',
      '🧱📈'
    );
  }

  // 33. Counterproductive: Rowboat paddling backwards
  if (cleanWord.includes('counterproductive') || cleanMeaning.includes('phản tác dụng')) {
    return renderCard(
      'bg-rose-50/90',
      'border-rose-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <path d="M40 60 L120 60 L108 76 L52 76 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
        <circle cx="80" cy="46" r="6" fill="#FDE047" />
        <line x1="80" y1="52" x2="80" y2="64" stroke="#1E293B" strokeWidth="2" />
        <line x1="68" y1="48" x2="52" y2="68" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M125 50 Q135 50 135 60 Q135 70 120 70 M126 65 L120 70 L126 75" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>,
      'Phản tác dụng, ngược lại kỳ vọng',
      '🚣‍♂️↩️'
    );
  }

  // 34. Ambiguous: Crossroad signpost with two blurry arrows with '?'
  if (cleanWord.includes('ambiguous') || cleanMeaning.includes('mập mờ') || cleanMeaning.includes('nước đôi')) {
    return renderCard(
      'bg-violet-50/90',
      'border-violet-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <rect x="76" y="24" width="8" height="60" rx="2" fill="#7C3AED" />
        <path d="M40 34 L76 34 L76 46 L40 46 L32 40 Z" fill="#A78BFA" stroke="#6D28D9" strokeWidth="1.5" />
        <text x="54" y="42" fill="#FFFFFF" fontSize="9" fontWeight="bold">LỐI NÀY?</text>
        <path d="M120 48 L84 48 L84 60 L120 60 L128 54 Z" fill="#C4B5FD" stroke="#6D28D9" strokeWidth="1.5" />
        <text x="104" y="56" fill="#4C1D95" fontSize="9" fontWeight="bold">LỐI ĐÓ?</text>
        <text x="80" y="18" fill="#7C3AED" fontSize="16" fontWeight="bold" textAnchor="middle">?</text>
      </svg>,
      'Mập mờ, nước đôi chưa rõ hướng',
      '🌫️❓'
    );
  }

  // 35. Empathy: Two hands sheltering glowing heart
  if (cleanWord.includes('empathy') || cleanMeaning.includes('đồng cảm') || cleanMeaning.includes('thấu cảm')) {
    return renderCard(
      'bg-rose-50/90',
      'border-rose-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#FFE4E6" />
        <path d="M80 62 C80 62 58 48 58 36 C58 28 66 24 74 28 C77 30 80 34 80 34 C80 34 83 30 86 28 C94 24 102 28 102 36 C102 48 80 62 80 62 Z" fill="#E11D48" />
        <path d="M50 24 Q80 8 110 24" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" fill="none" />
        <line x1="80" y1="16" x2="80" y2="40" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" />
        <line x1="38" y1="14" x2="36" y2="22" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
        <line x1="122" y1="14" x2="120" y2="22" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
      </svg>,
      'Thấu cảm, sẻ chia và đồng cảm',
      '❤️🧠'
    );
  }

  // 36. Serendipity: Four-leaf clover finding gold key
  if (cleanWord.includes('serendipity') || cleanMeaning.includes('may mắn bất ngờ') || cleanMeaning.includes('cơ duyên')) {
    return renderCard(
      'bg-emerald-50/90',
      'border-emerald-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#D1FAE5" />
        <circle cx="70" cy="38" r="10" fill="#10B981" />
        <circle cx="90" cy="38" r="10" fill="#10B981" />
        <circle cx="70" cy="54" r="10" fill="#10B981" />
        <circle cx="90" cy="54" r="10" fill="#10B981" />
        <path d="M80 46 Q80 76 86 82" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <g transform="translate(102, 28) rotate(-20)">
          <circle cx="6" cy="6" r="6" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
          <line x1="12" y1="6" x2="26" y2="6" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="6" x2="22" y2="12" stroke="#B45309" strokeWidth="2" />
        </g>
      </svg>,
      'May mắn bất ngờ tìm thấy điều quý',
      '🍀✨'
    );
  }

  // 37. Perseverance: Climber planting summit flag
  if (cleanWord.includes('perseverance') || cleanMeaning.includes('kiên trì') || cleanMeaning.includes('bền bỉ')) {
    return renderCard(
      'bg-amber-50/90',
      'border-amber-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <polygon points="30,86 80,30 130,86" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
        <polygon points="68,44 80,30 92,44 86,48 80,42 74,48" fill="#FFFFFF" />
        <line x1="80" y1="30" x2="80" y2="12" stroke="#1E293B" strokeWidth="2" />
        <polygon points="80,12 100,18 80,24" fill="#EF4444" />
        <circle cx="64" cy="50" r="4" fill="#F59E0B" />
        <line x1="64" y1="54" x2="68" y2="64" stroke="#1E293B" strokeWidth="2" />
      </svg>,
      'Kiên trì bền bỉ chinh phục đỉnh cao',
      '🧗‍♂️🏔️'
    );
  }

  // 38. Versatile: Multi-tool folding gadget
  if (cleanWord.includes('versatile') || cleanMeaning.includes('đa năng') || cleanMeaning.includes('linh hoạt')) {
    return renderCard(
      'bg-teal-50/90',
      'border-teal-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <rect x="52" y="44" width="56" height="18" rx="8" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
        <circle cx="62" cy="53" r="4" fill="#FFFFFF" />
        <circle cx="98" cy="53" r="4" fill="#FFFFFF" />
        <path d="M62 44 L54 20 L66 32 Z" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
        <path d="M98 44 L110 24 L102 36 Z" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
        <line x1="80" y1="44" x2="80" y2="22" stroke="#64748B" strokeWidth="2" />
      </svg>,
      'Đa năng, linh hoạt mọi tình huống',
      '🛠️🤹'
    );
  }

  // 39. Indispensable: Shiny golden key in keyhole
  if (cleanWord.includes('indispensable') || cleanMeaning.includes('không thể thiếu') || cleanMeaning.includes('thiết yếu')) {
    return renderCard(
      'bg-amber-50/90',
      'border-amber-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#FEF3C7" />
        <circle cx="60" cy="48" r="14" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
        <circle cx="60" cy="48" r="6" fill="#FEF3C7" />
        <line x1="74" y1="48" x2="114" y2="48" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
        <line x1="98" y1="48" x2="98" y2="58" stroke="#B45309" strokeWidth="3" />
        <line x1="108" y1="48" x2="108" y2="58" stroke="#B45309" strokeWidth="3" />
      </svg>,
      'Cốt lõi, không thể thiếu được',
      '🗝️⚡'
    );
  }

  // 40. Tackle: Player tackling obstacle boulder
  if (cleanWord.includes('tackle') || cleanMeaning.includes('giải quyết') || cleanMeaning.includes('xử lý')) {
    return renderCard(
      'bg-orange-50/90',
      'border-orange-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="32" fill="#FFEDD5" />
        <ellipse cx="112" cy="55" rx="24" ry="20" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
        <g transform="translate(42, 28)">
          <circle cx="28" cy="14" r="8" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
          <path d="M26 22 L38 34 L32 44 L20 32 Z" fill="#F97316" />
          <path d="M32 26 L50 28 L56 34" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>,
      'Dũng cảm lao vào giải quyết khó khăn',
      '🏈⚡'
    );
  }

  return null;
}
