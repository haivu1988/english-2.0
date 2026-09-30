import React from 'react';

type RenderCardFn = (
  bgClass: string,
  borderClass: string,
  svgContent: React.ReactNode,
  captionText?: string,
  badgeEmoji?: string
) => React.ReactNode;

/**
 * Curated simple vector drawings explicitly depicting the exact vocabulary words.
 */
export function getCuratedDrawing(
  cleanWord: string,
  cleanMeaning: string,
  renderCard: RenderCardFn,
  icon?: string
): React.ReactNode | null {
  // 1. Procrastinate: hammock, snooze, ringing alarm clock
  if (cleanWord.includes('procrastinate') || cleanMeaning.includes('trì hoãn') || cleanMeaning.includes('chần chừ')) {
    return renderCard(
      'bg-amber-50/90',
      'border-amber-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="45" r="32" fill="#FEF3C7" />
        <path d="M15 30 Q80 75 145 30" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
        <path d="M25 38 Q80 82 135 38" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
        <circle cx="65" cy="50" r="9" fill="#FBBF24" />
        <path d="M62 50 Q65 53 68 50" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M72 54 Q90 52 100 58 Q88 65 72 57 Z" fill="#60A5FA" />
        <text x="82" y="36" fill="#F59E0B" fontSize="11" fontWeight="bold">z</text>
        <text x="92" y="28" fill="#D97706" fontSize="14" fontWeight="bold">Z</text>
        <g transform="translate(118, 52)">
          <circle cx="10" cy="14" r="9" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
          <circle cx="10" cy="14" r="6.5" fill="#FFFFFF" />
          <line x1="10" y1="14" x2="10" y2="9" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="10" y1="14" x2="13" y2="14" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <rect x="22" y="65" width="16" height="10" rx="1.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
      </svg>,
      'Trì hoãn, chần chừ việc cần làm',
      '🛋️⏰'
    );
  }

  // 2. Resilient / Resilience: Green sprout bursting through granite stone
  if (cleanWord.includes('resilient') || cleanWord.includes('resilience') || cleanMeaning.includes('kiên cường') || cleanMeaning.includes('hồi phục')) {
    return renderCard(
      'bg-emerald-50/90',
      'border-emerald-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="30" r="24" fill="#D1FAE5" />
        <path d="M25 90 L48 68 L80 72 L112 66 L135 90 Z" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
        <path d="M78 72 L80 80 L76 85 L82 90" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <path d="M80 74 Q78 45 80 32" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
        <path d="M79 48 Q62 44 66 35 Q77 38 79 47" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
        <path d="M80 40 Q96 34 94 25 Q83 29 80 38" fill="#34D399" stroke="#047857" strokeWidth="1.5" />
        <circle cx="80" cy="30" r="4" fill="#FBBF24" />
      </svg>,
      'Kiên cường, mau hồi phục sau khó khăn',
      '🌱⚡'
    );
  }

  // 3. Hit the sack / Sleep: Cozy bed with moon & stars
  if (cleanWord.includes('sack') || cleanWord.includes('sleep') || cleanMeaning.includes('ngủ') || cleanMeaning.includes('ngả lưng')) {
    return renderCard(
      'bg-indigo-50/90',
      'border-indigo-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <rect x="18" y="12" width="30" height="36" rx="4" fill="#1E1B4B" stroke="#4338CA" strokeWidth="1.5" />
        <path d="M35 18 A 8 8 0 0 0 30 30 A 10 10 0 0 1 35 18" fill="#FDE047" />
        <rect x="45" y="44" width="95" height="42" rx="6" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2" />
        <rect x="52" y="48" width="26" height="16" rx="4" fill="#FFFFFF" stroke="#A5B4FC" strokeWidth="1.5" />
        <circle cx="65" cy="56" r="6" fill="#FCD34D" />
        <path d="M70 54 L138 54 Q140 54 140 58 L140 84 Q140 86 138 86 L70 86 Q66 86 66 82 L66 58 Q66 54 70 54 Z" fill="#818CF8" stroke="#4F46E5" strokeWidth="1.5" />
        <text x="76" y="44" fill="#818CF8" fontSize="11" fontWeight="bold">z</text>
        <text x="86" y="34" fill="#6366F1" fontSize="14" fontWeight="bold">Z</text>
      </svg>,
      'Ngả lưng đi ngủ sau ngày mệt mỏi',
      '🛏️🌙'
    );
  }

  // 4. On the fence: Sitting on fence posts looking both ways
  if (cleanWord.includes('fence') || cleanMeaning.includes('phân vân') || cleanMeaning.includes('lưỡng lự')) {
    return renderCard(
      'bg-blue-50/90',
      'border-blue-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <rect x="35" y="45" width="8" height="45" rx="2" fill="#D97706" />
        <rect x="76" y="40" width="10" height="50" rx="2" fill="#B45309" />
        <rect x="115" y="45" width="8" height="45" rx="2" fill="#D97706" />
        <rect x="25" y="55" width="110" height="8" rx="1.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
        <rect x="25" y="72" width="110" height="8" rx="1.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
        <circle cx="81" cy="30" r="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
        <circle cx="78" cy="29" r="1.5" fill="#1E293B" />
        <circle cx="84" cy="29" r="1.5" fill="#1E293B" />
        <path d="M78 34 Q81 32 84 34" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M50 30 L40 30 M44 26 L40 30 L44 34" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
        <path d="M110 30 L120 30 M116 26 L120 30 L116 34" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
        <text x="77" y="18" fill="#2563EB" fontSize="14" fontWeight="bold">?</text>
      </svg>,
      'Phân vân, chưa quyết định dứt khoát',
      '⚖️🚧'
    );
  }

  // 5. Overwhelmed / Overwhelm: Huge wave of papers over desk
  if (cleanWord.includes('overwhelm') || cleanMeaning.includes('quá tải') || cleanMeaning.includes('ngợp') || cleanMeaning.includes('choáng ngợp')) {
    return renderCard(
      'bg-purple-50/90',
      'border-purple-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <path d="M20 80 Q30 20 75 16 Q110 14 135 35 Q125 25 95 25 Q50 28 45 80 Z" fill="#C084FC" opacity="0.35" />
        <path d="M25 80 Q38 35 78 30 Q105 28 125 48 Q115 40 90 38 Q55 42 50 80 Z" fill="#A855F7" opacity="0.45" />
        <rect x="40" y="70" width="80" height="5" rx="2" fill="#7E22CE" />
        <rect x="45" y="52" width="14" height="18" rx="1.5" fill="#FFFFFF" stroke="#C084FC" strokeWidth="1.5" />
        <rect x="100" y="48" width="14" height="22" rx="1.5" fill="#FFFFFF" stroke="#C084FC" strokeWidth="1.5" />
        <circle cx="80" cy="62" r="7" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
        <circle cx="77" cy="61" r="1.5" fill="#6B21A8" />
        <circle cx="83" cy="61" r="1.5" fill="#6B21A8" />
        <path d="M91 56 Q93 53 91 50 Q89 53 91 56" fill="#38BDF8" />
      </svg>,
      'Bị choáng ngợp, quá tải công việc',
      '🌊📚'
    );
  }

  // 6. Spontaneous: Car adventure road trip towards sunset
  if (cleanWord.includes('spontaneous') || cleanMeaning.includes('ngẫu hứng') || cleanMeaning.includes('tự phát')) {
    return renderCard(
      'bg-rose-50/90',
      'border-rose-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="50" r="28" fill="#FFE4E6" />
        <path d="M68 68 L15 95 L145 95 L92 68 Z" fill="#94A3B8" />
        <line x1="80" y1="70" x2="80" y2="95" stroke="#FDE047" strokeWidth="2" strokeDasharray="4 3" />
        <g transform="translate(58, 46)">
          <rect x="12" y="3" width="18" height="8" rx="2" fill="#F97316" stroke="#C2410C" strokeWidth="1" />
          <path d="M6 10 L34 10 L40 18 L40 28 L2 28 L2 18 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.5" />
          <circle cx="10" cy="28" r="4.5" fill="#1E293B" />
          <circle cx="32" cy="28" r="4.5" fill="#1E293B" />
        </g>
      </svg>,
      'Ngẫu hứng, thích là làm ngay',
      '🎒🚗'
    );
  }

  // 7. Convenient: 24/7 convenience store with glowing sign and fast entrance
  if (cleanWord.includes('convenient') || cleanMeaning.includes('tiện lợi') || cleanMeaning.includes('thuận tiện')) {
    return renderCard(
      'bg-indigo-50/90',
      'border-indigo-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="32" fill="#EEF2FF" />
        {/* Store building */}
        <rect x="42" y="28" width="76" height="52" rx="4" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="2" />
        {/* Awning stripes */}
        <path d="M40 28 L120 28 L116 38 L44 38 Z" fill="#6366F1" />
        <line x1="60" y1="28" x2="58" y2="38" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="80" y1="28" x2="80" y2="38" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="100" y1="28" x2="102" y2="38" stroke="#FFFFFF" strokeWidth="2" />
        {/* 24/7 badge */}
        <rect x="62" y="16" width="36" height="12" rx="3" fill="#10B981" />
        <text x="80" y="25" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">24/7 OPEN</text>
        {/* Glass doors */}
        <rect x="68" y="44" width="24" height="36" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1.5" />
        <line x1="80" y1="44" x2="80" y2="80" stroke="#4F46E5" strokeWidth="1.5" />
        {/* Lightning speed badge */}
        <polygon points="124,36 116,50 122,50 118,64 130,48 123,48" fill="#F59E0B" />
      </svg>,
      'Tiện lợi, thuận tiện mọi lúc mọi nơi',
      '🏪⚡'
    );
  }

  // 8. Appreciate: Warm hands over heart with gratitude smile
  if (cleanWord.includes('appreciate') || cleanMeaning.includes('cảm kích') || cleanMeaning.includes('trân trọng')) {
    return renderCard(
      'bg-rose-50/90',
      'border-rose-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="46" r="30" fill="#FFE4E6" />
        {/* Big radiant heart */}
        <path d="M80 68 C80 68 52 50 52 34 C52 24 62 18 72 24 C76 27 80 32 80 32 C80 32 84 27 88 24 C98 18 108 24 108 34 C108 50 80 68 80 68 Z" fill="#F43F5E" />
        {/* Hands gently holding heart */}
        <path d="M48 64 Q64 56 74 62" stroke="#FDA4AF" strokeWidth="3" strokeLinecap="round" />
        <path d="M112 64 Q96 56 86 62" stroke="#FDA4AF" strokeWidth="3" strokeLinecap="round" />
        {/* Sparkles */}
        <circle cx="80" cy="42" r="3" fill="#FFFFFF" />
        <path d="M60 22 L62 18 L65 20 L62 22 Z" fill="#F59E0B" />
        <path d="M102 24 L104 20 L107 22 L104 24 Z" fill="#F59E0B" />
      </svg>,
      'Cảm kích, trân trọng từ đáy lòng',
      '🙏💖'
    );
  }

  // 9. Delicious: Steaming gourmet pho / food bowl
  if (cleanWord.includes('delicious') || cleanMeaning.includes('thơm ngon') || cleanMeaning.includes('ngon miệng')) {
    return renderCard(
      'bg-amber-50/90',
      'border-amber-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#FEF3C7" />
        {/* Steaming Bowl */}
        <path d="M46 48 L114 48 C114 74 98 84 80 84 C62 84 46 74 46 48 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
        <ellipse cx="80" cy="48" rx="34" ry="8" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
        {/* Steam waves */}
        <path d="M68 38 Q64 26 70 18" stroke="#D97706" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M80 36 Q84 24 78 16" stroke="#D97706" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M92 38 Q88 26 94 18" stroke="#D97706" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Chopsticks / garnish */}
        <line x1="56" y1="42" x2="108" y2="34" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="82" cy="48" r="3" fill="#10B981" />
      </svg>,
      'Thơm ngon nức mũi, ngon miệng',
      '🍲😋'
    );
  }

  // 10. Recommend: Chef / character giving big thumbs up
  if (cleanWord.includes('recommend') || cleanMeaning.includes('gợi ý') || cleanMeaning.includes('giới thiệu') || cleanMeaning.includes('tiến cử')) {
    return renderCard(
      'bg-emerald-50/90',
      'border-emerald-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#D1FAE5" />
        {/* Big thumbs up hand */}
        <g transform="translate(62, 24)">
          <rect x="0" y="24" width="14" height="28" rx="3" fill="#047857" />
          <path d="M14 26 L26 26 C30 26 32 29 32 32 C32 35 30 38 26 38 L14 38" fill="#10B981" />
          <path d="M14 36 L28 36 C32 36 34 39 34 42 C34 45 32 48 28 48 L14 48" fill="#10B981" />
          <path d="M14 46 L24 46 C28 46 30 49 30 52 C30 55 28 58 24 58 L14 58" fill="#10B981" />
          {/* Thumb sticking high */}
          <path d="M14 26 L14 10 C14 4 22 4 22 10 L22 26 Z" fill="#10B981" />
        </g>
        {/* Sparkles of recommendation */}
        <polygon points="112,24 115,16 118,24 126,27 118,30 115,38 112,30 104,27" fill="#F59E0B" />
      </svg>,
      'Gợi ý, giới thiệu điều tốt nhất',
      '👍✨'
    );
  }

  // 11. Departure: Airplane taking off from runway
  if (cleanWord.includes('departure') || cleanMeaning.includes('khởi hành') || cleanMeaning.includes('cất cánh')) {
    return renderCard(
      'bg-blue-50/90',
      'border-blue-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        {/* Runway */}
        <path d="M30 88 L60 62 L100 62 L130 88 Z" fill="#94A3B8" />
        <line x1="80" y1="64" x2="80" y2="86" stroke="#FDE047" strokeWidth="2" strokeDasharray="3 3" />
        {/* Taking off airplane tilting up */}
        <g transform="translate(50, 18) rotate(-15 40 30)">
          <path d="M10 30 L60 30 Q70 30 76 26 L66 22 L10 22 Z" fill="#2563EB" />
          <polygon points="35,22 45,6 55,22" fill="#3B82F6" />
          <polygon points="35,30 45,46 55,30" fill="#1D4ED8" />
          <polygon points="10,22 16,10 24,22" fill="#1E40AF" />
        </g>
        {/* Speed wind trails */}
        <line x1="32" y1="46" x2="48" y2="46" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="52" x2="42" y2="52" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
      </svg>,
      'Khởi hành, cất cánh đúng giờ',
      '🛫🧳'
    );
  }

  // 12. Destination: Tropical island pin on map
  if (cleanWord.includes('destination') || cleanMeaning.includes('điểm đến') || cleanMeaning.includes('đích đến')) {
    return renderCard(
      'bg-emerald-50/90',
      'border-emerald-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="50" r="32" fill="#CCFBF1" />
        {/* Sandy beach island */}
        <ellipse cx="80" cy="65" rx="42" ry="16" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
        {/* Palm tree */}
        <path d="M68 64 Q70 42 74 36" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
        <path d="M74 36 Q86 28 92 34" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M74 36 Q60 30 56 38" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
        {/* Destination Map Pin */}
        <g transform="translate(86, 26)">
          <path d="M10 0 C4.5 0 0 4.5 0 10 C0 18 10 28 10 28 C10 28 20 18 20 10 C20 4.5 15.5 0 10 0 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="4" fill="#FFFFFF" />
        </g>
      </svg>,
      'Điểm đến mơ ước của hành trình',
      '🏝️📍'
    );
  }

  // 13. Ubiquitous: Globe surrounded by wireless radio waves
  if (cleanWord.includes('ubiquitous') || cleanMeaning.includes('khắp nơi') || cleanMeaning.includes('phổ biến rộng')) {
    return renderCard(
      'bg-blue-50/90',
      'border-blue-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="26" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
        {/* Lat/Long Lines */}
        <ellipse cx="80" cy="48" rx="14" ry="26" stroke="#93C5FD" strokeWidth="1.5" fill="none" />
        <line x1="54" y1="48" x2="106" y2="48" stroke="#93C5FD" strokeWidth="1.5" />
        {/* WiFi wave signals all around */}
        <path d="M42 36 A 42 42 0 0 1 118 36" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M34 28 A 52 52 0 0 1 126 28" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Devices around */}
        <rect x="22" y="44" width="10" height="16" rx="2" fill="#1E293B" stroke="#60A5FA" strokeWidth="1" />
        <rect x="128" y="44" width="14" height="10" rx="1.5" fill="#1E293B" stroke="#60A5FA" strokeWidth="1" />
      </svg>,
      'Có mặt ở khắp mọi nơi',
      '🌐📱'
    );
  }

  // 14. Exacerbate: Fuel canister pouring into blazing fire
  if (cleanWord.includes('exacerbate') || cleanMeaning.includes('trầm trọng') || cleanMeaning.includes('tệ hơn')) {
    return renderCard(
      'bg-rose-50/90',
      'border-rose-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#FFE4E6" />
        {/* Roaring campfire */}
        <path d="M60 76 Q70 30 80 44 Q90 20 100 76 Z" fill="#EF4444" />
        <path d="M68 76 Q76 45 82 55 Q90 38 94 76 Z" fill="#F59E0B" />
        <path d="M74 76 Q80 58 84 76 Z" fill="#FEF08A" />
        {/* Wood logs */}
        <line x1="54" y1="78" x2="106" y2="78" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
        {/* Fuel Canister pouring */}
        <g transform="translate(104, 20) rotate(35)">
          <rect x="0" y="6" width="18" height="24" rx="2" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
          <path d="M0 6 L9 0 L18 6 Z" fill="#B91C1C" />
          <rect x="7" y="-4" width="4" height="4" fill="#1E293B" />
        </g>
        {/* Drops falling */}
        <circle cx="106" cy="46" r="2" fill="#DC2626" />
        <circle cx="102" cy="54" r="2" fill="#DC2626" />
      </svg>,
      'Làm trầm trọng thêm (đổ dầu vào lửa)',
      '🔥🛢️'
    );
  }

  // 15. Bottleneck: Bottle with narrow throat causing traffic jam
  if (cleanWord.includes('bottleneck') || cleanMeaning.includes('cổ chai') || cleanMeaning.includes('điểm nghẽn')) {
    return renderCard(
      'bg-amber-50/90',
      'border-amber-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        {/* Big bottle outline */}
        <path d="M30 68 L70 68 L85 54 L110 54 L110 46 L85 46 L70 32 L30 32 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
        {/* Queue of items stuck at the neck */}
        <circle cx="45" cy="50" r="7" fill="#EF4444" />
        <circle cx="62" cy="44" r="6" fill="#F59E0B" />
        <circle cx="62" cy="56" r="6" fill="#F59E0B" />
        <circle cx="78" cy="50" r="5" fill="#DC2626" />
        {/* Trickling single item exiting */}
        <circle cx="102" cy="50" r="3.5" fill="#10B981" />
        {/* Alert badge */}
        <polygon points="80,12 88,26 72,26" fill="#EF4444" />
        <text x="80" y="24" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">!</text>
      </svg>,
      'Điểm nghẽn cổ chai làm chậm tiến độ',
      '🍾⚠️'
    );
  }

  // 16. Streamline: Tangled winding curve straightened into aerodynamic arrow
  if (cleanWord.includes('streamline') || cleanMeaning.includes('tinh gọn') || cleanMeaning.includes('hợp lý hóa')) {
    return renderCard(
      'bg-cyan-50/90',
      'border-cyan-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#CFFAFE" />
        {/* Messy tangled lines on left */}
        <path d="M25 40 Q40 65 30 50 Q45 25 55 52" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2 2" fill="none" />
        <path d="M25 60 Q35 30 50 65 Q60 40 68 50" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
        {/* Bold straight streamline arrow flying through */}
        <path d="M55 50 L125 50 M115 40 L128 50 L115 60" stroke="#0891B2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* High speed slipstream wakes */}
        <line x1="75" y1="36" x2="110" y2="36" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
        <line x1="85" y1="64" x2="115" y2="64" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
      </svg>,
      'Tinh gọn, trơn tru hóa quy trình',
      '🌊➡️'
    );
  }

  // 17. Lucrative: Golden coin plant growing out of pot with ascending chart
  if (cleanWord.includes('lucrative') || cleanMeaning.includes('siêu lợi nhuận') || cleanMeaning.includes('sinh lời')) {
    return renderCard(
      'bg-amber-50/90',
      'border-amber-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="32" fill="#FEF3C7" />
        {/* Clay pot */}
        <path d="M66 82 L94 82 L98 64 L62 64 Z" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
        <rect x="58" y="60" width="44" height="5" rx="1.5" fill="#B45309" />
        {/* Green stem */}
        <path d="M80 60 Q76 42 80 26" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
        {/* Gold coin leaves */}
        <circle cx="68" cy="42" r="9" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
        <text x="68" y="46" fill="#78350F" fontSize="10" fontWeight="bold" textAnchor="middle">$</text>
        <circle cx="92" cy="38" r="9" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
        <text x="92" y="42" fill="#78350F" fontSize="10" fontWeight="bold" textAnchor="middle">$</text>
        <circle cx="80" cy="22" r="11" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
        <text x="80" y="26" fill="#78350F" fontSize="12" fontWeight="bold" textAnchor="middle">$</text>
        {/* Upward trend arrow */}
        <path d="M106 60 L126 30 M116 30 L126 30 L126 40" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>,
      'Siêu sinh lời, lợi nhuận kếch xù',
      '💰📈'
    );
  }

  // 18. Grocery: Paper grocery bag with baguette, carrot, apple
  if (cleanWord.includes('grocery') || cleanMeaning.includes('tạp hóa') || cleanMeaning.includes('thực phẩm')) {
    return renderCard(
      'bg-emerald-50/90',
      'border-emerald-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#D1FAE5" />
        {/* Baguette sticking out */}
        <rect x="62" y="16" width="12" height="40" rx="6" transform="rotate(-15 62 16)" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
        {/* Carrot */}
        <polygon points="90,26 98,22 92,44" fill="#EA580C" />
        <path d="M96 20 Q98 12 102 16" stroke="#059669" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Apple */}
        <circle cx="82" cy="38" r="10" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
        {/* Paper Grocery Bag */}
        <path d="M52 42 L108 42 L102 84 L58 84 Z" fill="#D4A373" stroke="#A77443" strokeWidth="2" />
        <path d="M52 42 L58 48 L64 42 L70 48 L76 42 L82 48 L88 42 L94 48 L100 42 L108 42" stroke="#A77443" strokeWidth="1.5" fill="none" />
      </svg>,
      'Hàng tạp hóa & thực phẩm thiết yếu',
      '🥖🥦'
    );
  }

  // 19. Commute: Train/Metro passenger with backpack
  if (cleanWord.includes('commute') || cleanMeaning.includes('đi làm') || cleanMeaning.includes('đi lại thường nhật')) {
    return renderCard(
      'bg-blue-50/90',
      'border-blue-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        {/* Metro Train Front */}
        <rect x="52" y="24" width="56" height="54" rx="10" fill="#2563EB" stroke="#1E40AF" strokeWidth="2" />
        {/* Windshield */}
        <rect x="60" y="32" width="40" height="20" rx="4" fill="#93C5FD" />
        {/* Headlights */}
        <circle cx="64" cy="64" r="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
        <circle cx="96" cy="64" r="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
        {/* Passenger figure walking onto train */}
        <circle cx="34" cy="46" r="6" fill="#F59E0B" />
        <rect x="29" y="54" width="10" height="24" rx="2" fill="#1E293B" />
        <rect x="37" y="56" width="6" height="12" rx="2" fill="#EA580C" />
      </svg>,
      'Đi làm, di chuyển hàng ngày',
      '🚇🎒'
    );
  }

  // 20. Budget: Cute piggy bank with gold coin
  if (cleanWord.includes('budget') || cleanMeaning.includes('ngân sách') || cleanMeaning.includes('tiết kiệm')) {
    return renderCard(
      'bg-rose-50/90',
      'border-rose-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#FFE4E6" />
        {/* Piggy Body */}
        <ellipse cx="78" cy="56" rx="28" ry="22" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
        {/* Snout */}
        <ellipse cx="50" cy="56" rx="7" ry="9" fill="#FB7185" stroke="#E11D48" strokeWidth="1.5" />
        <circle cx="48" cy="55" r="1.5" fill="#881337" />
        <circle cx="52" cy="55" r="1.5" fill="#881337" />
        {/* Ear */}
        <polygon points="68,36 80,36 74,44" fill="#FB7185" stroke="#E11D48" strokeWidth="1.5" />
        {/* Eye */}
        <circle cx="62" cy="48" r="2.5" fill="#1F2937" />
        {/* Coin Slot */}
        <line x1="72" y1="36" x2="84" y2="36" stroke="#9D174D" strokeWidth="3" strokeLinecap="round" />
        {/* Dropping Gold Coin */}
        <circle cx="78" cy="24" r="8" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
        <text x="78" y="28" fill="#78350F" fontSize="9" fontWeight="bold" textAnchor="middle">$</text>
      </svg>,
      'Ngân sách chi tiêu cẩn thận',
      '🐷💰'
    );
  }

  // 21. Punctual: Analog clock sharp at 12:00 with checkmark
  if (cleanWord.includes('punctual') || cleanMeaning.includes('đúng giờ')) {
    return renderCard(
      'bg-emerald-50/90',
      'border-emerald-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        {/* Big clock dial */}
        <circle cx="76" cy="48" r="32" fill="#FFFFFF" stroke="#059669" strokeWidth="3" />
        <circle cx="76" cy="48" r="3" fill="#1E293B" />
        {/* Hour & Minute hands straight at 12 */}
        <line x1="76" y1="48" x2="76" y2="24" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        <line x1="76" y1="48" x2="76" y2="28" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
        {/* Hour marks */}
        <line x1="76" y1="18" x2="76" y2="22" stroke="#64748B" strokeWidth="2" />
        <line x1="104" y1="48" x2="100" y2="48" stroke="#64748B" strokeWidth="2" />
        <line x1="76" y1="78" x2="76" y2="74" stroke="#64748B" strokeWidth="2" />
        <line x1="48" y1="48" x2="52" y2="48" stroke="#64748B" strokeWidth="2" />
        {/* Green Checkmark Badge */}
        <circle cx="114" cy="32" r="14" fill="#10B981" />
        <path d="M108 32 L112 36 L120 28" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>,
      'Luôn đúng giờ giấc chính xác',
      '⏰🎯'
    );
  }

  // 22. Cut corners: Scissors snipping corners off blueprint
  if (cleanWord.includes('cut corners') || cleanMeaning.includes('làm ẩu') || cleanMeaning.includes('cắt xén')) {
    return renderCard(
      'bg-rose-50/90',
      'border-rose-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#FFE4E6" />
        {/* Square blueprint card with corner cut off */}
        <path d="M46 30 L94 30 L114 50 L114 74 L46 74 Z" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2" />
        <line x1="56" y1="44" x2="88" y2="44" stroke="#93C5FD" strokeWidth="1.5" />
        <line x1="56" y1="56" x2="98" y2="56" stroke="#93C5FD" strokeWidth="1.5" />
        {/* Scissors cutting along the diagonal */}
        <g transform="translate(94, 30)">
          <line x1="0" y1="20" x2="20" y2="0" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="18" cy="24" r="5" fill="none" stroke="#DC2626" strokeWidth="1.5" />
          <circle cx="26" cy="16" r="5" fill="none" stroke="#DC2626" strokeWidth="1.5" />
          <line x1="14" y1="20" x2="2" y2="8" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="12" x2="10" y2="0" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>,
      'Làm ẩu, đi tắt đón đầu giảm chất lượng',
      '✂️📐'
    );
  }

  // 23. On the same page: Two people reading the exact same open book
  if (cleanWord.includes('same page') || cleanMeaning.includes('cùng ý') || cleanMeaning.includes('đồng lòng') || cleanMeaning.includes('thống nhất')) {
    return renderCard(
      'bg-teal-50/90',
      'border-teal-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <circle cx="80" cy="48" r="30" fill="#CCFBF1" />
        {/* Big Open Book */}
        <path d="M42 46 Q61 40 80 48 Q99 40 118 46 L118 76 Q99 70 80 78 Q61 70 42 76 Z" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2" />
        {/* Book lines */}
        <line x1="48" y1="54" x2="72" y2="56" stroke="#14B8A6" strokeWidth="1.5" />
        <line x1="48" y1="62" x2="72" y2="64" stroke="#14B8A6" strokeWidth="1.5" />
        <line x1="88" y1="56" x2="112" y2="54" stroke="#14B8A6" strokeWidth="1.5" />
        <line x1="88" y1="64" x2="112" y2="62" stroke="#14B8A6" strokeWidth="1.5" />
        {/* Two smiling heads nodding together */}
        <circle cx="62" cy="28" r="8" fill="#FBBF24" />
        <circle cx="98" cy="28" r="8" fill="#FBBF24" />
        <path d="M60 30 Q62 33 64 30" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M96 30 Q98 33 100 30" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        {/* Thumbs up between them */}
        <path d="M78 28 L82 28 L82 22 L78 22 Z" fill="#0D9488" />
      </svg>,
      'Đồng lòng, cùng chung quan điểm',
      '📖🤝'
    );
  }

  // 24. Call it a day: Sunset blinds, coat, desk lamp switching off
  if (cleanWord.includes('call it a day') || cleanMeaning.includes('nghỉ tay') || cleanMeaning.includes('kết thúc ngày')) {
    return renderCard(
      'bg-amber-50/90',
      'border-amber-200/80',
      <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
        <rect x="36" y="20" width="88" height="60" rx="6" fill="#1E1B4B" stroke="#4338CA" strokeWidth="1.5" />
        {/* Sunset glowing sun */}
        <circle cx="80" cy="50" r="16" fill="#F59E0B" />
        {/* Window Blinds partially drawn */}
        <line x1="42" y1="28" x2="118" y2="28" stroke="#E2E8F0" strokeWidth="2" />
        <line x1="42" y1="36" x2="118" y2="36" stroke="#E2E8F0" strokeWidth="2" />
        <line x1="42" y1="44" x2="118" y2="44" stroke="#E2E8F0" strokeWidth="2" />
        <line x1="42" y1="52" x2="118" y2="52" stroke="#E2E8F0" strokeWidth="2" />
        {/* Steaming Mug on windowsill */}
        <rect x="100" y="60" width="12" height="14" rx="2" fill="#F43F5E" />
        <path d="M104 56 Q106 50 108 56" stroke="#FDA4AF" strokeWidth="1" fill="none" />
      </svg>,
      'Nghỉ tay, kết thúc công việc hôm nay',
      '🌇☕'
    );
  }

  return null;
}
