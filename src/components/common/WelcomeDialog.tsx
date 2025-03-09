
import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const WelcomeDialog = () => {
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    // Check if the user has visited before
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisited) {
      // If first visit, show dialog and set localStorage flag
      setOpen(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <span>Prototype Notice</span>
          </DialogTitle>
          <DialogDescription>
            This app is not fully finished. It is just a prototype.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} className="w-full sm:w-auto">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
