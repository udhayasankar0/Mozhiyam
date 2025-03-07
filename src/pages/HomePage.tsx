
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import UserProfile from '@/components/home/UserProfile';
import RecentActivity from '@/components/home/RecentActivity';
import FeatureCard from '@/components/home/FeatureCard';
import { Book, Languages, FileText, Clock } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-neutral-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left sidebar with profile and recent activity */}
            <div className="w-full md:w-1/4">
              <UserProfile />
              <RecentActivity />
            </div>
            
            {/* Main content area with feature cards */}
            <div className="w-full md:w-3/4">
              <h1 className="text-3xl font-bold text-tamil-DEFAULT mb-6">
                Tamil Language Tools
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dictionary Card */}
                <Link to="/browse">
                  <FeatureCard 
                    title="Tamil Terminology Dictionary"
                    description="Explore domain-specific Tamil terminology with definitions and audio pronunciations."
                    icon={<Book size={24} />}
                    color="bg-tamil-DEFAULT/10 text-tamil-DEFAULT"
                  />
                </Link>
                
                {/* Translator Card */}
                <Link to="/translator">
                  <FeatureCard 
                    title="Tamil Translator"
                    description="Translate between English and Tamil with our intuitive translation tool."
                    icon={<Languages size={24} />}
                    color="bg-tamil-medium/10 text-tamil-medium"
                  />
                </Link>
                
                {/* Summarization Card */}
                <Link to="/summarize">
                  <FeatureCard 
                    title="Text Summarization"
                    description="Summarize Tamil news articles and texts for quick reading."
                    icon={<FileText size={24} />}
                    color="bg-tamil-light/10 text-tamil-light"
                  />
                </Link>
                
                {/* Coming Soon Card */}
                <Link to="/coming-soon">
                  <FeatureCard 
                    title="Coming Soon"
                    description="New features are being developed. Stay tuned for updates!"
                    icon={<Clock size={24} />}
                    color="bg-neutral-text-medium/10 text-neutral-text-medium"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-neutral-border py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-text-medium text-sm">
              © 2023 Tamil Language Tools. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link to="/about" className="text-neutral-text-medium hover:text-tamil-DEFAULT text-sm">
                About
              </Link>
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

export default HomePage;
