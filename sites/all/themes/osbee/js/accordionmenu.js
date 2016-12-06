(function($){
    $(document).ready(function(){
        // Add the menu-subcat class to the mobile menu elements with children
        $('#mobile-navigation ul.menu li ul').addClass('menu-subcat');
        // Add the subcategory toggle element
        $('#mobile-navigation .menu-subcat').prev('a').after('<span class="fa subcat-expand">&#x33;</span>');
        // Change the toggle element icon for active elements - if a child page is currently open
        $('#mobile-navigation li.active-trail .subcat-expand').html("&#x32;");
        // Only toggle the highlighting on the first element in an active trail
        $('#mobile-navigation li.active-trail:first').toggleClass('active');
        // Make the parent li of an active link active
        $('#mobile-navigation li.active-trail a.active').parent().toggleClass('active');
        
        $('#mobile-navigation .subcat-expand').click(function(){
            // Open/Close Menu Itemw
            if (!$(this).parent().hasClass('active')) {
                // Close any open menu items if clicking a closed menu item
                $("#mobile-navigation li").each(function(){
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                        $(this).find(".subcat-expand").html("&#x33;");
                    }
                });
                // Open the new menu item
                $(this).parent().addClass('active', 400, 'easeOutQuart');
            } else {
                // Only close the current menu item
                $(this).parent().removeClass('active');
            }

            if ($(this).parent().hasClass('active')) {
                $(this).html("&#x32;");
            } else {
                $(this).html("&#x33;");
            }
        });

        // INPAGE ACCORDION MENU

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


        // TEAM PAGE ACCORDION MENU
        $('.section-about-us .view-group__title').after('<span class="subcat-expand">&#x33;</span>');
        $('.section-about-us #block-views-profiles-block .subcat-expand').click(function(){
            //$(this).parent().toggleClass('expanded');
            // Open/Close Menu Itemw
            if (!$(this).parent().hasClass('expanded')) {
                // Close any open menu items if clicking a closed menu item
                $(".section-about-us .view-group__title").each(function(){
                    if ($(this).parent().hasClass('expanded')) {
                        $(this).parent().removeClass('expanded');
                        $(this).parent().find(".subcat-expand").html("&#x33;");
                    }
                });
                // Open the new menu item
                $(this).parent().addClass('expanded', 400, 'easeOutQuart');
            } else {
                // Only close the current menu item
                $(this).parent().removeClass('expanded');
            }

            if ($(this).parent().hasClass('expanded')) {
                $(this).html("&#x32;");
            } else {
                $(this).html("&#x33;");
            }
        });
    });
})(jQuery);