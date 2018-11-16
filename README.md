# Stackarius

### This project was made for the blockstack world tour @ brussels.
### Live demo @ stackarius.cogarius.com
### Find more info about this project and blockstack in  [our article](https://medium.com/@cogarius/blockstack-world-tour-brussels-social-dapp-workshop-fb0ef887b55f).

This project is under the GNU GENERAL PUBLIC LICENSE Version 3.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5.

## app skeleton

- ng generate module app-routing --flat --module=app
- ng generate module search
- ng generate component search

### ngrx install using schematics

- npm install @ngrx/schematics --save-dev
- npm install @ngrx/{store,effects,entity,store-devtools} --save

### scafold App state (ngrx/store)

Doc is [here](https://github.com/ngrx/platform/blob/master/docs/schematics/feature.md)

- ng generate @ngrx/schematics:store AppState --root --module app.module.ts
- generate feature in main module  `$ ng g feature error/Error --reducers ../reducers/index.ts`
- gen a component with store injected: `$ ng g container home/PersonalNotes`
- gen feature store: `$ ng g feature home/PersonalNotes  -m home/home.module`

### blockstack install and config

See [js install instructions](http://blockstack.github.io/blockstack.js/index.html).

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

## Important ! troubleshooting: Module not found: Error: Can't resolve 'crypto'

Angular-cli uses a webpack.config that do not include the nodejs crypto lib.

```error
ERROR in ./node_modules/blockstack/lib/keys.js
Module not found: Error: Can't resolve 'crypto' in 'node_modules/blockstack/lib'
```

### potential fix for angular-cli and crypto

See [workaround](https://github.com/angular/angular-cli/issues/1548#issuecomment-286151056 )
see also :

- <https://github.com/angular/angular/issues/23398>
- <https://github.com/angular/angular-cli/issues/1548>
- <https://codeburst.io/customizing-angular-cli-6-build-an-alternative-to-ng-eject-a48304cd3b21>
- <https://github.com/meltedspark/angular-builders/tree/master/packages/dev-server>

#### solution applied to this repo

- intall dev depencency `$ npm i -D @angular-builders/custom-webpack`
- modify your angular.json change the @angular-devkit/build-angular:browser builder to @angular-builders/custom-webpack:browser
- create a new file `webpack.config.js` under your root folder (next to package.json)
- If you want to run ng serve with custom webpack configuration (given you performed all the above steps) `$ npm i -D @angular-builders/dev-server`
- in angular.json  in the "serve" step, replaces _@angular-devkit/build-angular:dev-server_ by _@angular-builders/dev-server:generic_