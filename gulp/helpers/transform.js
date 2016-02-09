/**
 * Injector transformer.
 * @module gulp/helpers/transform
 */

/**
 * Transforms a file stream to <script> tag string.
 * @param  {String} filePath Original file path.
 * @param  {Stream} file     File stream.
 * @return {String}          HTML <script> tag string ready to be inlined.
 */
export function transformScripts(filePath, file) {
  const fileContents = file.contents.toString('utf8');
  return `<script>${fileContents}</script>`;
}

/**
 * Transforms a file stream to <style> tag string.
 * @param  {String} filePath Original file path.
 * @param  {Stream} file     File stream.
 * @return {String}          HTML <style> tag string ready to be inlined.
 */
export function transformStyles(filePath, file) {
  const fileContents = file.contents.toString('utf8');
  return `<style>${fileContents}</style>`;
}
