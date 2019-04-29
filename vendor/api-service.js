// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default [{
  input: 'node_modules/api-service/lib/Service.js',
  output: {
    file: 'lib/vendor/api-service/index.js',
    format: 'es',
    name: 'ApiService',
  },
  plugins: [
    replace({
      include: require.resolve('api-resource'),
      values: {
        'typeof window': '"object"',
      }
    }),
    resolve(),
    cjs(),
  ]
}];