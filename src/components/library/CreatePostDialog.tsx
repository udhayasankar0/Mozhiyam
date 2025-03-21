
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BookOpen, FileText, Upload } from 'lucide-react';

interface CreatePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: { title: string; content: string; type: 'poem' | 'story' }) => void;
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'poem' | 'story'>('poem');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title, content, type });
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setType('poem');
  };

  const simulateFileUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setContent(`${type === 'poem' ? 'உங்கள் கவிதை' : 'உங்கள் சிறுகதை'} இங்கே தென்படும்...`);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-tamil">புதிய படைப்பு சேர்க்க</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="post-type">வகை தேர்ந்தெடுக்கவும்</Label>
            <RadioGroup 
              defaultValue={type} 
              onValueChange={(value) => setType(value as 'poem' | 'story')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="poem" id="poem" />
                <Label htmlFor="poem" className="flex items-center gap-1">
                  <BookOpen size={16} className="text-tamil-DEFAULT" />
                  கவிதை
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="story" id="story" />
                <Label htmlFor="story" className="flex items-center gap-1">
                  <FileText size={16} className="text-tamil-light" />
                  சிறுகதை
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">தலைப்பு</Label>
            <Input 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={type === 'poem' ? "கவிதையின் தலைப்பு" : "சிறுகதையின் தலைப்பு"}
              className="font-tamil"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">உள்ளடக்கம்</Label>
            <div className="relative">
              <Textarea 
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={type === 'poem' ? "உங்கள் கவிதையை இங்கே எழுதுங்கள்..." : "உங்கள் சிறுகதையை இங்கே எழுதுங்கள்..."}
                className="min-h-[200px] font-tamil"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={simulateFileUpload}
                className="absolute top-2 right-2 bg-white/80"
                disabled={isUploading}
              >
                <Upload size={16} className="mr-1" />
                {isUploading ? "பதிவேற்றுகிறது..." : "பதிவேற்ற"}
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              ரத்து செய்
            </Button>
            <Button type="submit" disabled={!title.trim() || !content.trim()}>
              பதிவிட
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
