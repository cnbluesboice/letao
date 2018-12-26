$(function(){
    
    $("#searchBtn").on("tap",function(){
        var arr=[];
        // 获取用户输入的值
        var text=$("#inputText").val().trim();
        if(!text){
            alert("请输入要搜索的商品！");
            return;
        }
        if(!localStorage.getItem("keyword")){
            arr.push(text);            
        }else{
            arr=JSON.parse(localStorage.getItem("keyword"));
            arr.push(text);
        }
        localStorage.setItem("keyword",JSON.stringify(arr));
        location.href="searchResult.html?keyword="+text;
        // arr=JSON.parse(localStorage.getItem("keyword"));
        // getHistory(arr);               
    });
    // 一进页面就获取localStorage
    if(localStorage.getItem("keyword")){
        var arr1=[];
        arr1=JSON.parse(localStorage.getItem("keyword"));
        // 这里获取到了arr之后，渲染到页面
        getHistory(arr1);
    }

    // 点击清空历史，清空localStorage
    $(".historyClear").on("tap",function(){
        localStorage.removeItem("keyword");
        $("#resultData").html("");
    });
});

// 搜索历史渲染到页面
function getHistory(arr){
    var html=template("searchList",{data:arr});
    $("#resultData").html(html);
}