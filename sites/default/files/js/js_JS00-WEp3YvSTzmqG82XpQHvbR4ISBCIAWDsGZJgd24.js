  Drupal.settings.osbeeCycleOptions = {
    //'nowrap': true,
    'timeout': 1,
    'speedIn': 600,
    'fastOnEvent': 0,
    'speedOut': 600,
    'end': function(options)  {
      var $slideshow = jQuery(this.$cont).parents('.views-field-field-portfolio-image .item-list');
      if (! $slideshow.find('.resume').length) {
        //$slideshow.append('<div class="resume"></div>');
      }
    }
  };

(function($) {
  Drupal.behaviors.osbeePortfolioPager = {
    attach: function(context, settings) {
      if ($('body').hasClass('section-portfolio-page')) {
        $('.views_slideshow_jcarousel_pager_item').mouseenter(function() {
       //   $(this).click();
        });

        $('.views-field-field-portfolio-image ul').cycle(Drupal.settings.osbeeCycleOptions);
        $('.views-field-field-portfolio-image .resume').live('click', function() {
          $(this).fadeOut(function() {
            $(this).remove();
          }).parent().find('ul').cycle(Drupal.settings.osbeeCycleOptions);
        });

        $('.views_slideshow_jcarousel_pager img').attr('title', '');
      }
    }

  };

  Drupal.behaviors.osbeeOurProcessGallery = {
    attach: function(context, settings) {
      $images = $('.field-name-field-small-image-gallery img');
      $menuItems = $('#node-20 .menu-block-wrapper ul.menu li');
      $(window).bind('load', function() {
        $images.each(function(index, el) {
          window.setTimeout(function() {
            $menuItems.eq(index).hide().css('visibility', 'visible').fadeIn('fast');
            $(el).hide().css('visibility', 'visible').fadeTo('fast', 0.5)
                 .data('image-index', index);
          }, (index + 1) * 500);
        });
      });
      $images.hover(function() {
        var $this = $(this),
            index = $this.data('image-index');
        $this.stop().fadeTo('fast', 1);
        var $selectedItem = $menuItems.eq(index).find('a').addClass('hover');
        console.log($selectedItem);
      }, function() {
        var $this = $(this),
            index = $this.data('image-index');
        $this.stop().fadeTo('fast', 0.5);
        $menuItems.eq(index).find('a').removeClass('hover');
      })
      .click(function() {
        var $this = $(this),
            index = $this.data('image-index');
        document.location = $menuItems.eq(index).find('a').attr('href');
      });
      $menuItems.hover(function(e) {
        var $this = $(this),
            index = $this.index('#node-20 .menu-block-wrapper ul.menu li');
        $images.eq(index).stop().fadeTo('fast', 1);
      }, function(e) {
        var $this = $(this),
            index = $this.index('#node-20 .menu-block-wrapper ul.menu li');
        $images.eq(index).stop().fadeTo('fast', 0.5);
      });

    }
  };

  Drupal.behaviors.osbeeFooterSocial = {
    attach: function(context, settings) {
      var $footerBlock = $('#block-osbee-custom-social-footer .block-content');
      if ($footerBlock.length > 0) {
        $footerBlock.cycle({'fx' : 'scrollUp'});
      }
    }
  };

  Drupal.behaviors.osbeeSwipebox = {
    attach: function(context, settings) {
      var $swipeBox = $('.swipebox');
      if ($swipeBox.length > 0) {
        $('.swipebox').swipebox();
      }
    }
  };

  Drupal.behaviors.careersPage = {
    attach: function(context, settings) {

      var $ajaxLinks = $('body.page-careers-open-positions .ajax-link');
      if($ajaxLinks.length > 0) {
        Drupal.settings['modal-popup-medium'].modalSize.height = 605;
        // $ajaxLinks.on('click', function(e) {
        //   var $link = $(this);
        //   $ajaxLinks.removeClass('ajax-link-processed').removeClass('active');
        //   $link.addClass('ajax-link-processed').addClass('active');
        //   $('#career-box').load($link.attr('href') + ' #main-content ');
        //   return true;
        // });

        $ajaxLinks.first().trigger('click');

        var positionName = '';

        if ($('.ajax-link.active').length) {
          positionName = $('.ajax-link.active').text();
        }
        else {
          positionName = $('h1.page-title').text();
        }

        $('#edit-submitted-position').val(positionName).attr('readonly', true).addClass('disabled');
      }


    }
  };

  Drupal.behaviors.testimonials = {
    attach: function(context, settings) {
      var $links = $('.view-id-testimonials.view-display-id-attachment_1 .views-row .field-content'),
          $testimonials = $('.view-id-testimonials .node');
      $links.on('click', function(e) {
        var index = $links.index(this),
            $thisTestimonial = $testimonials.eq(index);
            console.log(index);
        $links.removeClass('active');
        $(this).addClass('active');
        $testimonials.not($thisTestimonial).hide();
        $thisTestimonial.fadeIn('fast');
      });
      $links.first().trigger('click');
    }
  };


  Drupal.behaviors.teamPage = {
    attach: function(context, settings) {
      var $groupLinks = $('.view-group__title');
      var $groupContent = $groupLinks.siblings('.view-group__content');
      var $groupTargets = $('.profile--container--anchors .view-group');
      var $profileImageLinks = $('.profile--anchor > .profile__image > .profile__link');
      var $profileTextLinks = $('.profile--anchor > .profile__link');
      var $profiles = $('.profile');

      var urlParam = window.location.hash;

      if ($profileImageLinks.length > 0) {
        $groupLinks.on('click', function(e) {
          var $currentLink = $(this);
          var $currentContent = $currentLink.siblings('.view-group__content');
          var $currentTarget = $($currentLink.attr('href'));

          e.preventDefault();

          //set current link as active
          $groupLinks.not($currentLink).removeClass('active');
          $currentLink.addClass('active');

          //set current content as active
          $groupContent.not($currentContent).removeClass('active');
          $currentContent.addClass('active');

          //set appropriate group of images anchors as active
          $groupTargets.not($currentTarget).removeClass('active');
          $currentTarget.addClass('active');

          //set first profile in the group as active in both containers
          $profiles.removeClass('active');
          $currentContent.find('.views-row-first .profile').addClass('active');
          $currentTarget.find('.views-row-first > .profile__link').trigger('click');
        });

        $profileImageLinks.add($profileTextLinks).on('click', function(e) {
          var $currentImageLink = $(this);
          var $currentTextLink = $(this);
          var $currentTarget = $($currentImageLink.attr('href'));

          e.preventDefault();

          //set image & text links accordingly, based on which link is clicked
          if (!$currentImageLink.parent().hasClass('profile__image')) {
            $currentImageLink = $currentTextLink.siblings('.profile__image').find('.profile__link');
          }
          else {
            $currentTextLink = $currentImageLink.parent().siblings('.profile__link');
          }

          //set classes on links
          $profileImageLinks.not($currentImageLink).removeClass('active');
          $profileTextLinks.not($currentTextLink).removeClass('active');
          $currentImageLink.addClass('active');
          $currentTextLink.addClass('active');

          //render the selected profile
          $profiles.not($currentTarget).removeClass('active');
          $currentTarget.addClass('active');
        });
      }

      $(document).ready(function() {
            if ($profileImageLinks.length > 0) {
              if (typeof urlParam !== 'undefined') {
                var $currentLink = $groupLinks.filter(function() {
                  return (urlParam == $(this).attr('href'));
                });

                if ($currentLink.length > 0) {
                  $currentLink.trigger('click');
                }
                //show first group
                else {
                  $groupLinks.eq(0).trigger('click');
                }
              }
              //show first group
              else {
                $groupLinks.eq(0).trigger('click');
              }
            }
      });

    }
  };

})(jQuery);;
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
})(jQuery);;
(function($){
    $(document).ready(function(){
        //Drawer Menu
        menuToggle = $(".toggle-menu");
        drawer = $("#drawer-menu");
        page = $("#page");
        overlay = $('#drawer-menu-overlay');
        
        drawer.toggleClass("off-screen")
        overlay.hide();
        $(".toggle-menu .toggle-close").hide();

        menuToggle.click(function(){
            if (drawer.hasClass("off-screen")) {
                setTimeout(function(){drawer.toggleClass("on-screen")},100);
                overlay.show();
                $(".toggle-open").hide();
                $(".toggle-close").show();
                drawer.toggleClass("off-screen");
            } else {
                drawer.toggleClass("on-screen");
                overlay.hide();
                $(".toggle-open").show();
                $(".toggle-close").hide();
                drawer.toggleClass("off-screen");
            }
            
        });
    });
})(jQuery);;
(function($){

    $(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            jQuery('#back-to-top').fadeIn(200);
        } else {
            jQuery('#back-to-top').fadeOut(200);
        }
    });

    $(document).ready(function(){
        $('#back-to-top').hide();
        $('#back-to-top').click(function(event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: 0}, 300);
            return false;    
        });

    });
})(jQuery);;
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


        if ($(window).width() < 769) {
            $(".views-field-field-portfolio-image ul").height($(window).width()/2);
        } else {
            $(".views-field-field-portfolio-image ul").height(326);
        }

        $(window).resize(function(){
            if ($(window).width() < 769) {
                var top = $(window).width()/2;
                $(".views-field-field-portfolio-image ul").height($(window).width()/2); 
            } else {
                $(".views-field-field-portfolio-image ul").height(326);
            }
        });



    });


      
})(jQuery);;
(function($){
    $(document).ready(function(){
        // Move main content on main services page
        
        $(".menu-block-1 .active span").after('<ul class="menu menu-subcat"><li><div id="active-content" class="responsive-narrow-body"></div></li></ul>');
        if (!document.getElementById("active-content")) {
            $(".field-type-image").after('<div class="under-main-image responsive-narrow-body"></div>');
        }
        $(".menu-block-1 li span").after('<span class="fa subcat-expand">&#x33;</span>');
        $(".menu-block-1 .active .subcat-expand").html("&#x32;");


        var pageContent = $(".narrow-body");
        var pageImage = $(".field-name-field-image");
        var responsiveContent = $(".responsive-narrow-body");

        pageContent.clone().appendTo('.responsive-narrow-body');
        pageImage.clone().prependTo('.responsive-narrow-body');

        // Toggle between responsive and desktop content
        if ($(window).width() < 769 ){
            pageContent.hide();
            pageImage.hide();
            responsiveContent.show();
        } else {
            pageContent.show();
            pageImage.show();
            responsiveContent.hide();
        }
        
        $(window).resize(function(){
            if ($(window).width() < 769 ){
                pageContent.hide();
                pageImage.hide();
                responsiveContent.show();
            } else {
                pageContent.show();
                pageImage.show();
                responsiveContent.hide();
            }
        });

        // Scroll to active menu item
        var container = $("html,body");
        var scrollTo = $(".menu-block-1 .active-trail:visible:first");
        //var scrollTo = $("#node-page-full-group-prev-next");

        if (scrollTo.offset() !== null) { 
            container.animate({ scrollTop: scrollTo.offset().top},'1200');
        }

        

    });
})(jQuery);;
(function($){
    $(document).ready(function(){
        /*
        if ($(".views_slideshow_main").length > 0) {
            $("body").prepend('<div class="swipe-icon-overlay"><img class="swipe-icon" src="/sites/all/themes/osbee/images/swipe.png" /></div>');
        }
        //$(".swipe-icon-overlay").detach().prependTo("body");
        //$(".swipe-icon-overlay").fadeOut(12000);

        // Hide the icon if clicked or swiped
        $(".swipe-icon-overlay").click(function(){
            $(this).css("display", "none");
        });
        $(".swipe-icon-overlay").bind('touchstart mousedown', function(e){
            $(this).css("display", "none");
        });*/
    });
})(jQuery);;
(function($){
    $(document).ready(function(){

    });

    $(document).on('swipeleft','body',function() {
          $('#node-page-full-group-prev-next .field-name-field-prev-page a').trigger('click');
    })
    .on('swiperight','body',function() {
          $('#node-page-full-group-prev-next .field-name-field-next-page a').trigger('click');
    });
})(jQuery);;
