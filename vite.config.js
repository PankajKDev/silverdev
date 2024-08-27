import { defineConfig } from "vite";

 export default defineConfig({
    base:"./silverdev",
    build:{
        minify:"terser"
    }
 })