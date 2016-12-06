(function($){
    $(document).ready(function(){

    });

    $(document).on('swipeleft','body',function() {
          $('#node-page-full-group-prev-next .field-name-field-prev-page a').trigger('click');
    })
    .on('swiperight','body',function() {
          $('#node-page-full-group-prev-next .field-name-field-next-page a').trigger('click');
    });
})(jQuery);