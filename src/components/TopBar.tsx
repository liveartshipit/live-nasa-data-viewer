import { MenuIcon, RefreshCwIcon, MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useDataStore } from '../stores/dataStore';
import { useThemeStore } from '../stores/themeStore';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { lastUpdate, isRefreshing, refreshData } = useDataStore();
  const { theme, toggleTheme } = useThemeStore();

  const getTimeAgo = () => {
    if (!lastUpdate) return 'Never';
    const minutes = Math.floor((Date.now() - lastUpdate) / 60000);
    if (minutes === 0) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    return `${minutes} minutes ago`;
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-secondary px-8 lg:px-16">
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent text-secondary-foreground hover:bg-muted hover:text-secondary-foreground lg:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <MenuIcon className="h-8 w-8" strokeWidth={1.5} />
        </Button>
        <div className="hidden lg:block">
          <p className="font-mono text-sm font-normal text-muted-foreground">
            Last data update received {getTimeAgo()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent text-secondary-foreground hover:bg-muted hover:text-secondary-foreground"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <SunIcon className="h-8 w-8" strokeWidth={1.5} />
          ) : (
            <MoonIcon className="h-8 w-8" strokeWidth={1.5} />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent text-secondary-foreground hover:bg-muted hover:text-secondary-foreground"
          onClick={refreshData}
          disabled={isRefreshing}
          aria-label="Refresh data"
        >
          <RefreshCwIcon
            className={`h-8 w-8 ${isRefreshing ? 'animate-spin' : ''}`}
            strokeWidth={1.5}
          />
        </Button>
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-accent text-accent-foreground">
            U
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
