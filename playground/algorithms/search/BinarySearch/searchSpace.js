
class searchSpace
{
    constructor()
    {
        this.x = 0;
        this.y = 6*scl;
        this.variable = 0;
        this.color = [95,158,160];
        
        this.variableAndColors = [];
        this.myArray = [];
        this.searched = [];
    }

    setup(number)
    {
        /*this.x = floor(width/2) - scl*number;
        this.y = floor(height/2);
        for(var i=0; i<number; i++)
        {
            this.myArray[i] = createVector(this.x,this.y,this.variable);
            this.variable++;
            this.x = this.x + scl*2 ;
            
        }
        */
       for(var i=0; i<number; i++)
       {
            this.variableAndColors = [this.variable,this.color]
            this.myArray[i] = createVector(this.x,this.y,this.variableAndColors);
            this.variable++;
            if(this.x < width - scl*2)
            {
                this.x = this.x + scl*2 ;
            }
           else
           {
                this.x = 0;
                this.y = this.y + scl*6 ;
           }
        
       }


    }
    update(midPoint,newSearchArea,found)
    {
        if(found == true)
        {
            this.myArray[midPoint].z[1] = [127,255,0]
        } 
        else if(newSearchArea == 'Greater')
        {
            for(var i=0; i<=midPoint; i++)
            {
                this.myArray[i].z[1] = [255,160,122];
            }

        

        }
        else
        {
            for(var i = midPoint; i<this.myArray.length; i++)
            {
                this.myArray[i].z[1] = [255,160,122];
            }
        }
        

        return i;
            
    }
    
    updateText()
    {
        for(var i=0; i<this.myArray.length; i++)
        {
            
            
        }
    }
    
    show(founded,midPoint,newSearchArea)
    {
        
        //this.update(midPoint,newSearchArea,founded)
        for(var i=0; i<this.myArray.length; i++)
        {
            fill(this.myArray[i].z[1]);
            rect(this.myArray[i].x,this.myArray[i].y,2*scl,scl)
            fill(255,215,0);
            textSize(10);
            text(this.myArray[i].z[0].toString(), this.myArray[i].x+scl/4, this.myArray[i].y+scl/1.5-7);
        }
        //this.updateText();
        
    }

    look(number,index)
    {
        if (this.myArray[index].z[0] == number)
            {
                
                return true;
            }

            return false;

    }
    select(index)
    {
        this.myArray[index].y = this.myArray[index].y - 2*scl
    }

    release(index)
    {
        
        this.myArray[index].y = this.myArray[index].y + 2*scl
        this.searched[index] = 0;
    }

    number(index)
    {
        return this.myArray[index].z[0];
    }

    
}