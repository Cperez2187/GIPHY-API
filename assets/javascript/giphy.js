$(document).ready(function() {

	// On page load...
	$(function() {
		populateButtons(searchArray, 'searchButton', '#buttonsArea');
	})

	// Hold button types in array
	var searchArray = ['Dog', 'Cat', 'Bird'];

	// Fucnction to create and add buttons to the page
	function populateButtons(searchArray, classToAdd, areaToAddTo) {
		
		// empty div with buttons to avoid repeats
		$(areaToAddTo).empty();

		// Loop through array and create and append button for each element
		searchArray.forEach( function(element) {
			let a = $('<button>');
			a.addClass(classToAdd);
			a.attr('data-type', element);
			a.text(element);
			$(areaToAddTo).append(a);
		});
	}

	// On click event for every button
	$(document).on('click', '.searchButton', function() {

		// Hold data-type of each button in variable
		let type = $(this).data('type');

		// Set query URL to the giphy API address with the specific type
		let queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + type 
			+ '&api_key=dc6zaTOxFJmzC&limit=10';

		// Giphy API call 
		$.ajax({
			url: queryURL,
			method: 'GET'
		}).done(function(response) {
			console.log(response);
		})
	})
});






 