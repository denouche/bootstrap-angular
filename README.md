bootstrap-angular
=================

# How to
## Install
### Using Makefile:
```
make install
```

### Manually:
```
npm install
./node_modules/bower/bin/bower install
```

## Develop
### Using Makefile:
```
make dev
```

### Manually:
```
grunt serve --mode=dev|prod  // default is dev
```

After that you should be able to open your browser on `http://localhost:9000/src/` to see the application running.
If you chose `--mode=prod` the url is `http://localhost:9000/dist/`.


## Release

Use this to create a release of the application.
It will bump the files package.json and bower.json, create the dist application in ./dist/ folder, commit it and create a tag.

### Using Makefile:
```
make release type=patch|minor|major
```

### Manually:
```
grunt clean
rm -rf bower_components/ node_modules/ dist/
npm install
./node_modules/bower/bin/bower install
grunt build --mode=prod
git add .                                              // add dist folder to commit it with the release
grunt bump:patch                                       // patch|minor|major
rm -rf dist/                                           // do not keep generated build on branch master
git commit -am'clean dist folder after release'
git push origin master
```
