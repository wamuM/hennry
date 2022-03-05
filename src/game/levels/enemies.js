import Chicken from "../engine/classes/Chicken.js";
import { randomInt, sayRandomJoke } from "../jokes/karen.js";
//height:450px;
//width:740px;
function createEnemy(type,spawnDirection,spawnPosition){

    //create the chicken
    let spawnY =100+spawnPosition*35;
    let spawnX,v;
    let enemy = new Chicken(0,spawnY,{
        src:"/src/img/"+type+".png",
        cellWidth:38,
        cellHeight:25,
        idle:[0,0]
    })
    //Change orientation
    switch(spawnDirection){
        case "W":
            spawnX = -50;
            enemy.animate("walk-right")
            v = 1;
        break;
        case "E":
            spawnX = 790;
            enemy.animate("walk-left")
            v = -1;
        break;
    }
    enemy.x = spawnX
    enemy.y = spawnY
    enemy.changeMovement = randomInt(0, 740)
    enemy.isEnemy = true;
    enemy.do((dt)=>{
        if(enemy.waitMs){
            enemy.waitMs -= dt*(1000/window.__game.FPS)
            if(enemy.waitMs<=0)enemy.waitMs = false;
            return;
        }
        //movement
        switch(type){
            case "black"://he randomly stops and goes the other way 
                if(spawnDirection == "W"){
                    if(!enemy.changeMovement)enemy.changeMovement = randomInt(100, 740)
                    if(enemy.x>enemy.changeMovement){
                        v = -1;
                        enemy.animate("walk-left")
                    }
                }else{
                    if(!enemy.changeMovement)enemy.changeMovement = randomInt(50, 640)
                    if(enemy.x<enemy.changeMovement){
                        v = 1;
                        enemy.animate("walk-right")
                    }
                }
                enemy.x += 5*dt*v;
            break;
            case "brown":
                enemy.x += 5*dt*v;
            break;
            case "dotted"://he randomly stops and goes south
                    //if(!enemy.changeMovement)enemy.changeMovement = randomInt(100, 740)
                    //enemy.changeMovement = randomInt(0, 740)
                    if(enemy.x <= enemy.changeMovement){
                        enemy.x += 3*dt*v;
                    }else{
                        enemy.y += 7*dt;
                    } 
                 
            break;
            case "green"://he just randomly moves
                let moveX = randomInt(3,6)// random X speed
                let moveY = randomInt(3,6)// random Y speed
                let chooseMovement = randomInt(0,4); 
                if (enemy.previousMove <= 2) {
                   chooseMovement = randomInt(0, 4) - 0.5;
                } else {
                    chooseMovement = randomInt(0, 4) + 0.5;
                }
                if(chooseMovement == 0 ) {
                    enemy.x += moveX*dt*v;
                
                } else {
                    enemy.y += moveY*dt*v
                }
                enemy.previousMove = chooseMovement;// Nice
            break
            case "light"://No clue, I was thinking about him having a trail of little chickens behind but sounds too op --> well Op it iss
                    enemy.counter = 0
                    let chickenFollow = new Chicken(enemy.x-1, enemy.y, {
                        src:"../../img/light.png",
                        cellWidth:38,
                        cellHeight:25,
                        idle:[0,0]
                        })
                    window.__game.elements.add(chickenFollow)
                    chickenFollow.w = 38
                    chickenFollow.h = 25
                    chickenFollow.do((_dt) => {
                        chickenFollow.moveTo(enemy.x,enemy.y, 2);
                    }) 
                        
               // }
                enemy.x += 3*dt*v;
                
            break;
            case "red"://he bounces on the south and north wall until he gets to the other side
                if(!enemy.bouncing)enemy.bouncing=false;// what is this for?
                //just to make sure nothing weird happens with truthy/falsy shit but it's indeed useless, like you
                enemy.x += 3*dt*v;   
                if(enemy.bouncing){
                        enemy.y += 5*dt;        
                }else{
                    enemy.y -= 5*dt;   
                }
                //collisions here pls
                if(enemy.y <= 100) enemy.bouncing = !enemy.bouncing;
                if(enemy.y >= 450) enemy.bouncing = !enemy.bouncing;
            break;
            case "yellow"://Speeeed
                enemy.x += 9*dt*v;
            break;
        }
        //death/vanishing
        if(-55>enemy.x||enemy.x>800 || 50>enemy.y||enemy.y>510){
            window.__game.elements.remove(enemy.id)  
            window.__game.enemiesCount -= 1;
            //Nextlevel/round
            if(window.__game.enemiesCount <=0){
                //next round
                window.__game.round +=1;
                if(window.__game.round<window.__game.rounds.length){ 
                    sayRandomJoke("nextRound")
                    window.__game.enemiesCount = window.__game.rounds[window.__game.round].length;//load round
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

    });
    return enemy;
}

export default createEnemy;