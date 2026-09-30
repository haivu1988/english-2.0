import React from 'react';
import { Flame, Cloud, RefreshCw, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { UserProgress } from '../types';
import { User } from '../lib/firebase';

interface HeaderProps {
  progress: UserProgress;
  activeDeckTitle?: string;
  user: User | null;
  isSyncing: boolean;
  onOpenCloudModal: () => void;
  userLevel?: string;
  onOpenPreferences?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  user,
  isSyncing,
  onOpenCloudModal,
  userLevel = 'B1-B2',
  onOpenPreferences,
}) => {
  const todayFormatted = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
  }).format(new Date());

  const goal = progress.dailyGoal || 6;
  const current = progress.todayCardsReviewed || 0;
  const progressPercent = Math.min(100, Math.round((current / goal) * 100));
  const isGoalReached = current >= goal;

  const displayName = user?.displayName
    ? user.displayName.split(' ')[0]
    : 'bạn';

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 transition-all shadow-xs">
      <div className="max-w-xl mx-auto px-4 py-2.5">
        {/* Main top bar */}
        <div className="flex items-center justify-between gap-3">
          {/* Left: User Avatar & Greeting */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={onOpenPreferences || onOpenCloudModal}
              className="relative group shrink-0"
              title="Cài đặt tài khoản & mục tiêu"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Avatar'}
                  className="w-10 h-10 rounded-2xl object-cover ring-2 ring-indigo-500/20 shadow-xs transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white font-bold flex items-center justify-center text-sm shadow-xs transition-transform group-hover:scale-105">
                  LF
                </div>
              )}
              {isSyncing && (
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center">
                  <RefreshCw className="w-2 h-2 text-white animate-spin" />
                </span>
              )}
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-semibold text-slate-900 truncate">
                  Chào {displayName} 👋
                </span>
                {onOpenPreferences && (
                  <button
                    onClick={onOpenPreferences}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/70 hover:bg-indigo-100 transition-colors shrink-0"
                    title="Bấm để đổi Trình độ & Chủ đề học"
                  >
                    {userLevel}
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-500 capitalize leading-tight">
                {todayFormatted}
              </p>
            </div>
          </div>

          {/* Right: Streak, Quick Google Login & Cloud Status */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Streak Counter */}
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-orange-600 shadow-2xs"
              title="Chuỗi ngày học liên tục"
            >
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
              <span className="text-xs font-bold text-orange-700">
                {progress.dailyStreak || 1} ngày
              </span>
            </div>

            {/* Quick Google Sign In button if not signed in */}
            {(!user || user.isAnonymous) && (
              <button
                onClick={onOpenCloudModal}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-50 border border-indigo-200 text-indigo-700 transition-all text-xs font-bold flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
                title="Đăng nhập nhanh với Google để sao lưu từ vựng"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="hidden sm:inline">Đăng nhập</span>
                <span className="sm:hidden">Google</span>
              </button>
            )}

            {/* Cloud Sync Status */}
            <button
              onClick={onOpenCloudModal}
              className={`p-1.5 rounded-xl border transition-all ${
                isSyncing
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                  : user && !user.isAnonymous
                  ? 'bg-slate-50 border-slate-200 text-emerald-600 hover:bg-slate-100'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
              }`}
              title={
                user && !user.isAnonymous
                  ? 'Đã đồng bộ đám mây với tài khoản Google'
                  : 'Bấm để đăng nhập và sao lưu dữ liệu'
              }
            >
              {isSyncing ? (
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
              ) : (
                <Cloud className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Daily Goal Strip */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            {isGoalReached ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            )}
            <span>
              Mục tiêu hôm nay:{' '}
              <strong className="text-slate-900 font-bold">{current}</strong> / {goal} từ
            </span>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-[140px] sm:max-w-[180px]">
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isGoalReached
                    ? 'bg-emerald-500'
                    : 'bg-gradient-to-r from-indigo-500 to-violet-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-500 shrink-0">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
