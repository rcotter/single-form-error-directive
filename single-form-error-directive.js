//TODO Works but needs impl!!!
app.directive('test', function () {
    return {
        scope: {
            onError: "&"
        },
        require:"^form",
        restrict: 'ECMA', //TODO narrow
        link: function (scope, element, attrs, form) {

            var invalidInput;
            var inputNames = [];


            function setInvalidInput(input) {
                var invalid = input.$invalid && input.$dirty;
                if (!invalid) {
                    return false;
                }

                // If an error is already set there is nothing to do
                if (invalidInput) {
                    return;
                }

                invalidInput = input;
                console.log("%s %s", input.$name, true);
                scope.onError(input.$name, true);
                return true;
            }


            function findAnotherInvalidInput() {
                for (var otherNameIndex in inputNames) {
                    var otherInput = form[inputNames[otherNameIndex]];
                    if (setInvalidInput(otherInput)) {
                        return;
                    }
                }
            }


            // Only display one error so that the one highlighted input
            // matches the one displayed message - UX!
            function getValidateInputs(name) {
                return function validateInputs() {
                    var input = form[name];
                    var invalid = setInvalidInput(input);
                    if (invalid) {
                        return;
                    }

                    // Clear the current error if its no longer valid
                    if (invalidInput && invalidInput.$name === name) {
                        console.log("%s %s", name, false);
                        scope.onError(name, false);
                        invalidInput = null;
                    }

                    // Look for any other errors. It doesn't matter that we quickly check the same one again.
                    findAnotherInvalidInput();
                };
            }


            // Ref http://www.whatibroke.com/?p=894
            angular.forEach(form, function (val, key) {

                if ('$' !== key.charAt(0)) {
                    inputNames.push(key);
                    scope.$watch(form.$name + "." + key + ".$invalid", getValidateInputs(key));
                }
            });
        }
    };
});