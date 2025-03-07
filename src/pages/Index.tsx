
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import TermCard from '@/components/dictionary/TermCard';
import { BookText, Code, Stethoscope, Scale, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import data from the JSON file
import dictionaryData from '@/data/dictionary.json';

const Index = () => {
  // Map the icon names from JSON to actual Lucide React components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code size={18} />;
      case 'Stethoscope': return <Stethoscope size={18} />;
      case 'Scale': return <Scale size={18} />;
      case 'BookText': return <BookText size={18} />;
      case 'Palette': return <Palette size={18} />;
      default: return <BookText size={18} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-tamil-DEFAULT">Featured Terms</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dictionaryData.featuredTerms.map((term) => (
                <TermCard 
                  key={term.id}
                  id={term.id}
                  term={term.term}
                  translation={term.translation}
                  definition={term.definition}
                  domain={term.domain}
                  audioFile={term.audioFile}
                />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-neutral-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-tamil-DEFAULT">Browse by Domain</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {dictionaryData.domains.map((domain) => (
                <Link
                  key={domain.id}
                  to={`/browse?domain=${domain.id}`}
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-neutral-border hover:border-tamil-DEFAULT/50 hover:shadow-md transition-all text-center hover-scale"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-tamil-DEFAULT/10 text-tamil-DEFAULT rounded-lg mb-3">
                    {getIconComponent(domain.icon)}
                  </div>
                  <h3 className="font-medium text-neutral-text-dark">{domain.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
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

export default Index;
