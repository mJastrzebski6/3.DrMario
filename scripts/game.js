"use strict";

const game = {
    board : document.getElementById("board"),
    children : document.getElementById("board").childNodes,
    colors : ["0099ff", "f8ea3c", "e2b987"],
    isFalling: false,
    active: [[3,0,""],[4,0,""]],
    direction: "horizontal",
    falling: null,
    index:1,
    somethingFell: false,
    stageCompleted: false,
    first: null,
    second: null,

    prepare(){
        bigViruses.creatingBigViruses();
        score.getScores();
        throwing.create();
        playboard.createArray();
        playboard.createTable();
        playboard.addListeners();
        this.generateViruses(4);
        this.addBlock();
    },
    setColor(x, y, what, id, color, alone){
        playboard.array[x][y][0] = what;
        playboard.array[x][y][1] = id;
        playboard.array[x][y][2] = color;
        if(what == "virus") this.children[(y-1)*8+(x-1)].style.backgroundImage = `url("images/smallviruses/${color}-1.png")`;
        else{
            this.children[(y-1)*8+(x-1)].style.backgroundColor ="#" + color;
            let dir = this.findFriend(x, y, id);
            if(dir == "top") this.children[(y-1)*8+(x-1)].style.backgroundImage = `url("images/pills/${color}-1.png")`;
            else if(dir == "right") this.children[(y-1)*8+(x-1)].style.backgroundImage = `url("images/pills/${color}-2.png")`;
            else if(dir == "down") this.children[(y-1)*8+(x-1)].style.backgroundImage = `url("images/pills/${color}-3.png")`;
            else if(dir == "left") this.children[(y-1)*8+(x-1)].style.backgroundImage = `url("images/pills/${color}-4.png")`;
            else if(dir == "none") this.children[(y-1)*8+(x-1)].style.backgroundImage = `url("images/pills/${color}-5.png")`;
            if(alone == "alone") this.children[(y-1)*8+(x-1)].style.backgroundImage = `url("images/pills/${color}-5.png")`;
        }
        //this.children[(y-1)*8+(x-1)].innerHTML = id;
    },
    deleteColor(x,y){
        playboard.array[x][y][0] = "blank";
        playboard.array[x][y][1] = "0";
        playboard.array[x][y][2] = "none";
        this.children[(y-1)*8+(x-1)].style.backgroundColor = "";
        this.children[(y-1)*8+(x-1)].style.backgroundImage = "";
    },
    moveToTheRight(){
        if(this.direction == "horizontal"){
            if(playboard.array[this.active[1][0]+1][this.active[1][1]][2] != "none") return 0;
        }
        else{
            if(playboard.array[this.active[0][0]+1][this.active[0][1]][2] != "none" || playboard.array[this.active[1][0]+1][this.active[1][1]][2] != "none") return 0;
        }
        let id = playboard.array[game.active[0][0]][game.active[0][1]][1];
        this.deleteColor(game.active[0][0], game.active[0][1]);
        this.deleteColor(game.active[1][0], game.active[1][1]);
        this.active[0][0]++;
        this.active[1][0]++;
        this.setColor(game.active[0][0], game.active[0][1], "block", id, game.active[0][2]);
        this.setColor(game.active[1][0], game.active[1][1], "block", id, game.active[1][2]);
        this.setColor(game.active[0][0], game.active[0][1], "block", id, game.active[0][2]);
    },
    moveToTheLeft(){
        if(this.direction == "horizontal"){
            if(playboard.array[this.active[0][0]-1][this.active[0][1]][2] != "none") return 0;
        }
        else{
            if(playboard.array[this.active[0][0]-1][this.active[0][1]][2] != "none" || playboard.array[this.active[1][0]-1][this.active[1][1]][2] != "none") return 0;
        }
        let id = playboard.array[game.active[0][0]][game.active[0][1]][1];
        this.deleteColor(game.active[0][0], game.active[0][1]);
        this.deleteColor(game.active[1][0], game.active[1][1]);
        this.active[0][0]--;
        this.active[1][0]--;
        this.setColor(game.active[0][0], game.active[0][1], "block", id, game.active[0][2]);
        this.setColor(game.active[1][0], game.active[1][1], "block", id, game.active[1][2]);
        this.setColor(game.active[0][0], game.active[0][1], "block", id, game.active[0][2]);
    },
    rotateToTheRight(){
        if(this.direction == "horizontal"){
            if(playboard.array[this.active[0][0]][this.active[0][1]-1][2] != "none") return 0;
            let id = playboard.array[game.active[0][0]][game.active[0][1]][1];
            this.deleteColor(this.active[0][0], this.active[0][1]);
            this.deleteColor(this.active[1][0], this.active[1][1]);
            let tmp = this.active[0][2];
            this.active[0][2] = this.active[1][2];
            this.active[1][2] = tmp;
            
            this.active[1][0]--;
            this.active[1][1]--;
            
            this.setColor(this.active[0][0], this.active[0][1], "block", id, this.active[0][2]);
            this.setColor(this.active[1][0], this.active[1][1], "block", id, this.active[1][2]);
            this.setColor(this.active[0][0], this.active[0][1], "block", id, this.active[0][2]);
            this.direction = "vertical";
        }
        else{
            if(playboard.array[this.active[0][0]+1][this.active[0][1]][2] != "none" && playboard.array[this.active[0][0]-1][this.active[0][1]][2] != "none") return 0;
            if(playboard.array[this.active[0][0]+1][this.active[0][1]][2] != "none"){
                let id = playboard.array[game.active[0][0]][game.active[0][1]][1];
                this.deleteColor(this.active[0][0],this.active[0][1]);
                this.deleteColor(this.active[1][0],this.active[1][1]);
                this.active[0][0]--;
                this.active[1][0]--;
                this.active[1][0]++;
                this.active[1][1]++;
                this.setColor(this.active[0][0], this.active[0][1], "block", id, this.active[0][2]);
                this.setColor(this.active[1][0], this.active[1][1], "block", id, this.active[1][2]);
                this.setColor(this.active[0][0], this.active[0][1], "block", id, this.active[0][2]);
            }
            else{
                let id=playboard.array[game.active[0][0]][game.active[0][1]][1];
                this.deleteColor(this.active[1][0],this.active[1][1]);
                this.active[1][0]++;
                this.active[1][1]++;
                this.setColor(this.active[1][0],this.active[1][1],"block",id,this.active[1][2]);
                this.setColor(this.active[0][0],this.active[0][1],"block",id,this.active[0][2]);
            } 
            this.direction = "horizontal";
        }
    },
    rotateToTheLeft(){  
        if(this.direction == "vertical"){
            let id=playboard.array[game.active[0][0]][game.active[0][1]][1];
            if(playboard.array[this.active[0][0]+1][this.active[0][1]][2] != "none" && playboard.array[this.active[0][0]-1][this.active[0][1]][2] != "none") return 0;
            if(playboard.array[this.active[0][0]+1][this.active[0][1]][2] != "none"){
                this.deleteColor(this.active[0][0],this.active[0][1]);
                this.deleteColor(this.active[1][0],this.active[1][1]);
                this.active[0][0]--;
                this.active[1][0]--;
            }
            else{
                this.deleteColor(this.active[0][0],this.active[0][1]);
                this.deleteColor(this.active[1][0],this.active[1][1]);
            }
            let tmp = this.active[0][2];
            this.active[0][2] = this.active[1][2];
            this.active[1][2] = tmp;
            

            this.active[1][0]++;
            this.active[1][1]++;
            
            this.setColor(this.active[0][0], this.active[0][1], "block", id, this.active[0][2]);
            this.setColor(this.active[1][0], this.active[1][1], "block", id, this.active[1][2]);
            this.setColor(this.active[0][0], this.active[0][1], "block", id, this.active[0][2]);
            this.direction = "horizontal";
        }
        else{
            if(playboard.array[this.active[0][0]][this.active[0][1]-1][2] != "none") return 0;
            let id=playboard.array[game.active[0][0]][game.active[0][1]][1];
            this.deleteColor(this.active[1][0],this.active[1][1]);
            this.active[1][0]--;
            this.active[1][1]--;
            this.setColor(this.active[1][0], this.active[1][1], "block", id, this.active[1][2]);
            this.setColor(this.active[0][0], this.active[0][1], "block", id, this.active[0][2]);
            this.direction = "vertical";
        }
    },
    colorRand(){
        return this.colors[Math.floor(Math.random() * 3)];
    },
    async addBlock(){
        if(playboard.array[4][1][0] != "blank" || playboard.array[5][1][0] != "blank"){
            document.getElementById("game-over").style.visibility = "visible";
            bigViruses.endAnimation();
            score.saveTopScore();
            playboard.lose();
        }
        else if(this.stageCompleted != false){
            document.getElementById("stage-complete").style.visibility = "visible";
            playboard.win();
        }
        else{
            if(this.first == null) this.active = [[4, 1, this.colorRand()],[5, 1, this.colorRand()]];
            else this.active = [[4, 1, this.first],[5, 1, this.second]];
            game.isFalling = true;
            const result = await throwing.throw(game.active[0][2], game.active[1][2]);
            throwing.handUp();
            this.setColor(4, 1, "block", this.index.toString(), this.active[0][2]);
            this.setColor(5, 1, "block", this.index.toString(), this.active[1][2]);
            this.setColor(4, 1, "block", this.index.toString(), this.active[0][2]);
            this.index++;
            this.activeFall(700);
            this.direction = "horizontal";
        }
    },
    activeFall(speed){
        game.falling = setInterval(() => {
            if(game.hitTheGround() == true){
                clearInterval(game.falling);
                game.activeFellDown();
                game.isFalling = true;
                return 0;
            }
            let id = playboard.array[game.active[0][0]][game.active[0][1]][1];
            game.deleteColor(game.active[0][0],game.active[0][1]);
            game.deleteColor(game.active[1][0],game.active[1][1]);
            game.active[0][1]++;
            game.active[1][1]++;
            game.setColor(game.active[0][0], game.active[0][1], "block", id, game.active[0][2]);
            game.setColor(game.active[1][0], game.active[1][1], "block", id, game.active[1][2]);
            game.setColor(game.active[0][0], game.active[0][1], "block", id, game.active[0][2]);
        }, speed);
    },
    activeFastFall(){
        clearInterval(game.falling);
        game.isFalling = true;
        game.activeFall(30);
    },
    hitTheGround(){
        if(this.direction == "horizontal"){
            if(playboard.array[this.active[0][0]][this.active[0][1]+1][2] != "none" || playboard.array[this.active[1][0]][this.active[1][1]+1][2] != "none") return true;
            else return false;
        }
        else{
            if(playboard.array[this.active[0][0]][this.active[0][1]+1][2]!="none") return true;
            else return false;
        }
    },
    async activeFellDown(){
        let destroyableAr = [];
        do{
            this.somethingFell = false; //
            destroyableAr = game.blockDestroying();
            for(let i=0; i<destroyableAr.length; i++){
                let thing = playboard.array[destroyableAr[i][0]][destroyableAr[i][1]][0];
                let ind =   playboard.array[destroyableAr[i][0]][destroyableAr[i][1]][1];
                let color = playboard.array[destroyableAr[i][0]][destroyableAr[i][1]][2];
                game.deleteColor(destroyableAr[i][0], destroyableAr[i][1]);
               
                if(thing == "virus"){
                    this.children[(destroyableAr[i][1]-1)*8+destroyableAr[i][0]-1].style.backgroundImage = `url("images/smallviruses/${color}-0.png")`;
                    this.destroyingPillAnimation((destroyableAr[i][1]-1)*8+destroyableAr[i][0]-1)
                }
                else if(thing == "block"){
                    let dir = this.findFriend(destroyableAr[i][0], destroyableAr[i][1], ind);
                    if(dir == "left")       this.setColor(destroyableAr[i][0]-1, destroyableAr[i][1],   "block", playboard.array[destroyableAr[i][0]-1][destroyableAr[i][1]][1], playboard.array[destroyableAr[i][0]-1][destroyableAr[i][1]][2]);
                    else if(dir == "right") this.setColor(destroyableAr[i][0]+1, destroyableAr[i][1],   "block", playboard.array[destroyableAr[i][0]+1][destroyableAr[i][1]][1], playboard.array[destroyableAr[i][0]+1][destroyableAr[i][1]][2]);
                    else if(dir == "top")   this.setColor(destroyableAr[i][0],   destroyableAr[i][1]-1, "block", playboard.array[destroyableAr[i][0]][destroyableAr[i][1]-1][1], playboard.array[destroyableAr[i][0]][destroyableAr[i][1]-1][2],"alone");
                    else if(dir == "down")  this.setColor(destroyableAr[i][0],   destroyableAr[i][1]+1, "block", playboard.array[destroyableAr[i][0]][destroyableAr[i][1]+1][1], playboard.array[destroyableAr[i][0]][destroyableAr[i][1]+1][2]);
                    
                    this.children[(destroyableAr[i][1]-1)*8+destroyableAr[i][0]-1].style.backgroundImage = `url("images/pills/${color}-0.png")`;
                    if(dir == "top"){
                        const lol = await this.destroyingPillAnimation2((destroyableAr[i][1]-1)*8+destroyableAr[i][0]-1);
                    } 
                    else this.destroyingPillAnimation((destroyableAr[i][1]-1)*8+destroyableAr[i][0]-1);
                }
            }
            score.updateScore();
            game.somethingFell = game.blockFalling();

            while(game.somethingFell == true){
                const result2 = await this.waiting();
            }

            destroyableAr = game.blockDestroying();

        }while(this.somethingFell == true || destroyableAr.length != 0);
        game.addBlock();
    },
    waiting(){
        return new Promise(resolve => {
            setTimeout(() =>{
                game.somethingFell = game.blockFalling();
                resolve("done");
            }, 100);   
        });
    },
    blockDestroying(){
        let blocks = [];
        let temporaryColor;
        let temporaryLength;
        let viruses = [];

        for(let i=1; i<9; i++){ // check vertically
            temporaryLength = 0;
            temporaryColor = "none";
            for(let j=1; j<17; j++){
                if(playboard.array[i][j][2] == temporaryColor){
                   temporaryLength++; 
                    if(j == 16 && temporaryLength > 3 && temporaryColor != "none"){
                        for(let k=0; k<temporaryLength; k++){
                            blocks.push([i,j-k]);
                            if(playboard.array[i][j-k][0] == "virus") viruses.push(playboard.array[i][j-k][2]);
                        } 
                    }
                } 
                else{
                    if(temporaryLength > 3 && temporaryColor != "none"){
                        for(let k=0; k<temporaryLength; k++){
                            blocks.push([i,j-k-1]);
                            if(playboard.array[i][j-k-1][0] == "virus") viruses.push(playboard.array[i][j-k-1][2]);
                        } 
                    }
                    temporaryColor = playboard.array[i][j][2];
                    temporaryLength = 1;
                }
            }
        }
        for(let j=1; j<17; j++){ // check horizontally
            temporaryLength = 0;
            temporaryColor = "none";
            for(let i=1; i<9; i++){
                if(playboard.array[i][j][2] == temporaryColor){
                   temporaryLength++; 
                    if(i==8 && temporaryLength>3 && temporaryColor != "none"){
                        for(let k=0; k<temporaryLength; k++){
                            blocks.push([i-k,j]);
                            if(playboard.array[i-k][j][0] == "virus") viruses.push(playboard.array[i-k][j][2]);
                        } 
                    }
                } 
                else{
                    if(temporaryLength>3 && temporaryColor != "none"){
                        for(let k=0; k<temporaryLength; k++){
                            blocks.push([i-k-1,j]);
                            if(playboard.array[i-k-1][j][0] == "virus") viruses.push(playboard.array[i-k-1][j][2]);
                        } 
                    }
                    temporaryColor = playboard.array[i][j][2];
                    temporaryLength = 1;
                }
            }
        }
        if(viruses.length != 0) bigViruses.destroyAnimation(viruses);
        return blocks;
    },
    blockFalling(){
        let somethingFell = false;
        for(let i=1; i<9; i++){
            for(let j=15; j>0; j--){
                if(playboard.array[i][j][0] == "block"){
                    if(playboard.array[i][j+1][0] == "blank"){
                        let where = this.findFriend(i,j, playboard.array[i][j][1]);
                        if(where == "right"){
                            if(playboard.array[i+1][j+1][0] == "blank"){
                                this.setColor(i, j+1, "block", playboard.array[i][j][1], playboard.array[i][j][2]);
                                this.setColor(i+1, j+1, "block", playboard.array[i+1][j][1], playboard.array[i+1][j][2]);
                                this.deleteColor(i, j);
                                this.deleteColor(i+1, j);
                                this.setColor(i, j+1, "block", playboard.array[i][j+1][1], playboard.array[i][j+1][2]);
                                this.setColor(i+1, j+1, "block", playboard.array[i+1][j+1][1], playboard.array[i+1][j+1][2]);
                                somethingFell = true;
                            }
                        }
                        else if(where == "top"){
                            this.setColor(i, j+1, "block", playboard.array[i][j][1], playboard.array[i][j][2]);
                            this.deleteColor(i, j);
                            this.setColor(i, j, "block", playboard.array[i][j-1][1], playboard.array[i][j-1][2]);
                            this.deleteColor(i, j-1);
                            this.setColor(i, j, "block", playboard.array[i][j][1], playboard.array[i][j][2]);
    
                            somethingFell = true;
                        }
                        else if(where == "none"){

                            this.setColor(i, j+1, "block", playboard.array[i][j][1], playboard.array[i][j][2], "alone");
                            this.deleteColor(i, j);
                            somethingFell = true;
                        }
                    }
                }
            }
        }
        this.refresh();
        return somethingFell;
    },
    findFriend(x,y,id){
        if(playboard.array[x][y-1][1] == id && y!=1)  return "top";
        if(playboard.array[x+1][y][1] == id && x!=8)  return "right";
        if(playboard.array[x-1][y][1] == id && x!=1)  return "left";
        if(playboard.array[x][y+1][1] == id && y!=16) return "down";
        else return "none";
    },
    generateViruses(amount){
        let x = 0;
        let y = 0;
        for(let i=0; i<amount; i++){
            do{
                x = Math.floor(Math.random() * 8) + 1;
                y = Math.floor(Math.random() * 11) + 6;  
            }while(playboard.array[x][y][0] == "virus");
            this.setColor(x, y, "virus", "0", this.colors[i%3]);
        }
    },
    destroyingPillAnimation2(x){
        return new Promise(resolve => {
            setTimeout(() => {
                game.children[x].style.backgroundImage = "";
                resolve("done")
            }, 100)
        });
    },
    destroyingPillAnimation(x){
        setTimeout(() => {
            game.children[x].style.backgroundImage = "";
        }, 100)
    },
    refresh(){
        for(let i=1; i<9; i++){
            for(let j=1; j<17; j++){
                if(playboard.array[i][j][0] == "block") this.setColor(i, j, "block", playboard.array[i][j][1], playboard.array[i][j][2]);
            }
        }
    }
}
