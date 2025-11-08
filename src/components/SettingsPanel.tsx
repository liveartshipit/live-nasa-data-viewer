import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDataStore } from '../stores/dataStore';
import { useThemeStore } from '../stores/themeStore';

export function SettingsPanel() {
  const { refreshInterval, setRefreshInterval } = useDataStore();
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-sans text-4xl font-medium tracking-tight text-primary-foreground">
          Settings
        </h1>
        <p className="mt-4 font-sans text-base font-light text-muted-foreground">
          Configure your dashboard preferences
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="border-border bg-card p-8">
          <h2 className="font-sans text-2xl font-medium text-card-foreground">
            Appearance
          </h2>
          <p className="mt-4 font-sans text-base font-light text-muted-foreground">
            Customize the visual theme of your dashboard
          </p>
          <div className="mt-12 flex items-center justify-between">
            <div className="space-y-2">
              <Label htmlFor="dark-mode" className="font-sans text-base font-normal text-card-foreground">
                Dark Mode
              </Label>
              <p className="font-sans text-sm font-light text-muted-foreground">
                Toggle between light and dark themes
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
        </Card>

        <Card className="border-border bg-card p-8">
          <h2 className="font-sans text-2xl font-medium text-card-foreground">
            Data Refresh
          </h2>
          <p className="mt-4 font-sans text-base font-light text-muted-foreground">
            Control how often data is updated
          </p>
          <div className="mt-12 space-y-4">
            <Label htmlFor="refresh-interval" className="font-sans text-base font-normal text-card-foreground">
              Update Interval
            </Label>
            <Select
              value={refreshInterval.toString()}
              onValueChange={(value) => setRefreshInterval(parseInt(value))}
            >
              <SelectTrigger id="refresh-interval" className="border-border bg-background text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border bg-card">
                <SelectItem value="60000" className="text-card-foreground">1 minute</SelectItem>
                <SelectItem value="300000" className="text-card-foreground">5 minutes</SelectItem>
                <SelectItem value="600000" className="text-card-foreground">10 minutes</SelectItem>
                <SelectItem value="1800000" className="text-card-foreground">30 minutes</SelectItem>
              </SelectContent>
            </Select>
            <p className="font-sans text-sm font-light text-muted-foreground">
              Choose how frequently to fetch new data
            </p>
          </div>
        </Card>
      </div>

      <Card className="border-border bg-card p-8">
        <h2 className="font-sans text-2xl font-medium text-card-foreground">
          About
        </h2>
        <p className="mt-4 font-sans text-base font-light text-muted-foreground">
          NASA Live Data Dashboard v1.0.0
        </p>
        <div className="mt-8 space-y-4">
          <p className="font-sans text-base font-light text-card-foreground">
            This application provides real-time visualization of NASA's open data APIs, including Earth imagery, near-Earth objects, and ISS tracking.
          </p>
          <p className="font-sans text-base font-light text-card-foreground">
            Data is sourced from NASA's public API endpoints and updated according to your configured refresh interval.
          </p>
        </div>
      </Card>
    </div>
  );
}
