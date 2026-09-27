import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  Trash2,
  Flame,
  Calendar,
  Sparkles,
  Compass,
  Sliders,
  ChevronRight,
  GraduationCap,
  Search,
} from 'lucide-react';
import { Deck, Flashcard, UserProgress, UserPreferences } from '../types';
import { TOPIC_OPTIONS, LEVEL_OPTIONS } from './OnboardingModal';

interface DeckLibrarySectionProps {
  decks: Deck[];
  cards: Flashcard[];
  activeDeckId: string;
  progress: UserProgress;
  preferences?: UserPreferences;
  onSelectDeck: (deckId: string) => void;
  onDeleteDeck: (deckId: string) => void;
  onOpenPreferences?: () => void;
}

export const DeckLibrarySection: React.FC<DeckLibrarySectionProps> = ({
  decks,
  cards,
  activeDeckId,
  progress,
  preferences,
  onSelectDeck,
  onDeleteDeck,
  onOpenPreferences,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const masteredCount = cards.filter((c) => c.masteryLevel === 'mastered').length;
  const learningCount = cards.filter(
    (c) => c.masteryLevel === 'learning' || c.masteryLevel === 'review'
  ).length;

  const currentLevelInfo = LEVEL_OPTIONS.find((l) => l.id === preferences?.level);

  const filteredDecks = decks.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto px-4 py-3 space-y-4">
      {/* Learning Path & Level Focus Card */}
      {preferences && (
        <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/50 border border-indigo-100/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Lộ trình học cá nhân hoá
                </h4>
                <p className="text-[11px] text-slate-500">
                  {currentLevelInfo?.title || preferences.level}
                </p>
              </div>
            </div>

            {onOpenPreferences && (
              <button
                onClick={onOpenPreferences}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-indigo-600 hover:bg-slate-50 transition-colors flex items-center gap-1 shadow-2xs"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Thay đổi</span>
              </button>
            )}
          </div>

          {/* Topics & Goal badges */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white">
              Cấp độ {preferences.level}
            </span>
            {preferences.topics?.map((topicId) => {
              const topicMeta = TOPIC_OPTIONS.find((t) => t.id === topicId);
              return (
                <span
                  key={topicId}
                  className="text-[10px] px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs"
                >
                  {topicMeta?.icon} {topicMeta?.label || topicId}
                </span>
              );
            })}
            <span className="text-[10px] px-2.5 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-bold">
              🎯 Mục tiêu {preferences.dailyGoal} từ/ngày
            </span>
          </div>
        </div>
      )}

      {/* Learning Stats Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/70 text-center shadow-2xs">
          <div className="text-2xl font-extrabold text-emerald-700">
            {masteredCount}
          </div>
          <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mt-0.5">
            Đã thuộc
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-center shadow-2xs">
          <div className="text-2xl font-extrabold text-amber-700">
            {learningCount}
          </div>
          <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mt-0.5">
            Đang ôn
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
          <div className="text-2xl font-extrabold text-slate-800">
            {cards.length}
          </div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
            Tổng thẻ
          </div>
        </div>
      </div>

      {/* Streak & Daily Habit Card */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
            <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              Chuỗi ngày học liên tục
            </h4>
            <p className="text-xs text-slate-500">
              Bạn đang giữ phong độ <strong className="text-orange-600 font-bold">{progress.dailyStreak} ngày</strong>
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
          {progress.todayCardsReviewed}/{progress.dailyGoal} từ
        </span>
      </div>

      {/* Search Input for Decks */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm bộ từ vựng..."
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-2xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
        />
      </div>

      {/* Decks List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Các bộ thẻ của bạn ({filteredDecks.length})
          </h3>
        </div>

        <div className="space-y-2.5">
          {filteredDecks.map((deck) => {
            const isActive = deck.id === activeDeckId;
            const deckCards = cards.filter((c) => c.deckId === deck.id);
            const deckMastered = deckCards.filter((c) => c.masteryLevel === 'mastered').length;
            const percent = deckCards.length > 0 ? Math.round((deckMastered / deckCards.length) * 100) : 0;

            return (
              <div
                key={deck.id}
                onClick={() => onSelectDeck(deck.id)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer flex flex-col gap-2.5 ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-1 ring-indigo-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {deck.title}
                      </h4>
                      {deck.isDaily && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700">
                          Hôm nay
                        </span>
                      )}
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {deck.level}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {deck.topic}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {isActive ? (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-indigo-600 text-white shadow-xs">
                        Đang chọn
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDeck(deck.id);
                        }}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      >
                        Học bộ này
                      </button>
                    )}

                    {decks.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteDeck(deck.id);
                        }}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Xóa bộ thẻ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress bar inside card */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3 text-slate-400" />
                      <span>{deckCards.length} thẻ</span>
                    </span>
                    <span className="font-semibold text-emerald-600">
                      {deckMastered} đã thuộc ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
