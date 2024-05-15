class Sand extends Element {
    constructor() {
        super('#F4DF25', false);
    }

    /**
     * Getter to check if a material is solid
     * @returns true if solid
     */
    isSolid() {
        return true;
    }

    /**
     * Updates the position of a given grain of material
     * @param {2D Array} grid The current grid
     * @param {2D Array} nextGrid The new grid
     * @param {int} i the column number being updated
     * @param {int} j the row number being updated
     * @returns the updated grid
     */
    updatePosition(grid, nextGrid, i, j) {
        let dir = int(random(1) * 2) * 2 - 1;
        let below = -1;

        if (withinBounds(j, rows)) {
            below = grid[i][j + 1];
        } else {
            nextGrid[i][j] = sandMaterial.hueValue;
            return nextGrid;
        }

        let belowA = withinBounds(i + dir, cols) ? grid[i + dir][j + 1] : -1;
        let belowB = withinBounds(i - dir, cols) ? grid[i - dir][j + 1] : -1;

        if (nextGrid[i][j] === acidMaterial.hueValue) return nextGrid;

        if (below === 0) {
            nextGrid[i][j + 1] = sandMaterial.hueValue;
        } else if (belowA === 0) {
            nextGrid[i + dir][j + 1] = sandMaterial.hueValue;
        } else if (belowB === 0) {
            nextGrid[i - dir][j + 1] = sandMaterial.hueValue;
        } else {
            nextGrid[i][j] = sandMaterial.hueValue;
        }

        return nextGrid;
    }

}