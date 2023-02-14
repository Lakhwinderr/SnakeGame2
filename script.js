// game constants
let direction = { x: 0, y: 0 };
let gameStarted = false;
const foodSound = new Audio("./music/food.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const gameSound = new Audio("./music/music.mp3");
let score = 0;
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 2, y: 4 };
//game functions
function main(currTime) {
  window.requestAnimationFrame(main);
  const seconds = (currTime - lastPaintTime) / 1000;
  if (seconds < 1 / speed) {
    return;
  }
  lastPaintTime = currTime;
  gameEngine();
}

function isCollide(sArr) {
  for (let i = 1; i < sArr.length; i++) {
    if (sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y) {
      return true;
    }
  }
}
function gameEngine() {
  //updating the snake array and food
  //when the snake collides what will happen
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    gameSound.pause();
    direction = { x: 0, y: 0 };
    alert("Game over. Press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    gameStarted = false;
  }

  //if you have eatan the food,regenerate the snake and move
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    score++;
    //compare the hiscore and current score
    if (score > hiScoreVal) {
      hiScoreVal = score;
      localStorage.setItem("hiscore", JSON.stringify(hiScoreVal));
      hiscoreVal.innerHTML = "Hi-Score: " + hiScoreVal;
    }
    scoreVal.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + direction.x,
      y: snakeArr[0].y + direction.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //moving the snake
  for (let i = snakeArr.length - 2; i > -1; i--) {
    snakeArr[i + 1].x = snakeArr[i].x;
    snakeArr[i + 1].y = snakeArr[i].y;
  }

  //what about the head, we haven't moved it yet, let's build the logic for it
  if ((snakeArr[0].x + direction.x) % 19 === 0 && direction.x === -1) {
    snakeArr[0].x = 18;
  } else if ((snakeArr[0].x + direction.x) % 19 === 0 && direction.x === 1) {
    snakeArr[0].x = 1;
  } else if ((snakeArr[0].y + direction.y) % 19 === 0 && direction.y === -1) {
    snakeArr[0].y = 18;
  } else if ((snakeArr[0].y + direction.y) % 19 === 0 && direction.y === 1) {
    snakeArr[0].y = 1;
  } else {
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;
  }

  //display the snake and food

  board.innerHTML = "";

  snakeArr.forEach((snake, i) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = snake.y;
    snakeElement.style.gridColumnStart = snake.x;
    if (i === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //displaying the food
  foodElement = document.createElement("div");

  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic
window.requestAnimationFrame(main);

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  let hiScoreVal = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiScoreVal));
} else {
  hiScoreVal = JSON.parse(hiscore);
  hiscoreVal.innerHTML = "Hi-Score: " + hiScoreVal;
}
window.addEventListener("keydown", (e) => {
  switch (e.key) {
  }
});


window.addEventListener("keydown", (e) => {
  //Start the game
  
  if(!gameStarted){
    gameStarted = true;
    direction = { x: 0, y: 1 }; 
  }
  moveSound.play();
  gameSound.play();
  switch (e.key) {
    case "ArrowUp":
      // console.log("ArrowUp");
      direction.x = 0;
      direction.y = -1;
      break;
    case "ArrowDown":
      // console.log("ArrowDown");
      direction.x = 0;
      direction.y = 1;
      break;
    case "ArrowLeft":
      // console.log("ArrowLeft");
      direction.x = -1;
      direction.y = 0;
      break;
    case "ArrowRight":
      // console.log("ArrowRight");
      direction.x = 1;
      direction.y = 0;
      break;

    case "+":
      speed++;
      // flag = true;
      break;

    case "-":
      if (speed > 1) {
        speed--;
      }
      // flag = true;
      break;

    default:
      break;
  }
  
});
