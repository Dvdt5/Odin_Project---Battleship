

export class DOMHandler {


    openShipLayoutBoard() {

        const main = document.getElementById("content");

        const startPage = document.getElementById("start-page");
        startPage.remove();

        const layoutPage = document.createElement("div");
        layoutPage.id = "player-input-page";
        layoutPage.classList.add("animate");
        layoutPage.classList.add("pop");

        const shipInfoText = document.createElement("h2");
        shipInfoText.id = "ship-info-text";
        shipInfoText.textContent = "Place Your Patrol Boat ";

        const layoutBoard = document.createElement("div");
        layoutBoard.id = "input-board";
        layoutBoard.classList.add("board");

        const rotateShipBtn = document.createElement("i");
        rotateShipBtn.classList.add("fa");
        rotateShipBtn.classList.add("fa-repeat");

        for(let i = 0; i < 100; i++){
            const boardCell = document.createElement("div");
            boardCell.classList.add("cell");

            layoutBoard.appendChild(boardCell);
        }

        shipInfoText.appendChild(rotateShipBtn);
        layoutPage.appendChild(shipInfoText);
        layoutPage.appendChild(layoutBoard);

        main.appendChild(layoutPage)
    }

}
