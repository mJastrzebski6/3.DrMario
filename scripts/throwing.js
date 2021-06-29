"use strict";

const throwing = {
    throwBox: document.getElementById("throw"),
    smallThrowBox: document.getElementById("throw").childNodes,
    create(){
        for(let i=0;i<96;i++){
            let box = document.createElement("div");
            box.classList.add("box");
            this.throwBox.appendChild(box);
        }
    },
    handUp(){
        this.smallThrowBox[95].style.backgroundImage = '';

        this.smallThrowBox[59].style.backgroundImage = 'url(images/marios/hands/up_1.png)';
        this.smallThrowBox[71].style.backgroundImage = 'url(images/marios/hands/up_2.png)';
        this.smallThrowBox[83].style.backgroundImage = 'url(images/marios/hands/up_3.png)';
    },
    handMiddle(){
        this.smallThrowBox[59].style.backgroundImage = '';

        this.smallThrowBox[70].style.backgroundImage = 'url(images/marios/hands/middle_11.png)';
        this.smallThrowBox[71].style.backgroundImage = 'url(images/marios/hands/middle_12.png)';
        this.smallThrowBox[82].style.backgroundImage = 'url(images/marios/hands/middle_21.png)';
        this.smallThrowBox[83].style.backgroundImage = 'url(images/marios/hands/middle_22.png)';
    },
    handDown(){
        this.smallThrowBox[70].style.backgroundImage = '';
        this.smallThrowBox[71].style.backgroundImage = '';
        this.smallThrowBox[82].style.backgroundImage = '';

        this.smallThrowBox[83].style.backgroundImage = 'url(images/marios/hands/down_1.png)';
        this.smallThrowBox[95].style.backgroundImage = 'url(images/marios/hands/down_2.png)';
    },
    throw(first, second){
        return new Promise(resolve => {
            let boxes1 = [[46,2], [46,1], [34,4], [21,3], [20,2], [20,1], [20,4], [7,3], [18,2], [18,1], [18,4], [5,3], [16,2], [16,1], [16,4], [3,3], [14,2], [14,1], [26,4], [13,3], [24,2], [36,2], [48,2], [60,2]];
            let boxes2 = [[47,4], [34,3], [33,2], [33,1], [21,4], [8, 3], [19,2], [19,1], [19,4], [6,3], [17,2], [17,1], [17,4], [4,3], [15,2], [15,1], [15,4], [2,3], [25,2], [25,1], [25,4], [37,4], [49,4], [61,4]];
            let index = 0;
            let throwInterval = setInterval(() => {
                if(index == 0) throwing.handUp();
                if(index == 4) throwing.handMiddle();
                if(index == 7) throwing.handDown();
                if(index == 24){
                    game.first = game.colorRand();
                    game.second = game.colorRand();
                    clearInterval(throwInterval);
                    throwing.smallThrowBox[boxes1[index-1][0]].style.backgroundImage = '';
                    throwing.smallThrowBox[boxes2[index-1][0]].style.backgroundImage = '';  
                    throwing.smallThrowBox[boxes1[0][0]].style.backgroundImage = `url("images/pills/${game.first}-2.png")`;
                    throwing.smallThrowBox[boxes2[0][0]].style.backgroundImage = `url("images/pills/${game.second}-4.png")`; 
                    game.isFalling = false;
                    resolve("done");
                }
                else{
                    if(index != 0){
                        throwing.smallThrowBox[boxes1[index-1][0]].style.backgroundImage = '';
                        throwing.smallThrowBox[boxes2[index-1][0]].style.backgroundImage = '';
                    }
                    throwing.smallThrowBox[boxes1[index][0]].style.backgroundImage = `url("images/pills/${first}-${boxes1[index][1]}.png")`;
                    throwing.smallThrowBox[boxes2[index][0]].style.backgroundImage = `url("images/pills/${second}-${boxes2[index][1]}.png")`;
                    index++;
               }
            }, 15);
        });
    }
}