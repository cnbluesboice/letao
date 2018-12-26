$(function(){
    var id=getParamsUrl(location.href,"id");
    // id=0表示新增收货地址
    if(id==0){
        $(".mui-btn").on("tap",function(){
            var username=$("input[name='username']").val()
            var postCode=$("input[name='postCode']").val();
            var city=$("input[name='city']").val();
            var detail=$("input[name='detail']").val();
            $.ajax({
                type: "POST",
                url: "/address/addAddress",
                data: {
                    recipients:username,
                    postcode:postCode,
                    address:city,
                    addressDetail:detail
                },
                success: function(res){
                    console.log(res);
                    if(res.success){
                        location.href="address.html";
                    }
                }
            });
        });
    }else{
        // 进入页面渲染
        var arr=JSON.parse(localStorage.getItem("address"));
        var username=$("input[name='username']").val(arr[0].recipients);
        var postCode=$("input[name='postCode']").val(arr[0].postCode);
        var city=$("input[name='city']").val(arr[0].address);
        var detail=$("input[name='detail']").val(arr[0].addressDetail);

        // 修改页面标题
        $("title").html("编辑收货地址");
        $(".mui-title").html("编辑收货地址");

        // 点击确认发送请求
        $(".mui-btn").on("tap",function(){
            username=$("input[name='username']").val()
            postCode=$("input[name='postCode']").val();
            city=$("input[name='city']").val();
            detail=$("input[name='detail']").val();
            $.ajax({
                type: "POST",
                url: "/address/updateAddress",
                data: {
                    id: id,
                    recipients:username,
                    postcode:postCode,
                    address:city,
                    addressDetail:detail
                },
                success: function(res){
                    if(res.error&& res.error==400){
                        location.href="login.html";
                    }else{
                        location.href="address.html";
                    }
                }
            });
        });
    }

    // mui实现地址的三级联动
    var picker = new mui.PopPicker({layer: 3});
    picker.setData(cityData);
    // 给input绑定点击事件
    $("#selectCity").on("tap",function(){
        picker.show(function(SelectedItem) {
            $("#selectCity").val(SelectedItem[0].text + SelectedItem[1].text + SelectedItem[2].text);
        })
    });
    
});