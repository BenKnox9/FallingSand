/**
 * @Author Ben Knox 
 * 11/05/2024
 * 
 * This code creates a grid of size specified by cols and rows parameters and simulates falling sand.
 * Sand is dropped by mouse drag.
 * 
 * Inspiration and set up from The Coding Train youtube channel
 * https://www.youtube.com/watch?v=L4u7Zy_b868
 */

let blnClear = false;
let grid;
let w;
let matrix = 4;
let cols, rows;
let blnGridChanged = false;
let intDirtSettleCount = 0;

const waterMaterial = new Water('#3598ED');
const sandMaterial = new Sand('#F4DF25');
const dirtMaterial = new Dirt('#965F00');
const acidMaterial = new Acid('#9AE940');
const woodMaterial = new Wood('#4B3612');

Element.registerElement(waterMaterial);
Element.registerElement(sandMaterial);
Element.registerElement(dirtMaterial);
Element.registerElement(acidMaterial);
Element.registerElement(woodMaterial);

let currentMaterial = sandMaterial;

let intWindowWidth = document.getElementById('main').offsetWidth;
let intWindowHeight = document.getElementById('main').offsetHeight;

/**
 * Creates a grid for the background for each grain of sand
 * @param {int} cols number of columns for grid of sand
 * @param {int} rows number of rows for gird of sand
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

/**
 * Checks whether a grid square is withinbounds or not
 * @param {int} i x or y coordinate of the square being checked
 * @param {int} bound cols or rows depending on which axis is being checked 
 * @returns 
 */
function withinBounds(i, bound) {
  return i >= 0 && i <= bound - 1;
}

/**
 * Compares arrays
 * @param {Arr} a An array which is being compared
 * @param {Arr} b An array which is being compared
 * @returns true if the arrays match
 */
function compareGrids(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function onResize() {
  if (intWindowHeight && intWindowWidth) {
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

  let extent = floor(matrix / 2);
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      if (random(1) < 0.8) {
        let col = mouseCol + i;
        let row = mouseRow + j;

        if (withinBounds(i, cols) && withinBounds(j, rows)) {
          if (grid[col]) {

            if (grid[col][row] !== undefined) {

              if (grid[col][row] !== sandMaterial.hueValue && grid[col][row] !== dirtMaterial.hueValue && grid[col][row] !== woodMaterial.hueValue) {  // This is faster than using Element.isSolidHue
                //   if (!Element.isSolidHue(grid[col][row])) {

                grid[col][row] = currentMaterial.hueValue;
                if (currentMaterial === dirtMaterial) {
                  dirtMaterial.blnSettled = false;
                }
              }
            } else {
              console.error(`grid[${col}][${row}] is undefined`);
            }
          } else {
            // console.error(`grid[${col}] is undefined`);
          }
        }
      }
    }
  }
  intDirtSettleCount = 0;
}

/**
 * Draws the grains of sand in their current position then creates a copy of the grid
 * but with every grain of sand that is able to move down in its new position
 */
function draw() {
  background(0);
  if (currentMaterial === dirtMaterial) {
    intDirtSettleCount += 1;
  }

  if (intDirtSettleCount > 100) {
    dirtMaterial.blnSettled = true;
  }

  // draw current grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] !== 0) {
        fill(grid[i][j]);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }

  let nextGrid = make2DArray(cols, rows);
  blnGridChanged = false;

  // Creates a copy of the grid 
  // Then each grain of each material will move in the desired direction 
  // saving the next state in nextGrid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];

      if (blnClear) {
        if (j == rows - 1) {
          nextGrid[i][j] = 0;
          continue;
        }
      }

      switch (state) {
        case waterMaterial.hueValue:
          nextGrid = waterMaterial.updatePosition(grid, nextGrid, i, j);
          break;

        case sandMaterial.hueValue:
          nextGrid = sandMaterial.updatePosition(grid, nextGrid, i, j);
          break;

        case dirtMaterial.hueValue:
          nextGrid = dirtMaterial.updatePosition(grid, nextGrid, i, j);
          break;

        case acidMaterial.hueValue:
          nextGrid = acidMaterial.updatePosition(grid, nextGrid, i, j);
          break;

        case woodMaterial.hueValue:
          nextGrid = woodMaterial.updatePosition(grid, nextGrid, i, j);
          break;

      }
    }
  }

  // If nothing has changed then stop drawing
  if (compareGrids(grid, nextGrid)) {
    dirtMaterial.blnSettled = true;
    noLoop();
    blnClear = false;
  }

  grid = nextGrid;
}

// Event listener for the brush size slider
document.addEventListener("DOMContentLoaded", function () {
  var slider = document.getElementById("myRange");

  slider.addEventListener("input", function () {
    matrix = parseInt(this.value);
  });
});

function startLooping() {
  loop();
}
