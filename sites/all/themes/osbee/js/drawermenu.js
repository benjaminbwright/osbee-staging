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
                $(".toggle-open", this).hide();
                $(".toggle-close", this).show();

            } else {
                drawer.toggleClass("on-screen");
                overlay.hide();
                $(".toggle-open", this).show();
                $(".toggle-close", this).hide();
            }
            drawer.toggleClass("off-screen");
        });
    });
})(jQuery);