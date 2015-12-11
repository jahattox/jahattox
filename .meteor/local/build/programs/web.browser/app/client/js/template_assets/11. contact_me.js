(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/js/template_assets/11. contact_me.js                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
$(function () {                                                        // 1
                                                                       //
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,                                           // 4
        submitError: function ($form, event, errors) {                 // 5
            // additional error messages or events                     //
        },                                                             //
        submitSuccess: function ($form, event) {                       // 8
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM                                    //
            var name = $("input#name").val();                          // 11
            var email = $("input#email").val();                        // 12
            var phone = $("input#phone").val();                        // 13
            var message = $("textarea#message").val();                 // 14
            var firstName = name; // For Success/Failure Message       // 15
            // Check for white space in name for Success/Fail message  //
            if (firstName.indexOf(' ') >= 0) {                         // 17
                firstName = name.split(' ').slice(0, -1).join(' ');    // 18
            }                                                          //
            $.ajax({                                                   // 20
                url: "././mail/contact_me.php",                        // 21
                type: "POST",                                          // 22
                data: {                                                // 23
                    name: name,                                        // 24
                    phone: phone,                                      // 25
                    email: email,                                      // 26
                    message: message                                   // 27
                },                                                     //
                cache: false,                                          // 29
                success: function () {                                 // 30
                    // Success message                                 //
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                    $('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success').append('</div>');   // 37
                                                                       //
                    //clear all fields                                 //
                    $('#contactForm').trigger("reset");                // 41
                },                                                     //
                error: function () {                                   // 43
                    // Fail message                                    //
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');    // 49
                    //clear all fields                                 //
                    $('#contactForm').trigger("reset");                // 51
                }                                                      //
            });                                                        //
        },                                                             //
        filter: function () {                                          // 55
            return $(this).is(":visible");                             // 56
        }                                                              //
    });                                                                //
                                                                       //
    $("a[data-toggle=\"tab\"]").click(function (e) {                   // 60
        e.preventDefault();                                            // 61
        $(this).tab("show");                                           // 62
    });                                                                //
});                                                                    //
                                                                       //
/*When clicking on Full hide fail/success boxes */                     //
$('#name').focus(function () {                                         // 68
    $('#success').html('');                                            // 69
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
