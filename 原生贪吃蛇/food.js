//定义食物
(function(){
    var elements=[];
    function Food(x,y,width,height,color){
        this.x=x||0;
        this.y=y||0;
        this.width=width||20;
        this.height=height||20;
        this.color=color||"green";
    }

    Food.prototype.init = function(map){
        remove();
        //创建div
        var div=document.createElement("div");
        map.appendChild(div);
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.backgroundColor=this.color;
        //要动起来就要脱离文档流
        div.style.position="absolute";
        //横纵坐标要随机，先停止
        this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left = this.x+"px";
        div.style.top = this.y+"px";
        //把div放入加入到数组elements中，为了以后删除
        elements.push(div);

    };

    function remove(){
        for(var i=0;i<elements.length;i++){

            var ele=elements[i];
            ele.parentNode.removeChild(ele);

            elements.splice(i,1);
        }
    }

    window.Food=Food;
}());