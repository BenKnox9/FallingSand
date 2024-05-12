class Acid extends Element {
    constructor() {
        super(350);
    }

    updatePosition(grid, nextGrid, i, j) {
        let below = grid[i][j + 1];
        let dir = int(random(1) * 2) * 2 - 1;

        let belowA = -1;
        let belowB = -1;

        belowA = withinBounds(i + dir, cols) ? grid[i + dir][j + 1] : -1;
        belowB = withinBounds(i - dir, cols) ? grid[i - dir][j + 1] : -1;


        if (below === 0) {
            // nextGrid[i][j] = 0;
            nextGrid[i][j + 1] = acidMaterial.hueValue;
            blnGridChanged = true;
        } else {
            if (below === dirtMaterial.hueValue) {
                if (Math.random() < 0.8) {
                    nextGrid[i][j + 1] = acidMaterial.hueValue;
                } else {
                    nextGrid[i][j + 1] = 0;
                }
                blnGridChanged = true;
            }
            if (belowA === dirtMaterial.hueValue) {
                if (Math.random() < 1.1) {
                    nextGrid[i + dir][j + 1] = acidMaterial.hueValue;
                } else {
                    nextGrid[i + dir][j + 1] = 0;
                }
                blnGridChanged = true;
            }
            if (belowB === dirtMaterial.hueValue) {
                if (Math.random() < 1.1) {
                    nextGrid[i - dir][j + 1] = acidMaterial.hueValue;
                } else {
                    nextGrid[i - dir][j + 1] = 0;
                }
                blnGridChanged = true;
            }
        }
        nextGrid[i][j] = 0;

        return nextGrid;
    }

}