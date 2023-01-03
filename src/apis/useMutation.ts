import { useState } from 'react';

interface useMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}

type UseMutationResult = [(data: any) => void, useMutationState];

export default function useMutation(url: string): UseMutationResult {
  const [state, setState] = useState<useMutationState>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        version: '1',
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
