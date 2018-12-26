// 将变量定义在入口函数外面，不然ajax函数中获取不到
// 获取用户输入的关键字
var keyword=getParamsUrl(location.href,"keyword");
var page=1;
var pageSize=3;
var html="";
var This=null;
var price=1;
var num=1;
var order={};
$(function(){
    // getData();
    // 上拉加载
    mui.init({
        pullRefresh : {
          container:"#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback : getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });


    //  点击价格排序
    $(".priceSort").on("tap",function(){
        price=price==1? 2: 1;
        order={price:price};
        // 将之前的数据初始化
        html="",
        page=1;
        // 重置上拉加载
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    });

    //  点击销量排序
    $(".numSort").on("tap",function(){
        console.log(1111);
        num=num==1? 2: 1;
        order={num:num};
        // 将之前的数据初始化
        html="",
        page=1;
        // 重置上拉加载
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    });
});
function getData(){
    if(!This){
        This=this;
    }
    $.ajax({
        url:"/product/queryProduct",
        type:"get",
        data:$.extend({
            page: page++,
            pageSize: pageSize,
            // price: price,
            // num: num,
            proName: keyword
        },order),
        success:function(res){
            if(res.data.length>0){
                html += template("searchResult",{data:res.data});
                $("#productList").html(html);
                This.endPullupToRefresh(false);
            }else{
                This.endPullupToRefresh(true);
            }
        }
    });
}

// 分割url获取用户输入的关键字
function getParamsUrl(url,name){
    var params=url.substr((url.indexOf("?")+1));
    var param=params.split("&");
    for(var i=0; i<param.length; i++){
        var current=param[i].split("=");
        if(current[0]==name){
            return current[1];
        }
    }
    return null;
}