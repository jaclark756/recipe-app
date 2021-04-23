# recipe-app

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## json-server

First install json-server with `npm install -g json-server`. The -g is for global.

Then in the root of the project run `json-server --watch db.json --routes routes.json`. This will start the server on port 3000! Remember, if you want to run the json-server and the angular server at the same time you will need two terminals open.

Navigate to [json-server](http://localhost:3000) and check it out!

If you have your json-server running, you can point your angular app to hit these routes. Try `GET /api/recipe/1` to see the first recipe!

The new route is `/api/v2/recipe`. You can see these routes in the `routes.json` file

## Additional Information

https://gitlab.mccinfo.net/code-school/students/recipe-services/-/blob/develop/README.md