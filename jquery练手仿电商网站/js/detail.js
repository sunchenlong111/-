$(function () {
    //小图切换大图

    $("#content-middle .small-img li a").bind("click",function () {
        var imgSrc=$(this).find('img').attr('src');//找到图片blue-one链接
        var i=imgSrc.lastIndexOf('.');//找到图片blue-one链接
        var unit=imgSrc.substring(i);//将blue_one.jpg后面的.jpg分隔开

        imgSrc=imgSrc.substring(0,i);//取得blue_one

        var imgSrc_big = imgSrc + "_big"+unit;

        $("#thickImg").attr("href",imgSrc_big);
    })

    //tab栏切换
    var index2=0;
    $(".detail-info-title span ").click(function () {
        index2=$(this).index();
        $(this).addClass("choosed").siblings().removeClass("choosed");
        $(".detail-info-text p").eq(index2).addClass("selected").siblings().removeClass("selected");
    })

    //改变颜色

    $(".good-detail .demo-color a img").click(function () {
        //首先找到显示颜色的三个小图片，点击切换选中效果
        $(this).addClass("hover")
            .parent().siblings().find('img').removeClass("hover");
        //获取到选中颜色的src属性获得图片的链接并进行拆分，例如images/pro_img/blue.jpg
        //拆解成images/pro_img/blue 和 .jpg
        var imgSrc=$(this).attr('src');
        var i=imgSrc.lastIndexOf('.');
        var unit=imgSrc.substring(i);
        imgSrc=imgSrc.substring(0,i);

        //在拆解的前一部分加上_one_small和_one_big就可以找到相对应的大图和中图，再把链接给显示相应图片的盒子
        var imgSrc_small=imgSrc+"_one_small"+unit;
        var imgSrc_big=imgSrc+"_one_big"+unit;
        $("#bigImg").attr({"src":imgSrc_small});
        $("#thickImg").attr({"href":imgSrc_big});

        //将选中颜色的属性名随着点击事件传利用text（）函数送给显示图片颜色汉字的div
        var alt =$(this).attr("alt");
        $(".color-select strong").text(alt);

        //接下来就是要让之前的缩略图随着颜色的变换而切换，利用之前的Imgsrc拼接成类名通过选择器设置hide和show
        var newImgsrc = imgSrc.replace("images/pro_img/","");
        $(".small-img li").hide();
        $(".small-img").find(".imgList_"+newImgsrc).show();

        //最后发现产品颜色切换正常了，但是发现不动手点击缩略图，放大镜的效果不会实现，还是原来的图片
        //这时候就通过模拟鼠标点击缩略图
        $(".small-img").find(".imgList_"+newImgsrc).eq(0).find('a').click();
    })

    // <!--右侧产品尺寸切换-->
    var size;

    $(".size li").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        size=$(this).text();
        $(this).parents('li').find("strong").text(size);
    });

    //价格随着数量的变化而变化
    var $total=$(".total strong");
    var price=$total.text();

    $("#number").change(function () {
        var num=$(this).val();
        var amount=num*price;
        $total.text(amount);
    }).change();

    //评分
    $("#rating-star li a").click(function () {
        var title=$(this).attr("title");
        alert("您给此商品的评价为"+title);
        var cl=$(this).parent().attr("class");
        $(this).parent().parent().removeClass().addClass(cl+"star");
    })

    //弹窗
    $(function () {
        var $product =$("#content-right-detail");
        $(".shop-car img").click(function () {
            debugger;
            var pro_name=$product.find("h4:first").text();
            var pro_size=$product.find(".size-select strong").text();
            var pro_color=$product.find(".color-select strong").text();
            var pro_num=$product.find("#number").val();
            var pro_total=$product.find(".total strong").text();
            var dialog="感谢您的购买。\n您购买的" +
                "" +
                ""+
                "产品是："+pro_name+";\n"+
                "尺寸是："+pro_size+";\n"+
                "颜色是："+pro_color+";\n"+
                "数量是："+pro_num+";\n"+
                "总价是："+pro_total+"元";

            alert(dialog);
            return false;
        })
    });


})