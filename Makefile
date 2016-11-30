SHELL := /bin/bash

DIST_FOLDER = dist

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

npmInstall:
	npm install

install: npmInstall

dev:
	grunt

bumpAndBuildProd:
	if [ "$(type)" = "" ]; then grunt bump-only:patch; else grunt bump-only:$(type); fi
	grunt build --mode=prod
	grunt conventionalChangelog

commitAndClean:
	git add .
	grunt bump-commit
	rm -rf $(DIST_FOLDER)/
	git commit -am'chore: clean $(DIST_FOLDER) folder after release'
	git push origin HEAD

release: clean install bumpAndBuildProd commitAndClean

watch:
	grunt buildAndWatch

