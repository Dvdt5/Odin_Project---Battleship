import { DOMHandler } from "./DOMHandler";
import "./styles.css";

const domHandler = new DOMHandler();

const startGameBtn = document.getElementById("start-game-btn");

startGameBtn.addEventListener("click", ()=> domHandler.openShipLayoutBoard());