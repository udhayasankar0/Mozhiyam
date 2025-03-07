
import React from 'react';
import { User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UserProfile = () => {
  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: 'Guest User',
    avatar: null,
    isLoggedIn: false
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-border p-4 mb-6">
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
    </div>
  );
};

export default UserProfile;
