$(document).ready(function() {

    $('#btnLogin').on('click', function(ev) {
        ev.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/login',
            data: $('#login_form').serialize(),
            success: function(data) {
                if ('error_code' in data) {
                    console.log(data);
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
        $.ajax({
            type: 'POST',
            url: '/signup',
            data: $('#login_form').serialize(),
            success: function(data) {
                window.location.replace('/');
            },
            error: function() {
            }
        });
    });
});
