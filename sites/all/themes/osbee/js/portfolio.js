(function($){
    $(document).ready(function(){

        // Portfolio Overlay - Deprecated (remove)
        // This is only for a test version of the portfolio where the captions appeared over the images
        // Page node for the portfolio
        page = $(".page-node-645");
        // The caption under the image
        portfolioCaption = $(".page-node-645 .views-field-field-caption");
        // The specific caption
        thisCaption = $(".views-field-field-caption");
        // The caption expand trigger
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

        

        // Slide back to first slide after the page is loaded.
        // This resolves conflicts between and swiper.js slider and the jcarousel pager generating thumbnails.
        $(".jcarousel-item-1").trigger("click");

        pagerOffset = 50;

        if ($(window).width() < 769) {
            $(".views-field-field-portfolio-image ul").height($(window).width()/2);
            if (!$(".section-portfolio-page .views-slideshow-controls-bottom").hasClass("collapsed")) {
                $(".section-portfolio-page .views-slideshow-controls-bottom").css("top", ($(window).width()/2)+pagerOffset+"px").animate('linear', 5000);
            } else {
                $(".section-portfolio-page .views-slideshow-controls-bottom").css("top", ($(window).width()/2)+pagerOffset+65+"px");
            }
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

        $(".section-portfolio-page .views-slideshow-controls-bottom").prepend('<div class="toggle-carousel">&#x5e;&#x5e;&#x5e;</div>');
        $(".toggle-carousel").click(function(){
            $(".views-slideshow-controls-bottom").toggleClass("collapsed");
        });

    });
   
})(jQuery);