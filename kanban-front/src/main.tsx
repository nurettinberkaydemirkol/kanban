/* eslint-disable react/react-in-jsx-scope */
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
 
createRoot(document.getElementById('root')!).render(
    // eslint-disable-next-line react/react-in-jsx-scope
    <MantineProvider>
        <App />
    </MantineProvider>
);