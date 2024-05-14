class Acid extends Element {
    constructor() {
        super('#9AE940', false);
    }

    updatePosition(grid, nextGrid, i, j) {
        let below = grid[i][j + 1];
        let dir = int(random(1) * 2) * 2 - 1;

        let belowA = withinBounds(i + dir, cols) ? grid[i + dir][j + 1] : -1;
        let belowB = withinBounds(i - dir, cols) ? grid[i - dir][j + 1] : -1;
        let sideA = withinBounds(i + dir, cols) ? grid[i + dir][j] : -1;
        let sideB = withinBounds(i - dir, cols) ? grid[i - dir][j] : -1;

        if (below === 0) {
            nextGrid[i][j + 1] = acidMaterial.hueValue;
            blnGridChanged = true;
        } else if (below === dirtMaterial.hueValue) {
            if (Math.random() < 0.3) {
                nextGrid[i][j + 1] = acidMaterial.hueValue;
            } else {
                nextGrid[i][j + 1] = 0;
            }
            blnGridChanged = true;
        }

        if (belowA === dirtMaterial.hueValue) {
            if (Math.random() < 0.3) {
                nextGrid[i + dir][j + 1] = acidMaterial.hueValue;
            } else {
                nextGrid[i + dir][j + 1] = 0;
            }
            blnGridChanged = true;
        }

        if (belowB === dirtMaterial.hueValue) {
            if (Math.random() < 0.3) {
                nextGrid[i - dir][j + 1] = acidMaterial.hueValue;
            } else {
                nextGrid[i - dir][j + 1] = 0;
            }
            blnGridChanged = true;
        }

        if (sideA === dirtMaterial.hueValue) {
            if (Math.random() < 0.3) {
                nextGrid[i + dir][j] = acidMaterial.hueValue;
            } else {
                nextGrid[i + dir][j] = 0;
            }
            blnGridChanged = true;
        }

        if (sideB === dirtMaterial.hueValue) {
            if (Math.random() < 0.3) {
                nextGrid[i - dir][j] = acidMaterial.hueValue;
            } else {
                nextGrid[i - dir][j] = 0;
            }
            blnGridChanged = true;
        }
        nextGrid[i][j] = 0;

        return nextGrid;
    }

}