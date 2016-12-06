(function($){
    $(document).ready(function(){
        // Move main content on main services page
        
        $(".menu-block-1 .active span").after('<ul class="menu menu-subcat"><li><div id="active-content" class="responsive-narrow-body"></div></li></ul>');
        if (!document.getElementById("active-content")) {
            $(".field-type-image").after('<div class="under-main-image responsive-narrow-body"></div>');
        }
        $(".menu-block-1 li span").after('<span class="fa subcat-expand">&#x33;</span>');
        $(".menu-block-1 .active .subcat-expand").html("&#x32;");


        var pageContent = $(".narrow-body");
        var pageImage = $(".field-name-field-image");
        var responsiveContent = $(".responsive-narrow-body");

        pageContent.clone().appendTo('.responsive-narrow-body');
        pageImage.clone().prependTo('.responsive-narrow-body');

        // Toggle between responsive and desktop content
        if ($(window).width() < 769 ){
            pageContent.hide();
            pageImage.hide();
            responsiveContent.show();
        } else {
            pageContent.show();
            pageImage.show();
            responsiveContent.hide();
        }
        
        $(window).resize(function(){
            if ($(window).width() < 769 ){
                pageContent.hide();
                pageImage.hide();
                responsiveContent.show();
            } else {
                pageContent.show();
                pageImage.show();
                responsiveContent.hide();
            }
        });

        // Scroll to active menu item
        var container = $("html,body");
        var scrollTo = $(".menu-block-1 .active-trail:visible:first");
        //var scrollTo = $("#node-page-full-group-prev-next");

        if (scrollTo.offset() !== null) { 
            container.animate({ scrollTop: scrollTo.offset().top},'1200');
        }

        

    });
})(jQuery);