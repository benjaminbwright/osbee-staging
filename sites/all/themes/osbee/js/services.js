(function($){
    $(document).ready(function(){
      if (!$("body").hasClass("section-our-process")) {
        // Move main content on main services page
        
        $(".menu-block-1 .active-trail").addClass("active");
        $(".menu-block-1 a.active").parent().after('<ul class="menu menu-subcat"><li><div id="active-content" class="responsive-narrow-body"></div></li></ul>');
        if (!document.getElementById("active-content")) {
            $(".field-type-image").after('<div class="under-main-image responsive-narrow-body"></div>');
        }
        $(".menu-block-1 li span").after('<span class="fa subcat-expand">&#x33;</span>');
        $(".menu-block-1 .active .subcat-expand").html("&#x32;");


        var pageContent = $(".narrow-body");
        var pageImage = $(".field-name-field-image");
        var responsiveContent = $(".responsive-narrow-body");
        var footerBlock = $("#block-block-3 .block-content");

        pageContent.clone().appendTo('.responsive-narrow-body');
        pageImage.clone().prependTo('.responsive-narrow-body');
        footerBlock.clone().appendTo('.responsive-narrow-body .narrow-body');

        $("#main-content a.active").click(function(event){
            event.preventDefault();
            $(this).parent().parent().toggleClass("hidden");
            if ($(this).parent().parent().hasClass("hidden")){
                $(".menu-block-1 .active .subcat-expand").html("&#x33;");
            } else {
                $(".menu-block-1 .active .subcat-expand").html("&#x32;");
            }
        });


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

      }  

    });
})(jQuery);