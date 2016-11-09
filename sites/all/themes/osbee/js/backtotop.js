(function($){

    $(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            jQuery('#back-to-top').fadeIn(300);
        } else {
            jQuery('#back-to-top').fadeOut(300);
        }
    });

    $(document).ready(function(){
        $('#back-to-top').hide();
        $('#back-to-top').click(function(event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: 0}, 200);
            return false;    
        });
    });
})(jQuery);