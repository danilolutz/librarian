const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
  new CopyPlugin({
    patterns: [
      { from: 'src/locales/', to: './locales/' },
      { from: 'src/assets/', to: './assets/' },
      { from: 'node_modules/debug', to: './database/node_modules/debug' },
      { from: 'node_modules/wrappy', to: './database/node_modules/wrappy' },
      { from: 'node_modules/balanced-match', to: './database/node_modules/balanced-match' },
      { from: 'node_modules/concat-map', to: './database/node_modules/concat-map' },
      { from: 'node_modules/brace-expansion', to: './database/node_modules/brace-expansion' },
      { from: 'node_modules/glob', to: './database/node_modules/glob/' },
      { from: 'node_modules/sha.js', to: './database/node_modules/sha.js/' },
      { from: 'node_modules/xml2js', to: './database/node_modules/xml2js/' },
      { from: 'node_modules/app-root-path', to: './database/node_modules/app-root-path/' },
      { from: 'node_modules/cli-highlight', to: './database/node_modules/cli-highlight/' },
      { from: 'node_modules/fs.realpath', to: './database/node_modules/fs.realpath/' },
      { from: 'node_modules/inflight', to: './database/node_modules/inflight/' },
      { from: 'node_modules/minimatch', to: './database/node_modules/minimatch/' },
      { from: 'node_modules/once', to: './database/node_modules/once/' },
      { from: 'node_modules/path-is-absolute', to: './database/node_modules/path-is-absolute/' },
      { from: 'node_modules/@types/zen-observable', to: './database/node_modules/@types/zen-observable/' },
      { from: 'node_modules/zen-observable', to: './database/node_modules/zen-observable/' },
      { from: 'node_modules/argparse', to: './database/node_modules/argparse/' },
      { from: 'node_modules/inherits', to: './database/node_modules/inherits/' },
      { from: 'node_modules/safe-buffer', to: './database/node_modules/safe-buffer/' },
      { from: 'node_modules/sax', to: './database/node_modules/sax/' },
      { from: 'node_modules/xmlbuilder', to: './database/node_modules/xmlbuilder/' },
      { from: 'node_modules/cliui', to: './database/node_modules/cliui/' },
      { from: 'node_modules/escalade', to: './database/node_modules/escalade/' },
      { from: 'node_modules/get-caller-file', to: './database/node_modules/get-caller-file/' },
      { from: 'node_modules/require-directory', to: './database/node_modules/require-directory/' },
      { from: 'node_modules/string-width', to: './database/node_modules/string-width/' },
      { from: 'node_modules/y18n', to: './database/node_modules/y18n/' },
      { from: 'node_modules/yargs-parser', to: './database/node_modules/yargs-parser/' },
      { from: 'node_modules/ms', to: './database/node_modules/ms/' },
      { from: 'node_modules/highlight.js', to: './database/node_modules/highlight.js/' },
      { from: 'node_modules/mz', to: './database/node_modules/mz/' },
      { from: 'node_modules/parse5', to: './database/node_modules/parse5/' },
      { from: 'node_modules/parse5-htmlparser2-tree-adapter', to: './database/node_modules/parse5-htmlparser2-tree-adapter/' },
      { from: 'node_modules/yargs', to: './database/node_modules/yargs/' },
      { from: 'node_modules/ieee754', to: './database/node_modules/ieee754/' },
      { from: 'node_modules/base64-js', to: './database/node_modules/base64-js/' },
      { from: 'node_modules/has-flag', to: './database/node_modules/has-flag/' },
      { from: 'node_modules/ansi-styles', to: './database/node_modules/ansi-styles/' },
      { from: 'node_modules/chalk', to: './database/node_modules/chalk/' },
      { from: 'node_modules/dotenv', to: './database/node_modules/dotenv/' },
      { from: 'node_modules/reflect-metadata', to: './database/node_modules/reflect-metadata/' },
      { from: 'node_modules/tslib', to: './database/node_modules/tslib/' },
      { from: 'node_modules/typeorm', to: './database/node_modules/typeorm/' },
      { from: 'dist/', to: './database/' },
      { from: 'node_modules/@fontsource/nunito/files/nunito-all-400-normal.woff', to: 'nunito-all-400-normal.woff' },
      { from: 'node_modules/@fontsource/nunito/files/nunito-latin-400-normal.woff2', to: 'nunito-latin-400-normal.woff2' },
      // { from: 'node_modules/pdf-to-printer/dist/SumatraPDF.exe', to: './' },
    ],
  }),
  new ForkTsCheckerWebpackPlugin(),
];
