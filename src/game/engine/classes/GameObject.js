//? This file has the class that defines what a GameObject is 
class GameObject{
    /**
     * 
     * @param {Number} x the X cord of the object
     * @param {Number} y the Y cord of the object
     * @param {Number} r the radius of the object hitbox
     * @param {SpriteData} spriteData the sprite data
     * @param {Boolean} hiden if the object should be drawn
     */
    constructor(x,y,r,width,height,spriteData,hidden=false){
        this.x = x;
        this.y = y;
        this.r = r;
        this.w = width;
        this.h = height;
        this.hidden = hidden;
        let img = new Image();
        img.src = spriteData.src;
        this.spriteSheat = img;
        this.spriteSheatData = {
            cellWidth:spriteData.cellWidth,
            cellHeight:spriteData.cellHeight
        }
        this.sprite = spriteData.idle
      
        this.animator = {
          currentAnimationFrame:false,
          currentAnimationName:false,
          events:{
                animationEnd:()=>{},
                animationFrame:()=>{}
          },
          animations:{}
        }
        
        this._meta = {};
        this.doStuff = [];
    }
    /**
     * 
     * @param {String} name 
     * @param {AnimationFrames} frames
     * @param {Function} onAnimationEndDefault 
     * @param {Function} onAnimationFrameDefault 
     */
    setAnimation(name,animationFrames,defaultTbf,onAnimationEndDefault =()=>{},onAnimationFrameDefault=()=>{}){
        this.animator.animations[name] = {
            frames:animationFrames,
            defaultEvents:{
              animationEnd:onAnimationEndDefault,
              animationFrame:onAnimationFrameDefault,
            },
            defaultTbf
        }
    }
    /**
     * A function that calls an animation
     * @param {String} animationName The name of the animation
     * @param {Number} [currentAnimationFrame] The animation frame to wich you want to start (it starts at 0)
     */
    animate(animationName,currentAnimationFrame=0,tbf=false,animationEnd=false,animationFrame=false){
        this.animator.currentAnimationName = animationName;
        this.animator.currentAnimationFrame = currentAnimationFrame;
        this.animator.tbf = tbf||this.animator.animations[animationName].defaultTbf;
        this.animator.events = {
            animationEnd:animationEnd||this.animator.animations[animationName].defaultEvents.animationEnd,
            animationFrame:animationFrame||this.animator.animations[animationName].defaultEvents.animationFrame
          }
    }
    /**
     * It sets up a function so it's executed each frame
     * @param {Function<dt>} fn The function to be executed each frame
     */
    do(fn){
        this.doStuff.push(fn)
    }

    checkCollisions(){
        let collidings = new Set()
        window.__game.elements.forEach(e=>{
            if(e.id != this.id && this.checkCollision(e))
            collidings.add(e);
        })
        return collidings;
    }
    checkCollision(target){
        return this.checkPointCollision(target.x,target.y,target.r)
    }
    checkPointCollision(x,y,r=0){
        let d = Math.sqrt((this.x-x)**2+(this.y-y)**2)
        return d<(this.r+r)
    }
    /**
     * Moves the gameObject to the specified cords (if sx and sy are specified it only moves them towards the target)
     * @param {Number} x Target X
     * @param {Number} y Target Y
     * @param {Number} v the speed in px/fps
     */
    moveTo(x,y,v=false){
        if(v===false){
            this.x = x;
            this.y = y;
            return;
        }
        let dy = this.y-y;
        let dx = this.x-x;
        let k = v/Math.sqrt(dx**2+dy**2)
        this.x -= dx*k
        this.y -= dy*k
    }
}
/**
 * An array of arrays with animations
 * @typedef {Array<Array[2]>} AnimationFrames
 */
export default GameObject