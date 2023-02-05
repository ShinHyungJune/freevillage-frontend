$(document).ready(function(){
    $(".sidebar .menu").click(function(){
        let isActive = $(this).hasClass("active");

        $(".sidebar .menu").removeClass("active");

        if(isActive)
            return $(this).removeClass("active");

        return $(this).addClass("active");
    });

    $(".m-script-pop").click(function(){
        $(this).toggleClass("active");
        $($(this).attr("data-target")).toggleClass("active");
    });

    $(".m-script-tab").click(function(){
        $(this).parents(".m-tabs").find(".m-tab").removeClass("active");
        $(this).addClass("active");

        $($(this).attr("data-target")).find(".m-tabs-content").removeClass("active");
        $($(this).attr("data-target")).find(".m-tabs-content").eq($(this).index()).addClass("active");

    });
});
