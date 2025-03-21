
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { 
  BookOpen, 
  Languages, 
  FileText, 
  Clock, 
  Rocket, 
  Users, 
  CheckCircle, 
  Linkedin 
} from 'lucide-react';

const AboutPage = () => {
  const navigate = useNavigate();
  
  const handleFeatureClick = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFeatureCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 bg-neutral-background">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold text-tamil-DEFAULT mb-6">About மொழியாம்</h1>
          
          {/* About Section */}
          <section className="bg-white rounded-xl border border-neutral-border p-6 mb-8">
            <p className="mb-6 text-neutral-text-dark">
              மொழியாம் is a comprehensive digital platform dedicated to preserving, promoting, and simplifying Tamil language resources for modern usage. Our mission is to bridge the gap between Tamil and emerging technologies by providing tools that enhance accessibility, learning, and communication, ensuring that both native speakers and learners can engage with the language seamlessly in the digital age.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <button 
                onClick={handleFeatureClick}
                className="text-tamil-DEFAULT hover:text-tamil-medium font-medium flex items-center gap-1 transition-colors"
              >
                Our Features
              </button>
              
              <Link 
                to="/about#roadmap" 
                className="text-tamil-DEFAULT hover:text-tamil-medium font-medium flex items-center gap-1 transition-colors"
              >
                Our Roadmap
              </Link>
            </div>
            
            <h2 id="features-section" className="text-2xl font-bold text-tamil-DEFAULT mb-4">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div onClick={() => handleFeatureCardClick('/browse')}>
                <FeatureCard 
                  icon={<BookOpen className="h-8 w-8 text-tamil-DEFAULT" />}
                  title="Tamil Terminology Dictionary"
                  description="Find accurate translations, definitions, and examples."
                />
              </div>
              <div onClick={() => handleFeatureCardClick('/translator')}>
                <FeatureCard 
                  icon={<Languages className="h-8 w-8 text-tamil-DEFAULT" />}
                  title="Tamil Translator (English ↔ Tamil)"
                  description="Instant bidirectional translation for seamless communication."
                />
              </div>
              <div onClick={() => handleFeatureCardClick('/summarize')}>
                <FeatureCard 
                  icon={<FileText className="h-8 w-8 text-tamil-DEFAULT" />}
                  title="Tamil News Summarization"
                  description="Upload or paste Tamil articles to get a concise AI-generated summary."
                />
              </div>
              <div onClick={() => handleFeatureCardClick('/coming-soon')}>
                <FeatureCard 
                  icon={<Clock className="h-8 w-8 text-tamil-DEFAULT" />}
                  title="Coming Soon"
                  description="Grammar checker, voice-to-text transcription, and offline dictionary support!"
                />
              </div>
            </div>
            
            <h2 id="roadmap" className="text-2xl font-bold text-tamil-DEFAULT mb-4">Our Roadmap</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FutureFeature 
                icon={<Rocket size={20} />}
                title="AI-powered contextual translations"
              />
              <FutureFeature 
                icon={<Rocket size={20} />}
                title="Interactive Tamil learning tools"
              />
              <FutureFeature 
                icon={<Rocket size={20} />}
                title="Mobile app version"
              />
              <FutureFeature 
                icon={<Rocket size={20} />}
                title="Enhanced grammar correction & Tamil writing assistant"
              />
            </div>
          </section>
          
          {/* Team Section */}
          <section className="bg-white rounded-xl border border-neutral-border p-6">
            <h2 className="text-2xl font-bold text-tamil-DEFAULT mb-6">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <TeamMember 
                name="உதய சங்கர் உ"
                role="Full-Stack Developer"
                description="Focused on building responsive applications."
                linkedinUrl="https://www.linkedin.com/in/udhayasankar1/"
              />
              <TeamMember 
                name="முத்துபாண்டி மு"
                role="AI Developer"
                description="Specializing in AI-powered Tamil text processing."
                linkedinUrl="https://www.linkedin.com/in/mmuthupandi/"
              />
              <TeamMember 
                name="பிரவீன் மு"
                role="Idea Pitcher"
                description="Driving innovation with fresh ideas."
                linkedinUrl="https://www.linkedin.com/in/m-praveen-8489b1321/"
              />
              <TeamMember 
                name="ராமநாதன் சௌ"
                role="Researcher"
                description="Ensuring accuracy and linguistic relevance."
                linkedinUrl="https://www.linkedin.com/in/ramanathan0/"
              />
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-white border-t border-neutral-border py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-text-medium text-sm">
              © 2025 Tamil Language Tools. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-text-medium hover:text-tamil-DEFAULT text-sm">
                Privacy
              </a>
              <a href="#" className="text-neutral-text-medium hover:text-tamil-DEFAULT text-sm">
                Terms
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

// Feature Card Component
const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-border p-6 hover:shadow-md transition-all cursor-pointer">
      <div className="flex flex-col items-start">
        <div className="mb-4">
          {icon}
        </div>
        <div>
          <div className="flex items-center mb-2">
            <CheckCircle size={16} className="text-green-500 mr-2" />
            <h3 className="text-lg font-medium text-tamil-DEFAULT">{title}</h3>
          </div>
          <p className="text-neutral-text-medium text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Future Feature Component
const FutureFeature = ({ icon, title }: { icon: React.ReactNode; title: string }) => {
  return (
    <div className="flex items-center p-4 rounded-lg bg-tamil-DEFAULT/5 border border-tamil-DEFAULT/10">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-tamil-DEFAULT/10 text-tamil-DEFAULT mr-4">
        {icon}
      </div>
      <h3 className="font-medium text-tamil-DEFAULT">{title}</h3>
    </div>
  );
};

// Team Member Component
const TeamMember = ({ name, role, description, linkedinUrl }: { 
  name: string; 
  role: string; 
  description: string;
  linkedinUrl: string;
}) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-border p-6 hover:shadow-md transition-all">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-tamil-DEFAULT/10 rounded-full flex items-center justify-center mb-4">
          <Users className="h-8 w-8 text-tamil-DEFAULT" />
        </div>
        <h3 className="text-lg font-medium text-tamil-DEFAULT mb-1">{name}</h3>
        <p className="text-sm font-medium text-neutral-text-medium mb-2">{role}</p>
        <p className="text-neutral-text-medium text-sm mb-4">{description}</p>
        {linkedinUrl ? (
          <a 
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-tamil-DEFAULT/10 text-tamil-DEFAULT hover:bg-tamil-DEFAULT hover:text-white transition-colors"
          >
            <Linkedin size={16} />
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default AboutPage;
