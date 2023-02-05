$(document).ready(function(){
    //헤더 푸터 컴포넌트
    $('#header').load('../components/header.html');

    $('#footer').load('../components/footer.html');

    // tab-nav 토글
    let tabNav = $(".tab-nav");
    let tabBt = $(".tab-bt");
    tabBt.click(function () {
        $(this).siblings("ul").slideToggle();
    })
    // select
    let label = $(".label");
    label.click(function () {
        label.not($(this)).parent(".select-wrap").removeClass("open");
        if ($(this).parent(".select-wrap").hasClass("open")) {
            $(this).parent(".select-wrap").removeClass("open");
        }else{
            $(this).parent(".select-wrap").addClass("open");
        }
    });
    let option = $(".option").find("li");
    option.click(function () {
        let label2 = $(this).parent(".option").siblings(".label").find("span");
        label2.text($(this).html());
        label.parent(".select-wrap").removeClass("open");
    });


})
