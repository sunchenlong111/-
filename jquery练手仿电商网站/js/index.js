$(function () {
    //搜索文本框！
    $("#search input").focus(function () {
        if($(this).val()==this.defaultValue){
            $(this).val("");
        }
    }).blur(function () {
        if($(this).val()==""){
            $(this).val(this.defaultValue);
        }
    }).keyup(function (e) {
        if(e.which==13){
            alert("成功提交表单！");
        }
    })

    //更换浏览器颜色
    var $li = $("#header #skin li");
    $li.click(function () {
        switchSkin(this.id);
    });

    var cookie_skin=$.cookie("MyCssSkin");//读取cookie中的MyCSSSkin数据
    if(cookie_skin){//如果存在的话就执行函数
        switchSkin(cookie_skin);
    }

    //隐藏菜单
    $(function () {
        $("#nav .title ").hover(function () {
            $(this).find(".hide-nav").show();
        },function () {
            $(this).find(".hide-nav").hide();
        })
    })

    //显示图片，有点类似于轮播图
    var $imgRoll=$("#content-center .pic-msg a");
    $imgRoll.css('opacity',0.7);
    var len=$imgRoll.length;
    var index=0;
    var timer;
    //鼠标移进去显示图片
    $imgRoll.mouseover(function () {
        index=$(this).index();
        showImg($imgRoll,index);
    }).eq(0).mouseover();//后面的尾巴是让第一张图片显示

    //自动显示切换图片
    $("#content-center").hover(function () {
        if(timer){
            clearInterval(timer);
        }
    },function () {
        timer=setInterval(function () {
            showImg($imgRoll,index);
            index++;
            if(index==len){
                index=0;
            }
        },3000);
    }).trigger("mouseleave");//trigger() 方法触发被选元素的指定事件类型

    //显示超链接

    var x=10;
    var y=20;

    $("#content-right .tooltip").mouseover(function (e) {
        this.myTitle=this.title;//这边主要防止鼠标移上去后也会弹出文本原来的title，所以先把title放到一个自定义的变量里去，自己title先设为空
        this.title="";
        var toolTip="<div id='toolTip'>"+this.myTitle+"</div>";
        $('body').append(toolTip);
        $('#toolTip').css(
            {
            'top':(e.pageY+y)+"px",
            'left': (e.pageX+x)+"px"
        }).show("fast");
    }).mouseout(function () {
        this.title=this.myTitle;//当鼠标移开的时候再重新赋值title
        $('#toolTip').remove();
    }).mousemove(function (e) {
        $('#toolTip').css(
            {
                'top':(e.pageY+y)+"px",
                'left': (e.pageX+x)+"px"
            }).show("fast");
    });

    // <!--下方品牌活动横向滚动-->
    var index2=0;
    $("#content-bottom-table .member").click(function () {
        $(this).addClass("chaos").siblings().removeClass("chaos");
        index2=$(this).index();
        move(index2);
    }).eq(0).click();

    //下方物品显示放大镜
    $(".goods-list").find('li').each(function () {
        var $img=$(this).find('img');
        var img_w=$img.width();
        var img_h=$img.height();

        var spanHtml = "<span class='imgMask' style='position: absolute;left:0;top:0;width:"+img_w+"px;height:" +img_h+"px;'></span>";
        $(spanHtml).appendTo(this);

        })

    $(".goods-list").find(".imgMask").live("hover",function () {
        $(this).toggleClass("imgOver");
        //这里用live()来绑定事件而不用bind()绑定，因为live可以为新创建出来的元素绑定事件，而bind（）只能绑定页面一开始就有的元素
        //toggleClass() 切换类名 类名有就删除，没有就添加
    })

})


function switchSkin(skinName){
    $("#"+skinName).addClass("selected").siblings().removeClass("selected");
    $("#sheet-color").attr("href",'css/skin/'+skinName+".css");
    $.cookie( "MyCssSkin" , skinName , {path:'/',expires :10});
    //写入cookie（待写入的cookie名，the_value待写入的值，存储的路径和时间长短）
}

function showImg(target,index) {
    var $rollObj=$("#content-center");
    var $roollist=$rollObj.find("div a");
    var newhref=$roollist.eq(index).attr("href");
    $(".img-list").attr("href",newhref)
        .find("img").eq(index).stop(true,true).fadeIn()
        .siblings().fadeOut();
    target.removeClass("chos").css('opacity','0.7')
        .eq(index).addClass('chos').css('opacity','1');

}

function move(index) {
    var len=$("#content-bottom-goods").width();
    $("#content-bottom-goods .goods-list").animate({left:-len*index},1000);//animate()执行css的动画属性
}

