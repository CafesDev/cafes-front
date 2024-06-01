import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve,  } from 'path'
import fs from 'fs';


let outDir = resolve(__dirname, '..', 'dev-back-cafes', 'frontend')
let pagesDir = resolve(__dirname, 'src', 'pages')

if (!fs.existsSync(outDir)) {
  console.log('Backend project isnt at the same directory');
  outDir = resolve(__dirname, 'dist')
} 

console.log(__dirname)


export default defineConfig({
  plugins: [react()],
  root: pagesDir,
  build: {
    emptyOutDir: true,
    outDir,
    rollupOptions: {
      input: {
        main: resolve(pagesDir, 'index.html'),
        control_pane: resolve(pagesDir, 'control_pane', 'index.html')
      }
    }
  }
})
