import { player } from "./index";
import { GameController } from "./gameController";

const gameController = new GameController;

export class DOMHandler {


    openShipLayoutBoard(board) {


        if (document.querySelector("#player-input-page")) {
            document.getElementById("player-input-page").remove();
        }

        const main = document.getElementById("content");
        

        const layoutPage = document.createElement("div");
        layoutPage.id = "player-input-page";
        

        const shipInfoText = document.createElement("h2");
        shipInfoText.id = "ship-info-text";

        const currShip = [];
        player.gameBoard.ships.forEach(ship => {
            if (!ship.isPlaced){
                currShip.push(ship.name);
            }
            shipInfoText.textContent = `Place your ${currShip[0] ? currShip[0]:"hi"} `;
        });

        const rotateShipBtn = document.createElement("i");
        rotateShipBtn.classList.add("fa");
        rotateShipBtn.classList.add("fa-repeat");

        shipInfoText.appendChild(rotateShipBtn);
        layoutPage.appendChild(shipInfoText);
        layoutPage.appendChild(this.placeShipsBoard(board));

        main.appendChild(layoutPage)
    }

    closeStartScreen(){

        const startPage = document.getElementById("start-page");
        startPage.remove();

        this.openShipLayoutBoard(player.gameBoard.board);
    }

    renderGameBoard(board){
        const layoutBoard = document.createElement("div");
        layoutBoard.id = "input-board";
        layoutBoard.classList.add("board");

        for (let row = 0; row < 10; row++){
            for (let col = 0; col < 10; col++){
                const boardCell = document.createElement("div");
                boardCell.classList.add("cell");
                boardCell.addEventListener("click", ()=> {
                    player.gameBoard.recieveAttack(col,row);
                    this.openShipLayoutBoard(player.gameBoard.board);
                    }
                );

                if (board[row][col] === 0){
                    boardCell.classList.add("undiscovered");
                }
                else if (board[row][col] === "X"){
                    boardCell.classList.add("hit");
                }
                else if (board[row][col] === "O"){
                    boardCell.classList.add("missed");
                }
                else {
                    boardCell.classList.add("ship");
                    
                }

                layoutBoard.appendChild(boardCell);
            }
        }

        return layoutBoard;
    }

    placeShipsBoard(board){
        const layoutBoard = document.createElement("div");
        layoutBoard.id = "input-board";
        layoutBoard.classList.add("board");

        for (let row = 0; row < 10; row++){
            for (let col = 0; col < 10; col++){
                const boardCell = document.createElement("div");
                boardCell.classList.add("cell");
                boardCell.addEventListener("click", ()=> {
                    player.gameBoard.ships.forEach(ship => {
                        if (!ship.isPlaced){
                            player.gameBoard.addShip(ship.name, col,row)
                        }
                    });
                    this.openShipLayoutBoard(player.gameBoard.board);
                    }
                );

                if (board[row][col] === 0){
                    boardCell.classList.add("undiscovered");
                }
                else if (board[row][col] === "X"){
                    boardCell.classList.add("hit");
                }
                else if (board[row][col] === "O"){
                    boardCell.classList.add("missed");
                }
                else {
                    boardCell.classList.add("ship");
                    
                }

                layoutBoard.appendChild(boardCell);
            }
        }

        return layoutBoard;
    }

    shipSunkMessage(name){
        const text = document.getElementById("info-text");
        text.textContent = `${name} has sunk!`;
    }

}
