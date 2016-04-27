var AjaxLoad = {
    //home滚动加载逻辑
    HomeAjaxLoad : function(){
        $.ajax({
            url : "test.json",
            type : "post",
            dataType:'json',
            //async : true,
            success : function(data,textStatus){
                console.log(data);
                console.log(textStatus);
                if(data.all.length > 0){
                    $.each(data.all,function(i,dom){
                        var html = '';
                        html += '<a href="detail.html">\
                            <div class="card color-default">\
                                <div style="" valign="bottom" class="card-header color-white no-border no-padding">\
                                    <img class="card-cover" src="'+data.all[i].imgUrl+'" alt="">\
                                </div>\
                                <div class="card-content">\
                                    <div class="card-content-inner">\
                                        <p>'+data.all[i].info1+'</p>\
                                        <p class="color-gray">'+data.all[i].info2+'</p>\
                                    </div>\
                                </div>\
                                <div class="card-footer">\
                                    <span class="link">'+data.all[i].info3+'</span>\
                                    <span class="link">'+data.all[i].info4+'</span>\
                                </div>\
                            </div>\
                        </a>';
                        $('.page-home-list').append(html);
                    })
                }else{
                    $.detachInfiniteScroll($('#page-home .infinite-scroll'));
                    $('#page-home .infinite-scroll-preloader').remove();
                    return;
                }
            },
            error : function(XMLHttpRequest,textStatus, errorThrown){
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    },
    //home下拉加载逻辑
    HomeRefreshLoad:function(){
        $.get("test.json",function(data){
            console.log(data);
            //console.log(textStatus);
            if(data.all.length > 0) {
                $.each(data.all, function (i, dom) {
                    var html = '';
                    html += '<a href="detail.html">\
                            <div class="card color-default">\
                                <div style="" valign="bottom" class="card-header color-white no-border no-padding">\
                                    <img class="card-cover" src="' + data.all[i].imgUrl + '" alt="">\
                                </div>\
                                <div class="card-content">\
                                    <div class="card-content-inner">\
                                        <p>' + data.all[i].info1 + '</p>\
                                        <p class="color-gray">' + data.all[i].info2 + '</p>\
                                    </div>\
                                </div>\
                                <div class="card-footer">\
                                    <span class="link">' + data.all[i].info3 + '</span>\
                                    <span class="link">' + data.all[i].info4 + '</span>\
                                </div>\
                            </div>\
                        </a>';
                    $('#page-home .page-home-list').prepend(html);
                    $.pullToRefreshDone('#page-home .pull-to-refresh-content');
                })
            }
        },"json");
    },
    //shops滚动加载逻辑
    ShopsAjaxLoad : function(){
        $.get("test.json",function(data){
            console.log(data);
            //console.log(textStatus);
            if(data.ShopsAll.length > 0) {
                $.each(data.ShopsAll, function (i, dom) {
                    var html = '';
                    html += '<li>\
                                <a href="detail.html" class="item-link item-content">\
                                    <div class="item-media"><img src="'+data.ShopsAll[i].imgUrl+'" width="80"></div>\
                                        <div class="item-inner">\
                                            <div class="item-title-row">\
                                            <div class="item-title">'+data.ShopsAll[i].info1+'</div>\
                                            <div class="item-after">'+data.ShopsAll[i].info2+'</div>\
                                        </div>\
                                        <div class="item-subtitle"></div>\
                                        <div class="item-text">'+data.ShopsAll[i].info4+'</div>\
                                    </div>\
                                </a>\
                            </li>';
                    $('.ajaxContent').append(html);
                })
            }else{
                $.detachInfiniteScroll($('.infinite-scroll'));
                $('.infinite-scroll-preloader').remove();
                return;
            }
        },"json");
    },
    //detail bnaner load
    detailBanner : function(){
        $.get("test.json",function(data){
            console.log(data);
            //console.log(textStatus);
            if(data.banner.length > 0) {
                $.each(data.banner, function (i, dom) {
                    var html = '';
                    html += '<div class="swiper-slide">\
                                 <img class="card-cover" src="'+data.banner[i].imgUrl+'" alt="">\
                            </div>\
                            <div class="swiper-slide">\
                                 <img class="card-cover" src="'+data.banner[i].imgUrl2+'" alt="">\
                            </div>\
                            <div class="swiper-slide">\
                                 <img class="card-cover" src="'+data.banner[i].imgUrl3+'" alt="">\
                            </div>';
                    $('#detail-page .swiper-wrapper').append(html);
                })
            }
        },"json");

    },
    init : function(){
        this.HomeAjaxLoad(); //首次预加载
        this.ShopsAjaxLoad(); //Shops首次预加载
        this.detailBanner(); //banner预加载
    }

}
//home滚动加载
var loading = false;
$(document).on('infinite', '#page-home .infinite-scroll',function() {
    // 如果正在加载，则退出
    if (loading) return;
    // 设置flag
    loading = true;
    setTimeout(function() {
        AjaxLoad.HomeAjaxLoad();
        loading = false;
    }, 500);
});
//Shops滚动加载
$(document).on('infinite', '#page-goods .infinite-scroll',function() {
    if (loading) return;
    loading = true;
    setTimeout(function() {
        AjaxLoad.ShopsAjaxLoad();
        loading = false;
    }, 500);
});
//home下啦加载加载
$(document).on('refresh', '#page-home .pull-to-refresh-content',function(e) {
    if (loading) return;
    loading = true;
    setTimeout(function() {
        AjaxLoad.HomeRefreshLoad();
        loading = false;
    }, 500);
});

var $dark = $("#dark-switch").on("change", function() {
    $(document.body)[$dark.is(":checked") ? "addClass" : "removeClass"]("theme-dark");
});
$.init();//框架初始化
AjaxLoad.init();//预加载