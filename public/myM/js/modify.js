$(function(){
    // 点击获取验证码
    $("#getCode").on("tap",function(){
        $.ajax({
            type: "get",
            url: "/user/vCodeForUpdatePassword",
            success: function(res){
                console.log(res.vCode);
            }
        });
    });

    // 点击更改密码按钮
    $("#register-btn").on("tap",function(){
        var oldCode=$.trim($("input[name='oldCode']").val());
        var newCode=$.trim($("input[name='newCode']").val());
        var reCode=$.trim($("input[name='reCode']").val());
        var vCode=$.trim($("input[name='vCode']").val());
        // var data=$(".mui-input-group").serialize();
        $.ajax({
            type: "post",
            url: "/user/updatePassword",
            data:{
                oldPassword:oldCode,
                newPassword:newCode,
                vCode:vCode
            },
            success: function(res){
                console.log(res);
                if(res.success==true){
                    mui.toast("修改密码成功");
                    setTimeout(() => {
                        location.href="login.html";                        
                    }, 1000);
                }
            }
        });
    });
});