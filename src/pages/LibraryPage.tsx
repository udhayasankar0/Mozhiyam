
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Book, BookOpen, Upload, Heart, MessageCircle, Plus, ThumbsUp, Search, Filter, SortAsc, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LibraryPostCard from '@/components/library/LibraryPostCard';
import CreatePostDialog from '@/components/library/CreatePostDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  },
  {
    id: '3',
    title: 'மழை நாள் 🌧️',
    content: `மழை பெய்யும் நாளில்
மனம் குளிர்ந்தது
மரங்கள் நடனமாடின
மலர்கள் மகிழ்ந்தன
மண்ணின் வாசனை
மனதை நிறைத்தது

நீர் துளிகள் ஜன்னல் வழியே
நெஞ்சில் இசையெழுப்பின
நினைவுகள் கரைந்தன
நேரம் நின்றது`,
    author: 'Prabhakaran',
    type: 'poem' as const,
    likes: 18,
    comments: [
      { id: 'c4', author: 'சரவணன்', content: 'மழை நாளின் உணர்வுகளை அழகாக வெளிப்படுத்தியுள்ளீர்கள்!', timestamp: '5 hours ago' }
    ],
    timestamp: '1 day ago'
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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState<'all' | 'poem' | 'story'>('all');
  const [userName, setUserName] = useState('Prabhakaran');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data from an API
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handlePostSubmit = (newPost: { title: string; content: string; type: 'poem' | 'story' }) => {
    const postWithDetails: Post = {
      ...newPost,
      id: `post-${Date.now()}`,
      author: userName,
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

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAddComment = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: `comment-${Date.now()}`,
          author: userName,
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

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = currentFilter === 'all' || post.type === currentFilter;
    
    return matchesSearch && matchesFilter;
  });

  const featuredPosts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 3);
  
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
            
            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-text-medium" />
                <Input
                  placeholder="தேடுங்கள்..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                புதிய படைப்பு
              </Button>
            </div>
          </div>

          {/* User Profile Banner */}
          <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-neutral-border">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-tamil-DEFAULT/10 flex items-center justify-center text-tamil-DEFAULT">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{userName}</h2>
                <p className="text-neutral-text-medium">3 படைப்புகள் · 67 விருப்பங்கள் பெற்றவை</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setCurrentFilter('all')}>
                  அனைத்தும்
                </TabsTrigger>
                <TabsTrigger value="poem" onClick={() => setCurrentFilter('poem')}>
                  <BookOpen size={14} className="mr-1" />
                  கவிதைகள்
                </TabsTrigger>
                <TabsTrigger value="story" onClick={() => setCurrentFilter('story')}>
                  <Book size={14} className="mr-1" />
                  சிறுகதைகள்
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-neutral-text-medium">
                  <SortAsc size={16} className="mr-1" />
                  சமீபத்தியவை
                </Button>
              </div>
            </div>
          </Tabs>

          {/* Featured Section */}
          {currentFilter === 'all' && searchQuery === '' && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Heart size={18} className="mr-2 text-tamil-DEFAULT" />
                சிறந்த படைப்புகள்
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPosts.map(post => (
                  <div key={post.id} className="bg-white p-4 rounded-lg border border-neutral-border shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      {post.type === 'poem' ? (
                        <BookOpen size={14} className="text-tamil-medium" />
                      ) : (
                        <Book size={14} className="text-tamil-light" />
                      )}
                      <span className="text-xs font-medium text-neutral-text-medium">
                        {post.type === 'poem' ? 'கவிதை' : 'சிறுகதை'}
                      </span>
                    </div>
                    <h3 className="font-bold text-tamil-DEFAULT mb-1">{post.title}</h3>
                    <p className="text-sm text-neutral-text-medium mb-2">{post.author}</p>
                    <p className="text-sm line-clamp-3 mb-3">{post.content.substring(0, 120)}...</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsUp size={14} className="text-tamil-DEFAULT" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle size={14} className="text-neutral-text-medium" />
                        <span className="text-sm">{post.comments.length}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skeleton loader */}
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-lg border border-neutral-border bg-white p-6 animate-pulse">
                  <div className="h-6 bg-neutral-background rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-neutral-background rounded w-1/4 mb-8"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-neutral-background rounded"></div>
                    <div className="h-3 bg-neutral-background rounded"></div>
                    <div className="h-3 bg-neutral-background rounded w-4/5"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <ScrollArea className="h-[calc(100vh-350px)]">
              <div className="space-y-6 pr-4">
                {filteredPosts.map(post => (
                  <LibraryPostCard
                    key={post.id}
                    post={post}
                    onLike={() => handleLike(post.id)}
                    onAddComment={(comment) => handleAddComment(post.id, comment)}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg font-medium">எந்த படைப்புகளும் கிடைக்கவில்லை</p>
              <p className="text-neutral-text-medium mt-2">தேடலுக்கு பொருந்தும் படைப்புகள் இல்லை. வேறு தேடல் சொற்களை முயற்சிக்கவும்.</p>
            </div>
          )}
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
