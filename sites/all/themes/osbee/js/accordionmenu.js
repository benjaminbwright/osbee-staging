(function($){
    $(document).ready(function(){
        
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

        $('#main-content ul.menu li ul').addClass('menu-subcat');
        $('#main-content .menu-subcat').prev('a').after('<span class="fa subcat-expand">C</span>');
        $('#main-content .subcat-expand').click(function(){
            $(this).parent().parent().toggleClass('active-menu-item');
            if ($(this).parent().parent().hasClass('active-menu-item')) {
                $(this).html("D");
            } else {
                $(this).html("C");
            }
        });

    });
})(jQuery);