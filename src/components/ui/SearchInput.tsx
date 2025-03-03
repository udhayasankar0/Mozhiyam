
import React, { useState, useEffect } from 'react';
import { Search, Mic, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchInputProps {
  onSearch?: (term: string) => void;
  placeholder?: string;
  className?: string;
  suggestions?: string[];
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  onSearch, 
  placeholder = "Search for Tamil terminology...",
  className = "",
  suggestions = []
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  // Sample suggestions data (can be replaced with actual API data)
  const allSuggestions = [
    'மென்பொருள்', 'தகவல் தொழில்நுட்பம்', 'வன்பொருள்', 'நுண்ணறிவு', 
    'திறன்பேசி', 'இணையதளம்', 'மருத்துவ நிபுணர்', 'சட்ட ஆலோசகர்',
    'கவிதை', 'ஓவியம்', 'செயற்கை நுண்ணறிவு', 'தரவு அறிவியல்',
    'மொழிபெயர்ப்பு', 'கணினி வடிவமைப்பு', 'மின்னணு வணிகம்'
  ];

  useEffect(() => {
    // Filter suggestions based on search term
    if (searchTerm.trim() === '') {
      setFilteredSuggestions([]);
    } else {
      // Accommodating Tamil character combinations
      const results = allSuggestions.filter(
        suggestion => suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(results.slice(0, 5)); // Limit to 5 suggestions
    }
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm);
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredSuggestions([]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    if (onSearch) {
      onSearch(suggestion);
    }
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setIsFocused(false);
      setShowSuggestions(false);
    }, 200);
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
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
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

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-neutral-border animate-scale-in">
          <ul className="py-2">
            {filteredSuggestions.map((suggestion, index) => (
              <li 
                key={index}
                className="px-4 py-2 hover:bg-neutral-background cursor-pointer transition-colors font-tamil text-neutral-text-dark"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default SearchInput;
