import * as Babel from '@babel/standalone';

export const transpile = (code: string): string => {
  try {
    const result = Babel.transform(code, {
      presets: ['env', 'react'],
      filename: 'index.tsx',
    });
    return result.code || '';
  } catch (err) {
    console.error('Transpilation error:', err);
    throw err;
  }
};
