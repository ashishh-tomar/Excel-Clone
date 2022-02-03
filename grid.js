let row=100;
let col=26;

let addressColCont=document.querySelector(".address-col-cont");
let addressRowCont=document.querySelector(".address-row-cont");
let cellsCont=document.querySelector(".cells-cont");
let addressBar=document.querySelector(".address-bar")


for(let i=0;i<row;i++)
{
    let addressCol=document.createElement("div");
    addressCol.setAttribute("class","address-col")
    addressCol.innerText=i+1;

    addressColCont.appendChild(addressCol);
}


for(let i=0;i<col;i++)
{
    let addressRow=document.createElement("div");
    addressRow.setAttribute("class","address-row")
    let ch=String.fromCharCode(65+i);
    addressRow.innerText=ch

    addressRowCont.appendChild(addressRow);
}



for(let i=0;i<row;i++)
{
    let rowCont=document.createElement("div");
    rowCont.setAttribute("class","row-cont");
    for(let j=0;j<col;j++)
    {
        let cell=document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true");
        cell.setAttribute("rId",i);
        cell.setAttribute("cId",j);
        cell.setAttribute("spellcheck","false");
        rowCont.appendChild(cell);
        addListenerToDisplayAddress(cell,i,j);
    }

    cellsCont.appendChild(rowCont);


}

function addListenerToDisplayAddress(cell,i,j)
{
    cell.addEventListener("click",(e)=>{
        let rowId=i+1;
        let colId=String.fromCharCode(65+j);
        addressBar.value=`${colId}${rowId}`
    })
}


