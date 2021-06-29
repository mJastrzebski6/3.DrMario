"use strict";

const playboard = {
    array: [],
    listener: 0,
    spamming: false,
    backgroundColors : [[121, 174, 62],[150, 275, 70],[227, 57, 50],[58, 151, 100],[263, 147, 100],[26, 150, 139],
                        [92, 101, 208],[55, 92, 80],[92, 289, 52],[142, 141, 129],[263, 107, 50],[37, 214, 76],
                        [220, 19, 70],[257, 244, 139],[14, 168, 87],[304, 124, 119],[66, 264, 204],[250, 336, 30],[333, 51, 42]
                        ],
    createArray(){
        for (let i=0; i<10; i++) {
            this.array[i] = [];
            for(let j=0; j<18; j++){
                if(i == 0 || j == 0 ||  i == 9  || j == 17) this.array[i][j] = 1;
                else this.array[i][j] = ["blank", "0", "none"];
            }
        }
    },
    createTable(){
        let playboard = document.getElementById("board");

        for(let i=0; i<128; i++){
            let box = document.createElement("div");
            box.classList.add("box");
            playboard.appendChild(box);
        }
    },
    addListeners(){
        document.addEventListener("keydown", (event) => {
            if(game.isFalling == false && playboard.spamming == false){
                playboard.spamming = true;
                     if (event.key == "a" || event.key == "ArrowLeft")  game.moveToTheLeft(); 
                else if (event.key == "d" || event.key == "ArrowRight") game.moveToTheRight(); 
                else if (event.key == "w" || event.key == "ArrowUp")    game.rotateToTheRight(); 
                else if (event.key == "s" || event.key == "ArrowDown")  game.activeFastFall(); 
                else if (event.key == "Shift")                          game.rotateToTheLeft(); 
                setTimeout(() => {
                    playboard.spamming = false;
                }, 90);
            }    
        });
        document.addEventListener("keydown", (event) => {
            if(event.key != "Control") return;

            if(playboard.listener == 2){
                playboard.listener = 0;
                playboard.nextLevel();
            }
            else if(playboard.listener == 1){
                playboard.listener = 0;
                playboard.restart();
            }
        });      
    },
    win(){
        setTimeout(() => {
            playboard.listener = 2;
        }, 4000); 
    },
    nextLevel(){
        playboard.resetVariables();

        score.allViruses += 4;
        score.viruses = score.allViruses;
        score.levelNumber++;
        document.getElementById("background").style.filter=`hue-rotate(${this.backgroundColors[score.levelNumber-1][0]}deg)saturate(${this.backgroundColors[score.levelNumber-1][1]}%)brightness(${this.backgroundColors[score.levelNumber-1][2]}%)`;
        document.getElementById("stage-complete").style.visibility = "hidden";
        if(score.allViruses > 88){
            score.saveTopScore();
            return 0; 
        } 
        else playboard.start();
    },
    lose(){
        playboard.listener = 1;
    },
    restart(){
        playboard.resetVariables();
        clearInterval(bigViruses.smilingInterval);
        
        document.getElementById("end-mario").style.backgroundImage = "";
        document.getElementById("game-over").style.visibility = "hidden";
        document.getElementById("background").style.filter = "";
        score.allViruses = 4;
        score.currentPoints = 0;
        score.levelNumber = 0;
        score.viruses = 4;
        
        playboard.start();
    },
    resetVariables(){
        // clearing array
        for (let i=1; i<9; i++) {
            for(let j=1; j<17; j++){
                game.deleteColor(i, j);
            }
        }
        // clearing board divs
        let x = document.getElementById("board").childNodes;
        for (let i=0; i<128; i++) x[i].style.backgroundColor = "";
        
        game.isFalling = false;
        game.active = [[3,0,""],[4,0,""]];
        game.direction = "horizontal";
        clearInterval(game.falling);
        game.falling = null;
        game.index = 1;
        game.somethingFell = false,
        game.stageCompleted = false;
        game.first = null;
        game.second = null;
        bigViruses.redWait = false;
        bigViruses.yellowWait = false;
        bigViruses.blueWait = false;
        bigViruses.mIndex = 0;
        bigViruses.stop = false;
        clearTimeout(bigViruses.waitingTimeout);
        clearInterval(bigViruses.movingInterval);
        clearInterval(bigViruses.danceInterval);
        bigViruses.waitingTimeout = null;
        bigViruses.movingInterval = null;
        bigViruses.danceInterval = null;
        bigViruses.smilingInterval = null;
    },
    start(){
        bigViruses.creatingBigViruses();
        score.getScores();
        game.generateViruses(score.allViruses);
        game.addBlock();
    }
}