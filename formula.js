for(let i=0;i<row;i++)
{
    for(let j=0;j<col;j++)
    {
        let cell=document.querySelector(`.cell[rId="${i}"][cId="${j}"]`);
        cell.addEventListener("blur",(e)=>{

            let address = addressBar.value;
            let [activecell, cellProp] = activeCell(address);
            let enteredData=activecell.innerText;
            cellProp.value=enteredData;
            //console.log(cellProp);
        })
    }
}


let formulaBar=document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown",(e)=>{

    let inputFormula=formulaBar.value;
    if(e.key === "Enter" && formulaBar.value)
    {
        
        let evaluatedVal = evaluateFormula(inputFormula);
        addChildToParent(inputFormula);
        //To update UI and Cell Prop in DB
        cellUIandCellProp(evaluatedVal,inputFormula);

        console.log(sheetDB);
    }
})

function  addChildToParent(formula)
{
    let childAddress=addressBar.value;
    let encodedFormula=formula.split(" "); 

    for(let i=0;i<encodedFormula.length;i++)
    {
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue >=65 && asciiValue <=90)
        {
            let[parentCell,parentCellProp]=activeCell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }

}

function evaluateFormula(formula)
{
    let encodedFormula=formula.split(" "); 
    

    for(let i=0;i<encodedFormula.length;i++)
    {
        let asciiValue=encodedFormula[i].charCodeAt(0);

        
        if(asciiValue >=65 && asciiValue <=90)
        {
            let[cell,cellProp]= activeCell(encodedFormula[i]);
            encodedFormula[i]= cellProp.value;
            console.log(cellProp.value);
        }
    }

    
    let decodedFormula=encodedFormula.join(" ");
    
    return eval(decodedFormula);
}

function cellUIandCellProp(val,formula)
{
    let address=addressBar.value;
    let[cell,cellProp]=activeCell(address);

    cell.innerText=val; //UI update

    //DB update
    cellProp.value=val;
    cellProp.formula=formula;

}