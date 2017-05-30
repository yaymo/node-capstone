function createAccount() {
  $('#sign-up-button').submit(function(e) {
    e.preventDefault();
    let username = $(this).find('#username').val();
    let password = $(this).find('#id').val();

    $.ajax({
      url:'/signup',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        username: username,
        password: password
      }),
      success: function(data) {
        state.user = {
          id: data.id,
          username: data.username
        }

        //redirect???
      }
    })
  })
}
