
import React from 'react';
import { Check } from 'lucide-react';

interface Domain {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface DomainFilterProps {
  domains: Domain[];
  selectedDomain: string | null;
  onSelectDomain: (domainId: string) => void;
}

const DomainFilter: React.FC<DomainFilterProps> = ({
  domains,
  selectedDomain,
  onSelectDomain
}) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-border shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4 text-tamil-DEFAULT">Browse by Domain</h2>
      
      <div className="space-y-1">
        <button
          onClick={() => onSelectDomain('all')}
          className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
            selectedDomain === 'all' || !selectedDomain
              ? 'bg-tamil-DEFAULT/10 text-tamil-DEFAULT'
              : 'hover:bg-muted text-neutral-text-dark'
          }`}
        >
          <span className="flex-1">All Domains</span>
          {(selectedDomain === 'all' || !selectedDomain) && (
            <Check size={16} className="text-tamil-DEFAULT" />
          )}
        </button>
        
        {domains.map((domain) => (
          <button
            key={domain.id}
            onClick={() => onSelectDomain(domain.id)}
            className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
              selectedDomain === domain.id
                ? 'bg-tamil-DEFAULT/10 text-tamil-DEFAULT'
                : 'hover:bg-muted text-neutral-text-dark'
            }`}
          >
            {domain.icon && <span className="mr-2">{domain.icon}</span>}
            <span className="flex-1">{domain.name}</span>
            {selectedDomain === domain.id && (
              <Check size={16} className="text-tamil-DEFAULT" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DomainFilter;
