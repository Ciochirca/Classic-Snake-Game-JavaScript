const GRID_SIZE = 21

//generates random position on the grid
export function randomGridPosition() {
  return {
    //add 1 because Math.random reuturns a number between 0 and 0.9999
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1
  }
}

//check if the position is outside the grid
export function outsideGrid(position) {
  return (
    position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE
  );
}