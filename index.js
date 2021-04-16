
const canvas = document.querySelector('#snake');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 50;
const { width, height } = canvas;
let currentDirection = null;
let snakeLength=1;
let snakeBody =[];
let x = MOVE_AMOUNT*5+25;
let y = MOVE_AMOUNT*5+25;
let gameSpeed = 4;
let appleX=Math.floor(Math.floor(getRndInteger(MOVE_AMOUNT, width-MOVE_AMOUNT)/MOVE_AMOUNT)*MOVE_AMOUNT)+25;
let appleY=Math.floor(Math.floor(getRndInteger(MOVE_AMOUNT, height-MOVE_AMOUNT)/MOVE_AMOUNT)*MOVE_AMOUNT)+25;

let hue = 0;
let xMove = 0;
let yMove =0;

function game(){
  if (!checkIfIsGameOver()){
    clearScreen();
    updateGameMove();
    checkAppleCollision()
    drawApple();
    drawSnake();
    moveSnake({ key: currentDirection })
    setTimeout(game, 1000/gameSpeed)
} else{
  ctx.fillStyle="white"
  ctx.font = "150px Arial"
  ctx.fillText("Game Over", width/5, height/5)
}
}
function checkIfIsGameOver(){
  
 if (x<=0|| x>=width || y<=0 || y>= height) {
   console.log(x);
   console.log(y);
   clearCanvas();
   return true;
 }
}
function updateGameMove(){
  x+=xMove;
  y+=yMove;
}
function getRndInteger(min, max) {
  return Math.floor((Math.random() * (max - min + 1) ) + min);
}
function checkAppleCollision(){
  
  if (appleX===x && appleY===y){
    appleX=Math.floor(Math.floor(getRndInteger(MOVE_AMOUNT, width-MOVE_AMOUNT)/MOVE_AMOUNT)*MOVE_AMOUNT)+25;
    appleY=Math.floor(Math.floor(getRndInteger(MOVE_AMOUNT, height-MOVE_AMOUNT)/MOVE_AMOUNT)*MOVE_AMOUNT)+25;
    
    
    snakeLength++;
  }
}
function drawApple(){
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = MOVE_AMOUNT;
  ctx.strokeStyle = 'orange';
  ctx.beginPath(); 
  ctx.moveTo(appleX, appleY);
  ctx.lineTo(appleX, appleY);
  ctx.stroke(); 
}
function drawSnake(){
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = MOVE_AMOUNT;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath(); 
  ctx.moveTo(x, y);
  ctx.lineTo(x, y);
  ctx.stroke(); 
  
  for (let i=1; i<=snakeBody.length; i++){
    
    ctx.beginPath(); 
    ctx.moveTo(snakeBody[i-1].x,snakeBody[i-1].y)
    ctx.lineTo(snakeBody[i-1].x,snakeBody[i-1].y);   
    ctx.stroke();
  }
  snakeBody.push({x: x,y : y})
  if (snakeBody.length>snakeLength-1){
    snakeBody.shift()
  }
}
function clearScreen(){
  ctx. fillStyle='black'
  ctx.clearRect(0, 0, width, height);
}
function moveSnake({ key }) {

  switch (key) {
    case 'ArrowUp':
      if (currentDirection==="ArrowDown") return; 
      xMove =0;
      yMove-= MOVE_AMOUNT;
      
      break;
    case 'ArrowRight':
      if (currentDirection==="ArrowLeft") return; 
      xMove += MOVE_AMOUNT;
      yMove=0;
      
      break;
    case 'ArrowDown':
      if (currentDirection==="ArrowUp") return; 
      xMove =0;
      yMove+= MOVE_AMOUNT;
      
      break;
    case 'ArrowLeft':
      if (currentDirection==="ArrowRight") return; 
      xMove -= MOVE_AMOUNT;
      yMove=0;
      break;
    default:
      break;
  }
}

function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    moveSnake({ key: e.key });
  }
}

function clearCanvas() {
  canvas.classList.add('end');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function() {
      console.log('Done the shake!');
      canvas.classList.remove('end');
    },
    { once: true }
  );
}
game();
window.addEventListener('keydown', handleKey);
restart.addEventListener('click', clearCanvas);
