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
        return board;
    }

    addShip(name, xCord, yCord){
        const ship = this.findShipByName(name);
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
}