
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Book, BookOpen, Upload, Heart, MessageCircle, Plus, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LibraryPostCard from '@/components/library/LibraryPostCard';
import CreatePostDialog from '@/components/library/CreatePostDialog';

// Mock data for library posts
const INITIAL_POSTS = [
  {
    id: '1',
    title: 'நிலா விழி ✨🌙',
    content: `நிழல் போலே நீ வந்தாய்,
நினைவாகி போனாய்!
நிலா ஒளியில் கனாக்களாய்,
நெஞ்சமே நிறைந்தாய்!

காற்று பேசும் காதலாய்,
கண்ணில் தங்கி நீயே!
நேரம் சென்றாலும் என்றும்,
நெஞ்சில் வாழ்வாய் நீயே! ❤️`,
    author: 'கவிஞர் அமுதன்',
    type: 'poem' as const,
    likes: 24,
    comments: [
      { id: 'c1', author: 'ராஜன்', content: 'அருமையான கவிதை! மிகவும் பிடித்திருந்தது.', timestamp: '2 hours ago' },
      { id: 'c2', author: 'மாலதி', content: 'உணர்வுகளை அழகாக வெளிப்படுத்தியுள்ளீர்கள்.', timestamp: '1 day ago' }
    ],
    timestamp: '3 days ago'
  },
  {
    id: '2',
    title: 'காற்றும் கனவும் ✨🌿',
    content: `சிறிய கிராமத்தில் வசித்த அருண், வானத்தை நேசிக்கிறான். அவனுக்கு சிறுவயதில் இருந்து விண்வெளியை ஆராய்வதென்றே ஆசை. ஆனால் கிராமத்தில் பெரிய வாய்ப்புகள் இல்லை.

ஒரு நாள், ஒரு போட்டியில் கலந்து கொண்டு, அவன் எழுதிய கட்டுரை முதல் பரிசு பெற்றது. அது அவனை நகரத்திற்குக் கூட்டி சென்றது. அங்கு அவன் ஒரு பெரிய விஞ்ஞானியை சந்திக்கிறான். அந்த விஞ்ஞானி கூறுகிறார்:

"வாய்ப்புகள் நீண்டதூரம் பயணம் செய்யத்தான் செய்தாலும், கனவு பறக்கத் தொடங்குவதற்கு ஒரு சிறிய காற்றே போதும்!"

அந்த வார்த்தைகள் அருணுக்கு ஒரு புதிய நம்பிக்கையைக் கொடுத்தது. சில ஆண்டுகளுக்குப் பிறகு, அவன் இந்தியாவின் முக்கிய விண்வெளி ஆராய்ச்சியாளராக மாறினான். கிராமத்திலிருந்த சிறிய கனவு, விண்வெளிக்குப் பறந்தது! 🚀✨

மொழி:
நம் கனவுகள் எதுவாக இருந்தாலும், நம்பிக்கையுடன் முயன்றால் அது நிச்சயமாக நிறைவேறும்! 😊`,
    author: 'செல்வா',
    type: 'story' as const,
    likes: 45,
    comments: [
      { id: 'c3', author: 'ரமேஷ்', content: 'சிறுகதை மூலம் ஒரு அழகான செய்தியைச் சொல்லியுள்ளீர்கள்.', timestamp: '1 hour ago' }
    ],
    timestamp: '2 days ago'
  }
];

// Define the post interface
interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  type: 'poem' | 'story';
  likes: number;
  comments: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }[];
  timestamp: string;
}

const LibraryPage = () => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const handlePostSubmit = (newPost: { title: string; content: string; type: 'poem' | 'story' }) => {
    const postWithDetails: Post = {
      ...newPost,
      id: `post-${Date.now()}`,
      author: 'உங்கள் பெயர்',
      likes: 0,
      comments: [],
      timestamp: 'Just now'
    };
    
    setPosts([postWithDetails, ...posts]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "பதிவு வெற்றிகரமாக சேர்க்கப்பட்டது",
      description: "உங்கள் படைப்பு நூலகத்தில் சேர்க்கப்பட்டது.",
    });
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAddComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: `comment-${Date.now()}`,
          author: 'உங்கள் பெயர்',
          content: commentText,
          timestamp: 'Just now'
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));

    toast({
      description: "கருத்து சேர்க்கப்பட்டது",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-neutral-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-tamil-DEFAULT mb-2 flex items-center">
                <BookOpen className="mr-2" size={28} />
                நூலகம் <span className="ml-2 text-neutral-text-medium font-normal text-lg">(Tamil Library)</span>
              </h1>
              <p className="text-neutral-text-medium">
                தமிழ் கவிதைகள், சிறுகதைகள் மற்றும் படைப்புகளை பகிர்ந்து கொள்ளுங்கள்
              </p>
            </div>
            
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="mt-4 md:mt-0 flex items-center gap-2"
            >
              <Plus size={16} />
              புதிய படைப்பு சேர்க்க
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {posts.map(post => (
              <LibraryPostCard
                key={post.id}
                post={post}
                onLike={() => handleLike(post.id)}
                onAddComment={(comment) => handleAddComment(post.id, comment)}
              />
            ))}
          </div>
        </div>
      </main>
      
      <CreatePostDialog 
        isOpen={isCreateDialogOpen} 
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handlePostSubmit}
      />
      
      <footer className="bg-white border-t border-neutral-border py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-text-medium text-sm">
              © 2025 Tamil Language Tools. All rights reserved.
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

export default LibraryPage;
