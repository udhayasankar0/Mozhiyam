
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, ArrowRight, Flag, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioPlayer from './AudioPlayer';
import ReportForm from './ReportForm';
import { toast } from '@/hooks/use-toast';

interface TermCardProps {
  id: string;
  term: string;
  translation: string;
  definition: string;
  domain: string;
  audioFile?: string;
  hasAudio?: boolean;
  isUserContribution?: boolean;
}

const TermCard: React.FC<TermCardProps> = ({
  id,
  term,
  translation,
  definition,
  domain,
  audioFile,
  hasAudio = true,
  isUserContribution = false
}) => {
  const [showAudio, setShowAudio] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [helpfulRating, setHelpfulRating] = useState<'up' | 'down' | null>(null);
  const [helpfulCount, setHelpfulCount] = useState({ up: Math.floor(Math.random() * 50), down: Math.floor(Math.random() * 10) });
  
  const handleRating = (rating: 'up' | 'down') => {
    if (helpfulRating === rating) {
      // User is clicking the same rating again, so remove their rating
      setHelpfulRating(null);
      setHelpfulCount(prev => ({
        ...prev,
        [rating]: prev[rating] - 1
      }));
      toast({
        description: "Rating removed"
      });
    } else {
      // User is changing their rating or rating for the first time
      if (helpfulRating) {
        // If they had a previous rating, decrement that count
        setHelpfulCount(prev => ({
          ...prev,
          [helpfulRating]: prev[helpfulRating] - 1
        }));
      }
      
      // Set the new rating and increment the count
      setHelpfulRating(rating);
      setHelpfulCount(prev => ({
        ...prev,
        [rating]: prev[rating] + 1
      }));
      
      toast({
        description: rating === 'up' ? "Marked as helpful" : "Marked as not helpful"
      });
    }
  };

  return (
    <>
      <div className={`group glass-card overflow-hidden transition-all duration-300 hover-scale ${isUserContribution ? 'border-l-4 border-l-amber-400' : ''}`}>
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-tamil-DEFAULT/10 text-tamil-DEFAULT">
                  {domain}
                </span>
                
                {isUserContribution && (
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-700">
                    User Contributed
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold font-tamil text-tamil-DEFAULT mb-1">
                {term}
              </h3>
              <p className="text-sm text-neutral-text-medium mb-2">{translation}</p>
            </div>
            
            <div className="flex gap-1">
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
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-neutral-text-medium hover:text-red-500"
                onClick={() => setShowReportForm(true)}
              >
                <Flag size={16} />
              </Button>
            </div>
          </div>
          
          {showAudio && audioFile && (
            <div className="my-3 animate-scale-in">
              <AudioPlayer term={term} audioUrl={audioFile} />
            </div>
          )}
          
          <p className="text-neutral-text-dark text-sm mt-3 line-clamp-3">
            {definition}
          </p>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 text-neutral-text-medium ${helpfulRating === 'up' ? 'text-green-500' : ''}`}
                onClick={() => handleRating('up')}
              >
                <ThumbsUp size={14} />
              </Button>
              <span className="text-xs text-neutral-text-medium">{helpfulCount.up}</span>
              
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 text-neutral-text-medium ml-2 ${helpfulRating === 'down' ? 'text-red-500' : ''}`}
                onClick={() => handleRating('down')}
              >
                <ThumbsDown size={14} />
              </Button>
              <span className="text-xs text-neutral-text-medium">{helpfulCount.down}</span>
            </div>
            
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
      
      {showReportForm && (
        <ReportForm 
          termId={id}
          term={term}
          translation={translation}
          onClose={() => setShowReportForm(false)}
        />
      )}
    </>
  );
};

export default TermCard;
