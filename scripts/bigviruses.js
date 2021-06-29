"use strict";

const bigViruses = {
    red: document.getElementById("big-red-virus-div"),
    yellow: document.getElementById("big-yellow-virus-div"),
    blue: document.getElementById("big-blue-virus-div"),

    movingInterval: null,
    danceInterval: null,
    waitingTimeout: null,
    smilingInterval: null,

    redWait: false,
    yellowWait: false,
    blueWait: false,

    mIndex: 0,
    stop: false,

    creatingBigViruses(){
        this.red.style.backgroundImage = 'url("images/magnifier/red/1.png")';
        this.blue.style.backgroundImage = 'url("images/magnifier/blue/1.png")';
        this.yellow.style.backgroundImage = 'url("images/magnifier/yellow/1.png")';
        this.animateVirusDance();
        this.moveViruses();
    },
    animateVirusDance(){
        let numbers = [1, 2, 3, 2];
        let index = 0;
        this.danceInterval = setInterval(() => {
            if(bigViruses.redWait == false) bigViruses.red.style.backgroundImage = `url("images/magnifier/red/${numbers[index]}.png")`;
            if(bigViruses.blueWait == false) bigViruses.blue.style.backgroundImage = `url("images/magnifier/blue/${numbers[index]}.png")`;
            if(bigViruses.yellowWait == false) bigViruses.yellow.style.backgroundImage = `url("images/magnifier/yellow/${numbers[index]}.png")`;
            index++;
            if(index == 4) index=0;
        }, 300);
    },
    moveViruses(){     
        let positions = [[170,30], [112,53], [86,86], [40,120], [17,183], [34,216], [50,250], [91,280], [132,330], [173,330], [214,330], [255,280],[300,250], [316,220], [332,190], [310,140], [290,112], [230,66]];
        this.movingInterval = setInterval(() => {
            bigViruses.red.style.left = positions[bigViruses.mIndex][0] + "px";
            bigViruses.red.style.top = positions[bigViruses.mIndex][1] + "px";
            bigViruses.blue.style.left = positions[(bigViruses.mIndex+6)%18][0] + "px";
            bigViruses.blue.style.top = positions[(bigViruses.mIndex+6)%18][1] + "px";
            bigViruses.yellow.style.left = positions[(bigViruses.mIndex+12)%18][0] + "px";
            bigViruses.yellow.style.top = positions[(bigViruses.mIndex+12)%18][1] + "px";
            bigViruses.mIndex++;
            if(bigViruses.mIndex == 18) bigViruses.mIndex = 0;
        }, 1000);
    },
    endAnimation(){
        clearInterval(this.movingInterval);
        clearInterval(this.danceInterval);

        document.getElementById("end-mario").style.backgroundImage = "url(images/marios/go_dr.png)";
        let index = 2;
        this.smilingInterval = setInterval(() => {
            if(index == 2){
                if(bigViruses.redWait == false) bigViruses.red.style.backgroundImage = 'url("images/magnifier/red/2.png")';
                if(bigViruses.blueWait == false) bigViruses.blue.style.backgroundImage = 'url("images/magnifier/blue/2.png")';
                if(bigViruses.yellowWait == false) bigViruses.yellow.style.backgroundImage = 'url("images/magnifier/yellow/2.png")';
                index = 4;
            }
            else{               
                if(bigViruses.redWait == false) bigViruses.red.style.backgroundImage = 'url("images/magnifier/red/4.png")';
                if(bigViruses.blueWait == false) bigViruses.blue.style.backgroundImage = 'url("images/magnifier/blue/4.png")';
                if(bigViruses.yellowWait == false) bigViruses.yellow.style.backgroundImage = 'url("images/magnifier/yellow/4.png")';
                index = 2;
            }
        }, 300);
    },
    destroyAnimation(destroyedVirusesArray){
        let red=0; let redA=0;
        let blue=0; let blueA=0;
        let yellow=0; let yellowA=0;
        for(let i=1; i<9; i++){
            for(let j=1; j<17; j++){
                if(playboard.array[i][j][2] == "0099ff" && playboard.array[i][j][0] == "virus") blue++;
                if(playboard.array[i][j][2] == "f8ea3c" && playboard.array[i][j][0] == "virus") yellow++;
                if(playboard.array[i][j][2] == "e2b987" && playboard.array[i][j][0] == "virus") red++; 
            }    
        }
        for(let i=0; i<destroyedVirusesArray.length; i++){
            if(destroyedVirusesArray[i] == "0099ff") blueA++;
            if(destroyedVirusesArray[i] == "f8ea3c") yellowA++;
            if(destroyedVirusesArray[i] == "e2b987") redA++;
        }
        
        clearInterval(this.movingInterval);
        if(this.stop == true) clearTimeout(bigViruses.waitingTimeout);
        this.stop = true;
        let unique = [...new Set(destroyedVirusesArray)];
        for(let i=0; i<unique.length; i++){
            if(unique[i] == "0099ff"){                                                                        //blue
                this.blueWait = true;
                let number = 1;
                let dying = setInterval(() => {
                    if(number == 1){
                        bigViruses.blue.style.backgroundImage = 'url("images/magnifier/blue/d1.png")';
                        number = 2;
                    }
                    else{
                        bigViruses.blue.style.backgroundImage = 'url("images/magnifier/blue/d2.png")';
                        number = 1;
                    }
                }, 500)
                setTimeout(() => {
                    clearInterval(dying);
                    if(blue == 1 || blue == blueA) bigViruses.blue.style.backgroundImage = '';
                    else bigViruses.blueWait = false;

                }, 4000)
            } 
            if(unique[i] == "f8ea3c"){                                                                        //yellow
                this.yellowWait = true;
                let number = 1;
                let dying = setInterval(() => {
                    if(number == 1){
                        bigViruses.yellow.style.backgroundImage = 'url("images/magnifier/yellow/d1.png")';
                        number = 2;
                    }
                    else{
                        bigViruses.yellow.style.backgroundImage = 'url("images/magnifier/yellow/d2.png")';
                        number = 1;
                    }
                }, 500)
                setTimeout(() => {
                    clearInterval(dying);
                    if(yellow == 1 || yellow == yellowA) bigViruses.yellow.style.backgroundImage = '';
                    else bigViruses.yellowWait = false;
                }, 4000)
            } 
            if(unique[i] == "e2b987"){                                                                        //red
                this.redWait = true;
                let number = 1;
                let dying = setInterval(() => {
                    if(number == 1){
                        bigViruses.red.style.backgroundImage = 'url("images/magnifier/red/d1.png")';
                        number = 2;
                    }
                    else{
                        bigViruses.red.style.backgroundImage = 'url("images/magnifier/red/d2.png")';
                        number = 1;
                    }
                }, 500)
                setTimeout(() => {
                    clearInterval(dying);
                    if(red == 1 || red == redA) bigViruses.red.style.backgroundImage = '';
                    else bigViruses.redWait = false;
                }, 4000)
            } 
        }
        this.waitingTimeout = setTimeout(() => {
            bigViruses.moveViruses();
            bigViruses.stop = false;
        }, 4000)
    }
}