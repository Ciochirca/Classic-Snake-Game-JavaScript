import { randomGridPosition } from "/grid.js";
import { onSnake, expandSnake } from '/snake.js';

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

// check if the snake ate
export function update() {
  //if the snake is on the food expand the snake
  if(onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    //generate new food
    food = getRandomFoodPosition()
  }
}

export function draw(GAME_BOARD) {
    //create the food and set it's start
    const FOOD_ELEMENT = document.createElement('div');
    FOOD_ELEMENT.style.gridRowStart = food.y;
    FOOD_ELEMENT.style.gridColumnStart = food.x;
    //add the yellow color to the food
    FOOD_ELEMENT.classList.add('food');
    //add the element to the game screen
    GAME_BOARD.appendChild(FOOD_ELEMENT);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  //make sure the food is not on the snake
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}