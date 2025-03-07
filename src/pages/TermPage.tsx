
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import TermDetail from '@/components/dictionary/TermDetail';

// Sample data for demonstration
const termData = {
  '1': {
    term: 'மென்பொருள்',
    translation: 'Software',
    definition: 'கணினியின் செயல்பாட்டை நிர்வகிக்கும் நிரல்களின் தொகுப்பு. இது வன்பொருளை இயக்குவதற்கும், பயனர்களுக்கு பயன்பாட்டு வசதிகளை வழங்குவதற்கும் பயன்படுகிறது.',
    examples: [
      'இந்த மென்பொருள் பயனர் நட்புடன் கூடியதாக உள்ளது.',
      'அவர் புதிய மென்பொருள் மேம்பாட்டில் ஈடுபட்டுள்ளார்.'
    ],
    englishExamples: [
      'This software is user-friendly.',
      'He is involved in new software development.'
    ],
    domain: 'Technology',
    isUserContribution: false,
    relatedTerms: [
      { id: '3', term: 'தகவல் தொழில்நுட்பம்', translation: 'Information Technology' },
      { id: '4', term: 'வன்பொருள்', translation: 'Hardware' }
    ]
  },
  '2': {
    term: 'நுண்ணறிவு',
    translation: 'Intelligence',
    definition: 'கற்றல், புரிதல், சிக்கல் தீர்த்தல், முடிவெடுத்தல் போன்ற அறிவார்ந்த செயல்பாடுகளில் ஈடுபடும் திறன். இது பல்வேறு சூழல்களில் தகவமைத்துக் கொள்ளும் திறனையும் உள்ளடக்கியது.',
    examples: [
      'அவள் அதிக நுண்ணறிவு கொண்டவள்.',
      'செயற்கை நுண்ணறிவு தொழில்நுட்பம் பல துறைகளில் புரட்சியை ஏற்படுத்தியுள்ளது.'
    ],
    englishExamples: [
      'She has high intelligence.',
      'Artificial intelligence technology has revolutionized many fields.'
    ],
    domain: 'Psychology',
    isUserContribution: false,
    relatedTerms: [
      { id: '5', term: 'செயற்கை நுண்ணறிவு', translation: 'Artificial Intelligence' },
      { id: '6', term: 'மனவெழுச்சி நுண்ணறிவு', translation: 'Emotional Intelligence' }
    ]
  },
  '3': {
    term: 'தகவல் தொழில்நுட்பம்',
    translation: 'Information Technology',
    definition: 'தகவல்களை சேகரிக்க, சேமிக்க, பகுப்பாய்வு செய்ய மற்றும் பரிமாற்றம் செய்ய பயன்படும் தொழில்நுட்பங்களின் தொகுப்பு. இது கணினிகள், நெட்வொர்க்குகள், மென்பொருள் மற்றும் இதர தொடர்புடைய கருவிகளை உள்ளடக்கியது.',
    examples: [
      'தகவல் தொழில்நுட்பத் துறையில் வேலைவாய்ப்புகள் அதிகரித்து வருகின்றன.',
      'நிறுவனம் தகவல் தொழில்நுட்ப உள்கட்டமைப்பை மேம்படுத்தியுள்ளது.'
    ],
    englishExamples: [
      'Job opportunities in the information technology sector are increasing.',
      'The company has upgraded its information technology infrastructure.'
    ],
    domain: 'Technology',
    isUserContribution: true,
    relatedTerms: [
      { id: '1', term: 'மென்பொருள்', translation: 'Software' },
      { id: '7', term: 'தரவு அறிவியல்', translation: 'Data Science' }
    ]
  }
};

const TermPage = () => {
  const { id } = useParams<{ id: string }>();
  const term = id && termData[id as keyof typeof termData];
  
  if (!term) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-tamil-DEFAULT mb-2">Term Not Found</h1>
            <p className="text-neutral-text-medium">The requested term could not be found.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-neutral-background py-4">
        <TermDetail 
          term={term.term}
          translation={term.translation}
          definition={term.definition}
          examples={term.examples}
          englishExamples={term.englishExamples}
          domain={term.domain}
          relatedTerms={term.relatedTerms}
          isUserContribution={term.isUserContribution}
        />
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

export default TermPage;
