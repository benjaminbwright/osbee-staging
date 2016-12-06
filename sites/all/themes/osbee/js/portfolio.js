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


        //Pull caption from the active slide and place it under the Page heading.
       /*$(document).bind('DOMSubtreeModified', function() { 
           $(".swiper-slide-active .views-field-field-caption").detach(); //.after($(".field-name-field-portfolio-type .term-name"));
        }*/
        //$(".field-name-field-portfolio-type .term-name").detach().appendTo($(".swiper-slide-active .views-field-field-caption"));


    });


      
})(jQuery);