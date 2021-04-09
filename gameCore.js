import * as board from "./components/board.js"
import * as buttonSet from "./components/buttonSet.js"

//const windowSize = [screen.availHeight,screen.availWidth];

//config
let restartButton = {
    "onPress": restartOnclick,
    "text":"restart",
};
let backButton = {
    "onPress": backOnclick,
    "text":"back",
};

//innerInfo
const clear = 11;
let boardWidth = 4; 
let tileSet=[];
let emptyCount = 0;
let fourRatio = 0.2;

//innerFunction
function generateTile(tiles){
    if(emptyCount == 0){
        onLoseEvent();
        return false;
    }
    let randNum = Math.random()*(emptyCount);
    for(let i=0; randNum >= 0; i++){
        if (tiles[i] == 0){
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
    console.log(tiles);
    board.drawTiles(tileSet.slice(),boardWidth);
    return true;
}
function setGame(size){
    //init
    emptyCount = size*size;
    //clearBoard
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
                    temp[i+1] += 1;
                    temp.splice(i,1);
                    emptyCount += 1;
                }
            }
            const leng = temp.length;
            for(let i=0; i<size-leng; i++)
                temp.push(0);
            console.log(temp);
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
        
        tileSet = moveTiles(tileSet,boardWidth,direction);
        //board.drawTiles(tileSet.slice(),boardWidth);
        generateTile(tileSet);
    }
    startMpos=null;
}
function onResizeEvent(event){
    board.updateBoardStyle();
    buttonSet.updateButtonSetStyle();
}
function onLoseEvent(){
    alert("fail!");
}
function restartOnclick(){
    setGame(boardWidth);
}
function backOnclick(){
    generateTile(tileSet);
}

//initialize
window.addEventListener("resize",onResizeEvent,false);
window.addEventListener("focus",onResizeEvent,false);
  
buttonSet.readyButtonSet();
buttonSet.updateButtonSet([restartButton,backButton]);
board.readyBoard();
board.boardElement.addEventListener("mousedown",onMouseDown,false);
document.getElementsByTagName("body")[0].addEventListener("mouseup",onMouseUp,false);
//test//
board.boardElement.addEventListener("touchstart",onMouseDown,false);
document.getElementsByTagName("body")[0].addEventListener("touchend",onMouseUp,false);
  
setGame(boardWidth);