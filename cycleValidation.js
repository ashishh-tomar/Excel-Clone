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


//return boolean - > true means cyclic else not cyclic
function isGraphCyclic(graphComponentMatrix){
    // we need two 2-d array for visited purpose -> visited and dfsVisited

    let visited=[];
    let dfsVisited=[];

    for(let i=0;i<row;i++)
    {
        let visitedRow=[];
        let dfsVisitedRow=[];
        for(let j=0;j<col;j++)
        {
            //default values of visited array should be false
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }

        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    for(let i=0;i<row;i++)
    {
        for(let j=0;j<col;j++)
        {
            if(visited[i][j]==false)
            {
                let ans = dfs(graphComponentMatrix,i,j,visited,dfsVisited);
                if(ans==true)
                {
                    return true;
                }
            }
           
        }
    }

    return false;
}

// first mark visited and dfsVisited True
// Do DFSVisited false in post order
// if already visited or visited[i][j]==true - > dont do anything
//condition for cycle detecttion - > if(visited[i][j]== true && dfsVisited[i][j]==true) -> Cycle
function dfs(graphComponentMatrix,srcRow,srcCol,visited,dfsVisited){

    visited[srcRow][srcCol]=true;
    dfsVisited[srcRow][srcCol]=true;

    for(let children=0;children < graphComponentMatrix[srcRow][srcCol].length;children++)
    {
        let [nbrr,nbrc]=graphComponentMatrix[srcRow][srcCol][children];
        if(visited[nbrr][nbrc]===false)
        {
            let response=dfs(graphComponentMatrix,nbrr,nbrc,visited,dfsVisited);
            if(response===true)
            {
                return true;
            }
        }
        else if(visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc]===true)
        {
            return true;
        }
    }

    // Post Order
    dfsVisited[srcRow][srcCol]=false;
    return false;
}

