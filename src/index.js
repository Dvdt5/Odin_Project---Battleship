import { DOMHandler } from "./DOMHandler.js";
import { Player } from "./player.js";
import "./styles.css";

const domHandler = new DOMHandler();
export const player = new Player("Player");
export const computer = new Player("Computer");

const startGameBtn = document.getElementById("start-game-btn");

startGameBtn.addEventListener("click", ()=> domHandler.closeStartScreen());