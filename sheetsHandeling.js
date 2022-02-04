let activeSheetColor="#ced6e0";
let sheetFolderCont=document.querySelector(".sheet-folder-cont");
let addSheetBtn=document.querySelector(".sheet-add-icon");

addSheetBtn.addEventListener("click",()=>{
    let sheet=document.createElement("div");
    sheet.setAttribute("class","sheet-folder");

    let allSheetFolder=document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id",allSheetFolder.length);
    sheet.innerHTML=`
    <div class="sheet-content">Sheet ${allSheetFolder.length+1}</div>
    `;

    sheetFolderCont.appendChild(sheet);
    sheet.scrollIntoView();

    //DB
    createSheetDB();
    createGraphComponentMatrix();
    handelSheetActiveness(sheet);
    handelSheetRemoval(sheet);
    sheet.click();
})

function createSheetDB(){
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

    collectedSheetDB.push(sheetDB);
}


function createGraphComponentMatrix(){
    // Storage of 2d array(Basic need)
    let graphComponentMatrix=[];

    for(let i=0;i<row;i++)
    {
        let r=[];
        for(let j=0;j<col;j++)
        {
        //Why Array required => More than child relation(dependency)
            r.push([]);
        }
        graphComponentMatrix.push(r);
    }
    collectedGraphComponent.push(graphComponentMatrix);
}

function handelSheetActiveness(sheet){

    sheet.addEventListener("click",(e)=>{
        let sheetIdx=Number(sheet.getAttribute("id"));
        handelSheetDB(sheetIdx);
        handelSheetProperties();
        handelSheetUI(sheet);
       
        
    })
}


function handelSheetDB(sheetIdx)
{
    sheetDB=collectedSheetDB[sheetIdx];
    graphComponentMatrix=collectedGraphComponent[sheetIdx];
}

function handelSheetProperties(){
    for(let i=0;i<row;i++)
    {
        for(let j=0;j<col;j++)
        {
            let cell=document.querySelector(`.cell[rId="${i}"][cId="${j}"]`);
            cell.click();
        }
    }

    //By default click on first cell when browser start 
    let firstCell=document.querySelector(".cell");
    firstCell.click();
}

function handelSheetUI(sheet)
{
    let allSheetFolder=document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolder.length;i++)
    {
        allSheetFolder[i].style.backgroundColor="transparent";
    }
    sheet.style.backgroundColor=activeSheetColor;
}

function handelSheetRemoval(sheet)
{
    //1 -> middle click
    //2 -> right click

    sheet.addEventListener("mousedown",(e)=>{
        if(e.button !==2) return;

        let allSheetFolder=document.querySelectorAll(".sheet-folder");
        if(allSheetFolder.length ===1)
        {
            alert("You need atleast one sheet !!!");
            return;
        }

        let response=confirm("Your sheet will be removed Permanently");
        if(response === false)
        {
            return;
        }

        let sheetIdx=Number(sheet.getAttribute("id"));
        //DB removal
        collectedSheetDB.splice(sheetIdx,  1);
        collectedGraphComponent.splice(sheetIdx, 1);
        //UI removal
        handelSheetUIRemoval(sheet);

        //By default assign DB to sheet 1 to active
        sheetDB=collectedSheetDB[0];
        graphComponentMatrix=collectedGraphComponent[0];
        handelSheetProperties();
    })
}


function handelSheetUIRemoval(sheet){
    sheet.remove();

    let allSheetFolder=document.querySelectorAll(".sheet-folder");
    //console.log(allSheetFolder.length);
    for(let i=0;i < allSheetFolder.length;i++)
    {
        allSheetFolder[i].setAttribute("id", i);
        let sheetContent=allSheetFolder[i].querySelector(".sheet-content");
        sheetContent.innerText=`Sheet ${i+1}`;
        console.log(i);
        allSheetFolder[i].style.backgroundColor="transparent";
    }

    allSheetFolder[0].style.backgroundColor=activeSheetColor;
}