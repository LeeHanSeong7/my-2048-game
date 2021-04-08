import {buttonSetHeight} from "./buttonSet.js"
let boardElement;
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
    `;
    boardElement.setAttribute(`style`,style);
}
export function readyBoard(){
    boardElement = document.createElement("div");
    boardElement.setAttribute("id", "board");
    container.appendChild(boardElement);
    updateBoardStyle();
}