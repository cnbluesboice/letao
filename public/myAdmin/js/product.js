$(function(){
    var page=1;
    var pageSize=3;
    $.ajax({
        type: "GET",
        url: "/product/queryProductDetailList",
        data: {
            page: page,
            pageSize: pageSize
        },
        success: function(res){
            $.ajax({
                type: "GET",
                url: "/product/queryProductDetailList",
                data: {
                    page: page,
                    pageSize: res.total
                },
                success: function(res){
                    var html=template("productTpl",{data:res});
                    $("#productBox").html(html);
                }
            });
        }
    });
});