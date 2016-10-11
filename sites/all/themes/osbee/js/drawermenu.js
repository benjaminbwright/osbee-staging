(function($){
    $(document).ready(function(){
        //Drawer Menu
        menuToggle = $(".toggle-menu");
        drawer = $("#drawer-menu");
        page = $(".not-front");
        overlay = $('#drawer-menu-overlay');
        
        overlay.hide();
        $(".toggle-menu .toggle-close").hide();

        menuToggle.click(function(){
            if (page.hasClass("off-screen")) {
                setTimeout(function(){drawer.toggleClass("on-screen")},100);
                overlay.hide();
                $(".toggle-open", this).show();
                $(".toggle-close", this).hide();

            } else {
                drawer.toggleClass("on-screen");
                overlay.show();
                $(".toggle-open", this).hide();
                $(".toggle-close", this).show();
            }
            page.toggleClass("off-screen");
        });
    });
})(jQuery);