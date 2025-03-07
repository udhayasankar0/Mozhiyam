
import React from 'react';
import { Link } from 'react-router-dom';
import { Volume2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioPlayer from './AudioPlayer';

interface TermCardProps {
  id: string;
  term: string;
  translation: string;
  definition: string;
  domain: string;
  audioFile?: string;
  hasAudio?: boolean;
}

const TermCard: React.FC<TermCardProps> = ({
  id,
  term,
  translation,
  definition,
  domain,
  audioFile,
  hasAudio = true
}) => {
  const [showAudio, setShowAudio] = React.useState(false);

  return (
    <div className="group glass-card overflow-hidden transition-all duration-300 hover-scale">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-tamil-DEFAULT/10 text-tamil-DEFAULT mb-2">
              {domain}
            </span>
            <h3 className="text-2xl font-bold font-tamil text-tamil-DEFAULT mb-1">
              {term}
            </h3>
            <p className="text-sm text-neutral-text-medium mb-2">{translation}</p>
          </div>
          
          {hasAudio && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-neutral-text-medium hover:text-tamil-DEFAULT"
              onClick={() => setShowAudio(!showAudio)}
            >
              <Volume2 size={16} />
            </Button>
          )}
        </div>
        
        {showAudio && (
          <div className="my-3 animate-scale-in">
            <AudioPlayer term={term} audioUrl={audioFile} />
          </div>
        )}
        
        <p className="text-neutral-text-dark text-sm mt-3 line-clamp-3">
          {definition}
        </p>
        
        <div className="mt-4 flex justify-end">
          <Link 
            to={`/term/${id}`} 
            className="inline-flex items-center text-sm font-medium text-tamil-DEFAULT hover:underline"
          >
            View details
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermCard;
