
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import TermCard from '@/components/dictionary/TermCard';
import { BookText, Code, Stethoscope, Scale, Palette } from 'lucide-react';

// Sample data for demonstration
const featuredTerms = [
  {
    id: '1',
    term: 'மென்பொருள்',
    translation: 'Software',
    definition: 'கணினியின் செயல்பாட்டை நிர்வகிக்கும் நிரல்களின் தொகுப்பு. இது வன்பொருளை இயக்குவதற்கும், பயனர்களுக்கு பயன்பாட்டு வசதிகளை வழங்குவதற்கும் பயன்படுகிறது.',
    domain: 'Technology'
  },
  {
    id: '2',
    term: 'நுண்ணறிவு',
    translation: 'Intelligence',
    definition: 'கற்றல், புரிதல், சிக்கல் தீர்த்தல், முடிவெடுத்தல் போன்ற அறிவார்ந்த செயல்பாடுகளில் ஈடுபடும் திறன். இது பல்வேறு சூழல்களில் தகவமைத்துக் கொள்ளும் திறனையும் உள்ளடக்கியது.',
    domain: 'Psychology'
  },
  {
    id: '3',
    term: 'தகவல் தொழில்நுட்பம்',
    translation: 'Information Technology',
    definition: 'தகவல்களை சேகரிக்க, சேமிக்க, பகுப்பாய்வு செய்ய மற்றும் பரிமாற்றம் செய்ய பயன்படும் தொழில்நுட்பங்களின் தொகுப்பு. இது கணினிகள், நெட்வொர்க்குகள், மென்பொருள் மற்றும் இதர தொடர்புடைய கருவிகளை உள்ளடக்கியது.',
    domain: 'Technology'
  }
];

const domains = [
  { id: 'technology', name: 'Technology', icon: <Code size={18} /> },
  { id: 'medicine', name: 'Medicine', icon: <Stethoscope size={18} /> },
  { id: 'law', name: 'Law', icon: <Scale size={18} /> },
  { id: 'literature', name: 'Literature', icon: <BookText size={18} /> },
  { id: 'arts', name: 'Arts', icon: <Palette size={18} /> },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-tamil-DEFAULT">Featured Terms</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTerms.map((term) => (
                <TermCard 
                  key={term.id}
                  id={term.id}
                  term={term.term}
                  translation={term.translation}
                  definition={term.definition}
                  domain={term.domain}
                />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-neutral-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-tamil-DEFAULT">Browse by Domain</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {domains.map((domain) => (
                <a
                  key={domain.id}
                  href={`/browse?domain=${domain.id}`}
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-neutral-border hover:border-tamil-DEFAULT/50 hover:shadow-md transition-all text-center hover-scale"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-tamil-DEFAULT/10 text-tamil-DEFAULT rounded-lg mb-3">
                    {domain.icon}
                  </div>
                  <h3 className="font-medium text-neutral-text-dark">{domain.name}</h3>
                </a>
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
