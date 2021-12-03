alert("Please Expand Your Browsers' Window Before Simulation!");

alert("After enter Rectangle Width and Frame Rate your simulation will start!");

var recWidth = Number(window.prompt("Enter the rectangle width (Lower width -> High number of elements! 5 is recommended): ",5));
var fr = Number(window.prompt("Enter the Frame Rate (100 is recommended! For more slow frames give lower numbers): ",100));
var control2 = 'swap';
var control = 'heap';

var left = 0;
var right = 0;
var index = 0;
var index2 = 0;
var length = 0;
var largest = 0;

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
            heapArray = new heapSpace();
            heapArray.setup();
            length = heapArray.len();
            index = Math.floor(heapArray.len()/ 2) - 1;
            index2 = Math.floor(heapArray.len()/ 2) - 1;
            startTime = window.performance.now();
        }
        else
        {
            noLoop();
        }
    }
    else
    {
        heapArray = new heapSpace();
        
        createCanvas(windowWidth, windowHeight);
        
    }
    
}
function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){
    
    background(0);

    if(control=='heap')
    {
        
        if(index >=0)
        {
            largest = index;
            left = 2*index + 1;
            right = 2*index + 2;
            
            if(left < length && heapArray.at(left) > heapArray.at(largest))
            {
                var mynote = heapArray.at(left);
                song(mynote);
                numberOfComparison++;
                largest = left;
            }

            if(right < length && heapArray.at(right) > heapArray.at(largest))
            {
                var mynote = heapArray.at(right);
                song(mynote);
                numberOfComparison++;
                largest = right;
            }

            if(largest != index)
            {
                numberOfComparison++;
                heapArray.selectLeft(index);
                heapArray.selectRight(largest);
                heapArray.swap(index,largest);
                numberOfReplacement++;
                index = largest;
            }
            else
            {
                heapArray.releaseAll();
                index = index2;
                index2--;
                index--;
            }
        }
        else
        {
            
            control = 'extract'
            index = length - 1;
            
        }


    }
    else if(control=='extract')
    {
        if(index > 0)
        {
            if(control2=='swap')
            {
                heapArray.selectLeft(0);
                heapArray.selectRight(index);
                heapArray.swap(0,index);
                numberOfReplacement++;
                control2 = 'heapify';
                length = index;
                index2 = 0;
                
            }
            else if(control2 == 'heapify')
            {
                largest = index2;
                left = 2*index2 + 1;
                right = 2*index2 + 2;
                
                if(left < length && heapArray.at(left) > heapArray.at(largest))
                {
                    var mynote = heapArray.at(right);
                    song(mynote);
                    numberOfComparison++;
                    largest = left;
                }
    
                if(right < length && heapArray.at(right) > heapArray.at(largest))
                {
                    var mynote = heapArray.at(left);
                    song(mynote);
                    numberOfComparison++;
                    largest = right;
                }
    
                if(largest != index2)
                {
                    numberOfComparison++;
                    heapArray.selectLeft(index2);
                    heapArray.selectRight(largest);
                    heapArray.swap(index2,largest);
                    numberOfReplacement++;
                    index2 = largest;
                }
                else
                {
                    
                    index--;
                    control2 = 'swap';
                }
            }
            
            
        }
        else
        {
            control='end';
            
        }

    }
    else if(control=='end')
    {
        noLoop();
        endTime = window.performance.now();
        runTime = (endTime-startTime)/1000;
        textSize(15);
        fill(211,211,211);
        heapArray.releaseAll();
        
    }
    textSize(20);
    fill(211,211,211);
    text('Number Of Comparisons: '+ numberOfComparison.toString(), 10, 60);
    textSize(20);
    fill(211,211,211);
    text('Number Of Replacements: '+ numberOfReplacement.toString(), 10, 40);
    textSize(20);
    fill(211,211,211);
    text('Number Of Elements: '+ heapArray.len().toString(), 10, 20);
    
    if(startCheck==false)
    {
        background(0);
        textSize(20);
        fill(211,211,211);
        text('Click Here To Start', 10, 90);
    }
    heapArray.show();
     
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



