import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDataStore } from '../stores/dataStore';
import { useToast } from './use-toast';

interface NasaFeedData {
  epic: {
    lastUpdate: number;
    imageCount: number;
  };
  neo: {
    lastUpdate: number;
    count: number;
  };
  iss: {
    lastUpdate: number;
    latitude: number;
    longitude: number;
  };
}

const fetchNasaData = async (): Promise<NasaFeedData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return {
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
  };
};

export function useNasaFeed(refreshInterval: number) {
  const { setLastUpdate, setData } = useDataStore();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ['nasaFeed'],
    queryFn: fetchNasaData,
    refetchInterval: refreshInterval,
  });

  useEffect(() => {
    if (query.data) {
      setData(query.data);
      setLastUpdate(Date.now());
      
      toast({
        title: 'Data Updated',
        description: 'Latest NASA data has been fetched successfully.',
      });
    }
  }, [query.data, setData, setLastUpdate, toast]);

  return query;
}
