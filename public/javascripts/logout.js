$(document).ready(function() {

    $('#btnLogout').on('click', function(ev) {
        $.ajax({
            type: 'POST',
            url: '/logout',
            success: function(data) {
                window.location.replace('/');
            },
            error: function() {
            }
        });
    });
});
