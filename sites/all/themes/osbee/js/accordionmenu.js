(function($){
    $(document).ready(function(){
        $('#mobile-navigation ul.menu li ul').addClass('menu-subcat');
        $('#mobile-navigation .menu-subcat').prev('a').after('<span class="fa subcat-expand">&#x33;</span>');
        $('#mobile-navigation li.active-trail .subcat-expand').html("&#x32;");
        $('#mobile-navigation li.active-trail:first').toggleClass('active');
        $('#mobile-navigation li.active-trail a.active').parent().toggleClass('active');
        $('#mobile-navigation .subcat-expand').click(function(){
            if (!$(this).parent().hasClass('active')) {
                $("#mobile-navigation li").each(function(){
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                        $(this).find(".subcat-expand").html("&#x33;");
                    }
                });
                $(this).parent().addClass('active');
            } else {
                $(this).parent().removeClass('active');
            }

            if ($(this).parent().hasClass('active')) {
                $(this).html("&#x32;");
            } else {
                $(this).html("&#x33;");
            }
        });

        $('#main-content ul.menu li ul').addClass('menu-subcat');
        $('#main-content .menu-subcat').prev('a').after('<span class="fa subcat-expand">&#x33;</span>');
        $('#main-content .subcat-expand').click(function(){
            $(this).parent().parent().toggleClass('active-menu-item');
            if ($(this).parent().parent().hasClass('active-menu-item')) {
                $(this).html("&#x32;");
            } else {
                $(this).html("&#x33;");
            }
        });

    });
})(jQuery);