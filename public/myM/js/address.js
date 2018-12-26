$(function(){
    // 发送请求，显示所有收货地址
    $.ajax({
        type: 'get',
        async: false,
        url: "/address/queryAddress",
        success: function(res){
            var html=template("addressTpl",{res: res});
            $("#address-box").html(html);
        }
    });


    // 点击编辑按钮
    var arr=[];
    $("#address-box").on("tap",".edit-btn",function(){
        arr=[];
        // 获取自定义属性
        var editId=$(this).attr("data-id");
        console.log(editId);
        // 发送请求
        $.ajax({
            type: "get",
            url: "/address/queryAddress",
            success: function(res){
                $.each(res,function(index){
                    if(res[index].id==editId){
                        // 将数据本地缓存
                        arr.push(res[index]);
                        // console.log(arr);
                        localStorage.setItem("address",JSON.stringify(arr));
                    }
                });
                // 跳转到编辑页面
                location.href="addAddress.html?id="+editId;
            }
        });
    });

    // 点击删除按钮
    $("#address-box").on("tap",".delete-btn",function(){
        var removeEle=this.parentNode.parentNode;
        // 获取自定义属性
        var deleteId=$(this).attr("data-id");
        mui.confirm("确认要删除吗",function(message){
            if(message.index==1){
                $.ajax({
                    type: "POST",
                    url: "/address/deleteAddress",
                    data: {
                        id:deleteId
                    },
                    success: function(res){
                        if(res.success){
                            // $(removeEle).remove();
                            location.href="address.html";
                        }
                    }
                });
            }
            if(message.index==0){
                // 取消删除，关闭列表划出效果
                mui.swipeoutClose(removeEle);
            }
            
        });
        
    });
});
