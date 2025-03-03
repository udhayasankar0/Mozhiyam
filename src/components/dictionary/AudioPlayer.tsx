
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  audioUrl?: string;
  term: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, term }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // In a real implementation, we would have actual audio
  // For now, let's simulate playing 
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    
    // Simulate audio playing for 2 seconds
    if (!isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
      }, 2000);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
      <Button
        onClick={togglePlay}
        variant="ghost"
        size="icon"
        className={`h-10 w-10 rounded-full ${isPlaying ? 'text-tamil-DEFAULT bg-tamil-DEFAULT/10' : ''}`}
        aria-label={isPlaying ? "Pause pronunciation" : "Play pronunciation"}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </Button>
      
      <div className="flex-1 h-8 flex items-center">
        {/* Audio visualization bars */}
        <div className="flex items-end justify-center h-full w-full gap-[2px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className={`
                w-1 bg-tamil-medium/40 rounded-full
                ${isPlaying ? 'animate-wave' : 'h-2'}
              `}
              style={{ 
                height: isPlaying ? `${Math.max(3, Math.random() * 24)}px` : '4px',
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <Button
        onClick={toggleMute}
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-neutral-text-medium hover:text-tamil-DEFAULT"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </Button>
    </div>
  );
};

export default AudioPlayer;
