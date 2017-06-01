

$(function() {
  $('#sign-up-button').submit(function(e) {
    console.log('test');
    e.preventDefault();
    createAccount($('#username').val(), $('#password').val());
  })
})

function createAccount(username, password) {
  $.ajax({
    url: '/user/signup',
    type: 'POST',
    data: JSON.stringify({username, password}),
    contentType: 'application/json',
    success: function() {
      localStorage.headers = "Basic" + btoa(username+ ":" + password)
      window.location.replace = 'shows.html';
    }
  });
}
