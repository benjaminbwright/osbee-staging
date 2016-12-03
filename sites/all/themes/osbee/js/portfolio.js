(function($){
    $(document).ready(function(){
        page = $(".page-node-645");
        portfolioCaption = $(".views-field-field-caption");
        thisCaption = $(".views-field-field-caption");
        captionExpand = $(".caption-expand");

        portfolioCaption.after('<div class="caption-expand">i</div>');
        $(".caption-expand").click(function(){
            $(this).prev().toggleClass('caption-expanded');
        });
    });
})(jQuery);