/////////////////////
//Careers Menu //
/////////////////////

(function($){
    $(document).ready(function(){
        if ($("body").hasClass("page-careers") > 0) {
            // Move main content on main services page
            
            $(".page-careers #main-content .menu li a").after('<span class="fa subcat-expand">&#x33;</span>');


            var pageContent = $("#career-box");
            var responsiveContent = $("#active-content #main-content");
            
            // Toggle between responsive and desktop content
            if ($(window).width() < 769 ){
                pageContent.hide();
                responsiveContent.show();
            } else {
                pageContent.show();
                responsiveContent.hide();
            }
            
            $(window).resize(function(){
                if ($(window).width() < 769 ){
                    pageContent.hide();
                    responsiveContent.show();
                } else {
                    pageContent.show();
                    responsiveContent.hide();
                }
            });
            
            // Scroll to active menu item
            var container = $("html,body");
            var scrollTo = $(".page-careers #main-content .active-trail:visible:first");
            //var scrollTo = $("#node-page-full-group-prev-next");

            if (scrollTo.offset() !== null) { 
                container.animate({ scrollTop: scrollTo.offset().top},'1200');
            }

        }
        
    });
})(jQuery);