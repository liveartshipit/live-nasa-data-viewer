import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useModalStore } from '../stores/modalStore';
import { useToast } from '@/hooks/use-toast';

export function AddSourceModal() {
  const { isOpen, modalType, closeModal } = useModalStore();
  const { toast } = useToast();
  const [sourceName, setSourceName] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Data Source Added',
      description: `${sourceName} has been successfully added to your dashboard.`,
    });
    setSourceName('');
    setApiEndpoint('');
    closeModal();
  };

  const handleReset = () => {
    setSourceName('');
    setApiEndpoint('');
  };

  return (
    <Dialog open={isOpen && modalType === 'addSource'} onOpenChange={closeModal}>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-sans text-2xl font-medium text-card-foreground">
            Add New Data Source
          </DialogTitle>
          <DialogDescription className="font-sans text-base font-light text-muted-foreground">
            Connect a new NASA API endpoint to your dashboard
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <Label htmlFor="source-name" className="font-sans text-base font-normal text-card-foreground">
              Source Name
            </Label>
            <Input
              id="source-name"
              placeholder="e.g., Mars Rover Photos"
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              required
              className="border-border bg-background text-foreground"
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="api-endpoint" className="font-sans text-base font-normal text-card-foreground">
              API Endpoint
            </Label>
            <Input
              id="api-endpoint"
              placeholder="https://api.nasa.gov/..."
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              required
              className="border-border bg-background text-foreground"
            />
            <p className="font-sans text-sm font-light text-muted-foreground">
              Enter a valid NASA API endpoint URL
            </p>
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Add Source
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
