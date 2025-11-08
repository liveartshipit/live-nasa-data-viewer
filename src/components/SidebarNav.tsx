import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, DatabaseIcon, SettingsIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SidebarNav({ isOpen, onClose }: SidebarNavProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: HomeIcon },
    { path: '/data-sources', label: 'Data Sources', icon: DatabaseIcon },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-secondary transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex h-full flex-col" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between px-8 py-8">
            <h1 className="font-sans text-xl font-medium tracking-tight text-primary-foreground">
              NASA Live
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="bg-transparent text-primary-foreground hover:bg-muted hover:text-primary-foreground lg:hidden"
              onClick={onClose}
              aria-label="Close menu"
            >
              <XIcon className="h-8 w-8" strokeWidth={1.5} />
            </Button>
          </div>
          <Separator className="bg-border" />
          <div className="flex-1 space-y-4 px-6 py-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-4 rounded-lg px-6 py-5 font-sans text-base font-normal transition-colors ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-primary-foreground hover:bg-muted hover:text-primary-foreground'
                  }`}
                >
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
