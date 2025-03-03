
import { cn } from '@/lib/utils';

// Animation class utility functions to abstract common animation patterns
export const animations = {
  fadeIn: (delayMs = 0) => 
    cn("opacity-0", { 
      "animate-fade-in": true,
      "animation-delay-100": delayMs === 100,
      "animation-delay-200": delayMs === 200,
      "animation-delay-300": delayMs === 300,
      "animation-delay-500": delayMs === 500,
    }),
  
  slideUp: (delayMs = 0) => 
    cn("opacity-0", { 
      "animate-slide-up": true,
      "animation-delay-100": delayMs === 100,
      "animation-delay-200": delayMs === 200,
      "animation-delay-300": delayMs === 300,
      "animation-delay-500": delayMs === 500,
    }),
  
  slideDown: (delayMs = 0) => 
    cn("opacity-0", { 
      "animate-slide-down": true,
      "animation-delay-100": delayMs === 100,
      "animation-delay-200": delayMs === 200,
      "animation-delay-300": delayMs === 300,
      "animation-delay-500": delayMs === 500,
    }),
  
  scaleIn: (delayMs = 0) => 
    cn("opacity-0 scale-95", { 
      "animate-scale-in": true,
      "animation-delay-100": delayMs === 100,
      "animation-delay-200": delayMs === 200,
      "animation-delay-300": delayMs === 300,
      "animation-delay-500": delayMs === 500,
    }),
};

// Stagger children animation helper
export const staggerChildren = (children: HTMLElement[], animation: string, baseDelay = 100) => {
  children.forEach((child, index) => {
    const delay = baseDelay * index;
    child.style.animationDelay = `${delay}ms`;
    child.classList.add(animation);
  });
};

// Animation delay CSS classes
export const animationDelayClass = (delayMs: number) => {
  switch (delayMs) {
    case 100: return "animation-delay-100";
    case 200: return "animation-delay-200";
    case 300: return "animation-delay-300";
    case 500: return "animation-delay-500";
    default: return "";
  }
};
