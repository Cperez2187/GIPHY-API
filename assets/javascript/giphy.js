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
		// clear div after every new button press
		$('#searches').empty();
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
			
			response.data.forEach(function(element) {
				let searchDiv = $('<div class="search-item">');
				let rating = element.rating;
				let p = $('<p>').text('Rating: ' + rating);

				// Hold 'still' and 'animated' url's of the gif
				let animated = element.images.fixed_height.url;
				let still = element.images.fixed_height_still.url;

				// Create <img> div and set attributes
				let image = $('<img>');
				image.attr('src', still);
				image.attr('data-still', still);
				image.attr('data-animated', animated);
				image.attr('data-state', 'still');
				image.addClass('searchImage');
				searchDiv.append(p);
				// Append <img> onto 'searchDiv'...
				searchDiv.append(image);
				// ...then append 'searchDiv' onto div with id of 'searches'
				$('#searches').append(searchDiv);
			});
		})
	})

	$('#addSearch').on('click', function() {
		// Grab input value from 1st input tag
		let newSearch = $('input').eq(0).val();
		// Add newSearch into searchArray
		searchArray.push(newSearch);

		// Re-populate buttons on screen
		populateButtons(searchArray, 'searchButton', '#buttonsArea');
	})
});






 