
import React from 'react';
import { BookOpen, Languages, FileText } from 'lucide-react';

interface Activity {
  id: string;
  type: 'dictionary' | 'translation' | 'summary';
  content: string;
  timestamp: string;
}

const RecentActivity = () => {
  // Mock activity data - in a real app, this would come from user history
  const activities: Activity[] = [
    {
      id: '1',
      type: 'dictionary',
      content: 'மென்பொருள் (Software)',
      timestamp: '10 mins ago'
    },
    {
      id: '2',
      type: 'translation',
      content: 'Tamil to English: வணக்கம்',
      timestamp: '2 hours ago'
    },
    {
      id: '3',
      type: 'summary',
      content: 'Tamil News Article Summary',
      timestamp: 'Yesterday'
    }
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch(type) {
      case 'dictionary':
        return <BookOpen size={16} />;
      case 'translation':
        return <Languages size={16} />;
      case 'summary':
        return <FileText size={16} />;
      default:
        return <BookOpen size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-border p-4">
      <h3 className="font-medium text-neutral-text-dark mb-3">Recent Activity</h3>
      
      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-start gap-3 p-2 border-b border-neutral-border/50 last:border-0"
            >
              <div className="p-1.5 rounded bg-tamil-DEFAULT/10 text-tamil-DEFAULT">
                {getActivityIcon(activity.type)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-neutral-text-dark truncate">
                  {activity.content}
                </p>
                <p className="text-xs text-neutral-text-medium">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-neutral-text-medium py-2">
          No recent activity to show.
        </p>
      )}
    </div>
  );
};

export default RecentActivity;
