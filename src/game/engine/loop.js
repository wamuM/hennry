//? This file has the loop that is executed "each frame" and the function that starts it

import setUpKeyEvents from "./keys.js";
import * as renderer from "./renderer.js";
import ElementsCollection from "./classes/ElementsCollection.js";

let pt;
function frame(ts){//this is the frame
    if(pt === undefined)pt = ts;
    let deltaTime = (ts-pt)/(1000/window.__game.FPS);//since we want the speed in px/frame we convert
    if(window.__game.frameStop)deltaTime = 1;
    pt = ts;
    window.__game.ctx.clearRect(0,0,740,450)//it starts by clearing the canvas
    renderer.drawBackground();//it draws the background
    renderer.drawElements(window.__game.elements);//it draws each element
    window.__game.elements.forEach(e=>{e.doStuff.forEach(fn=>fn(deltaTime))})//it executes the code associated to each element
    if(!window.__game.frameStop)requestAnimationFrame(frame)//it repeats itself, and requests an animation frame === asks the GPU to draw stuff more efficiently
}

function start(elements,canvas=document.getElementById("canvas")){//this function starts the frame loop
    window.__game.elements = new ElementsCollection();
    window.__game.elements.add(...elements);
    window.__game.canvas   = canvas;
    window.__game.ctx      = canvas.getContext("2d");//this is like the paint brush

    console.log("loop.js:: Finishing canvas configuration")
    resize();
    window.addEventListener("resize",resize);

    console.log("loop.js:: Setting up key events")
    setUpKeyEvents(document.getElementById("canvas_box"))

    console.log("loop.js:: Starting Frame Callback Loop")
    window.__game.nextFrame = ()=>requestAnimationFrame(frame);
    window.__game.nextFrame()
}

function resize(){ //this makes sure the settings (for the ctx and the canvas) aren0t overwritten if we resize the website
    window.__game.canvas.height= 450; 
    window.__game.canvas.width = 740;
    window.__game.ctx.imageSmoothingEnabled = false;
}


export default start;