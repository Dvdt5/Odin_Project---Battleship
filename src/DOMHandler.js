import { player, computer } from "./index";
import { GameController } from "./gameController";

const gameController = new GameController;

export class DOMHandler {


    openShipLayoutBoard(board) {
        const currShip = player.gameBoard.ships.filter(ship => ship.isPlaced == false)[0] || null;

        if (currShip === null){
            this.confirmLayoutPage(board);
            return;
        }

        if (document.querySelector("#player-input-page")) {
            document.getElementById("player-input-page").remove();
        }
        if (document.querySelector("#example-ship")) {
            document.getElementById("example-ship").remove();
        }
        

        const main = document.getElementById("content");
        

        const layoutPage = document.createElement("div");
        layoutPage.id = "player-input-page";
        
        const exampleShip = document.createElement("div");
        exampleShip.id = "example-ship";
        if (currShip.isVertical){
            exampleShip.classList.add("column");
            exampleShip.classList.remove("row");
        }
        main.appendChild(exampleShip);
        exampleShip.classList.add("row");

        const shipInfoText = document.createElement("h2");
        shipInfoText.id = "ship-info-text";

        
        if (!exampleShip.hasChildNodes()) {
            for (let i = 0; i < currShip.size; i++){
                exampleShip.appendChild(document.createElement("div"));
            }
        }

        shipInfoText.textContent = `Place your ${currShip.name ? currShip.name:"hi"} `;

        const rotateShipBtn = document.createElement("i");
        rotateShipBtn.classList.add("fa");
        rotateShipBtn.classList.add("fa-repeat");
        rotateShipBtn.style.cursor = "pointer";

        rotateShipBtn.addEventListener("click", ()=>{
            const tempShip = document.getElementById("example-ship");
            player.gameBoard.rotateShip(currShip.name);
            tempShip.classList.toggle("row");
            tempShip.classList.toggle("column");
            
        });
        

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

    confirmLayoutPage(board){
        if (document.querySelector("#player-input-page")) {
            document.getElementById("player-input-page").remove();
        }
        if (document.querySelector("#example-ship")) {
            document.getElementById("example-ship").remove();
        }
        

        const main = document.getElementById("content");
        

        const layoutPage = document.createElement("div");
        layoutPage.id = "player-input-page";


        const confirmBoardBtn = document.createElement("div");
        confirmBoardBtn.id = "confirm-board-btn";
        confirmBoardBtn.textContent = "Confirm Layout";
        confirmBoardBtn.addEventListener("click",()=> this.refreshBoards(player.gameBoard.board, computer.gameBoard.board));


        const resetBoardBtn = document.createElement("div");
        resetBoardBtn.id = "reset-board-btn";
        resetBoardBtn.textContent = "Reset Layout";
        resetBoardBtn.addEventListener("click", ()=>{
            player.gameBoard.ships.forEach(ship => ship.isPlaced = false);
            document.getElementById("reset-board-btn").remove();
            document.getElementById("confirm-board-btn").remove();
            this.openShipLayoutBoard(player.gameBoard.newBoard());
        })
        
        

        const shipInfoText = document.createElement("h2");
        shipInfoText.id = "ship-info-text";

        shipInfoText.textContent = `Confirm your Layout`;

        
        layoutPage.appendChild(shipInfoText);

        const boardToConfirm = this.placeShipsBoard(board);
        boardToConfirm.style.pointerEvents = "none";
        layoutPage.appendChild(boardToConfirm);

        main.appendChild(layoutPage)
        main.appendChild(confirmBoardBtn)
        main.appendChild(resetBoardBtn)
    }

    renderComputerBoard(board){
        const layoutBoard = document.createElement("div");
        layoutBoard.id = "input-board";
        layoutBoard.classList.add("board");

        for (let row = 0; row < 10; row++){
            for (let col = 0; col < 10; col++){
                const boardCell = document.createElement("div");
                boardCell.classList.add("cell");
                boardCell.addEventListener("click", ()=> {
                    computer.gameBoard.recieveAttack(col,row);
                    this.refreshBoards(player.gameBoard.board, computer.gameBoard.board);
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

    renderPlayerBoard(board){
        const layoutBoard = document.createElement("div");
        layoutBoard.id = "input-board";
        layoutBoard.classList.add("board");

        for (let row = 0; row < 10; row++){
            for (let col = 0; col < 10; col++){
                const boardCell = document.createElement("div");
                boardCell.classList.add("cell");

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



    refreshBoards(playerBoard, computerBoard){
        if (document.querySelector("#gameplay-page")) {
            document.getElementById("gameplay-page").remove();
        }
        document.getElementById("content").innerHTML = "";
        const main = document.getElementById("content");

        const playerSide = document.createElement("div");
        const playerInfoText = document.createElement("p");
        playerInfoText.textContent = "Hello"
        playerSide.appendChild(playerInfoText);
        playerSide.appendChild(this.renderPlayerBoard(playerBoard));
        main.appendChild(playerSide);

        const computerSide = document.createElement("div");
        computerSide.appendChild(this.renderComputerBoard(computerBoard));
        main.appendChild(computerSide);

        
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
                    const currShip = player.gameBoard.ships.filter(ship => ship.isPlaced == false)[0];
                    player.gameBoard.addShip(currShip.name, col,row)
                    this.openShipLayoutBoard(player.gameBoard.board);
                    }
                );

                boardCell.addEventListener("mouseover", ()=>{
                    boardCell.classList.add("hoveredCell");     
                });

                boardCell.addEventListener("mouseout", ()=>{
                    boardCell.classList.remove("hoveredCell");
                });

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
