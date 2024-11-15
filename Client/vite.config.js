import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import {fileURLToPath} from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  plugins: [react(),],
  base: "/",
  resolve:{
    alias:{
      "@": path.resolve(__dirname, "./src")
    }
  }
})
