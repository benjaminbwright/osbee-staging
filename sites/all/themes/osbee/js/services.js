(function($){
    $(document).ready(function(){
        // Move main content on main services page
        
        $(".menu-block-1 .active span").after('<ul class="menu menu-subcat"><li><div id="active-content" class="responsive-narrow-body"></div></li></ul>');
        if (!document.getElementById("active-content")) {
            $(".field-type-image").after('<div class="under-main-image responsive-narrow-body"></div>');
        }
        $(".menu-block-1 li span").after('<span class="fa subcat-expand">&#x33;</span>');
        $(".menu-block-1 .active .subcat-expand").html("&#x32;");

        if ($(window).width() < 769) {
            $(".narrow-body").detach().appendTo('.responsive-narrow-body');
        } 
    });
})(jQuery);