// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import analyze from 'rollup-analyzer-plugin';
import replace from 'rollup-plugin-replace';

const opts = {limit: 5, root: __dirname}

export default [{
  input: 'lib/index.js',
  output: {
    dir: 'www/js',
    format: 'amd',
  },
  plugins: [
    replace({
      include: require.resolve('api-resource'),
      values: {
        'typeof window': '"object"',
      }
    }),
    replace({
      include: require.resolve('marked'),
      values: {
        'typeof define': '"undefined"',
      }
    }),
    resolve(),
    cjs({
      exclude: require.resolve('marked'),
    }),
    analyze(opts),
  ],
  moduleContext: {
    [require.resolve('marked')]: 'window',
    [require.resolve('coffeescript/lib/coffeescript-browser-compiler-legacy/coffeescript.js')]: 'window'
  }
}];