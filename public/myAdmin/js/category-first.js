$(function(){
    // 发送请求，得到数据渲染页面
    var data={};
    data.page=1;
    data.pageSize=20;
    var totalPage=0;
    firstCategory(data);

    // 点击上一页
    $("#prevBtn").on("click",function(){
        data.page--;
        if(data.page<1){
            data.page=1;
        }
        firstCategory();
        // setPaginator(data.page,firstCategory(data));
    });

    // 点击下一页
    $("#nextBtn").on("click",function(){
        data.page++;
        if(data.page>=totalPage){
            data.page=totalPage;
        }
        firstCategory();
        // setPaginator(data.page,firstCategory(data));
    });

    // 模态框点击保存，发送请求
    $("#addCategory").on("click",function(){
        // 获取表单输入值
        var categoryName=$.trim($("#categoryName").val());
        if(!categoryName){
            alert("请输入以及分类!");
            return;
        }
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: {
                categoryName: categoryName
            },
            success: function(res){
                if(res.success){
                    location.reload();
                }
            }
        });
    });

    // 分类表格渲染
    function firstCategory(){
        $.ajax({
            type: "GET",
            url: "/category/queryTopCategoryPaging",
            data: data,
            success: function(res){
                totalPage=Math.ceil(res.total/data.pageSize);
                var html=template("categoryTpl",res);
                $("#categoryBox").html(html);
                setPaginator(data.page,Math.ceil(res.total/res.size));
            }
        });
    }

    // 分页渲染
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
            }
        });
    }
});