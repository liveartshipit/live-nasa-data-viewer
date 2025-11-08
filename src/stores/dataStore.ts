import { create } from 'zustand';

interface NasaData {
  epic?: {
    lastUpdate: number;
    imageCount: number;
  };
  neo?: {
    lastUpdate: number;
    count: number;
  };
  iss?: {
    lastUpdate: number;
    latitude: number;
    longitude: number;
  };
}

interface ChartDataPoint {
  date: string;
  count: number;
}

interface DataStore {
  lastUpdate: number | null;
  isRefreshing: boolean;
  refreshInterval: number;
  data: NasaData;
  chartData: ChartDataPoint[];
  issPosition: { latitude: number; longitude: number };
  setLastUpdate: (timestamp: number) => void;
  setIsRefreshing: (isRefreshing: boolean) => void;
  setRefreshInterval: (interval: number) => void;
  setData: (data: NasaData) => void;
  refreshData: () => void;
}

const generateChartData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count: Math.floor(Math.random() * 30) + 20,
    });
  }
  return data;
};

export const useDataStore = create<DataStore>((set) => ({
  lastUpdate: Date.now(),
  isRefreshing: false,
  refreshInterval: 300000,
  data: {
    epic: {
      lastUpdate: Date.now(),
      imageCount: 12,
    },
    neo: {
      lastUpdate: Date.now(),
      count: 47,
    },
    iss: {
      lastUpdate: Date.now(),
      latitude: 42.3601,
      longitude: -71.0589,
    },
  },
  chartData: generateChartData(),
  issPosition: { latitude: 42.3601, longitude: -71.0589 },
  setLastUpdate: (timestamp) => set({ lastUpdate: timestamp }),
  setIsRefreshing: (isRefreshing) => set({ isRefreshing }),
  setRefreshInterval: (interval) => set({ refreshInterval: interval }),
  setData: (data) => set({ data }),
  refreshData: () => {
    set({ isRefreshing: true });
    setTimeout(() => {
      set({
        isRefreshing: false,
        lastUpdate: Date.now(),
        data: {
          epic: {
            lastUpdate: Date.now(),
            imageCount: Math.floor(Math.random() * 20) + 5,
          },
          neo: {
            lastUpdate: Date.now(),
            count: Math.floor(Math.random() * 60) + 30,
          },
          iss: {
            lastUpdate: Date.now(),
            latitude: Math.random() * 180 - 90,
            longitude: Math.random() * 360 - 180,
          },
        },
        chartData: generateChartData(),
        issPosition: {
          latitude: Math.random() * 180 - 90,
          longitude: Math.random() * 360 - 180,
        },
      });
    }, 1500);
  },
}));
