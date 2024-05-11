/**
 * @Author Ben Knox 
 * 11/05/2024
 * 
 * This code creates a grid of size specified by cols and rows parameters and simulates falling sand.
 * Sand is dropped by mouse drag.
 */


/**
 * Creates a grid for the background for each grain of sand
 * @param {*} cols number of columns for grid of sand
 * @param {*} rows number of rows for gird of sand
 * @returns 2D grid
 */
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

let grid;
let w = 4;
let cols, rows;
let hueValue = 200;

/**
 * Checks whether a grid square is withinbounds or not
 * @param {*} i x or y coordinate of the square being checked
 * @param {*} bound cols or rows depending on which axis is being checked 
 * @returns 
 */
function withinBounds(i, bound) {
  return i >= 0 && i <= bound - 1;
}

/**
 * Compares arrays
 * @param {*} a An array which is being compared
 * @param {*} b An array which is being compared
 * @returns true if the arrays match
 */
function compareGrids(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Sets up background 
 */
function setup() {
  createCanvas(1200, 740);
  colorMode(HSB, 360, 255, 255);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);
}


/**
 * When mouse is dragged drops grains of sand in the area covered by the matrix
 */
function mouseDragged() {
  loop();
  let mouseCol = floor(mouseX / w);
  let mouseRow = floor(mouseY / w);

  let matrix = 3;
  let extent = floor(matrix / 2);
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      if (random(1) < 0.8) {
        let col = mouseCol + i;
        let row = mouseRow + j;

        if (withinBounds(i, cols) && withinBounds(j, rows)) {
          if (grid[col]) {
            if (grid[col][row] !== undefined) {
              grid[col][row] = hueValue;
            } else {
              console.error(`grid[${col}][${row}] is undefined`);
            }
          } else {
            console.error(`grid[${col}] is undefined`);
          }
        }
      }
    }
  }
}

/**
 * Draws the grains of sand in their current position then creates a copy of the grid
 * but with every grain of sand that is able to move down in its new position
 */
function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }

  let nextGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      if (state > 0) {
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
          nextGrid[i][j + 1] = state;
        } else if (belowA === 0) {
          nextGrid[i + dir][j + 1] = state;
        } else if (belowB === 0) {
          nextGrid[i - dir][j + 1] = state;
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
  }
  // console.log("looping");


  if (compareGrids(grid, nextGrid)) {
    console.log("stopped looping")
    noLoop();
  }
  grid = nextGrid;
}



