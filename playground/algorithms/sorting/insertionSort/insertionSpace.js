
class insertionSpace
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
    this.myBoxes[currentIndex].z = [154,205,50] //Green   
    
   }
   checking(index)
   {
    this.myBoxes[index].z = [255,0,0]; //Red
   }
   release(currentIndex)
   {
    this.myBoxes[currentIndex].z = [255,215,0]; //Yellow
   }
   
   replace(currentIndex,replacedIndex)
   {
       
        var minValue = this.myBoxes[currentIndex].y;
        
        
        for(var i=currentIndex; i>replacedIndex; i--)
        {
            
            var temp = this.myBoxes[i-1].y;
            this.myBoxes[i].y = temp;
            
        }

        this.myBoxes[replacedIndex].y = minValue;
        // this.myBoxes[replacedIndex].z = [154,205,50] //Green   
       
   }

   value(index)
   {
       return this.myBoxes[index].y;
   }

   len()
   {
       return this.myBoxes.length;
   }


    
}