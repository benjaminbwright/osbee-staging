(function($){
    /*$(window).load(function(){
        $('#back-to-top').hide();
    });

    $(window).scroll(function(){
        if ($(this).scrollTop() > 350) {
            jQuery('#back-to-top').fadeIn(300);
        } else {
            jQuery('#back-to-top').fadeOut(300);
        }
    });
    */
    $(document).ready(function(){

        $('#back-to-top').click(function(event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: 0}, 300);
            return false;    
        });
    });
})(jQuery);