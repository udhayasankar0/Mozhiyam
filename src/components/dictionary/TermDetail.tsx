
import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Bookmark, BookmarkCheck, Flag, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AudioPlayer from './AudioPlayer';
import ReportForm from './ReportForm';
import { toast } from '@/hooks/use-toast';

interface TermDetailProps {
  term: string;
  translation: string;
  definition: string;
  examples: string[];
  englishExamples: string[];
  domain: string;
  relatedTerms: { id: string; term: string; translation: string }[];
  isUserContribution?: boolean;
}

const TermDetail: React.FC<TermDetailProps> = ({
  term,
  translation,
  definition,
  examples,
  englishExamples,
  domain,
  relatedTerms,
  isUserContribution = false
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [helpfulRating, setHelpfulRating] = useState<'up' | 'down' | null>(null);
  const [helpfulCount, setHelpfulCount] = useState({ 
    up: Math.floor(Math.random() * 100) + 20, 
    down: Math.floor(Math.random() * 15) 
  });
  
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
    <div className="container max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
        <Link to="/browse" className="inline-flex items-center text-neutral-text-medium hover:text-tamil-DEFAULT">
          <ArrowLeft size={16} className="mr-1" />
          Back to browse
        </Link>
      </div>
      
      <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-border ${isUserContribution ? 'border-l-4 border-l-amber-400' : ''}`}>
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-tamil-DEFAULT/10 text-tamil-DEFAULT">
              {domain}
            </span>
            
            {isUserContribution && (
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700">
                User Contributed
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-tamil text-tamil-DEFAULT mb-2">
                {term}
              </h1>
              <p className="text-xl text-neutral-text-medium">{translation}</p>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowReportForm(true)}
                className="flex items-center gap-1 text-neutral-text-medium hover:text-red-500"
              >
                <Flag size={16} />
                <span className="hidden sm:inline">Report</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={() => {
                  setIsSaved(!isSaved);
                  toast({
                    description: isSaved ? "Removed from saved words" : "Added to saved words"
                  });
                }}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck size={16} className="text-tamil-DEFAULT" />
                    <span className="hidden sm:inline">Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark size={16} />
                    <span className="hidden sm:inline">Save</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="my-5">
            <AudioPlayer term={term} />
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3 text-tamil-DEFAULT">Definition</h2>
            <p className="font-tamil text-neutral-text-dark mb-6">{definition}</p>
            
            <h2 className="text-xl font-semibold mb-3 text-tamil-DEFAULT">Examples</h2>
            <div className="space-y-4 mb-6">
              {examples.map((example, index) => (
                <div key={index} className="rounded-lg bg-muted/30 p-4 border border-neutral-border">
                  <p className="font-tamil text-neutral-text-dark">{example}</p>
                  {englishExamples[index] && (
                    <p className="text-sm text-neutral-text-medium mt-2">{englishExamples[index]}</p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-3 my-6 p-4 bg-neutral-background rounded-lg">
              <div className="text-sm font-medium text-neutral-text-dark">Was this helpful?</div>
              
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center gap-1 ${helpfulRating === 'up' ? 'bg-green-50 text-green-600 border-green-200' : ''}`}
                onClick={() => handleRating('up')}
              >
                <ThumbsUp size={14} />
                <span>{helpfulCount.up}</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center gap-1 ${helpfulRating === 'down' ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
                onClick={() => handleRating('down')}
              >
                <ThumbsDown size={14} />
                <span>{helpfulCount.down}</span>
              </Button>
            </div>
            
            {relatedTerms.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-3 text-tamil-DEFAULT">Related Terms</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedTerms.map((relatedTerm) => (
                    <Link
                      key={relatedTerm.id} 
                      to={`/term/${relatedTerm.id}`}
                      className="flex items-center p-3 rounded-lg border border-neutral-border hover:border-tamil-DEFAULT/50 hover:bg-tamil-DEFAULT/5 transition-colors"
                    >
                      <div>
                        <p className="font-tamil font-medium text-tamil-DEFAULT">{relatedTerm.term}</p>
                        <p className="text-sm text-neutral-text-medium">{relatedTerm.translation}</p>
                      </div>
                      <ExternalLink size={14} className="ml-auto text-neutral-text-medium" />
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {showReportForm && (
        <ReportForm 
          termId="1" // This would be dynamic in a real implementation
          term={term}
          translation={translation}
          onClose={() => setShowReportForm(false)}
        />
      )}
    </div>
  );
};

export default TermDetail;
