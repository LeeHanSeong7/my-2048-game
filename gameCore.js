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
    board.drawTiles(tileSet.slice(),size);
}

//eventListeners
function onClickEvent(event){
    // let x = event.offsetX;
    // let y = event.offsetY;
    generateTile(tileSet);
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
}

//initialize
window.addEventListener("resize",onResizeEvent,false);
window.addEventListener("focus",onResizeEvent,false);
document.getElementById("container").addEventListener("click",onClickEvent,false);
    
buttonSet.readyButtonSet();
buttonSet.updateButtonSet([restartButton,backButton]);
board.readyBoard();
setGame(boardWidth);