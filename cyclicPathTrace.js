//For delay and wait
function colorPromise(){
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve();
        },1000);
    });
}


async function isGraphCyclicTracePath(graphComponentMatrix,cycleResponse){
    
    let [srcr,srcc]=cycleResponse;
    let visited=[];
    let dfsVisited=[];

    for(let i=0;i<row;i++)
    {
        let visitedRow=[];
        let dfsVisitedRow=[];
        for(let j=0;j<col;j++)
        {
            
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }

        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

   

    let response= await dfsTracePath(graphComponentMatrix,srcr,srcc,visited,dfsVisited);
    if(response===true)
    {
        return Promise.resolve(true);
    }

    return Promise.resolve(false);
}



//coloring cells for tracking
async function dfsTracePath(graphComponentMatrix,srcRow,srcCol,visited,dfsVisited){

    visited[srcRow][srcCol]=true;
    dfsVisited[srcRow][srcCol]=true;

    let cell=document.querySelector(`.cell[rId="${srcRow}"][cId="${srcCol}"]`);
    
    //console.log("color blue");
    cell.style.backgroundColor="lightblue";
    await colorPromise(); // 1 Second finised
   

    for(let children=0;children < graphComponentMatrix[srcRow][srcCol].length;children++)
    {
        let [nbrr,nbrc]=graphComponentMatrix[srcRow][srcCol][children];
        if(visited[nbrr][nbrc]===false)
        {
            let response= await dfsTracePath(graphComponentMatrix,nbrr,nbrc,visited,dfsVisited);
            if(response===true)
            {
                cell.style.backgroundColor="transparent"; 
               await colorPromise();
                return Promise.resolve(true);
            }
        }
        else if(visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc]===true)
        {
            let cyclicCell=document.querySelector(`.cell[rId="${nbrr}"][cId="${nbrc}"]`);
            
           
            cyclicCell.style.backgroundColor="lightsalmon";
            await colorPromise();

            cyclicCell.style.backgroundColor="transparent";
            cell.style.backgroundColor="transparent"; 
            await colorPromise();

            return Promise.resolve(true);
        }
    }

    
    dfsVisited[srcRow][srcCol]=false;
    return Promise.resolve(false);
}

