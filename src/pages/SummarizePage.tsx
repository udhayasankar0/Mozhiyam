
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Link as LinkIcon, Share2, Download, Clock } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const SummarizePage = () => {
  const [summarizing, setSummarizing] = useState(false);
  const [summaryResult, setSummaryResult] = useState<null | {
    title: string;
    source: string;
    originalLength: number;
    originalTime: number;
    summaryContent: string;
    summaryLength: number;
    summaryTime: number;
  }>(null);
  const [summaryLength, setSummaryLength] = useState('medium');
  const [url, setUrl] = useState('');
  const { toast } = useToast();

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive"
      });
      return;
    }
    
    // Mock summarization
    handleSummarize("file", file.name);
  };

  const handleUrlSubmit = () => {
    if (!url.trim()) {
      toast({
        title: "URL required",
        description: "Please enter a URL to summarize.",
        variant: "destructive"
      });
      return;
    }
    
    if (!url.startsWith('http')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive"
      });
      return;
    }
    
    handleSummarize("url", url);
  };

  const handleSummarize = (type: "file" | "url", source: string) => {
    setSummarizing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setSummarizing(false);
      
      // Mock result
      setSummaryResult({
        title: "தமிழக பள்ளிகளில் விரைவில் AI தொழில்நுட்பம்",
        source: type === "file" ? source : new URL(source).hostname,
        originalLength: 1240,
        originalTime: 9,
        summaryContent: "தமிழக பள்ளிகளில் விரைவில் செயற்கை நுண்ணறிவு (AI) தொழில்நுட்பம் அறிமுகப்படுத்தப்படும் என்று தமிழக பள்ளிக்கல்வித்துறை அமைச்சர் அறிவித்துள்ளார். மாணவர்களுக்கு எதிர்கால தொழில்நுட்பங்களில் தேர்ச்சி பெற உதவும் வகையில் இந்த முயற்சி மேற்கொள்ளப்படுகிறது. முதற்கட்டமாக அரசு உயர்நிலைப் பள்ளிகளில் இத்திட்டம் அமல்படுத்தப்படும். மாணவர்கள் AI மூலம் படங்களை உருவாக்குதல், எளிய நிரலாக்கம் மற்றும் தரவு பகுப்பாய்வு போன்றவற்றைக் கற்றுக்கொள்வர்.",
        summaryLength: 440,
        summaryTime: 3
      });
      
      toast({
        title: "Summarization complete",
        description: "Your content has been summarized successfully."
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-neutral-background">
        <div className="container px-4 md:px-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-tamil-DEFAULT mb-2">Text Summarization</h1>
            <p className="text-neutral-text-medium">Summarize Tamil news articles and long texts</p>
          </div>
          
          <div className="bg-white rounded-xl border border-neutral-border p-6">
            {!summaryResult ? (
              <Tabs defaultValue="upload">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Upload size={16} />
                    Upload PDF
                  </TabsTrigger>
                  <TabsTrigger value="url" className="flex items-center gap-2">
                    <LinkIcon size={16} />
                    Enter URL
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload">
                  <div 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    className="border-2 border-dashed border-neutral-border rounded-lg p-8 text-center hover:border-tamil-DEFAULT/50 transition-colors"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-tamil-DEFAULT/10 flex items-center justify-center text-tamil-DEFAULT">
                        <FileText size={24} />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-neutral-text-dark mb-2">
                          Drag and drop your PDF file
                        </h3>
                        <p className="text-sm text-neutral-text-medium mb-4">
                          or click to browse from your computer
                        </p>
                        
                        <Input 
                          type="file" 
                          accept=".pdf" 
                          id="pdf-upload"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0]);
                            }
                          }}
                        />
                        <Button asChild variant="outline">
                          <label htmlFor="pdf-upload" className="cursor-pointer">
                            Browse Files
                          </label>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="url">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-neutral-text-dark mb-2 block">
                        Tamil News Article URL
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="url" 
                          placeholder="Paste Tamil news article URL here"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                        <Button onClick={handleUrlSubmit} disabled={summarizing}>
                          Go
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-neutral-text-dark mb-2 block">
                        Summary Length
                      </label>
                      <RadioGroup
                        value={summaryLength}
                        onValueChange={setSummaryLength}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="short" id="short" />
                          <Label htmlFor="short">Short</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="medium" />
                          <Label htmlFor="medium">Medium</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="long" id="long" />
                          <Label htmlFor="long">Long</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        className="w-full flex items-center gap-2" 
                        disabled={!url.trim() || summarizing}
                        onClick={handleUrlSubmit}
                      >
                        {summarizing ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <FileText size={18} />
                            Summarize Article
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="animate-scale-in">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-tamil-DEFAULT mb-1 font-tamil">
                      {summaryResult.title}
                    </h2>
                    <p className="text-sm text-neutral-text-medium">
                      Source: {summaryResult.source}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Share2 size={14} />
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download size={14} />
                      <span className="hidden sm:inline">Download</span>
                    </Button>
                  </div>
                </div>
                
                <div className="bg-neutral-background rounded-lg p-4 mb-4">
                  <h3 className="font-medium mb-2 text-neutral-text-dark">Summary</h3>
                  <p className="text-neutral-text-dark font-tamil">
                    {summaryResult.summaryContent}
                  </p>
                  
                  <div className="flex items-center mt-3 text-xs text-neutral-text-medium">
                    <Clock size={14} className="mr-1" />
                    <span>
                      {summaryResult.summaryTime} min read • 
                      {summaryResult.summaryLength} characters
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="text-xs text-neutral-text-medium">
                    <span className="inline-flex items-center">
                      <Clock size={14} className="mr-1" />
                      Original: {summaryResult.originalTime} min read
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      Reduced by {Math.round((1 - summaryResult.summaryLength / summaryResult.originalLength) * 100)}%
                    </span>
                  </div>
                  
                  <Button variant="outline" size="sm" onClick={() => setSummaryResult(null)}>
                    Summarize Another
                  </Button>
                </div>
              </div>
            )}
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

export default SummarizePage;
