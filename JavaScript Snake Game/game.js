// import needed data
import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from '/snake.js';
import { update as updateFood, draw as drawFood } from '/food.js';
import { outsideGrid } from '/grid.js'

//set variables and constants
let lastRenderTime = 0;
let gameOver = false;
const GAME_BOARD = document.getElementById('game-board');

// setup game loop
function main(currentTime) {
  //check if the game is over
  if(gameOver) {
    if (confirm('You lost. Press ok to restart.')) {
      window.location = '/';
    }
    return;
  }
  // request a frame to animate the game
  window.requestAnimationFrame(main);
  // get the last render time in seconds by dividing to 1000
  const SECONDS_SINCE_LAST_RENDER = (currentTime - lastRenderTime) / 1000;
  // calculate if we need to move
  if (SECONDS_SINCE_LAST_RENDER < 1/SNAKE_SPEED) return;
  lastRenderTime = currentTime;
  console.log("render");
  // add the update loop for the game logic
  update();
  // draw everything based on the update loop
  draw();
}

// start the loop the very first time
window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  GAME_BOARD.innerHTML = '';
  drawSnake(GAME_BOARD);
  drawFood(GAME_BOARD);
  updateFood(GAME_BOARD);
}

function checkDeath() {
  gameOver = (outsideGrid(getSnakeHead()) || snakeIntersection())
}