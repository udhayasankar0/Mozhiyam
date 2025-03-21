import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 bg-neutral-background">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-tamil-DEFAULT/20 rounded-full animate-pulse-subtle"></div>
            <div className="absolute inset-4 bg-tamil-DEFAULT/40 rounded-full animate-pulse-subtle" style={{ animationDelay: "0.3s" }}></div>
            <div className="absolute inset-8 bg-tamil-DEFAULT rounded-full"></div>
          </div>
          
          <h1 className="text-4xl font-bold text-tamil-DEFAULT mb-2">Coming Soon</h1>
          <h2 className="text-2xl font-bold text-tamil-medium mb-6 font-tamil">விரைவில் வருகிறது</h2>
          
          <p className="text-neutral-text-dark text-lg mb-8 max-w-xl mx-auto">
            We're working on exciting new features to enhance your Tamil language experience. 
            Stay tuned for updates!
          </p>
          
          <div className="max-w-md mx-auto mb-8 p-6 bg-white rounded-xl border border-neutral-border">
            <h3 className="text-lg font-medium mb-4 text-neutral-text-dark">
              Get notified when we launch
            </h3>
            
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email address" />
              <Button>
                Subscribe
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
          
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-1">
              <Home size={16} />
              Return to Home
            </Button>
          </Link>
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

export default ComingSoonPage;
