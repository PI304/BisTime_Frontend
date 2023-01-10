import { CONFIG } from '@config';
import { useState } from 'react';
interface useMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, useMutationState<T>];

export default function useMutation<T = any>(
  url: string,
): UseMutationResult<T> {
  const [state, setState] = useState<useMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(`${CONFIG.API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json; version=1',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch(() => {
        //json이 없는경우 예외처리 일단 그냥 둠
      })
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }

  return [mutation, { ...state }];
}
