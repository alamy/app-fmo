// Minimal React type shims to avoid build errors when @types/react is not installed.
declare module 'react';
declare module 'react/jsx-runtime';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
