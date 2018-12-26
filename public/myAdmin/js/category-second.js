$(function(){
    var page=1;
    var pageSize=10;
    var totalPage=0;
    // 进入页面显示
    getSecondCategory();


    // 点击上一页
    $("#prevBtn").on("click",function(){
        page--;
        if(page<1){
            page=1;
            alert("已经在第一页了");
            return;
        }
        getSecondCategory()
    });

    // 点击下一页
    $("#nextBtn").on("click",function(){
        page++;
        if(page>totalPage){
            page=totalPage;
            alert("已经在最后一页了");
            return;
        }
        getSecondCategory()
    });

    
    // 定义添加二级分类传给后台的数据
    var dataBrand={
        brandName: "",
        categoryId: "",
        brandLogo: "",
        hot: ""
    };
    
    // 点击保存添加二级分类
    $("#addCategory").on("click",function(){
        // 或获取用户表单
        dataBrand.brandName=$.trim($("#brandName").val());
        // select选框中option的value值
        dataBrand.categoryId=$.trim($("#categoryId").val());
        if(!dataBrand.brandName){
            alert("请输入商品名称！");
            return;
        }
        if(!dataBrand.categoryId){
            alert("请选择商品类别！");
            return;
        }
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: dataBrand,
            success: function(res){
                if(res.success){
                    location.reload();
                }
            }
        });
    });

    // 文件上传        
    $("#fileUpload").fileupload({
        dataType: 'json',
        done: function (e, data) {
            // console.log(data);
            dataBrand.brandLogo=data.result.picAddr;
            var imgUrl=data.result.picAddr;
            $("#showBrand").attr("src",imgUrl); 
        }
    });

    // 显示模态框的一级分类
    $("#showModel").on("click",function(){
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
              },
            success: function(res){
                $.ajax({
                    type: "get",
                    url: "/category/queryTopCategoryPaging",
                    data: {
                        page: page,
                        pageSize: res.total
                      },
                    success: function(res){
                        var html=template("firstCategoryTpl",{data: res.rows});
                        $("#firstCategory").html(html);
                    }
                });
            }
        });
    });
    
    // 表格渲染
    function getSecondCategory(){
        $.ajax({
            type: "GET",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(res){
                totalPage=Math.ceil(res.total/pageSize);
                var html=template("categoryTpl",{data:res});
                $("#categoryBox").html(html);
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