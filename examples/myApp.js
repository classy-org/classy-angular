'use strict';

var classyFormExamples = angular.module('exampleApp', [
	'classy.directives.form'
]);

classyFormExamples.controller('exampleController',
	['$scope','$element','$http','$log','$timeout',
		function($scope, $element, $http, $log, $timeout) {

			$scope.scCustomSelect = {
				"9000": "Just 9000.",
				"9001": "Over 9000.",
				"9002": "Way over 9000."
			}

			$scope.scArraySelect = ["I love carpet.", "I love desk.", "I love lamp."];

			$scope.submit = function() {
				alert("Great, everything's valid!");
			}
		}
	]
);