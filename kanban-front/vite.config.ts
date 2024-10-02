import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',  // Tüm IP adreslerinden gelen bağlantıları kabul eder
        port: 5173        // Vite server'ın dinleyeceği port
    }
});
