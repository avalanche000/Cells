import Grid from "./Grid.js";
import { query } from "./utils.js";

const grid = new Grid(query("#gridContainer"), 11, 11, {
    endMode: "stop",
    defaultData: {
        top: true,
        bottom: true,
        left: true,
        right: true,
        visited: false,
        active: false,
        entry: null, // (top | bottom | left | right)
    },
});

grid.drawFunc = (cell) => {
    // 0: empty, 1: dirt, 2: water, 3: flammable, 4: fire
    cell.element.style = {
        ...cell.element.style,
        "border-top": "1px solid black",
    };
};

grid.updateFunc = (cell) => {
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
};

grid.setOnClick((cell, event) => {
    if (event.button === 0) {
        cell.data = state;

        grid.draw();
    }
});

grid.draw();

function loop() {
    grid.update();
    grid.draw();

    requestAnimationFrame(loop);
}

loop();
