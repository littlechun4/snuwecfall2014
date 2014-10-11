$(document).ready(function() {

    $('#btnLogin').on('click', function(ev) {
        ev.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/login',
            data: $('#login_form').serialize(),
            success: function(data) {
                if ('error_code' in data) {
                    if (data['error_code'] === -4) {
                        $('#message_box').html('Invalid username and password combination. Please try again.');
                    }
                }
                else {
                    window.location = '/';
                }
            },
            error: function() {
            }
        });
    });

    $('#btnSignUp').on('click', function(ev) {
        ev.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/signup',
            data: $('#login_form').serialize(),
            success: function(data) {
                if ('error_code' in data) {
                    if (data['error_code'] === -1) {
                        $('#message_box').html('The user name should be 5~20 characters long. Please try again.');
                    }
                    else if (data['error_code'] === -2) {
                        $('#message_box').html('The password should be 8~20 characters long. Please try again.');
                    }
                    else if (data['error_code'] === -3) {
                        $('#message_box').html('This user name already exists. Please try again.');
                    }
                }
                else {
                    window.location = '/';
                }
            },
            error: function() {
            }
        });
    });
});
