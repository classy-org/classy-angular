/*
 * Module:
 * 	classy.directives.form
 *
 * Description:
 * 	Everyday form directives (orginiated from checkout page)
 *
 * Directives:
 *  scBlurFocusDirective
 *	scSelectExpirationMonths
 *	scSelectExpirationYears
 *	scSelectCountries
 *	scSelectStates
 *	scSelectProvinces
 *	scNumeric
 *	scDollar
 *	scCharLimit
 *	scMaxValue
 *	scMinValue
 *	scIsExpired
 *	scPhoneNumber
 *	scCustomSelect
 *	scIsInArray
 *	scIsInObject
 *	scSubmit
 *	scMirrorModel
 *
 * */

define([
	'angular'
],

function () {
	"use strict";

	var Form = angular.module('classy.directives.form', []);


	var scBlurFocusDirective = function () {
		return {
			restrict: 'E',
			require: '?ngModel',
			link: function (scope, element, attrs, ctrl) {
				if (!ctrl) {
					return;
				}

				element.on('focus', function () {
					element.addClass('has-focus');

					scope.$apply(function () {
						ctrl.hasFocus = true;
					});
				});

				element.on('blur', function () {
					element.removeClass('has-focus');
					element.addClass('has-visited');

					scope.$apply(function () {
						ctrl.hasFocus = false;
						ctrl.hasVisited = true;
					});
				});

			}
		};
	};

	Form.directive('input', scBlurFocusDirective).directive('select', scBlurFocusDirective)



	.directive('scSelectExpirationMonths',
		/*
		 * Dropdown for credit card expiration months
		 * */
		function ($log, $parse, $filter) {
			return {
				replace: true,
				require: '?ngModel',
				template: '<select ng-options="month.val as month.val for month in months"></select>',
				link: function (scope, element, attrs) {

					var month = parseInt($filter('date')(new Date(), 'MM'));

					scope.months = [];
					for (var m=1; m<=12; m++) {
						m = m < 10 ? '0'+m : m;
						scope.months.push({'val': m});
					}
					month = month < 10 ? '0'+month : month;
					$parse(attrs.ngModel).assign(scope, month);

				}
			};
		}
	)

	.directive('scSelectExpirationYears',
		/*
		 * Dropdown for credit card expiration years
		 * */
		function ($log, $parse, $filter) {
			return {
				replace: true,
				require: '?ngModel',
				template: '<select ng-options="year.val as year.val for year in years"></select>',
				link: function (scope, element, attrs) {

					scope.years = [];
					var thisYear = parseInt($filter('date')(new Date(),'yyyy'));
					for (var y=thisYear; y<=thisYear+12; y++) {
						scope.years.push({'val': y});
					}
					$parse(attrs.ngModel).assign(scope, thisYear);

				}
			};
		}

	)

	.directive('scSelectCountries',
		/*
		 * Dropdown for country selection
		 * */
		function ($log, $parse) {
			return {
				replace: true,
				require: '?ngModel',
				template: '<select ng-options="country.val as country.name for country in countries">' +
				'<option value="">Please Select</option></select>',
				link: function (scope, element, attrs) {

					scope.countries = [{val:"AF",name:"Afghanistan"},{val:"AX",name:"Åland Islands"},{val:"AL",name:"Albania"},{val:"DZ",name:"Algeria"},{val:"AS",name:"American Samoa"},{val:"AD",name:"Andorra"},{val:"AO",name:"Angola"},{val:"AI",name:"Anguilla"},{val:"AQ",name:"Antarctica"},{val:"AG",name:"Antigua and Barbuda"},{val:"AR",name:"Argentina"},{val:"AM",name:"Armenia"},{val:"AW",name:"Aruba"},{val:"AU",name:"Australia"},{val:"AT",name:"Austria"},{val:"AZ",name:"Azerbaijan"},{val:"BS",name:"Bahamas"},{val:"BH",name:"Bahrain"},{val:"BD",name:"Bangladesh"},{val:"BB",name:"Barbados"},{val:"BY",name:"Belarus"},{val:"BE",name:"Belgium"},{val:"BZ",name:"Belize"},{val:"BJ",name:"Benin"},{val:"BM",name:"Bermuda"},{val:"BT",name:"Bhutan"},{val:"BO",name:"Bolivia"},{val:"BA",name:"Bosnia and Herzegovina"},{val:"BW",name:"Botswana"},{val:"BV",name:"Bouvet Island"},{val:"BR",name:"Brazil"},{val:"IO",name:"Bosnia and Herzegovina"},{val:"BN",name:"Bosnia and Herzegovina"},{val:"BG",name:"Bulgaria"},{val:"BF",name:"Burkina Faso"},{val:"BI",name:"Burundi"},{val:"KH",name:"Cambodia"},{val:"CM",name:"Cameroon"},{val:"CA",name:"Canada"},{val:"CV",name:"Cape Verde"},{val:"KY",name:"Cayman Islands"},{val:"CF",name:"Central African Republic"},{val:"TD",name:"Chad"},{val:"CL",name:"Chile"},{val:"CN",name:"China"},{val:"CX",name:"Christmas Island"},{val:"CC",name:"Cocos (Keeling) Islands"},{val:"CO",name:"Colombia"},{val:"KM",name:"Comoros"},{val:"CG",name:"Congo"},{val:"CD",name:"Congo,Democratic Republic"},{val:"CK",name:"Cook Islands"},{val:"CR",name:"Costa Rica"},{val:"CI",name:"Cote d'Ivoire"},{val:"HR",name:"Croatia"},{val:"CU",name:"Cuba"},{val:"CY",name:"Cyprus"},{val:"CZ",name:"Czech Republic"},{val:"DK",name:"Denmark"},{val:"DJ",name:"Djibouti"},{val:"DM",name:"Dominica"},{val:"DO",name:"Dominican Republic"},{val:"EC",name:"Ecuador"},{val:"EG",name:"Egypt"},{val:"SV",name:"El Salvador"},{val:"GQ",name:"Equatorial Guinea"},{val:"ER",name:"Eritrea"},{val:"EE",name:"Estonia"},{val:"ET",name:"Ethiopia"},{val:"FK",name:"Falkland Islands"},{val:"FO",name:"Faroe Islands"},{val:"FJ",name:"Fiji"},{val:"FI",name:"Finland"},{val:"FR",name:"France"},{val:"GF",name:"French Guiana"},{val:"PF",name:"French Polynesia"},{val:"TF",name:"French Southern Territories"},{val:"GA",name:"Gabon"},{val:"GM",name:"Gambia"},{val:"GE",name:"Georgia"},{val:"DE",name:"Germany"},{val:"GH",name:"Ghana"},{val:"GI",name:"Gibraltar"},{val:"GR",name:"Greece"},{val:"GL",name:"Greenland"},{val:"GD",name:"Grenada"},{val:"GP",name:"Guadeloupe"},{val:"GU",name:"Guam"},{val:"GG",name:"Guernsey"},{val:"GN",name:"Guinea"},{val:"GW",name:"Guinea-Bissau"},{val:"GY",name:"Guyana"},{val:"HT",name:"Haiti"},{val:"HM",name:"Heard and McDonald Islands"},{val:"VA",name:"Vatican City State"},{val:"HN",name:"Honduras"},{val:"HK",name:"Hong Kong"},{val:"HU",name:"Hungary"},{val:"IS",name:"Iceland"},{val:"IN",name:"India"},{val:"ID",name:"Indonesia"},{val:"IE",name:"Ireland"},{val:"IM",name:"Isle of Man"},{val:"IL",name:"Israel"},{val:"IT",name:"Italy"},{val:"JM",name:"Jamaica"},{val:"JP",name:"Japan"},{val:"JE",name:"Jersey"},{val:"JO",name:"Jordan"},{val:"KZ",name:"Kazakhstan"},{val:"KE",name:"Kenya"},{val:"KI",name:"Kiribati"},{val:"KP",name:"Korea,North"},{val:"KR",name:"Korea,South"},{val:"KW",name:"Kuwait"},{val:"KG",name:"Kyrgyzstan"},{val:"LA",name:"Lao"},{val:"LV",name:"Latvia"},{val:"LB",name:"Lebanon"},{val:"LS",name:"Lesotho"},{val:"LR",name:"Liberia"},{val:"LY",name:"Libyan Arab Jamahiriya"},{val:"LI",name:"Liechtenstein"},{val:"LT",name:"Lithuania"},{val:"LU",name:"Luxembourg"},{val:"MO",name:"Macao"},{val:"MK",name:"Macedonia (Yugoslav)"},{val:"MG",name:"Madagascar"},{val:"MW",name:"Malawi"},{val:"MY",name:"Malaysia"},{val:"MV",name:"Maldives"},{val:"ML",name:"Mali"},{val:"MT",name:"Malta"},{val:"MH",name:"Marchall Islands"},{val:"MQ",name:"Martinique"},{val:"MR",name:"Mauritania"},{val:"MU",name:"Mauritius"},{val:"YT",name:"Mayotte"},{val:"MX",name:"Mexico"},{val:"FM",name:"Micronesia,Fed. States"},{val:"MD",name:"Moldova"},{val:"MC",name:"Monaco"},{val:"MN",name:"Mongolia"},{val:"MS",name:"Montserrat"},{val:"MA",name:"Morocco"},{val:"MZ",name:"Mozambique"},{val:"MM",name:"Myanmar"},{val:"NA",name:"Namibia"},{val:"NR",name:"Nauru"},{val:"NP",name:"Nepal"},{val:"NL",name:"Netherlands"},{val:"AN",name:"Netherlands Antilles"},{val:"NC",name:"New Caledonia"},{val:"NZ",name:"New Zealand"},{val:"NI",name:"Nicaragua"},{val:"NE",name:"Nigeria"},{val:"NU",name:"Niue"},{val:"NF",name:"Norfold Island"},{val:"MP",name:"Northern Mariana Islands"},{val:"NO",name:"Norway"},{val:"OM",name:"Oman"},{val:"PK",name:"Pakistan"},{val:"PW",name:"Palau"},{val:"PS",name:"Palestinian Territory"},{val:"PA",name:"Panama"},{val:"PG",name:"Papua New Guinea"},{val:"PY",name:"Paraguay"},{val:"PE",name:"Peru"},{val:"PH",name:"Philippines"},{val:"PN",name:"Pitcairn"},{val:"PL",name:"Poland"},{val:"PT",name:"Portugal"},{val:"PR",name:"Puerto Rico"},{val:"QA",name:"Qatar"},{val:"RE",name:"Reunion"},{val:"RO",name:"Romania"},{val:"RU",name:"Russian Federation"},{val:"RW",name:"Rwanda"},{val:"SH",name:"Saint Helena"},{val:"KN",name:"Saint Kitts and Nevis"},{val:"LC",name:"Saint Lucia"},{val:"PM",name:"Saint Pierre and Miquelon"},{val:"VC",name:"Saint Vincent and Grenadines"},{val:"WS",name:"Samoa"},{val:"SM",name:"San Marino"},{val:"ST",name:"Sao Tome and Principe"},{val:"SA",name:"Saudi Arabia"},{val:"SN",name:"Senegal"},{val:"CS",name:"Serbia and Montenegro"},{val:"SC",name:"Seychelles"},{val:"SL",name:"Sierra Leone"},{val:"SG",name:"Singapore"},{val:"SK",name:"Slovakia"},{val:"SI",name:"Slovenia"},{val:"SB",name:"Solomon Islands"},{val:"SO",name:"Somalia"},{val:"ZA",name:"South Africa"},{val:"ES",name:"Spain"},{val:"LK",name:"Sri Lanka"},{val:"SD",name:"Sudan"},{val:"SR",name:"Suriname"},{val:"SJ",name:"Svalbard and Jan Mayen"},{val:"SZ",name:"Swaziland"},{val:"SE",name:"Sweden"},{val:"CH",name:"Switzerland"},{val:"SY",name:"Syrian Arab Republic"},{val:"TW",name:"Taiwan"},{val:"TJ",name:"Tajikistan"},{val:"TZ",name:"Tanzania,United Republic of"},{val:"TH",name:"Thailand"},{val:"TL",name:"Timor-Leste"},{val:"TG",name:"Togo"},{val:"TK",name:"Tokelau"},{val:"TO",name:"Tonga"},{val:"TT",name:"Trinidad and Tobago"},{val:"TN",name:"Tunisia"},{val:"TR",name:"Turkey"},{val:"TM",name:"Turkmenistan"},{val:"TC",name:"Turks and Caicos Islands"},{val:"TV",name:"Tuvalu"},{val:"UG",name:"Uganda"},{val:"UA",name:"Ukraine"},{val:"AE",name:"United Arab Emirates"},{val:"GB",name:"United Kingdom"},{val:"US",name:"United States"},{val:"UY",name:"Uruguay"},{val:"UZ",name:"Uzbekistan"},{val:"VU",name:"Vanuatu"},{val:"VE",name:"Venezuala"},{val:"VN",name:"Vietnam"},{val:"VG",name:"Virgin Islands,British"},{val:"VI",name:"Virgin Islands,U.S."},{val:"WF",name:"Wallis and Futuna"},{val:"EH",name:"Western Sahara"},{val:"YM",name:"Yemen"},{val:"ZM",name:"Zambia"},{val:"ZW",name:"Zimbabwe"}];
					$parse(attrs.ngModel).assign(scope, "US");

				}
			};
		}
	)

	.directive('scSelectStates',
		/*
		 * Dropdown for state selection when country is USA
		 * */
		function ($log) {
			return {
				replace: true,
				template: '<select ng-options="state.val as state.name for state in states">' +
					'<option value="">Please Select</option></select>',
				link: function (scope, element, attrs, ctrl) {
					scope.states = [{val:"AL",name:"Alabama"},{val:"AK",name:"Alaska"},{val:"AZ",name:"Arizona"},{val:"AR",name:"Arkansas"},{val:"CA",name:"California"},{val:"CO",name:"Colorado"},{val:"CT",name:"Connecticut"},{val:"DE",name:"Delaware"},{val:"DC",name:"District of Columbia"},{val:"FL",name:"Florida"},{val:"GA",name:"Georgia"},{val:"HI",name:"Hawaii"},{val:"ID",name:"Idaho"},{val:"IL",name:"Illinois"},{val:"IN",name:"Indiana"},{val:"IA",name:"Iowa"},{val:"KS",name:"Kansas"},{val:"KY",name:"Kentucky"},{val:"LA",name:"Louisiana"},{val:"ME",name:"Maine"},{val:"MD",name:"Maryland"},{val:"MA",name:"Massachusetts"},{val:"MI",name:"Michigan"},{val:"MN",name:"Minnesota"},{val:"MS",name:"Mississippi"},{val:"MO",name:"Missouri"},{val:"MT",name:"Montana"},{val:"NE",name:"Nebraska"},{val:"NV",name:"Nevada"},{val:"NH",name:"New Hampshire"},{val:"NJ",name:"New Jersey"},{val:"NM",name:"New Mexico"},{val:"NY",name:"New York"},{val:"NC",name:"North Carolina"},{val:"ND",name:"North Dakota"},{val:"OH",name:"Ohio"},{val:"OK",name:"Oklahoma"},{val:"OR",name:"Oregon"},{val:"PA",name:"Pennsylvania"},{val:"RI",name:"Rhode Island"},{val:"SC",name:"South Carolina"},{val:"SD",name:"South Dakota"},{val:"TN",name:"Tennessee"},{val:"TX",name:"Texas"},{val:"UT",name:"Utah"},{val:"VT",name:"Vermont"},{val:"VA",name:"Virginia"},{val:"WA",name:"Washington"},{val:"WV",name:"West Virginia"},{val:"WI",name:"Wisconsin"},{val:"WY",name:"Wyoming"},{val:"AA",name:"Armed Forces (the) Americas"},{val:"AE",name:"Armed Forces Europe"},{val:"AP",name:"Armed Forces Pacific"},{val:"AS",name:"American Samoa"},{val:"GU",name:"Guam"},{val:"MP",name:"Northern Mariana Islands"},{val:"PR",name:"Puerto Rico"},{val:"UM",name:"United States Minor Outlying Islands"},{val:"VI",name:"Virgin Islands"}];
				}
			};
		}
	)

	.directive('scSelectProvinces',
		/*
		 * Dropdown for province selection when country is Canada
		 * */
		function ($log) {
			return {
				replace: true,
				template: '<select ng-options="province.val as province.name for province in provinces">' +
					'<option value="">Please Select</option></select>',
				link: function (scope, element, attrs, ctrl) {

					scope.provinces = [{val:"AB",name:"Alberta (AB)"},{val:"BC",name:"British Columbia (BC)"},{val:"MB",name:"Manitoba (MB)"},{val:"NB",name:"New Brunswick (NB)"},{val:"NL",name:"Newfoundland and Labrador (NL)"},{val:"NT",name:"Northwest Territories (NT)"},{val:"NS",name:"Nova Scotia (NS)"},{val:"NU",name:"Nunavut (NU)"},{val:"PE",name:"Prince Edward Island (PE)"},{val:"SK",name:"Saskatchewan (SK)"},{val:"ON",name:"Ontario (ON)"},{val:"QC",name:"Quebec (QC)"},{val:"YT",name:"Yukon (YT)"}];

				}
			};
		}
	)


	.directive('scNumeric',
		/*
		 * Allows only numeric numbers to be inputed
		 * */
		function ($log) {
			return {
				require: '?ngModel',
				link: function (scope, element, attrs, ctrl) {

					attrs.$set('pattern', '[0-9]*');

					// Validation

					ctrl.$parsers.unshift(function (viewValue) {

						if (viewValue != '' && !angular.isUndefined(viewValue)) {
							var regexInt = /^[0-9]*$/;

							if (regexInt.test(viewValue)) {
								ctrl.$setValidity('numeric', true);
								return viewValue;
							} else {
								ctrl.$setValidity('numeric', false);
								return undefined;
							}
						} else {
							ctrl.$setValidity('numeric', true);
							return viewValue;
						}

					});


					// Prevent non numeric key from being pressed

					element.on('keydown', function (e) {

						if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
							// Allow: Ctrl+A and Ctrl+V
							((event.keyCode == 65 || event.keyCode == 86) && (event.ctrlKey === true || event.metaKey === true)) ||
							// Allow: home, end, left, right
							(event.keyCode >= 35 && event.keyCode <= 39)) {
							return;
						}
						else {
							// Ensure that it is a number and stop the keypress
							if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
								event.preventDefault();
							}
						}
					});


				}
			};
		}
	)


	.directive('scDollar',
		/*
		 * Allows only numeric numbers to be inputed
		 * */
		function ($log) {
			return {
				require: '?ngModel',
				link: function (scope, element, attrs, ctrl) {

					attrs.$set('pattern', '[0-9]*');

					// Validation

					ctrl.$parsers.unshift(function (viewValue) {

						if (viewValue != '' && !angular.isUndefined(viewValue)) {
							var regexInt = /^(\d*\.\d{1,2}|\d+)$/;

//							$log.log(regexInt.test(viewValue));
							if (regexInt.test(viewValue)) {
								ctrl.$setValidity('dollar', true);
								return viewValue;
							} else {
								ctrl.$setValidity('dollar', false);
								return undefined;
							}
						} else {
							ctrl.$setValidity('dollar', true);
							return viewValue;
						}

					});


					// Prevent non numeric key from being pressed

					element.on('keydown', function (e) {

						var val = element.val();
//						$log.log(event.keyCode, element.val(), element.val().split('.'));

						if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
							// Allow: Ctrl+A and Ctrl+V
							((event.keyCode == 65 || event.keyCode == 86) && (event.ctrlKey === true || event.metaKey === true)) ||
							// Allow: home, end, left, right
							(event.keyCode >= 35 && event.keyCode <= 39) ||
							// Allow '.' for donation amount
							(event.keyCode == 190 || event.keyCode == 110) && val.indexOf('.') < 0 ) {
							return;
						}
						else {
							// Ensure that it is a number and stop the keypress
							if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ) ||
								// Allow only one '.' and two decimal spaces
								(!angular.isUndefined(val.split('.')[1]) && val.split('.')[1].length > 1 )
								) {
								event.preventDefault();
							}
						}

					});

				}
			};
		}
	)


	.directive('scCharLimit',
		/*
		 * Character Limit counter
		 * */
		function ($log) {
			return function (scope, element, attrs) {
				var suffix = ' Characters Left';

				scope.$watch(attrs.scCharLimit, function (newVal, oldVal) {
					if (newVal) {
						element.text((attrs.count - newVal.length) + suffix);
					}
				});
			};
		}
	)


	.directive('scMaxValue',
		/*
		 * Validate Maximum value of field
		 * */
		function ($log) {
			return {
				require: '?ngModel',
				link: function (scope, element, attrs, ctrl) {

					ctrl.$parsers.unshift(function (viewValue) {

						if (viewValue != '' && !angular.isUndefined(viewValue)) {
							var valFloat = parseFloat(viewValue);

							if (valFloat <= attrs.scMaxValue) {
								ctrl.$setValidity('maxValue', true);
								return viewValue;
							} else {
								ctrl.$setValidity('maxValue', false);
								return undefined;
							}
						} else {
							ctrl.$setValidity('maxValue', true);
							return viewValue;
						}

					});
				}
			};
		}
	)


	.directive('scMinValue',
		/*
		 * Validate Minimum value of field
		 * */
		function ($log) {
			return {
				require: '?ngModel',
				link: function (scope, element, attrs, ctrl) {
					ctrl.$parsers.unshift(function (viewValue) {

						if (viewValue != '' && !angular.isUndefined(viewValue)) {
							var valFloat = parseFloat(viewValue);

							if (valFloat > attrs.scMinValue) {
								ctrl.$setValidity('minValue', true);
								return viewValue;
							} else {
								ctrl.$setValidity('minValue', false);
								return undefined;
							}
						} else {
							ctrl.$setValidity('minValue', true);
							return viewValue;
						}

					});
				}
			};
		}
	)

	.directive('scIsExpired',
		/*
		 * Validate if date is expired
		 * */
		function ($log, $filter, $parse) {
			return {
				require: '?ngModel',
				link: function (scope, element, attrs, ctrl) {

					scope.$watch(attrs.scIsExpired,
						function (exp) {

							var month = $filter('date')(new Date(), 'MM'),
								year = $filter('date')(new Date(), 'yyyy');

							if (exp.year == year) {
								if (exp.month < parseInt(month)) {
									ctrl.$setValidity('isExpired', false);
								} else {
									ctrl.$setValidity('isExpired', true);
								}
							} else {
								ctrl.$setValidity('isExpired', true);
							}
						}
						, true);

				}
			};
		}
	)

	.directive('scPhoneNumber',
		/*
		 *  Validate phone number
		 * */
		function ($log, $filter, $parse) {
			return {
				require: '?ngModel',
				link: function (scope, element, attrs, ctrl) {
					ctrl.$parsers.unshift(function (viewValue) {

						if (viewValue != '' && !angular.isUndefined(viewValue)) {
							var regexInt = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

							if (regexInt.test(viewValue)) {
								ctrl.$setValidity('phoneNumber', true);
								return viewValue;
							} else {
								ctrl.$setValidity('phoneNumber', false);
								return undefined;
							}
						} else {
							ctrl.$setValidity('phoneNumber', true);
							return viewValue;
						}

					});

				}
			}
		}
	)

	.directive('scCustomSelect',
		/*
		 * Custom Dropdown based on array passed in
		 * */
		function ($log, $parse) {
			return {
				require: '?ngModel',
				replace: true,
				scope: {
					list: '=scCustomSelect',
					blankOption: '=?blankOption'
				},
				template: '<select ng-options="key as value for (key, value) in list">' +
					'<option value="">{{ blankOption || "Please Select"}}</option></select>'
			};
		}
	)

	.directive('scArraySelect',
		/*
		 * Custom Dropdown based on array passed in
		 * */
		function ($log, $parse) {
			return {
				require: '?ngModel',
				replace: true,
				scope: {
					list: '=scArraySelect'
				},
				template: '<select ng-options="listItem for listItem in list">' +
					'<option value="">Please Select</option></select>'
			};
		}
	)


	.directive('scIsInArray',
		/*
		 * Validate that field value matches array
		 * */
		function ($log, $parse, $timeout) {
			return {
				require: '?ngModel',
				link: function (scope, element, attrs, ctrl) {
					$timeout(function (){
						scope.$watch(attrs.ngModel, function (value) {
							var array = $parse(attrs.isInArray)(scope);
							
							if (array.indexOf(value) != -1) {
								ctrl.$setValidity('isInArray', true);
							} else {
								ctrl.$setValidity('isInArray', false);
							}
						});
					});
				}
			};
		}
	)

	.directive('scIsInObject',
		/*
		* Check if key is in object
		* */
		function ($log, $parse, $timeout) {
			return {
				require: '?ngModel',
				link: function (scope, element, attrs, ctrl) {
					$timeout(function () {

						scope.$watch(attrs.ngModel, function (value) {
							var object = $parse(attrs.scIsInObject)(scope),
								isInObject = scope.checkObject(object, value);

							if (isInObject) {
								ctrl.$setValidity('isInObject', true);
							} else {
								ctrl.$setValidity('isInObject', false);
							}
						});

						scope.checkObject = function(object, value) {
							if (value) {
								for (var key in object) {
									if (object[key].id == value.id) {
										return true;
									}
								}
							}
						}
					});
				}
			}
		}
	)

	.directive('scSubmit',
		/*
		* Submits all forms in scope
		* 	- Scrolls to first error
		* */
		function ($log, $window, $timeout) {
			return {
				restrict: 'A',
				link: function(scope, element, attrs) {
					var form = scope[attrs.name];

					return element.bind('submit', function() {
						angular.forEach(form, function(field, name) {
							scope.formSubmitted = false;
							scope.$apply();

							if (field.$invalid) {
								scope.formSubmitted = true;
								scope.$apply();
								var invalidOffsetTop = angular.element("form .ng-invalid:first").offset().top;
								
								$window.scrollTo(0, invalidOffsetTop - 100);
								return field.$setViewValue(field.$value);
							}
						});
						
						if (form.$valid) {
							return scope.$apply(attrs.submit);
						}
					});
				}
			};
		}
	)


	.directive('scMirrorModel',
		/*
		* 	Copy model value to another model
		* */
		function ($log, $parse, $timeout) {
			return {
				restrict: 'A',
				requires: '?ngModel',
				link: function (scope, element, attrs) {

					$timeout(function (){
						scope.$watch(attrs.ngModel, function (value) {
//							$log.log(value);
							$parse(attrs.scMirrorModel).assign(scope, value);
						});
					});

				}
			};
		}
	);



	return Form;

});
