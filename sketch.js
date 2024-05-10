/**
 * @Author Ben Knox 
 * 11/05/2024
 * 
 * This code creates a grid of size specified by cols and rows parameters and simulates falling sand.
 * Sand is dropped by mouse drag.
 */


/**
 * 
 * @param {*} cols
 * @param {*} rows 
 * @returns 
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

function withinBounds(i, bound) {
  return i >= 0 && i <= bound - 1;
}

function setup() {
  createCanvas(600, 740);
  colorMode(HSB, 360, 255, 255);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);
}

function mouseDragged() {
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
          grid[col][row] = hueValue;
        }
      }
    }
  }
}


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
  grid = nextGrid;
}

