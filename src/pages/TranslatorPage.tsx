
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { ArrowLeftRight, Copy, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";

const TranslatorPage = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [direction, setDirection] = useState<'en-ta'|'ta-en'>('en-ta');
  const { toast } = useToast();

  const handleTranslate = () => {
    if (!inputText.trim()) {
      toast({
        title: "No text to translate",
        description: "Please enter some text to translate",
        variant: "destructive",
      });
      return;
    }

    // Mock translation - in a real app, this would call an API
    const mockTranslations: Record<string, string> = {
      'hello': 'வணக்கம்',
      'welcome': 'நல்வரவு',
      'thank you': 'நன்றி',
      'good morning': 'காலை வணக்கம்',
      'how are you': 'நீங்கள் எப்படி இருக்கிறீர்கள்',
      'வணக்கம்': 'hello',
      'நல்வரவு': 'welcome',
      'நன்றி': 'thank you'
    };

    // Simple mock translation
    if (direction === 'en-ta') {
      setOutputText(mockTranslations[inputText.toLowerCase()] || 
        "மொழிபெயர்ப்பு கிடைக்கவில்லை. முழு API இணைப்பில் இந்த அம்சம் வேலை செய்யும்.");
    } else {
      setOutputText(mockTranslations[inputText] || 
        "Translation not available. This feature will work with full API integration.");
    }

    toast({
      title: "Translation complete",
      description: "Your text has been translated",
    });
  };

  const toggleDirection = () => {
    setDirection(direction === 'en-ta' ? 'ta-en' : 'en-ta');
    setInputText('');
    setOutputText('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-neutral-background">
        <div className="container px-4 md:px-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-tamil-DEFAULT mb-2">Tamil Translator</h1>
            <p className="text-neutral-text-medium">Translate between English and Tamil</p>
          </div>
          
          <div className="bg-white rounded-xl border border-neutral-border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-text-dark">
                {direction === 'en-ta' ? 'English → Tamil' : 'Tamil → English'}
              </h3>
              
              <Button 
                variant="outline"
                size="sm"
                onClick={toggleDirection}
                className="flex items-center gap-1"
              >
                <ArrowLeftRight size={16} />
                <span>Switch</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Column */}
              <div>
                <div className="mb-2 flex justify-between items-center">
                  <label className="text-sm font-medium text-neutral-text-dark">
                    {direction === 'en-ta' ? 'English' : 'Tamil'}
                  </label>
                  <span className="text-xs text-neutral-text-medium">
                    {inputText.length} characters
                  </span>
                </div>
                
                <div className="relative">
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={direction === 'en-ta' 
                      ? "Enter English text here..." 
                      : "தமிழ் உரையை இங்கே உள்ளிடவும்..."
                    }
                    className="min-h-[200px] font-tamil"
                  />
                  
                  {inputText && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 bg-white/80"
                      onClick={() => copyToClipboard(inputText)}
                    >
                      <Copy size={14} />
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Button for mobile view */}
              <div className="lg:hidden flex justify-center">
                <Button
                  onClick={handleTranslate}
                  className="w-full md:w-auto flex gap-2 items-center"
                >
                  <Languages size={18} />
                  Translate
                </Button>
              </div>
              
              {/* Output Column */}
              <div>
                <div className="mb-2 flex justify-between items-center">
                  <label className="text-sm font-medium text-neutral-text-dark">
                    {direction === 'en-ta' ? 'Tamil' : 'English'}
                  </label>
                  {outputText && (
                    <span className="text-xs text-neutral-text-medium">
                      {outputText.length} characters
                    </span>
                  )}
                </div>
                
                <div className="relative">
                  <Textarea
                    value={outputText}
                    readOnly
                    placeholder={direction === 'en-ta' 
                      ? "தமிழ் மொழிபெயர்ப்பு இங்கே தோன்றும்..." 
                      : "English translation will appear here..."
                    }
                    className="min-h-[200px] bg-neutral-background/50 font-tamil"
                  />
                  
                  {outputText && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 bg-white/80"
                      onClick={() => copyToClipboard(outputText)}
                    >
                      <Copy size={14} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Translate button for desktop */}
            <div className="hidden lg:flex justify-center mt-6">
              <Button
                onClick={handleTranslate}
                className="px-8 flex gap-2 items-center"
              >
                <Languages size={18} />
                Translate
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-neutral-border py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-text-medium text-sm">
              © 2023 Tamil Language Tools. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-text-medium hover:text-tamil-DEFAULT text-sm">
                About
              </a>
              <a href="#" className="text-neutral-text-medium hover:text-tamil-DEFAULT text-sm">
                Privacy
              </a>
              <a href="#" className="text-neutral-text-medium hover:text-tamil-DEFAULT text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TranslatorPage;
