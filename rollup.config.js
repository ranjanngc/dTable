import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";
export default {
  input: 'index.ts',
  output: [
    {
        file: 'dist/dTable.es.js',
        format: 'es'
    },
    {
        file: 'dist/dTable.min.es.js',
        format: 'es',
        name: 'version',
        plugins: [terser()]
    }
],
  plugins: [typescript()]
};