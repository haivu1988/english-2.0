import React, { useState, useEffect } from 'react';
import {
  Volume2,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Lightbulb,
  Sparkles,
  PenTool,
  Check,
  HelpCircle,
  BookOpen,
  VolumeX,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit3,
} from 'lucide-react';
import { Flashcard, MasteryLevel } from '../types';
import { speakEnglish } from '../utils/speech';
import { AddImageModal } from './AddImageModal';

interface FlashcardViewerProps {
  cards: Flashcard[];
  onGradeCard: (cardId: string, level: MasteryLevel) => void;
  onOpenPractice: (card: Flashcard) => void;
  onOpenDeepDive: (card: Flashcard) => void;
  onUpdateCard?: (updatedCard: Flashcard) => void;
}

export const FlashcardViewer: React.FC<FlashcardViewerProps> = ({
  cards,
  onGradeCard,
  onOpenPractice,
  onOpenDeepDive,
  onUpdateCard,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing inside an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === '1') {
        if (cards[safeIndex]) handleGrade('learning');
      } else if (e.key === '2') {
        if (cards[safeIndex]) handleGrade('review');
      } else if (e.key === '3') {
        if (cards[safeIndex]) handleGrade('mastered');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!cards || cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[360px] bg-white rounded-3xl border border-slate-200/80 shadow-xs max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 border border-indigo-100">
          <BookOpen className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-900">
          Chưa có thẻ từ vựng nào
        </h3>
        <p className="text-xs text-slate-500 mt-1.5 max-w-xs leading-relaxed">
          Hãy nhấn vào &quot;Tạo thẻ AI&quot; hoặc chọn một bộ từ trong thư viện để bắt đầu học ngay nhé!
        </p>
      </div>
    );
  }

  const safeIndex = Math.min(currentIndex, cards.length - 1);
  const currentCard = cards[safeIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * cards.length);
    setCurrentIndex(randomIndex);
  };

  const handleGrade = (level: MasteryLevel) => {
    onGradeCard(currentCard.id, level);
    handleNext();
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    setIsPlayingAudio(true);
    speakEnglish(text);
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  const handleSaveImage = (cardId: string, imageUrl: string | undefined) => {
    if (!currentCard || currentCard.id !== cardId) return;
    const updatedCard: Flashcard = {
      ...currentCard,
      imageUrl,
    };
    if (onUpdateCard) {
      onUpdateCard(updatedCard);
    }
  };

  const handleRemoveImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentCard) return;
    const updatedCard: Flashcard = {
      ...currentCard,
      imageUrl: undefined,
    };
    if (onUpdateCard) {
      onUpdateCard(updatedCard);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-2 flex flex-col items-center">
      {/* Top Bar: Progress counter & controls */}
      <div className="w-full flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-[11px] border border-slate-200/60 shadow-2xs">
            Thẻ {safeIndex + 1} / {cards.length}
          </span>
          {currentCard.masteryLevel === 'mastered' && (
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3 h-3" /> Đã thuộc
            </span>
          )}
        </div>

        <button
          onClick={handleShuffle}
          className="p-1.5 px-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all flex items-center gap-1 text-[11px] font-medium border border-slate-200/50"
          title="Đảo thẻ ngẫu nhiên"
        >
          <Shuffle className="w-3.5 h-3.5 text-indigo-600" />
          <span>Đảo thẻ</span>
        </button>
      </div>

      {/* 3D Flip Card Container */}
      <div
        className="w-full h-[450px] sm:h-[470px] perspective-1000 cursor-pointer select-none relative"
        onClick={handleFlipCard}
      >
        {/* Layered Card Shadows (Stacked aesthetic) */}
        <div className="w-full h-full bg-slate-100 rounded-[28px] border border-slate-200/60 transform rotate-1.5 absolute opacity-60 shadow-sm transition-all" />
        <div className="w-full h-full bg-slate-50 rounded-[28px] border border-slate-200/70 transform -rotate-1 absolute opacity-80 shadow-md transition-all" />

        <div
          className={`relative z-10 w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT SIDE */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-white border border-slate-200/80 rounded-[28px] shadow-[0_12px_36px_rgba(15,23,42,0.08)] p-5 sm:p-6 flex flex-col justify-between">
            {/* Front Header */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200/60">
                {currentCard.partOfSpeech || 'Từ vựng'}
              </span>

              {/* Pronunciation Audio Button */}
              <button
                onClick={(e) => handleSpeak(e, currentCard.word)}
                className={`p-2.5 rounded-2xl transition-all duration-200 ${
                  isPlayingAudio
                    ? 'bg-indigo-600 text-white scale-110 shadow-md shadow-indigo-500/30'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 active:scale-95'
                }`}
                title="Nghe phát âm chuẩn"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Front Main Content: Word, Phonetic & User Image / Add Image */}
            <div className="my-auto text-center flex flex-col items-center justify-center space-y-2 py-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {currentCard.word}
              </h2>
              {currentCard.phonetic && (
                <p className="text-xs sm:text-sm font-mono font-medium text-indigo-600 bg-indigo-50/70 px-3 py-0.5 rounded-full border border-indigo-100">
                  {currentCard.phonetic}
                </p>
              )}

              {/* User Custom Image or Add Image Button */}
              {currentCard.imageUrl ? (
                <div className="relative group my-2">
                  <div className="w-52 h-32 sm:w-60 sm:h-36 rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50 flex items-center justify-center">
                    <img
                      src={currentCard.imageUrl}
                      alt={currentCard.word}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-200"
                    />
                  </div>
                  {/* Floating Action buttons on image */}
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAddImageModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors shadow-xs"
                      title="Đổi ảnh khác"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-700 text-white backdrop-blur-xs transition-colors shadow-xs"
                      title="Xóa ảnh"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="my-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAddImageModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-2xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/40 hover:bg-indigo-50/90 text-indigo-700 transition-all flex items-center gap-2 text-xs font-semibold group active:scale-95 shadow-2xs"
                  >
                    <div className="w-6 h-6 rounded-lg bg-white border border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform shadow-2xs">
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Thêm ảnh cho từ này</span>
                    </span>
                  </button>
                </div>
              )}

              {/* Subtle sample context preview */}
              <p className="text-xs text-slate-400 italic max-w-xs line-clamp-2 pt-1">
                &ldquo;{currentCard.exampleSentence}&rdquo;
              </p>
            </div>

            {/* Front Footer: Tap Hint */}
            <div className="flex items-center justify-center pt-3 border-t border-slate-100 text-slate-400 text-xs gap-1.5">
              <RotateCw className="w-3.5 h-3.5 text-indigo-500 animate-spin-slow" />
              <span className="font-medium text-slate-500">Chạm để lật xem nghĩa & ví dụ</span>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white border border-slate-200/80 rounded-[28px] shadow-[0_12px_36px_rgba(15,23,42,0.08)] p-6 flex flex-col justify-between overflow-y-auto">
            {/* Back Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-slate-900">
                  {currentCard.word}
                </span>
                <span className="text-xs font-mono text-indigo-600">
                  {currentCard.phonetic}
                </span>
              </div>
              <button
                onClick={(e) => handleSpeak(e, currentCard.word)}
                className="p-1.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                title="Nghe phát âm"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Back Main Content */}
            <div className="my-auto py-2 space-y-3">
              {/* Vietnamese Meaning */}
              <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-0.5">
                  Định nghĩa tiếng Việt
                </span>
                <p className="text-base sm:text-lg font-bold text-emerald-950 leading-snug">
                  {currentCard.vietnameseMeaning}
                </p>
              </div>

              {/* User Image & Visual Memory Section */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Hình ảnh học tập</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAddImageModalOpen(true);
                    }}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-50 active:scale-95 transition-all flex items-center gap-1 shadow-2xs"
                  >
                    {currentCard.imageUrl ? (
                      <>
                        <Edit3 className="w-3 h-3" />
                        <span>Đổi ảnh</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>Thêm ảnh</span>
                      </>
                    )}
                  </button>
                </div>

                {currentCard.imageUrl ? (
                  <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200/70">
                    <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
                      <img
                        src={currentCard.imageUrl}
                        alt={currentCard.word}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs text-slate-600 space-y-1">
                      {currentCard.visualMnemonic?.scene && (
                        <p className="italic leading-relaxed">
                          &ldquo;{currentCard.visualMnemonic.scene}&rdquo;
                        </p>
                      )}
                      {currentCard.memoryTip && (
                        <p className="text-amber-800 font-medium text-[11px]">
                          💡 {currentCard.memoryTip}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAddImageModalOpen(true);
                    }}
                    className="p-3 rounded-xl border border-dashed border-slate-300 hover:border-indigo-400 bg-white hover:bg-indigo-50/30 text-center cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5">
                      <Plus className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Chưa có hình ảnh &ndash; Nhấn để thêm ảnh của bạn</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Tải ảnh minh họa bạn thích từ máy hoặc dán link ảnh
                    </p>
                  </div>
                )}
              </div>

              {/* Example Sentence with audio */}
              <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Ví dụ ngữ cảnh
                  </span>
                  <button
                    onClick={(e) => handleSpeak(e, currentCard.exampleSentence)}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium"
                    title="Nghe câu ví dụ"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe câu</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  {currentCard.exampleSentence}
                </p>
                {currentCard.exampleTranslation && (
                  <p className="text-xs text-slate-500 italic mt-1 leading-relaxed">
                    {currentCard.exampleTranslation}
                  </p>
                )}
              </div>

              {/* Memory Tip or Collocations */}
              {(currentCard.memoryTip || currentCard.collocations) && (
                <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-2.5 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-tight">
                    {currentCard.memoryTip && (
                      <p className="font-medium">{currentCard.memoryTip}</p>
                    )}
                    {currentCard.collocations && currentCard.collocations.length > 0 && (
                      <p className="text-[11px] text-amber-700 mt-1">
                        <strong>Cụm từ hay:</strong> {currentCard.collocations.join(' · ')}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Back Footer: AI Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPractice(currentCard);
                }}
                className="flex-1 py-1.5 px-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-indigo-200/50"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Luyện đặt câu AI</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDeepDive(currentCard);
                }}
                className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-200/60"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                <span>Chi tiết từ</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Response / Grading Buttons (Spaced Repetition Feedback) */}
      <div className="w-full mt-4 flex items-center gap-2">
        <button
          onClick={() => handleGrade('learning')}
          className="flex-1 py-3 px-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition-all active:scale-97 shadow-2xs"
          title="Phím tắt: 1"
        >
          <span>Chưa nhớ</span>
          <span className="text-[10px] font-normal text-rose-500">Ôn lại sớm</span>
        </button>

        <button
          onClick={() => handleGrade('review')}
          className="flex-1 py-3 px-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition-all active:scale-97 shadow-2xs"
          title="Phím tắt: 2"
        >
          <span>Đang học</span>
          <span className="text-[10px] font-normal text-amber-600">Ôn ngày mai</span>
        </button>

        <button
          onClick={() => handleGrade('mastered')}
          className="flex-1 py-3 px-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition-all active:scale-97 shadow-md shadow-emerald-500/20"
          title="Phím tắt: 3"
        >
          <span className="flex items-center gap-1">
            <Check className="w-4 h-4 stroke-[3]" /> Đã thuộc
          </span>
          <span className="text-[10px] font-normal text-emerald-100">Rất tốt!</span>
        </button>
      </div>

      {/* Navigation Controls Row */}
      <div className="w-full mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
        <button
          onClick={handlePrev}
          className="py-1.5 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 font-medium flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Trước</span>
        </button>

        <button
          onClick={handleFlipCard}
          className="py-1.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1.5 transition-all active:scale-95"
        >
          <RotateCw className="w-3.5 h-3.5 text-indigo-600" />
          <span>{isFlipped ? 'Xem từ gốc' : 'Lật thẻ'}</span>
        </button>

        <button
          onClick={handleNext}
          className="py-1.5 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 font-medium flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
        >
          <span>Tiếp</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* User Add / Change Image Modal */}
      {currentCard && (
        <AddImageModal
          card={currentCard}
          isOpen={isAddImageModalOpen}
          onClose={() => setIsAddImageModalOpen(false)}
          onSaveImage={handleSaveImage}
        />
      )}
    </div>
  );
};
