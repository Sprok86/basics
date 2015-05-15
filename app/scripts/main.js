jQuery(function($) {

    //accordion functional
    $('dd').filter(':nth-child(n+4)').addClass('.hide-accordion');
    $('dl').on('mouseenter', 'dt', function() {
        $(this)
            .next()
                .slideDown(200)
                .siblings('dd')
                    .slideUp(200);
    });

    //active class change on nav
    $('.nav').on('click', 'a', function () {
        $('.nav').find('.active').removeClass('active');
        $(this).parent().addClass('active');

        if($('#navbar-toggle')) {
            $('#navbar-toggle:visible').click();
        }
    });
    //absolute position when click on 
    $('#navbar-toggle').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        if($('.centered-bootstrap-body')) {
            $('.centered-bootstrap-body').toggleClass('padding-top-0');
            $('.centered-bootstrap-body').find('.navbar-main').toggleClass('relative-position');
        }
        if($('.centered-and-right-element-body')) {
        	$('.centered-and-right-element-body').toggleClass('padding-top-0');
            $('.centered-and-right-element-body').find('.navbar-main').toggleClass('relative-position');
        }

    });
    //activate all tooltips
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

});