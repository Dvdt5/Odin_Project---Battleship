import { DOMHandler } from "./DOMHandler.js";
import { Player } from "./player.js";
import "./styles.css";

const domHandler = new DOMHandler();
export const player = new Player("Player");
player.gameBoard.addShip("Carrier",4,4);
player.gameBoard.addShip("BattleShip",0,0);
player.gameBoard.addShip("Submarine",6,2);
player.gameBoard.addShip("Cruiser",3,9);
player.gameBoard.addShip("Destroyer",4,7);

const computer = new Player("Computer");

const startGameBtn = document.getElementById("start-game-btn");

startGameBtn.addEventListener("click", ()=> domHandler.closeStartScreen());