# Movies

## Overview

This application is a simple application used to display the most popular movies of the day using the open API from [The Movie DB](https://www.themoviedb.org/)

## Setup

To get this project running on your machine, you will need to do the following:

1. Ensure Node is installed on your machine. This project was tested/used with Node v14.18.0
1. Install [Angular CLI](https://github.com/angular/angular-cli) - this project was generated with version 12.2.9
1. Run the command `npm install`
1. Run the command `ng serve --open` - This should automatically open your browser to `http://localhost:4200/`
1. To run the unit tests run the command `ng test`
1. To view the test coverage run the following command `ng test --no-watch --code-coverage`

## Known Issues

1. Currently e2e tests are not setup
1. API endpoints that don't change frequently (eg. API configuration) are currently not cached
1. Poster sizes

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

TODO

[x] Infinite scroll currently overwrites everything as you scroll down
[x] Infinte scroll makes a call when first loaded in, can probably get rid of the on init call
[x] Loading Indicator as it's getting more data for the infinite scroll
[x] Actually display information (mat grid)
[x] Close subscriptions
[x] Add api call base the the environments.js file
[x] Make infinte scroll have a better UI
[x] Cleanup detail page UI
[x] Dynamic Page Title (app service shared variable)
[X] Catch the over 500 error
[X] No Trailers Indicator
[x] Move infinte scroll into a different module to support multiple exported components
[x] Add application loading animation
[x] Add the movie db usage info
[x] Setup Theme
[x] No Info Page
[x] IE Support/other browsers
[x] Add tests
[x] Work on the Different screen sizes UI - THIS INCLUDE SCREEN ROTATION ON THE PHONE
[] Add/Update documentation/readme
[] Animations (routing animations)
[] Add rick roll menu button
[] Cache the config GET call

NO
[] Remeber the index in which I was at on the popular videos page
[] Should I show a loading icon for images loading in?
[] Look Into top rated get Calls (may not be need, its unclear)
[] Add footer for above
[] Find a way to reuse image for detail page
