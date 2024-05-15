class Acid extends Element {
    constructor() {
        super('#9AE940', false);
    }

    /**
     * Getter to check if a material is solid
     * @returns true if solid
     */
    isSolid() {
        return false;
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
        let below = grid[i][j + 1];
        let dir = int(random(1) * 2) * 2 - 1;

        let belowA = withinBounds(i + dir, cols) ? grid[i + dir][j + 1] : -1;
        let belowB = withinBounds(i - dir, cols) ? grid[i - dir][j + 1] : -1;
        let sideA = withinBounds(i + dir, cols) ? grid[i + dir][j] : -1;
        let sideB = withinBounds(i - dir, cols) ? grid[i - dir][j] : -1;

        if (below === 0) {
            nextGrid[i][j + 1] = acidMaterial.hueValue;
        } else if (Element.isSolidHue(below)) {
            if (Math.random() < 0.3) {
                nextGrid[i][j + 1] = acidMaterial.hueValue;
            } else {
                nextGrid[i][j + 1] = 0;
            }
        }

        if (Element.isSolidHue(belowA)) {
            if (Math.random() < 0.3) {
                nextGrid[i + dir][j + 1] = acidMaterial.hueValue;
            } else {
                nextGrid[i + dir][j + 1] = 0;
            }
        }

        if (Element.isSolidHue(belowB)) {
            if (Math.random() < 0.3) {
                nextGrid[i - dir][j + 1] = acidMaterial.hueValue;
            } else {
                nextGrid[i - dir][j + 1] = 0;
            }
        }

        if (Element.isSolidHue()) {
            if (Math.random() < 0.3) {
                nextGrid[i + dir][j] = acidMaterial.hueValue;
            } else {
                nextGrid[i + dir][j] = 0;
            }
        }

        if (Element.isSolidHue(sideB)) {
            if (Math.random() < 0.3) {
                nextGrid[i - dir][j] = acidMaterial.hueValue;
            } else {
                nextGrid[i - dir][j] = 0;
            }
        }
        nextGrid[i][j] = 0;

        return nextGrid;
    }

}