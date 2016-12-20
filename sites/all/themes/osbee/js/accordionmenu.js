(function($){
    $(document).ready(function(){
        
        ///////////////////////////
        // Mobile Accordion Menu //
        ///////////////////////////

        // Add the menu-subcat class to the mobile menu elements with children
        $('#mobile-navigation ul.menu li ul').addClass('menu-subcat');
        // Add the subcategory toggle element
        $('#mobile-navigation .menu-subcat').prev('a').after('<span class="fa subcat-expand">&#x33;</span>');
        // Change the toggle element icon for active elements - if a child page is currently open
        $('#mobile-navigation li.active-trail > .subcat-expand').html("&#x32;");
        // Only toggle the highlighting on the first element in an active trail
        $('#mobile-navigation li.active-trail:first').toggleClass('active');
        // Make the parent li of an active link active
        $('#mobile-navigation li.active-trail a.active').parent().addClass('active');
        // Highlight the first active-trail item.
        $("#mobile-navigation li.active-trail").first().addClass("first-active");

        $('#mobile-navigation .subcat-expand').click(function(){
            // Open/Close Menu Item
            if (!$(this).parent().hasClass('active')) {
                // Close any open menu items if clicking a closed menu item
               $(this).parent().parent().find("li").each(function(){
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                        $(this).find(".subcat-expand").html("&#x33;");
                    }
                });
                $("#mobile-navigation .first-active").removeClass("active-trail");
                
                // Open the new menu item
                $(this).parent().addClass('active');

                if ($(this).parent().hasClass('active-trail')) {
                    $(this).parent().removeClass('active').removeClass('active-trail').addClass('persistant-trail');
                }
                
                $(this).find('a.active-trail').parent().addClass('active-trail');


            } else {
                // Only close the current menu item
                $(this).parent().removeClass('active');
            }

            $('#mobile-navigation a.active').parent().addClass('active');

            if ($(this).parent().hasClass('active')) {
                $(this).html("&#x32;");
            } else {
                $(this).html("&#x33;");
            }
        });



        ///////////////////////////
        // INPAGE ACCORDION MENU //
        ///////////////////////////

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




        //////////////////////////////
        // TEAM PAGE ACCORDION MENU //
        //////////////////////////////
        
        $('.section-about-us .profile').each(function(){
            $(".profile__image", this).before($(".profile__header-links", this));
        });

        $('.section-about-us .view-group__title').after('<span class="subcat-expand">&#x33;</span>');
        $('.section-about-us .profile__header-links').append('<span class="profile-expand">&#x33;</span>');


        // Toggle profile group headers
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



        // Toggle Individual profiles =================
        // Add expanded class to all of the 1st profiles in each profile group.
        // 
        // Toggle profile group headers
        $('.section-about-us #block-views-profiles-block .profile-expand').click(function(){
            //$(this).parent().toggleClass('expanded');
            // Open/Close Menu Itemw
            if (!$(this).parent().parent().hasClass('expanded')) {
                // Close any open menu items if clicking a closed menu item
                $(".section-about-us .profile").each(function(){
                    if ($(this).hasClass('expanded')) {
                        $(this).removeClass('expanded');
                        $(this).find(".profile-expand").html("&#x33;");
                    }
                });                
                // Open the new menu item
                $(this).parent().parent().addClass('expanded', 400, 'easeOutQuart');
            } else {
                // Only close the current menu item
                $(this).parent().parent().removeClass('expanded');
            }

            if ($(this).parent().parent().hasClass('expanded')) {
                $(this).html("&#x32;");
            } else {
                $(this).html("&#x33;");
            }

        });

        // Expand the first profile in each group
        $('.section-about-us .view-group').each(function(){
            if ($(".expanded") > 0){

            } else {
                $(".profile", this).eq(0).addClass('expanded');
            }
        });

        $(".section-about-us .subcat-expand").eq(0).trigger('click');

    });
})(jQuery);