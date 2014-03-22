$(function () {

    $.ajax({
        url: "https://public-api.wordpress.com/rest/v1/sites/jpreecedev.com/posts",
        dataType: "jsonp"
    }).done(function (data) {

        data = data.posts.slice(10);

        var items = [];

        $.each(data, function (index, post) {

            items.push('<li><a href="' + post.URL + '">' + post.title + '</a></li>');

        });

        $('.nav').html(items.join(""));

    });

    var validator = $('form').validate({
        rules: {
            password: "required",
            passwordConfirmation: {
                equalTo: "#password"
            },
            favourite: "required",
            earliestMemory: "required",
            gender: "required",
            "Games[]": {
                required: true,
                minlength: 1
            }
        },
        messages: {
            "Games[]": "Please select at least one platform"
        },
        errorElement: "span",
        errorPlacement: function (error, element) {
            if (element.attr("name") == "gender" || element.attr("name") == "Games[]") {
                error.insertAfter($(element).closest('.form-group').children().first());
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            $(element).siblings('.form-control-feedback').removeClass('glyphicon glyphicon-ok').addClass('glyphicon glyphicon-remove');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
            $(element).siblings('.form-control-feedback').removeClass('glyphicon glyphicon-remove').addClass('glyphicon glyphicon-ok');
            $(element).siblings('span.error').remove();
        },
        success: function (element) {
            element.next('.form-control-feedback').removeClass('glyphicon glyphicon-remove').addClass('glyphicon glyphicon-ok');
            element.closest('.form-group').removeClass('has-error').addClass('has-success');
        }
    });

    $('button[type="reset"]').click(function () {
        validator.resetForm();

        $('.glyphicon').removeClass('glyphicon glyphicon-remove glyphicon-ok');
        $('.has-success, .has-error').removeClass('has-success has-error');
    });
});