

export class Ship {

    constructor(name ,size){
        this.name = name;
        this.size = size;
        this.hitTaken = 0;
        this.sunken = false;
        this.isVertical = false;
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