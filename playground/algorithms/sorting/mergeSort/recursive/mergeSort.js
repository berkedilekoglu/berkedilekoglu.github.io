var recWidth = 60;
var control = 'start';
var timeOuter;
function setup() {

    createCanvas(windowWidth, windowHeight);
    frameRate(10);
    mergeArray = new mergeSpace();
    mergeArray.setup();
    
}
function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
function draw(){
    
    background(0);
    noLoop();
    
    var checker = 'ti1';
    if(control =='start')
    {
    mergeSort(mergeArray, 0, mergeArray.len()-1);
       control = 'process';
        
    }
    
    // else
    // {
        
        
    // }
    // let time = 30;
    // var interval = 50;
    // const timeValue = setInterval(function(){
    //     background(0);
    //     mergeArray.show();
    //     if (control == 'process')
    //     {
    //         clearInterval(timeValue);
    //     }
   
    background(0);
    mergeArray.show();
        
    
    // })
}




function mergeSort(mergeArray, leftStart, rightStart) 
{
    
    
    if(leftStart >= rightStart)
    {
        return;
    }
    else
    {
        var midPoint = Math.floor((rightStart + leftStart) / 2);
        mergeSort(mergeArray, leftStart, midPoint);
        mergeSort(mergeArray, midPoint+1, rightStart);
        mergeHalves(mergeArray, leftStart, midPoint, rightStart)
        

    }
    
    
    
}

async function mergeHalves(mergeArray,leftStart, midPoint, rightStart)
{
    

    var nLeft = midPoint - leftStart + 1;
    var nRight = rightStart - midPoint; 
    var leftArray = new Array(nLeft); // create an empty array for left half
    var rightArray = new Array(nRight); // create an empty array for right half

    mergeArray.selectMid(midPoint);
    

    for(var i = 0; i < nLeft; i++)
    {
        
        mergeArray.selectLeft(i);
        leftArray[i] = mergeArray.at(leftStart+i);
        
    }

   
    for(var j = 0; j < nRight; j++)
    {
        mergeArray.selectRight(j);
        rightArray[j] = mergeArray.at(midPoint+1+j);
        
    }

   
    background(0);
    mergeArray.show();


    var index = leftStart;
    var leftIndex = 0;
    var rightIndex = 0;

    while(leftIndex < nLeft && rightIndex < nRight)
    {
        
        if(leftArray[leftIndex] < rightArray[rightIndex])
        {
            mergeArray.set(index,leftArray[leftIndex]);
            leftIndex++;
        }
        else
        {
            mergeArray.set(index,rightArray[rightIndex]);
            rightIndex++;
        }
        index++;
    }
    
    while(leftIndex < nLeft)
    {
        mergeArray.set(index,leftArray[leftIndex]);
        leftIndex++;
        index++;
    }
    while(rightIndex < nRight)
    {
        mergeArray.set(index,rightArray[rightIndex]);
        rightIndex++;
        index++;
    }
   
    background(0);
    mergeArray.show();


}