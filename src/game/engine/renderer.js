//? This file has all the functions that draw on the canvas
/*
    width:740px;
    height:450px;
*/
function drawBackground(){
    let ctx = window.__game.ctx;
    ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(0,100,740,350);
        ctx.fillStyle = window.__game.sky;
        ctx.fillRect(0,0,740,100);
    ctx.closePath();
}
function drawElements(elements){
    let ctx = window.__game.ctx;
    let sortedElements = elements.sort((a,b)=>a.y-b.y+window.__game.zfight)
    sortedElements.forEach(e=>{//for each element this function:
        if(e.hiden)return;//draws nothing if the element is hidden
        let img = e.spriteSheat;//gets the file with all the sprites
        let row = 0;//sets up some variables
        let column = 0;
        let cellWidth = e.spriteSheatData.cellWidth;//this is the width and the height of each sprite
        let cellHeight = e.spriteSheatData.cellHeight;
        let x = e.x-(e.w/2)
        let y = e.y-(e.h/2)
        if(!e.animator.currentAnimationName){//if there is no animation it draws the current default srpite
            row    = e.sprite[0]
            column = e.sprite[1]
        }else{//if there is:
            let animation = e.animator.animations[e.animator.currentAnimationName]
            let cords = animation.frames[Math.floor(e.animator.currentAnimationFrame/e.animator.tbf)]
            row = cords[0]
            column = cords[1]
            e.animator.currentAnimationFrame += 1;
            e.animator.currentAnimationFrame %= animation.frames.length*e.animator.tbf;
            e.animator.events.animationFrame();
            if(e.animator.currentAnimationFrame===0)e.animator.events.animationEnd();
        }
        ctx.beginPath();
            ctx.drawImage(img, column*cellWidth, row*cellHeight, cellWidth, cellHeight, x, y, e.w* 1, e.h*1);//draws the sprite
        ctx.closePath();
        if(window.__game.debug){//if debug mode is on
            ctx.beginPath();
                ctx.moveTo(10,10)
                ctx.lineTo(10,25)
                ctx.moveTo( 10,10)
                ctx.lineTo(25,10)
                ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
                ctx.fillText("ClientX:"+window.clientX,15,25)
                ctx.fillText("ClientY:"+window.clientY,15,35)
                ctx.fill();
            ctx.closePath();
            ctx.beginPath();//it draws the rendering cords as a dot
                ctx.fillStyle = "red"
                ctx.arc(x,y,3,Math.PI*2,0)
                ctx.fill()
            ctx.closePath();
            ctx.beginPath();//it draws the real cords as a dot
                ctx.fillStyle = "green"
                ctx.arc(e.x,e.y,3,Math.PI*2,0)
                ctx.fill()
            ctx.closePath();
            ctx.beginPath();//it draws the hitbox /collision area (it's a circle)
                ctx.strokeStyle = "blue"
                ctx.arc(e.x,e.y,e.r,Math.PI*2,0)
                ctx.stroke()
            ctx.closePath();//it draws the width and the height of the sprite (as a box that surounds the sprite)
            ctx.beginPath();
                ctx.rect(x,y,e.w,e.h)
                ctx.stroke()
            ctx.closePath();
        }
    })
}
export {drawBackground,drawElements}

