let undoArr = [];
let redoArr = [];


/////////////////////////////////////////////////

let redo = document.getElementById("redo");
let undo = document.getElementById("undo");



    redo.addEventListener("click" , handleRedo);
 undo.addEventListener("click" , handleUndo);


// canvas
let isPenDown = false;
board.addEventListener("mousedown", function (e) {
    ctx.beginPath();
    
    let x = e.clientX;
    let y = e.clientY;
    let locfix = getlocation();
    ctx.moveTo(x , y - locfix);
    isPenDown = true;

    let strokes ={
        x,
        y,
        id: "md",
        color: ctx.strokeStyle,
        width: ctx.lineWidth
    }

    undoArr.push( strokes );
    console.log( undoArr );
});


//////////////////




//////////////////


board.addEventListener("mousemove", function (e) {
    if( isPenDown ){
        pencilOptions.classList.remove("show");
        console.log("move");
        let x = e.clientX;
        let y = e.clientY;
        let locfix = getlocation();
        ctx.lineTo(x , y - locfix);
        ctx.stroke();
        let strokes ={
            x,
            y,
            id: "mm",
            color: ctx.strokeStyle,
            width: ctx.lineWidth
        }
        undoArr.push(strokes);
         console.log( "md" , undoArr );
    }
   
    
});

///////////////


function handleUndo(){
    console.log(undoArr)
    if( undoArr.length >= 2 ){
        let tempArr = [];
        for( let i = undoArr.length -1 ; i >= 0 ; i-- ){
            let { id } = undoArr[i];
            if( id == "md" ){
                // undoArr.pop()
                tempArr.unshift(undoArr.pop());
                break;
            }else{
                // undoArr.pop()
                tempArr.unshift(undoArr.pop());
            }
        }
        redoArr.push(tempArr);
        handleRedraw();
    }
}



function handleRedo(){
    if( redoArr.length > 0 ){
        let pathToRestore = redoArr.pop();
        for( let i = 0 ; i < pathToRestore.length ; i++ ){
            undoArr.push(pathToRestore[i]);
        }
        handleRedraw();
    }

}

function handleRedraw(){
    ctx.clearRect(0, 0, board.width, board.height);
    for( let i = 0 ; i < undoArr.length ; i++ ){
        let { x , y , id , color , width } = undoArr[i];
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        if (id == "md") {
          ctx.beginPath();
          ctx.moveTo(x, y-(0.1*window.innerHeight));
        } else if (id == "mm") {
          ctx.lineTo(x, y-(0.1*window.innerHeight));
          ctx.stroke();
        }
    }
}





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
            pencilOptions.classList.toggle("show");
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