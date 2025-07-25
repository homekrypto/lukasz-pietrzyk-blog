import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CompleteApp from './CompleteApp';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <CompleteApp />
  </StrictMode>
);
