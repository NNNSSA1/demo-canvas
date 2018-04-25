window.onload = function(){
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var eraser = document.getElementById("eraser")
    var brush = document.getElementById("brush")
    var actions = document.getElementById("actions")
    //1.动态设置画布全屏的大小
    autoSize(canvas)


    //2.监听鼠标的动作
    listenToUser(canvas)

    // 3.设置橡皮檫的状态          //尽量只让一个按钮做一个事情。能不加ifelse就不要加，用状态转换更好。
    var eraserEnabled = false
    eraser.onclick = function (){
        eraserEnabled = true
        actions.className = "actions x"
    }
    brush.onclick = function (){
        eraserEnabled = false
        actions.className = "actions"
    }    


/********工具函数************/

function autoSize(canvas){          //设置参数，下面的函数中只需要一个canvas
    setCanvasSize()
    window.onresize = function(){
        setCanvasSize()
    }
    function setCanvasSize(){
        var pagewidth = document.documentElement.clientWidth
        var pageheight = document.documentElement.clientHeight
        canvas.width = pagewidth
        canvas.height = pageheight
    }
    
}

function drawLine(x1,y1,x2,y2){  //画线的函数
    context.beginPath()
    context.moveTo(x1,y1)  //起点
    context.lineWidth = 5;
    context.lineTo(x2,y2)  //终点
    context.stroke()
    context.closePath()
}


// function drawCricle(x,y,raidus){   //画圈的函数  ，可以不需要
//     context.beginPath()
//     context.arc(x,y,raidus,0,Math.PI*2)   //x轴，Y轴，半径和从0°--360°
//     context.stroke()    //描边
// }

function listenToUser(canvas){
    var using = false
    var lastPoint = {x:undefined,y:undefined}
    if(document.body.ontouchstart !== undefined){        
     //触摸屏模式输出       
        canvas.ontouchstart = function(a){
            x = a.touches[0].clientX
            y = a.touches[0].clientY
            using= true
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)   //橡皮檫是矩形，默认为矩形的左上角 ，x,y减去一半就是矩形的中心了。
            }else{
                lastPoint = {"x": x ,"y": y}       
            }
        }
        canvas.ontouchmove = function(a){
            x = a.touches[0].clientX
            y = a.touches[0].clientY
            if(!using){return}    //直接判断如果用了就继续下个判断，否则直接进入下个。
                if(eraserEnabled){
                        context.clearRect(x-5,y-5,10,10)
                }else{
                        var newPoint = {"x": x ,"y": y }
                        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                        lastPoint = newPoint
                }
            }
        canvas.ontouchend = function(a){
            using = false
        }
    }else{
    //pc模式输出
   
    canvas.onmousedown = function(a){
        x = a.clientX
        y = a.clientY
        using= true
        if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10)   //橡皮檫是矩形，默认为矩形的左上角 ，x,y减去一半就是矩形的中心了。
        }else{
            lastPoint = {"x": x ,"y": y}       
        }
    }
    canvas.onmousemove = function(a){
        x = a.clientX
        y = a.clientY
        if(!using){return}    //直接判断如果用了就继续下个判断，否则直接进入下个。
        if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
        }else{
                var newPoint = {"x": x ,"y": y }
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint = newPoint
        }
    
    }
    canvas.onmouseup = function(a){
        using = false
    
    }
    
}
}
}


