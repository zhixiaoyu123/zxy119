$(function(){
    //初始化菜单的宽高
    var clientW=$(window).width();
    var clientH=$(window).height();
    $(".son").css({
        width:clientW,
        height:clientH
    })

    $(".menu").click(function(){
        $(".son").slideToggle(300);
    })


    /*轮播*/
    $(window).blur(function(){
        clearInterval(t1);
        clearInterval(t2);
    })
    $(window).focus(function(){
        t1=setInterval(move,3000);
        t2=setInterval(progress,50);
    })
    var current=0;
    var next=0;
    var currentTime=0;
    var flag=true;
    function move(){
        next++;
        if(next==3){
            next=0;
            flag=false;
        }
        $(".list:eq("+current+")").css({
            transform:"scale(0.8,0.8,1)",
            zIndex:0
        });
        $(".list").eq(next).animate({left:0},function(){
            $(".list:eq("+current+")").css({width:"100%",height:"100%",left:"100%"});
            current=next;
            currentTime=0;
            flag=true;
        }).css("zIndex",1);
    };

    function progress(){
        currentTime+=50;
        var bili=currentTime/2500;
        if(bili>1){
            bili=1;
        }
        $(".progress").eq(current).css("width",bili*100+"%");
        if(flag==false){
            $(".progress").css("width",0);
        }

    }
    var t1=setInterval(move,3000);
    var t2=setInterval(progress,50);

    $(".btns-list").click(function(){
        next=$(this).index(".btns-list");
        stop();
    });

    $(".leftbtn").click(function(){
        next--;
        if(next==-1){
            next=2;
        }
        stop();
    })

    $(".rightbtn").click(function(){
        next++;
        if(next==3){
            next=0;
        }
        stop();
    })

    function stop(){
        clearInterval(t1);
        clearInterval(t2);

        $(".btns-list").find(".progress").css("width",0);
        $(".btns-list").find(".progress").eq(next).css("width","100%");

        if(next>current) {
            $(".list:eq(" + current + ")").animate({width: "80%", height: "80%"}).css("zIndex", 0);
            $(".list").eq(next).animate({left: 0}, function () {
                $(".list:eq(" + current + ")").css({width: "100%", height: "100%", left: "100%"});
                current = next;

            }).css("zIndex", 1);
        }else{
            $(".list").eq(current).animate({left:"100%"}).css("zIndex",1);
            $(".list").eq(next).css({
                width:"80%",height:"80%",left:0
            }).animate({width:"100%",height:"100%"},function(){
                current=next;
            })
        }
    }
    $(".footnav").click(function(){
        if($(window).width()<=750){
            $(this).next(".error").slideToggle();
        }
    })
})