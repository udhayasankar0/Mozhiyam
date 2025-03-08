
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import TermDetail from '@/components/dictionary/TermDetail';
import { useEffect, useState } from 'react';
import dictionaryData from '../data/dictionary.json';

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
  },
  '4': {
    term: 'வன்பொருள்',
    translation: 'Hardware',
    definition: 'கணினி அமைப்பின் இயற்பியல் கூறுகள், எ.கா., திரை, விசைப்பலகை, சுட்டி, மற்றும் மதர்போர்டு போன்றவை.',
    examples: [
      'வன்பொருள் துறையில் புதிய உற்பத்தி தொழில்நுட்பங்கள் அறிமுகப்படுத்தப்பட்டுள்ளன.',
      'நிறுவனம் தனது வன்பொருள் உற்பத்தியை விரிவாக்கியுள்ளது.'
    ],
    englishExamples: [
      'New manufacturing technologies are being introduced in the hardware sector.',
      'The company has expanded its hardware production.'
    ],
    domain: 'Technology',
    isUserContribution: false,
    relatedTerms: [
      { id: '1', term: 'மென்பொருள்', translation: 'Software' },
      { id: '3', term: 'தகவல் தொழில்நுட்பம்', translation: 'Information Technology' }
    ]
  },
  '5': {
    term: 'மருத்துவ நிபுணர்',
    translation: 'Medical Specialist',
    definition: 'ஒரு குறிப்பிட்ட மருத்துவப் பிரிவில் சிறப்பு பயிற்சியும் அனுபவமும் பெற்ற மருத்துவர்.',
    examples: [
      'மருத்துவ நிபுணர் துறையில் புதிய சிகிச்சை முறைகள் அறிமுகப்படுத்தப்படுகின்றன.',
      'மருத்துவ நிபுணரின் ஆலோசனைகள் நோயாளிகளுக்கு மிக முக்கியமானவை.'
    ],
    englishExamples: [
      'New treatment methods are being introduced in the medical specialist field.',
      'The advice of the medical specialist is extremely valuable for patients.'
    ],
    domain: 'Medicine',
    isUserContribution: true,
    relatedTerms: [
      { id: '9', term: 'நோய் அறிவியல்', translation: 'Pathology' },
      { id: '10', term: 'மருந்தியல்', translation: 'Pharmacology' }
    ]
  },
  '6': {
    term: 'சட்ட ஆலோசகர்',
    translation: 'Legal Advisor',
    definition: 'சட்ட விஷயங்களில் ஆலோசனை வழங்கும் சட்ட நிபுணர்.',
    examples: [
      'சட்ட ஆலோசகர் துறையில் புதிய சட்ட மாற்றங்கள் எதிர்பார்க்கப்படுகின்றன.',
      'நிறுவனம், சட்ட ஆலோசகரின் ஆலோசனைகளை ஏற்று, தனது சட்ட முறைமைகளை மேம்படுத்தியுள்ளது.'
    ],
    englishExamples: [
      'New legal reforms are anticipated in the legal advisory field.',
      "The company has enhanced its legal procedures by incorporating the legal advisor's recommendations."
    ],
    domain: 'Law',
    isUserContribution: false,
    relatedTerms: [
      { id: '11', term: 'வழக்கறிஞர்', translation: 'Lawyer' },
      { id: '12', term: 'சட்ட அமலாக்கம்', translation: 'Law Enforcement' }
    ]
  },
  '7': {
    term: 'கவிதை',
    translation: 'Poetry',
    definition: 'கருத்துக்களையும் உணர்வுகளையும் அழகியல் மொழி மூலம் வெளிப்படுத்தும் இலக்கிய வடிவம்.',
    examples: [
      'கவிதை உலகில் புதுமையான மற்றும் அழகான படைப்புகள் உருவாகின்றன.',
      'கவிஞர் தனது உணர்ச்சிகளை கவிதைகளின் வழியாக வெளிப்படுத்துகிறார்.'
    ],
    englishExamples: [
      'Innovative and beautiful poems are emerging in the world of poetry.',
      'The poet expresses his emotions through his poetry.'
    ],
    domain: 'Literature',
    isUserContribution: false,
    relatedTerms: [
      { id: '13', term: 'இலக்கியம்', translation: 'Literature' },
      { id: '14', term: 'சிறுகதை', translation: 'Short Story' }
    ]
  },
  '8': {
    term: 'ஓவியம்',
    translation: 'Painting',
    definition: 'துணி, காகிதம், சுவர் போன்ற மேற்பரப்புகளில் வண்ணங்களைப் பயன்படுத்தி உருவாக்கப்படும் கலை வடிவம்.',
    examples: [
      'ஓவியம் துறையில் கலைஞர்கள் புதிய ஷைல்களை முன்னிலைப்படுத்துகின்றனர்.',
      'நிறுவனம் ஓவியத்தின் பிரசாரத்திற்காக புதிய கலை நிகழ்ச்சிகளை ஏற்பாடு செய்துள்ளது.'
    ],
    englishExamples: [
      'Artists are showcasing new styles in the field of painting.',
      'The company has organized new art events to promote painting.'
    ],
    domain: 'Arts',
    isUserContribution: true,
    relatedTerms: [
      { id: '15', term: 'கலை', translation: 'Art' },
      { id: '16', term: 'சிற்பக்கலை', translation: 'Sculpture' }
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
            <h1 className="text-2xl font-bold text-green-600 mb-2">Term Not Found</h1>
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
              © 2023 மொழியாம். All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-text-medium hover:text-green-600 text-sm">
                About
              </a>
              <a href="#" className="text-neutral-text-medium hover:text-green-600 text-sm">
                Privacy
              </a>
              <a href="#" className="text-neutral-text-medium hover:text-green-600 text-sm">
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
