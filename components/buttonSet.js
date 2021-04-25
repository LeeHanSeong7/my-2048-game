//buttonset
let buttonSetSize = 75;
let buttonSet;
export function updateButtonSetStyle(){
    let style=`
        height: ${buttonSetSize};
        min-width: 100%;
        display: flex;
        align-item: center;
        justify-content: center;
        /*background-color: orange;*/
    `;
    buttonSet.setAttribute(`style`,style);
}
export function readyButtonSet(){
    buttonSet = document.createElement("div");
    buttonSet.setAttribute("id", "buttonSet");
    container.appendChild(buttonSet);
    updateButtonSetStyle();
}

//buttonlist
const bdr_rad = 15;
const tb_margin = 3;
const defaultStyle=`
    background-color: peru;
    flex:1;
    max-width:100px;

    margin-top: ${tb_margin-1}px;
    margin-bottom: ${tb_margin}px;
    margin-left: 3%;
    margin-right: 3%;

    border-radius: ${bdr_rad}px;
    border: solid 0px;
    
    font-size: 1.5em;
    text-align: center;
    line-height: ${buttonSetSize-2*tb_margin}px;
`;

export function updateButtonSet(buttonList){
    buttonList.forEach(item=>{
        let element=document.createElement("div");
        element.setAttribute('style', defaultStyle);
        element.setAttribute('class', "no_select");
        element.addEventListener('click',item["onPress"]);
        element.innerText=item["text"];
        buttonSet.appendChild(element);
    });
}