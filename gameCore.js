import * as board from "./components/board.js"
import * as buttonSet from "./components/buttonSet.js"

//const windowSize = [screen.availHeight,screen.availWidth];

//innerInfo
const clear = 11;
let boardWidth = 4; 
let tileSet=[];
let emptyCount = 0;
let fourRatio = 0.2;

//innerFunction
function generateTile(tiles){
    let randNum = Math.random()*(emptyCount);
    let effectPos = null;
    for(let i=0; randNum >= 0; i++){
        if (tiles[i] == 0){
            effectPos = i;
            randNum -= 1;
            if (randNum < 0){
                let rand2 = Math.random();
                if(rand2 > fourRatio)
                    tiles[i] = 1;
                else
                    tiles[i] = 2;
                emptyCount -= 1;
                break;
            }
        }
    }
    board.drawTiles(tiles.slice(),boardWidth);
    if (emptyCount == 0 && checkFail()){
        onLoseEvent();
    }
    board.effectMaker(Math.floor(effectPos/boardWidth),effectPos%boardWidth, boardWidth);
    return true;
}
function setGame(size){
    //init
    emptyCount = size*size;
    //clearBoard
    tileSet = [];
    for(let i=0; i<emptyCount; i++){
        tileSet[i] = 0;
    }
    //
    generateTile(tileSet);
}
function moveTiles(tiles, size, dirc){//up:0, down: 1, left: 2, right: 3
    function logic1(arrSet){
        for(let k=0; k<arrSet.length; k++){
            let temp = [];
            arrSet[k].forEach(e=>{
                if (e != 0) temp.push(e);
            });
            for(let i=0; i<temp.length; i++){
                if (temp[i] == temp[i+1]){
                    if(temp[i+1] == clear-1){
                        onWinEvent();
                    }
                    temp[i+1] += 1;
                    temp.splice(i,1);
                    emptyCount += 1;
                }
            }
            const leng = temp.length;
            for(let i=0; i<size-leng; i++)
                temp.push(0);
            arrSet[k] = temp;
        }
    }
    let arrSet = [];
    let res = [];
    switch(dirc){
        case(0):
            for(let i=0; i<size; i++){
                let temp =[];
                for(let j=0; j<size; j++){temp.push(tiles[i*size+j]);}
                arrSet.push(temp);
            }
            logic1(arrSet);
            for(let i=0; i<size; i++){
                for(let j=0; j<size; j++){res[i*size+j] = arrSet[i][j];}
            }
        break;
        case(1):
            for(let i=0; i<size; i++){
                let temp =[];
                for(let j=size-1; j>=0; j--){temp.push(tiles[i*size+j]);}
                arrSet.push(temp);
            }
            logic1(arrSet);
            for(let i=0; i<size; i++){
                for(let j=0; j<size; j++){res[i*size+(size-j-1)] = arrSet[i][j];}
            }
        break;
        case(2):
            for(let i=0; i<size; i++){
                let temp =[];
                for(let j=0; j<size; j++){temp.push(tiles[i+j*size]);}
                arrSet.push(temp);
            }
            logic1(arrSet);
            for(let i=0; i<size; i++){
                for(let j=0; j<size; j++){res[i+j*size] = arrSet[i][j];}
            }
        break;
        case(3):
            for(let i=0; i<size; i++){
                let temp =[];
                for(let j=size-1; j>=0; j--){temp.push(tiles[i+j*size]);}
                arrSet.push(temp);
            }
            logic1(arrSet);
            for(let i=0; i<size; i++){
                for(let j=0; j<size; j++){res[i+(size-j-1)*size] = arrSet[i][j];}
            }
        break;   
    }
    return res;
}
function checkFail(){
    let copy = tileSet.slice();
    let EC = emptyCount;
    const str = JSON.stringify(tileSet);

    for(let dirc = 0; dirc<=3; dirc++){
        let temp = moveTiles(copy,boardWidth, dirc);
        if (JSON.stringify(temp) != str){
            emptyCount = EC;
            return false;
        }
    }
    emptyCount = EC;
    return true;
}

//eventListeners
let startMpos= null;
function onMouseDown(event){
    startMpos = [event.pageX,event.pageY ];
}
function onMouseUp(event){
    if (startMpos == null) return false;
    const arrive = [event.pageX,event.pageY];
    const threshold = document.getElementById("board").offsetHeight/8;
    //check direction
    const xmove = startMpos[0]-arrive[0];
    const ymove = startMpos[1]-arrive[1];
    const distance = Math.sqrt(xmove**2+ymove**2);
    let direction;//up:0, down: 1, left: 2, right: 3
    if (distance > threshold){
        if (Math.abs(xmove) < Math.abs(ymove)){
            if (ymove > 0) direction=0;
            else direction=1;
        }
        else{
            if (xmove > 0) direction=2;
            else direction=3;
        }
        let res = tileSet.slice();
        tileSet = moveTiles(tileSet,boardWidth,direction);
        if (JSON.stringify(tileSet) != JSON.stringify(res)){
            generateTile(tileSet);
        }
    }
    startMpos=null;
}
function onKeyPressed(event){
    let direction = null;
    switch(event.key){
        case("ArrowUp"): direction = 0;
        break;
        case("ArrowDown"): direction = 1;
        break;
        case("ArrowLeft"): direction = 2;
        break;
        case("ArrowRight"): direction = 3;
        break;
    }    
    if (direction != null){
        let res = tileSet.slice();
        tileSet = moveTiles(tileSet,boardWidth,direction);
        if (JSON.stringify(tileSet) != JSON.stringify(res)){
            generateTile(tileSet);
        }
    }
}
function onResizeEvent(event){
    board.updateBoardStyle();
    buttonSet.updateButtonSetStyle();
}
function onLoseEvent(){
    alert("fail!");
}
function onWinEvent(){
    alert("congratuation!");
}

//config
let restartButton = {
    "onPress": ()=>{
        while(true){
            boardWidth = prompt("game size","2 ~ 10");
            if(!Number.isNaN(boardWidth) || 2<=boardWidth<=10){
                boardWidth = Math.floor(boardWidth);
                break;
            }
        }
        setGame(boardWidth);
        onResizeEvent();
    },
    "text":"restart",
};
let upButton = {
    "onPress": ()=>{
        let res = tileSet.slice();
        tileSet = moveTiles(tileSet,boardWidth,0);
        if (JSON.stringify(tileSet) != JSON.stringify(res)){
            generateTile(tileSet);
        }
    },
    "text":"up",
};
let downButton = {
    "onPress": ()=>{
        let res = tileSet.slice();
        tileSet = moveTiles(tileSet,boardWidth,1);
        if (JSON.stringify(tileSet) != JSON.stringify(res)){
            generateTile(tileSet);
        }
    },
    "text":"down",
};
let leftButton = {
    "onPress": ()=>{
        let res = tileSet.slice();
        tileSet = moveTiles(tileSet,boardWidth,2);
        if (JSON.stringify(tileSet) != JSON.stringify(res)){
            generateTile(tileSet);
        }
    },
    "text":"left",
};
let righttButton = {
    "onPress": ()=>{
        let res = tileSet.slice();
        tileSet = moveTiles(tileSet,boardWidth,3);
        if (JSON.stringify(tileSet) != JSON.stringify(res)){
            generateTile(tileSet);
        }
    },
    "text":"right",
};

//initialize
window.addEventListener("resize",onResizeEvent,false);
window.addEventListener("focus",onResizeEvent,false);
window.addEventListener("fullscreenchange",onResizeEvent,false);
window.addEventListener("keydown",onKeyPressed);


buttonSet.readyButtonSet();
buttonSet.updateButtonSet([restartButton,upButton,downButton,leftButton,righttButton]);
board.readyBoard();
board.boardElement.addEventListener("mousedown",onMouseDown,false);
document.getElementsByTagName("body")[0].addEventListener("mouseup",onMouseUp,false);
//test//
// board.boardElement.addEventListener("touchstart",onMouseDown,false);
// document.getElementsByTagName("body")[0].addEventListener("touchend",onMouseUp,false);
window.addEventListener("touchstart",onMouseDown,false);
window.addEventListener("touchend",onMouseUp,false);
  
setGame(boardWidth);