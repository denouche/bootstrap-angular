SHELL := /bin/bash

DIST_FOLDER=dist
PROJECT_NAME=$(shell cat package.json | grep -Po '"name"\s*:\s*"\K([^"]+)')

help:
	@echo "Existing goals are: "
	@echo "clean      -> clean dependencies and generated files"
	@echo "install    -> npm install and bower install"
	@echo "dev        -> launch grunt: build the project and serve files in dev mode"
	@echo "release    -> clean, install, build in prod mode and generate the RPM file"
	@echo "watch      -> launch grunt: build the project in dev mode and watch for changes"

clean:
	grunt clean || true
	rm -rf node_modules/ $(DIST_FOLDER)/

getdeps:
	npm install

dev:
	grunt

buildProdAndChangelogAndTag:
	grunt build --mode=prod
	npm run release

release: clean getdeps
	npm run release

start:
	grunt serve

