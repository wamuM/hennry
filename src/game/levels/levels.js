const levels = [
    /*
**   ## How To create more levels
     ==================================
     level placeholder:
        ["sky_colour","round1","round2","round3","round4",...] 
        once all spawnable entities are gone the next round will start
                 e.g ["cyan","W5:dotted;E1:brown;E8:brown:2000","W3:black;E1:dotted:2000"],
     round placeholder:
        "spawnedElement;spawnedElement;spawnedElement;..."
                 e.g "W5:dotted;E1:brown;E8:brown:2000"
     spawnedElement placeholder:
         - Seeds:
            "#:SpawnXCord:SpawnYCord:SeedType:decay(in ms)"
                e.g
            the seed will desapear after the decay has passed if specified
         - Enemy:
            "directionLetter(W or E) Row(0 to 9 included):"ype:fakerandom(put ? to set random):waitingtime(in ms)

                e.g "E2:brown;E7:brown:?:400"
            this enemy and all other enemies after it will start moving after the waiting time has passed if specified
    */
            ["blue","W0:yellow;W5:yellow;W1:yellow:?:400;W6:yellow;W2:yellow:?:400;W7:yellow;W3:yellow:?:400;W8:yellow;W4:yellow:?:400;W9:yellow;W4:yellow:?:400;W9:yellow;W3:yellow:?:400;W8:yellow;W2:yellow:?:400;W7:yellow;W1:yellow:?:400;W6:yellow;W0:yellow:?:400;W5:yellow;W0:yellow:?:400;W5:yellow;W1:yellow:?:400;W6:yellow;W2:yellow:?:400;W7:yellow;W3:yellow:?:400;W8:yellow;W4:yellow:?:400;W9:yellow;W4:yellow:?:400;W9:yellow;W3:yellow:?:400;W8:yellow;W2:yellow:?:400;W7:yellow;W1:yellow:?:400;W6:yellow;W0:yellow:?:400;W5:yellow","W0:brown;E1:brown;W2:brown;E3:brown;W4:black:300;W5:black:300;E4:black:410;E5:black:410;W6:brown;E7:brown;W8:brown;E9:brown","W1:brown;W3:brown;W6:brown;W8:brown;W4:yellow:?:300;W5:yellow;W4:yellow:?:1000;W5:yellow;W4:yellow:?:1000;W5:yellow;W4:yellow:?:1000;W5:yellow"],
            ["cyan","W2:brown","W2:brown:?:200;W4:brown:?:200;W4:brown:?:700;W6:brown:?:200;W8:brown:?:200"],
            ["cyan","W2:yellow","W0:yellow;W2:yellow;W6:yellow;W8:yellow","W0:yellow;W2:yellow;W4:yellow;W9:yellow:?:600;W7:yellow;W5:yellow;W0:yellow:?:600;W2:yellow;W4:yellow;W9:yellow:?:600;W7:yellow;W5:yellow;W0:yellow:?:600;W2:yellow;W4:yellow;W9:yellow:?:600;W7:yellow;W5:yellow","#:80:300:green:4000"],
            ["cyan","W2:black:600","W2:black;W4:black;W3:black:?:500;W5:black","W0:black;E1:black;W2:black;E3:black;W4:black;E7:black;W8:black;E9:black","#:80:300:green:4000"],
            ["blue","W0:yellow;W5:yellow;W1:yellow:?:400;W6:yellow;W2:yellow:?:400;W7:yellow;W3:yellow:?:400;W8:yellow;W4:yellow:?:400;W9:yellow;W4:yellow:?:400;W9:yellow;W3:yellow:?:400;W8:yellow;W2:yellow:?:400;W7:yellow;W1:yellow:?:400;W6:yellow;W0:yellow:?:400;W5:yellow;W0:yellow:?:400;W5:yellow;W1:yellow:?:400;W6:yellow;W2:yellow:?:400;W7:yellow;W3:yellow:?:400;W8:yellow;W4:yellow:?:400;W9:yellow;W4:yellow:?:400;W9:yellow;W3:yellow:?:400;W8:yellow;W2:yellow:?:400;W7:yellow;W1:yellow:?:400;W6:yellow;W0:yellow:?:400;W5:yellow","W0:brown;E1:brown;W2:brown;E3:brown;W4:black:300;W5:black:300;E4:black:410;E5:black:410;W6:brown;E7:brown;W8:brown;E9:brown","W1:brown;W3:brown;W6:brown;W8:brown;W4:yellow:?:300;W5:yellow;W4:yellow:?:1000;W5:yellow;W4:yellow:?:1000;W5:yellow;W4:yellow:?:1000;W5:yellow"],
        
            
            
            ["cyan","#:200:200:green;W5:brown:2000","E2:brown;E7:brown","W3:brown;W6:brown;E2:brown"],
            ["cyan","W5:yellow","E5:yellow;W3:brown", "W5:brown;E3:yellow;W2:brown","E2:yellow;W5:brown;E2:yellow"], // can u make a fun level here made out of only yellows and or browns?
            ["cyan","W5:black","W6:black:1000;W8:black;E7:black;W9:black:3000", "W1:black;W9:black;E3:black;E7:black;W5:black"],//only blacks
            ["cyan","W5:red","E3:red;W3:red", "E1:red::500;E7:red:300;W1:red:900;W7:red:1100"],//reds
            //god tier madman levels
            ["black","E0:yellow;E1:yellow;E2:yellow;E3:yellow:600;E3:yellow;E4:yellow;E5:yellow;E6:yellow;E7:yellow;E8:yellow;E9:yellow","E0:black;W1:black;E2:black;W3:black;E4:black;W5:black;E6:black;W7:black;E8:black;W9:black","W3:yellow;E8:yellow"],
            ["black","E0:dotted;W8:yellow;E0:dotted:600;W8:yellow;E0:dotted:600;W8:yellow;E0:dotted:600;W8:yellow;E0:dotted:600;W8:yellow;E0:dotted:600;W8:yellow;E0:dotted:600;W8:yellow;E0:dotted:600;W8:yellow","W0:yellow;W2:yellow;W5:yellow;W7:yellow;W9:yellow;W1:yellow:500;W4:yellow;W6:yellow;W8:yellow;W0:yellow:500;W2:yellow;W5:yellow;W7:yellow;W9:yellow;W1:yellow:500;W3:yellow;W6:yellow;W8:yellow"],
            ["black","E0:red;E4:yellow:200;E5:yellow;E4:yellow:200;E5:yellow;E4:yellow:200;E5:yellow;E4:yellow:200;E5:yellow;E4:yellow:200;E5:yellow;E0:yellow:200;E9:yellow;E0:yellow:200;E9:yellow;E0:yellow:200;E9:yellow;E0:yellow:200;E9:yellow;E0:yellow:200;E9:yellow;E0:yellow:200;E9:yellow","E0:black"]
]    
export default levels;

  