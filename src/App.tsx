import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppShell } from './components/AppShell';
import { DashboardView } from './components/DashboardView';
import { DataDetail } from './components/DataDetail';
import { SettingsPanel } from './components/SettingsPanel';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-1">
          <AppShell>
            <Routes>
              <Route path="/" element={<DashboardView />} />
              <Route path="/data/:id" element={<DataDetail />} />
              <Route path="/settings" element={<SettingsPanel />} />
            </Routes>
          </AppShell>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
