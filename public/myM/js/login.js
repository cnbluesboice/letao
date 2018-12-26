$(function(){
    // 点击免费注册到注册界面
    $(".freeRegister").on("tap",function(){
        location.href="register.html";
    });

    // 获取用户输入的密码和用户名
    $(".loginBtn").on("tap",function(){
        // 判断用户输入
        var username=$.trim($("[name='username']").val());;
        var password=$.trim($("[name='password']").val());;
        if(!username){
            mui.toast("请输入用户名");
			return;
        }
        if(!password){
            mui.toast("请输入密码");
			return;
        }
        var user=$(".mui-input-group").serialize();
        $.ajax({
            type: "post",
            url: "/user/login",
            data: user,
            beforeSend: function(){
                $(".loginBtn").html("正在登陆...");
            },
            success: function(res){
                mui.toast("登录成功");
                setTimeout(() => {
                    $(".loginBtn").html("登陆");
                    // 跳转到会员中心
                    location.href="user.html";
                }, 2000);
            }
        });
    })
    
});