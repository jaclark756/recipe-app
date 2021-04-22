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

## Associated Information

Java environmental variable: GITHUB_ID=71b8a542c2c71135c6f8;GITHUB_SECRET=8505bf7996c20dff365d6e236539aa563d360000;JWT_KEY=926D96C90030DD58429D2751AC1BDBBC;GOOGLE_ID=171493606087-7o5fofjndsrk4v4smktveabmcf4p7148.apps.googleusercontent.com;GOOGLE_SECRET=BU7jljcSlhQoy_WrPv3sVPPa;SPOONACULAR_API_Key=98e32f1d554d49cbafdcf43a4289a289

Style Guide: https://styleguide-1a7ea.web.app/components/wireframes

Wireframes: https://whimsical.com/recipe-V7stC2wFKGkkDAKTYjP4QB

Entity Relationship Diagram

https://jiracaet.mccinfo.net:8443/secure/attachment/10301/updatedERD-04-20-21.jpg