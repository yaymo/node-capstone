$('#logout').on('click', function() {
	window.location = 'index.html';
});

var state = {
	id: null,
	show: null
}
var SHOW_URL =  '/shows';

var showAddFormTemplate =
	`<div class="row">
		<form class="show-form" action="">
			<fieldset class="show-form-label">
				<legend id="legend-title">Add a show!</legend>
					<label for="show-name" id="name-label">Title:</label>
					<input type="text" id="show-title" name="show-name" placeholder="Ex: Family Feud" required></input>
					<label for="show-return" id="return-label">Return Date:</label>
					<input type="text" id="show-date" name="show-return"placeholder="Ex: June 15th"></input>
					<label for="schedule-day" id="schedule-label">Schedule:</label>
					<input type="text" name="schedule-day" id="schedule-day" placeholder="Ex: Sunday's"</input>
					<label for="schedule-time" id="time-label">Time:</label>
					<input type="text" name="schedule-time" id="schedule-time" placeholder="Ex: 9 pm"></input>
					<button type="submit" id="submit-show">Add</button>
			</fieldset>
		</form>
	<div>`

var showTemplate =
	`<div class="col-6">
		<div class="js-show-item">
			<h3 class="js-show-title">
			<i class="fa fa-pencil" aria-hidden="true"></i>
			<i class="fa fa-trash-o" aria-hidden="true"></i>
			</h3>
			<p class="js-return-date"> Return date: </p>
			<p class="js-schedule-day"> Schedule: <span class="js-schedule-time"> </span></p>
		</div>
	</div>`


$('.add-show-button').click(function() {
	var itemForm = $(showAddFormTemplate);
	$('.add-form').append(itemForm);
	itemForm.submit(function(e) {
		let show = {
			title: $('#show-title').val(),
			returnDate: $('#show-date').val(),
			scheduleDay: $('#schedule-day').val(),
			scheduleTime: $('#schedule-time').val()

		}
		addShow(show);
	})
	// //$('.add-form').append(itemForm);
})

function addShow(show) {
	$.ajax({
		method: 'POST',
		url: SHOW_URL,
		data: JSON.stringify(show),
		success: function() {
			getAndDisplayShowUpdates();
		},
		headers: {
			user: JSON.parse(localStorage.headers)
		},
		dataType: 'json',
		contentType: 'application/json'
	});
}

function deleteShow(showId) {
	$.ajax({
		method: 'DELETE',
		url: SHOW_URL + '/' + showId,
		success: getAndDisplayShowUpdates(),
		contentType: 'application/json'
	});
}

function updateShow(show) {
	$.ajax({
		method: 'PUT',
		url: SHOW_URL + '/' + show.id,
		data: show,
		success: function() {
			getAndDisplayShowUpdates();
		}
	});
}

function handleShowAdd() {
	$('#show-form').submit(function(e) {
		console.log('test');
		addShow({
			title: $(e.currentTarget).find('#show-title').val(),
			returnDate: $(e.currentTarget).find('#show-date').val(),
			scheduleDay: $(e.currentTarget).find('#schedule-day').val(),
			scheduleTime: $(e.currentTarget).find('#schedule-time').val()

		});
	});
}

function handleShowDelete() {
	$('.js-show-item').on('click', '.fa-trash-o', function(e) {
		e.preventDefault();
		deleteShow(
			$(e.currentTarget).closest('.js-show-item').attr('id')
		);
	});
}


function getAndDisplayShowUpdates() {
	$.getJSON('/shows', function(data) {
		var showItems = data.map(function(show) {
			var elem = $(showTemplate);
			elem.attr('id', show._id);
			elem.find('.js-show-title').text(show.title);
			elem.find('.js-return-date').text(show.returnDate);
			elem.find('.js-schedule-day').text(show.scheduleDay);
			elem.find('.js-schedule-time').text(show.scheduleTime);

			return elem;
		});

		$('.show-list').html(showItems);
	});
}


$(function() {
	getAndDisplayShowUpdates();
	handleShowAdd();
	handleShowDelete();
});
