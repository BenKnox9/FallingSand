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
        } else if (below === dirtMaterial.hueValue || below === sandMaterial.hueValue) {
            if (Math.random() < 0.3) {
                nextGrid[i][j + 1] = acidMaterial.hueValue;
            } else {
                nextGrid[i][j + 1] = 0;
            }
        }

        if (belowA === dirtMaterial.hueValue || belowA === sandMaterial.hueValue) {
            if (Math.random() < 0.3) {
                nextGrid[i + dir][j + 1] = acidMaterial.hueValue;
            } else {
                nextGrid[i + dir][j + 1] = 0;
            }
        }

        if (belowB === dirtMaterial.hueValue || belowB === sandMaterial.hueValue) {
            if (Math.random() < 0.3) {
                nextGrid[i - dir][j + 1] = acidMaterial.hueValue;
            } else {
                nextGrid[i - dir][j + 1] = 0;
            }
        }

        if (sideA === dirtMaterial.hueValue || sideA === sandMaterial.hueValue) {
            if (Math.random() < 0.3) {
                nextGrid[i + dir][j] = acidMaterial.hueValue;
            } else {
                nextGrid[i + dir][j] = 0;
            }
        }

        if (sideB === dirtMaterial.hueValue || sideB === sandMaterial.hueValue) {
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