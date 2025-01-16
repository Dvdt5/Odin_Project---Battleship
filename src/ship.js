

export class Ship {

    constructor(name ,size, id){
        this.id = id
        this.name = name;
        this.size = size;
        this.hitTaken = 0;
        this.sunken = false;
        this.isVertical = false;
        this.isPlaced = false;
    }

    hit(){
        this.hitTaken++;
        this.isSunk();
    }

    isSunk(){
        if (this.hitTaken == this.size){
            this.sunken = true;

        }
    }
}