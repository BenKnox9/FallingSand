class Dirt extends Element {
    constructor() {
        super('#965F00', false);
    }

    /**
     * Getter to check if a material is solid
     * @returns true if solid
     */
    isSolid() {
        return true;
    }

    // Have the top layer green?
    // If water touches it maybe grow something - Seems tough

    /**
     * Updates the position of a given grain of material
     * @param {2D Array} grid The current grid
     * @param {2D Array} nextGrid The new grid
     * @param {int} i the column number being updated
     * @param {int} j the row number being updated
     * @returns the updated grid
     */
    updatePosition(grid, nextGrid, i, j) {
        if (nextGrid[i][j] === acidMaterial.hueValue) return nextGrid;

        if (dirtMaterial.blnSettled && grid[i][j] === dirtMaterial.hueValue) {
            nextGrid[i][j] = dirtMaterial.hueValue;
            return nextGrid;
        }
        let dir = int(random(1) * 2) * 2 - 1;
        let below = -1;

        let randomA = Math.random();
        let randomB = Math.random();


        if (withinBounds(j, rows)) {
            below = grid[i][j + 1];
        } else {
            nextGrid[i][j] = dirtMaterial.hueValue;
            return nextGrid;
        }

        let belowA = withinBounds(i + dir, cols) ? grid[i + dir][j + 1] : -1;
        let belowB = withinBounds(i - dir, cols) ? grid[i - dir][j + 1] : -1;


        if (below === 0) {
            nextGrid[i][j + 1] = dirtMaterial.hueValue;
        } else if (belowA === 0 && randomA < 0.02) {
            nextGrid[i + dir][j + 1] = dirtMaterial.hueValue;
        } else if (belowB === 0 && randomB < 0.02) {
            nextGrid[i - dir][j + 1] = dirtMaterial.hueValue;
        } else {
            nextGrid[i][j] = dirtMaterial.hueValue;
        }

        return nextGrid;
    }

}