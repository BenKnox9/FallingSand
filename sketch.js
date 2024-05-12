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
let w;
let cols, rows;

const waterMaterial = new Water(); // Create an instance of Water class
const dirtMaterial = new Dirt();   // Create an instance of Dirt class

let currentMaterial = dirtMaterial; // Set the initial current material


// Define different materials

let intWindowWidth = document.getElementById('main').offsetWidth;

// window.innerWidth
//   || document.documentElement.clientWidth
//   || document.body.clientWidth;

let intWindowHeight = document.getElementById('main').offsetHeight;

// window.innerHeight
//   || document.documentElement.clientHeight
//   || document.body.clientHeight;

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

  w = 4;
  var canvas = createCanvas(900, 680);
  canvas.parent("canvas")
  colorMode(HSB, 360, 255, 255);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);
}

function onResize() {
  // resize canvas 
  if (intWindowHeight && intWindowWidth) {

    console.log(`resizing; width: ${intWindowWidth}, height: ${intWindowHeight}`);
    resizeCanvas(intWindowWidth, intWindowHeight);
  }

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
              grid[col][row] = currentMaterial.hueValue;
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


  // draw current grid
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
  let blnGridChanged = false;

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
          blnGridChanged = true;
        } else if (belowA === 0) {
          nextGrid[i + dir][j + 1] = state;
          blnGridChanged = true;
        } else if (belowB === 0) {
          nextGrid[i - dir][j + 1] = state;
          blnGridChanged = true;
        }

        // else if (state == intHueWater) {
        //   for (let x = 0; x < 3; x++) {
        //     if (nextGrid[i + dir][j + 1] <= 0) nextGrid[i + dir][j + 1] = state;
        //     if (nextGrid[i - dir][j + 1] <= 0) nextGrid[i + dir][j + 1] = state;
        //   }
        // }

        else {
          nextGrid[i][j] = state;
        }
      }
    }
  }

  if (!blnGridChanged) {
    console.log("stopped looping")
    noLoop();
  }

  grid = nextGrid;
}
