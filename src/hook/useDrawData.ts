import { useState, useEffect, useCallback } from 'react';
import { useProductALL } from '../libs/requests';

interface Action {
  code: string;
}

interface DrawData {
  ImageLink: string;
  DrawNo: number;
  GiftName: string;
  AdMan: string;
  parsedData: string[];
}

const useDrawData = () => {
  const { actions } = useProductALL();
  const [data, setData] = useState<DrawData[]>([]);
  const isLoading = localStorage.getItem('isLoading') === 'true';

  const updateData = useCallback(() => {
    if (!actions || actions.length === 0) return;

    const updatedData = actions.map((action: Action) => ({
      ...action,
      parsedData: localStorage.getItem(action.code)?.split(',') || [],
    }));

    setData(updatedData);
  }, [actions]);

  useEffect(() => {
    const handleStorageChange = () => {
      updateData();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [updateData]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  // useEffect(() => {
  //   const fetchAndUpdate = async () => {
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/awards/festival2024/`);
  //     const updatedData = await response.json();
  //     setData(updatedData);
  //   };

  //   const interval = setInterval(() => {
  //     fetchAndUpdate();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return { data, isLoading };
};

export default useDrawData;
