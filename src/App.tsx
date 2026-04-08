/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Timer as TimerIcon, 
  ChevronLeft, 
  ChevronRight,
  Wind,
  CloudRain,
  Flame,
  Waves,
  Coffee,
  X
} from 'lucide-react';
import { SPACES, type Space } from './constants';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSpace, setCurrentSpace] = useState<Space>(SPACES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, isMuted, currentSpace]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setIsTimerActive(false);
      setTimeLeft(null);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (minutes: number) => {
    setTimeLeft(minutes * 60);
    setIsTimerActive(true);
    setShowTimer(false);
    setIsPlaying(true);
  };

  const startApp = () => {
    setHasStarted(true);
    setIsPlaying(true);
  };

  if (!hasStarted) {
    return (
      <div className="relative w-full h-screen overflow-hidden font-sans bg-black flex items-center justify-center">
        <div className="atmosphere" style={{ '--atmosphere-color-1': '#1e3a8a', '--atmosphere-color-2': '#064e3b' } as any} />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-2xl">
            Do you want to relax?
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startApp}
            className="px-12 py-4 rounded-full glass text-2xl font-medium hover:bg-white/20 transition-all"
          >
            Yes
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSpace.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={currentSpace.image} 
            alt={currentSpace.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Atmosphere Gradients */}
      <div 
        className="atmosphere" 
        style={{ 
          '--atmosphere-color-1': currentSpace.color,
          '--atmosphere-color-2': currentSpace.accent
        } as any} 
      />

      {/* Main UI */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-12">
        {/* Header */}
        <header className="flex justify-between items-start">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white drop-shadow-lg">
              {currentSpace.name}
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-light italic max-w-md">
              {currentSpace.description}
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
            {timeLeft !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass px-4 py-2 rounded-full flex items-center gap-2 text-sm font-mono"
              >
                <TimerIcon size={16} />
                {formatTime(timeLeft)}
              </motion.div>
            )}
            <button 
              onClick={() => setShowTimer(!showTimer)}
              className="glass p-3 rounded-full hover:bg-white/20 transition-colors"
            >
              <TimerIcon size={24} />
            </button>
          </div>
        </header>

        {/* Center Controls */}
        <main className="flex flex-col items-center justify-center flex-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full glass flex items-center justify-center text-white shadow-2xl"
          >
            {isPlaying ? <Pause size={48} fill="white" /> : <Play size={48} fill="white" className="ml-2" />}
          </motion.button>
        </main>

        {/* Footer Controls */}
        <footer className="flex flex-col gap-8">
          {/* Space Selector */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-white/50 font-semibold">Select Environment</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {SPACES.map((space) => (
                <button
                  key={space.id}
                  onClick={() => {
                    setCurrentSpace(space);
                    setIsPlaying(true);
                  }}
                  className={`relative flex-shrink-0 group transition-all duration-500 ${
                    currentSpace.id === space.id ? 'w-48' : 'w-24'
                  }`}
                >
                  <div className={`h-24 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                    currentSpace.id === space.id ? 'border-white' : 'border-transparent opacity-60 group-hover:opacity-100'
                  }`}>
                    <img 
                      src={space.image} 
                      alt={space.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {space.id === 'rainy-forest' && <CloudRain size={24} />}
                      {space.id === 'cozy-library' && <Flame size={24} />}
                      {space.id === 'ocean-breeze' && <Waves size={24} />}
                      {space.id === 'zen-garden' && <Wind size={24} />}
                      {space.id === 'night-cafe' && <Coffee size={24} />}
                    </div>
                  </div>
                  {currentSpace.id === space.id && (
                    <motion.span 
                      layoutId="space-name"
                      className="absolute -bottom-6 left-0 right-0 text-center text-[10px] uppercase tracking-widest font-bold"
                    >
                      {space.name}
                    </motion.span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Volume and Bottom Bar */}
          <div className="flex items-center justify-between glass px-6 py-4 rounded-3xl">
            <div className="flex items-center gap-4 w-full max-w-xs">
              <button onClick={() => setIsMuted(!isMuted)}>
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
              <span>Pure Atmosphere</span>
              <span>•</span>
              <span>ASMR Experience</span>
              <span>•</span>
              <span>Serenity Spaces</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Timer Modal */}
      <AnimatePresence>
        {showTimer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass p-8 rounded-[40px] w-full max-w-md relative"
            >
              <button 
                onClick={() => setShowTimer(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-serif mb-6">Set Sleep Timer</h2>
              <div className="grid grid-cols-2 gap-4">
                {[5, 10, 15, 30, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => startTimer(mins)}
                    className="py-4 rounded-2xl glass hover:bg-white/20 transition-all text-lg font-medium"
                  >
                    {mins} min
                  </button>
                ))}
              </div>
              {isTimerActive && (
                <button
                  onClick={() => {
                    setIsTimerActive(false);
                    setTimeLeft(null);
                    setShowTimer(false);
                  }}
                  className="w-full mt-6 py-4 rounded-2xl bg-red-500/20 text-red-200 border border-red-500/30 hover:bg-red-500/30 transition-all"
                >
                  Cancel Timer
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src={currentSpace.soundUrl}
        loop
        preload="auto"
      />

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
