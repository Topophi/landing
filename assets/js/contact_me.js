$(function() {

    var server = "https://awwwwwweyaaaaaa.topophi.com/api/emailus";

    $('#joinMailingList').on('click', function() {
        var email = $('#mailAddr').val();
        if(/.+@.+\..+/.test(email)) {
            $.ajax({
                url: server,
                dataType: "jsonp",
                timeout: 5000,
                data: {
                    email: email,
                    message: "Add me to the mailing list"
                },
                cache: false,
                success: function(success) {
                    if(success) {
                        // Success message
                        $('#mailingListStatus').html("<div class='alert alert-success'>");
                        $('#mailingListStatus > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#mailingListStatus > .alert-success')
                            .append("<strong>Thank you for your interest. We love you!</strong>");
                        $('#mailingListStatus > .alert-success')
                            .append('</div>');

                        //clear fields
                        $('#mailAddr').val('');
                    } else {
                        this.error();
                    }
                },
                error: function() {
                    // Fail message
                    $('#mailingListStatus').html("<div class='alert alert-danger'>");
                    $('#mailingListStatus > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#mailingListStatus > .alert-danger').append("<strong>Sorry, it seems that our message server is not responding. Please email us directly at <a href='mailto:info@topophi.com'>info@topophi.com</a> or try again later!</strong>");
                    $('#mailingListStatus > .alert-danger').append('</div>');
                },
            })
        } else {
            $('#mailingListStatus').html("<div class='alert alert-danger'>");
            $('#mailingListStatus > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#mailingListStatus > .alert-danger').append("<strong>Email address is not valid</strong>");
            $('#mailingListStatus > .alert-danger').append('</div>');
            $('#mailAddr').focus();
        }
    });

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: server,
                dataType: "jsonp",
                timeout: 5000,
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function(success) {
                    if(success) {
                        // Success message
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                        $('#success > .alert-success')
                            .append('</div>');

                        //clear all fields
                        $('#contactForm').trigger("reset");
                    } else {
                        this.error();
                    }
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that our message server is not responding. Please email us directly at <a href='mailto:info@topophi.com'>info@topophi.com</a> or try again later!</strong>");
                    $('#success > .alert-danger').append('</div>');
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
