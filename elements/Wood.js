class Wood extends Element {
    constructor() {
        super('#4B3612', false);
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
        nextGrid[i][j] = grid[i][j];
        return nextGrid;
    }

}