$(function(){
    // 1.获取用户输入的值
    // 2.验证用户输入的表单
    // 3.发送请求
    // 4.登录成功跳转
  
    $("#loginBtn").on("click",function(){
         // 1.获取用户输入的值
        var username=$.trim($("#username").val());
        var password=$.trim($("#password").val());
        // 2.验证用户输入的表单
        if(!username){
            alert("请输入用户名！");
            return;
        }
        if(!password){
            alert("请输入密码！");
            return;
        }
        // 3.发送请求
        $.ajax({
            type: "POST",
            url: "/employee/employeeLogin",
            data: {
                username:username,
                password:password
            },
            success: function(res){
                if(res.success){
                    location.href="user.html";
                }else{
                    alert(res.message);
                }
            }
        });
    });

   
});