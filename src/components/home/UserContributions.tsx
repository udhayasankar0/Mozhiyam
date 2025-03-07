
import React from 'react';
import { Book, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// This would typically come from an API
const mockContributions = [
  { 
    id: 'c1', 
    term: 'தரவு அறிவியல்', 
    translation: 'Data Science', 
    status: 'approved', 
    date: '2023-12-10' 
  },
  { 
    id: 'c2', 
    term: 'செயற்கை நுண்ணறிவு', 
    translation: 'Artificial Intelligence', 
    status: 'pending', 
    date: '2023-12-15' 
  },
  { 
    id: 'c3', 
    term: 'மென்பொருள் சோதனை', 
    translation: 'Software Testing', 
    status: 'approved', 
    date: '2023-12-05' 
  }
];

const UserContributions = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
        return <Clock size={16} className="text-amber-500" />;
      case 'rejected':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Under Review';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-border p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Book size={18} className="text-tamil-DEFAULT" />
        <h3 className="font-medium text-neutral-text-dark">Your Contributions</h3>
      </div>
      
      {mockContributions.length > 0 ? (
        <div className="space-y-3">
          {mockContributions.map(contribution => (
            <Link 
              key={contribution.id}
              to={`/term/${contribution.id}`}
              className="flex items-center justify-between p-2 rounded-md hover:bg-neutral-background transition-colors"
            >
              <div>
                <p className="font-tamil text-sm font-medium text-tamil-DEFAULT">
                  {contribution.term}
                </p>
                <p className="text-xs text-neutral-text-medium">
                  {contribution.translation}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center text-xs rounded-full px-2 py-1 ${
                  contribution.status === 'approved' 
                    ? 'bg-green-100 text-green-700' 
                    : contribution.status === 'pending'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {getStatusIcon(contribution.status)}
                  <span className="ml-1">{getStatusText(contribution.status)}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-neutral-text-medium text-sm mb-3">
            You haven't contributed any words yet
          </p>
          <Link
            to="/browse"
            className="text-sm text-tamil-DEFAULT hover:underline"
          >
            Start contributing
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserContributions;
