$(document).ready(function(){
    $(".m-script-pop").click(function(){
        $($(this).attr("data-target")).toggle();
    });
});
