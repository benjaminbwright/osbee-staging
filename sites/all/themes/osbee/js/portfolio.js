(function($){
    $(document).load(function(){
        
    });
    $(document).ready(function(){
        page = $(".page-node-645");
        portfolioCaption = $(".page-node-645 .views-field-field-caption");
        thisCaption = $(".views-field-field-caption");
        captionExpand = $(".caption-expand");

        portfolioCaption.after('<div class="caption-expand">i</div>');
        $(".caption-expand").click(function(){
            $(this).prev().toggleClass('caption-expanded');
            if ($(this).prev().hasClass('caption-expanded')) {
                $(this).toggleClass('caption-close');
                $(this).text("M");
            } else {
                $(this).toggleClass('caption-close');
                $(this).text("i");
            }
        });

        // Slide back to first slide.
        $(".jcarousel-item-1").trigger("click");

        pagerOffset = 64;

        if ($(window).width() < 769) {
            $(".views-field-field-portfolio-image ul").height($(window).width()/2);
            $(".section-portfolio-page .views-slideshow-controls-bottom").css("top", ($(window).width()/2)+pagerOffset+"px");
        } else {
            $(".views-field-field-portfolio-image ul").height(326);
        }

        $(window).resize(function(){
            if ($(window).width() < 769) {
                var top = $(window).width()/2;
                $(".views-field-field-portfolio-image ul").height($(window).width()/2); 
                $(".section-portfolio-page .views-slideshow-controls-bottom").css("top", ($(window).width()/2)+pagerOffset+"px");
            } else {
                $(".views-field-field-portfolio-image ul").height(326);
            }
        });



    });


      
})(jQuery);