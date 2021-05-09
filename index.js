const canvas = document.querySelector('#snake');
const canvasGame = document.querySelector('.canvasGame')
const ctx = canvas.getContext('2d');
const restart = document.querySelector('.restart');
const MOVE_AMOUNT = 50;
let score = 0;
const {
  width,
  height
} = canvas;
let currentDirection = null;
let snakeLength = 1;
let snakeBody = [];
let x = getRndPosition(width);
let y = getRndPosition(height);
let gameSpeed = 4;
let appleX = getRndPosition(width);
let appleY = getRndPosition(height);
let xMove = 0;
let yMove = 0;
let gameSpeedTimeout;

function game() {
  if (!checkIfIsGameOver()) {
    clearScreen();
    updateGameMove();
    checkAppleCollision()
    drawApple();
    drawSnake();
    addScore();
    moveSnake({
      key: currentDirection
    })
    gameSpeedTimeout = setTimeout(game, 1000 / gameSpeed);
  } else {
    clearScreen();
    ctx.fillStyle = "white"
    ctx.font = "100px Goblin One"
    ctx.fillText(`Game Over `, width / 10, height / 3)
    ctx.font = "70px Goblin One"
    ctx.fillText(`Your score: ${score} `, width / 10, height / 2)
  }
}

function addScore() {

  if (snakeBody.length !== score) score++
  document.querySelector('.score').textContent = `SCORE: ${score}`
}

function checkIfIsGameOver() {
  if (xMove === 0 && yMove === 0) return false;
  if (x <= 0 || x >= width || y <= 0 || y >= height) {
    endAnimation();
    return true;
  }
  for (let i = 1; i < snakeBody.length; i++) {
    if (snakeBody[i - 1].x === x && snakeBody[i - 1].y === y) {
      endAnimation();
      return true;
    }
  }
}

function updateGameMove() {
  x += xMove;
  y += yMove;
}

function getRndInteger(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

function getRndPosition(dimension) {
  return Math.floor(Math.floor(getRndInteger(MOVE_AMOUNT, dimension - MOVE_AMOUNT) / MOVE_AMOUNT) * MOVE_AMOUNT) + 25;
}

function checkAppleCollision() {
  if (appleX === x && appleY === y) {
    appleX = getRndPosition(width);
    appleY = getRndPosition(height);
    snakeLength++;
  }
}

function drawApple() {
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = MOVE_AMOUNT;
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(appleX, appleY);
  ctx.lineTo(appleX, appleY);
  ctx.stroke();
}

function drawSnake() {
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = MOVE_AMOUNT;
  ctx.strokeStyle = `green`;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y);
  ctx.stroke();

  for (let i = 1; i <= snakeBody.length; i++) {
    ctx.beginPath();
    ctx.strokeStyle = `orange`;
    ctx.moveTo(snakeBody[i - 1].x, snakeBody[i - 1].y)
    ctx.lineTo(snakeBody[i - 1].x, snakeBody[i - 1].y);
    ctx.stroke();
  }
  snakeBody.push({
    x: x,
    y: y
  })
  if (snakeBody.length > snakeLength - 1) {
    snakeBody.shift()
  }
}

function clearScreen() {
  ctx.fillStyle = 'black'
  ctx.clearRect(0, 0, width, height);
}

function moveSnake({
  key
}) {
  switch (key) {
    case 'ArrowUp':
      if (currentDirection === "ArrowDown") return;
      xMove = 0;
      yMove -= MOVE_AMOUNT;

      break;
    case 'ArrowRight':
      if (currentDirection === "ArrowLeft") return;
      xMove += MOVE_AMOUNT;
      yMove = 0;

      break;
    case 'ArrowDown':
      if (currentDirection === "ArrowUp") return;
      xMove = 0;
      yMove += MOVE_AMOUNT;

      break;
    case 'ArrowLeft':
      if (currentDirection === "ArrowRight") return;
      xMove -= MOVE_AMOUNT;
      yMove = 0;
      break;
    default:
      break;
  }
}

function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    moveSnake({
      key: e.key
    });
  }
}

function endAnimation() {
  canvasGame.classList.add('end');
  canvasGame.addEventListener(
    'animationend',
    function () {
      canvasGame.classList.remove('end');
    }, {
      once: true
    }
  );
}


function startAgain() {
  xMove = 0;
  yMove = 0;
  snakeLength = 1;
  snakeBody = [];
  score = 0;
  currentDirection = null;
  x = getRndPosition(height);
  y = getRndPosition(width);
  endAnimation();
  window.clearTimeout(gameSpeedTimeout);
  game();
}
game();
window.addEventListener('keydown', handleKey);
restart.addEventListener('click', startAgain);