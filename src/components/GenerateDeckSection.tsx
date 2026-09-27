import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, BookOpen, AlertCircle, Wand2, Check, Zap } from 'lucide-react';
import { Deck, Flashcard, EnglishLevel, UserPreferences } from '../types';
import { getCuratedFallbackCards } from '../data/curatedVocabLibrary';

interface GenerateDeckSectionProps {
  existingWords: string[];
  onDeckCreated: (newDeck: Deck, newCards: Flashcard[]) => void;
  userPreferences?: UserPreferences;
}

const TOPIC_PRESETS = [
  { id: 'daily', label: '🗣️ Giao tiếp hàng ngày', topic: 'Giao tiếp đời sống thường nhật & bạn bè' },
  { id: 'work', label: '💼 Tiếng Anh công sở', topic: 'Giao tiếp công sở, email & họp hành' },
  { id: 'travel', label: '✈️ Du lịch & Sân bay', topic: 'Từ vựng và mẫu câu du lịch, sân bay, khách sạn' },
  { id: 'ielts', label: '🎯 IELTS Band 7+', topic: 'Từ vựng học thuật IELTS nâng cao và collocation hay' },
  { id: 'cafe', label: '☕ Nhà hàng & Cafe', topic: 'Gọi món tại quán cà phê, nhà hàng và ẩm thực' },
  { id: 'tech', label: '💻 Công nghệ & IT', topic: 'Thuật ngữ công nghệ, lập trình và phần mềm' },
  { id: 'idioms', label: '💬 Thành ngữ tự nhiên', topic: 'Thành ngữ (idioms) và cụm động từ người bản xứ hay dùng' },
];

export const GenerateDeckSection: React.FC<GenerateDeckSectionProps> = ({
  existingWords,
  onDeckCreated,
  userPreferences,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>(() => {
    if (userPreferences?.topics && userPreferences.topics.length > 0) {
      const match = TOPIC_PRESETS.find((p) => userPreferences.topics.includes(p.id));
      if (match) return match.id;
    }
    return 'daily';
  });
  const [customTopic, setCustomTopic] = useState('');
  const [level, setLevel] = useState<EnglishLevel | string>(userPreferences?.level || 'B1-B2');
  const [cardCount, setCardCount] = useState<number>(userPreferences?.dailyGoal || 6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sync state if user preferences change
  useEffect(() => {
    if (userPreferences?.level) {
      setLevel(userPreferences.level);
    }
    if (userPreferences?.dailyGoal) {
      setCardCount(userPreferences.dailyGoal);
    }
  }, [userPreferences]);

  const createDeckFromData = (
    data: { topicTitle?: string; level?: string; cards?: Partial<Flashcard>[] },
    topicName: string,
    isFallback = false
  ) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const deckId = `deck-${Date.now()}`;

    const newDeck: Deck = {
      id: deckId,
      title: data.topicTitle || `Bộ thẻ: ${topicName}`,
      topic: topicName,
      level: (data.level as EnglishLevel) || (level as EnglishLevel),
      createdAt: new Date().toISOString(),
      cardCount: (data.cards || []).length,
      isDaily: false,
      dateStr: todayStr,
    };

    const newCards: Flashcard[] = (data.cards || []).map(
      (c: Partial<Flashcard>, index: number) => ({
        id: `card-${deckId}-${index}`,
        word: c.word || '',
        phonetic: c.phonetic || '',
        partOfSpeech: c.partOfSpeech || 'word',
        vietnameseMeaning: c.vietnameseMeaning || '',
        exampleSentence: c.exampleSentence || '',
        exampleTranslation: c.exampleTranslation || '',
        memoryTip: c.memoryTip || '',
        collocations: c.collocations || [],
        deckId,
        dateAdded: todayStr,
        reviewCount: 0,
        masteryLevel: 'new' as const,
      })
    );

    onDeckCreated(newDeck, newCards);
    if (isFallback) {
      setSuccessMsg(
        `Đã tạo bộ ${newCards.length} thẻ từ chuẩn chất lượng cao! Bạn có thể học ngay.`
      );
    } else {
      setSuccessMsg(`Đã tạo thành công ${newCards.length} thẻ từ mới với Gemini AI!`);
    }
  };

  const handleGenerateInstant = () => {
    const activeTopic =
      customTopic.trim() ||
      TOPIC_PRESETS.find((p) => p.id === selectedPreset)?.topic ||
      'Giao tiếp hàng ngày';

    const fallbackData = getCuratedFallbackCards(
      level,
      activeTopic,
      cardCount,
      existingWords
    );
    createDeckFromData(fallbackData, activeTopic, true);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const activeTopic =
      customTopic.trim() ||
      TOPIC_PRESETS.find((p) => p.id === selectedPreset)?.topic ||
      'Giao tiếp hàng ngày';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 14000);

      const response = await fetch('/api/generate-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          topic: activeTopic,
          level,
          count: cardCount,
          existingWords,
        }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Hệ thống AI bận, đang chuyển sang kho từ vựng chuẩn.');
      }

      const data = await response.json();
      createDeckFromData(data, activeTopic, Boolean(data.isCuratedFallback));
    } catch (err: unknown) {
      console.warn('AI call interrupted, activating client curated library fallback:', err);
      const fallbackData = getCuratedFallbackCards(
        level,
        activeTopic,
        cardCount,
        existingWords
      );
      createDeckFromData(fallbackData, activeTopic, true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-3 space-y-4">
      {/* Title Hero Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-semibold mb-2.5 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Gemini AI Vocabulary Engine</span>
          </div>
          <h2 className="text-lg font-bold tracking-tight text-white">
            Tạo thẻ từ vựng thông minh
          </h2>
          <p className="text-xs text-indigo-100/90 mt-1 leading-relaxed">
            Gemini sẽ phân tích và tạo thẻ từ chuẩn IPA, ngữ cảnh thực tế, ví dụ sinh động và mẹo nhớ lâu.
          </p>
        </div>
        <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-violet-500/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Preset Topics */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          1. Chọn chủ đề gợi ý:
        </label>
        <div className="grid grid-cols-2 gap-2">
          {TOPIC_PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.id && !customTopic.trim();
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setSelectedPreset(preset.id);
                  setCustomTopic('');
                }}
                className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-2xs ring-1 ring-indigo-500/30'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="truncate">{preset.label}</span>
                {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Topic Input */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Hoặc tự nhập chủ đề theo sở thích của bạn:
        </label>
        <input
          type="text"
          value={customTopic}
          onChange={(e) => setCustomTopic(e.target.value)}
          placeholder="Ví dụ: Phỏng vấn xin visa, Đi siêu thị sắm Tết, Nấu ăn..."
          className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-800 placeholder:text-slate-400 shadow-2xs"
        />
      </div>

      {/* Level Selection */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          2. Trình độ mong muốn:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: 'A1-A2', title: 'A1-A2', sub: 'Cơ bản' },
              { id: 'B1-B2', title: 'B1-B2', sub: 'Trung cấp' },
              { id: 'C1-C2', title: 'C1-C2', sub: 'Nâng cao' },
              { id: 'IELTS', title: 'IELTS', sub: 'Band 7+' },
              { id: 'TOEIC', title: 'TOEIC', sub: '750-900' },
              { id: 'Business', title: 'Business', sub: 'Đi làm' },
            ] as const
          ).map((lvl) => (
            <button
              key={lvl.id}
              type="button"
              onClick={() => setLevel(lvl.id)}
              className={`p-2.5 rounded-2xl border text-center transition-all ${
                level === lvl.id
                  ? 'border-indigo-600 bg-indigo-600 text-white font-bold shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold">{lvl.title}</div>
              <div className={`text-[10px] ${level === lvl.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                {lvl.sub}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Card Count */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          3. Số lượng thẻ muốn học hôm nay:
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[4, 6, 8, 10].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setCardCount(num)}
              className={`py-2.5 rounded-2xl border text-center text-xs font-bold transition-all ${
                cardCount === num
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              {num} thẻ
            </button>
          ))}
        </div>
      </div>

      {/* Error & Success Messages */}
      {error && (
        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Generate Action Buttons */}
      <div className="space-y-2 pt-1">
        <button
          type="button"
          disabled={loading}
          onClick={handleGenerate}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 active:scale-98 transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Gemini AI đang soạn thẻ bài học...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Tạo bộ thẻ với Gemini AI</span>
            </>
          )}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={handleGenerateInstant}
          className="w-full py-2.5 px-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
        >
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Tạo ngay từ kho từ chuẩn (Tức thì / Không cần chờ AI)</span>
        </button>
      </div>
    </div>
  );
};
