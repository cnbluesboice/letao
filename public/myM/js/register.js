$(function(){
    
    $("#register-btn").on("tap",function(){
        // 验证用户输入
        if(!$.trim($("[name='username']").val())){
            mui.toast("请输入用户名！");
            return;
        }
        if(!$.trim($("[name='mobile']").val())){
            mui.toast("请输入手机号！");
            return;
        }
        if(!$.trim($("[name='password']").val())){
            mui.toast("请输入密码！");
            return;
        }
        if(!$.trim($("[name='againPass']").val())){
            mui.toast("请确认密码！");
            return;
        }
        if(!$.trim($("[name='vCode']").val())){
            mui.toast("请验证码！");
            return;
        }

        // 获取表单值
        var data=$(".mui-input-group").serialize();
        console.log(data);
        $.ajax({
            type:"post",
            url: "/user/register",
            data: data,
            success: function(res){
                console.log(res);
                if(res.success){
                    mui.toast("注册成功！");
                    setTimeout(() => {
                        location.href="login.html";
                    }, 1000);
                    
                }
            }
        });
    });
    // 获取验证码
    $("#getCode").on("tap",function(){
        $.ajax({
            type: "get",
            url: "/user/vCode",
            success: function(res){
                console.log(res.vCode);
            }
        });
    });
});