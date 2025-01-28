import { player, computer } from "./index";


export class GameController {

    constructor(){
        this.currentTurn = "Player";
    }

    turnPass(){
        if (this.currentTurn === "Player"){
            this.currentTurn = "Computer";
            document.getElementById("player-side-text").style.borderLeft = "black 5px solid";
            document.getElementById("computer-side-text").style.borderLeft = "none";
            document.getElementById("computer-side").style.pointerEvents = "none";

        } else {
            this.currentTurn = "Player";
            document.getElementById("computer-side-text").style.borderLeft = "black 5px solid";
            document.getElementById("player-side-text").style.borderLeft = "none";
            document.getElementById("computer-side").style.pointerEvents = "all";
        }
        this.turnPlay();
    }

    turnPlay(xCord = null, yCord = null){
        if (this.currentTurn === "Computer"){
            this.computersTurn(xCord, yCord);
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
        }
        else {
            const attackSideRandomer = Math.floor(Math.random() * 4);
            if ((xCord - 1 >= 0) && (attackSideRandomer == 0) && (player.gameBoard.board[yCord][xCord - 1] != "O" && player.gameBoard.board[yCord][xCord - 1] != "X")){
                player.gameBoard.recieveAttack(xCord - 1,yCord);
            }
            else if ((xCord + 1 > 10) && (attackSideRandomer == 1) && (player.gameBoard.board[yCord][xCord + 1] != "O" && player.gameBoard.board[yCord][xCord + 1] != "X")){
                player.gameBoard.recieveAttack(xCord + 1,yCord);
            }
            else if ((yCord + 1 < 10) && (attackSideRandomer == 2) && (player.gameBoard.board[yCord  + 1][xCord] != "O" && player.gameBoard.board[yCord  + 1][xCord] != "X")){
                player.gameBoard.recieveAttack(xCord,yCord + 1);
            }
            else if ((yCord - 1 >= 0) && (attackSideRandomer == 3) && (player.gameBoard.board[yCord  - 1][xCord] != "O" && player.gameBoard.board[yCord  - 1][xCord] != "X")){
                player.gameBoard.recieveAttack(xCord,yCord - 1);
            } else {
                xCord = Math.floor(Math.random() * 10);
                yCord = Math.floor(Math.random() * 10);
                while (player.gameBoard.board[yCord][xCord] === "O" || player.gameBoard.board[yCord][xCord] === "X" ){
                    xCord = Math.floor(Math.random() * 10);
                    yCord = Math.floor(Math.random() * 10);
                }
                player.gameBoard.recieveAttack(xCord,yCord); 
            }
        }
        

    }

}