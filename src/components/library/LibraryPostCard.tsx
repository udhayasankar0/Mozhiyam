
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  Send, 
  BookOpen, 
  FileText, 
  Search, 
  User,
  Share,
  Bookmark,
  MoreHorizontal,
  AlertCircle
} from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);

  // Count words in post content
  const wordCount = post.content.split(/\s+/).filter(Boolean).length;
  const isLongContent = wordCount > 100;
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleLike = () => {
    setHasLiked(!hasLiked);
    if (hasDisliked) setHasDisliked(false);
    onLike();
  };

  const handleDislike = () => {
    setHasDisliked(!hasDisliked);
    if (hasLiked) setHasLiked(false);
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
    // Focus the comment input when comments are shown
    if (!showComments) {
      setTimeout(() => {
        commentInputRef.current?.focus();
      }, 100);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    alert('Sharing functionality would be implemented here in a real application');
  };

  const filteredComments = searchQuery 
    ? post.comments.filter(comment => 
        comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comment.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : post.comments;

  // Calculate read time (rough estimate)
  const readTimeMinutes = Math.max(1, Math.round(wordCount / 200));

  return (
    <Card className="overflow-hidden border-neutral-border hover:shadow-md transition-shadow">
      <CardHeader className="bg-white pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {post.type === 'poem' ? (
                <Badge variant="outline" className="flex items-center gap-1 text-tamil-medium border-tamil-light/30 bg-tamil-light/10">
                  <BookOpen size={12} className="text-tamil-medium" />
                  கவிதை
                </Badge>
              ) : (
                <Badge variant="outline" className="flex items-center gap-1 text-tamil-light border-tamil-light/30 bg-tamil-light/10">
                  <FileText size={12} className="text-tamil-light" />
                  சிறுகதை
                </Badge>
              )}
              
              <span className="text-xs font-medium text-neutral-text-medium">
                {readTimeMinutes} நிமிடம் படிக்க
              </span>
            </div>
            <h3 className="text-xl font-tamil font-bold text-tamil-DEFAULT">{post.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-6 h-6 rounded-full bg-tamil-DEFAULT/10 flex items-center justify-center text-tamil-DEFAULT">
                <User size={12} />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{post.author}</span>
                <span className="text-xs text-neutral-text-medium">· {post.timestamp}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBookmark}
              className={`p-2 h-8 w-8 rounded-full ${isBookmarked ? 'text-tamil-DEFAULT' : 'text-neutral-text-medium'}`}
            >
              <Bookmark size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleShare}
              className="p-2 h-8 w-8 rounded-full text-neutral-text-medium"
            >
              <Share size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="p-2 h-8 w-8 rounded-full text-neutral-text-medium"
            >
              <MoreHorizontal size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="font-tamil whitespace-pre-line text-neutral-text-dark leading-relaxed">
          {isLongContent && !showFullContent ? (
            <>
              {post.content.split(/\s+/).slice(0, 100).join(' ')}...
              <Button 
                variant="link" 
                onClick={() => setShowFullContent(true)}
                className="mt-2 p-0 h-auto text-tamil-DEFAULT"
              >
                மேலும் படிக்க
              </Button>
            </>
          ) : (
            post.content
          )}
          
          {isLongContent && showFullContent && (
            <Button 
              variant="link" 
              onClick={() => setShowFullContent(false)}
              className="mt-2 p-0 h-auto text-tamil-DEFAULT"
            >
              குறைவாகக் காட்டு
            </Button>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col border-t border-neutral-border pt-4">
        <div className="flex justify-between items-center w-full mb-4">
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike}
              className={`flex items-center gap-1 ${hasLiked ? 'text-green-600' : 'text-neutral-text-medium hover:text-tamil-DEFAULT'}`}
            >
              <ThumbsUp size={16} className={hasLiked ? 'fill-green-600' : ''} />
              <span>{post.likes}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleDislike}
              className={`flex items-center gap-1 ${hasDisliked ? 'text-red-600' : 'text-neutral-text-medium hover:text-tamil-DEFAULT'}`}
            >
              <ThumbsDown size={16} className={hasDisliked ? 'fill-red-600' : ''} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleCommentClick}
              className={`flex items-center gap-1 ${showComments ? 'text-tamil-DEFAULT' : 'text-neutral-text-medium hover:text-tamil-DEFAULT'}`}
            >
              <MessageCircle size={16} />
              <span>{post.comments.length}</span>
            </Button>
          </div>
          
          {post.comments.length > 0 && !showComments && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleCommentClick}
              className="text-sm text-tamil-DEFAULT"
            >
              கருத்துகளைக் காட்டு
            </Button>
          )}
        </div>
        
        {showComments && (
          <div className="w-full">
            {post.comments.length > 0 && (
              <>
                <div className="mb-3 flex gap-2">
                  <div className="relative flex-grow">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="கருத்துகளைத் தேடுங்கள்..."
                      className="pl-9 font-tamil"
                    />
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-text-medium" />
                  </div>
                </div>
              
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-1">
                  {filteredComments.length > 0 ? (
                    filteredComments.map(comment => (
                      <div 
                        key={comment.id} 
                        className="bg-neutral-background p-3 rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-tamil-DEFAULT/10 flex items-center justify-center text-tamil-DEFAULT">
                              <User size={12} />
                            </div>
                            <span className="font-medium text-sm">{comment.author}</span>
                          </div>
                          <span className="text-xs text-neutral-text-medium">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-neutral-text-dark font-tamil">{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-neutral-text-medium">
                      <AlertCircle size={18} className="mx-auto mb-2" />
                      <p className="text-sm">தேடலுக்கு பொருந்தும் கருத்துகள் இல்லை.</p>
                    </div>
                  )}
                </div>
              </>
            )}
            
            <form onSubmit={handleSubmitComment} className="flex gap-2 items-center">
              <div className="w-6 h-6 rounded-full bg-tamil-DEFAULT/10 flex-shrink-0 flex items-center justify-center text-tamil-DEFAULT">
                <User size={12} />
              </div>
              <Input
                ref={commentInputRef}
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
