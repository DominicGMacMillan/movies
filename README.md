# Movies

## Overview

This application is a simple application used to display the most popular movies of the day using the open API from [The Movie DB](https://www.themoviedb.org/)

## Setup

To get this project running on your machine, you will need to do the following:

1. Since this uses a thrid party API, you will need to get an API key from [The Movie DB's website](https://www.themoviedb.org/settings/api)
1. Once you have created an account on their website copy and paste the key in the `apiKey variable` in the [environments.ts](.\src\environments\environment.ts) file and the [environments.prod.ts](.\src\environments\environment.prod.ts) if you plan on deploying this application.
1. Ensure [Node is installed](https://nodejs.org/en/download/) on your machine. This project was tested/used with Node v14.18.0
1. Install [Angular CLI](https://github.com/angular/angular-cli) - this project was generated with version 12.2.9
1. Run the command `npm install`
1. Run the command `ng serve --open` - This should automatically open your browser to `http://localhost:4200/`
1. To run the unit tests run the command `ng test`
1. To view the test coverage run the following command `ng test --no-watch --code-coverage`

## Known Issues

1. Currently e2e tests are not setup
1. API endpoints that don't change frequently (eg. API configuration) are currently not cached
1. Poster sizes are currently hard coded with size w185
1. The favourites button on the detail page does nothing since no requiremnts were found around it's functionality
1. The vertical menu button also does nothing for the same reasons
1. The only way IE is cupported is by redirecting users to a chrom download, should look into a better support for that browser
1. There are currently a lack of animations for the application, they should be added for better user experience
1. Mat icons are currenlty coming from Google, if Google goes down our icons go with it
1. Trailers are currently limited to YouTube and only the official trailers, If we want to show dirrent websites we will need a new approach
1. Doesn't work well on 4k computer monitors
