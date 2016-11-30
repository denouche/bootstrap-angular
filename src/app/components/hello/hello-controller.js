angular.module('hello')
.controller('HelloController', function (DemoService) {
    'use strict';

    console.log('Hello controller');

    DemoService.getSomething()
	    .then(function(data) {
	    	console.log('something', data);
	    }, function(err) {
	    	console.error(err);
	    });

});
