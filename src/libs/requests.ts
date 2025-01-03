import useSWR from 'swr';

const PRODUCTALL_URL = `${import.meta.env.VITE_API_URL}/awards/festival2024/`;
const RANDOM_URL = `${import.meta.env.VITE_API_URL}/awards/festival2024/seat/random`;

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useProductALL = () => {
  const { data, error, isLoading } = useSWR(`${PRODUCTALL_URL}`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    actions: data || [],
    length: data?.filter((e: { Flag: number }) => e.Flag === 1).length,
    isLoading,
    isError: error,
  };
};

export const useProduct = (isDrawKey: boolean, value: number) => {
  const shouldFetch = isDrawKey && value > 0;
  const { data, error, isValidating } = useSWR(
    shouldFetch ? `${RANDOM_URL}?draw_no=${value}` : null,
    fetcher,
  );

  return {
    data: data?.map((e: { SeatNo: string }) => e.SeatNo.trim()) || [],
    isLoading: isValidating,
    isError: !!error,
  };
};
