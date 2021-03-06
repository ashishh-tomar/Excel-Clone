for(let i=0;i<row;i++)
{
    for(let j=0;j<col;j++)
    {
        let cell=document.querySelector(`.cell[rId="${i}"][cId="${j}"]`);
        cell.addEventListener("blur",(e)=>{

            let address = addressBar.value;
            let [activecell, cellProp] = activeCell(address);
            let enteredData=activecell.innerText;

            if(enteredData === cellProp.value) return;

            cellProp.value=enteredData;
            //If data modified,then remove child-parent relation , empty formula , update chidren with new hardcode (modified) value
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);
            //console.log(cellProp);
        })
    }
}


let formulaBar=document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown",async (e)=>{

    let inputFormula=formulaBar.value;
    if(e.key === "Enter" && formulaBar.value)
    {
       // If change in formula, break ol child-parent relation then evaluate new formula, add new hild parent relation
        let address=addressBar.value;
        let [cell,cellProp] =activeCell(address);
        if(inputFormula !== cellProp.formula)
        {
            removeChildFromParent(cellProp.formula);
        }

        addChildToGraphComponent(inputFormula,address);
       //check formula is cyclic or not then only evaluates
       // True -> cycle , False-> Not cyclic
       
        let cycleResponse=isGraphCyclic(graphComponentMatrix);
        //console.log(isCyclic);
        if(cycleResponse)
        {
           // console.log("cylce"+isCyclic);
           // alert("Your formula is cyclic");
            let response=confirm("Your formula is Cyclic. Do you want to Trace Your Path?");
            while(response === true)
            {
                // Keep on tracking color unitl user is satisfied
                await isGraphCyclicTracePath(graphComponentMatrix,cycleResponse);
                // I want to  complete full iteration of color tracking so i will attach await()  here aslo
                response=confirm("Your formula is Cyclic. Do you want to Trace Your Path?");
            }

            removeChildFromGraphComponent(inputFormula,address);
            return;
        }

        let evaluatedVal = evaluateFormula(inputFormula);        
        //To update UI and Cell Prop in DB
        cellUIandCellProp(evaluatedVal,inputFormula,address);
        addChildToParent(inputFormula);
         updateChildrenCells(address);
        //console.log(sheetDB);
        console.log(graphComponentMatrix);

    
    }
})

function updateChildrenCells(parentAddress)
{
    let [parentCell,parentCellProp]=activeCell(parentAddress);
    let children=parentCellProp.children;

    for(let i=0;i<children.length;i++)
    {
        let childAddress=children[i];
        let [childCell,childCellProp]=activeCell(childAddress);
        let childFormula=childCellProp.formula;

        let evaluatedValue=evaluateFormula(childFormula);
        cellUIandCellProp(evaluatedValue,childFormula,childAddress);
        //recursivecall

        updateChildrenCells(childAddress);

    }
}

function addChildToGraphComponent(formula,childAddress)
{
    let[crId,ccId]=decodeAddress(childAddress);
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++)
    {
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <=90)
        {
            let [prId,pcId]=decodeAddress(encodedFormula[i]);
            graphComponentMatrix[prId][pcId].push([crId,ccId]);
        }
    }
}


function removeChildFromGraphComponent(formula,childAddress)
{
    let[childrId,childcId]=decodeAddress(childAddress);
    let encodedFormula=formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++)
    {
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <=90)
        {
            let [prowId,pcolId]=decodeAddress(encodedFormula[i]);
            graphComponentMatrix[prowId,pcolId].pop();
        }
    }
}



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

function removeChildFromParent(formula)
{
    let childAddress=addressBar.value;
    let encodedFormula=formula.split(" "); 

    for(let i=0;i<encodedFormula.length;i++)
    {
        let asciiValue=encodedFormula[i].charCodeAt(0);
        if(asciiValue >=65 && asciiValue <=90)
        {
            let[parentCell,parentCellProp]=activeCell(encodedFormula[i]);
            let idx=parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx,1);
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
           // console.log(cellProp.value);
        }
    }

    
    let decodedFormula=encodedFormula.join(" ");
    
    return eval(decodedFormula);
}

function cellUIandCellProp(val,formula,address)
{
    //let address=addressBar.value;
    let[cell,cellProp]=activeCell(address);

    cell.innerText=val; //UI update

    //DB update
    cellProp.value=val;
    cellProp.formula=formula;

}