import { player, computer } from "./index";
import { GameController } from "./gameController";
import { generateLayout } from "./computerLayoutGenerator";

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

        if (currShip.id === 1) {
            exampleShip.style.backgroundColor = "blue";
        }
        else if (currShip.id === 2) {
            exampleShip.style.backgroundColor = "yellow";
        }
        else if (currShip.id === 3) {
            exampleShip.style.backgroundColor = "yellowgreen";
        }
        else if (currShip.id === 4) {
            exampleShip.style.backgroundColor = "cornflowerblue";
        }
        else if (currShip.id === 5) {
            exampleShip.style.backgroundColor = "rebeccapurple"; 
        }

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
        confirmBoardBtn.addEventListener("click",()=>{
            generateLayout();
            this.gameplayPage(player.gameBoard.board, computer.gameBoard.board);
        })


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
        layoutBoard.id = "computer-input-board";
        layoutBoard.classList.add("board");

        for (let row = 0; row < 10; row++){
            for (let col = 0; col < 10; col++){
                const boardCell = document.createElement("div");
                boardCell.classList.add("cell");
                boardCell.addEventListener("click", ()=> {
                    if (gameController.currentTurn === "Player"){
                        computer.gameBoard.recieveAttack(col,row);
                        this.refreshBoards(player.gameBoard.board, computer.gameBoard.board);
                    } else {
                        return;
                    }
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
                

                layoutBoard.appendChild(boardCell);
            }
        }

        return layoutBoard;
    }

    renderPlayerBoard(board){
        const layoutBoard = document.createElement("div");
        layoutBoard.id = "player-status-board";
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
                else if (board[row][col] === 1) {
                    boardCell.classList.add("ship");
                    boardCell.classList.add("destroyer");
                }
                else if (board[row][col] === 2) {
                    boardCell.classList.add("ship");
                    boardCell.classList.add("submarine");
                }
                else if (board[row][col] === 3) {
                    boardCell.classList.add("ship");
                    boardCell.classList.add("cruiser");
                }
                else if (board[row][col] === 4) {
                    boardCell.classList.add("ship");
                    boardCell.classList.add("battleship");
                }
                else if (board[row][col] === 5) {
                    boardCell.classList.add("ship");
                    boardCell.classList.add("carrier");
                }

                layoutBoard.appendChild(boardCell);
            }
        }

        return layoutBoard;
    }

    refreshBoards(playerBoard, computerBoard){
        if (document.querySelector("#player-status-board")) {
            document.getElementById("player-status-board").remove();
        }
        if (document.querySelector("#computer-input-board")) {
            document.getElementById("computer-input-board").remove();
        }

        document.getElementById("player-side").appendChild(this.renderPlayerBoard(playerBoard));
        document.getElementById("computer-side").appendChild(this.renderComputerBoard(computerBoard));
    }

    gameplayPage(playerBoard, computerBoard){
        if (document.querySelector("#gameplay-page")) {
            document.getElementById("gameplay-page").remove();
        }
        document.getElementById("content").innerHTML = "";
        const main = document.getElementById("content");

        const playerSide = document.createElement("div");
        playerSide.id = "player-side";
        const playerInfoText = document.createElement("h2");
        playerInfoText.id = "player-side-text";
        playerInfoText.textContent = "Players Board"
        playerSide.appendChild(playerInfoText);
        playerSide.appendChild(this.renderPlayerBoard(playerBoard));
        main.appendChild(playerSide);

        const computerSide = document.createElement("div");
        computerSide.id = "computer-side";
        const computerInfoText = document.createElement("h2");
        computerInfoText.id = "computer-side-text";
        computerInfoText.textContent = "Computers Board"
        computerSide.appendChild(computerInfoText);
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
                else if (board[row][col] === 1) {
                    boardCell.classList.add("ship");
                    boardCell.classList.add("destroyer");
                }
                else if (board[row][col] === 2) {
                    boardCell.classList.add("ship");
                    boardCell.classList.add("submarine");
                }
                else if (board[row][col] === 3) {
                    boardCell.classList.add("ship");
                    boardCell.classList.add("cruiser");
                }
                else if (board[row][col] === 4) {
                    boardCell.classList.add("ship");
                    boardCell.classList.add("battleship");
                }
                else if (board[row][col] === 5) {
                    boardCell.classList.add("ship");
                    boardCell.classList.add("carrier");
                }


                layoutBoard.appendChild(boardCell);
            }
        }

        return layoutBoard;
    }

    shipSunkMessage(name, playerName){
        let text = "";
        let message = `${name} has Sunk!`;

        if (playerName === "Player"){
            text = document.getElementById("player-side-text");
        } else {
            text = document.getElementById("computer-side-text");
        }

        text.classList.add("animate");
        text.classList.add("pop");
        setTimeout(()=>{
            text.classList.remove("animate");
            text.classList.remove("pop");
        },200);
        text.textContent = message;
    }
    shipHitMessage(playerName, isHit){
        let text = "";
        let message = "";

        if (isHit){
            message = "A Ship got Hit!";
        } else {
            message = "Its a Miss!";
        }

        if (playerName === "Player"){
            text = document.getElementById("player-side-text");
        } else {
            text = document.getElementById("computer-side-text");
        }

        text.classList.add("animate");
        text.classList.add("pop");
        setTimeout(()=>{
            text.classList.remove("animate");
            text.classList.remove("pop");
        },200);
        text.textContent = message;
    }

}
