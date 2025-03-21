
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TermPage from "./pages/TermPage";
import BrowsePage from "./pages/BrowsePage";
import TranslatorPage from "./pages/TranslatorPage";
import SummarizePage from "./pages/SummarizePage";
import ComingSoonPage from "./pages/ComingSoonPage";
import AboutPage from "./pages/AboutPage";
import LibraryPage from "./pages/LibraryPage";
import NotFound from "./pages/NotFound";
import WelcomeDialog from "./components/common/WelcomeDialog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <WelcomeDialog />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/term/:id" element={<TermPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/translator" element={<TranslatorPage />} />
          <Route path="/summarize" element={<SummarizePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
