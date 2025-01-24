import { player, computer } from "./index";


export class GameController {

    constructor(){
        this.currentTurn = "Player";
    }

    turnPass(){
        if (this.currentTurn === "Player"){
            this.currentTurn = "Computer";
            
        } else {
            this.currentTurn = "Player";
        }
        this.turnPlay();
    }

    turnPlay(){
        if (this.currentTurn === "Computer"){
            this.computersTurn();
        }
    }

    computersTurn(x = null, y = null){
        let xCord = x;
        let yCord = y;
        if (xCord == null){    
            xCord = Math.floor(Math.random() * 10);
            yCord = Math.floor(Math.random() * 10);
            while (player.gameBoard.board[yCord][xCord] === "O" || player.gameBoard.board[yCord][xCord] === "X" ){
                xCord = Math.floor(Math.random() * 10);
                yCord = Math.floor(Math.random() * 10);
            }
            player.gameBoard.recieveAttack(xCord,yCord);
        
            this.turnPlay();

        } 
        

    }

}