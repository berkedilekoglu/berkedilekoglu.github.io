alert("Please Expand Your Browsers' Window Before Simulation!");

alert("After enter Rectangle Width and Frame Rate your simulation will start!");

var recWidth = Number(window.prompt("Enter the rectangle width (Lower width -> High number of elements! 5 is recommended): ",5));
var fr = Number(window.prompt("Enter the Frame Rate (100 is recommended! For more slow frames give lower numbers): ",100));
var control2 = 'start';
var control = 'start';

var maxValue = 0;
var exp1 = 1;
var outputArray = [];
var countArray = [];
var i = 0;
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
            radixArray = new radixSpace();

            radixArray.setup();
            maxValue = getMax();
            

            startTime = window.performance.now();
        }
        else
        {
            noLoop();
        }
    }
    else
    {
        radixArray = new radixSpace();
        createCanvas(windowWidth, windowHeight);
    }
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

    if(Math.floor(maxValue/exp1)>0)
    {
        if(control=='start')
        {
            outputArray = createArray(radixArray.len());
            countArray = createArray(10);
            control = 'step1';
        }
        else if(control=='step1' && i < radixArray.len())
        {
            var index = Math.floor((radixArray.at(i)/exp1));
            
            countArray[index%10] += 1
            i++;
        }
        else if(control=='step1' && i >= radixArray.len())
        {
            control='step2';
            i=1;
        }
        else if(control=='step2' && i < 10)
        {
            countArray[i] += countArray[i-1]
            i++;
        }
        else if(control=='step2' && i >= 10)
        {
            control='step3';
            i=radixArray.len()-1;
        }
        else if(control=='step3' && i >= 0)
        {
            
            numberOfComparison++;
            song(radixArray.at(i))
            var index = Math.floor((radixArray.at(i)/exp1));
            radixArray.selectRight(i);
            outputArray[ countArray[(index)%10] - 1] = radixArray.at(i)
            countArray[ (index)%10 ] -= 1
            
            i --;
        }
        else if(control=='step3' && i < 0)
        {
            control = 'step4';
            i = 0
        }
        else if(control=='step4' && i < radixArray.len())
        {
            radixArray.selectLeft(i);
            song(radixArray.at(i));
            var value = outputArray[i];
            numberOfReplacement++;
            radixArray.set(i,value);
            i++;
        }
        else if(control=='step4' && i >= radixArray.len())
        {
            radixArray.releaseAll();
            control = 'start';
            exp1 *= 10;
            i=0;
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
    text('Number Of Elements: '+ radixArray.len().toString(), 10, 20);
    
    if(startCheck==false)
    {
        background(0);
        textSize(20);
        fill(211,211,211);
        text('Click Here To Start', 10, 90);
    }

    radixArray.show();
    
    // console.log(outputArray)
    // console.log(countArray)
    
}

function getMax()
{
    var maxNumber = radixArray.at(0);
    for(var i=1; i<radixArray.len(); i++)
    {
        if(radixArray.at(i)>maxNumber)
        {
            maxNumber = radixArray.at(i);
        }
    }
    return maxNumber;
}

function createArray(l)
{
    var myArray = new Array(l);
    for(var i=0; i<l; i++)
    {
        myArray[i] = 0;
    }
    return myArray;
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