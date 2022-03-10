//? This file has the class that defines what a Chicken is
import GameObject from "./GameObject.js"
import * as jokes from "../../jokes/karen.js"

class Chicken extends GameObject{
  constructor(x,y,chickenSprite){
    super(x,y,18,chickenSprite.cellWidth*3,chickenSprite.cellHeight*3,chickenSprite,false)
    
    this.setAnimation("walk-left",
        [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9]],
        22
    )
    this.setAnimation("walk-right",
        [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9]],
        22
    )
    this.setAnimation("eat-left",
        [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8]],
        22
    )
    this.setAnimation("eat-right",
        [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8]],
        22
    )
    this.HP = 100;
    this.damageCooldown = 0
    this._meta.looking = false;
    this._meta.lastanimationname = false
    this.do(()=>{
      if( this.damageCooldown >0){
        this.damageCooldown-=1;
      }

    })
  }
  lookTowards(target,animationname){
    if(animationname != this._meta.lastanimationname){
        this._meta.looking = false;
        this._meta.lastanimationname = animationname;
    }
    if(this.x>target.x && this.x-target.x>5 && this._meta.looking !="left"){
      this._meta.looking = "left"
      this.animate(animationname+"-left")
    }else if (this.x-target.x<-5 && this._meta.looking !="right"){
      this._meta.looking = "right"
      this.animate(animationname+"-right")
    }

  }
  
  set HP(v){
    if(this.isPlayer){
      localStorage.setItem("HP",v);
      document.getElementById("HP").innerText = v;
    }
    this.__HP = v
  }
  get HP(){
    return this.__HP
  }
}

export default Chicken;