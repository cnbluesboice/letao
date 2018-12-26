// 1.进入页面先验证是否登录
$.ajax({
    type: "GET",
    url: "/employee/checkRootLogin",
    async: false,
    success: function(res){
        if(res.error && res.error==400){
            location.href="login.html";
        }
    }
});

$(function(){
    // 2.点击退出登录
    $("#loginOut").on("click",function(){
        console.log("退出");
        $.ajax({
            type: "GET",
            url: "/employee/employeeLogout",
            success: function(res){
                if(res.success){
                    location.href="login.html";
                }
            }
        });
    });

    // 点击图标，隐藏导航
    $(".navbar-brand").on("click",function(){
        $(".left").toggle();
        $(".main").toggleClass("menu");
    });
    // 导航栏点击
    $(".navs li").on("click",function(){
        $(this).find("ul").slideToggle();
    });
});

