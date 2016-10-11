(function($){
    $(document).ready(function(){
        /*$('#mobile-navigation ul.menu li ul').hide();
        $('#mobile-navigation .menu li').click(function(){
            $(this).css('background', 'f0gd0g');
            $('#mobile-navigation ul.menu li ul').show();
        });*/
        $('#mobile-navigation ul.menu li ul').addClass('menu-subcat');
        $('#mobile-navigation .menu-subcat').prev('a').after('<span class="fa subcat-expand">C</span>');
        $('#mobile-navigation .subcat-expand').click(function(){
            $(this).parent().parent().toggleClass('active-menu-item');
            if ($(this).parent().parent().hasClass('active-menu-item')) {
                $(this).html("D");
            } else {
                $(this).html("C");
            }
        });
    });
})(jQuery);