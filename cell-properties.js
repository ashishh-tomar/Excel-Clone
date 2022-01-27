// Storage
let sheetDB=[];

for(let i=0;i<row;i++)
{
    let sheetRow=[];
    for(let j=0;j<col;j++)
    {
        let cellProp={
            bold : false,
            italic : false,
            underline : false,
            alignment : "left",
            fontFamily : "monospace",
            fontSize : "14",
            fontColor : "#000000",
            bgColor : "#000000", // just for indication purpose or default values right now
            value : "",
            formula : "",
            children : []
        };
        sheetRow.push(cellProp);
    }

    sheetDB.push(sheetRow);
}


//Selector for cell Properties

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize=document.querySelector(".fontsize-prop");
let fontFamily=document.querySelector(".fontfamily-prop");
let fontColor=document.querySelector(".font-color-prop");
let bgColor=document.querySelector(".bg-color-prop");
let alignment=document.querySelectorAll(".alignment");
let leftAlign=alignment[0];
let centerAlign=alignment[1];
let rightAlign=alignment[2];


let activeColorProp="#d1d8e0";
let inactiveColorProp="#ecf0f1";


//Attach Listeners on Properties && aplication of 2-way binding

bold.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=activeCell(address);

    //Modification
    cellProp.bold=!cellProp.bold; // Data Change
    cell.style.fontWeight=cellProp.bold ? "bold" : "normal"; //UI Change Part 1
    bold.style.backgroundColor=cellProp.bold ? activeColorProp : inactiveColorProp; //UI change Part2

});

italic.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=activeCell(address);

    //Modification
    cellProp.italic=!cellProp.italic; // Data Change
    cell.style.fontStyle=cellProp.italic ? "italic" : "normal"; //UI Change Part 1
    italic.style.backgroundColor=cellProp.italic ? activeColorProp : inactiveColorProp; //UI change Part2

});

underline.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=activeCell(address);

    //Modification
    cellProp.underline=!cellProp.underline; // Data Change
    cell.style.textDecoration=cellProp.underline ? "underline" : "none"; //UI Change Part 1
    underline.style.backgroundColor=cellProp.underline ? activeColorProp : inactiveColorProp; //UI change Part2

});

fontSize.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=activeCell(address);

    //Modification
    cellProp.fontSize=fontSize.value; // Data change
    cell.style.fontSize=cellProp.fontSize+"px"; //UI Chnage part1
    fontSize.value=cellProp.fontSize;  //UI Chnage part 2
});

fontFamily.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=activeCell(address);

    //Modification
    cellProp.fontFamily=fontFamily.value; // Data change
    cell.style.fontFamily=cellProp.fontFamily; //UI Chnage part1
    fontFamily.value=cellProp.fontFamily;  //UI Chnage part 2
});

fontColor.addEventListener("input",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=activeCell(address);

    //Modification
    cellProp.fontColor=fontColor.value; // Data change
    cell.style.color=cellProp.fontColor; //UI Chnage part1
    fontColor.value=cellProp.fontColor;  //UI Chnage part 2
});

bgColor.addEventListener("input",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=activeCell(address);

    //Modification
    cellProp.bgColor=bgColor.value; // Data change
    cell.style.backgroundColor=cellProp.bgColor; //UI Chnage part1
    bgColor.value=cellProp.bgColor;  //UI Chnage part 2
});


alignment.forEach((alignEle)=>{
    alignEle.addEventListener("click",(e)=>{

        let address=addressBar.value;
        let [cell,cellProp]=activeCell(address);

        let alignValue=e.target.classList[0];

        //Modification
        cellProp.alignment=alignValue; // Data Change
        cell.style.textAlign=cellProp.alignment; // UI Change Part1

        switch(alignValue) //UI ChNage part2
        {
            case "left" : 
                        leftAlign.style.backgroundColor=activeColorProp;
                        centerAlign.style.backgroundColor=inactiveColorProp;
                        rightAlign.style.backgroundColor=inactiveColorProp;
                        break;
            case "center" : 
                            leftAlign.style.backgroundColor=inactiveColorProp;
                            centerAlign.style.backgroundColor=activeColorProp;
                            rightAlign.style.backgroundColor=inactiveColorProp;
                            break;
            case "right" : 
                        leftAlign.style.backgroundColor=inactiveColorProp;
                        centerAlign.style.backgroundColor=inactiveColorProp;
                        rightAlign.style.backgroundColor=activeColorProp;
                        break;
        }
    })
});




let allCells=document.querySelectorAll(".cell");

for(let i=0;i<allCells.length;i++)
{
    addListenerToAttachCellPro(allCells[i]);
}

function addListenerToAttachCellPro(cell){
    cell.addEventListener("click",(e)=>{

        let address=addressBar.value;
        let [rId,cId]=decodeAddress(address);
        let cellProp=sheetDB[rId][cId];

        //apply cell Properties
        cell.style.fontWeight=cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle=cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration=cellProp.underline ? "underline" : "none";
        cell.style.fontSize=cellProp.fontSize+"px";
        cell.style.fontFamily=cellProp.fontFamily;
        cell.style.color=cellProp.fontColor;
        cell.style.backgroundColor=cellProp.bgColor=="#000000" ? "transparent" : cellProp.bgColor;
        cell.style.textAlign=cellProp.alignment;
       


        //Aplly properties to Ui Props container
        bold.style.backgroundColor=cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor=cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor=cellProp.underline ? activeColorProp : inactiveColorProp;
        fontSize.value=cellProp.fontSize;
        fontFamily.value=cellProp.fontFamily;
        fontColor.value=cellProp.fontColor;
        bgColor.value=cellProp.bgColor; 
        switch(cellProp.alignment) //UI ChNage part2
        {
            case "left" : 
                        leftAlign.style.backgroundColor=activeColorProp;
                        centerAlign.style.backgroundColor=inactiveColorProp;
                        rightAlign.style.backgroundColor=inactiveColorProp;
                        break;
            case "center" : 
                            leftAlign.style.backgroundColor=inactiveColorProp;
                            centerAlign.style.backgroundColor=activeColorProp;
                            rightAlign.style.backgroundColor=inactiveColorProp;
                            break;
            case "right" : 
                        leftAlign.style.backgroundColor=inactiveColorProp;
                        centerAlign.style.backgroundColor=inactiveColorProp;
                        rightAlign.style.backgroundColor=activeColorProp;
                        break;
        }
        
    })
}





function activeCell(address)
{
    let [rId,cId]=decodeAddress(address);
    //Access cell and Storage
    let cell=document.querySelector(`.cell[rId="${rId}"][cId="${cId}"]`);
    let cellProp=sheetDB[rId][cId];
    return [cell,cellProp];
}

function decodeAddress(addresss)
{
    //address -> "A1"  (col Row)
    let rId=Number(addresss.slice(1))-1;  // "1" -> 0
    let cId=Number(addresss.charCodeAt(0)) - 65; // "A" -> 65
    return [rId,cId];

}
