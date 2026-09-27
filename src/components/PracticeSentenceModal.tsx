import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, AlertCircle, Volume2, Loader2 } from 'lucide-react';
import { Flashcard, SentenceCheckResult } from '../types';
import { speakEnglish } from '../utils/speech';

interface PracticeSentenceModalProps {
  card: Flashcard | null;
  onClose: () => void;
}

export const PracticeSentenceModal: React.FC<PracticeSentenceModalProps> = ({
  card,
  onClose,
}) => {
  const [sentence, setSentence] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SentenceCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!card) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sentence.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/check-sentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: card.word,
          userSentence: sentence.trim(),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Lỗi kiểm tra câu từ Gemini');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Không thể kết nối với Gemini');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Luyện đặt câu với Gemini AI
              </h3>
              <p className="text-xs text-slate-500">
                Từ khóa: <strong className="text-indigo-600 font-bold">{card.word}</strong> ({card.vietnameseMeaning})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Hãy viết một câu tiếng Anh sử dụng &quot;{card.word}&quot;:
              </label>
              <textarea
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                placeholder={`Ví dụ: When I feel overwhelmed, I like to...`}
                rows={3}
                className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-800 placeholder:text-slate-400 transition-all resize-none shadow-2xs"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !sentence.trim()}
              className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 active:scale-98 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Gemini đang chấm điểm & nhận xét...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Chấm câu với Gemini AI</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {result && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  {result.isCorrect ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Câu đúng & tự nhiên</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Cần chỉnh sửa</span>
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-slate-800 border border-slate-200">
                  Điểm: {result.score}/10
                </div>
              </div>

              {/* Correction */}
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Câu chuẩn:
                </p>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-xs font-bold text-slate-900 italic">
                    &ldquo;{result.correction}&rdquo;
                  </p>
                  <button
                    onClick={() => speakEnglish(result.correction)}
                    className="p-1 text-indigo-600 hover:text-indigo-800"
                    title="Nghe câu chuẩn"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Explanation in Vietnamese */}
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Nhận xét của Gemini:
                </p>
                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                  {result.explanation}
                </p>
              </div>

              {/* Better alternative */}
              {result.betterAlternative && (
                <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                  <p className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Cách nói tự nhiên hơn của người bản xứ:</span>
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-slate-800 italic">
                      &ldquo;{result.betterAlternative}&rdquo;
                    </p>
                    <button
                      onClick={() => speakEnglish(result.betterAlternative)}
                      className="p-1 text-slate-500 hover:text-indigo-600"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
