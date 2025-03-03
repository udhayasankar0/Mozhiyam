
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, BookOpen, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-tamil font-bold tracking-tight text-tamil-DEFAULT">
              தமிழ்
              <span className="text-tamil-medium">சொற்களஞ்சியம்</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-neutral-text-dark hover:text-tamil-DEFAULT transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/browse" 
            className="text-sm font-medium text-neutral-text-dark hover:text-tamil-DEFAULT transition-colors"
          >
            Browse
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-neutral-text-dark hover:text-tamil-DEFAULT transition-colors"
          >
            About
          </Link>
          <Button variant="outline" size="sm" className="rounded-full">
            <Search size={16} className="mr-2" />
            Search
          </Button>
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
              className="flex items-center p-2 text-neutral-text-dark hover:text-tamil-DEFAULT hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen size={18} className="mr-2" />
              Home
            </Link>
            <Link 
              to="/browse" 
              className="flex items-center p-2 text-neutral-text-dark hover:text-tamil-DEFAULT hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Grid3X3 size={18} className="mr-2" />
              Browse
            </Link>
            <Link 
              to="/about" 
              className="flex items-center p-2 text-neutral-text-dark hover:text-tamil-DEFAULT hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen size={18} className="mr-2" />
              About
            </Link>
            <div className="pt-2">
              <Button className="w-full justify-start" variant="outline">
                <Search size={18} className="mr-2" />
                Search Dictionary
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
