
class bubbleSpace
{
    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.myBoxes = [];
        this.yPositions = [];
        this.colors = [255,215,0]
        
    }
    setup()
    {
        
       
        var index = 0;
        this.y = Math.floor((Math.random() * windowHeight) + 0);
        this.yPositions.push(this.y);
        this.myBoxes[index] = createVector(this.x,this.yPositions[index])
        index++;
        
        while(this.x + recWidth < width)
        {
            this.y = Math.floor((Math.random() * windowHeight) + 0);
            if (this.yPositions.indexOf(this.y) == -1)
            {
                this.x = this.x + recWidth + 1;
                this.yPositions.push(this.y);
                this.myBoxes[index] = createVector(this.x,this.yPositions[index],this.colors)
                index ++;
            }
            
        }
    }
   show()
   {
       for(var i=0; i<this.myBoxes.length; i++)
       {
            fill(this.myBoxes[i].z);
            rect(this.myBoxes[i].x,windowHeight-this.myBoxes[i].y,recWidth,this.myBoxes[i].y)   
       }
   }
   
   select(currentIndex)
   {
    this.myBoxes[currentIndex].z = [255,0,0]; //Red
    this.myBoxes[currentIndex+1].z = [250,128,114]; //Salmon

   }
   release(currentIndex)
   {
    this.myBoxes[currentIndex].z = [255,215,0]; //Yellow
    this.myBoxes[currentIndex+1].z = [255,215,0]; //Yellow
   }
   
   replace(currentIndex)
   {
       if(this.myBoxes[currentIndex].y > this.myBoxes[currentIndex+1].y)
       {
        var maxValue = this.myBoxes[currentIndex].y;

        this.myBoxes[currentIndex].y = this.myBoxes[currentIndex+1].y;
        this.myBoxes[currentIndex].z = [154,205,50] //Green
 
        this.myBoxes[currentIndex+1].y = maxValue;
        return true;
       }
       return false;
       
   }

   len()
   {
       return this.myBoxes.length;
   }
   getValue(index)
   {
       return this.myBoxes[index].y;
   }


    
}