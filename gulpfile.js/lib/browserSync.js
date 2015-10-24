/**
 *   Instance of browser-sync that is accessible to all task files.
 *   Allows for triggering of reload from different tasks. IDM
 */

module.exports = require('browser-sync').create();