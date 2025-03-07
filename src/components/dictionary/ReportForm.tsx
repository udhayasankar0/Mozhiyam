
import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface ReportFormProps {
  termId: string;
  term: string;
  translation: string;
  onClose: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ termId, term, translation, onClose }) => {
  const [issues, setIssues] = useState({
    spelling: false,
    definition: false,
    examples: false,
    translation: false,
    audio: false,
    other: false
  });
  
  const [comment, setComment] = useState('');
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setIssues(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if at least one issue is selected
    if (!Object.values(issues).some(val => val)) {
      toast({
        title: "Error",
        description: "Please select at least one issue type",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would normally submit the report to the backend
    toast({
      title: "Report submitted",
      description: "Thank you for helping improve our dictionary!"
    });
    
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="px-6 py-4 border-b border-neutral-border flex justify-between items-center">
          <h2 className="text-lg font-bold text-tamil-DEFAULT">Report Incorrect Information</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="rounded-full h-8 w-8"
          >
            <X size={18} />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <div className="flex text-sm text-neutral-text-dark mb-1">
              <span className="font-tamil font-medium mr-2">{term}</span>
              <span className="text-neutral-text-medium">({translation})</span>
            </div>
            <p className="text-sm text-neutral-text-medium">
              Please select what information is incorrect and provide details
            </p>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="font-medium text-neutral-text-dark mb-1">What's incorrect?</div>
            
            <label className="flex items-center">
              <input 
                type="checkbox" 
                name="spelling" 
                checked={issues.spelling} 
                onChange={handleCheckboxChange}
                className="rounded text-tamil-DEFAULT mr-2"
              />
              <span className="text-sm">Spelling/Word Form</span>
            </label>
            
            <label className="flex items-center">
              <input 
                type="checkbox" 
                name="definition" 
                checked={issues.definition} 
                onChange={handleCheckboxChange}
                className="rounded text-tamil-DEFAULT mr-2"
              />
              <span className="text-sm">Definition</span>
            </label>
            
            <label className="flex items-center">
              <input 
                type="checkbox" 
                name="examples" 
                checked={issues.examples} 
                onChange={handleCheckboxChange}
                className="rounded text-tamil-DEFAULT mr-2"
              />
              <span className="text-sm">Example Sentences</span>
            </label>
            
            <label className="flex items-center">
              <input 
                type="checkbox" 
                name="translation" 
                checked={issues.translation} 
                onChange={handleCheckboxChange}
                className="rounded text-tamil-DEFAULT mr-2"
              />
              <span className="text-sm">Translation</span>
            </label>
            
            <label className="flex items-center">
              <input 
                type="checkbox" 
                name="audio" 
                checked={issues.audio} 
                onChange={handleCheckboxChange}
                className="rounded text-tamil-DEFAULT mr-2"
              />
              <span className="text-sm">Audio Pronunciation</span>
            </label>
            
            <label className="flex items-center">
              <input 
                type="checkbox" 
                name="other" 
                checked={issues.other} 
                onChange={handleCheckboxChange}
                className="rounded text-tamil-DEFAULT mr-2"
              />
              <span className="text-sm">Other Issue</span>
            </label>
          </div>
          
          <div className="mb-4">
            <label className="block">
              <span className="text-sm font-medium text-neutral-text-dark">Comments/Corrections</span>
              <Textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Please describe the issue and suggest corrections if possible"
                className="mt-1 h-24"
              />
            </label>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Send size={16} className="mr-2" />
              Submit Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
