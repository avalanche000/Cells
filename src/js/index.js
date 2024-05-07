import Grid from "./Grid.js";
import { query } from "./utils.js";

const grid = new Grid(query("#gridContainer"), 20, 15);

let running = true;

grid.setAll(0);

grid.setDraw(cell => {
    const gray = 255 - cell.data * 3;

    cell.element.style.backgroundColor = `rgb(${gray}, ${gray}, ${gray})`;
    cell.element.style.borderWidth = `${cell.data / 255 * 20 + 1}px`;
});

grid.setUpdate(cell => {
    let count = 0;
    let total = 0.1;

    [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]].forEach(pos => {
        count += cell.over(...pos).data ** 3;
        total += cell.over(...pos).data ** 2;
    });

    const average = count / total;

    return (average + cell.data) / 2.1;
});

grid.setOnClick(cell => {
    cell.data = 255;

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
