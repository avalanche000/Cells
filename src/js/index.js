import Grid from "./Grid.js";
import { query } from "./utils.js";

const grid = new Grid(query("#gridContainer"), 50, 50, "stop");

let running = true;
let state = 0;

grid.setAll(3);

grid.setDraw(cell => {
    // 0: empty, 1: dirt, 2: water, 3: flammable, 4: fire
    cell.element.style.backgroundColor = ["white", "#402d0b", "#1551d1", "#16a119", "#ed601a"][cell.data];
});

grid.setUpdate(cell => {
    switch (cell.data) {
        case 0:
            break;
        case 1: // dirt
            break;
        case 2: // water
            break;
        case 3: // flammable
            let fire = 0;

            cell.ring(2).forEach(otherCell => {
                if (otherCell == null) return;
                if (otherCell.data === 4) fire += 1;
            });

            if (Math.random() < fire / 200) return 4;
            break;
        case 4: // fire
            let surrounding = 1;
            let flammable = false;

            cell.ring(2).forEach(otherCell => {
                if (otherCell == null) return;
                if (otherCell.data === 3) {
                    flammable = true;
                }

                surrounding += otherCell.data === 4 ? 3 : 0;
            });

            if (flammable) return;

            return Math.random() < 0.1 / surrounding ? 0 : 4;
        default:
            return 0;
    }
});

grid.setOnClick((cell, event) => {
    if (event.button === 0) {
        cell.data = state;

        grid.draw();
    }
});

grid.draw();

window.addEventListener("keydown", event => {
    if (event.code === "Space") running = !running;
});

window.addEventListener("contextmenu", event => {
    if (event.button === 2) {
        state = (state + 1) % 5;
    }
    event.preventDefault();
    event.stopPropagation();
});

function loop() {
    if (running) {
        grid.update();
        grid.draw();
    }

    requestAnimationFrame(loop);
}

loop();
