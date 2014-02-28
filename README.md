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
##### scSelectCountries
##### scSelectStates
##### scSelectProvinces
##### scNumeric
##### scDollar
##### scCharLimit
##### scMaxValue
##### scMinValue
##### scIsExpired
##### scPhoneNumber
##### scCustomSelect
##### scIsInArray
##### scIsInObject
##### scSubmit
##### scMirrorModel


[StayClassy]: http://stayclassy.org
[Click here for some examples.]: http://jsfiddle.net/sc_mlingner/e8YWT/12/