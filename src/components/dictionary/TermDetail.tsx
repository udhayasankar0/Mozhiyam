
import React from 'react';
import { ArrowLeft, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AudioPlayer from './AudioPlayer';

interface TermDetailProps {
  term: string;
  translation: string;
  definition: string;
  examples: string[];
  englishExamples: string[];
  domain: string;
  relatedTerms: { id: string; term: string; translation: string }[];
}

const TermDetail: React.FC<TermDetailProps> = ({
  term,
  translation,
  definition,
  examples,
  englishExamples,
  domain,
  relatedTerms
}) => {
  const [isSaved, setIsSaved] = React.useState(false);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
        <Link to="/browse" className="inline-flex items-center text-neutral-text-medium hover:text-tamil-DEFAULT">
          <ArrowLeft size={16} className="mr-1" />
          Back to browse
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-border">
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-tamil-DEFAULT/10 text-tamil-DEFAULT">
              {domain}
            </span>
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
                className="flex items-center gap-1"
                onClick={() => setIsSaved(!isSaved)}
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
                    <p className="text-neutral-text-medium text-sm mt-2">{englishExamples[index]}</p>
                  )}
                </div>
              ))}
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
    </div>
  );
};

export default TermDetail;
