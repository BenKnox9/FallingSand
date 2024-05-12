class Dirt extends Element {
    constructor() {
        super(32);
    }

    updatePosition(grid, nextGrid, i, j) {
        let dir = int(random(1) * 2) * 2 - 1;
        let below = -1;
        let belowA = -1;
        let belowB = -1;

        if (withinBounds(j, rows)) {
            below = grid[i][j + 1];
        } else {
            nextGrid[i][j] = dirtMaterial.hueValue;
        }

        belowA = withinBounds(i + dir, cols) ? grid[i + dir][j + 1] : -1;
        belowB = withinBounds(i - dir, cols) ? grid[i - dir][j + 1] : -1;

        if (below === 0) {
            nextGrid[i][j + 1] = dirtMaterial.hueValue;
            blnGridChanged = true;
        } else if (belowA === 0) {
            nextGrid[i + dir][j + 1] = dirtMaterial.hueValue;
            blnGridChanged = true;
        } else if (belowB === 0) {
            nextGrid[i - dir][j + 1] = dirtMaterial.hueValue;
            blnGridChanged = true;
        } else {
            nextGrid[i][j] = dirtMaterial.hueValue;
        }

        return nextGrid;
    }

}