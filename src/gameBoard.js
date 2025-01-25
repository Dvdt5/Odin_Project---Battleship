import { Ship } from "./ship";
import { DOMHandler } from "./DOMHandler";
import { GameController } from "./gameController";
import { player , computer } from "./index";

const gameController = new GameController;
const domHandler = new DOMHandler;

export class GameBoard {

    constructor (owner){
        this.owner = owner;
        this.board = this.newBoard();
        this.ships = [
            new Ship("Destroyer", 2, 1),
            new Ship("Submarine", 3, 2),
            new Ship("Cruiser", 3, 3),
            new Ship("BattleShip", 4, 4),
            new Ship("Carrier", 5, 5)
        ];
        this.missedTiles = [];
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
                this.board[yCord + i][xCord] = ship.id;
            }    
        }
        else {
            
            for (let i=0; i < ship.size;i++){
                this.board[yCord][xCord +i ] = ship.id;
            }
        }
        ship.isPlaced = true;
    }

    recieveAttack(xCord, yCord){
        if (this.isBlank(xCord, yCord)){
            this.board[yCord][xCord] = "O";
            this.missedTiles.push([xCord, yCord]);
            domHandler.shipHitMessage(this.owner, false);
            gameController.turnPass();
        }
        else {
            const ship = this.findShipById(this.board[yCord][xCord]);
            ship.hit();
            this.board[yCord][xCord] = "X";
            if (ship.sunken){
                domHandler.shipSunkMessage(ship.name, this.owner);
            } else {
                domHandler.shipHitMessage(this.owner, true);
            }
            setTimeout(()=>{
                gameController.turnPlay();
                domHandler.refreshBoards(player.gameBoard.board, computer.gameBoard.board);
            }, 1000)
            
        }
    }
    
    isBlank(xCord,yCord){
        
        return this.board[yCord][xCord] == 0 ? true : false;
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

    findShipById(id){
        return this.ships.filter((ship)=> ship.id == id)[0];
    }

    isIncorrectPlacement(ship, xCord, yCord){
        if (ship.isVertical) {
            if (yCord + ship.size > 10){
                return true;
            }
            for (let i=0; i < ship.size;i++){

                if (this.board[yCord + i][xCord] != 0) return true;
            }    
        }
        else {
            if (xCord + ship.size > 10){
                return true;
            }
            for (let i=0; i < ship.size;i++){
                if (this.board[yCord][xCord + i] != 0) return true;
            }
        }
        return false;
    }

    
}