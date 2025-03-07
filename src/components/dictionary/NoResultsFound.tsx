
import React from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoResultsFoundProps {
  searchTerm: string;
  onAddNewWord: () => void;
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({ searchTerm, onAddNewWord }) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-border p-8 text-center animate-fade-in">
      <div className="mx-auto w-16 h-16 rounded-full bg-neutral-background flex items-center justify-center mb-4">
        <Search size={28} className="text-neutral-text-medium" />
      </div>
      
      <h3 className="text-xl font-medium mb-2 text-tamil-DEFAULT">No results found</h3>
      
      <p className="text-neutral-text-medium mb-6">
        We couldn't find "{searchTerm}" in our dictionary.
      </p>
      
      <div className="p-4 bg-tamil-DEFAULT/5 rounded-lg mb-6 max-w-md mx-auto">
        <p className="text-tamil-DEFAULT text-sm mb-4">
          Would you like to contribute this word to our dictionary?
        </p>
        
        <Button onClick={onAddNewWord} className="w-full sm:w-auto">
          <PlusCircle size={18} className="mr-2" />
          Add New Word
        </Button>
      </div>
    </div>
  );
};

export default NoResultsFound;
