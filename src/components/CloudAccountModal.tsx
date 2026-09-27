import React from 'react';
import { X, Cloud } from 'lucide-react';
import { User } from '../lib/firebase';
import { UserProgress, UserPreferences } from '../types';
import { AccountSection } from './AccountSection';

interface CloudAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  cardCount: number;
  deckCount: number;
  progress: UserProgress;
  preferences?: UserPreferences;
  isSyncing: boolean;
  lastSyncedAt: Date | null;
  onManualSync: () => Promise<void>;
  onSignOut?: () => Promise<void> | void;
  onOpenPreferences?: () => void;
}

export const CloudAccountModal: React.FC<CloudAccountModalProps> = ({
  isOpen,
  onClose,
  user,
  cardCount,
  deckCount,
  progress,
  preferences,
  isSyncing,
  lastSyncedAt,
  onManualSync,
  onSignOut,
  onOpenPreferences,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header Bar */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
              <Cloud className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">
              Tài khoản & Đồng bộ đám mây
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto flex-1 pb-4">
          <AccountSection
            user={user}
            cardCount={cardCount}
            deckCount={deckCount}
            progress={progress}
            preferences={preferences}
            isSyncing={isSyncing}
            lastSyncedAt={lastSyncedAt}
            onManualSync={onManualSync}
            onSignOut={onSignOut}
            onOpenPreferences={() => {
              onClose();
              if (onOpenPreferences) onOpenPreferences();
            }}
          />
        </div>
      </div>
    </div>
  );
};
