export const DEFAULT_CODE = `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      fontFamily: 'system-ui, sans-serif', 
      padding: '2rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Hello React!</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        You've clicked the button {count} times
      </p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '0.8rem 2rem',
          fontSize: '1rem',
          borderRadius: '50px',
          border: 'none',
          background: 'white',
          color: '#764ba2',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Click Me
      </button>
    </div>
  );
}`;

export const IFRAME_TEMPLATE = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <style>
      body { margin: 0; padding: 0; }
      #root { width: 100%; height: 100%; }
      .error-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        color: #ff5555;
        padding: 20px;
        font-family: monospace;
        white-space: pre-wrap;
        z-index: 9999;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('error', (event) => {
        const root = document.getElementById('root');
        const overlay = document.createElement('div');
        overlay.className = 'error-overlay';
        overlay.innerText = 'Runtime Error: ' + event.message;
        root.appendChild(overlay);
      });

      const handleError = (err) => {
        const root = document.getElementById('root');
        const overlay = document.createElement('div');
        overlay.className = 'error-overlay';
        overlay.innerText = 'Execution Error: ' + err.message;
        root.appendChild(overlay);
      };

      try {
        window.process = { env: { NODE_ENV: 'development' } };
        
        // Mocking common imports
        const React = window.React;
        const ReactDOM = window.ReactDOM;
        
        function require(module) {
          if (module === 'react') return React;
          if (module === 'react-dom') return ReactDOM;
          throw new Error('Module "' + module + '" not found');
        }

        // The transpiled code will be injected here
        {{CODE}}

        if (typeof App !== 'undefined') {
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(React.createElement(App));
        } else if (typeof exports !== 'undefined' && exports.default) {
           const root = ReactDOM.createRoot(document.getElementById('root'));
           root.render(React.createElement(exports.default));
        }
      } catch (err) {
        handleError(err);
      }
    </script>
  </body>
</html>
`;
