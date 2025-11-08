import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { SatelliteIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description: string;
  lastUpdate?: number;
  value: string | number;
  unit: string;
  isLoading: boolean;
  dataId: string;
}

export function DashboardCard({
  title,
  description,
  lastUpdate,
  value,
  unit,
  isLoading,
  dataId,
}: DashboardCardProps) {
  const navigate = useNavigate();

  const getTimeAgo = () => {
    if (!lastUpdate) return 'No data';
    const minutes = Math.floor((Date.now() - lastUpdate) / 60000);
    if (minutes === 0) return 'Just now';
    if (minutes === 1) return '1 min ago';
    if (minutes < 60) return `${minutes} mins ago`;
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  return (
    <Card
      className="group cursor-pointer border-border bg-card p-8 transition-all duration-300 ease-in-out hover:border-accent"
      onClick={() => navigate(`/data/${dataId}`)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-sans text-xl font-medium text-card-foreground">
            {title}
          </h3>
          <p className="mt-3 font-sans text-sm font-light text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="rounded-lg bg-accent/10 p-4">
          <SatelliteIcon className="h-8 w-8 text-accent" strokeWidth={1.5} />
        </div>
      </div>
      <div className="mt-8">
        {isLoading ? (
          <div className="h-12 w-32 animate-pulse rounded bg-muted" />
        ) : (
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-4xl font-medium text-card-foreground">
              {value}
            </span>
            {unit && (
              <span className="font-mono text-base font-normal text-muted-foreground">
                {unit}
              </span>
            )}
          </div>
        )}
        <p className="mt-4 font-mono text-xs font-normal text-muted-foreground">
          Updated {getTimeAgo()}
        </p>
      </div>
    </Card>
  );
}
