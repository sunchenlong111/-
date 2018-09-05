
//自定义函数 游戏对象
(function(){
    var that=null;
    function Game(map){
        this.food=new Food();
        this.snake=new Snake();
        this.map=map;
        that=this;
    };

    Game.prototype.init=function(){
        this.food.init(this.map);
        this.snake.init(this.map);
        this.runSnake(this.food,this.map);
        this.bindkey();
    }

    Game.prototype.runSnake=function(food,map){
        //此时this 是window
        var timer=setInterval(function(){
            this.snake.move(food,map);
            this.snake.init(map);
            //最大坐标
            var maxX=map.offsetWidth/this.snake.width;
            var maxY=map.offsetHeight/this.snake.height;

            //小蛇蛇头位置
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;

            if(headX>=maxX||headX<0||headY>=maxY||headY<0){
                clearInterval(timer);
                alert("游戏结束");
            }
        }.bind(that),150);

    };

    Game.prototype.bindkey=function(){
        //获取用户按键，改变小蛇方向
        document.addEventListener("keydown",function(e){
            switch(e.keyCode){
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;
            }

        }.bind(that),false);
    };


    window.Game=Game;
}());