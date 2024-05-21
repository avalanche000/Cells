import Grid from "./Grid.js";
import { query } from "./utils.js";

const grid = new Grid(query("#gridContainer"), 20, 15, "stop");

let running = true;

grid.setAll(0);

grid.setDraw(cell => {
    // 0: empty, 1: dirt, 2: water, 3: wood, 4: fire
    cell.element.style.backgroundColor = ["white", "brown", "blue", "darkbrown", "orange"][cell.data];
});

grid.setUpdate(cell => {
    switch (cell.data) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        default:
            return 0;
    }
});

grid.setOnClick(cell => {
    cell.data += 1;
    cell.data %= 5;

    grid.draw();
});

grid.draw();

window.addEventListener("keydown", event => {
    if (event.code === "Space") running = !running;
});

function loop() {
    if (running) {
        grid.update();
        grid.draw();
    }

    requestAnimationFrame(loop);
}

loop();
