alert("Please Expand Your Browsers' Window Before Simulation!");

alert("After enter Rectangle Width and Frame Rate your simulation will start!");

var recWidth = Number(window.prompt("Enter the rectangle width (Lower width -> High number of elements! 5 is recommended): ",5));
var fr = Number(window.prompt("Enter the Frame Rate (100 is recommended! For more slow frames give lower numbers): ",100));
var control2 = 'topFree';
var control = 'start';
var endTime = 0;
var startTime = 0;

var topIndex = -1;
var rightIndex = 0;
var leftIndex = 0;
var pivot = 0;

var j = 0;
var x = 0;

var numberOfReplacement = 0;
var numberOfComparison = 0;
var endTime = 0;
var startTime = 0;

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
            frameRate(fr);
            quickSpaceArray = new quickSpace();
            quickSpaceArray.setup();

            quickStackArray = new quickStack();
            quickStackArray.setup(quickSpaceArray.len());

            startTime = window.performance.now();
            topIndex++;
            quickStackArray.push(topIndex,0);
            topIndex++;
            quickStackArray.push(topIndex,quickSpaceArray.len()-1);
        }
        else
        {
            noLoop();
        }
    
    } 
    else
    {
        quickSpaceArray = new quickSpace();
        quickSpaceArray.setup();
        quickStackArray = new quickStack();
        quickStackArray.setup(quickSpaceArray.len());
        topIndex++;
        quickStackArray.push(topIndex,0);
        topIndex++;
        quickStackArray.push(topIndex,quickSpaceArray.len()-1);
        createCanvas(windowWidth, windowHeight);
    }

}
function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){
    
    background(0);
    // noLoop();
    
    if(control2=='topFree')
    {
        if(control == 'start')
        {

            rightIndex = quickStackArray.pop(topIndex);
            // console.log(topIndex)
            // console.log(quickStackArray)
            topIndex--;
            leftIndex = quickStackArray.pop(topIndex);
            topIndex--;
            control = 'pivot';
            j = leftIndex;
            x = quickSpaceArray.at(rightIndex);
            pivot = leftIndex -1;
            quickSpaceArray.selectPivot(rightIndex);
            quickSpaceArray.selectRight(leftIndex);
        }
        

        else if(control == 'pivot')
        {
            if(j <= (rightIndex -1))
            {
                numberOfComparison++;
                if(quickSpaceArray.at(j)<=x)
                {

                    pivot++;
                    song(pivot)
                    song(j)
                    quickSpaceArray.swap(pivot,j);
                    numberOfReplacement++;
                }
                j++;
                quickSpaceArray.selectLeft(j);
                
            }
            else
            {
                
                quickSpaceArray.selectLeft(rightIndex);
                song(pivot+1)
                song(rightIndex)
                quickSpaceArray.swap(pivot+1,rightIndex);
                numberOfReplacement++;
                pivot++;
                quickSpaceArray.selectPivot(pivot);
                
                control = 'leftstack';
            }
            
        }
        else if(control == 'leftstack')
        {
            if(pivot-1> leftIndex)
            {
                topIndex++;
                quickStackArray.push(topIndex,leftIndex);
                topIndex++;
                quickStackArray.push(topIndex,pivot-1);
                
                
            }
            control = 'rightstack';
            
        }
        else if(control == 'rightstack')
        {
            if(pivot+1 < rightIndex)
            {
                topIndex++;
                quickStackArray.push(topIndex,pivot+1);
                topIndex++;
                quickStackArray.push(topIndex,rightIndex);
                
                
                
            }
            if(topIndex < 0)
            {
                
                control2 = 'topProblem';
            }
            control = 'start';
            quickSpaceArray.releaseAll();
        }
        
        


    }
    else
    {
        noLoop();
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
    text('Number Of Elements: '+ quickSpaceArray.len().toString(), 10, 20);
    

    if(startCheck==false)
    {
        background(0);
        textSize(20);
        fill(211,211,211);
        text('Click Here To Start', 10, 90);
    }
    quickSpaceArray.show();
    

    
    
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




