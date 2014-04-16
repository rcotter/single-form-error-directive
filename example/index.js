var app = angular.module('app', []);
app.controller(
    'formController',
    ['$scope', '$http', '$log', '$window',
        function (scope, http, log, window) {
            "use strict";

            function setError(isError) {
                scope.error = isError ? "Error" : null;
            }

            scope.$watch("form.letters.$invalid && form.letters.$dirty", setError);
            scope.$watch("form.numbers.$invalid && form.numbers.$dirty", setError);
        }]);