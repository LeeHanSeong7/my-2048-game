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
        let res = arrSet.slice();

        for(let k=0; k<size; k++){
            let item = res[k];
            
            for(let i=0; i<item.length; i++){
                if (item[i] != 0){
                    for(let j=i; j<0; j--){
                        if (item[j-1] == 0){
                            item.splice(j-1,1); item.push(0);
                        }
                        else if (item[j-1] == item[j]){
                            item[j] += 1;
                            item.splice(j-1,1); item.push(0);
                            emptyCount -= 1;
                        }
                    }
                }
            }

            res[k] = item;
        }

        return res.slice();
    }
    let arrSet = [];
    switch(dirc){
        case(0):
        for(let i=0; i<size; i++){
            let temp =[];
            for(let j=0; j<size; j++){temp.push(tiles[i*size+j]);}
            arrSet.push(temp);
        }
        arrSet = logic1(arrSet);
        console.log(arrSet);
        break;
        case(1):
        for(let i=0; i<size; i++){
            let temp =[];
            for(let j=size-1; j>=0; j--){temp.push(tiles[i*size+j]);}
            arrSet.push(temp);
        }
        console.log(arrSet);
        break;
        case(2):
        for(let i=0; i<size; i++){
            let temp =[];
            for(let j=0; j<size; j++){temp.push(tiles[i+j*size]);}
            arrSet.push(temp);
        }
        console.log(arrSet);
        break;
        case(3):
        for(let i=0; i<size; i++){
            let temp =[];
            for(let j=size-1; j>=0; j--){temp.push(tiles[i+j*size]);}
            arrSet.push(temp);
        }
        console.log(arrSet);
        break;   
    }
}

//eventListeners
let startMpos= null;
function onMouseDown(event){
    startMpos = [event.pageX,event.pageY ];
}
function onMouseUp(event){
    if (startMpos == null) return false;
    const arrive = [event.pageX,event.pageY ];
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
        
        moveTiles(tileSet,boardWidth,direction);
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
  
setGame(boardWidth);