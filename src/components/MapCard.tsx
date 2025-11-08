import { Card } from '@/components/ui/card';
import { useDataStore } from '../stores/dataStore';

export function MapCard() {
  const { issPosition } = useDataStore();

  return (
    <Card className="border-border bg-card p-8">
      <div className="mb-8">
        <h3 className="font-sans text-xl font-medium text-card-foreground">
          ISS Live Tracking
        </h3>
        <p className="mt-3 font-sans text-sm font-light text-muted-foreground">
          Current position of the International Space Station
        </p>
      </div>
      <div className="relative h-80 overflow-hidden rounded-lg">
        <iframe
          src={`https://maps.google.com/maps?q=${issPosition.latitude},${issPosition.longitude}&z=3&output=embed&key=YOUR_API_KEY`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          title="ISS Location Map"
          className="rounded-lg"
        />
        <div className="absolute bottom-6 left-6 rounded-lg bg-card/90 px-6 py-4 backdrop-blur-sm">
          <p className="font-mono text-sm font-normal text-card-foreground">
            Lat: {issPosition.latitude.toFixed(4)}° | Lon: {issPosition.longitude.toFixed(4)}°
          </p>
        </div>
      </div>
    </Card>
  );
}
