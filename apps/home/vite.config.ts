import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}, // 🔥 Corrige erros "process is not defined"
  },
  build: {
    lib: {
      // 🚩 O ponto de entrada PRECISA ser o root.tsx, NÃO main.tsx
      entry: resolve(__dirname, 'src/root.tsx'),
      name: 'home',
      formats: ['umd'],
      fileName: (format) => `home.${format}.js`,
    },
    rollupOptions: {
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
