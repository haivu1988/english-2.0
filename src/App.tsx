import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { FlashcardViewer } from './components/FlashcardViewer';
import { DailyReviewSection } from './components/DailyReviewSection';
import { GenerateDeckSection } from './components/GenerateDeckSection';
import { DeckLibrarySection } from './components/DeckLibrarySection';
import { PracticeSentenceModal } from './components/PracticeSentenceModal';
import { WordDeepDiveModal } from './components/WordDeepDiveModal';
import { CloudAccountModal } from './components/CloudAccountModal';
import { OnboardingModal, TOPIC_OPTIONS } from './components/OnboardingModal';
import { AccountSection } from './components/AccountSection';
import { getCuratedFallbackCards } from './data/curatedVocabLibrary';
import { Deck, Flashcard, MasteryLevel, UserProgress, UserPreferences, EnglishLevel } from './types';
import {
  loadSavedCards,
  saveCards,
  loadSavedDecks,
  saveDecks,
  loadUserProgress,
  saveUserProgress,
  loadUserPreferences,
  saveUserPreferences,
} from './utils/storage';
import {
  auth,
  onAuthStateChanged,
  signOut,
  getRedirectResult,
  User,
} from './lib/firebase';
import {
  loadUserCloudData,
  seedUserCloudData,
  saveAllCardsToCloud,
  saveUserDeckToCloud,
  saveUserProgressToCloud,
  saveUserPreferencesToCloud,
} from './services/cloudSync';
import {
  BookOpen,
  Sparkles,
  Plus,
  Flame,
  CheckCircle2,
  ChevronRight,
  Layers,
  Wand2,
  Loader2,
  ArrowRight,
} from 'lucide-react';

const FEATURED_TOPICS = [
  { id: 'daily', title: 'Giao tiếp hàng ngày', icon: '🗣️', level: 'B1', category: 'daily', desc: 'Từ vựng đời sống thường nhật & biểu đạt tự nhiên' },
  { id: 'ielts', title: 'IELTS Band 7.5+', icon: '🎯', level: 'C1', category: 'ielts', desc: 'Từ vựng học thuật & Collocation nâng cao' },
  { id: 'work', title: 'Tiếng Anh Công sở', icon: '💼', level: 'B2', category: 'work', desc: 'Phỏng vấn, họp hành, đàm phán & viết email' },
  { id: 'travel', title: 'Du lịch & Sân bay', icon: '✈️', level: 'A2-B1', category: 'travel', desc: 'Khách sạn, sân bay, đặt vé & di chuyển' },
  { id: 'tech', title: 'Công nghệ & IT', icon: '💻', level: 'B2', category: 'tech', desc: 'Phần mềm, lập trình & thuật ngữ chuyên ngành' },
  { id: 'cafe', title: 'Ẩm thực & Nhà hàng', icon: '☕', level: 'A1-A2', category: 'cafe', desc: 'Gọi món, hương vị món ăn & trải nghiệm dịch vụ' },
];

export default function App() {
  const [cards, setCards] = useState<Flashcard[]>(() => loadSavedCards());
  const [decks, setDecks] = useState<Deck[]>(() => loadSavedDecks());
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());
  const [preferences, setPreferences] = useState<UserPreferences>(() => loadUserPreferences());
  const [activeDeckId, setActiveDeckId] = useState<string>(() => {
    const loadedDecks = loadSavedDecks();
    return loadedDecks[0]?.id || 'deck-daily-today';
  });
  const [activeTab, setActiveTab] = useState<NavTab>('learn');

  // Quick Home AI Generator input
  const [quickTopicInput, setQuickTopicInput] = useState('');
  const [isQuickGenerating, setIsQuickGenerating] = useState(false);

  // Firebase Auth & Cloud Sync States
  const [user, setUser] = useState<User | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(() => !loadUserPreferences().isOnboarded);
  const [isGeneratingStarterDeck, setIsGeneratingStarterDeck] = useState(false);
  const isInitialSyncDone = useRef(false);

  // Modals
  const [practiceCard, setPracticeCard] = useState<Flashcard | null>(null);
  const [deepDiveCard, setDeepDiveCard] = useState<Flashcard | null>(null);

  // 1. Listen for Auth Changes & initialize session
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch((err) => {
        console.warn('Redirect sign-in notice:', err);
      });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsSyncing(true);
        try {
          const cloudData = await loadUserCloudData(firebaseUser.uid);
          if (cloudData.hasCloudData) {
            if (cloudData.cards.length > 0) setCards(cloudData.cards);
            if (cloudData.decks.length > 0) {
              setDecks(cloudData.decks);
              setActiveDeckId(cloudData.decks[0]?.id || 'deck-daily-today');
            }
            if (cloudData.progress) setProgress(cloudData.progress);
            if (cloudData.preferences) {
              setPreferences(cloudData.preferences);
              saveUserPreferences(cloudData.preferences);
              if (!cloudData.preferences.isOnboarded) {
                setIsOnboardingOpen(true);
              }
            }
          } else {
            await seedUserCloudData(
              firebaseUser.uid,
              cards,
              decks,
              progress,
              preferences
            );
          }
          setLastSyncedAt(new Date());
          isInitialSyncDone.current = true;
        } catch (err) {
          console.warn('Initial cloud sync warning:', err);
        } finally {
          setIsSyncing(false);
        }
      } else {
        setUser(null);
        setIsSyncing(false);
        setLastSyncedAt(null);
        isInitialSyncDone.current = false;
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Sign out notice:', err);
    }
    setUser(null);
    setIsSyncing(false);
    setLastSyncedAt(null);
    isInitialSyncDone.current = false;
  };

  // 2. Sync to localStorage
  useEffect(() => {
    saveCards(cards);
  }, [cards]);

  useEffect(() => {
    saveDecks(decks);
  }, [decks]);

  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  // 3. Debounced cloud sync when data updates
  useEffect(() => {
    if (!user || !isInitialSyncDone.current) return;
    const timer = setTimeout(async () => {
      try {
        await saveAllCardsToCloud(user.uid, cards);
        setLastSyncedAt(new Date());
      } catch (err) {
        console.error('Failed to sync cards to cloud:', err);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [cards, user]);

  useEffect(() => {
    if (!user || !isInitialSyncDone.current) return;
    const timer = setTimeout(async () => {
      try {
        await saveUserProgressToCloud(user.uid, progress);
        setLastSyncedAt(new Date());
      } catch (err) {
        console.error('Failed to sync progress to cloud:', err);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [progress, user]);

  // Manual Force Sync function
  const handleManualSync = async () => {
    if (!user) return;
    setIsSyncing(true);
    try {
      await saveAllCardsToCloud(user.uid, cards);
      for (const deck of decks) {
        await saveUserDeckToCloud(user.uid, deck);
      }
      await saveUserProgressToCloud(user.uid, progress);
      setLastSyncedAt(new Date());
    } finally {
      setIsSyncing(false);
    }
  };

  // Active deck cards
  const activeDeck = decks.find((d) => d.id === activeDeckId) || decks[0];
  const activeDeckCards = cards.filter((c) => c.deckId === activeDeck?.id);

  // Grading handler
  const handleGradeCard = (cardId: string, level: MasteryLevel) => {
    setCards((prevCards) =>
      prevCards.map((c) => {
        if (c.id === cardId) {
          return {
            ...c,
            masteryLevel: level,
            reviewCount: (c.reviewCount || 0) + 1,
            lastReviewed: new Date().toISOString(),
          };
        }
        return c;
      })
    );

    setProgress((prev) => ({
      ...prev,
      totalCardsReviewed: prev.totalCardsReviewed + 1,
      todayCardsReviewed: prev.todayCardsReviewed + 1,
    }));
  };

  // Handle saving personal preferences & starter deck generation
  const handleSavePreferences = async (
    newPrefs: UserPreferences,
    shouldGenerateNewDeck: boolean
  ) => {
    setPreferences(newPrefs);
    saveUserPreferences(newPrefs);

    setProgress((prev) => {
      const updated = { ...prev, dailyGoal: newPrefs.dailyGoal };
      saveUserProgress(updated);
      return updated;
    });

    if (user) {
      await saveUserPreferencesToCloud(user.uid, newPrefs);
    }

    if (shouldGenerateNewDeck) {
      setIsGeneratingStarterDeck(true);
      try {
        const primaryTopicId = newPrefs.topics[0] || 'daily';
        const topicMeta = TOPIC_OPTIONS.find((t) => t.id === primaryTopicId);
        const topicQuery = topicMeta ? topicMeta.query : 'Giao tiếp hằng ngày';

        let data: { topicTitle?: string; cards?: Partial<Flashcard>[] } | null = null;

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 12000);

          const response = await fetch('/api/generate-cards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
              topic: topicQuery,
              level: newPrefs.level,
              count: newPrefs.dailyGoal || 6,
              existingWords: cards.map((c) => c.word),
            }),
          });
          clearTimeout(timeoutId);

          if (response.ok) {
            data = await response.json();
          }
        } catch (apiErr) {
          console.warn('API call failed during starter deck, using curated library:', apiErr);
        }

        if (!data || !data.cards || data.cards.length === 0) {
          data = getCuratedFallbackCards(
            newPrefs.level,
            topicQuery,
            newPrefs.dailyGoal || 6,
            cards.map((c) => c.word)
          );
        }

        const todayStr = new Date().toISOString().split('T')[0];
        const deckId = `deck-${Date.now()}`;

        const newDeck: Deck = {
          id: deckId,
          title: data.topicTitle || `${topicMeta?.label || 'Từ vựng'} (${newPrefs.level})`,
          topic: topicQuery,
          level: newPrefs.level,
          createdAt: new Date().toISOString(),
          cardCount: data.cards?.length || 0,
          isDaily: true,
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

        setDecks((prev) => [newDeck, ...prev]);
        setCards((prev) => [...newCards, ...prev]);
        setActiveDeckId(deckId);
        setActiveTab('learn');

        if (user) {
          await saveUserDeckToCloud(user.uid, newDeck);
          await saveAllCardsToCloud(user.uid, [...cards, ...newCards]);
        }
      } catch (err) {
        console.error('Failed to create personalized deck:', err);
      } finally {
        setIsGeneratingStarterDeck(false);
      }
    }
  };

  const handleDeckCreated = (newDeck: Deck, newCards: Flashcard[]) => {
    setDecks((prev) => [newDeck, ...prev]);
    setCards((prev) => [...newCards, ...prev]);
    setActiveDeckId(newDeck.id);
    setActiveTab('learn');
  };

  const handleSelectDeck = (deckId: string) => {
    setActiveDeckId(deckId);
    setActiveTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteDeck = (deckId: string) => {
    const remainingDecks = decks.filter((d) => d.id !== deckId);
    if (remainingDecks.length === 0) return;
    setDecks(remainingDecks);
    setCards((prev) => prev.filter((c) => c.deckId !== deckId));
    if (activeDeckId === deckId) {
      setActiveDeckId(remainingDecks[0].id);
    }
  };

  // Quick Curated Deck Loading
  const handleLoadCuratedDeck = (topicItem: typeof FEATURED_TOPICS[0]) => {
    const existing = decks.find((d) => d.topic.toLowerCase().includes(topicItem.title.toLowerCase()));
    if (existing) {
      setActiveDeckId(existing.id);
      setActiveTab('learn');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const fallbackData = getCuratedFallbackCards(
      topicItem.level,
      topicItem.title,
      6,
      cards.map((c) => c.word)
    );

    const todayStr = new Date().toISOString().split('T')[0];
    const deckId = `deck-${Date.now()}`;

    const newDeck: Deck = {
      id: deckId,
      title: `${topicItem.icon} ${topicItem.title}`,
      topic: topicItem.desc,
      level: topicItem.level as EnglishLevel,
      createdAt: new Date().toISOString(),
      cardCount: (fallbackData.cards || []).length,
      isDaily: false,
      dateStr: todayStr,
    };

    const newCards: Flashcard[] = (fallbackData.cards || []).map(
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

    setDecks((prev) => [newDeck, ...prev]);
    setCards((prev) => [...newCards, ...prev]);
    setActiveDeckId(deckId);
    setActiveTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick Generate with AI from Home input
  const handleQuickGenerate = async (topicOverride?: string) => {
    const topicToGen = (topicOverride || quickTopicInput).trim();
    if (!topicToGen) return;

    setIsQuickGenerating(true);
    const todayStr = new Date().toISOString().split('T')[0];
    const deckId = `deck-${Date.now()}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const response = await fetch('/api/generate-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          topic: topicToGen,
          level: preferences.level || 'B1-B2',
          count: 6,
          existingWords: cards.map((c) => c.word),
        }),
      });
      clearTimeout(timeoutId);

      let data: any = null;
      if (response.ok) {
        data = await response.json();
      }

      if (!data || !data.cards || data.cards.length === 0) {
        data = getCuratedFallbackCards(
          preferences.level || 'B1-B2',
          topicToGen,
          6,
          cards.map((c) => c.word)
        );
      }

      const newDeck: Deck = {
        id: deckId,
        title: data.topicTitle || `Thẻ AI: ${topicToGen}`,
        topic: topicToGen,
        level: preferences.level || 'B1-B2',
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

      setDecks((prev) => [newDeck, ...prev]);
      setCards((prev) => [...newCards, ...prev]);
      setActiveDeckId(deckId);
      setQuickTopicInput('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.warn('Quick generate fallback triggered:', err);
      const fallbackData = getCuratedFallbackCards(
        preferences.level || 'B1-B2',
        topicToGen,
        6,
        cards.map((c) => c.word)
      );

      const newDeck: Deck = {
        id: deckId,
        title: `Thẻ chuẩn: ${topicToGen}`,
        topic: topicToGen,
        level: preferences.level || 'B1-B2',
        createdAt: new Date().toISOString(),
        cardCount: fallbackData.cards.length,
        isDaily: false,
        dateStr: todayStr,
      };

      const newCards: Flashcard[] = fallbackData.cards.map((c: any, index: number) => ({
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
      }));

      setDecks((prev) => [newDeck, ...prev]);
      setCards((prev) => [...newCards, ...prev]);
      setActiveDeckId(deckId);
      setQuickTopicInput('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsQuickGenerating(false);
    }
  };

  const needsReviewCount = cards.filter(
    (c) => c.masteryLevel === 'learning' || c.masteryLevel === 'review'
  ).length;

  const masteredCount = cards.filter((c) => c.masteryLevel === 'mastered').length;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex justify-center selection:bg-indigo-100 selection:text-indigo-900">
      {/* Mobile container constraint: max-w-lg matching modern mobile & tablet viewports */}
      <div className="w-full max-w-lg min-h-screen bg-white border-x border-slate-200/80 shadow-2xl flex flex-col relative pb-24">
        {/* Sticky App Header */}
        <Header
          progress={progress}
          activeDeckTitle={activeDeck?.title}
          user={user}
          isSyncing={isSyncing}
          onOpenCloudModal={() => setIsCloudModalOpen(true)}
          userLevel={preferences.level}
          onOpenPreferences={() => setIsOnboardingOpen(true)}
        />

        {/* Tab 1: Learn Active Deck */}
        {activeTab === 'learn' && (
          <main className="flex-1 flex flex-col space-y-4 pt-2">
            {/* Horizontal Active Deck Selector Strip */}
            <div className="px-4">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {decks.map((deck) => {
                  const isSelected = deck.id === activeDeck?.id;
                  const deckCardCount = cards.filter((c) => c.deckId === deck.id).length;
                  return (
                    <button
                      key={deck.id}
                      onClick={() => handleSelectDeck(deck.id)}
                      className={`px-3 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      <span className="truncate max-w-[120px]">{deck.title}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-500'
                        }`}
                      >
                        {deckCardCount}
                      </span>
                    </button>
                  );
                })}

                <button
                  onClick={() => setActiveTab('generate')}
                  className="px-3 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center gap-1 shrink-0 border border-indigo-200/60"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Bộ mới</span>
                </button>
              </div>
            </div>

            {/* Core Interactive Flashcard Section */}
            <FlashcardViewer
              cards={activeDeckCards.length > 0 ? activeDeckCards : cards}
              onGradeCard={handleGradeCard}
              onOpenPractice={(card) => setPracticeCard(card)}
              onOpenDeepDive={(card) => setDeepDiveCard(card)}
            />

            {/* Quick Stats Pill Strip */}
            <div className="px-4">
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                <div className="text-center">
                  <div className="text-lg font-extrabold text-emerald-600 leading-tight">
                    {masteredCount}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">
                    Đã thuộc
                  </div>
                </div>
                <div className="text-center border-x border-slate-200">
                  <div className="text-lg font-extrabold text-amber-600 leading-tight">
                    {needsReviewCount}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">
                    Cần ôn
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-extrabold text-indigo-600 leading-tight">
                    {cards.length}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">
                    Tổng từ
                  </div>
                </div>
              </div>
            </div>

            {/* Fast Inline AI Generator Card */}
            <div className="px-4">
              <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/80 border border-indigo-100 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Tạo bộ từ vựng tức thì với AI
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Nhập chủ đề bất kỳ để Gemini AI tạo thẻ mới
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={quickTopicInput}
                    onChange={(e) => setQuickTopicInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleQuickGenerate();
                    }}
                    placeholder="VD: Phỏng vấn xin việc, Đặt phòng khách sạn..."
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-2xs"
                    disabled={isQuickGenerating}
                  />
                  <button
                    onClick={() => handleQuickGenerate()}
                    disabled={isQuickGenerating || !quickTopicInput.trim()}
                    className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/20 active:scale-95 transition-all shrink-0"
                  >
                    {isQuickGenerating ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Wand2 className="w-3.5 h-3.5" />
                    )}
                    <span>Tạo thẻ</span>
                  </button>
                </div>

                {/* Quick Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
                  <span className="text-[10px] text-slate-400 font-medium shrink-0">Gợi ý:</span>
                  {['Phỏng vấn', 'IELTS Speaking', 'Du lịch Nhật Bản', 'IT Tech'].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleQuickGenerate(chip)}
                      className="text-[10px] px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 font-medium shrink-0 shadow-2xs transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Curated Decks Collection Grid */}
            <div className="px-4 space-y-2.5 pb-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Bộ từ vựng gợi ý cho bạn
                </h3>
                <button
                  onClick={() => setActiveTab('library')}
                  className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-0.5"
                >
                  <span>Xem tất cả</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {FEATURED_TOPICS.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => handleLoadCuratedDeck(topic)}
                    className="p-3.5 rounded-3xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-2 group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{topic.icon}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {topic.level}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-2">
                        {topic.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-tight">
                        {topic.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-600 pt-1 border-t border-slate-100">
                      <span>Học ngay</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        )}

        {/* Tab 2: Daily Review */}
        {activeTab === 'review' && (
          <main className="flex-1 flex flex-col pt-2">
            <DailyReviewSection
              cards={cards}
              onGradeCard={handleGradeCard}
              onSwitchToLearn={() => setActiveTab('learn')}
            />
          </main>
        )}

        {/* Tab 3: Generate Daily Deck with Gemini AI */}
        {activeTab === 'generate' && (
          <main className="flex-1 flex flex-col pt-2">
            <GenerateDeckSection
              existingWords={cards.map((c) => c.word)}
              onDeckCreated={handleDeckCreated}
              userPreferences={preferences}
            />
          </main>
        )}

        {/* Tab 4: Library & Stats */}
        {activeTab === 'library' && (
          <main className="flex-1 flex flex-col pt-2">
            <DeckLibrarySection
              decks={decks}
              cards={cards}
              activeDeckId={activeDeckId}
              progress={progress}
              preferences={preferences}
              onSelectDeck={handleSelectDeck}
              onDeleteDeck={handleDeleteDeck}
              onOpenPreferences={() => setIsOnboardingOpen(true)}
            />
          </main>
        )}

        {/* Tab 5: Account & Authentication Management */}
        {activeTab === 'account' && (
          <main className="flex-1 flex flex-col pt-2">
            <AccountSection
              user={user}
              cardCount={cards.length}
              deckCount={decks.length}
              progress={progress}
              preferences={preferences}
              isSyncing={isSyncing}
              lastSyncedAt={lastSyncedAt}
              onManualSync={handleManualSync}
              onSignOut={handleSignOut}
              onOpenPreferences={() => setIsOnboardingOpen(true)}
            />
          </main>
        )}

        {/* Fixed Mobile Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          reviewCount={needsReviewCount}
          userAvatarUrl={user?.photoURL}
        />

        {/* Modals */}
        <PracticeSentenceModal
          card={practiceCard}
          onClose={() => setPracticeCard(null)}
        />

        <WordDeepDiveModal
          card={deepDiveCard}
          onClose={() => setDeepDiveCard(null)}
        />

        <CloudAccountModal
          isOpen={isCloudModalOpen}
          onClose={() => setIsCloudModalOpen(false)}
          user={user}
          cardCount={cards.length}
          deckCount={decks.length}
          progress={progress}
          preferences={preferences}
          isSyncing={isSyncing}
          lastSyncedAt={lastSyncedAt}
          onManualSync={handleManualSync}
          onSignOut={handleSignOut}
          onOpenPreferences={() => {
            setIsCloudModalOpen(false);
            setIsOnboardingOpen(true);
          }}
        />

        <OnboardingModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          preferences={preferences}
          onSavePreferences={handleSavePreferences}
          isGeneratingStarterDeck={isGeneratingStarterDeck}
        />
      </div>
    </div>
  );
}
