(function($){

    $(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            jQuery('#back-to-top').fadeIn(200);
        } else {
            jQuery('#back-to-top').fadeOut(200);
        }
    });

    $(document).ready(function(){
        $('#back-to-top').hide();
        $('#back-to-top').click(function(event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: 0}, 300);
            return false;    
        });

    });
})(jQuery);