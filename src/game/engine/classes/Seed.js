import GameObject from "./GameObject.js";
import { randomInt, sayRandomJoke } from "../../jokes/karen.js";


class Seed extends GameObject{
    constructor(type, spawnX, spawnY, decay){
    super(spawnX,spawnY,20,18*2,12*2,{
        src:"/src/img/"+type+"_seed.png",
        cellWidth:18,
        cellHeight:12,
        idle:[0,0]
    },false);
    console.log(this.spriteSheat)
    //like:
    this.type = type;
    this.isSeed = true;//yey you did well with this ç
                    // POG
    this.decay = decay;

    this.do((dt) => {
        if(this.decay == 0 || this.decay){
            this.decay -= dt*(1000/window.__game.FPS);//this makes sure you remove the necesary amount so it hits 0 after <decay> ms
            if (this.decay <= 0) {
                this.die()
            } 
        }
    })
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


export default Seed;
