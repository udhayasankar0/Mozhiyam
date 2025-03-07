
import React, { useState } from 'react';
import { PlusCircle, X, Upload, Mic, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const AddWordForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    term: '',
    translation: '',
    definition: '',
    englishDefinition: '',
    examples: [''],
    englishExamples: [''],
    domain: 'technology'
  });
  
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const domains = [
    { id: 'technology', name: 'Technology' },
    { id: 'medicine', name: 'Medicine' },
    { id: 'law', name: 'Law' },
    { id: 'literature', name: 'Literature' },
    { id: 'arts', name: 'Arts' },
    { id: 'psychology', name: 'Psychology' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleExampleChange = (index: number, value: string, isEnglish: boolean = false) => {
    const field = isEnglish ? 'englishExamples' : 'examples';
    const newExamples = [...formData[field]];
    newExamples[index] = value;
    setFormData(prev => ({ ...prev, [field]: newExamples }));
  };

  const addExample = () => {
    setFormData(prev => ({
      ...prev,
      examples: [...prev.examples, ''],
      englishExamples: [...prev.englishExamples, '']
    }));
  };

  const removeExample = (index: number) => {
    setFormData(prev => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index),
      englishExamples: prev.englishExamples.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const toggleRecording = () => {
    // Simulated audio recording functionality
    setIsRecording(!isRecording);
    
    if (isRecording) {
      // This would normally stop recording and set the audio file
      toast({
        title: "Recording stopped",
        description: "Audio recording has been saved"
      });
    } else {
      toast({
        title: "Recording started",
        description: "Speak clearly to record pronunciation"
      });
      
      // Simulate stopping after 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        toast({
          title: "Recording stopped",
          description: "Audio recording has been saved automatically after timeout"
        });
      }, 3000);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.term.trim()) {
      newErrors.term = 'Tamil word is required';
    }
    
    if (!formData.translation.trim()) {
      newErrors.translation = 'English translation is required';
    }
    
    if (!formData.definition.trim()) {
      newErrors.definition = 'Tamil definition is required';
    }
    
    if (!formData.englishDefinition.trim()) {
      newErrors.englishDefinition = 'English definition is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreview = () => {
    if (validateForm()) {
      setPreviewMode(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (previewMode) {
      // Actual submit logic would go here
      toast({
        title: "Word submitted",
        description: "Thank you for your contribution! Your entry has been submitted for review."
      });
      onClose();
    } else {
      handlePreview();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-neutral-border flex justify-between items-center">
          <h2 className="text-xl font-bold text-tamil-DEFAULT">
            {previewMode ? 'Preview Contribution' : 'Add New Word'}
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="rounded-full h-8 w-8"
          >
            <X size={18} />
          </Button>
        </div>
        
        {previewMode ? (
          <div className="p-6">
            <div className="mb-6 p-4 bg-neutral-background rounded-lg">
              <div className="flex mb-3">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-tamil-DEFAULT/10 text-tamil-DEFAULT">
                  {domains.find(d => d.id === formData.domain)?.name}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold font-tamil text-tamil-DEFAULT mb-1">
                {formData.term}
              </h3>
              <p className="text-lg text-neutral-text-medium mb-4">{formData.translation}</p>
              
              <div className="border-t border-neutral-border my-4 pt-4">
                <h4 className="font-medium text-tamil-DEFAULT mb-2">Definition:</h4>
                <p className="font-tamil text-neutral-text-dark mb-2">{formData.definition}</p>
                <p className="text-sm text-neutral-text-medium mb-4">{formData.englishDefinition}</p>
                
                {formData.examples.length > 0 && (
                  <>
                    <h4 className="font-medium text-tamil-DEFAULT mb-2">Examples:</h4>
                    <div className="space-y-4">
                      {formData.examples.map((example, index) => (
                        example && (
                          <div key={index} className="rounded-lg bg-muted/30 p-4 border border-neutral-border">
                            <p className="font-tamil text-neutral-text-dark">{example}</p>
                            {formData.englishExamples[index] && (
                              <p className="text-sm text-neutral-text-medium mt-2">{formData.englishExamples[index]}</p>
                            )}
                          </div>
                        )
                      ))}
                    </div>
                  </>
                )}
                
                {audioFile && (
                  <div className="mt-4">
                    <h4 className="font-medium text-tamil-DEFAULT mb-2">Audio Pronunciation:</h4>
                    <div className="flex items-center text-sm text-neutral-text-medium">
                      <Check size={16} className="text-green-500 mr-2" />
                      Audio file provided: {audioFile.name}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setPreviewMode(false)}>
                Edit
              </Button>
              <Button onClick={handleSubmit}>
                Submit Contribution
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block">
                  <span className="text-neutral-text-dark font-medium">Tamil Word <span className="text-red-500">*</span></span>
                  <Input
                    name="term"
                    value={formData.term}
                    onChange={handleChange}
                    placeholder="எ.கா. மென்பொருள்"
                    className={`font-tamil mt-1 ${errors.term ? 'border-red-500' : ''}`}
                  />
                  {errors.term && <p className="text-red-500 text-xs mt-1">{errors.term}</p>}
                </label>
                
                <label className="block">
                  <span className="text-neutral-text-dark font-medium">Tamil Definition <span className="text-red-500">*</span></span>
                  <Textarea
                    name="definition"
                    value={formData.definition}
                    onChange={handleChange}
                    placeholder="தமிழில் விளக்கம் உள்ளிடவும்"
                    className={`font-tamil mt-1 h-28 ${errors.definition ? 'border-red-500' : ''}`}
                  />
                  {errors.definition && <p className="text-red-500 text-xs mt-1">{errors.definition}</p>}
                </label>
              </div>
              
              <div className="space-y-3">
                <label className="block">
                  <span className="text-neutral-text-dark font-medium">English Translation <span className="text-red-500">*</span></span>
                  <Input
                    name="translation"
                    value={formData.translation}
                    onChange={handleChange}
                    placeholder="e.g. Software"
                    className={`mt-1 ${errors.translation ? 'border-red-500' : ''}`}
                  />
                  {errors.translation && <p className="text-red-500 text-xs mt-1">{errors.translation}</p>}
                </label>
                
                <label className="block">
                  <span className="text-neutral-text-dark font-medium">English Definition <span className="text-red-500">*</span></span>
                  <Textarea
                    name="englishDefinition"
                    value={formData.englishDefinition}
                    onChange={handleChange}
                    placeholder="Enter definition in English"
                    className={`mt-1 h-28 ${errors.englishDefinition ? 'border-red-500' : ''}`}
                  />
                  {errors.englishDefinition && <p className="text-red-500 text-xs mt-1">{errors.englishDefinition}</p>}
                </label>
              </div>
            </div>
            
            <div>
              <label className="block mb-2">
                <span className="text-neutral-text-dark font-medium">Subject Domain <span className="text-red-500">*</span></span>
                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {domains.map(domain => (
                    <option key={domain.id} value={domain.id}>
                      {domain.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-neutral-text-dark font-medium">Example Sentences (Optional)</span>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addExample} 
                  className="h-7 text-xs"
                >
                  <PlusCircle size={14} className="mr-1" /> Add Example
                </Button>
              </div>
              
              {formData.examples.map((example, index) => (
                <div key={index} className="mb-4 p-4 border border-neutral-border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Example {index + 1}</span>
                    {index > 0 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeExample(index)} 
                        className="h-7 text-xs text-neutral-text-medium hover:text-red-500"
                      >
                        <X size={14} className="mr-1" /> Remove
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <Input
                      value={example}
                      onChange={(e) => handleExampleChange(index, e.target.value)}
                      placeholder="Tamil example sentence"
                      className="font-tamil w-full"
                    />
                    
                    <Input
                      value={formData.englishExamples[index]}
                      onChange={(e) => handleExampleChange(index, e.target.value, true)}
                      placeholder="English translation of example (optional)"
                      className="w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <span className="text-neutral-text-dark font-medium block mb-2">Audio Pronunciation (Optional)</span>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center justify-center px-4 py-2 bg-white border border-neutral-border rounded-md cursor-pointer hover:bg-neutral-background transition-colors">
                  <Upload size={16} className="mr-2 text-neutral-text-medium" />
                  <span className="text-sm">Upload Audio</span>
                  <input 
                    type="file" 
                    accept="audio/*" 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                </label>
                
                <Button
                  type="button"
                  variant={isRecording ? "default" : "outline"}
                  className={isRecording ? "bg-red-500 hover:bg-red-600" : ""}
                  onClick={toggleRecording}
                >
                  <Mic size={16} className="mr-2" />
                  {isRecording ? "Recording..." : "Record Pronunciation"}
                </Button>
                
                {audioFile && (
                  <div className="flex items-center ml-2 text-sm text-green-600">
                    <Check size={14} className="mr-1" />
                    {audioFile.name}
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4 border-t border-neutral-border flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Preview Contribution
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddWordForm;
