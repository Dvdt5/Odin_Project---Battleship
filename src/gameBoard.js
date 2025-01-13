import { Ship } from "./ship";



export class GameBoard {

    constructor (){
        this.board = this.newBoard();
        this.ships = [
            new Ship("Destroyer", 2),
            new Ship("Submarine", 3),
            new Ship("Cruiser", 3),
            new Ship("BattleShip", 4),
            new Ship("Carrier", 5)
        ];
    }


    newBoard(){
        let board = [];
        for (let r=0; r < 10; r++){
            let row = [];
            for (let c=0; c < 10; c++){
                row.push(0);
            }
            board.push(row);
        }
        this.board = board;
        return board;
    }

    addShip(name, xCord, yCord){
        const ship = this.findShipByName(name);

        if (this.isIncorrectPlacement(ship, xCord, yCord)){
            return;
        }

        if (ship.isVertical) {
            for (let i=0; i < ship.size;i++){
                this.board[yCord + i][xCord] = 1;
            }    
        }
        else {
            
            for (let i=0; i < ship.size;i++){
                this.board[yCord][xCord +i ] = 1;
            }
        }
        
    }

    rotateShip(name){
        this.ships.forEach(ship => {
            if (ship.name == name) {
                ship.isVertical = ship.isVertical ? false : true;
            }
        });
    }

    findShipByName(name){
        return this.ships.filter((ship)=> ship.name == name)[0];
    }

    isIncorrectPlacement(ship, xCord, yCord){
        if (ship.isVertical) {
            if (yCord + ship.size > 10){
                return true;
            }
            for (let i=0; i < ship.size;i++){

                if (this.board[yCord + i][xCord] == 1) return true;
            }    
        }
        else {
            if (xCord + ship.size > 10){
                return true;
            }
            for (let i=0; i < ship.size;i++){
                if (this.board[yCord][xCord + i] == 1) return true;
            }
        }
        return false;
    }
}