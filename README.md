#classy-angular

Some useful Angular modules written by developers at [StayClassy].

[Click here for some examples.]

## Usage

Add the desired module file to your page (angular.js is a dependency) and then inject the respective module into your app.

##### HTML

	<script src='angular.js'></script>
	<script src='directives/Form.js'></script>
	<script src='{myApp}.js'></script>
	
##### {myApp}.js

	var myApp = angular.module('myApp', [
		'classy.directives.form'
	]);
	




## Modules
#### directives/Form.js - ([classy.directives.form](#classydirectivesform))

Every day directives for forms (origniated from our checkout page). 




## Directives

### classy.directives.form


##### scBlurFocusDirective

This directive adds `.has-focus` and `.has-visited` classes to input and select fields. Validation messages can be delayed from showing immediately on user input by checking for the 'has-visited' state.

	<div ng-show="checkout.emailAddress.hasVisited && checkout.emailAddress.$invalid && checkout.emailAddress.$dirty">
		Please enter an email address.
	</div>
	
	<form name='checkout'>
		<label>Username</label>
		<input type='email' name='emailAddress' ng-model='payment.email' required />
	</form>
	
		

##### scSelectExpirationMonths

Credit card expiration months dropdown. Selects current month on load.

	<div sc-select-expiration-months ng-model=''></div>
	
##### scSelectExpirationYears
Credit card expiration years dropdown. Selects current year on load.

	<div sc-select-expiration-years ng-model=''></div>	

##### scSelectCountries
Dropdown with a list of countries.

	<div sc-select-countries ng-model=''></div>	

##### scSelectStates
Dropdown with a list of states in the US.

	<div sc-select-states ng-model=''></div>	

##### scSelectProvinces
Dropdown with a list of Canadian provinces.

	<div sc-select-provinces ng-model=''></div>	

##### scNumeric
This directive restricts input to numbers only. Non-numbers will not be entered.

	<div sc-numeric ng-model=''></div>	

##### scDollar
This directive restricts input to numbers and one decimal point. Additional decimal points and other characters will not be entered.

	<div sc-dollar ng-model=''></div>	

##### scCharLimit
This directive ties itself to a model and then counts down using the reference field's ng-maxlength attribute.

	<input type="text" ng-model="modelA" ng-maxlength="20">
	<p sc-char-limit="modelA" count="20">20 characters remaining.</p> 

##### scMaxValue
Sets field to invalid if the max value is exceeded.

	<input type="text" ng-model="" sc-max-value="20"> // Only values <= 20 are valid.

##### scMinValue
Sets field to invalid if the min value is exceeded.

	<input type="text" ng-model="" sc-min-value="20"> // Only values >= 20 are valid.

##### scIsExpired
##### scPhoneNumber

##### scCustomSelect
This directive builds a custom select dropdown using a JSON object. You can set custom values and custom text.
	// In controller
	$scope.customSelect = {
		"Value A": "Text A",
		"Value B": "Text B",
		"Value C": "Text C"
	}

	// In markup
	<span sc-custom-select="customSelect" ng-model=""></span>

##### scIsInArray
Only values from the reference array will be considered valid. All other values are not in the array and are therefore valid.

	<input type="text" ng-model="modelA" sc-is-in-array="arrayA" /> 
	// If arrayA is ['A', 'B', 'C'], only A, B, and C will be accepted as valid.

##### scIsInObject


##### scSubmit
This function will re-check the validity of a form prior to calling its submit handler. Replaces ng-submit.

	<form sc-submit="submit()">
		<input type="email" />
	</form>

##### scMirrorModel
Copies the original field's model into another field. Changes to the second field will not impact the original.

	<input type="text" ng-model="modelA" sc-mirror-model="modelB"> // Changes to this field will copy to the field below.
	<input type="text" ng-model="modelB"> // Changes to this field will not affect the field above!




[StayClassy]: http://stayclassy.org
[Click here for some examples.]: http://jsfiddle.net/sc_mlingner/e8YWT/12/