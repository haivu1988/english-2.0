import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Play,
  Volume2,
  Trophy,
  ArrowRight,
  RefreshCw,
  Search,
} from 'lucide-react';
import { Flashcard, MasteryLevel } from '../types';
import { speakEnglish } from '../utils/speech';

interface DailyReviewSectionProps {
  cards: Flashcard[];
  onGradeCard: (cardId: string, level: MasteryLevel) => void;
  onSwitchToLearn: (cardId?: string) => void;
}

export const DailyReviewSection: React.FC<DailyReviewSectionProps> = ({
  cards,
  onGradeCard,
  onSwitchToLearn,
}) => {
  const [activeTab, setActiveTab] = useState<'review-cards' | 'quiz' | 'all'>('review-cards');
  const [searchQuery, setSearchQuery] = useState('');

  // Cards that need review (learning or review status, or new cards)
  const needsReviewCards = cards.filter(
    (c) => c.masteryLevel === 'learning' || c.masteryLevel === 'review' || c.masteryLevel === 'new'
  );

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Prepare a random quiz question from available cards
  const quizCards = cards.length >= 4 ? cards : [];
  const currentQuizCard = quizCards[quizIndex];

  // Generate 4 options (1 correct + 3 random distractors)
  const getOptions = (correctCard: Flashcard) => {
    const distractors = cards
      .filter((c) => c.id !== correctCard.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((c) => c.vietnameseMeaning);

    const all = [correctCard.vietnameseMeaning, ...distractors].sort(
      () => 0.5 - Math.random()
    );
    return all;
  };

  const [currentOptions, setCurrentOptions] = useState<string[]>(() => {
    if (currentQuizCard) return getOptions(currentQuizCard);
    return [];
  });

  const handleSelectQuizOption = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);

    if (option === currentQuizCard.vietnameseMeaning) {
      setQuizScore((prev) => prev + 1);
      onGradeCard(currentQuizCard.id, 'mastered');
    } else {
      onGradeCard(currentQuizCard.id, 'learning');
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex + 1 < quizCards.length) {
      const nextIdx = quizIndex + 1;
      setQuizIndex(nextIdx);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setCurrentOptions(getOptions(quizCards[nextIdx]));
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setQuizFinished(false);
    if (quizCards.length > 0) {
      setCurrentOptions(getOptions(quizCards[0]));
    }
  };

  const filteredAllCards = cards.filter(
    (c) =>
      c.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.vietnameseMeaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto px-4 py-3 space-y-4">
      {/* Sub-tab Switcher */}
      <div className="flex rounded-2xl bg-slate-100 p-1 text-xs font-semibold border border-slate-200/70">
        <button
          onClick={() => setActiveTab('review-cards')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'review-cards'
              ? 'bg-white text-slate-900 shadow-xs font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Cần ôn ({needsReviewCards.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('quiz');
            if (!currentOptions.length && quizCards.length > 0) {
              setCurrentOptions(getOptions(quizCards[0]));
            }
          }}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'quiz'
              ? 'bg-white text-slate-900 shadow-xs font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Trắc nghiệm nhanh
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'all'
              ? 'bg-white text-slate-900 shadow-xs font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Tất cả ({cards.length})
        </button>
      </div>

      {/* TAB 1: REVIEW CARDS QUEUE */}
      {activeTab === 'review-cards' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Danh sách từ cần củng cố hôm nay
            </h3>
            {needsReviewCards.length > 0 && (
              <button
                onClick={() => onSwitchToLearn(needsReviewCards[0]?.id)}
                className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:text-indigo-800"
              >
                <Play className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600" />
                <span>Học ngay</span>
              </button>
            )}
          </div>

          {needsReviewCards.length === 0 ? (
            <div className="p-8 rounded-3xl bg-emerald-50/60 border border-emerald-200/70 text-center flex flex-col items-center space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-emerald-950">
                Tuyệt vời! Bạn đã ôn hết các từ hôm nay
              </h4>
              <p className="text-xs text-emerald-800 max-w-xs leading-relaxed">
                Tất cả từ vựng đều đang ở mức nhớ tốt. Bạn có thể làm trắc nghiệm nhanh hoặc tạo thêm bộ thẻ mới!
              </p>
              <button
                onClick={() => setActiveTab('quiz')}
                className="mt-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all active:scale-97"
              >
                Làm trắc nghiệm ôn tập
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {needsReviewCards.map((card) => (
                <div
                  key={card.id}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-900 truncate">
                        {card.word}
                      </span>
                      <span className="text-[11px] font-mono text-indigo-600">
                        {card.phonetic}
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold uppercase">
                        {card.partOfSpeech}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                      {card.vietnameseMeaning}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => speakEnglish(card.word)}
                      className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onGradeCard(card.id, 'mastered')}
                      className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 transition-colors"
                      title="Đánh dấu đã thuộc"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MINI QUIZ */}
      {activeTab === 'quiz' && (
        <div className="space-y-3">
          {quizCards.length < 4 ? (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center">
              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-600 font-medium">
                Cần tối thiểu 4 từ vựng để tạo bài trắc nghiệm nhanh. Hãy tạo thêm thẻ bài nhé!
              </p>
            </div>
          ) : quizFinished ? (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  Hoàn thành trắc nghiệm!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Bạn trả lời đúng{' '}
                  <strong className="text-emerald-600 text-sm">
                    {quizScore}/{quizCards.length}
                  </strong>{' '}
                  câu hỏi.
                </p>
              </div>
              <button
                onClick={handleRestartQuiz}
                className="w-full py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all active:scale-97"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Làm lại trắc nghiệm</span>
              </button>
            </div>
          ) : (
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              {/* Question Header */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-indigo-600">
                  Câu hỏi {quizIndex + 1} / {quizCards.length}
                </span>
                <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full font-semibold">
                  Điểm: {quizScore}
                </span>
              </div>

              {/* Target Word */}
              <div className="py-4 text-center bg-slate-50/80 rounded-2xl border border-slate-200/60 flex flex-col items-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                  Chọn nghĩa đúng của từ:
                </p>
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    {currentQuizCard.word}
                  </h3>
                  <button
                    onClick={() => speakEnglish(currentQuizCard.word)}
                    className="p-1.5 rounded-xl text-indigo-600 hover:bg-indigo-50"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs font-mono text-indigo-600 mb-2">
                  {currentQuizCard.phonetic}
                </span>

                {/* User image if available under the quiz word */}
                {currentQuizCard.imageUrl && (
                  <div className="my-1.5 w-24 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                    <img
                      src={currentQuizCard.imageUrl}
                      alt={currentQuizCard.word}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2">
                {currentOptions.map((option, idx) => {
                  const isCorrect = option === currentQuizCard.vietnameseMeaning;
                  const isChosen = selectedOption === option;

                  let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300';

                  if (isAnswerChecked) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                    } else if (isChosen && !isCorrect) {
                      btnStyle = 'bg-rose-50 border-rose-400 text-rose-800 font-medium';
                    } else {
                      btnStyle = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(option)}
                      disabled={isAnswerChecked}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between active:scale-98 ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswerChecked && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next Question Button */}
              {isAnswerChecked && (
                <button
                  onClick={handleNextQuiz}
                  className="w-full mt-2 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all active:scale-97"
                >
                  <span>
                    {quizIndex + 1 === quizCards.length ? 'Xem kết quả' : 'Câu tiếp theo'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ALL CARDS LIST WITH SEARCH */}
      {activeTab === 'all' && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm từ tiếng Anh hoặc nghĩa..."
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-800 placeholder:text-slate-400 shadow-2xs"
            />
          </div>

          <div className="space-y-2">
            {filteredAllCards.map((card) => (
              <div
                key={card.id}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      {card.word}
                    </span>
                    <span className="text-[11px] font-mono text-indigo-600">
                      {card.phonetic}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                    {card.vietnameseMeaning}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => speakEnglish(card.word)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold border ${
                      card.masteryLevel === 'mastered'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : card.masteryLevel === 'learning'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {card.masteryLevel === 'mastered'
                      ? 'Đã thuộc'
                      : card.masteryLevel === 'learning'
                      ? 'Đang học'
                      : 'Mới'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
