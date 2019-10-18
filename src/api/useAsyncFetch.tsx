import { useState, useEffect } from 'react';
import api from './index';

function useAsyncFetch(
  apiMethod: 'getWines' | 'getWine' | 'insertWine' | 'getTypes' | 'getGrapes',
  methodParams: any,
  dependecies: any[] | [],
  disabled = false
) {
  const [{ dataFetch, isLoading, hasError }, setFetchState] = useState<{
    dataFetch: any;
    isLoading: boolean;
    hasError: boolean;
  }>({
    dataFetch: undefined,
    isLoading: false,
    hasError: false
  });

  useEffect(() => {
    (async function() {
      if (!disabled) {
        setFetchState(previous => ({ ...previous, isLoading: true, hasError: false }));

        try {
          const response = await api[apiMethod](methodParams);

          setFetchState(previous => ({ ...previous, dataFetch: response, isLoading: false }));
        } catch (e) {
          setFetchState(previous => ({ ...previous, isLoading: false, hasError: true }));
        }
      }
    })();
  }, [...dependecies, disabled]);

  return [dataFetch, isLoading, hasError];
}

export default useAsyncFetch;
