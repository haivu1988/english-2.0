import React from 'react';
import { getCuratedDrawing } from './illustrations/curatedDrawings';
import { getCuratedDrawingPart2 } from './illustrations/curatedDrawingsPart2';
import { getSemanticDrawing } from './illustrations/semanticDrawings';

interface WordIllustrationProps {
  word: string;
  meaning?: string;
  category?: string;
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  showCaption?: boolean;
  className?: string;
}

export const WordIllustration: React.FC<WordIllustrationProps> = ({
  word,
  meaning = '',
  icon = '',
  size = 'md',
  showCaption = true,
  className = '',
}) => {
  const cleanWord = (word || '').toLowerCase().trim();
  const cleanMeaning = (meaning || '').toLowerCase().trim();

  // Size mapping
  const sizeClasses = {
    sm: 'w-24 h-20',
    md: 'w-48 sm:w-56 h-28 sm:h-32',
    lg: 'w-60 sm:w-72 h-36 sm:h-40',
  };

  // Helper wrapper for consistent card look with caption pill
  const renderCard = (
    bgClass: string,
    borderClass: string,
    svgContent: React.ReactNode,
    captionText?: string,
    badgeEmoji?: string
  ) => {
    return (
      <div
        className={`relative flex flex-col items-center justify-between rounded-2xl ${bgClass} ${borderClass} border p-2 shadow-2xs overflow-hidden transition-all duration-300 ${sizeClasses[size]} ${className}`}
      >
        <div className="w-full flex-1 flex items-center justify-center min-h-0">
          {svgContent}
        </div>

        {showCaption && size !== 'sm' && (
          <div className="mt-1 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 border border-slate-200/80 shadow-2xs max-w-[95%]">
            {badgeEmoji && <span className="text-xs shrink-0">{badgeEmoji}</span>}
            <span className="text-[10px] font-bold text-slate-800 truncate">
              {captionText || meaning || word}
            </span>
          </div>
        )}
      </div>
    );
  };

  // 1. Check curated bespoke drawings (Part 1)
  const curated1 = getCuratedDrawing(cleanWord, cleanMeaning, renderCard, icon);
  if (curated1) return <>{curated1}</>;

  // 2. Check curated bespoke drawings (Part 2)
  const curated2 = getCuratedDrawingPart2(cleanWord, cleanMeaning, renderCard, icon);
  if (curated2) return <>{curated2}</>;

  // 3. Check semantic categories (Animals, Food, Tech, Nature, Sports, Time, etc.)
  const semantic = getSemanticDrawing(cleanWord, cleanMeaning, renderCard, icon);
  if (semantic) return <>{semantic}</>;

  // 4. Smart Procedural Artist for ANY other word
  // Guarantees unique colors, dynamic geometric elements, and accurate context
  const themePalettes = [
    { bg: 'bg-indigo-50/90', border: 'border-indigo-200/80', halo: '#EEF2FF', stroke: '#4F46E5', accent: '#6366F1' },
    { bg: 'bg-emerald-50/90', border: 'border-emerald-200/80', halo: '#D1FAE5', stroke: '#059669', accent: '#10B981' },
    { bg: 'bg-amber-50/90', border: 'border-amber-200/80', halo: '#FEF3C7', stroke: '#D97706', accent: '#F59E0B' },
    { bg: 'bg-rose-50/90', border: 'border-rose-200/80', halo: '#FFE4E6', stroke: '#E11D48', accent: '#F43F5E' },
    { bg: 'bg-blue-50/90', border: 'border-blue-200/80', halo: '#DBEAFE', stroke: '#2563EB', accent: '#3B82F6' },
    { bg: 'bg-violet-50/90', border: 'border-violet-200/80', halo: '#EDE9FE', stroke: '#7C3AED', accent: '#8B5CF6' },
    { bg: 'bg-teal-50/90', border: 'border-teal-200/80', halo: '#CCFBF1', stroke: '#0D9488', accent: '#14B8A6' },
  ];

  const hashVal = Math.abs(cleanWord.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0));
  const palette = themePalettes[hashVal % themePalettes.length];
  const displayIcon = icon || '🎯✨';
  const displayMeaning = meaning || word;

  return (
    <>
      {renderCard(
        palette.bg,
        palette.border,
        <svg viewBox="0 0 160 100" className="w-full h-full max-h-[85px]" fill="none">
          {/* Radial artistic halo */}
          <circle cx="80" cy="46" r="32" fill={palette.halo} />
          <circle cx="80" cy="46" r="22" stroke={palette.stroke} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" fill="none" />

          {/* Elevated Art Display Badge */}
          <rect x="52" y="22" width="56" height="48" rx="14" fill="#FFFFFF" stroke={palette.stroke} strokeWidth="2" />
          <line x1="56" y1="28" x2="104" y2="28" stroke={palette.halo} strokeWidth="1.5" />

          {/* Centered expressive symbol/icon */}
          <text x="80" y="52" fontSize="24" textAnchor="middle" dominantBaseline="middle">
            {displayIcon}
          </text>

          {/* Dynamic Sparkle Accents */}
          <polygon points="34,30 36,24 40,28 36,32" fill="#F59E0B" />
          <polygon points="126,34 128,28 132,32 128,36" fill="#F59E0B" />
          <circle cx="44" cy="62" r="3" fill={palette.accent} opacity="0.6" />
          <circle cx="116" cy="62" r="3" fill={palette.accent} opacity="0.6" />
        </svg>,
        displayMeaning,
        displayIcon
      )}
    </>
  );
};
