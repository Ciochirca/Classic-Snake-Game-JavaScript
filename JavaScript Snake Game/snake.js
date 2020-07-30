//import needed data
import { getInputDirection } from "/input.js";

// export needed data
export const SNAKE_SPEED = 5; //amount of times the snake moves per second
const SNAKE_BODY = [
                    {x:11, y:11}
                  ]; //an array of x,y positions because our snake is a bunch of segments and these segments are in a particular position on the grid
let newSegments = 0;

export function update() {
  const INPUT_DIRECTION = getInputDirection();
  //check if there is any segment added
  addSegments();
  // we want to loop through every segment except last and start from the botom all the way up
  for(let i = SNAKE_BODY.length - 2; i >= 0; i--){
    // shift the entire snake so that everything moves forward a position
    SNAKE_BODY[i + 1] = {...SNAKE_BODY[i]};
  }

  //update the head based on where we are moving
  SNAKE_BODY[0].x += INPUT_DIRECTION.x;
  SNAKE_BODY[0].y += INPUT_DIRECTION.y;
}

export function draw(GAME_BOARD) {
  // loop through all the segments
  SNAKE_BODY.forEach(segment => {
    //create the snake and set it's start
    const SNAKE_ELEMENT = document.createElement('div');
    SNAKE_ELEMENT.style.gridRowStart = segment.y;
    SNAKE_ELEMENT.style.gridColumnStart = segment.x;
    //add the blue color to the snake
    SNAKE_ELEMENT.classList.add('snake');
    //add the element to the game screen
    GAME_BOARD.appendChild(SNAKE_ELEMENT);
  });
}

//function for expanding the snake
export function expandSnake(amount) {
newSegments += 1;
}

//function to check if the snake is on the same position as the food
export function onSnake(position, { ignoreHead = false} = {}) {
  //loop through each one of the segments to see if it is over the food
  return SNAKE_BODY.some((segment, index) => {
    //skip the head
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

//returns the head of the snake
export function getSnakeHead() {
  return SNAKE_BODY[0];
}

export function snakeIntersection() {
  return (onSnake(SNAKE_BODY[0], { ignoreHead: true}))
}

//helper function to check 2 positions
function equalPositions(pos1, pos2) {
  return  pos1.x === pos2.x && pos1.y === pos2.y;
}

//add segments to the bottom of the snake
function addSegments() {
  for(let i = 0; i < newSegments; i++){
    SNAKE_BODY.push({...SNAKE_BODY[SNAKE_BODY.length - 1]});
  }
  //set newSegments to 0 so it doensn't add infinite segments
  newSegments = 0;
}