import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, DownloadIcon, Share2Icon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDataStore } from '../stores/dataStore';
import { useToast } from '@/hooks/use-toast';

export function DataDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chartData } = useDataStore();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownload = () => {
    toast({
      title: 'DownloadIcon Started',
      description: 'Your dataset is being prepared for download.',
    });
  };

  const handleShare = () => {
    toast({
      title: 'Link Copied',
      description: 'Share link has been copied to clipboard.',
    });
  };

  const getTitle = () => {
    switch (id) {
      case 'epic':
        return 'Earth Imagery Data';
      case 'neo':
        return 'Near-Earth Objects Data';
      case 'iss':
        return 'ISS Position Data';
      default:
        return 'Data Details';
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="bg-transparent text-primary-foreground hover:bg-muted hover:text-primary-foreground"
            onClick={() => navigate('/')}
            aria-label="Back to dashboard"
          >
            <ArrowLeftIcon className="h-8 w-8" strokeWidth={1.5} />
          </Button>
          <div>
            <h1 className="font-sans text-4xl font-medium tracking-tight text-primary-foreground">
              {getTitle()}
            </h1>
            <p className="mt-4 font-sans text-base font-light text-muted-foreground">
              Detailed view and historical trends
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            onClick={handleShare}
          >
            <Share2Icon className="mr-3 h-8 w-8" strokeWidth={1.5} />
            Share
          </Button>
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={handleDownload}
          >
            <DownloadIcon className="mr-3 h-8 w-8" strokeWidth={1.5} />
            DownloadIcon
          </Button>
        </div>
      </div>

      <Card className="border-border bg-card p-12">
        <div className="mb-12">
          <h2 className="font-sans text-2xl font-medium text-card-foreground">
            Historical Timeline
          </h2>
          <p className="mt-4 font-sans text-base font-light text-muted-foreground">
            Data trends over the past 7 days
          </p>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 10%, 25%)" />
              <XAxis
                dataKey="date"
                stroke="hsl(220, 13%, 88%)"
                style={{ fontSize: '14px', fontFamily: 'JetBrains Mono' }}
              />
              <YAxis
                stroke="hsl(220, 13%, 88%)"
                style={{ fontSize: '14px', fontFamily: 'JetBrains Mono' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(220, 12%, 18%)',
                  border: '1px solid hsl(220, 10%, 25%)',
                  borderRadius: '12px',
                  color: 'hsl(210, 20%, 98%)',
                  fontFamily: 'JetBrains Mono',
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="hsl(218, 72%, 50%)"
                strokeWidth={3}
                dot={{ fill: 'hsl(218, 72%, 50%)', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="border-border bg-card p-8">
          <h3 className="font-sans text-lg font-medium text-card-foreground">
            Total Records
          </h3>
          <p className="mt-6 font-mono text-4xl font-medium text-accent">
            1,247
          </p>
          <p className="mt-4 font-mono text-sm font-normal text-muted-foreground">
            Last 30 days
          </p>
        </Card>
        <Card className="border-border bg-card p-8">
          <h3 className="font-sans text-lg font-medium text-card-foreground">
            Average Daily
          </h3>
          <p className="mt-6 font-mono text-4xl font-medium text-accent">
            42
          </p>
          <p className="mt-4 font-mono text-sm font-normal text-muted-foreground">
            Records per day
          </p>
        </Card>
        <Card className="border-border bg-card p-8">
          <h3 className="font-sans text-lg font-medium text-card-foreground">
            Peak Activity
          </h3>
          <p className="mt-6 font-mono text-4xl font-medium text-accent">
            89
          </p>
          <p className="mt-4 font-mono text-sm font-normal text-muted-foreground">
            Highest count
          </p>
        </Card>
      </div>
    </div>
  );
}
