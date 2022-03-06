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
            "#SpawnXCord:SpawnYCord:SeedType:decay(in ms)"
                e.g
            the seed will desapear after the decay has passed if specified
         - Enemy:
            "directionLetter(W or E) Row(0 to 9 included):"ype:fakerandom(put ? to set random):waitingtime(in ms)

                e.g "E2:brown;E7:brown:?:400"
            this enemy and all other enemies after it will start moving after the waiting time has passed if specified
    */
    //tutorial levels
    ["cyan","#:200:200:red:3000;W5:brown:2000","#:300:300:red:30000;E2:brown;E7:brown","W3:brown;W6:brown;E2:brown"],
    ["cyan","W5:yellow","can u make a fun level here made out of only yellows and or browns?"],
    ["cyan","W5:black","can u make a fun level here made out of only blacks?"],
    ["cyan","W5:red","can u make a fun level here made out of only reds?"],
    //god tier madman levels
    ["black","E0:yellow;E1:yellow;E2:yellow;E3:yellow:600;E3:yellow;E4:yellow;E5:yellow;E6:yellow;E7:yellow;E8:yellow;E9:yellow","E0:black;W1:black;E2:black;W3:black;E4:black;W5:black;E6:black;W7:black;E8:black;W9:black","W3:yellow;E8:yellow"],
    ["black","E0:dotted;W8:yellow;E0:dotted:600;W8:yellow;E0:dotted:600;W8:yellow;E0:dotted:600;W8:yellow;E0:dotted:600;W8:yellow;E0:dotted:600;W8:yellow;E0:dotted:600;W8:yellow;E0:dotted:600;W8:yellow","W0:yellow;W2:yellow;W5:yellow;W7:yellow;W9:yellow;W1:yellow:500;W4:yellow;W6:yellow;W8:yellow;W0:yellow:500;W2:yellow;W5:yellow;W7:yellow;W9:yellow;W1:yellow:500;W3:yellow;W6:yellow;W8:yellow"],
    ["black","E0:red;E4:yellow:200;E5:yellow;E4:yellow:200;E5:yellow;E4:yellow:200;E5:yellow;E4:yellow:200;E5:yellow;E4:yellow:200;E5:yellow;E0:yellow:200;E9:yellow;E0:yellow:200;E9:yellow;E0:yellow:200;E9:yellow;E0:yellow:200;E9:yellow;E0:yellow:200;E9:yellow;E0:yellow:200;E9:yellow","E0:black"]
]
export default levels;

  