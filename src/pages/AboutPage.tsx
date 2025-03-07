
import React from 'react';
import Navbar from '@/components/layout/Navbar';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 bg-neutral-background">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold text-tamil-DEFAULT mb-6">About Tamil Terminology Dictionary</h1>
          
          <div className="bg-white rounded-xl border border-neutral-border p-6 mb-8">
            <p className="mb-4 text-neutral-text-dark">
              The Tamil Terminology Dictionary is a comprehensive digital resource dedicated to preserving and promoting Tamil technical and domain-specific terminology.
            </p>
            <p className="mb-4 text-neutral-text-dark">
              Our mission is to provide accurate translations, definitions, and usage examples for specialized Tamil terms across various fields including technology, medicine, law, science, arts, and more.
            </p>
            <p className="text-neutral-text-dark">
              We strive to make Tamil terminology accessible to students, professionals, researchers, and anyone interested in the rich linguistic heritage of the Tamil language.
            </p>
          </div>
          
          <h2 className="text-2xl font-bold text-tamil-DEFAULT mb-4">Our Team</h2>
          <div className="bg-white rounded-xl border border-neutral-border p-6">
            <p className="text-neutral-text-dark">
              Our team consists of linguists, subject matter experts, and technology professionals dedicated to the development and maintenance of the Tamil Terminology Dictionary.
            </p>
          </div>
        </div>
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

export default AboutPage;
