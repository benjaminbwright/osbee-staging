(function($){
    $(document).ready(function(){
        $("body").prepend('<div class="swipe-icon-overlay"><img class="swipe-icon" src="sites/all/themes/osbee/images/swipe.png" /></div>');
        //$(".swipe-icon-overlay").fadeOut(12000);
        $(".swipe-icon-overlay").click(function(){
            $(this).css("display", "none");
        });
    });
})(jQuery);