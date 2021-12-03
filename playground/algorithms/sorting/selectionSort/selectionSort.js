alert("After enter Rectangle Width and Frame Rate your simulation will start!");

var recWidth = Number(window.prompt("Enter the rectangle width (Lower width -> High number of elements! 5 is recommended): ",5));
var fr = Number(window.prompt("Enter the Frame Rate (100 is recommended! For more slow frames give lower numbers): ",100));
var minIndex = 0;
var currentIndex = 0;
var comparedIndex = 0;
var numberOfComparison = 0;
var numberOfReplacement = 0;
var endTime = 0;
var startTime = 0;
var runTime = 0;
var control = 'selection';
var begin = false;
let osc, envelope, fft;
var startCheck = false;
let scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
let note = 0;

function setup() {
    noLoop();
    if(startCheck==true)
    {
        if(fr > 0 && recWidth >0)
        {
            osc = new p5.SinOsc();
            envelope = new p5.Env();
            envelope.setADSR(0.001, 0.5, 0.1, 0.5);
            envelope.setRange(1, 0);
            osc.start();
            fft = new p5.FFT();
            createCanvas(windowWidth, windowHeight);
            
            
            
            mySpace = new sortingSpace();
            mySpace.setup();

            frameRate(fr);
            background(0);
            mySpace.show();

            startTime = window.performance.now();
        }
        else
        {
            noLoop();
        }
    }
    else
    {
        
        mySpace = new sortingSpace();
        createCanvas(windowWidth, windowHeight);
    }
    
    
    
}
function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight);
}




function draw() 
{

    background(0);
    
    if(control == 'selection' && startCheck==true)
    {
        numberOfComparison++;
        if(currentIndex<mySpace.len())
        {
            minIndex = mySpace.select(currentIndex,minIndex);
            song(mySpace.at(currentIndex))
            begin = false;

        }
        
        else
        {
            numberOfReplacement++;
            song(mySpace.at(comparedIndex))
            mySpace.replace(comparedIndex,minIndex);
            comparedIndex++;
            currentIndex = comparedIndex;
            minIndex = comparedIndex;
            begin = true;
        }
        control = 'release';
    }
    else
    {
        if(currentIndex<mySpace.len() && begin == false)
        {
            
            mySpace.release(currentIndex);
            currentIndex++;
        }
        
        control ='selection';
    }

    if (comparedIndex == mySpace.len())
    {
        

        endTime = window.performance.now();
        runTime = (endTime-startTime)/1000;
        textSize(15);
        fill(211,211,211);
        text('Run time in seconds: '+ runTime.toString(), 10, 80);
        noLoop();
    }

    textSize(20);
    fill(211,211,211);
    text('Number Of Comparisons: '+ numberOfComparison.toString(), 10, 60);
    textSize(20);
    fill(211,211,211);
    text('Number Of Replacements: '+ numberOfReplacement.toString(), 10, 40);
    textSize(20);
    fill(211,211,211);
    text('Number Of Elements: '+ mySpace.len().toString(), 10, 20);
    
    
    if(startCheck==false)
    {
        background(0);
        textSize(20);
        fill(211,211,211);
        text('Click Here To Start', 10, 90);
    }

    mySpace.show();

    
}

function touchStarted() {
    if(startCheck==false)
    {
        getAudioContext().resume()
        startCheck = true;
        setup();
        loop();
       
    }
    
  }

function song(value)
{
    if (frameCount % 2 === 0 ) {
        if (value<10)
        {
            value = value*80;
        }
        else if(value<100)
        {
            value = value *15;
        }
        else if(value<200)
        {
            value = value *8;
        }

        osc.freq(value);
    
        envelope.play(osc, 0, 0.1);
    }
    
}