// 用于储存查询到的用户的信息
var userInfo=null;
// 发送请求
$.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    async: false,       //同步，此次请求不执行完，后面都不执行
    success: function(res){
        if(res.error && res.error==400){
            mui.toast("用户未登录");
            location.href="login.html";
        }
        // 将查询到的数据记录
        userInfo=res;
    }
});
var html=template("userHeader",userInfo);
$(".headPic").html(html);


$(function(){
    // 点击退出登陆，返回首页
    $(".loginout").on("tap",function(){
        $.ajax({
            type: "get",
            url: "/user/logout",
            success: function(res){
                if(res.success){
                    mui.toast("退出登录成功");
					setTimeout(function(){
						location.href = "index.html";
					},2000);
                }
            }
        }); 
    });
});