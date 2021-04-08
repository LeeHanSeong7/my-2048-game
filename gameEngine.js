import * as board from "./components/board.js"
import * as buttonSet from "./components/buttonSet.js"

const windowSize = [screen.availHeight,screen.availWidth];
const basicTile = {
    "size": null,
    "pos": [],
}
const boardInfo = {
    "tileNum" : 4,
    "tileSet" : [],
}

//initialize
function startGame(){
}

function init(){
    window.addEventListener("resize",onResizeEvent,false);
    window.addEventListener("focus",onResizeEvent,false);
    document.getElementById("container").addEventListener("click",onClickEvent,false);
    
    buttonSet.readyButtonSet();
    board.readyBoard();
}
init();
//eventListeners
function onClickEvent(event){
    let x = event.offsetX;
    let y = event.offsetY;
}
function onResizeEvent(event){
    var container = document.getElementById("container");
    board.updateBoardStyle();
    buttonSet.updateButtonSetStyle();
}