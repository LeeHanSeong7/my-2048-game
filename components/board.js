export let boardElement;
//config
const tileMargin = 0.05; //%

//
export function updateBoardStyle(){
    let style=`
        flex:1;
        max-height: ${document.getElementById("container").offsetWidth};
        width:${document.getElementById("board").offsetHeight};
    `;
    boardElement.setAttribute(`style`,style);
    style=`
        background-color: blue;
        flex:1;
        max-height: ${document.getElementById("container").offsetWidth};
        width:${document.getElementById("board").offsetHeight};
        
        display: flex; 
        flex-direction: column;
        flex-wrap: wrap;
    `;
    boardElement.setAttribute(`style`,style);
}
export function readyBoard(){
    boardElement = document.createElement("div");
    boardElement.setAttribute("id", "board");
    container.appendChild(boardElement);
    updateBoardStyle();
}
export function drawTiles(tiles,size){
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }
    let tileStyle=`
        width: ${(100/size)*(1-tileMargin*2)}%;
        height: ${(100/size)*(1-tileMargin*2)}%;
        margin: ${(100/size)*tileMargin}%;
    `;
    tiles.forEach(tile=>{
        const element = document.createElement("div");
        if(tile != 0){
            tileStyle += `
                background-color: rgba(${255*((12-tile)/11)},${155*((12-tile)/11)},${0},1);
                font-size: larger;
                `;
            element.innerText=2**tile;
        }
        else{
            tileStyle += `
                background-color: gray;
                `;
        }
        element.setAttribute('class', 'tile no_select');
        element.setAttribute('style', tileStyle);
        boardElement.appendChild(element);
    });
}
//