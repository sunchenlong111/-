
//定义小蛇
(function () {
    var elements=[];
    function Snake(width,height,direction){
        this.width=width||20;
        this.height=height||20;
        this.direction=direction||"right";

        this.body=[
            {x:3,y:2,color:"red"},
            {x:2,y:2,color:"yellow"},
            {x:1,y:2,color:"yellow"}
        ];
    };

    //添加小蛇初始化方法

    Snake.prototype.init=function(map){
        remove();
        for(var i=0;i<this.body.length;i++){
            //数组每一个元素都是一个对象
            var obj=this.body[i];
            var div=document.createElement("div");
            map.appendChild(div);

            div.style.width=this.width+"px";
            div.style.height=this.height+"px";
            div.style.position="absolute";
            div.style.left=obj.x*this.width+"px";
            div.style.top=obj.y*this.height+"px";
            div.style.backgroundColor=obj.color;
            elements.push(div);//注意数组元素方法是（）
        }


    };

    //让小蛇动起来
    Snake.prototype.move=function(food,map){
        var i=this.body.length-1;//2
        //3到2的位置，2到1的位置
        for(;i>0;i--){
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;
        }
        //判断小蛇的蛇头位置
        switch(this.direction){
            case "right":this.body[0].x +=1;break;
            case "left":this.body[0].x -=1;break;
            case "top":this.body[0].y -=1;break;
            case "bottom":this.body[0].y +=1;break;
        }

        //判断小蛇是否吃掉食物
        //即判断蛇头坐标和食物坐标是否一致
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;

        if(headX==food.x&&headY==food.y){
            //获取小蛇的尾巴
            var last=this.body[this.body.length-1];

            this.body.push(
                {
                    x:last.x,
                    y:last.y,
                    color:last.color
                }
            );
            food.init(map);
        }

    };


    function remove(){
        var i=elements.length-1;
        for(;i>=0;i--){
            var ele=elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    };
    window.Snake=Snake;
})();