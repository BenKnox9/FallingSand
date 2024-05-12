class Dirt extends Element {
    constructor() {
        super(32);
    }

    updatePosition(grid, nextGrid, i, j) {
        let below = grid[i][j + 1];
        let dir = int(random(1) * 2) * 2 - 1;


        let belowA = -1;
        let belowB = -1;

        if (withinBounds(i + dir, cols)) {
            belowA = grid[i + dir][j + 1];
        }
        if (withinBounds(i - dir, cols)) {
            belowB = grid[i - dir][j + 1];
        }
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