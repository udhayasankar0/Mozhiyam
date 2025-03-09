
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Languages, FileText, Clock, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/b6c5b470-b719-43a1-8ac2-a3c43b0190a6.png" 
              alt="மொழியாம் Logo" 
              className="h-8 w-auto" 
            />
            <span className="text-2xl font-bold tracking-tight text-tamil-DEFAULT">
              மொழியாம்
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium ${isActive('/') 
              ? 'text-tamil-DEFAULT' 
              : 'text-neutral-text-dark hover:text-tamil-DEFAULT'} transition-colors`}
          >
            <span className="flex items-center gap-1">
              <Home size={16} />
              Home
            </span>
          </Link>
          <Link 
            to="/browse" 
            className={`text-sm font-medium ${isActive('/browse') 
              ? 'text-tamil-DEFAULT' 
              : 'text-neutral-text-dark hover:text-tamil-DEFAULT'} transition-colors`}
          >
            <span className="flex items-center gap-1">
              <BookOpen size={16} />
              Dictionary
            </span>
          </Link>
          <Link 
            to="/translator" 
            className={`text-sm font-medium ${isActive('/translator') 
              ? 'text-tamil-DEFAULT' 
              : 'text-neutral-text-dark hover:text-tamil-DEFAULT'} transition-colors`}
          >
            <span className="flex items-center gap-1">
              <Languages size={16} />
              Translator
            </span>
          </Link>
          <Link 
            to="/summarize" 
            className={`text-sm font-medium ${isActive('/summarize') 
              ? 'text-tamil-DEFAULT' 
              : 'text-neutral-text-dark hover:text-tamil-DEFAULT'} transition-colors`}
          >
            <span className="flex items-center gap-1">
              <FileText size={16} />
              Summarize
            </span>
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium ${isActive('/about') 
              ? 'text-tamil-DEFAULT' 
              : 'text-neutral-text-dark hover:text-tamil-DEFAULT'} transition-colors`}
          >
            About
          </Link>
        </nav>

        {/* Mobile Navigation Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="container md:hidden py-4 animate-slide-down">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`flex items-center p-2 ${isActive('/') 
                ? 'text-tamil-DEFAULT bg-muted' 
                : 'text-neutral-text-dark hover:text-tamil-DEFAULT hover:bg-muted'} rounded-md transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} className="mr-2" />
              Home
            </Link>
            <Link 
              to="/browse" 
              className={`flex items-center p-2 ${isActive('/browse') 
                ? 'text-tamil-DEFAULT bg-muted' 
                : 'text-neutral-text-dark hover:text-tamil-DEFAULT hover:bg-muted'} rounded-md transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen size={18} className="mr-2" />
              Dictionary
            </Link>
            <Link 
              to="/translator" 
              className={`flex items-center p-2 ${isActive('/translator') 
                ? 'text-tamil-DEFAULT bg-muted' 
                : 'text-neutral-text-dark hover:text-tamil-DEFAULT hover:bg-muted'} rounded-md transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Languages size={18} className="mr-2" />
              Translator
            </Link>
            <Link 
              to="/summarize" 
              className={`flex items-center p-2 ${isActive('/summarize') 
                ? 'text-tamil-DEFAULT bg-muted' 
                : 'text-neutral-text-dark hover:text-tamil-DEFAULT hover:bg-muted'} rounded-md transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText size={18} className="mr-2" />
              Summarize
            </Link>
            <Link 
              to="/coming-soon" 
              className={`flex items-center p-2 ${isActive('/coming-soon') 
                ? 'text-tamil-DEFAULT bg-muted' 
                : 'text-neutral-text-dark hover:text-tamil-DEFAULT hover:bg-muted'} rounded-md transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Clock size={18} className="mr-2" />
              Coming Soon
            </Link>
            <Link 
              to="/about" 
              className={`flex items-center p-2 ${isActive('/about') 
                ? 'text-tamil-DEFAULT bg-muted' 
                : 'text-neutral-text-dark hover:text-tamil-DEFAULT hover:bg-muted'} rounded-md transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
