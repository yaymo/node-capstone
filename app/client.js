var MOCK_UPDATES = {
	"showsList": [
		{
			"id": "1",
			"title": "The Walking Dead",
			"returnDate": "10/01/2017",
			"schedule": {
				"day": "Sunday",
				"time": "9 pm"
			}
		},
		{	
			"id": "2",
			"title": "Family Guy",
			"returnDate": "9/9/2017",
			"schedule": {
				"day": "Sunday",
				"time": "8 pm"
			}
		},
		{	
			"id": "3",
			"title": "Game of Thrones",
			"returnDate": "7/1/2017",
			"schedule": {
				"day": "Sunday",
				"time": "10 pm"
			}
		}
	]
};

var showAddFormTemplate = 
	`<div class="row">
		<form class="show-form" action="">
			<fieldset class="show-form-label">
				<legend id="legend-title">Add a show!</legend>
					<label for="show-name" id="name-label">Title:</label>
					<input type="text" id="show-title" name="show-name" placeholder="Ex: Family Feud" required></input>
					<label for="show-return" id="return-label">Return Date:</label>
					<input type="date" id="show-date" name="show-return"></input>
					<label for="schedule-day" id="schedule-label">Schedule:</label>
					<input type="text" name="schedule-day" id="schedule-day" placeholder="Ex: Sunday's"</input>
					<label for="schedule-time" id="time-label">Time:</label>
					<input type="text" name="schedule-time" id="schedule-time" placeholder="Ex: 9 pm"></input>
					<button type="button" id="submit-show">Submit</button>
			</fieldset>
		</form>
	<div>`

$('.add-show').click(function(e) {
	e.stopPropagation();
	var itemForm = $(showAddFormTemplate);
	$('.add-form').append(itemForm);
});

function getRecentShowUpdates(callbackFn) {
	setTimeout(function() { callbackFn(MOCK_UPDATES)}, 1)
}

function displayShowUpdates(data) {
	for(index in data.showsList) {
		$('.show-list').append(
			'<div class="col-6">' +
				'<div class="show-item">' +
					'<h3 class="show-title">' + data.showsList[index].title + 
					'<i class="fa fa-pencil aria-hidden="true"></i>' +
					'<i class="fa fa-trash-o" aria-hidden="true"></i>' +
					 '</h3>' +
					'<p class="return-date"> Return Date: ' + data.showsList[index].returnDate + '</p>' +
					'<p class="schedule"> Schedule: ' + data.showsList[index].schedule.day + ' <span> at</span>' + ' ' +
					data.showsList[index].schedule.time + '</p>' +
				'</div>' +
			'</div>')
	}
}

function getAndDisplayShowUpdates() {
	getRecentShowUpdates(displayShowUpdates);
}

$(function() {
	getAndDisplayShowUpdates();
})