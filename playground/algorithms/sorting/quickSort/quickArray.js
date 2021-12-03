class quickStack
{
    constructor()
    {
        this.myArray = [];
    }
    setup(size)
    {
        
        this.myArray =new Array(size);
    }
    push(index,value)
    {
        this.myArray[index] = value;
    }

    pop(index)
    {
        var item = this.myArray[index];
        this.myArray.splice(index, 1);
        return item;
    }

    len()
    {
        return this.myArray.length;
    }
}