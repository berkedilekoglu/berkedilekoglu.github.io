
class mergeSpace
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
        this.y = Math.floor((Math.random() * height) + 0);
        this.yPositions.push(this.y);
        this.myBoxes[index] = createVector(this.x,this.yPositions[index])
        index++;
        while(this.x + recWidth < width)
        {
            this.y = Math.floor((Math.random() * height) + 0);
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
            rect(this.myBoxes[i].x,height-this.myBoxes[i].y,recWidth,this.myBoxes[i].y)   
       }
   }
   
//    select(left,right)
//    {
    
//     for(var i=0 ; i < this.len(); i++)
//     {
//         this.myBoxes[i].z = [255,215,0]; //Yellow
//     }
//     for(var i = left; i<=right; i++)
//     {
//         this.myBoxes[i].z = [255,0,0]; //Red
//     }


//    }

  
   
  
   release(currentIndex)
   {
    this.myBoxes[currentIndex].z = [255,215,0]; //Yellow
   }

   releaseAll()
   {
       for(var i=0; i<this.len;i++)
       {
        this.myBoxes[i].z = [255,215,0]; //Yellow
       }
   }
   selectLeft(index)
   {
    this.myBoxes[index].z = [255,0,0]; //Red
   }
   selectRight(index)
   {
    this.myBoxes[index].z = [250,128,114]; //Salmon
   }
   selectMid(index)
   {
    this.myBoxes[index].z = [154,205,50]; //Green
   }
   
   
   
   replace(comparedIndex,minIndex)
   {
       var tempValue = this.myBoxes[comparedIndex].y;

       this.myBoxes[comparedIndex].y = this.myBoxes[minIndex].y;
       this.myBoxes[comparedIndex].z = [154,205,50]

       this.myBoxes[minIndex].y = tempValue;
       
   }

   len()
   {
       return this.myBoxes.length;
   }


   at(index)
   { //
       return this.myBoxes[index].y;
   }

   set(index,value)
   {
    
    this.myBoxes[index].y = value;
    
   }

   values()
   {
       for(var i=0; i<this.len(); i++)
       {
        console.log(this.myBoxes[i].y)
       }
       
   }

    
}