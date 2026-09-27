import React from 'react';
import { Layers, RotateCcw, Sparkles, BookMarked, User } from 'lucide-react';

export type NavTab = 'learn' | 'review' | 'generate' | 'library' | 'account';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  reviewCount: number;
  userAvatarUrl?: string | null;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  reviewCount,
  userAvatarUrl,
}) => {
  const tabs = [
    {
      id: 'learn' as NavTab,
      label: 'Học từ',
      icon: Layers,
    },
    {
      id: 'review' as NavTab,
      label: 'Ôn tập',
      icon: RotateCcw,
      badge: reviewCount > 0 ? reviewCount : undefined,
    },
    {
      id: 'generate' as NavTab,
      label: 'Tạo thẻ AI',
      icon: Sparkles,
      highlight: true,
    },
    {
      id: 'library' as NavTab,
      label: 'Bộ thẻ',
      icon: BookMarked,
    },
    {
      id: 'account' as NavTab,
      label: 'Tài khoản',
      icon: User,
      avatar: userAvatarUrl,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-200/80 safe-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto px-3 py-1.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.highlight) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center py-1 px-2.5 transition-all duration-200 ${
                  isActive ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                <div
                  className={`w-11 h-11 -mt-4 rounded-2xl flex items-center justify-center shadow-md transition-all ${
                    isActive
                      ? 'bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 text-white shadow-indigo-500/30'
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200/60'
                  }`}
                >
                  <Sparkles className="w-5 h-5 fill-current/20" />
                </div>
                <span
                  className={`text-[10px] font-semibold mt-1 tracking-tight ${
                    isActive ? 'text-indigo-600' : 'text-slate-500'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-indigo-600 font-semibold'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <div className="relative">
                {tab.avatar ? (
                  <img
                    src={tab.avatar}
                    alt="User"
                    className={`w-5 h-5 rounded-full object-cover transition-transform ${
                      isActive ? 'ring-2 ring-indigo-600 scale-110' : 'opacity-70'
                    }`}
                  />
                ) : (
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? 'scale-110 stroke-[2.3]' : 'stroke-[1.8]'
                    }`}
                  />
                )}
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 rounded-full bg-rose-500 text-[10px] text-white font-bold flex items-center justify-center shadow-xs animate-bounce">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-indigo-600 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
