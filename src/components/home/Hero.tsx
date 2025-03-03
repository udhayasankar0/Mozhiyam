
import React from 'react';
import SearchInput from '@/components/ui/SearchInput';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = (term: string) => {
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-radial from-white to-neutral-background">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center animate-slide-up">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-tamil-DEFAULT mb-4 font-tamil">
          தமிழ் சொற்களஞ்சியம்
        </h1>
        <p className="text-xl md:text-2xl font-medium mb-4 text-neutral-text-dark">
          Tamil Terminology Dictionary
        </p>
        <p className="max-w-[42rem] text-neutral-text-medium mb-8 md:text-lg leading-normal">
          Explore and learn Tamil terminology with precise definitions, audio pronunciations, 
          and contextual examples from various domains.
        </p>
        
        <div className="w-full max-w-2xl mx-auto">
          <SearchInput 
            onSearch={handleSearch} 
            placeholder="நீங்கள் தேடும் சொல்... / Search for a term..."
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-tamil-DEFAULT/10 text-tamil-DEFAULT">
            Technology
          </span>
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-tamil-DEFAULT/10 text-tamil-DEFAULT">
            Medicine
          </span>
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-tamil-DEFAULT/10 text-tamil-DEFAULT">
            Science
          </span>
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-tamil-DEFAULT/10 text-tamil-DEFAULT">
            Law
          </span>
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-tamil-DEFAULT/10 text-tamil-DEFAULT">
            Arts
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
