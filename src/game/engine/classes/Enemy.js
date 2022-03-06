import Chicken from "./Chicken.js";
import { randomInt, sayRandomJoke } from "../../jokes/karen.js";
//height:450px;
//width:740px;
class Enemy extends Chicken{
    constructor(type,spawnDirection,spawnPosition){
        super(0,100+spawnPosition*35,{//creates a chicken
            src:"/src/img/"+type+".png",
            cellWidth:38,
            cellHeight:25,
            idle:[0,0]
        })
        this.v = 0;
        switch(spawnDirection){
            case "W":
                this.x = -50;
                this.animate("walk-right")
                this.v = 1;
            break;
            case "E":
                this.x = 790;
                this.animate("walk-left")
                this.v = -1;
            break;
        }
  
        this.isEnemy = true;

        this.do((dt)=>{
            if(this.waitMs){
                this.waitMs -= dt*(1000/window.__game.FPS)
                if(this.waitMs<=0)this.waitMs = false;
                return;
            }
            //movement
            switch(type){
                case "black"://he randomly stops and goes the other way 
                    if(spawnDirection == "W"){
                        if(!this.changeMovement)this.changeMovement = this.fakeRandom??randomInt(100, 740)
                        if(this.x>this.changeMovement){
                            this.v = -1;
                            this.animate("walk-left")
                        }
                    }else{
                        if(!this.changeMovement)this.changeMovement = this.fakeRandom??randomInt(50, 640)
                        if(this.x<this.changeMovement){
                            this.v = 1;
                            this.animate("walk-right")
                        }
                    }
                    this.x += 5*dt*this.v;
                break;
                case "brown":
                    this.x += 5*dt*this.v;
                break;
                case "dotted"://he randomly stops and goes south
                        if(!this.changeMovement)this.changeMovement = this.fakeRandom??randomInt(100, 740)
                        if(this.x <= this.changeMovement){
                            this.x += 3*dt*this.v;
                        }else{
                            this.y += 7*dt;
                        } 
                     
                break;
                case "green"://he just randomly moves
                    let moveX = randomInt(3,6)// random X speed
                    let moveY = randomInt(3,6)// random Y speed
                    let chooseMovement = randomInt(0,4); 
                    if (this.previousMove <= 2) {
                       chooseMovement = randomInt(0, 4) - 0.5;
                    } else {
                        chooseMovement = randomInt(0, 4) + 0.5;
                    }
                    if(chooseMovement == 0 ) {
                        this.x += moveX*dt*this.v;
                    
                    } else {
                        this.y += moveY*dt*this.v
                    }
                    this.previousMove = chooseMovement;// Nice
                break
                case "light"://No clue, I was thinking about him having a trail of little chickens behind but sounds too op --> well Op it iss
                        this.counter = 0
                        let chickenFollow = new Chicken(this.x-1, this.y, {
                            src:"../../img/light.png",
                            cellWidth:38,
                            cellHeight:25,
                            idle:[0,0]
                            })
                        window.__game.elements.add(chickenFollow)
                        chickenFollow.w = 38
                        chickenFollow.h = 25
                        chickenFollow.do((_dt) => {
                            chickenFollow.moveTo(this.x,this.y, 2);
                        }) 
                            
                   // }
                    this.x += 3*dt*this.v;
                    
                break;
                case "red"://he bounces on the south and north wall until he gets to the other side
                    if(!this.bouncing)this.bouncing=false;// what is this for?
                    //just to make sure nothing weird happens with truthy/falsy shit but it's indeed useless, like you
                    this.x += 3*dt*this.v;   
                    if(this.bouncing){
                            this.y += 5*dt;        
                    }else{
                        this.y -= 5*dt;   
                    }
                    //collisions here pls
                    if(this.y <= 100) this.bouncing = !this.bouncing;
                    if(this.y >= 450) this.bouncing = !this.bouncing;
                break;
                case "yellow"://Speeeed
                    this.x += 9*dt*this.v;
                break;
            }
            //death/vanishing
            if(-55>this.x||this.x>800 || 50>this.y||this.y>510)this.die();
    
        });
    }
    die(){
        window.__game.elements.remove(this.id)  
        window.__game.spawnedElementCount -= 1;
                       //Nextlevel/round
                       if(window.__game.spawnedElementCount <=0){
                        //next round
                        window.__game.round +=1;
                        if(window.__game.round<window.__game.rounds.length){ 
                            sayRandomJoke("nextRound")
                            window.__game.spawnedElementCount = window.__game.rounds[window.__game.round].length;//load round
                            window.__game.elements.add(...window.__game.rounds[window.__game.round])
                            return;
                        }
                        //next level
                        document.getElementById("nextlevel").style.display = "block";
                        window.__game.round = "none";
                        window.__game.level += 1;
                        localStorage.setItem("level",window.__game.level)
                        sayRandomJoke("nextLevel")
                        return;
                    }
    }
}

export default Enemy;