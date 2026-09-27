import React, { useEffect, useState } from 'react';
import { X, Sparkles, AlertTriangle, MessageSquare, BookOpen, Loader2, Volume2 } from 'lucide-react';
import { Flashcard, WordDeepDiveResult } from '../types';
import { speakEnglish } from '../utils/speech';

interface WordDeepDiveModalProps {
  card: Flashcard | null;
  onClose: () => void;
}

export const WordDeepDiveModal: React.FC<WordDeepDiveModalProps> = ({
  card,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WordDeepDiveResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!card) return;

    let isMounted = true;
    setLoading(true);
    setError(null);
    setData(null);

    fetch('/api/word-deep-dive', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        word: card.word,
        meaning: card.vietnameseMeaning,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải thông tin từ Gemini');
        return res.json();
      })
      .then((resData) => {
        if (isMounted) setData(resData);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Lỗi kết nối');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [card]);

  if (!card) return null;

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
                Phân tích sâu ngữ cảnh từ vựng
              </h3>
              <p className="text-xs text-slate-500">
                <strong className="text-indigo-600 font-bold">{card.word}</strong>{' '}
                <span className="font-mono text-[11px] text-slate-400">{card.phonetic}</span>
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
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {loading && (
            <div className="p-8 text-center flex flex-col items-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <p className="text-slate-500 font-medium">
                Gemini AI đang phân tích gia đình từ, ngữ cảnh và lỗi sai phổ biến...
              </p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700">
              <p className="font-bold">Không thể tải phân tích chi tiết</p>
              <p className="mt-1 text-slate-500">{error}</p>
            </div>
          )}

          {data && (
            <div className="space-y-3">
              {/* Etymology / Origin */}
              {data.etymology && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Nguồn gốc từ (Gốc từ giúp nhớ lâu):</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{data.etymology}</p>
                </div>
              )}

              {/* Word Family */}
              {data.wordFamily && data.wordFamily.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-700 mb-1.5">
                    Họ hàng của từ (Word Family):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {data.wordFamily.map((wf, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium shadow-2xs"
                      >
                        {wf}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Pitfalls / Mistakes */}
              {data.commonMistakes && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Lỗi người Việt hay gặp khi dùng từ này:</span>
                  </div>
                  <p className="text-amber-800 leading-relaxed">{data.commonMistakes}</p>
                </div>
              )}

              {/* Natural Dialog Example */}
              {data.dialogueExample && data.dialogueExample.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/70 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-950 mb-1">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Hội thoại thực tế đời thường:</span>
                  </div>
                  {data.dialogueExample.map((line, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-indigo-100 flex items-center justify-between"
                    >
                      <p className="text-slate-800 italic">{line}</p>
                      <button
                        onClick={() => speakEnglish(line)}
                        className="p-1 text-slate-400 hover:text-indigo-600 ml-2 shrink-0"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
