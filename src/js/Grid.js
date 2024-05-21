import { clamp, offsetRing, range, wrap } from "./utils.js";

class Grid {
    constructor(element, width, height, endMode = "wrap") {
        this.element = element;
        this.width = width;
        this.height = height;
        this.cells = range(this.height).map(y => range(this.width).map(x => ({
            x,
            y,
            data: null,
            nextData: null,
            element: null,
            over: (dx, dy) => this.getCell(x + dx, y + dy),
            ring: (size) => offsetRing(size).map(offset => this.getCell(x + offset[0], y + offset[0])),
            top: () => this.getCell(x, y - 1),
            topleft: () => this.getCell(x - 1, y - 1),
            left: () => this.getCell(x - 1, y),
            bottomleft: () => this.getCell(x - 1, y + 1),
            bottom: () => this.getCell(x, y + 1),
            bottomright: () => this.getCell(x + 1, y + 1),
            right: () => this.getCell(x + 1, y),
            topright: () => this.getCell(x + 1, y - 1),
        })));
        this.endMode = endMode; // stop, clamp, wrap
        this.updateFunc = null;
        this.drawFunc = null;

        this.createDOM();
    }

    createDOM() {
        range(this.height).forEach(y => {
            const row = document.createElement("div");

            row.classList.add("row");

            range(this.width).forEach(x => {
                const col = document.createElement("div");
                const cell = document.createElement("div");

                col.classList.add("col");
                cell.classList.add("cell");

                col.appendChild(cell);
                row.appendChild(col);

                this.cells[y][x].element = cell;
            });

            this.element.appendChild(row);
        });
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

    setCell(x, y, data) {
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
        this.cells[y][x].data = data;
    }

    setAll(data) {
        this.cells.forEach(row => row.forEach(cell => {
            cell.data = data;
        }));
    }

    setUpdate(func) {
        this.updateFunc = func;
    }

    setDraw(func) {
        this.drawFunc = func;
    }

    setOnClick(func) {
        this.cells.forEach(row => row.forEach(cell => cell.element.addEventListener("click", () => func(cell))));
    }

    update(func) {
        func = func ?? this.updateFunc;
        this.cells.forEach(row => row.forEach(cell => {
            cell.nextData = func(cell) ?? cell.data;
        }));
        this.cells.forEach(row => row.forEach(cell => {
            cell.data = cell.nextData;
        }));
    }

    draw(func) {
        func = func ?? this.drawFunc;
        this.cells.forEach(row => row.forEach(cell => func(cell)));
    }
}

export default Grid;
