import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Vercel sets the VERCEL environment variable to "1"
  const isVercel = process.env.VERCEL === "1";

  return {
    plugins: [react()],
    base: isVercel ? "/" : "/okkorea/",
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  };
});
