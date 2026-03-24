'use client';

import React from 'react';
import { Plyr } from 'plyr-react';
import 'plyr/dist/plyr.css';

export default function VideoPlayer({ 
  videoId, 
  provider 
}: { 
  videoId: string; 
  provider: 'youtube' | 'vimeo' 
}) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] bg-black">
      
      {/* Camada topo (Blackout físico) para cobrir o título e avatar do YouTube */}
      {provider === 'youtube' && (
        <div className="absolute top-0 left-0 w-full h-[75px] bg-black z-[40] pointer-events-auto flex items-center px-8 border-b border-white/5">
           <div className="text-white/80 text-[11px] uppercase tracking-[0.3em] font-black flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
             CASA JUMP PLAYER
           </div>
        </div>
      )}

      {/* Camada inferior (Blackout físico) para cobrir a logo do Youtube no hover */}
      {provider === 'youtube' && (
        <div className="absolute bottom-0 left-0 w-full h-[65px] bg-black z-[35] pointer-events-auto" />
      )}

      {/* Container do Plyr */}
      <div className="absolute top-0 left-0 w-full h-full z-[45] [&>.plyr]:h-full [&>.plyr]:w-full [&>.plyr__video-wrapper]:h-full">
        <Plyr
          source={{
            type: 'video',
            sources: [
              {
                src: videoId,
                provider: provider,
              },
            ],
          }}
          options={{
            autoplay: false,
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
            settings: ['quality', 'speed'],
            speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
            youtube: {
              noCookie: false,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              playsinline: 1,
              controls: 0,
              disablekb: 1
            }
          }}
        />
      </div>
      
    </div>
  );
}
