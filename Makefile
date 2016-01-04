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
	rm -rf bower_components/ node_modules/ $(DIST_FOLDER)/

bowerInstall:
	./node_modules/bower/bin/bower install

npmInstall:
	npm install

npmInstallProduction:
	npm install --production

install: npmInstall bowerInstall

dev:
	grunt

bumpAndBuildProd:
	if [ "$(type)" = "" ]; then grunt bump-only:patch; else grunt bump-only:$(type); fi
	grunt build --mode=prod
	grunt conventionalChangelog
	git add .
	grunt bump-commit

release: clean install bumpAndBuildProd
	rm -rf $(DIST_FOLDER)/
	git commit -am'chore: clean $(DIST_FOLDER) folder after release'
	git push origin master

watch:
	grunt buildAndWatch

