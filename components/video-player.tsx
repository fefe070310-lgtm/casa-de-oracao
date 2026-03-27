'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  RotateCcw,
  RotateCw,
  PlayCircle,
} from 'lucide-react';

// -------------------------------------------------------
// Types
// -------------------------------------------------------
interface VideoPlayerProps {
  videoId: string;
  provider: 'youtube' | 'vimeo';
}

// YouTube IFrame API global types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

// -------------------------------------------------------
// YouTube IFrame API loader (singleton)
// -------------------------------------------------------
let ytApiLoaded = false;
let ytApiLoading = false;
const ytApiCallbacks: (() => void)[] = [];

function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (ytApiLoaded && window.YT?.Player) {
      resolve();
      return;
    }

    ytApiCallbacks.push(resolve);

    if (ytApiLoading) return;
    ytApiLoading = true;

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      ytApiLoaded = true;
      ytApiCallbacks.forEach((cb) => cb());
      ytApiCallbacks.length = 0;
    };
  });
}

// -------------------------------------------------------
// Helpers
// -------------------------------------------------------
function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// -------------------------------------------------------
// Component
// -------------------------------------------------------
export default function VideoPlayer({ videoId, provider }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerDivRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideControlsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [seeking, setSeeking] = useState(false);

  // ---- Keyboard shortcuts ----
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!ready || !playerRef.current) return;

      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'arrowleft':
          e.preventDefault();
          skip(-10);
          break;
        case 'arrowright':
          e.preventDefault();
          skip(10);
          break;
        case 'arrowup':
          e.preventDefault();
          changeVolume(Math.min(100, volume + 10));
          break;
        case 'arrowdown':
          e.preventDefault();
          changeVolume(Math.max(0, volume - 10));
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [ready, playing, volume]);

  // ---- Initialise YouTube player ----
  useEffect(() => {
    if (provider !== 'youtube') return;

    let mounted = true;

    loadYouTubeAPI().then(() => {
      if (!mounted || !playerDivRef.current) return;

      playerRef.current = new window.YT.Player(playerDivRef.current, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,        // Hide native controls
          disablekb: 1,       // Disable YouTube keyboard shortcuts
          fs: 0,              // Hide fullscreen button
          iv_load_policy: 3,  // Hide annotations
          modestbranding: 1,  // Minimal branding
          rel: 0,             // No related videos
          showinfo: 0,        // Hide info
          playsinline: 1,
          origin: window.location.origin,
          enablejsapi: 1,
          cc_load_policy: 0,  // Hide closed captions by default
        },
        events: {
          onReady: (event: any) => {
            if (!mounted) return;
            setReady(true);
            setDuration(event.target.getDuration());
            setVolume(event.target.getVolume());
            setMuted(event.target.isMuted());
          },
          onStateChange: (event: any) => {
            if (!mounted) return;
            const state = event.data;
            // YT.PlayerState: PLAYING=1, PAUSED=2, ENDED=0, BUFFERING=3
            setPlaying(state === 1);

            if (state === 1) {
              startProgressTracking();
            } else {
              stopProgressTracking();
            }

            if (state === 0) {
              // Ended
              setCurrentTime(duration);
            }
          },
        },
      });
    });

    return () => {
      mounted = false;
      stopProgressTracking();
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, provider]);

  // ---- Fullscreen change listener ----
  useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // ---- Progress tracking ----
  const startProgressTracking = useCallback(() => {
    stopProgressTracking();
    progressInterval.current = setInterval(() => {
      if (!playerRef.current?.getCurrentTime) return;
      const time = playerRef.current.getCurrentTime();
      const loaded = playerRef.current.getVideoLoadedFraction?.() ?? 0;
      setCurrentTime(time);
      setBuffered(loaded * 100);
    }, 250);
  }, []);

  const stopProgressTracking = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  // ---- Controls auto-hide ----
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    if (playing) {
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false);
        setShowSettings(false);
      }, 3000);
    }
  }, [playing]);

  useEffect(() => {
    if (!playing) {
      setShowControls(true);
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    } else {
      resetHideTimer();
    }
  }, [playing]);

  // ---- Player actions ----
  const togglePlay = () => {
    if (!playerRef.current) return;
    const state = playerRef.current.getPlayerState();
    if (state === 1) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (playerRef.current.isMuted()) {
      playerRef.current.unMute();
      setMuted(false);
    } else {
      playerRef.current.mute();
      setMuted(true);
    }
  };

  const changeVolume = (val: number) => {
    if (!playerRef.current) return;
    playerRef.current.setVolume(val);
    setVolume(val);
    if (val === 0) {
      playerRef.current.mute();
      setMuted(true);
    } else if (playerRef.current.isMuted()) {
      playerRef.current.unMute();
      setMuted(false);
    }
  };

  const skip = (seconds: number) => {
    if (!playerRef.current) return;
    const time = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(Math.max(0, Math.min(time + seconds, duration)), true);
  };

  const seekTo = (fraction: number) => {
    if (!playerRef.current) return;
    const time = fraction * duration;
    playerRef.current.seekTo(time, true);
    setCurrentTime(time);
  };

  const setSpeed = (rate: number) => {
    if (!playerRef.current) return;
    playerRef.current.setPlaybackRate(rate);
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await containerRef.current.requestFullscreen();
    }
  };

  // ---- Progress bar interaction ----
  const handleProgressInteraction = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const fraction = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    seekTo(fraction);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // ---- Vimeo fallback (keep simple iframe) ----
  if (provider === 'vimeo') {
    return (
      <div className="video-player-root relative w-full h-full overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-black">
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`}
          className="w-full h-full border-0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // ---- YouTube Custom Player ----
  return (
    <div
      ref={containerRef}
      className="video-player-root relative w-full h-full overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-black select-none"
      onMouseMove={resetHideTimer}
      onMouseLeave={() => playing && setShowControls(false)}
      onTouchStart={resetHideTimer}
    >
      {/* 
        CSS to aggressively hide ALL YouTube branding:
        - YouTube logo watermark (bottom-right)
        - "Watch on YouTube" button
        - Video title overlay
        - Channel info overlay
        - Share / more-videos buttons
        - Pause overlay (big play button from YouTube)
        - End-screen recommendations
      */}
      <style>{`
        .video-player-root iframe {
          pointer-events: none;
        }
        /* Hide YouTube logo watermark */
        .video-player-root .ytp-watermark,
        .video-player-root .ytp-youtube-button,
        .video-player-root .ytp-button[aria-label*="YouTube"],
        /* Hide "Watch on YouTube" */
        .video-player-root .ytp-impression-link,
        /* Hide title / channel info */
        .video-player-root .ytp-show-cards-title,
        .video-player-root .ytp-title,
        .video-player-root .ytp-title-text,
        .video-player-root .ytp-chrome-top,
        /* Hide end-screen */
        .video-player-root .ytp-endscreen-content,
        .video-player-root .ytp-ce-element,
        .video-player-root .ytp-ce-covering-overlay,
        .video-player-root .ytp-ce-element-shadow,
        .video-player-root .ytp-ce-covering-image,
        .video-player-root .ytp-ce-expanding-image,
        .video-player-root .ytp-pause-overlay,
        /* Hide annotations */
        .video-player-root .annotation,
        .video-player-root .video-annotations,
        .video-player-root iv-branding,
        /* Hide native controls */
        .video-player-root .ytp-chrome-bottom,
        .video-player-root .ytp-gradient-bottom,
        .video-player-root .ytp-gradient-top,
        /* Hide big centered play button from YT */
        .video-player-root .ytp-large-play-button,
        .video-player-root .ytp-cued-thumbnail-overlay {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
          visibility: hidden !important;
        }
      `}</style>

      {/* YouTube iframe container - slightly oversized to crop YT edges */}
      <div className="absolute inset-[-2px] z-[1]">
        <div ref={playerDivRef} className="w-full h-full" />
      </div>

      {/* Click layer to toggle play/pause (above iframe) */}
      <div
        className="absolute inset-0 z-[10] cursor-pointer"
        onClick={togglePlay}
        onDoubleClick={toggleFullscreen}
      />

      {/* ---- BRANDING: Top bar ---- */}
      <div
        className={`absolute top-0 left-0 right-0 z-[20] p-3 md:p-5 transition-opacity duration-500 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10">
            <PlayCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
          </div>
          <span className="text-[10px] md:text-xs font-black tracking-tighter text-white/90 drop-shadow-lg uppercase">
            CASA JUMP <span className="text-red-500">PLAYER</span>
          </span>
        </div>
      </div>

      {/* ---- CENTER play/pause indicator ---- */}
      {!playing && ready && (
        <div className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600/90 backdrop-blur-md flex items-center justify-center shadow-2xl shadow-red-600/40 animate-pulse">
            <Play className="w-7 h-7 md:w-9 md:h-9 text-white ml-1" />
          </div>
        </div>
      )}

      {/* ---- Loading state ---- */}
      {!ready && (
        <div className="absolute inset-0 z-[25] flex flex-col items-center justify-center bg-black gap-4">
          <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Carregando...</span>
        </div>
      )}

      {/* ---- CONTROLS: Bottom bar ---- */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-[20] transition-all duration-500 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        <div className="relative px-3 md:px-5 pb-3 md:pb-5 pt-8 md:pt-12">
          {/* Progress bar */}
          <div
            className="group/progress w-full h-[6px] md:h-[5px] hover:h-[10px] md:hover:h-[8px] bg-white/20 rounded-full cursor-pointer mb-3 md:mb-4 transition-all relative"
            onClick={handleProgressInteraction}
            onMouseDown={(e) => {
              setSeeking(true);
              handleProgressInteraction(e);
            }}
            onMouseMove={(e) => seeking && handleProgressInteraction(e)}
            onMouseUp={() => setSeeking(false)}
            onMouseLeave={() => setSeeking(false)}
          >
            {/* Buffered */}
            <div
              className="absolute top-0 left-0 h-full bg-white/20 rounded-full"
              style={{ width: `${buffered}%` }}
            />
            {/* Current */}
            <div
              className="absolute top-0 left-0 h-full bg-red-600 rounded-full transition-[width] duration-100"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 md:w-3.5 md:h-3.5 bg-red-500 rounded-full shadow-lg shadow-red-600/50 opacity-0 group-hover/progress:opacity-100 transition-opacity"
              style={{ left: `calc(${progressPercent}% - 6px)` }}
            />
          </div>

          {/* Buttons row */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white hover:text-red-400 transition-colors"
              aria-label={playing ? 'Pausar' : 'Reproduzir'}
            >
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            {/* Skip -10s */}
            <button
              onClick={() => skip(-10)}
              className="w-7 h-7 md:w-8 md:h-8 hidden sm:flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Retroceder 10s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Skip +10s */}
            <button
              onClick={() => skip(10)}
              className="w-7 h-7 md:w-8 md:h-8 hidden sm:flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Avançar 10s"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-1.5 group/vol">
              <button
                onClick={toggleMute}
                className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label={muted ? 'Ativar som' : 'Silenciar'}
              >
                {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={muted ? 0 : volume}
                onChange={(e) => changeVolume(Number(e.target.value))}
                className="w-0 group-hover/vol:w-16 md:group-hover/vol:w-20 transition-all duration-300 accent-red-500 h-1 cursor-pointer opacity-0 group-hover/vol:opacity-100"
                aria-label="Volume"
              />
            </div>

            {/* Time display */}
            <span className="text-white/70 text-[10px] md:text-xs font-mono tabular-nums ml-1">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Speed / Settings */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Configurações de velocidade"
              >
                {playbackRate !== 1 ? (
                  <span className="text-[10px] font-black text-red-400">{playbackRate}x</span>
                ) : (
                  <Settings className="w-4 h-4" />
                )}
              </button>

              {/* Speed popup */}
              {showSettings && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/95 backdrop-blur-xl rounded-xl border border-white/10 p-2 min-w-[120px] shadow-2xl">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40 px-3 py-1.5 mb-1">
                    Velocidade
                  </p>
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSpeed(rate)}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        playbackRate === rate
                          ? 'text-red-400 bg-red-500/10 font-black'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {rate === 1 ? 'Normal' : `${rate}x`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label={isFullscreen ? 'Sair do modo tela cheia' : 'Tela cheia'}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
