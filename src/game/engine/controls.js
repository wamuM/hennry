function checkControls(key){
    switch(key){
        case "m"://mute
        break;
        case "d"://debug
            window.__game.debug = !window.__game.debug;
        break;
        case "l"://explore
            if(window.__game.round=="none")
            document.getElementById("nextlevel").dispatchEvent(new Event("click"))
        break;
        case " "://skip dialogue
            document.getElementById("hennry_puns").style.display ="none"
        break;
        case "x"://deletes all data
            if(confirm("Are you sure you wan't to delete all your data?"))localStorage.clear();
        break;
        case "p"://pause frame callback loop
            window.__game.frameStop = !window.__game.frameStop;
            window.__game.nextFrame();
            if(window.__game.frameStop)document.getElementById("canvas_box").style.border ="5px solid blue";
            else document.getElementById("canvas_box").style.border = "none";
        break;
        case "n"://next frame (only if paused frame and debug mode on)
            if(window.__game.frameStop&&window.__game.debug)window.__game.nextFrame();
        break;
    }

}

export default checkControls;