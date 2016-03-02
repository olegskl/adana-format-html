/**
 * Build configuration.
 * @module gulp/config
 */

export const env = {};
export const src = {};
export const dest = {};
export const browsers = ['last 2 versions'];
export const babelrc = {
  presets: ['es2015'],
  plugins: [
    'transform-function-bind',
    'transform-es2015-destructuring'
  ]
};

//
// Environment config
// --------------------

const gulpEnv = process.env.GULP_ENV || 'dist'; // eslint-disable-line no-process-env, no-undef

const isDist = gulpEnv.indexOf('dist') !== -1;
const isLive = gulpEnv.indexOf('live') !== -1;

env.needsLivereload = isLive;
env.needsMinification = isDist;

//
// Source files and folders
// --------------------

src.libraryFiles = [
  'src/**/*.js',
  '!src/webapp/**/*.js'
];

src.root = 'src/webapp';
src.htmlIndex = `${src.root}/report.html`;
src.stylesMain = `${src.root}/report.css`;
src.scriptsMain = `${src.root}/report.js`;

//
// Destination files and folders
// --------------------

dest.root = 'dist';
