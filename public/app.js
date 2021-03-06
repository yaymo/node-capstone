
$(function() {
  $('#sign-up-button').click(function(e) {
    e.preventDefault();
    createAccount($('#username').val(), $('#password').val());
  })
})

function createAccount(username, password) {
  $.ajax({
    url: '/users',
    type: 'POST',
    data: JSON.stringify({username: username, password: password}),
    contentType: 'application/json',
    success: function(user) {
      localStorage.headers = "Basic" + btoa(username+ ":" + password)
      localStorage.user = JSON.stringify(user)

      window.location = 'shows.html';
    }
  });
}

$(function() {
  $('#sign-in-button').click(function(e) {
    e.preventDefault();
    logIn($('#email-sign-in').val(), $('#password-sign-in').val());
  })
})

function logIn(username, password) {
  $.ajax({
    url:'/users/login',
    type: 'POST',
    data: JSON.stringify({username: username, password: password}),
    contentType: 'application/json',
    success: function(user) {
      localStorage.headers = "Basic" + btoa(username+ ":" + password)
      localStorage.user = JSON.stringify(user)
      window.location = 'shows.html';
    }
  });
}

