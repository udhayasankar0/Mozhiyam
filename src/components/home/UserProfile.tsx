
import React from 'react';
import { User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserContributions from './UserContributions';

const UserProfile = () => {
  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: 'Prabhakaran',
    avatar: null,
    isLoggedIn: false,
    contributionCount: 0,
    badgeLevel: 'Beginner'
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-neutral-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-tamil-DEFAULT/10 flex items-center justify-center text-tamil-DEFAULT">
            <User size={24} />
          </div>
          <div>
            <h3 className="font-medium text-neutral-text-dark">{user.name}</h3>
            {user.isLoggedIn ? (
              <span className="text-xs text-green-600">Logged In</span>
            ) : (
              <span className="text-xs text-neutral-text-medium">Guest</span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 mt-3">
          {user.isLoggedIn ? (
            <>
              <Button variant="outline" size="sm" className="w-full">
                Profile
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Settings size={16} />
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" className="w-full">
                Sign In
              </Button>
              <Button variant="default" size="sm" className="w-full">
                Register
              </Button>
            </>
          )}
        </div>
        
        {user.isLoggedIn && (
          <div className="mt-4 pt-4 border-t border-neutral-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-neutral-text-medium">Contributor Level:</span>
              <span className="text-sm font-medium text-tamil-DEFAULT">{user.badgeLevel}</span>
            </div>
            <div className="w-full bg-neutral-background rounded-full h-2">
              <div 
                className="bg-tamil-DEFAULT h-2 rounded-full"
                style={{ width: '25%' }}
              ></div>
            </div>
            <p className="text-xs text-neutral-text-medium mt-1">
              {user.contributionCount} contribution{user.contributionCount !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
      
      {user.isLoggedIn && <UserContributions />}
    </div>
  );
};

export default UserProfile;
