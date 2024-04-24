import { clamp, range, wrap } from "./utils.js";

class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = range(height).map(y => range(width).map(x => ({
            x,
            y,
            data: null,
            nextData: null,
            over: (dx, dy) => this.getCell(x + dx, y + dy)
        })));
        this.endMode = "wrap"; // stop, clamp, wrap
    }

    getCell(x, y) {
        switch (this.endMode) {
            case "stop":
                if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
                break;
            case "clamp":
                x = clamp(0, this.width - 1, x);
                y = clamp(0, this.height - 1, y);
                break;
            case "wrap":
                x = wrap(0, this.width, x);
                y = wrap(0, this.height, y);
                break;
        }
        return this.cells[y][x];
    }

    setCell(x, y, value) {
        switch (this.endMode) {
            case "stop":
                if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
                break;
            case "clamp":
                x = clamp(0, this.width - 1, x);
                y = clamp(0, this.height - 1, y);
                break;
            case "wrap":
                x = wrap(0, this.width, x);
                y = wrap(0, this.height, y);
                break;
        }
        this.cells[y][x] = value;
    }

    update(func) {
        this.cells.forEach(row => row.forEach(cell => {
            cell.nextData = func(cell);
        }));
        this.cells.forEach(row => row.forEach(cell => {
            cell.data = cell.nextData;
        }));
    }
}

export default Grid;
