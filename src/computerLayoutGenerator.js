import { computer } from "./index.js";


const layouts = [
    [
        ["Destroyer", true, 1, 1],
        ["Submarine" , true, 8, 1],
        ["Cruiser" , false, 2, 5],
        ["BattleShip" , false, 3, 0],
        ["Carrier" , false, 1,9]
    ],
    [
        ["Destroyer", false, 8, 3],
        ["Submarine" , true, 1, 6],
        ["Cruiser" , true, 3, 2],
        ["BattleShip" , false, 5, 8],
        ["Carrier" , false, 5,0]
    ],
    [
        ["Destroyer", true, 8, 8],
        ["Submarine" , false, 4, 5],
        ["Cruiser" , false, 0, 9],
        ["BattleShip" , false, 5, 2],
        ["Carrier" , true, 1, 0]
    ],
    [
        ["Destroyer", false, 2, 5],
        ["Submarine" , false, 0, 0],
        ["Cruiser" , false, 3, 2],
        ["BattleShip" , true, 9, 6],
        ["Carrier" , false, 0,8]
    ]
];


export function generateLayout(){
    computer.gameBoard.newBoard();

    const layout = layouts[Math.floor(Math.random() * 4)];

    layout.forEach(ship => {
        if (ship[1] == true){
            computer.gameBoard.rotateShip(ship[0]);
        }
        computer.gameBoard.addShip(ship[0], ship[2], ship[3]);
    })
}