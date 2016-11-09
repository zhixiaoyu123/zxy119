$(function(){
    function lunbo(index){
        var imgbox=$(".imgbox")[index];
        var lefts=$(".left")[index];
        var rights=$(".right")[index];
        var bannerbox=$(".bannerbox")[index];
        function move(){
            var first=getFirst(imgbox);
            animate(first,{width:0},function(){
                imgbox.appendChild(first);
                first.style.width="1340px";
            })
        };
        var t=setInterval(move,3000)
        bannerbox.onmouseover=function(){
            clearInterval(t);
        }
        bannerbox.onmouseout=function(){
            t=setInterval(move,3000);
        }

        lefts.onclick=function(){
            move();
        }
        rights.onclick=function(){
            var last=getLast(imgbox);
            imgbox.insertBefore(last,getFirst(imgbox));
            last.style.width="0";
            animate(last,{width:1340},function(){
            })

        }
    }
    lunbo(0);

})