import GameObject from "./GameObject.js";


class Seed extends GameObject{
    constructor(type, spawnX, spawnY, decay){
    super(spawnX,spawnY,5,4*3,4*3,{
        src:"/src/img/"+type+".png",
        cellWidth:4,
        cellHeight:4,
        idle:[0,0]
    },false);
    //like:
    this.type = type;
    this.isSeed = true;//yey you did well with this --> I understand some things
                    // POG
    this.decay = decay;

    this.do((dt) => {
        this.decay -= dt*(1000/window.__game.FPS);//this makes sure you remove the necesary amount so it hits 0 after <decay> ms
        if (this.decay <= 0) {
            window.__game.elements.remove(this.id)// I think this wasn't the mistake, the error still shows
        }
    })
    }
}


export default Seed;
