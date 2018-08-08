window.onload=function () {
    var container = document.getElementById("container");
    var img = document.getElementsByTagName('img');
    var box = document.getElementById('box');
    var buttons=document.getElementsByTagName("span");
    var left = document.getElementsByClassName('left-arrow')[0];
    var right = document.getElementsByClassName('right-arrow')[0];
    var index=1;
    var moved=false;
    var timer;

    function showButton() {
        for(var i=0;i<buttons.length;i++){
            if(buttons[i].className=="on"){
                buttons[i].className="";
            }
        }
        buttons[index-1].className="on";
    }

    function move(offset) {
        moved=true;
        var newLeft=parseInt(box.style.left) + offset;
        var time=500;//位移总时间
        var interval=10;//位移间隔
        var speed=offset/(time/interval);//位移速度

        function go() {
            if((speed<0&&parseInt(box.style.left)>newLeft)||(speed>0&&parseInt(box.style.left)<newLeft)){
                box.style.left=parseInt(box.style.left)+speed+"px";
                setTimeout(go,interval);
            }
            else{
                moved=false;
                box.style.left = newLeft + "px";
                if(newLeft<-3500){
                    box.style.left=-700+"px";
                }
                else if(newLeft>-700){
                    box.style.left=-3500+"px";
                }
            }

        }
        go();
    }

    function play(){
        timer=setInterval(function () {
            right.onclick();
        },3000);
    }

    function stop(){
        clearInterval(timer);
    }

    right.onclick = function () {
        if(index==5){
            index=1;
        }
        else{
            index++;
        }
        showButton();
        if(!moved){
            move(-700);
        }
    }
    left.onclick = function(){
        if(index==1){
            index=5;
        }
        else{
            index--;
        }
        showButton();
        if(!moved){
            move(700);
        }
    }

    for(var i=0;i<buttons.length;i++){
        buttons[i].onclick=function(){
            if(this.className=='on'){
                return ;
            }
            var myIndex=parseInt(this.getAttribute("index"));
            var offset=(myIndex-index)*(-700);
            if(!moved){
                move(offset);
            }
            index=myIndex;
            showButton();
        }
    }

    container.onmouseover=stop;
    container.onmouseout=play;

    play();



}
