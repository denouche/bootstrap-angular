SHELL := /bin/bash

DIST_FOLDER = dist

help:
	@echo "Existing goals are: "
	@echo "clean      -> clean dependencies and generated files"
	@echo "install    -> npm install and bower install"

clean:
	grunt clean || true
	rm -rf bower_components/ node_modules/ $(DIST_FOLDER)/

bowerInstall:
	./node_modules/bower/bin/bower install

npmInstall:
	npm install

install: npmInstall bowerInstall

dev:
	grunt

bumpAndBuildProd:
	grunt build --mode=prod
	git add .
	if [ "$(type)" = "" ]; then grunt bump:patch; else grunt bump:$(type); fi

release: clean install bumpAndBuildProd
	rm -rf $(DIST_FOLDER)/
	git commit -am'clean $(DIST_FOLDER) folder after release'
	git push origin master

