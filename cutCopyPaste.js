let ctrlKey;
let copyBtn=document.querySelector(".copy");
let cutBtn=document.querySelector(".cut");
let pasteBtn=document.querySelector(".paste");


document.addEventListener("keydown",(e)=>{
    ctrlKey=e.ctrlKey;
})

document.addEventListener("keyup",(e)=>{
    ctrlKey=e.ctrlKey;
})


for(let i=0;i<row;i++)
{
    for(let j=0;j<col;j++)
    {
        let cell=document.querySelector(`.cell[rId="${i}"][cId="${j}"]`);
        handleSelectedCells(cell);
    }
}

let rangeStorage=[];
function handleSelectedCells(cell)
{
    cell.addEventListener("click",(e)=>{
        //select cells range work
        if(!ctrlKey) return;
        if(rangeStorage.length >=2){
            defaultSelectedCellsUI();
            rangeStorage=[];
        }


        //UI 
        cell.style.border="3px solid #218c74";

        let rId=Number(cell.getAttribute("rId"));
        let cId=Number(cell.getAttribute("cId"));

        rangeStorage.push([rId,cId]);

        // console.log(rangeStorage);

    })
}


function defaultSelectedCellsUI()
{
    for(let i=0;i<rangeStorage.length;i++)
    {
        let cell=document.querySelector(`.cell[rId="${rangeStorage[i][0]}"][cId="${rangeStorage[i][1]}"]`);
        cell.style.border="1px solid #e2e5e5";
    }
}


let copyData=[];
copyBtn.addEventListener("click",(e)=>{

    if(rangeStorage.length < 2) return;
    copyData=[]; // Refresh everytime when you click copy button so that data always changes what you want to copy

    let sr=rangeStorage[0][0]; // start row
    let sc=rangeStorage[0][1]; // start col
    let er=rangeStorage[1][0]; // end row
    let ec=rangeStorage[1][0]; // end col

    for(let i=sr;i<=er;i++)
    {
        let copyRow=[];
        for(let j=sc;j<=ec;j++)
        {
            let cellProp=sheetDB[i][j];
            copyRow.push(cellProp);
        }
        copyData.push(copyRow);
    }

    //console.log(copyData);
    defaultSelectedCellsUI();
})


pasteBtn.addEventListener("click",(e)=>{
    
    if(rangeStorage.length < 2) return;
   
    // Paste Cells Ddata

    let rowDiff=Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    let colDiff=Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

    let address=addressBar.value;
    let[sr,sc]=decodeAddress(address); // Target start row and target start col

    for(let i=sr , r=0;i<=sr+rowDiff;r++,i++)  // r rfer t0 copydata row due to mismatch idx we use r
    {
        for(let j=sc, c=0;j<=sc+colDiff;c++,j++) // c refer to copydata col due to mismatch idx
        {
            let cell=document.querySelector(`.cell[rId="${i}"][cId="${j}"]`);
            if(cell ==null) continue; // index may got out of the matix
            // DB
            let data=copyData[r][c];
            let cellProp=sheetDB[i][j];
            
            cellProp.value=data.value;
            cellProp.bold=data.bold;
            cellProp.italic=data.italic;
            cellProp.underline=data.underline;
            cellProp.alignment=data.alignment;
            cellProp.fontFamily=data.fontFamily;
            cellProp.fontSize=data.fontSize;
            cellProp.fontColor=data.fontColor;
            cellProp.bgColor=data.bgColor;

           // console.log(cellProp);
           // console.log(data);
            
            //UI
            cell.click();
            

        }
    }

})


cutBtn.addEventListener("click",(e)=>{
    // Similar to copy logic
    if(rangeStorage.length < 2) return;
    copyData=[]; // Refresh everytime when you click copy button so that data always changes what you want to copy

    let sr=rangeStorage[0][0]; // start row
    let sc=rangeStorage[0][1]; // start col
    let er=rangeStorage[1][0]; // end row
    let ec=rangeStorage[1][0]; // end col

    for(let i=sr;i<=er;i++)
    {   
        
        for(let j=sc;j<=ec;j++)
        {
            let cell=document.querySelector(`.cell[rId="${i}"][cId="${j}"]`);
            let cellProp=sheetDB[i][j];
            
            //set default value to cuted data cells
            //DB
            cellProp.value="";
            cellProp.bold=false;
            cellProp.italic=false;
            cellProp.underline=false;
            cellProp.alignment="left";
            cellProp.fontFamily="monospace";
            cellProp.fontSize="14";
            cellProp.fontColor="#000000";
            cellProp.bgColor="#000000";

            //UI
            cell.click();
        }
       
        
    }

    //console.log(copyData);
    defaultSelectedCellsUI();
})



