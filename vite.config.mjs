import { resolve } from 'path';

export default {
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        cinebook: resolve(process.cwd(), 'cinebook.html'),
        groundwater: resolve(process.cwd(), 'groundwater.html'),
        nativeLanguageAi: resolve(process.cwd(), 'native-language-ai.html')
      }
    }
  }
};
