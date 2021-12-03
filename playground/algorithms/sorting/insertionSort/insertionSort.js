alert("Please Expand Your Browsers' Window Before Simulation!");

alert("After enter Rectangle Width and Frame Rate your simulation will start!");

var recWidth = Number(window.prompt("Enter the rectangle width (Lower width -> High number of elements! 5 is recommended): ",5));
var fr = Number(window.prompt("Enter the Frame Rate (100 is recommended! For more slow frames give lower numbers): ",100));
var control = 'selection';
var currentIndex = 1;
var checkingIndex = 0;
var changing = false;
var endTime = 0;
var startTime = 0;
var numberOfReplacement = 0;
var numberOfComparison = 0;

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
            insertion = new insertionSpace();
            insertion.setup();
            insertion.show();
            frameRate(fr);
            background(0);
            startTime = window.performance.now();
        }
        else
        {
            noLoop();
        }
    }
    else
    {
        insertion = new insertionSpace();
        
        createCanvas(windowWidth, windowHeight);
    }
}
function windowResized() 
{
    resizeCanvas(windowWidth, windowHeight);
}


function draw(){
    background(0);

    if(currentIndex < insertion.len())
    {
        if(control=='selection')
        {
            insertion.select(currentIndex);
            control = 'checking';
            checkingIndex = currentIndex - 1;
            changing = false;
        }
        else if(control =='checking')
        {
            
            var mynote = insertion.value(checkingIndex)
            song(mynote);
            if((insertion.value(checkingIndex) > insertion.value(currentIndex)))
            {
                changing = true;
                insertion.checking(checkingIndex);
                numberOfComparison ++;
                if(checkingIndex > 0)
                {

                    checkingIndex--;
                }
                else
                {
                    control = 'replace';
                }
                
            }
            else if(changing == true)
            {
                control = 'replace';
                changing = false;
            }
            else if(changing == false)
            {
                
                control = 'release';
            }
            

        }
        else if(control == 'replace')
        {
            
            if(changing == false)
            {
                insertion.replace(currentIndex,checkingIndex+1)
                control = 'release';
                numberOfReplacement += (currentIndex - checkingIndex)
            }
            else
            {
                insertion.replace(currentIndex,checkingIndex)
                control = 'release';
                numberOfReplacement += (currentIndex - checkingIndex + 1)
            }
            
            
            
        }
        else if(control == 'release')
        {
            for(var i=checkingIndex; i<currentIndex; i++)
            {
                insertion.release(i);
                
            }
            control = 'selection';
            currentIndex ++;
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
    text('Number Of Elements: '+ insertion.len().toString(), 10, 20);
    



    if(startCheck==false)
    {
        background(0);
        textSize(20);
        fill(211,211,211);
        text('Click Here To Start', 10, 90);
    }





    insertion.show()

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