// canvas
let isPenDown = false;
board.addEventListener("mousedown", function (e) {
    ctx.beginPath();
    console.log("down");

    let x = e.clientX;
    let y = e.clientY;
    let locfix = getlocation();
    ctx.moveTo(x , y - locfix);
    isPenDown = true;

});



board.addEventListener("mousemove", function (e) {
    if( isPenDown ){
        console.log("move");
        let x = e.clientX;
    let y = e.clientY;
    let locfix = getlocation();
    ctx.lineTo(x , y - locfix);
       // ctx.strokeStyle = "yellow";
       
        ctx.stroke();
    }
    
});
board.addEventListener("mouseup", function () {
    console.log("up");
    isPenDown=false;
});
function getlocation(){
    let {top} = board.getBoundingClientRect();
    return top;
} 


///////// sticky 

function createSticky(){
    
    let sticky = document.createElement("div");
    let navBar = document.createElement("div");
    let close = document.createElement("div");
    let min = document.createElement("div");
    let textbox = document.createElement("div");
    let textarea = document.createElement("textarea");

    sticky.setAttribute("class" , "sticky");
    navBar.setAttribute("class" , "nav-bar");
    close.setAttribute("class" , "close");
    min.setAttribute("class" , "min");
    textbox.setAttribute("class" , "textbox");
    textarea.setAttribute("class" , "textarea");    

    close.addEventListener("click", function() {
        sticky.setAttribute("class" , "hide");
    });

    sticky.appendChild(navBar);
    sticky.appendChild(textbox);
    navBar.appendChild(min);
    navBar.appendChild(close);
    textbox.appendChild(textarea);

    document.body.appendChild(sticky);
}



///////tool-bar
let activetool = 'pencil';

ctx.shadowBlur = 1;
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");

function handleTool(tool){
    if( tool == "eraser" ){
        if( activetool == "eraser" ){
            eraserOptions.classList.add("show");
        }else{
            console.log("eraser");
            ctx.lineWidth = 20;
            ctx.lineCap = "butt";
            ctx.lineJoin = "bevel";
            ctx.strokeStyle = "#0b1216";
            activetool = 'eraser';
            pencilOptions.classList.remove("show");
        }
    }else if( tool == "pencil" ) {
        if( activetool == "pencil" ){
            pencilOptions.classList.add("show");
        }else{
            console.log("eraser");
            ctx.lineWidth = 20;
            ctx.lineCap = "butt";
            ctx.lineJoin = "bevel";
            ctx.strokeStyle = "yellow";
            activetool = 'pencil';
            eraser.classList.remove("show");
        
        }
    }else if(tool == "sticky"){
        createSticky();
    }
}
function changeColor(color){
    ctx.strokeStyle = color;
}
let sliderarr = document.querySelectorAll("input[type='range']");
for( let i = 0 ; i< sliderarr.length ;i++ ){
    sliderarr[i].addEventListener("change" , function(){
        let thickness = sliderarr[i].value;
        ctx.lineWidth = thickness;
    })
}