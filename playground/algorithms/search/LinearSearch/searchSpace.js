
class searchSpace
{
    constructor()
    {
        this.x = 0;
        this.y = 6*scl;
        this.variable = 0;
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
           this.myArray[i] = createVector(this.x,this.y,this.variable);
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
    updateSearched(i)
    {
        
        for(i; i<this.searched.length; i++)
        {
            fill(255,160,122);
            rect(this.myArray[i].x,this.myArray[i].y,2*scl,scl);
        }

        return i;
            
    }
    updateWaitSearch(i)
    {
        for(i; i<this.myArray.length; i++)
        {
            fill(95,158,160);
            rect(this.myArray[i].x,this.myArray[i].y,2*scl,scl);
        }

        return i;
    }
    updateFounded(i,index)
    {
        for(i; i<this.myArray.length; i++)
        {
                
                
            if (i == index)
            {
                    
                fill(127,255,0);
                rect(this.myArray[i].x,this.myArray[i].y,2*scl,scl);
            }
            else
            {
                fill(95,158,160);
                rect(this.myArray[i].x,this.myArray[i].y,2*scl,scl);
            }
                
        }

        return i;
    }
    updateText()
    {
        for(var i=0; i<this.myArray.length; i++)
        {
            fill(255,215,0);
            textSize(10);
            text(this.myArray[i].z.toString(), this.myArray[i].x+scl/4, this.myArray[i].y+scl/1.5-7);
        }
    }

    show(founded,index)
    {
        
        var searchIndex = 0;
        if(founded == false)
        {
            searchIndex = this.updateSearched(searchIndex);
            searchIndex = this.updateWaitSearch(searchIndex);
        }
        else
        {
            searchIndex = this.updateSearched(searchIndex);
            
            searchIndex = this.updateFounded(searchIndex,index);

            
        }

        this.updateText();
    }

    look(number,index)
    {
        if (this.myArray[index].z == number)
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

    len()
    {
        return this.myArray.length;
    }

    
}