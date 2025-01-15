import { GameBoard } from "./gameBoard.js";



export class Player {

    constructor(name){
        this.name = name;
        this.gameBoard = new GameBoard;
    }
}