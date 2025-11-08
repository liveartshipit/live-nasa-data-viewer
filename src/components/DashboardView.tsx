import { useEffect } from 'react';
import { DashboardCard } from './DashboardCard';
import { ChartCard } from './ChartCard';
import { MapCard } from './MapCard';
import { AddSourceModal } from './AddSourceModal';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useDataStore } from '../stores/dataStore';
import { useModalStore } from '../stores/modalStore';
import { useNasaFeed } from '../hooks/useNasaFeed';

export function DashboardView() {
  const { refreshInterval } = useDataStore();
  const { openModal } = useModalStore();
  const { data, isLoading } = useNasaFeed(refreshInterval);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-4xl font-medium tracking-tight text-primary-foreground">
            NASA Live Data Dashboard
          </h1>
          <p className="mt-4 font-sans text-base font-light text-muted-foreground">
            Real-time space insights from NASA's open data APIs
          </p>
        </div>
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => openModal('addSource')}
        >
          <PlusIcon className="mr-3 h-8 w-8" strokeWidth={1.5} />
          Add Data Source
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Earth Imagery"
          description="Latest EPIC Earth Polychromatic Imaging Camera data"
          lastUpdate={data?.epic?.lastUpdate}
          value={data?.epic?.imageCount || 0}
          unit="images"
          isLoading={isLoading}
          dataId="epic"
        />
        <DashboardCard
          title="Near-Earth Objects"
          description="Asteroids and comets approaching Earth"
          lastUpdate={data?.neo?.lastUpdate}
          value={data?.neo?.count || 0}
          unit="objects"
          isLoading={isLoading}
          dataId="neo"
        />
        <DashboardCard
          title="ISS Position"
          description="International Space Station current location"
          lastUpdate={data?.iss?.lastUpdate}
          value={`${data?.iss?.latitude?.toFixed(2) || 0}°, ${data?.iss?.longitude?.toFixed(2) || 0}°`}
          unit=""
          isLoading={isLoading}
          dataId="iss"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <ChartCard />
        <MapCard />
      </div>

      <AddSourceModal />
    </div>
  );
}
