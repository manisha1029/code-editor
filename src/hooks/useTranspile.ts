import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { transpile } from '../utils/transpiler';

export const useTranspile = (code: string, delay: number = 500) => {
  const [transpiledCode, setTranspiledCode] = useState('');
  const [error, setError] = useState('');

  const debouncedTranspile = useCallback(
    debounce((inputCode: string) => {
      try {
        const result = transpile(inputCode);
        setTranspiledCode(result);
        setError('');
      } catch (err: any) {
        setError(err.message);
      }
    }, delay),
    [delay]
  );

  useEffect(() => {
    debouncedTranspile(code);
    return () => debouncedTranspile.cancel();
  }, [code, debouncedTranspile]);

  return { transpiledCode, error };
};
