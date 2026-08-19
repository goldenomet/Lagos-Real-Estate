// Defensive guard for environments where window.fetch is a getter-only property
(function () {
  try {
    const target = typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : null);
    if (!target) return;

    const originalFetch = target.fetch;
    let storedFetch = typeof originalFetch === 'function' ? originalFetch.bind(target) : null;

    const getFetch = () => storedFetch;
    const setFetch = (val: any) => {
      storedFetch = val;
    };

    let curr: any = target;
    while (curr) {
      try {
        const desc = Object.getOwnPropertyDescriptor(curr, 'fetch');
        if (desc && desc.configurable) {
          Object.defineProperty(curr, 'fetch', {
            get: getFetch,
            set: setFetch,
            configurable: true,
            enumerable: true
          });
        }
      } catch (e) {}
      try {
        curr = Object.getPrototypeOf(curr);
      } catch (e) {
        break;
      }
    }

    const targetsToPatch: any[] = [target];
    if (typeof Window !== 'undefined' && Window.prototype) {
      targetsToPatch.push(Window.prototype);
    }
    if (typeof globalThis !== 'undefined' && globalThis !== target) {
      targetsToPatch.push(globalThis);
    }

    for (const t of targetsToPatch) {
      try {
        Object.defineProperty(t, 'fetch', {
          get: getFetch,
          set: setFetch,
          configurable: true,
          enumerable: true
        });
      } catch (err) {}
    }
  } catch (err) {}
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

