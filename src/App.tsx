import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Play, RotateCcw, Sparkles, Check, Info, Award, Star, BookOpen, Home } from 'lucide-react';

// 単語データのインターフェース
interface WordData {
  id: string;
  japanese: string;
  english: string;
  level: 'elementary' | 'junior' | 'high' | 'daily';
}

// 収録英単語リスト (小学生〜高校生・日常会話レベルの代表的な54単語)
const WORD_LIST: WordData[] = [
  // --- 7文字以下 (little) ---
  { id: 'elem-01', japanese: '犬', english: 'dog', level: 'elementary' },
  { id: 'elem-02', japanese: '猫', english: 'cat', level: 'elementary' },
  { id: 'elem-03', japanese: '鳥', english: 'bird', level: 'elementary' },
  { id: 'elem-04', japanese: 'リンゴ', english: 'apple', level: 'elementary' },
  { id: 'elem-05', japanese: '本', english: 'book', level: 'elementary' },
  { id: 'elem-06', japanese: '学校', english: 'school', level: 'elementary' },
  { id: 'elem-07', japanese: '友達', english: 'friend', level: 'elementary' },
  { id: 'elem-08', japanese: '家族', english: 'family', level: 'elementary' },
  { id: 'elem-09', japanese: '水', english: 'water', level: 'elementary' },
  { id: 'elem-10', japanese: '家', english: 'house', level: 'elementary' },
  { id: 'elem-11', japanese: '歌う', english: 'sing', level: 'elementary' },
  { id: 'elem-12', japanese: '走る', english: 'run', level: 'elementary' },
  { id: 'elem-13', japanese: '幸せな', english: 'happy', level: 'elementary' },
  { id: 'elem-14', japanese: 'くだもの', english: 'fruit', level: 'elementary' },
  
  { id: 'jhs-01', japanese: '勉強する', english: 'study', level: 'junior' },
  { id: 'jhs-02', japanese: '図書館', english: 'library', level: 'junior' },
  { id: 'jhs-03', japanese: '科学', english: 'science', level: 'junior' },
  { id: 'jhs-04', japanese: '歴史', english: 'history', level: 'junior' },
  { id: 'jhs-05', japanese: '楽しむ', english: 'enjoy', level: 'junior' },
  { id: 'jhs-06', japanese: '自転車', english: 'bicycle', level: 'junior' },
  { id: 'jhs-07', japanese: '天気', english: 'weather', level: 'junior' },
  { id: 'jhs-08', japanese: '夏', english: 'summer', level: 'junior' },
  { id: 'jhs-09', japanese: '冬', english: 'winter', level: 'junior' },
  { id: 'jhs-10', japanese: '旅行する', english: 'travel', level: 'junior' },
  
  { id: 'hs-01', japanese: '可能にする', english: 'enable', level: 'high' },
  { id: 'hs-02', japanese: '開発する', english: 'develop', level: 'high' },
  { id: 'hs-03', japanese: '想像する', english: 'imagine', level: 'high' },
  { id: 'hs-04', japanese: '決定する', english: 'decide', level: 'high' },
  { id: 'hs-05', japanese: '惑星', english: 'planet', level: 'high' },
  
  { id: 'daily-01', japanese: '活動的な', english: 'active', level: 'daily' },
  { id: 'daily-02', japanese: '輝く', english: 'bright', level: 'daily' },
  { id: 'daily-03', japanese: 'きれいな', english: 'clean', level: 'daily' },
  { id: 'daily-04', japanese: '賢い', english: 'smart', level: 'daily' },
  { id: 'daily-05', japanese: '単純な', english: 'simple', level: 'daily' },

  // --- 8文字以上 (long) ---
  { id: 'jhs-ld-01', japanese: '朝食', english: 'breakfast', level: 'junior' },
  { id: 'jhs-ld-02', japanese: '難しい', english: 'difficult', level: 'junior' },
  { id: 'jhs-ld-03', japanese: '美しい', english: 'beautiful', level: 'junior' },
  { id: 'jhs-ld-04', japanese: '重要な', english: 'important', level: 'junior' },
  { id: 'jhs-ld-05', japanese: '覚えている', english: 'remember', level: 'junior' },
  { id: 'jhs-ld-06', japanese: '明日', english: 'tomorrow', level: 'junior' },
  
  { id: 'hs-ld-01', japanese: '挑戦', english: 'challenge', level: 'high' },
  { id: 'hs-ld-02', japanese: '経験', english: 'experience', level: 'high' },
  { id: 'hs-ld-03', japanese: '環境', english: 'environment', level: 'high' },
  { id: 'hs-ld-04', japanese: '人口', english: 'population', level: 'high' },
  { id: 'hs-ld-05', japanese: '技術', english: 'technology', level: 'high' },
  { id: 'hs-ld-06', japanese: '機会', english: 'opportunity', level: 'high' },
  { id: 'hs-ld-07', japanese: '政府', english: 'government', level: 'high' },
  { id: 'hs-ld-08', japanese: '状況', english: 'situation', level: 'high' },
  { id: 'hs-ld-09', japanese: '影響', english: 'influence', level: 'high' },
  { id: 'hs-ld-10', japanese: '国際的な', english: 'international', level: 'high' },
  { id: 'hs-ld-11', japanese: '語彙', english: 'vocabulary', level: 'high' },
  { id: 'hs-ld-12', japanese: '意思疎通', english: 'communication', level: 'high' },
  
  { id: 'daily-ld-01', japanese: '背景', english: 'background', level: 'daily' },
  { id: 'daily-ld-02', japanese: '危険な', english: 'dangerous', level: 'daily' },
  { id: 'daily-ld-03', japanese: '永久的な', english: 'permanent', level: 'daily' },
  { id: 'daily-ld-04', japanese: '成功した', english: 'successful', level: 'daily' },
  { id: 'daily-ld-05', japanese: '伝統的な', english: 'traditional', level: 'daily' },
  { id: 'daily-ld-06', japanese: '理解', english: 'understanding', level: 'daily' },
];

export default function App() {
  // ゲームステート
  const [gameStatus, setGameStatus] = useState<'title' | 'playing' | 'result'>('title');
  const [mode, setMode] = useState<'little' | 'long' | 'remix'>('little');
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30.0);
  const [combo, setCombo] = useState<number>(0);
  
  // 単語関連
  const [currentWord, setCurrentWord] = useState<WordData | null>(null);
  const [typedText, setTypedText] = useState<string>('');
  const [isCurrentWordClean, setIsCurrentWordClean] = useState<boolean>(true);
  
  // エフェクト・演出用
  const [comboEffect, setComboEffect] = useState<{ combo: number; bonus: number } | null>(null);
  const [shakeTrigger, setShakeTrigger] = useState<boolean>(false);
  const [isCorrectFlash, setIsCorrectFlash] = useState<boolean>(false);
  const [lastTimeAdded, setLastTimeAdded] = useState<number | null>(null);

  // ランキング (TOP 10 スコアの配列)
  const [ranking, setRanking] = useState<number[]>([]);
  const [newScoreRank, setNewScoreRank] = useState<number>(-1);

  // 音声（シンセ）設定：効果音をWeb Audio APIで生成
  const audioCtxRef = useRef<AudioContext | null>(null);

  // ローカルストレージからのランキング取得
  useEffect(() => {
    const savedRanking = localStorage.getItem('vocab_blast_ranking');
    if (savedRanking) {
      try {
        const parsed = JSON.parse(savedRanking) as number[];
        // 数値の配列であることを確認してソート
        const sorted = parsed.filter(n => typeof n === 'number').sort((a, b) => b - a).slice(0, 10);
        setRanking(sorted);
      } catch (e) {
        console.error('Error parsing ranking data:', e);
      }
    }
  }, []);

  // Web Audio APIの初期化
  const playSound = (type: 'correct' | 'miss' | 'word_clear' | 'game_over' | 'tick') => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (type === 'correct') {
        // ピッという短い高音
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'miss') {
        // ブーという低い音
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'word_clear') {
        // チャラン♪という和音
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.08, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.25);
        });
      } else if (type === 'game_over') {
        // 悲しげな下降音
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.6);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(now + 0.6);
      } else if (type === 'tick') {
        // コッという短い音
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  };

  // モードに基づいた単語群のフィルタリング
  const getFilteredWords = (selectedMode: 'little' | 'long' | 'remix'): WordData[] => {
    if (selectedMode === 'little') {
      return WORD_LIST.filter(w => w.english.length <= 7);
    } else if (selectedMode === 'long') {
      return WORD_LIST.filter(w => w.english.length >= 8);
    } else {
      return WORD_LIST;
    }
  };

  // 次の単語をセットする
  const nextQuestion = (currentMode: 'little' | 'long' | 'remix') => {
    const pool = getFilteredWords(currentMode);
    if (pool.length === 0) return;
    
    // 現在の単語と重複しないようにランダムに選出
    let chosen: WordData;
    do {
      chosen = pool[Math.floor(Math.random() * pool.length)];
    } while (currentWord && pool.length > 1 && chosen.id === currentWord.id);

    setCurrentWord(chosen);
    setTypedText('');
    setIsCurrentWordClean(true);
  };

  // ゲームスタート
  const startGame = () => {
    setScore(0);
    setTimeLeft(30.0);
    setCombo(0);
    setComboEffect(null);
    setNewScoreRank(-1);
    setGameStatus('playing');
    nextQuestion(mode);
  };

  // キー入力イベントハンドラ
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing' || !currentWord) return;

      const key = e.key;

      // アルファベット1文字のみ受け付ける (大文字・小文字は区別しない)
      if (key.length === 1 && /[a-zA-Z]/.test(key)) {
        const inputChar = key.toLowerCase();
        const expectedChar = currentWord.english[typedText.length].toLowerCase();

        if (inputChar === expectedChar) {
          // 正解！
          const nextTypedText = typedText + inputChar;
          setTypedText(nextTypedText);
          setScore(prev => prev + 100); // 1文字打つたびに100点増える
          playSound('correct');

          // 単語が完成したかチェック
          if (nextTypedText.length === currentWord.english.length) {
            // 単語全体の正解処理
            playSound('word_clear');
            setIsCorrectFlash(true);
            setTimeout(() => setIsCorrectFlash(false), 200);

            // 制限時間増加量の決定
            const isLong = currentWord.english.length >= 8;
            const addedSec = isLong ? 2 : 1;
            setTimeLeft(prev => Math.min(99.9, prev + addedSec)); // 最大表示99.9秒に制限
            setLastTimeAdded(addedSec);
            setTimeout(() => setLastTimeAdded(null), 800);

            // コンボ判定
            if (isCurrentWordClean) {
              const nextCombo = combo + 1;
              setCombo(nextCombo);
              const comboBonus = nextCombo * 1000;
              setScore(prev => prev + comboBonus); // コンボが増えたときに連続正解数×1000点加算

              // コンボエフェクト起動
              setComboEffect({ combo: nextCombo, bonus: comboBonus });
            }

            // 次の問題へ
            setTimeout(() => {
              nextQuestion(mode);
            }, 100);
          }
        } else {
          // 不正解・ミスタイプ
          setIsCurrentWordClean(false);
          setCombo(0); // コンボリセット
          setComboEffect(null);
          playSound('miss');
          setShakeTrigger(prev => !prev); // カードを揺らすトリガー
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, currentWord, typedText, combo, isCurrentWordClean, mode]);

  // コンボエフェクト自動消滅
  useEffect(() => {
    if (comboEffect) {
      const timer = setTimeout(() => {
        setComboEffect(null);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [comboEffect]);

  // 残り時間のカウントダウン処理
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 0.1;
        if (next <= 0) {
          clearInterval(interval);
          // ゲームオーバー処理
          setGameStatus('result');
          playSound('game_over');
          return 0;
        }
        // ラスト3秒でカウントダウン音
        if (next <= 3.0 && Math.abs((next * 10) % 10) < 0.1) {
          playSound('tick');
        }
        return parseFloat(next.toFixed(1));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameStatus]);

  // 終了時にスコアをランキングへ保存 (TOP 10 厳選)
  useEffect(() => {
    if (gameStatus === 'result') {
      const savedRanking = localStorage.getItem('vocab_blast_ranking');
      let currentRanking: number[] = [];
      if (savedRanking) {
        try {
          currentRanking = JSON.parse(savedRanking) as number[];
        } catch (e) {
          console.error(e);
        }
      }

      // 新しいスコアを追加
      const newRanking = [...currentRanking, score];
      // 降順ソート
      newRanking.sort((a, b) => b - a);
      // 上位10件のみ切り出し
      const top10 = newRanking.slice(0, 10);
      localStorage.setItem('vocab_blast_ranking', JSON.stringify(top10));
      setRanking(top10);

      // 今回のスコアが何位に入ったかを算出 (1位〜10位)
      const rankIndex = top10.indexOf(score);
      if (rankIndex !== -1) {
        setNewScoreRank(rankIndex + 1); // 1-indexed
      } else {
        setNewScoreRank(-1);
      }
    }
  }, [gameStatus, score]);

  // 自己ベスト（1位のスコア）の取得
  const personalBest = ranking.length > 0 ? ranking[0] : 0;

  return (
    <div className="w-[980px] h-[600px] bg-indigo-50 flex flex-col overflow-hidden font-sans select-none border-4 border-indigo-200 rounded-[32px] shadow-2xl mx-auto my-2 relative">
      
      {/* 1. ヘッダー領域 */}
      <header className="h-18 bg-white border-b-4 border-indigo-200 flex items-center justify-between px-8 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-md transform rotate-3 border-2 border-indigo-700">
            <span className="text-white font-black text-xl">A</span>
          </div>
          <div>
            <h1 className="text-xl font-black text-indigo-900 tracking-tight leading-none">VOCAB BLAST!</h1>
            <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest mt-0.5">English Typing Master</p>
          </div>
        </div>
        
        {/* 残り時間とスコアはゲーム中のみ表示 */}
        {gameStatus === 'playing' ? (
          <div className="flex items-center gap-4 animate-fade-in">
            {/* 残り時間表示 */}
            <div className={`px-4 py-1.5 rounded-full border-2 transition-colors duration-200 flex items-center gap-2 relative ${
              timeLeft <= 5 ? 'bg-rose-100 border-rose-300 animate-pulse' : 'bg-rose-50 border-rose-200'
            }`}>
              <span className="text-rose-500 font-bold uppercase text-[10px] tracking-widest">Time</span>
              <span className={`font-black text-xl w-14 text-right ${timeLeft <= 5 ? 'text-rose-600' : 'text-rose-500'}`}>
                {timeLeft.toFixed(1)}s
              </span>
              
              {/* 時間増加時の数字エフェクト */}
              <AnimatePresence>
                {lastTimeAdded !== null && (
                  <motion.span
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -25, scale: 1.2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute right-2 font-black text-emerald-500 text-lg drop-shadow-md z-20"
                  >
                    +{lastTimeAdded}s
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* スコア表示 */}
            <div className="bg-amber-50 px-4 py-1.5 rounded-full border-2 border-amber-200 flex items-center gap-2">
              <span className="text-amber-500 font-bold uppercase text-[10px] tracking-widest">Score</span>
              <span className="text-amber-600 font-black text-xl min-w-[70px] text-right">
                {score.toLocaleString()}
              </span>
            </div>
          </div>
        ) : (
          <div className="w-10"></div>
        )}
      </header>

      {/* 2. メインコンテンツ領域（3カラム） */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* 左サイドバー: 難易度モード (タイトル画面のみ表示) */}
        {gameStatus === 'title' && (
          <aside className="w-64 bg-indigo-100/40 border-r-4 border-indigo-100 p-5 flex flex-col gap-3 shrink-0">
            <div className="flex items-center gap-2 mb-0.5">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <h3 className="text-indigo-400 font-bold text-xs uppercase tracking-widest">Difficulty Mode</h3>
            </div>

            {/* little モードボタン */}
            <button
              onClick={() => setMode('little')}
              disabled={gameStatus === 'playing'}
              className={`w-full p-3.5 rounded-xl text-left flex justify-between items-center transition-all duration-200 ${
                mode === 'little'
                  ? 'bg-emerald-400 border-b-4 border-emerald-600 text-white font-black shadow-sm transform translate-y-[-1px]'
                  : 'bg-white border-2 border-indigo-100 text-indigo-300 font-bold opacity-60 hover:opacity-90 hover:border-indigo-200 cursor-pointer'
              }`}
            >
              <span className="tracking-wider text-sm">LITTLE</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${
                mode === 'little' ? 'bg-emerald-600/30 text-white' : 'bg-indigo-50 text-indigo-400'
              }`}>
                ≤7 chars
              </span>
            </button>

            {/* long モードボタン */}
            <button
              onClick={() => setMode('long')}
              disabled={gameStatus === 'playing'}
              className={`w-full p-3.5 rounded-xl text-left flex justify-between items-center transition-all duration-200 ${
                mode === 'long'
                  ? 'bg-indigo-500 border-b-4 border-indigo-700 text-white font-black shadow-sm transform translate-y-[-1px]'
                  : 'bg-white border-2 border-indigo-100 text-indigo-300 font-bold opacity-60 hover:opacity-90 hover:border-indigo-200 cursor-pointer'
              }`}
            >
              <span className="tracking-wider text-sm">LONG</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${
                mode === 'long' ? 'bg-indigo-700/30 text-white' : 'bg-indigo-50 text-indigo-400'
              }`}>
                8+ chars
              </span>
            </button>

            {/* remix モードボタン */}
            <button
              onClick={() => setMode('remix')}
              disabled={gameStatus === 'playing'}
              className={`w-full p-3.5 rounded-xl text-left flex justify-between items-center transition-all duration-200 ${
                mode === 'remix'
                  ? 'bg-fuchsia-500 border-b-4 border-fuchsia-700 text-white font-black shadow-sm transform translate-y-[-1px]'
                  : 'bg-white border-2 border-indigo-100 text-indigo-300 font-bold opacity-60 hover:opacity-90 hover:border-indigo-200 cursor-pointer'
              }`}
            >
              <span className="tracking-wider text-sm">REMIX</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${
                mode === 'remix' ? 'bg-fuchsia-700/30 text-white' : 'bg-indigo-50 text-indigo-400'
              }`}>
                Mixed
              </span>
            </button>

            {/* 自己ベスト表示 */}
            <div className="mt-auto p-4.5 bg-white rounded-2xl border-2 border-indigo-100 shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Trophy className="w-14 h-14 text-indigo-900" />
              </div>
              <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest mb-0.5">Personal Best</p>
              <p className="text-xl font-black text-indigo-900 flex items-baseline gap-0.5">
                {personalBest.toLocaleString()}
                <span className="text-[10px] font-normal text-indigo-400">pts</span>
              </p>
            </div>
          </aside>
        )}

        {/* 中央: ゲームメイン表示部 */}
        <section className="flex-1 flex flex-col items-center justify-center py-4 px-8">
          
          <motion.div 
            animate={shakeTrigger ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.3 }}
            className={`w-full ${gameStatus !== 'title' ? 'max-w-2xl' : 'max-w-xl'} bg-white rounded-[40px] shadow-xl py-5 px-6 border-b-[12px] relative overflow-hidden transition-all duration-300 ${
              isCorrectFlash ? 'border-indigo-300 bg-emerald-50/10' : 'border-indigo-100'
            }`}
            id="main-card"
          >
            {/* デコレーション背景 */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-6 -mt-6 opacity-40"></div>

            {/* A. タイトル画面ステート */}
            {gameStatus === 'title' && (
              <div className="text-center py-2 flex flex-col items-center">
                <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-2 inline-block">
                  Are you ready?
                </span>
                <h2 className="text-3xl font-black text-indigo-900 mb-1 tracking-tight">VOCAB BLAST!</h2>
                <p className="text-xs text-indigo-400 font-medium mb-4 max-w-sm leading-relaxed">
                  画面に表示される日本語をすばやく翻訳し、スペルをタイピングするゲームです。
                </p>

                {/* スタートボタン */}
                <button
                  onClick={startGame}
                  className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg rounded-2xl border-b-4 border-indigo-800 shadow-md transform active:translate-y-1 active:border-b-0 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-current" />
                  START GAME
                </button>

                {/* ルールヘルプ */}
                <div className="mt-4 grid grid-cols-2 gap-4 w-full border-t border-indigo-50 pt-4">
                  <div className="flex gap-2 items-start text-left">
                    <div className="p-1 bg-emerald-100 rounded-lg text-emerald-600 shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-indigo-900">時間回復システム</p>
                      <p className="text-[9px] text-indigo-400">7文字以下は+1秒、8文字以上は+2秒回復します。</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start text-left">
                    <div className="p-1 bg-amber-100 rounded-lg text-amber-600 shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-indigo-900">ノーミス・コンボ</p>
                      <p className="text-[9px] text-indigo-400">1つの単語を一度もミスせずに完成させるとコンボ加算！</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* B. プレイ中ステート */}
            {gameStatus === 'playing' && currentWord && (
              <div className="text-center py-2 flex flex-col items-center">
                <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-2 inline-block">
                  Translate this! ({currentWord.level.toUpperCase()})
                </span>

                {/* お題の日本語 */}
                <h2 className="text-4xl font-black text-indigo-900 mb-4 min-h-[48px] flex items-center justify-center">
                  {currentWord.japanese}
                </h2>

                {/* スペル表示ボックス */}
                <div className="flex justify-center flex-wrap gap-1.5 mb-6 w-full px-2">
                  {currentWord.english.split('').map((char, index) => {
                    const isTyped = index < typedText.length;
                    return (
                      <motion.div
                        key={index}
                        initial={isTyped ? { scale: 1.15 } : { scale: 1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.15 }}
                        className={`w-9 h-11 rounded-xl flex items-center justify-center text-xl font-black shadow-sm border ${
                          isTyped
                            ? 'bg-indigo-600 border-indigo-700 text-white shadow-indigo-200'
                            : 'bg-indigo-100 border-indigo-200 text-indigo-300'
                        }`}
                      >
                        {isTyped ? char.toUpperCase() : '_'}
                      </motion.div>
                    );
                  })}
                </div>

                {/* 操作ヒント */}
                <div className="flex justify-center">
                  <div className="bg-indigo-50 px-4 py-1.5 rounded-xl text-indigo-400 text-[10px] font-bold flex items-center gap-2">
                    <span className="bg-white border border-indigo-200 px-1.5 py-0.5 rounded text-indigo-900 shadow-sm font-mono text-[9px]">A-Z</span>
                    <span>Type the correct spell</span>
                  </div>
                </div>
              </div>
            )}

            {/* C. ゲーム終了・リザルトステート */}
            {gameStatus === 'result' && (
              <div className="text-center py-2 flex flex-col items-center">
                <span className="bg-rose-100 text-rose-600 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-2 inline-block">
                  Time Up!
                </span>
                <h2 className="text-3xl font-black text-indigo-900 mb-3 tracking-tight">GAME RESULT</h2>

                {/* 結果カード */}
                <div className="bg-indigo-50/50 rounded-2xl py-4 px-6 border-2 border-indigo-100/80 w-full max-w-sm mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center border-r border-indigo-100/80">
                      <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider">Final Score</p>
                      <p className="text-xl font-black text-indigo-900 mt-1">{score.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider">Mode</p>
                      <p className="text-base font-black text-indigo-700 mt-1 uppercase">{mode}</p>
                    </div>
                  </div>

                  {/* ランクイン通知 */}
                  {newScoreRank !== -1 && (
                    <div className="mt-3 pt-3 border-t border-indigo-100/80 flex items-center justify-center gap-2 text-amber-600 bg-amber-50 rounded-xl py-1.5 px-4 border border-amber-200/50">
                      <Award className="w-4 h-4" />
                      <span className="font-black text-[11px]">Ranked #{newScoreRank} in TOP 10!</span>
                    </div>
                  )}
                </div>

                {/* 操作ボタンエリア */}
                <div className="flex gap-4 w-full max-w-sm justify-center mt-1">
                  {/* リトライボタン */}
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-base rounded-2xl border-b-4 border-indigo-800 shadow-md transform active:translate-y-1 active:border-b-0 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <RotateCcw className="w-4 h-4" />
                    PLAY AGAIN
                  </button>

                  {/* モード選択（タイトル）へ戻るボタン */}
                  <button
                    onClick={() => setGameStatus('title')}
                    className="flex-1 py-3 bg-white hover:bg-indigo-50/50 text-indigo-600 font-bold text-base rounded-2xl border-2 border-indigo-200 hover:border-indigo-300 shadow-sm transform active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <Home className="w-4 h-4" />
                    SELECT MODE
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* コンボ・ボーナス演出テキストの浮かび上がり */}
          <div className="h-8 mt-2 relative w-full flex justify-center items-center">
            <AnimatePresence>
              {comboEffect && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.8, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, scale: 1.2, rotate: -1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="text-emerald-500 font-black text-2xl drop-shadow-sm flex items-center gap-1.5"
                >
                  <Sparkles className="w-5 h-5 fill-current animate-pulse" />
                  <span>+{comboEffect.combo} COMBO! (+{comboEffect.bonus.toLocaleString()} pts)</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 右サイドバー: ランキング (TOP 10) (タイトル画面のみ表示) */}
        {gameStatus === 'title' && (
          <aside className="w-72 bg-white border-l-4 border-indigo-100 p-6 flex flex-col overflow-hidden shrink-0">
            <h3 className="text-indigo-900 font-black text-lg mb-4 flex items-center gap-2 border-b border-indigo-50 pb-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              PERSONAL TOP 10
            </h3>

            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2.5 custom-scrollbar">
              {ranking.length > 0 ? (
                ranking.map((rankScore, index) => {
                  const rankNum = index + 1;
                  const isFirst = rankNum === 1;
                  const isNewScoreThisRank = gameStatus === 'result' && score === rankScore && rankNum === newScoreRank;

                  return (
                    <motion.div
                      key={index}
                      initial={isNewScoreThisRank ? { scale: 0.95 } : { scale: 1 }}
                      animate={isNewScoreThisRank ? { scale: [1, 1.03, 1] } : {}}
                      transition={{ repeat: isNewScoreThisRank ? 3 : 0, duration: 0.5 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        isNewScoreThisRank 
                          ? 'bg-amber-100 border-2 border-amber-400 shadow-md shadow-amber-100'
                          : isFirst
                            ? 'bg-amber-50/70 border border-amber-200/50'
                            : 'bg-indigo-50/20 border border-indigo-100/30 hover:bg-indigo-50/50'
                      }`}
                    >
                      <span className={`w-6 font-black text-sm text-center ${isFirst ? 'text-amber-500 text-lg' : 'text-indigo-300'}`}>
                        {rankNum}
                      </span>
                      <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-bold text-sm ${
                        isFirst ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-500'
                      }`}>
                        {isFirst ? <Star className="w-4 h-4 fill-current" /> : rankNum}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-black text-indigo-900 truncate leading-tight text-sm">YOU</p>
                        <p className={`text-xs font-bold ${isFirst ? 'text-amber-600' : 'text-indigo-400'}`}>
                          {rankScore.toLocaleString()} <span className="text-[9px] font-normal text-indigo-400/80">pts</span>
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-300 mb-2">
                    <Info className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-indigo-400/90 leading-relaxed">
                    No Record Yet.<br />Play a game to save score!
                  </p>
                </div>
              )}
            </div>
          </aside>
        )}
      </main>

      {/* 3. フッター領域 */}
      <footer className="h-12 bg-indigo-900 flex items-center justify-between px-8 text-white/50 text-[10px] tracking-widest uppercase font-bold shrink-0">
        <div className="flex gap-6">
          <span>MODE: {mode.toUpperCase()}</span>
          <span>SESSION: #LOCAL-PROT</span>
        </div>
        <div className="flex gap-6 items-center">
          <span className="text-emerald-400 animate-pulse flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            FOCUS ON YOURSELF & BEAT YOUR LIMITS!
          </span>
          <span>VER: 1.0.0</span>
        </div>
      </footer>
    </div>
  );
}
