bootstrap-angular
=================

# How to
## Install
### Using Makefile:
```bash
make install
```

### Manually:
```bash
npm install
```

## Develop
### Using Makefile:
```bash
make dev
```

### Manually:
```bash
grunt serve --mode=dev|prod  // default is dev
```

After that you should be able to open your browser on `http://localhost:9000/src/` to see the application running.
If you chose `--mode=prod` the url is `http://localhost:9000/dist/`.

### Do not serve files

If you want to build and watch the project without to serve the files (for example if you use a Nginx to serve them), you can just run:
```bash
make watch
```

## Release

Use this to create a release of the application.
It will bump the files package.json and bower.json, create the dist application in ./dist/ folder, commit it and create a tag.

### Using Makefile:
```bash
make release type=patch|minor|major
```

### Manually:
```bash
grunt clean
rm -rf bower_components/ node_modules/ dist/
npm install
grunt build --mode=prod
npm run release
docker build -t $(PROJECT_NAME):$(VERSION) .
rm -rf dist/                                           // do not keep generated build on branch master
git commit -am'chore: clean dist folder after release'
git push --follow-tags origin HEAD
```

# Changelog
## How to

When releasing, the commit are parsed, using angular conventions: https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md

The CHANGELOG.md file is filled in with the functionnal changelog based on the commits messages.

So it's important to follow the conventions that are described in the above link.

