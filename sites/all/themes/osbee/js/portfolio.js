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

        // Make Portfolio Link Active
        $(".section-portfolio #mobile-navigation ul li a.portfolio").parent().addClass('active-trail').addClass('active').addClass('active-page');


        //portfolioCaption.after('<div class="caption-expand">i</div>');
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

            // Resize portfolio image heights
            $('.section-portfolio-page .views-slideshow-controls-bottom .views_slideshow_jcarousel_pager_item .views-field-field-portfolio-image').css("height", ($(window).width()*.29)+1+"px");

            // Position arrows in middle of portfolio image 
            $(".section-portfolio-page #page .views_slideshow_controls_text_next").css("top", ($(window).width()*.125)+"px");
            $(".section-portfolio-page #page .views_slideshow_controls_text_previous").css("top", ($(window).width()*.125)+"px");
        } else {
            $(".views-field-field-portfolio-image ul").height(326);
            // Resize portfolio image heights
            $('.section-portfolio-page .views-slideshow-controls-bottom .views_slideshow_jcarousel_pager_item .views-field-field-portfolio-image').css("height", "72px");
        
            // Position arrows in middle of portfolio image 
            $(".section-portfolio-page #page .views_slideshow_controls_text_next").css("top", "110px");
            $(".section-portfolio-page #page .views_slideshow_controls_text_previous").css("top", "110px");

        }

        $(window).resize(function(){
            if ($(window).width() < 769) {
                var top = $(window).width()/2;
                $(".views-field-field-portfolio-image ul").height($(window).width()/2); 
                $(".section-portfolio-page .views-slideshow-controls-bottom").css("top", ($(window).width()/2)+pagerOffset+"px");
            
                 // Resize portfolio image heights
                $('.section-portfolio-page .views-slideshow-controls-bottom .views_slideshow_jcarousel_pager_item .views-field-field-portfolio-image').css("height", ($(window).width()*.29)+1+"px");
            
                // Position arrows in middle of portfolio image 
                $(".section-portfolio-page #page .views_slideshow_controls_text_next").css("top", ($(window).width()*.125)+"px");
                $(".section-portfolio-page #page .views_slideshow_controls_text_previous").css("top", ($(window).width()*.125)+"px");
            } else {
                $(".views-field-field-portfolio-image ul").height(326);
                $('.section-portfolio-page .views-slideshow-controls-bottom .views_slideshow_jcarousel_pager_item .views-field-field-portfolio-image').css("height", "72px");

                // Position arrows in middle of portfolio image 
                $(".section-portfolio-page #page .views_slideshow_controls_text_next").css("top", "110px");
                $(".section-portfolio-page #page .views_slideshow_controls_text_previous").css("top", "110px");

            }
        });

        $(".section-portfolio-page #page .views-slideshow-controls-bottom").scroll(function() {

            if ($(this).scrollTop() > 50 )
             {
                $("#main-content .field-name-field-portfolio-type").css("z-index", "25");
                $("#page #main-content .prose h1.term-name").css("z-index", "25");
             } else if ($(this).scrollTop() < 50 ) {
                $("#main-content .field-name-field-portfolio-type").css("z-index", "95");
                $("#page #main-content .prose h1.term-name").css("z-index", "95");
             }

         });

        $(".views-slideshow-controls-bottom").addClass("collapsed");
        $(".section-portfolio-page .views-slideshow-controls-bottom").before('<div class="toggle-carousel icon icon-icon-portfolio-carousel-base3-multipler1"></div>');
        $(".toggle-carousel").click(function(){
            $(".views-slideshow-controls-bottom").toggleClass("collapsed");
            $(this).toggleClass("icon-icon-portfolio-carousel-base3-multipler1");
            $(this).toggleClass("icon-icon-portfolio-carousel-base3-single");
            if ($(".views-slideshow-controls-bottom").hasClass("collapsed")) {
                $("body").css("overflow", "visible");
                $("#main-content .field-name-field-portfolio-type").css("z-index", "25");
                $("#page #main-content .prose h1.term-name").css("z-index", "25");
                
            } else {
                if ($(window).width() < $(window).height()) {
                    // Scroll to active menu item
                    var container = $("html,body");
                    var scrollTo = $("#main-content");
                    //var scrollTo = $("#node-page-full-group-prev-next");

                    if (scrollTo.offset() !== null) { 
                        container.animate({ scrollTop: scrollTo.offset().top},'1200');
                    }
                }
                $("body").css("overflow", "hidden");
                $("#main-content .field-name-field-portfolio-type").css("z-index", "95").css("position", "relative");
                $("#page #main-content .prose h1.term-name").css("z-index", "95").css("position", "relative");
            }
        });

        $(".section-portfolio-page .views-content-field-portfolio-image").click(function(){
            $(".views-slideshow-controls-bottom").toggleClass("collapsed");
            $(".toggle-carousel").toggleClass("icon-icon-portfolio-carousel-base3-multipler1");
            $(".toggle-carousel").toggleClass("icon-icon-portfolio-carousel-base3-single");
        });
        
        //Scroll to top of portfolio slideshow in landscape.
        $(window).on("load resize", function(){
            var scrolled = false;
            if ($(window).width() > $(window).height()) {
                // Scroll to active menu item
                var container = $("html,body");
                var scrollTo = $("#views_slideshow_swiper_main_portfolio_individual_items-block_1");
                
                if (!scrolled) {
                    if ($(this).scrollTop() < 10) {
                        setTimeout(function(){ 
                            container.animate({ scrollTop: scrollTo.offset().top},'1200');
                        }, 2000);
                    }
                    scrolled = true;
                }

            } else {
                container.animate({});
            } 
        });
        /*if (!portrait.matches) {
            // Scroll to active menu item
            var container = $("html,body");
            var scrollTo = $("#views_slideshow_swiper_main_portfolio_individual_items-block_1");
            setInterval(function(){ 
                 if (scrollTo.offset() == null) {
                    if ($(this).scrollTop() < 100) {
                        container.animate({ scrollTop: scrollTo.offset().top},'1200');
                    }
                }
            }, 3000);
        }*/




    });
   
})(jQuery);