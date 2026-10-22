import { defineConfig } from "vite";
export default defineConfig({base:process.env.GITHUB_PAGES==="true"?"/AutoCAD-typescript-/":"/",server:{port:5173,strictPort:true},build:{sourcemap:true}});