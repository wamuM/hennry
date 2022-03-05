import START from "./engine/loop.js";
import Chicken from "./engine/classes/Chicken.js";
import GameObject    from "./engine/classes/GameObject.js";
import { sayRandomJoke } from "./jokes/karen.js";
import loadLevel from "./levels/manager.js";

//! Settings
window.__game = {};
window.__game.debug = false;//must be false
window.__game.frameStop = false;//must be false
window.__game.sky = "cyan";
window.__game.zfight = 5;
window.__game.FPS = 45;
window.__game.round ="none";


/*//--------------------------------------------------------------
                             T a r g e t 
*///--------------------------------------------------------------

let target = new GameObject(200,200,5,12*3,12*3,{
    src:"/src/img/cross.png",
    cellWidth:12,
    cellHeight:12,
    idle:[0,0]
},false);

target.do(()=>{
        if (window.clientY > 100) { // ensures that the target isn't being placed in the sky
            if (window.pressedKeys.has('left_click')) {
            target.moveTo(window.clientX,window.clientY) //moves the target to the mouse's position
        }
    }
})
target.isEnemy = false;


/*//--------------------------------------------------------------
                            P  l a  y  e  r
*///--------------------------------------------------------------

let player = new Chicken(100,140,{
    src:"https://cdn.glitch.global/47dac7fb-5622-487a-8efa-0644a564c6e7/chicken.png?v=1644180661751",
    cellWidth:38,
    cellHeight:25,
    idle:[0,0]
})
player.isPlayer = true;
player.damage = 10;
player.speed  = 4;

player.do((dt)=>{
    //movement
    if(window.pressedKeys.has("left_click"))player.speed += 4;
    if(!player.checkCollision(target))player.moveTo(target.x, target.y, player.speed*dt);
    if(window.pressedKeys.has("left_click"))player.speed -= 4;
    player.lookTowards(target,"walk")

    //damage
    if(player.damageCooldown%2 == 1)player.hidden = true;
    else player.hidden = false;
    player.checkCollisions().forEach(e=>{
        if(e.isEnemy &&player.damageCooldown<=0){
            player.HP -= 10;
            player.damageCooldown = 90;
            if(player.HP <= 50) {
                sayRandomJoke("lowHealth",{hp:player.HP})
            }
            if(player.HP<0){
                window.__game.frameStop = true;
                sayRandomJoke("death")
                return;
            }   
        }if(e.isSeed) {
            switch (e.type) {
                case "green":
                    player.HP += 20;
                    break;
                case "red":
                    player.speed += 2;
                default:
                    break;
            }
        }
    });
})


/*//-----------------------------------------------------------------------------------
                    L e v e l    M a n a g e m e n t
*///-----------------------------------------------------------------------------------
window.__game.level = Number.parseInt(localStorage.getItem("level"))||1;
document.getElementById("nextlevel").addEventListener("click",()=>{
    document.getElementById("nextlevel").style.display = "none";
    loadLevel(window.__game.level)
    document.getElementById("LvL").innerText = window.__game.level;
});

/*//-----------------------------------------------------------------------------------
                                    I n t r o
*///-----------------------------------------------------------------------------------
let startArray = [//put here whatever u want to draw at the start
    player,
    target,
   ];

setTimeout(()=>{document.getElementById("hennry_puns").style.display = "none"},5000)

if(!localStorage.getItem("name")){//if no saved data
document.getElementById("start").addEventListener("click",()=>{//get name from intro popup
    localStorage.setItem("name",document.getElementById("name").value==""?"henelope":document.getElementById("name").value)
    document.getElementById("introbox").style.display = "none";
    START(startArray);
});}
else {//if yes saved data
    document.getElementById("introbox").style.display = "none"
    window.__game.frameStop = true;
    document.getElementById("canvas_box").style.border ="5px solid blue";
    START(startArray);
};
