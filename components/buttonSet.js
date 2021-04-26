//buttonset
let buttonSetSize = 45;
export function updateButtonSetStyle(target){
    let style=`
        height: ${buttonSetSize};
        min-width: 100%;
        display: flex;
        align-item: center;
        justify-content: center;
        /*background-color: orange;*/
    `;
    target.setAttribute(`style`,style);
}
export function readyButtonSet(id){
    let buttonSet = document.createElement("div");
    buttonSet.setAttribute("id", id);
    container.appendChild(buttonSet);
    updateButtonSetStyle(buttonSet);
    return buttonSet;
}

//buttonlist
const bdr_rad = 15;
const tb_margin = 3;
const def_color = "peru";
const defaultStyle=`
    flex:1;
    max-width:100px;

    margin-top: ${tb_margin}px;
    margin-bottom: ${tb_margin}px;
    margin-left: 3%;
    margin-right: 3%;

    border-radius: ${bdr_rad}px;
    border: solid 0px;
    
    color: powderblue;
    font-size: 1.0em;
    text-align: center;
    line-height: ${buttonSetSize-2*tb_margin}px;
`;
const blankStyle=`
    flex:1;
    max-width:100px;

    margin-top: ${tb_margin}px;
    margin-bottom: ${tb_margin}px;
    margin-left: 3%;
    margin-right: 3%;

    visibility: hidden;

`;


export function updateButtonSet(buttonList,target){
    buttonList.forEach(item=>{
        let element=document.createElement("div");
        if(item == null){
            element.setAttribute('style', blankStyle);
        }
        else{
            if(item["color"] == undefined){
                element.setAttribute('style', defaultStyle+`
                background-color: ${def_color};
                `);
            }
            else {
                element.setAttribute('style', defaultStyle+`
                background-color: ${item["color"]};
                `);
            }
            element.addEventListener('click',item["onPress"]);
            element.innerText=item["text"];
        }
        element.setAttribute('class', "no_select");
        target.appendChild(element);
    });
}