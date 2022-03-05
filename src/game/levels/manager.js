import levels from "./levels.js";
import createEnemy from "./enemies.js";
import { sayRandomJoke } from "../jokes/karen.js";

function loadLevel(levelId) {
    if(levelId == 0)return;
    if(levelId >= levels.length)return sayRandomJoke("win");
    let current = levels[levelId]//current level
    let rounds = [];
    let tbr = []
    //set sky
    window.__game.sky = current[0];
    current.shift();
    current.forEach((round)=>{
        let enemies = []
        let totalwait = 0
        round.split(";").forEach((enemyData)=>{
            let data = enemyData.split(":")
            let enemyObject = createEnemy(data[1],data[0][0],data[0][1]);
            enemyObject.waitMs = totalwait+(Number.parseInt(data[2])||0);
            totalwait = enemyObject.waitMs
            enemies.push(enemyObject);
        })
        rounds.push(enemies)
    })
    window.__game.rounds = rounds;
    window.__game.round = 0;
    window.__game.enemiesCount = rounds[window.__game.round].length;
    window.__game.elements.add(...rounds[window.__game.round])
}

export default loadLevel;