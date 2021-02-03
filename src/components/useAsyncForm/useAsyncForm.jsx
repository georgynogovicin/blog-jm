import { useEffect, useCallback, useState } from 'react';

const useAsyncForm = (asyncFn, immediate) => {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (data) => {
      setStatus('pending');
      setValue(null);
      setError(null);

      try {
        const res = await asyncFn(data);

        setValue(res);
        setStatus('success');
      } catch (errors) {
        setError(errors);
        setStatus('error');
      }
    },
    [asyncFn]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
};

export default useAsyncForm;
