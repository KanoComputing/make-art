// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'node_modules/@kano/kwc-auth/kwc-auth.js',
  output: {
    file: 'www/js/kwc-auth.js',
    format: 'iife',
  },
  plugins: [
    resolve()
  ]
};