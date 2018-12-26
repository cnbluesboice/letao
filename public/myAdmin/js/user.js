$(function(){
    // 进入页面渲染
    var page=1;
    $.ajax({
        type: "get",
        url: "/user/queryUser",
        data: {
            page: 1,
            pageSize: 1
        },
        success: function(res){
            if(res.rows.length>0){
                $.ajax({
                    type: "get",
                    url: "/user/queryUser",
                    data: {
                        page: 1,
                        pageSize: res.total
                    },
                    success: function(res){
                        if(res.rows.length>0){
                            var html=template("userTpl",res);
                            $("#userBox").html(html);
                            /* 分页渲染 */
                            setPaginator(page,Math.ceil(res.total/res.size));
                        }
                    }
                });
            }
        }
    });

    // 点击按钮切换禁用和启用
    $("#userBox").on("click","#deleteBtn", function(){
        var id=$("#deleteBtn").attr("data-id");
        var isDelete=parseInt($("#deleteBtn").attr("data-isDelete"));
        $.ajax({
            type: "POST",
            url: "/user/updateUser",
            data: {
                id: id,
                isDelete: isDelete ? 0 : 1
            },
            success: function(res){
                if(res.success){
                    location.reload();
                }
            }
        });
    });

    // 分页函数封装
    var setPaginator = function(pageCurr, pageSum, callback) {
        // $(".pagination") bootstrap是3.0使用 ul , 2.0使用div
        $(".pagination").bootstrapPaginator({
            bootstrapMajorVersion: 3,
            size: "small",
            currentPage: pageCurr, //当前页数
            totalPages: pageSum, //总页数 注意不是总条数
            onPageClicked: function(event, originalEvent, type, page) {
                currentPage = page;
                console.log(currentPage); /*重置当前页*/
                callback && callback();
                // 发送请求
                // $.ajax({
                //     type: "get",
                //     url: "/user/queryUser",
                //     data: {
                //         page: 1,
                //         pageSize: res.total
                //     },
                //     success: function(res){
                //         if(res.rows.length>0){
                //             var html=template("userTpl",res);
                //             $("#userBox").html(html);
                //             /* 分页渲染 */
                //             setPaginator(page,Math.ceil(res.total/res.size));
                //         }
                //     }
                // });
            }
        });
    }
    
});