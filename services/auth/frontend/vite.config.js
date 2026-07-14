import fs from "node:fs";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const ROOT = path.resolve(__dirname, "../../..");
const active = JSON.parse(fs.readFileSync(path.join(ROOT, "active-services.json"), "utf8"));

const proxy = {};
for (const name of active) {
  const svc = JSON.parse(
    fs.readFileSync(path.join(ROOT, "services", name, "service.json"), "utf8")
  );
  proxy[svc.basePath] = { target: `http://localhost:${svc.port}` };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy,
    fs: { allow: [ROOT] },
  },
})
