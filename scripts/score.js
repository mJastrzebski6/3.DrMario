"use strict";

const score = {
    allViruses: 4,
    currentPoints: 0,
    levelNumber: 0,
    viruses: 4,

    topScore: document.getElementById("top-score"),
    currentScore: document.getElementById("current-score"),
    level: document.getElementById("level"),
    activeViruses: document.getElementById("active-viruses"),
    
    getScores(){
        if(!localStorage.getItem('topScore')) {
            localStorage.setItem('topScore', 0);
        }
        this.topScore.innerHTML = this.numberToImages(localStorage.getItem("topScore"), 7); 
        this.currentScore.innerHTML = this.numberToImages(this.currentPoints, 7);
        this.level.innerHTML = this.numberToImages(this.levelNumber, 2) 
        this.activeViruses.innerHTML = this.numberToImages(this.allViruses, 2);
        
    },
    updateScore(){
        let remainingViruses = 0;
        for(let i=1; i<9; i++){
            for(let j=1; j<17; j++){
                if(playboard.array[i][j][0] == 'virus') remainingViruses++;
            }
        }
        if(remainingViruses == 0) game.stageCompleted = true;
        if(this.viruses-remainingViruses != 0){
            this.currentPoints = this.currentPoints+(this.viruses-remainingViruses)*100;
            this.viruses = remainingViruses;
            this.currentScore.innerHTML = this.numberToImages(this.currentPoints, 7);
            this.activeViruses.innerHTML = this.numberToImages(this.viruses, 2);
        }
    },
    saveTopScore(){
        if(localStorage.getItem('topScore') < score.currentPoints) localStorage.setItem('topScore', score.currentPoints);
    },
    numberToImages(number, digits){
        let length = number.toString().length;
        let resultString = "";
        let string = number.toString();

        for(let i=0; i<digits-length; i++){
            resultString += "<img src='images/digits/0.png'>";
        }
        for(let i=0; i<length; i++){
            resultString += `<img src='images/digits/${string[i]}.png'>`;
        }
        return resultString;
    }
}