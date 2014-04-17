single-form-error-directive
===========================

An Angular directive that presents and tracks the first input error until it is fixed and then presents the next aka display and highlight one error at a time. Nice for space constrained mobile form errors.


Attaches `$singleError` to the form with a value of `{inputName: "NAME", invalid: true/false}`

which is then accessible within the controller scope via `$scope.formName.$singleError`
