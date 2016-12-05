(function($){
    $(document).ready(function(){
        
        if ($(".views_slideshow_main").length > 0) {
            $("body").prepend('<div class="swipe-icon-overlay"><img class="swipe-icon" src="/sites/all/themes/osbee/images/swipe.png" /></div>');
        }
        //$(".swipe-icon-overlay").detach().prependTo("body");
        //$(".swipe-icon-overlay").fadeOut(12000);

        // Hide the icon if clicked or swiped
        $(".swipe-icon-overlay").click(function(){
            $(this).css("display", "none");
        });
        $(".swipe-icon-overlay").bind('touchstart mousedown', function(e){
            $(this).css("display", "none");
        });
    });
})(jQuery);