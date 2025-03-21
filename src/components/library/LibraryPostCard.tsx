
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThumbsUp, MessageCircle, Send, BookOpen, FileText } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

// Define the post type
interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  type: 'poem' | 'story';
  likes: number;
  comments: Comment[];
  timestamp: string;
}

interface LibraryPostCardProps {
  post: Post;
  onLike: () => void;
  onAddComment: (comment: string) => void;
}

const LibraryPostCard: React.FC<LibraryPostCardProps> = ({ post, onLike, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <Card className="overflow-hidden border-neutral-border">
      <CardHeader className="bg-white pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {post.type === 'poem' ? (
                <BookOpen size={16} className="text-tamil-medium" />
              ) : (
                <FileText size={16} className="text-tamil-light" />
              )}
              <span className="text-xs font-medium text-neutral-text-medium">
                {post.type === 'poem' ? 'கவிதை' : 'சிறுகதை'}
              </span>
            </div>
            <h3 className="text-xl font-tamil font-bold text-tamil-DEFAULT">{post.title}</h3>
            <p className="text-sm text-neutral-text-medium mt-1">
              {post.author} · {post.timestamp}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="font-tamil whitespace-pre-line text-neutral-text-dark leading-relaxed">
          {post.content}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col border-t border-neutral-border pt-4">
        <div className="flex justify-between items-center w-full mb-4">
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLike}
              className="flex items-center gap-1 text-neutral-text-medium hover:text-tamil-DEFAULT"
            >
              <ThumbsUp size={16} />
              <span>{post.likes}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 text-neutral-text-medium hover:text-tamil-DEFAULT"
            >
              <MessageCircle size={16} />
              <span>{post.comments.length}</span>
            </Button>
          </div>
        </div>
        
        {showComments && (
          <div className="w-full">
            {post.comments.length > 0 && (
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {post.comments.map(comment => (
                  <div 
                    key={comment.id} 
                    className="bg-neutral-background p-3 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-neutral-text-medium">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-neutral-text-dark font-tamil">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
            
            <form onSubmit={handleSubmitComment} className="flex gap-2 items-center">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="உங்கள் கருத்தை பதிவு செய்யுங்கள்..."
                className="flex-grow font-tamil"
              />
              <Button 
                type="submit" 
                size="sm" 
                disabled={!newComment.trim()}
              >
                <Send size={14} />
              </Button>
            </form>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default LibraryPostCard;
