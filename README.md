[![Codefresh build status]( https://g.codefresh.io/api/badges/pipeline/zgorizzo69/cogarius%2Fstackarius%2Fstackarius?branch=master&key=eyJhbGciOiJIUzI1NiJ9.NWJmNTRlYmUxNWNkODA2ZTIxYzljYWNj.-K_kcAJN7W59YgMTIxWfTzZE-hafvUCXhDr51IoHHx4&type=cf-1)]( https://g.codefresh.io/pipelines/stackarius/builds?repoOwner=cogarius&repoName=stackarius&serviceName=cogarius%2Fstackarius&filter=trigger:build~Build;branch:master;pipeline:5bf56d70072d529351661b59~stackarius)

# Stackarius

### This project was made for the blockstack world tour @ brussels.

### Live demo @ [stackarius.cogarius.com](https://stackarius.cogarius.com)

### Find more info about this project and blockstack in  [our medium article](https://medium.com/@cogarius/blockstack-world-tour-brussels-social-dapp-workshop-fb0ef887b55f)

This project is under the GNU GENERAL PUBLIC LICENSE Version 3.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5. Install with 

```
npm install -g @angular/cli@6.2.5
```

## blockstack doc

See [blockstackjs doc](http://blockstack.github.io/blockstack.js/index.html).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Important ! troubleshooting: Module not found: Error: Can't resolve 'crypto'

Angular-cli uses a webpack.config that do not include the nodejs crypto lib.

```error
ERROR in ./node_modules/blockstack/lib/keys.js
Module not found: Error: Can't resolve 'crypto' in 'node_modules/blockstack/lib'
```

### potential fix for angular-cli and crypto

See [workarounds](https://github.com/angular/angular-cli/issues/1548#issuecomment-286151056 )
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
