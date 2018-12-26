$(function(){
    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        success:function(res){
            var html=template("leftTemplate",{data:res.rows});
            $("#links").html(html); 
            if(res.rows.length>0){
                var id=res.rows[0].id;
                // 发送ajax请求，让页面默认显示第一个
                getData(id);
            }  
        }
    });

    // 绑定左侧点击事件
    $("#links").on("click","a",function(){
        // 获取每个a标签的自定义属性
        var dataId=$(this).attr("data-id");
        getData(dataId);
        $(this).addClass("active").siblings().removeClass("active");
    });
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
});
function getData(id){
    $.ajax({
        url:"/category/querySecondCategory",
        type:"get",
        data:{
            id:id
        }, 
        success: function(res){
            // if(res.rows.length>0){
                var html=template("rightTemplate",{data:res.rows});
                $("#rightProduct").html(html);
            // } 
        }
    });
}