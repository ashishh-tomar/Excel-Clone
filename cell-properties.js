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
            bgColor : "#000000" // just for indication purpose or default values right now

        };
        sheetRow.push(cellProp);
    }

    sheetDB.push(sheetRow);
}


//Selector for cell Properties

let bold = document.querySelector(".bold");
let bold = document.querySelector(".italic");
let bold = document.querySelector(".underline");
let fontSize=document.querySelector(".fontsize-prop");
let fontFamily=document.querySelector(".fontfamily-prop");
let fontColor=document.querySelector(".font-color-prop");
let bgColor=document.querySelector(".bg-color-prop");
let alignment=document.querySelectorAll(".alignment");
let leftAlign=alignment[0];
let centerAlign=alignment[1];
let rightAlign=alignment[2];

let addressBar=document.querySelector(".address-bar");


//Attach Listeners on Properties && aplication of 2-way binding

bold.addEventListener("click",(e)=>{
    let address=addressBar.value;
    activeCell(address);
})

function activeCell(address)
{
    let [rId,cId]=decodeAddress(address);
    //Access cell and Storage
}

function decodeAddress(addresss)
{
    //address -> "A1"  (col Row)
    let rId=Number(addresss.slice(1))-1;  // "1" -> 0
    let cId=Number(String.charCodeAt(0)) - 65; // "A" -> 65
    return [rId,cId];

}
