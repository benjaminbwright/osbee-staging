/////////////////////
//Our Process Menu //
///////////////////// 

(function($){
    $(document).ready(function(){
        if ($("body").hasClass("section-our-process") > 0) {
            // Move main content on main services page
            
            $(".menu-block-3 .active-trail .menu-link-wrapper").first().after('<ul class="menu menu-subcat"><li><div id="active-content" class="responsive-narrow-body"></div></li></ul>');
            $(".menu-block-3 li .menu-link-wrapper a").after('<span class="fa subcat-expand">&#x33;</span>');
            $(".menu-block-3 .active-trail .subcat-expand").html("&#x32;");
            if (!document.getElementById("active-content")) {
                $(".field-type-image").after('<div class="under-main-image responsive-narrow-body"></div>');
            }

            $(".menu-block-3 a.active-trail").click(function(event){
                event.preventDefault();
                $(this).parent().parent().toggleClass("hidden");
                if ($(this).parent().parent().hasClass("hidden")){
                    $(".menu-block-3 .active-trail .subcat-expand").html("&#x33;");
                } else {
                    $(".menu-block-3 .active-trail .subcat-expand").html("&#x32;");
                }
            });

            var pageContent = $(".narrow-body");
            var pageImage = $(".field-name-field-image");
            var responsiveContent = $(".responsive-narrow-body");

            pageContent.clone().prependTo('.responsive-narrow-body');
            pageImage.clone().prependTo('.responsive-narrow-body');
            
            // Toggle between responsive and desktop content
            if ($(window).width() < 769 ){
                //if (!$("body").hasClass("page-node-20")) {
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
            var scrollTo = $(".menu-block-3 .active-trail:visible:first");
            //var scrollTo = $("#node-page-full-group-prev-next");

            if (scrollTo.offset() !== null) { 
                container.animate({ scrollTop: scrollTo.offset().top},'1200');
            }

        }
        
    });
})(jQuery);