
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import DomainFilter from '@/components/dictionary/DomainFilter';
import TermCard from '@/components/dictionary/TermCard';
import SearchInput from '@/components/ui/SearchInput';
import { Code, Stethoscope, Scale, BookText, Palette } from 'lucide-react';

// Sample data for demonstration
const allTerms = [
  {
    id: '1',
    term: 'மென்பொருள்',
    translation: 'Software',
    definition: 'கணினியின் செயல்பாட்டை நிர்வகிக்கும் நிரல்களின் தொகுப்பு. இது வன்பொருளை இயக்குவதற்கும், பயனர்களுக்கு பயன்பாட்டு வசதிகளை வழங்குவதற்கும் பயன்படுகிறது.',
    domain: 'technology'
  },
  {
    id: '2',
    term: 'நுண்ணறிவு',
    translation: 'Intelligence',
    definition: 'கற்றல், புரிதல், சிக்கல் தீர்த்தல், முடிவெடுத்தல் போன்ற அறிவார்ந்த செயல்பாடுகளில் ஈடுபடும் திறன். இது பல்வேறு சூழல்களில் தகவமைத்துக் கொள்ளும் திறனையும் உள்ளடக்கியது.',
    domain: 'psychology'
  },
  {
    id: '3',
    term: 'தகவல் தொழில்நுட்பம்',
    translation: 'Information Technology',
    definition: 'தகவல்களை சேகரிக்க, சேமிக்க, பகுப்பாய்வு செய்ய மற்றும் பரிமாற்றம் செய்ய பயன்படும் தொழில்நுட்பங்களின் தொகுப்பு. இது கணினிகள், நெட்வொர்க்குகள், மென்பொருள் மற்றும் இதர தொடர்புடைய கருவிகளை உள்ளடக்கியது.',
    domain: 'technology'
  },
  {
    id: '4',
    term: 'வன்பொருள்',
    translation: 'Hardware',
    definition: 'கணினி அமைப்பின் இயற்பியல் கூறுகள், எ.கா., திரை, விசைப்பலகை, சுட்டி, மற்றும் மதர்போர்டு போன்றவை.',
    domain: 'technology'
  },
  {
    id: '5',
    term: 'மருத்துவ நிபுணர்',
    translation: 'Medical Specialist',
    definition: 'ஒரு குறிப்பிட்ட மருத்துவப் பிரிவில் சிறப்பு பயிற்சியும் அனுபவமும் பெற்ற மருத்துவர்.',
    domain: 'medicine'
  },
  {
    id: '6',
    term: 'சட்ட ஆலோசகர்',
    translation: 'Legal Advisor',
    definition: 'சட்ட விஷயங்களில் ஆலோசனை வழங்கும் சட்ட நிபுணர்.',
    domain: 'law'
  },
  {
    id: '7',
    term: 'கவிதை',
    translation: 'Poetry',
    definition: 'கருத்துக்களையும் உணர்வுகளையும் அழகியல் மொழி மூலம் வெளிப்படுத்தும் இலக்கிய வடிவம்.',
    domain: 'literature'
  },
  {
    id: '8',
    term: 'ஓவியம்',
    translation: 'Painting',
    definition: 'துணி, காகிதம், சுவர் போன்ற மேற்பரப்புகளில் வண்ணங்களைப் பயன்படுத்தி உருவாக்கப்படும் கலை வடிவம்.',
    domain: 'arts'
  }
];

const domains = [
  { id: 'technology', name: 'Technology', icon: <Code size={18} /> },
  { id: 'medicine', name: 'Medicine', icon: <Stethoscope size={18} /> },
  { id: 'law', name: 'Law', icon: <Scale size={18} /> },
  { id: 'literature', name: 'Literature', icon: <BookText size={18} /> },
  { id: 'arts', name: 'Arts', icon: <Palette size={18} /> },
  { id: 'psychology', name: 'Psychology', icon: <BookText size={18} /> }
];

const BrowsePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDomain = searchParams.get('domain') || 'all';
  const [selectedDomain, setSelectedDomain] = useState(initialDomain);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  useEffect(() => {
    // Generate suggestions from all terms
    setSuggestions(allTerms.map(term => term.term));
  }, []);
  
  const handleDomainSelect = (domainId: string) => {
    setSelectedDomain(domainId);
    setSearchParams({ domain: domainId !== 'all' ? domainId : '' });
  };
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  // Filter terms based on selected domain and search term
  const filteredTerms = allTerms.filter((term) => {
    const matchesDomain = selectedDomain === 'all' || term.domain === selectedDomain;
    const matchesSearch = searchTerm === '' || 
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      term.translation.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDomain && matchesSearch;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-neutral-background py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-tamil-DEFAULT">Browse Dictionary</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <DomainFilter
                  domains={domains}
                  selectedDomain={selectedDomain}
                  onSelectDomain={handleDomainSelect}
                />
              </div>
              
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <SearchInput 
                    onSearch={handleSearch} 
                    placeholder="Search within results..."
                    suggestions={suggestions}
                  />
                </div>
                
                {filteredTerms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-scale-in">
                    {filteredTerms.map((term) => (
                      <TermCard 
                        key={term.id}
                        id={term.id}
                        term={term.term}
                        translation={term.translation}
                        definition={term.definition}
                        domain={term.domain.charAt(0).toUpperCase() + term.domain.slice(1)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-neutral-border p-8 text-center">
                    <h3 className="text-xl font-medium mb-2 text-tamil-DEFAULT">No results found</h3>
                    <p className="text-neutral-text-medium">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-neutral-border py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-text-medium text-sm">
              © 2023 Tamil Terminology Dictionary. All rights reserved.
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

export default BrowsePage;
