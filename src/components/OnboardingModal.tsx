import React, { useState } from 'react';
import {
  X,
  Target,
  Sparkles,
  Check,
  Compass,
  Zap,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Loader2,
} from 'lucide-react';
import { EnglishLevel, UserPreferences } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose?: () => void;
  preferences: UserPreferences;
  onSavePreferences: (newPrefs: UserPreferences, shouldGenerateNewDeck: boolean) => Promise<void>;
  isGeneratingStarterDeck?: boolean;
}

export const LEVEL_OPTIONS: {
  id: EnglishLevel;
  badge: string;
  title: string;
  description: string;
  tag: string;
}[] = [
  {
    id: 'A1-A2',
    badge: 'A1-A2',
    title: 'Căn bản / Mới bắt đầu',
    description: 'Từ vựng sinh hoạt hằng ngày, phát âm IPA nền tảng, câu ví dụ ngắn gọn dễ nhớ.',
    tag: 'Beginner',
  },
  {
    id: 'B1-B2',
    badge: 'B1-B2',
    title: 'Trung cấp (Giao tiếp tốt)',
    description: 'Từ vựng công sở, giao tiếp xã hội, diễn đạt tự nhiên, collocation và ngữ cảnh phong phú.',
    tag: 'Intermediate',
  },
  {
    id: 'C1-C2',
    badge: 'C1-C2',
    title: 'Nâng cao / Chuyên sâu',
    description: 'Từ vựng học thuật, thành ngữ (idioms) bản xứ, sắc thái nghĩa sâu và từ hiếm gặp.',
    tag: 'Advanced',
  },
  {
    id: 'IELTS',
    badge: 'IELTS',
    title: 'Luyện thi IELTS (6.5 - 8.0+)',
    description: 'Tập trung từ vựng Academic, Collocation đắt giá cho Speaking & Writing, Paraphrase.',
    tag: 'Exam Prep',
  },
  {
    id: 'TOEIC',
    badge: 'TOEIC',
    title: 'Luyện thi TOEIC (650 - 900+)',
    description: 'Từ vựng hợp đồng, nhân sự, hội nghị, du lịch công tác, tài chính và thương mại.',
    tag: 'Exam Prep',
  },
  {
    id: 'Business',
    badge: 'Business',
    title: 'Tiếng Anh Thương Mại & Đi làm',
    description: 'Thuyết trình, đàm phán, viết email chuyên nghiệp, làm việc với sếp và đối tác nước ngoài.',
    tag: 'Career',
  },
];

export const TOPIC_OPTIONS = [
  { id: 'daily', icon: '🗣️', label: 'Giao tiếp hằng ngày', query: 'Giao tiếp đời sống thường nhật & kết bạn' },
  { id: 'work', icon: '💼', label: 'Công sở & Sự nghiệp', query: 'Giao tiếp công sở, phỏng vấn, họp hành & email' },
  { id: 'travel', icon: '✈️', label: 'Du lịch & Sân bay', query: 'Du lịch quốc tế, đặt phòng, sân bay & di chuyển' },
  { id: 'tech', icon: '💻', label: 'Công nghệ & IT', query: 'Thuật ngữ công nghệ thông tin, lập trình & phần mềm' },
  { id: 'business', icon: '📈', label: 'Kinh doanh & Tài chính', query: 'Kinh doanh, tài chính, đàm phán & quản lý' },
  { id: 'social', icon: '☕', label: 'Nhà hàng & Đời sống', query: 'Ẩm thực, gọi món nhà hàng cafe, sở thích & văn hóa' },
  { id: 'health', icon: '🌿', label: 'Sức khỏe & Lối sống', query: 'Sức khỏe, thể thao, chế độ ăn uống & tinh thần' },
  { id: 'idioms', icon: '💬', label: 'Thành ngữ & Tiếng lóng', query: 'Thành ngữ tự nhiên và tiếng lóng người bản ngữ' },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences,
  isGeneratingStarterDeck = false,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<EnglishLevel>(preferences.level || 'B1-B2');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    preferences.topics && preferences.topics.length > 0 ? preferences.topics : ['daily', 'work']
  );
  const [dailyGoal, setDailyGoal] = useState<number>(preferences.dailyGoal || 6);
  const [createDeckNow, setCreateDeckNow] = useState(true);
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const toggleTopic = (topicId: string) => {
    setSelectedTopics((prev) => {
      if (prev.includes(topicId)) {
        if (prev.length === 1) return prev;
        return prev.filter((t) => t !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const newPrefs: UserPreferences = {
        level: selectedLevel,
        topics: selectedTopics,
        dailyGoal,
        isOnboarded: true,
      };
      await onSavePreferences(newPrefs, createDeckNow);
      if (onClose) onClose();
    } catch (e) {
      console.error('Error saving onboarding prefs', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Lộ trình học tập & Trình độ
              </h3>
              <p className="text-xs text-slate-500">
                Tập trung đúng độ khó và chủ đề theo năng lực
              </p>
            </div>
          </div>
          {onClose && preferences.isOnboarded && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-5 text-slate-800">
          {/* Welcome Intro */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-violet-50 border border-indigo-100/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Cá nhân hóa với Gemini AI</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chọn trình độ tiếng Anh hiện tại và những chủ đề bạn muốn rèn luyện. Gemini sẽ thiết kế các thẻ Flashcard và ví dụ chuẩn xác nhất cho bạn.
            </p>
          </div>

          {/* Section 1: Select Proficiency Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>1. Chọn trình độ hiện tại</span>
              </label>
              <span className="text-xs font-bold text-indigo-600">
                {selectedLevel}
              </span>
            </div>

            <div className="space-y-2">
              {LEVEL_OPTIONS.map((lvl) => {
                const isSelected = selectedLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-indigo-50/60 border-indigo-600 shadow-xs ring-1 ring-indigo-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {lvl.title}
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {lvl.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                        {lvl.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Target Topics & Genres */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>2. Thể loại & Chủ đề muốn học</span>
              </label>
              <span className="text-xs text-slate-500">
                Đã chọn {selectedTopics.length} chủ đề
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {TOPIC_OPTIONS.map((tpc) => {
                const isChecked = selectedTopics.includes(tpc.id);
                return (
                  <button
                    key={tpc.id}
                    type="button"
                    onClick={() => toggleTopic(tpc.id)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2 transition-all ${
                      isChecked
                        ? 'bg-indigo-50/80 border-indigo-600 text-indigo-950 font-bold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-base shrink-0">{tpc.icon}</span>
                    <span className="text-xs leading-snug flex-1 truncate">
                      {tpc.label}
                    </span>
                    {isChecked && (
                      <Check className="w-4 h-4 text-indigo-600 shrink-0 stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Daily Target */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>3. Mục tiêu học mỗi ngày</span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              {[
                { count: 5, label: 'Thư thả', desc: '5 từ/ngày' },
                { count: 8, label: 'Chuẩn', desc: '8 từ/ngày' },
                { count: 12, label: 'Bứt tốc', desc: '12 từ/ngày' },
              ].map((item) => {
                const isSelected = dailyGoal === item.count;
                return (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setDailyGoal(item.count)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <p className="text-sm font-bold">
                      {item.desc}
                    </p>
                    <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {item.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt checkbox: Generate customized deck immediately */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 cursor-pointer">
            <input
              id="createDeckNow"
              type="checkbox"
              checked={createDeckNow}
              onChange={(e) => setCreateDeckNow(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
            />
            <label htmlFor="createDeckNow" className="text-xs text-slate-600 cursor-pointer flex-1">
              Dùng Gemini AI tạo ngay bộ thẻ khởi đầu theo đúng trình độ{' '}
              <strong className="text-slate-900 font-bold">{selectedLevel}</strong> này
            </label>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <button
            onClick={handleSave}
            disabled={saving || isGeneratingStarterDeck}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 active:scale-98 transition-all"
          >
            {saving || isGeneratingStarterDeck ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang lưu lộ trình & tạo thẻ với Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Bắt đầu học ngay</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
