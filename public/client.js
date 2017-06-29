$('#logout').on('click', function() {
	window.location = 'index.html';
});

var SHOW_URL =  '/shows';

var showAddFormTemplate =
	`<div class="row">
		<form class="show-form" action="">
			<fieldset class="show-form-label">
				<div id="legend-title">Show Info</div>
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
		`<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 item">
			<div class="js-show-item">
			<div class="centered">
				<h3 class="js-show-title"></h3>
			</div>
			<p class="return-date">Return Date: <span class="js-return-date"></span></p>
			<p class="schedule">Schedule: <span class="js-schedule-day"></span> at <span class="js-schedule-time">
			</span></p>
			<p id="checkbox-container">Update as Watched: </p>
			<input type="checkbox" name="completed" class="js-completed" value="">
			<i class="fa fa-trash-o fa-2x" aria-hidden="true"></i>
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
			scheduleTime: $('#schedule-time').val(),
			completed: false,
			user_id: JSON.parse(localStorage.user)._id

		}
		addShow(show);
	})
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
			user: localStorage.headers
		},
		dataType: 'json',
		contentType: 'application/json'
	});
}

function deleteShow(showId) {
	$.ajax({
		method: 'DELETE',
		url: SHOW_URL + '/' + showId,
		success: function() {
			getAndDisplayShowUpdates();
		},
		contentType: 'application/json'
	});
}

function updateShow(showUpdate) {
	$.ajax({
		method: 'PUT',
		url: SHOW_URL + '/' + showUpdate._id,
		data: JSON.stringify(showUpdate),
		success: function() {
			getAndDisplayShowUpdates();
		},
		headers: {
			user: localStorage.headers
		},
		dataType: 'json',
		contentType: 'application/json'
	});
}

function handleShowAdd() {
	$('#show-form').submit(function(e) {
		addShow({
			title: $(e.currentTarget).find('#show-title').val(),
			returnDate: $(e.currentTarget).find('#show-date').val(),
			scheduleDay: $(e.currentTarget).find('#schedule-day').val(),
			scheduleTime: $(e.currentTarget).find('#schedule-time').val()

		});
	});
}

function handleShowDelete() {
	$('.show-list').on('click', '.fa-trash-o', function(e) {
		e.preventDefault();
		deleteShow(
			$(e.currentTarget).closest('.item').attr('id')
		);
	});
}

function handleShowUpdate() {
	$('.js-completed:checkbox').change(function(e) {
		e.preventDefault();
		let showUpdate = {
			completed: $(e.currentTarget).closest('.js-completed').prop('checked'),
			_id: $(e.currentTarget).closest('.item').attr('id')
		}
		updateShow(showUpdate);
	});
}

function getAndDisplayShowUpdates() {
	$.ajax({
		method: 'GET',
		url: '/shows?id=' + JSON.parse(localStorage.user)._id,
		success: function(data) {
			var showItems = data.map(function(show) {
				var elem = $(showTemplate);
				elem.attr('id', show._id);
				elem.find('.js-show-title').text(show.title);
				elem.find('.js-return-date').text(show.returnDate);
				elem.find('.js-schedule-day').text(show.scheduleDay);
				elem.find('.js-schedule-time').text(show.scheduleTime);
				elem.find('.js-completed').prop("checked", show.completed);
				return elem;
			})

			$('.show-list').html(showItems);
			handleShowUpdate();
		},
		headers: {
			user: localStorage.headers
		},
		dataType: 'json',
		contentType: 'application/json'
	});
}

$(function() {
	handleShowAdd();
	handleShowDelete();
	getAndDisplayShowUpdates();
});
