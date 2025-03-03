
import React, { useState } from 'react';
import { Search, Mic, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchInputProps {
  onSearch?: (term: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  onSearch, 
  placeholder = "Search for Tamil terminology...",
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative group ${className}`}
    >
      <div className={`
        flex items-center w-full h-14 px-4 
        bg-white rounded-full
        border border-neutral-border
        transition-all duration-300
        ${isFocused ? 'shadow-lg border-tamil-DEFAULT' : 'shadow-md hover:shadow-lg'}
      `}>
        <Search 
          size={20} 
          className={`
            mr-2 transition-colors duration-300
            ${isFocused ? 'text-tamil-DEFAULT' : 'text-neutral-text-medium'}
          `}
        />
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent outline-none font-tamil text-lg placeholder:text-neutral-text-medium/70"
          placeholder={placeholder}
        />
        
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 mr-1"
            onClick={clearSearch}
          >
            <X size={16} />
          </Button>
        )}
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-neutral-text-medium hover:text-tamil-DEFAULT"
        >
          <Mic size={16} />
        </Button>
      </div>
    </form>
  );
};

export default SearchInput;
