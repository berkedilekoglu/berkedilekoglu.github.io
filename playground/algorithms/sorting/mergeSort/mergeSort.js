alert("Please Expand Your Browsers' Window Before Simulation!");

alert("After enter Rectangle Width and Frame Rate your simulation will start!");

var recWidth = Number(window.prompt("Enter the rectangle width (Lower width -> High number of elements! 5 is recommended): ",5));
var fr = Number(window.prompt("Enter the Frame Rate (100 is recommended! For more slow frames give lower numbers): ",100));
var control2 = 'start';
var control = 'leftPart';
var timeOuter;
var currentSize = 1;
var leftStart = 0;
var midPoint = 0;
var rightStart = 0;

var nLeft = 0;
var nRight = 0; 
var leftArray = []; // create an empty array for left half
var rightArray = []; // create an empty array for right half
var index = 0;
var leftIndex = 0;
var rightIndex = 0;

var i= 0;
var j= 0;


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
            mergeArray = new mergeSpace();
            mergeArray.setup();

            startTime = window.performance.now();
        }
        else
        {
            noLoop();
        }
    }
    else
    {
        mergeArray = new mergeSpace();
        
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
    if(currentSize < (mergeArray.len()-1 ))
    {
        
        if(leftStart<(mergeArray.len()-1 ))
        {

            midPoint = findmin(leftStart+currentSize-1,mergeArray.len()-1);
            rightStart = findmin(leftStart + 2*currentSize-1,mergeArray.len()-1);
            // mergeHalves(mergeArray,leftStart, midPoint, rightStart);
            if(control2 == 'start')
            {
                nLeft = midPoint - leftStart + 1;
                nRight = rightStart - midPoint; 
                leftArray = new Array(nLeft); // create an empty array for left half
                rightArray = new Array(nRight); // create an empty array for right half
                index = leftStart;
                leftIndex = 0;
                rightIndex = 0;
                
                mergeArray.selectMid(midPoint);
                
                control2 = 'pass';
                i = 0;
                j = 0;
            }
            else
            {
                
                if(control=='leftPart')
                {
                    
                    if(i<nLeft)
                    {

                        createLeftPart(i,leftArray,leftStart);
                        i++;
                        
                    }
                    else
                    {
                        
                        control = 'rightPart'
                    }
                }
                else if(control=='rightPart')
                {
                    
                    if(j<nRight)
                    {
                        createRightPart(j,rightArray,midPoint);
                        j++;
                    }
                    else
                    {
                        control = 'merge'
                        
                    }
                }
                else if(control =='merge')
                {
                    if(leftIndex < nLeft && rightIndex < nRight)
                    {
                        
                        if(leftArray[leftIndex] < rightArray[rightIndex])
                        {
                            numberOfComparison ++;
                            numberOfReplacement++;
                            song(leftArray[leftIndex]);
                            mergingLeft(index,leftIndex,leftArray);
                            leftIndex++;
                           
                        }
                        else
                        {
                            numberOfComparison ++;
                            numberOfReplacement++;
                            song(rightArray[rightIndex]);
                            mergingRight(index,rightArray,rightIndex);
                            rightIndex++;
                        }
                        
                        index++;
                    }
                    else
                    {
                        numberOfComparison ++;
                        control = 'mergeLeft';
                    }
                }
                else if(control == 'mergeLeft')
                {
                    if(leftIndex < nLeft)
                    {
                        numberOfComparison ++;
                        numberOfReplacement++;
                        song(leftArray[leftIndex]);
                        mergeLeft(index,leftArray,leftIndex)
                        leftIndex++;
                        index++;
                    }
                    else
                    {
                        numberOfComparison ++;
                        control = 'mergeRight';
                    }
                }
                else if(control == 'mergeRight')
                {
                    if(rightIndex < nRight)
                    {
                        numberOfComparison ++;
                        numberOfReplacement++;
                        song(rightArray[rightIndex]);
                        mergeRight(index,rightArray,rightIndex)
                        rightIndex++;
                        index++;
                    }
                    else
                    {
                        numberOfComparison ++;
                        control = 'leftPart';
                        control2 = 'start';
                        leftStart += 2*currentSize;
                    }
                }
               

            }
            
            

            
        }


        else
        {
            mergeArray.releaseAll();
            leftStart = 0;
            currentSize = 2*currentSize;
        }


    }
    else
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
    text('Number Of Elements: '+ mergeArray.len().toString(), 10, 20);
    
    if(startCheck==false)
    {
        background(0);
        textSize(20);
        fill(211,211,211);
        text('Click Here To Start', 10, 90);
    }
    mergeArray.show();
    
}

function findmin(x,y)
{
    if(x<y)
    {
        return x;
    }
    else
    {
        return y;
    }
}
function createLeftPart(i,leftArray,leftStart)
{
    
    leftArray[i] = mergeArray.at(leftStart+i);
}

function createRightPart(j,rightArray,midPoint)
{
   
    
    rightArray[j] = mergeArray.at(midPoint+1+j);
        
    
}
function mergingLeft(index,leftIndex,leftArray)
{
    mergeArray.selectLeft(index);
    mergeArray.set(index,leftArray[leftIndex]);
}
function mergingRight(index,rightArray,rightIndex)
{
    mergeArray.selectRight(index);
    mergeArray.set(index,rightArray[rightIndex]);
}

function mergeLeft(index,leftArray,leftIndex)
{
    mergeArray.selectLeft(index);
    mergeArray.set(index,leftArray[leftIndex]);
    
}

function mergeRight(index,rightArray,rightIndex)
{
    mergeArray.selectRight(index);
    mergeArray.set(index,rightArray[rightIndex]);
    
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

