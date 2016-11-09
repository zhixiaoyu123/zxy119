
//8.29 解决通过类名获取元素的兼容问题
function getclass(classname,father){
    father=father||document;
    //判断浏览器是否是现代浏览器
    if(father.getElementsByClassName){
        //若是则使用getElementsByClassName即可
        return father.getElementsByClassName(classname);
    }else{
        //若不是则用TageName方式获取所有标签名
        var all=father.getElementsByTagName("*");
        var newarr=[];
        //遍历标签名 寻找与已知类名相同的属性名
        for (var i = 0; i < all.length; i++) {
            if(checkRep(classname,all[i].className))
            {
                newarr.push(all[i]);
            }
        }return newarr;
    }
}

function checkRep(val,string){
   var arr=string.split(" ");
   for(var i in arr){
    if(arr[i]==val){
        return true;
    }
   }
   return false;
}
//获取样式的值的兼容函数
function getStyle(obj,attr){
    if(obj.currentStyle){
        return parseInt(obj.currentStyle[attr]);
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}

//获取元素的兼容函数（可以支持标签，id，class）
function $(selector,father){
    father=father|| document;
    if(typeof selector=="string"){
        //去除空格
        selector=selector.replace(/^\s*|\s*$/g,"")

        if(selector.charAt(0)=="."){
            return getclass(selector.substring(1),father);
        }else if(selector.charAt(0)=="#"){
            return father.getElementById(selector.substring(1))
        }else if(/^[a-z][1-6a-z]*/g.test(selector)){
            return father.getElementsByTagName(selector);
        }
    }else if(typeof selector=="function"){
        // window.onload=function(){
        // selector();
        addEvent(window,"load",function(){
            selector();
        })
  }
}

    //获取所有子节点的兼容函数
    //father指定父节点
    //type:"a"只有元素节点
    //type:"b"既有元素又有文本
function getChild(father,type){
 //默认为只获取元素节点
        type=type||"a";
 //把父元素的所有节点赋给all;
        var all=father.childNodes;
        var newarr=[];
 //遍历所有的子节点
        for (var i = 0; i < all.length; i++){
 //若类型为只获取元素节点
          if(type=="a"){
            //
                if(all[i].nodeType==1){
                    newarr.push(all[i]);
                } 
          }else if(type=="b"){
                if(all[i].nodeType==1||(all[i].nodeType==3&&all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="")){
                   newarr.push(all[i]); 
                }
          }
       
    } return newarr;
}
//获取第一个子节点
function getFirst(father){
    return getChild(father)[0];
}
//获取最后一个子节点
function getLast(father){
    return getChild(father)[getChild(father).length-1];
}
//
function getNum(father,num){
    return getChild(father)[num];
}
//获取下一个兄弟节点
function getNext(child){
    var  next=child.nextSibling;
    if(!next){
        return false;
    }
    while(next.nodeType==3||next.nodeType==8){
         next=next.nextSibling
         if(!next){
         return false;
         }
    }
    return next;

}
//获取上一个兄弟节点
function getUp(child){
    var up=child.previousSibling;
    if(!up){
        return false;
    }
    while(up.nodeType==3||up.nodeType==8){
         up=up.previousSibling;
         if(!up){
         return false;
         }
    }
    return up;

}
//事件绑定的兼容函数
function addEvent(obj,event,fun){
    obj[fun]=function(){
        fun.call(obj);
    }
    if(obj.attachEvent){

        obj.attachEvent("on"+event,obj[fun]);
        
    }else{
        obj.addEventListener(event,obj[fun],false)
    }
}
//事件移除的兼容函数
function removeEvent(obj,event,fun){
    if(obj.detachEvent){
        obj.detachEvent("on"+event,obj[fun]);
    }else{
        obj.removeEventListener(event,obj[fun],false)
    }
}
//12.鼠标的滚轮事件
function mouseWheel(obj,up,down){
   if(obj.attachEvent){
    obj.attachEvent("onmousewheel",scrollFn);
    //IE、opera
    }else if(obj.addEventListener){
        obj.addEventListener("mousewheel",scrollFn,false);
        //chrom,safari -webkit-
        obj.addEventListener("DOMMouseScroll",scrollFn,false);
       //firefox -moz-
    }
    function scrollFn(e){
        e=e||window.event;
        var f=e.detail||e.wheelDelta;
        if(f==-3||f==120){
            if(up){
                up()
            }
        }else if(f==3||f==-120){
            if(down){
                down()
            }
        }
        //FF -3:向上 3 ：向下
        //IE 120:向上 -120：向下
        // alert(e.detail)
        //alert(e.wheelDelta);
   }
}
//hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
//阻止浏览器滑轮默认行为
