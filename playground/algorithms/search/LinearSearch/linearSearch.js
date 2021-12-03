alert("Please Expand Your Browsers' Window Before Simulation!");

var scl = 10;
var control = 'selection';
var searchIndex = 0;
var found = false;
var startTime = 0;
var endTime = 0;
var runTime = 0;
var numberOfBox = window.prompt("Enter the number of box (Array will be sorted)(Recommended value is 600): ");
var searchNumber = window.prompt("Which box do you want to find?:(Recommended value is 300 or 200) ");
var fpsValue = window.prompt("Please enter FPS (For observe value: 5, For fast value: 30): ");
alert("Linear Search Algorithm will start to find " + searchNumber +" among " +numberOfBox +" numbers of boxes");

function setup() {

    createCanvas(windowWidth, windowHeight);

    mySpace = new searchSpace();
    mySpace.setup(numberOfBox);
    frameRate(parseInt(fpsValue));
    background(0);
    mySpace.show();

    startTime = window.performance.now();

    
    
    
}
function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight);
}




function draw() 
{

    background(0);
    if(control=='selection')
    {
        mySpace.select(searchIndex);
        if (mySpace.look(searchNumber,searchIndex) == true)
            {
                
                
                
                noLoop();
                //mySpace.select(searchIndex);

                found = true;
                endTime = window.performance.now();
            }
  
        control = 'release';
    }
    else{
        
        mySpace.release(searchIndex);
        
        searchIndex ++;
        control = 'selection';
        
    }
    

    mySpace.show(found,searchIndex);
    if (found == true)
    {
        runTime = (endTime-startTime)/1000;
        setInterval(finalAlert,800);
        

    }
    else if(searchIndex == numberOfBox)
    {
        noLoop();
        setInterval(finalAlert,800);

    }
    
}

function finalAlert()
{
    if(found==true)
    {
        alert(searchNumber+ " was found by usin Linear Search in " +runTime+ " seconds! Please refresh page to continue with new values.");

    }
    else
    {
        alert("Your number could not be found!");

    }
    
}
