export let boardElement;
//config
const tileMargin = 0.01; //%
const boradColor = "bisque";
//
export function updateBoardStyle(){
    const bdr_rad = 10;
    let style=`
        border-radius: ${bdr_rad}px;
        background-color: ${boradColor};
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
    let style=`
        flex:1;
        max-height: ${document.getElementById("container").offsetWidth};
        width:${document.getElementById("board").offsetHeight};
    `;
    boardElement.setAttribute(`style`,style);
    updateBoardStyle();
}
export function drawTiles(tiles,size){
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }
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
                
                background-image: url("../source/image/number_${tile}.png");
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
//