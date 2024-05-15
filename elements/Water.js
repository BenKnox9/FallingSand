class Water extends Element {
    constructor() {
        super('#3598ED', false);
    }

    updatePosition(grid, nextGrid, i, j) {
        let below = grid[i][j + 1]; // Check the space below
        let dir = int(random(1) * 2) * 2 - 1; // Random direction for sideways flow

        let belowA = withinBounds(i + dir, cols) ? grid[i + dir][j + 1] : -1;
        let belowB = withinBounds(i - dir, cols) ? grid[i - dir][j + 1] : -1;

        if (below === 0) {
            // Move downward if space is available
            nextGrid[i][j + 1] = waterMaterial.hueValue;
        } else if (belowA === 0) {
            // Move sideways if space is available to one side
            nextGrid[i + dir][j + 1] = waterMaterial.hueValue;
        } else if (belowB === 0) {
            // Move sideways if space is available to the other side
            nextGrid[i - dir][j + 1] = waterMaterial.hueValue;
        } else {
            let blnStopRight = false;
            let blnStopLeft = false;

            for (let k = 1; k < cols; k++) {
                if (!blnStopRight) {
                    if (withinBounds(i + k, cols)) {
                        if (grid[i + k][j] === dirtMaterial.hueValue || grid[i + k][j] === sandMaterial.hueValue) {
                            blnStopRight = true;
                        }
                        if (grid[i + k][j + 1] === 0) {
                            nextGrid[i + k][j + 1] = waterMaterial.hueValue;
                            break; // Exit loop once an empty spot is found
                        }
                    } else {
                        blnStopRight = true;
                    }
                }
                if (!blnStopLeft) {
                    if (withinBounds(i - k, cols)) {
                        if (grid[i - k][j] === dirtMaterial.hueValue || grid[i - k][j] === sandMaterial.hueValue) {
                            blnStopLeft = true;
                        }
                        if (grid[i - k][j + 1] === 0) {
                            nextGrid[i - k][j + 1] = waterMaterial.hueValue;
                            break; // Exit loop once an empty spot is found
                        }
                    } else {
                        blnStopLeft = true;
                    }
                }
            }

            // This is for dirt which falls in water. Currently as soon as dirt touches water 
            // all water below it will turn into dirt.
            if (blnStopRight && blnStopLeft) {
                if (grid[i][j - 1] === dirtMaterial.hueValue) {
                    nextGrid[i][j] = dirtMaterial.hueValue;
                    nextGrid[i][j - 1] = waterMaterial.hueValue;
                } else {
                    nextGrid[i][j] = waterMaterial.hueValue;
                }
            }
        }
        return nextGrid;
    }
}