/*使用jqzoom*/
$(function(){
	$('.jqzoom').jqzoom({
		zoomType: 'standard',
		lens:true,
		preloadImages: false,
		alwaysOn:false,
		zoomWidth: 340,//小图片所选宽度
		zoomHeight: 340,//小图片所选高度
		xOffset:10,//大图距离横坐标
		yOffset:0,//大图距离纵坐标
		position:'right'//在小图右边
    });
});