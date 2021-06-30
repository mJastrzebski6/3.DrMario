"use strict";

const bigViruses = {
    red: document.getElementById("big-red-virus-div"),
    yellow: document.getElementById("big-yellow-virus-div"),
    blue: document.getElementById("big-blue-virus-div"),

    movingInterval: null,
    danceInterval: null,
    waitingTimeout: null,
    smilingInterval: null,

    mIndex: 0,
    
    remainingBlues: 0,
    remainingYellows: 0,
    remainingReds: 0,

    blueDyingInterval: null,
    yellowDyingInterval: null,
    redDyingInterval: null,

    createBigViruses(){
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
            if(this.redDyingInterval == null) bigViruses.red.style.backgroundImage = `url("images/magnifier/red/${numbers[index]}.png")`;
            if(this.blueDyingInterval == null) bigViruses.blue.style.backgroundImage = `url("images/magnifier/blue/${numbers[index]}.png")`;
            if(this.yellowDyingInterval == null) bigViruses.yellow.style.backgroundImage = `url("images/magnifier/yellow/${numbers[index]}.png")`;
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
                bigViruses.red.style.backgroundImage = 'url("images/magnifier/red/2.png")';
                bigViruses.blue.style.backgroundImage = 'url("images/magnifier/blue/2.png")';
                bigViruses.yellow.style.backgroundImage = 'url("images/magnifier/yellow/2.png")';
                index = 4;
            }
            else{               
                bigViruses.red.style.backgroundImage = 'url("images/magnifier/red/4.png")';
                bigViruses.blue.style.backgroundImage = 'url("images/magnifier/blue/4.png")';
                bigViruses.yellow.style.backgroundImage = 'url("images/magnifier/yellow/4.png")';
                index = 2;
            }
        }, 300);
    },
    destroyAnimation(destroyedVirusesArray){
        clearInterval(this.movingInterval);
        let blues = 0;
        let yellows = 0;
        let reds = 0;

        destroyedVirusesArray.forEach(element => {
            if(element == "0099ff"){
                this.remainingBlues--;
                blues++;
            }
            if(element == "f8ea3c"){
                this.remainingYellows--;
                yellows++;
            }
            if(element == "e2b987"){
                this.remainingReds--;
                reds++;
            }
        });
        if(reds>0){
            let number = 1;
            setTimeout(() => {
                clearInterval(this.redDyingInterval);
                this.redDyingInterval = null;
                if(this.remainingReds == 0){
                    bigViruses.red.style.backgroundImage = '';
                    this.redDyingInterval = "noMoreReds";
                } 
            }, 4000);
            clearInterval(this.redDyingInterval);
            this.redDyingInterval = setInterval(() => {
                if(number == 1 ){
                    bigViruses.red.style.backgroundImage = 'url("images/magnifier/red/d1.png")';
                    number = 2
                }
                else{
                    bigViruses.red.style.backgroundImage = 'url("images/magnifier/red/d2.png")';
                    number = 1;
                }
            }, 500);
        }
        if(blues>0){
            let number = 1;
            setTimeout(() => {
                clearInterval(this.blueDyingInterval);
                this.blueDyingInterval = null;
                if(this.remainingBlues == 0){
                  bigViruses.blue.style.backgroundImage = ''; 
                  this.blueDyingInterval = "noMoreBlues";
                } 
            }, 4000);
            clearInterval(this.blueDyingInterval);
            this.blueDyingInterval = setInterval(() => {
                if(number == 1 ){
                    bigViruses.blue.style.backgroundImage = 'url("images/magnifier/blue/d1.png")';
                    number = 2
                }
                else{
                    bigViruses.blue.style.backgroundImage = 'url("images/magnifier/blue/d2.png")';
                    number = 1;
                }
            }, 500);
        }
        if(yellows>0){
            let number = 1;
            setTimeout(() => {
                clearInterval(this.yellowDyingInterval);
                this.yellowDyingInterval = null;
                if(this.remainingYellows == 0){
                    bigViruses.yellow.style.backgroundImage = '';
                    this.yellowDyingInterval = "noMoreYellows";
                } 
            }, 4000);
            clearInterval(this.yellowDyingInterval);
            this.yellowDyingInterval = setInterval(() => {
                if(number == 1 ){
                    bigViruses.yellow.style.backgroundImage = 'url("images/magnifier/yellow/d1.png")';
                    number = 2
                }
                else{
                    bigViruses.yellow.style.backgroundImage = 'url("images/magnifier/yellow/d2.png")';
                    number = 1;
                }
            }, 500);          
        }
        clearTimeout(this.waitingTimeout);
        this.waitingTimeout = setTimeout(() => {
            this.moveViruses();
        }, 4000);
    }
}