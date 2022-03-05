import levels from "./levels.js";
import Enemy from "../engine/classes/Enemy.js";
import Seed from "../engine/classes/Seed.js";
import { sayRandomJoke } from "../jokes/karen.js";

function loadLevel(levelId) {
    if(levelId == 0)return;
    if(levelId >= levels.length+1)return sayRandomJoke("win");
    let current = levels[levelId-1]//current level
    let rounds = [];
    let tbr = []
    //set sky
    window.__game.sky = current[0];
    current.shift();
    current.forEach((round)=>{
        let elements = []
        let totalwait = 0
        round.split(";").forEach((rawData)=>{
             rawData = rawData.replace(" ","")//remove spaces
             let data = rawData.split(":");

            if(rawData[0] == "#"){//if the element is a seed
                //data.shift();//removes the # --> isn't this an array of strings?
                //**                           type        x                        y                decay[ms]
                let seedObject = new Seed(data[2],Number.parseInt(data[0]),Number.parseInt(data[1]), data[3]) 
                elements.push(seedObject);
            }else{
                //if the element is an enemy
                //**                             type  direction    row     
                let enemyObject = new Enemy(data[1],data[0][0],data[0][1]);
                
                //fake random [optional]
                enemyObject.fakeRandom = Number.parseInt(data[2]);

                //time to wait [optional]
                enemyObject.waitMs = totalwait+(Number.parseInt(data[3])||0);
                totalwait = enemyObject.waitMs

                elements.push(enemyObject);
            }
        })
        rounds.push(elements)
    })
    window.__game.rounds = rounds;
    window.__game.round = 0;
    window.__game.spawnedElementCount = rounds[window.__game.round].length;
    window.__game.elements.add(...rounds[window.__game.round])
}

export default loadLevel;