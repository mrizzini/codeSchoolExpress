/*global $ cities */
console.log("cities test");
var cityList = [];
$(function() {
    
	$.get('/cities', appendToOptions);
	console.log("cities test2");

	function appendToOptions(cities) {
		var list = [];
		for (var i in cities) {
			cityList = cities[i];
			var content = '<a href="/cities/' + cityList + '">' + cityList + '</a> ' + '<a href="#" data-block="' + cityList + '"><img src="https://www.engelvoelkers.com/webinnovation-frontend-resources/images/X_small_red.svg"></a>';
			list.push($('<li>', {
				html: content
			}));
			// list.push($('<li>', {text: cities[i]}));
		}
		$('#city-list').append(list);
	}
	
	$("#formSubmit").on('submit', function(event) {
		console.log("submit test");
		event.preventDefault();
		var form = $(this);
		var cityData = form.serialize();
		console.log(cityData);
		console.log(cityList);
		$.ajax({
			type: 'POST',
			url: '/cities',
			data: cityData
		}).done(function(cityName) {
			console.log(cityName);
			appendToOptions([cityName]);
			form.trigger('reset');
		});
	});
	
	$("#city-list").on('click', 'a[data-block]', function(event) {
		var target = $(event.currentTarget);
		if (!confirm('Are you sure you want to delete ' + target.data('block') + "?")) {
			return false;
		}
		$.ajax({
			type: 'DELETE',
			url: '/cities/' + target.data('block')
		}).done(function() {
			target.parents('li').remove();
		});
	});
});