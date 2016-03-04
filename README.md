# seiso-ui

> Web UI for Seiso data.

*This project is currently in progress and not ready for general use.*

Seiso-ui is a Node.js web application with an Angular.js UI built with webpack and gulp.

The application server uses express.js for routing and passport for security. At build time, the server can
house configuration for external API's that the UI can use or the server can use as a passthrough to those API's. This
allows for the UI to be modular and pluggable.

Being a UI for, primarily, Seiso-api, angular controllers, directives and view partials are organized into components 
based on particular seiso entities. This convention, in addition to the build process established with gulp, 
follows those outlined in [John Papa's Angular Style Guide](https://github.com/johnpapa/angular-styleguide).

### Quick Dev Start

Install dependencies.

    $ npm install

Run Primary Node Server

    $ node index

or, for finer control of the start script...

    $ ./bin/www

In seperate process, serve content through browser-sync. This is configured to proxy to the application server (on port 3001)

    $ npm run build:dev

With browser-sync:

    $ node index
    $ gulp serve

For additional build and run scripts check the scripts section of the package.json file.

### Tools Used/Stack

* [Node.js](https://nodejs.org/)
* [Express.js](http://expressjs.com/)
* [Angular.js](https://angularjs.org/)
* [Webpack](https://webpack.github.io/)
* [Gulp](https://github.com/gulpjs/gulp)
* [Passport](http://passportjs.org/)