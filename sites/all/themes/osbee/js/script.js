  Drupal.settings.osbeeCycleOptions = {
    //'nowrap': true,
    'timeout': 0,
    'speedIn': 300,
    'fastOnEvent': 0,
    'speedOut': 300,
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

})(jQuery);