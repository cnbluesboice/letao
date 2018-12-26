$(function(){
    var id=getParamsUrl(location.href,"id");
    $.ajax({
        type: "GET",
        url: "/product/queryProductDetail",
        data:{
            id: id
        },
        success: function(res){
            console.log(res);
        }
    });
});