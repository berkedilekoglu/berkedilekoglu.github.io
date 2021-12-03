alert("Please Expand Your Browsers' Window Before Simulation!");

var scl = 10;
var control = 'selection';
var searchIndex = 0;
var found = false;
var startTime = 0;
var endTime = 0;
var runTime = 0;
var frontIndex = 0;
var endIndex = 0;
var midIndex = 0;
var newSearchArea = '';
var warning = false;
var numberOfBox = window.prompt("Enter the number of box (Array will be sorted)(Recommended value is 600): ");
var searchNumber = window.prompt("Which box do you want to find?:(Recommended value is 300 or 200) ");
var fpsValue = window.prompt("Please enter FPS (For observe value: 5, For fast value: 30): ");
//alert("Linear Search Algorithm will start to find " + searchNumber +" among " +numberOfBox +" numbers of boxes");

function setup() {

    createCanvas(windowWidth, windowHeight);

    mySpace = new searchSpace();
    mySpace.setup(numberOfBox);
    frameRate(parseInt(fpsValue));
    background(0);
    mySpace.show();
    
    startTime = window.performance.now();
    //Arrange indexes
    endIndex = numberOfBox -1;
    midIndex = (endIndex/2)| 0;
    console.log(midIndex);
    
    
    
}
function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight);
}


function updateGreater()
{
    frontIndex = midIndex +1;
    midIndex = endIndex - frontIndex;
    midIndex = frontIndex + midIndex/2 | 0;    
}

function updateLower()
{
    endIndex = midIndex -1;
    midIndex = endIndex - frontIndex;
    midIndex = frontIndex + midIndex/2 | 0;
}

function draw() 
{
    
    background(0);
    if(control == 'selection')
    {
        mySpace.select(midIndex);
        if(mySpace.look(searchNumber,midIndex) == true)
        {
            noLoop();
            found = true;
            mySpace.update(midIndex,newSearchArea,found)
            endTime = window.performance.now();
        }
        else if(midIndex == numberOfBox-1)
        {
            warning = true; 
        }
        control = 'release';

    }
    else if(control == 'release')
    {
        mySpace.release(midIndex);
        if(mySpace.number(midIndex)<searchNumber)
        {
            newSearchArea = 'Greater'
            mySpace.update(midIndex,newSearchArea,found)
            updateGreater();
            
        }
        else
        {
            newSearchArea = 'Lower'
            mySpace.update(midIndex,newSearchArea,found)
            updateLower();
            
        }
        
        
        control = 'selection';
        
    }
    
    mySpace.show();
    
    if (found == true)
    {
        runTime = (endTime-startTime)/1000;
        setInterval(finalAlert,800);
        

    }
    else if(warning && control == 'selection')
    {
        noLoop();
        setInterval(finalAlert,800);

    }
    
    
}

function finalAlert()
{
    if(found==true)
    {
        alert(searchNumber+ " was found by usin Binary Search in " +runTime+ " seconds! Please refresh page to continue with new values.");

    }
    else
    {
        alert("Your number could not be found!");

    }
    
}

