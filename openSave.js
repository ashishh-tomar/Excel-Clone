let downloadBtn=document.querySelector(".download");
let uploadBtn=document.querySelector(".upload");


downloadBtn.addEventListener("click",(e)=>{
    let data=[sheetDB,graphComponentMatrix];
    let jsonData=JSON.stringify(data);

    let file=new Blob([jsonData],{type : "application/json"});

    let a=document.createElement("a");
    a.href=URL.createObjectURL(file);
    a.download="SheetData.json";
    a.click();
})


uploadBtn.addEventListener("click",(e)=>{
    let input=document.createElement("input");
    input.setAttribute("type","file");
    input.click(); // open file explore window

    input.addEventListener("change",(e)=>{
        let fr=new FileReader();
        let filesArr=input.files;

        let fileObj=filesArr[0];

        fr.readAsText(fileObj);
        fr.addEventListener("load",(e)=>{
            let readSheetData=JSON.parse(fr.result);

            // Basic sheet with default data will be created
            addSheetBtn.click();

            //sheetDb and graph component will be created by above line,so we have to replace defult dta with uploaded data
            sheetDB=readSheetData[0]; // sheetDb
            graphComponentMatrix=readSheetData[1];


            collectedSheetDB[collectedSheetDB.length -1]=sheetDB;
            collectedGraphComponent[collectedGraphComponent.length-1]=graphComponentMatrix;

            handelSheetProperties();
        })
    })
})