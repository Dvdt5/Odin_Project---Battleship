import { player } from "./index";

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
        shipInfoText.textContent = "Place Your Patrol Boat ";

        const rotateShipBtn = document.createElement("i");
        rotateShipBtn.classList.add("fa");
        rotateShipBtn.classList.add("fa-repeat");

        shipInfoText.appendChild(rotateShipBtn);
        layoutPage.appendChild(shipInfoText);
        layoutPage.appendChild(this.renderGameBoard(board));

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
                    boardCell.style.backgroundColor = "white";
                }
                else if (board[row][col] === "X"){
                    boardCell.style.backgroundColor = "red";
                }
                else if (board[row][col] === "O"){
                    boardCell.style.backgroundColor = "gray";
                }
                else {
                    boardCell.style.backgroundColor = "blue";
                }

                layoutBoard.appendChild(boardCell);
            }
        }

        return layoutBoard;
    }

}
