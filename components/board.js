//config
const tileMargin = 0.01; //%
const boardColor = "rgb(94, 68, 40)";
const effectColor = "rgb(225, 255, 250)";
const effectDelay = 1;
const imagePath = "image/high_resol"
//init
export let boardElement;
export function readyBoard(id){
    boardElement = document.createElement("div");
    boardElement.setAttribute("id", id);
    container.appendChild(boardElement);
    let style=`
        flex:1;
        max-height: ${document.getElementById("container").offsetWidth};
        width:${document.getElementById("board").offsetHeight};
    `;
    boardElement.setAttribute(`style`,style);
    updateBoardStyle();
    return boardElement;
}
//
export function updateBoardStyle(){
    const bdr_rad = 10;
    let style=`
        border-radius: ${bdr_rad}px;
        background-color: ${boardColor};
        flex:1;
        max-height: ${document.getElementById("container").offsetWidth};
        width:${document.getElementById("board").offsetHeight};
        
        display: flex; 
        flex-direction: column;
        flex-wrap: wrap;
        position: relative;
    `;
    boardElement.setAttribute(`style`,style);
}
export function removeTiles(){
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }
}
export function drawTiles(tiles,size){
    removeTiles();
    const bdr_rad = 10;
    let tileStyle=`
        width: ${(100/size)*(1-tileMargin*2)}%;
        height: ${(100/size)*(1-tileMargin*2)}%;
        margin: ${(100/size)*tileMargin}%;
        border-radius: ${bdr_rad}px;
    `;
    tiles.forEach(tile=>{
        const element = document.createElement("div");
        element.setAttribute('class', 'tile no_select');
        if(tile != 0){
            element.setAttribute('style', tileStyle+`
                background-color: rgba(${255*((12-tile)/11)},${155*((12-tile)/11)},${0},1);
                display:flex;
                align-items: center;
                
                background-image: url("https://raw.githubusercontent.com/LeeHanSeong7/my-2048-game/main/source/${imagePath}/number_${tile}.png");
                background-repeat: no-repeat;
                background-position: center center;
                background-size: contain;
            `);
        }
        else{
            element.setAttribute('style', tileStyle);
        }
        boardElement.appendChild(element);
    });
}
export function effectMaker(x,y,size){
    let effectElement = document.createElement("div");
    effectElement.setAttribute("id", "effect");

    const bdr_rad = 10;
    let tileEffect=`
        position: absolute;
        top: ${(100/size)*y}%;
        left: ${(100/size)*x}%;
        
        width: ${(100/size)*(1-tileMargin*2)}%;
        height: ${(100/size)*(1-tileMargin*2)}%;
        margin: ${(100/size)*tileMargin}%;
        border-radius: ${bdr_rad}px;
        opacity: 0;

        background-color: ${effectColor};
        animation: fadeOut ${effectDelay}s;
    `;
    effectElement.setAttribute(`style`,tileEffect);
    boardElement.appendChild(effectElement)
}
//