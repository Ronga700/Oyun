const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const gameAreaWidth = window.innerWidth / 2;
const gameAreaHeight = window.innerHeight;
const playerSize = 100;
const gameArea1 = document.getElementById("gameArea1");
const gameArea2 = document.getElementById("gameArea2");
let menu;
let gameOver = false;
let startButton;
let posX = 280;
let posX1= 280;
const speed = 8;
const keys = {}; 
let points1 = 0;
let points2 = 0;
let lives1 = 3;
let lives2 = 3;
document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.key] = false; 
});

function movePlayer() {
  if(gameOver) return;
  if (keys["ArrowLeft"]) {
    posX1 -= speed;
  }
  if (keys["ArrowRight"]) {
    posX1 += speed;
  }
  if (keys["a"]) {
    posX -= speed;
  }
  if (keys["d"]) {
    posX += speed;
  }

  
  posX = Math.max(0, Math.min(gameAreaWidth - playerSize, posX)); 
  posX1 = Math.max(0, Math.min(gameAreaWidth - playerSize, posX1));
  player1.style.left = posX1 + "px";
  player2.style.left = posX + "px";
  requestAnimationFrame(movePlayer);
}


let rateBomb = 2500;
let rateGold = 1500;
let itemX1 = Math.random() * (window.innerWidth / 2 - playerSize) + window.innerWidth / 2;

function updateUI() {
  document.getElementById("score1").innerText = "Score Player 1: " + points2;
  document.getElementById("score2").innerText = "Score Player 2: " + points1;
  document.getElementById("lives1").innerText = "Lives Player 1: " + lives2;
  document.getElementById("lives2").innerText = "Lives Player 2: " + lives1;
  if (lives1 <= 0) {
    gameOver=true;
    showResult("player1");
    return;
  }
  if (lives2 <= 0) {
    gameOver=true;
    showResult("player2");
    return;
  }
  if (points1>=60){
    gameOver=true;
    showResult("player1")
  }
  else if(points2>=60){
    gameOver=true;
    showResult("player2")
  }
}
function showResult(winnerSide) {
  const loserImg = document.createElement("img");
  loserImg.src = "nebati.jpg";
  loserImg.style.position = "absolute";
  loserImg.style.width = "100px";
  loserImg.style.height = "100px";
  loserImg.style.top = "300px";

  const winnerDiv = document.createElement("div");
  winnerDiv.innerText = "Winner!";
  winnerDiv.style.position = "absolute";
  winnerDiv.style.backgroundColor = "lightgreen";
  winnerDiv.style.padding = "20px";
  winnerDiv.style.border = "2px solid black";
  winnerDiv.style.top = "300px";

  const restart = document.createElement("button");
  restart.innerHTML="Play again"
  restart.style.width=50 + "px";
  restart.style.height=40 + "px";
  restart.style.left=window.innerWidth/2 - 25 + "px";
  restart.style.top=window.innerHeight/2 + "px";
  restart.style.position="absolute"
  restart.style.borderStyle="solid"
  restart.style.borderWidth=2 + "px"
  restart.style.backgroundColor="white"
  restart.addEventListener("click",()=>{
    window.location.reload();
  })
  document.body.appendChild(restart);

  if (winnerSide === "player1") {
    loserImg.style.left = window.innerWidth - 150 + "px";
    winnerDiv.style.left = "100px"; 
  } else {
    loserImg.style.left = "100px"; 
    winnerDiv.style.left = window.innerWidth - 250 + "px";
  }

  document.body.appendChild(loserImg);
  document.body.appendChild(winnerDiv);
}
function isCollide(a, b) {
  var aRect = a.getBoundingClientRect();
  var bRect = b.getBoundingClientRect();

  return !(
    ((aRect.top + aRect.height) < bRect.top) ||
    (aRect.top > (bRect.top + bRect.height)) ||
    ((aRect.left + aRect.width) < bRect.left) ||
    (aRect.left > (bRect.left + bRect.width))
  );
}

function animateCoin(coin){
  if (gameOver) {
    coin.remove(); 
    return;
  }
  let top = 0;
  function fall() {
    top += 10; 
    coin.style.top = top + "px";

    if (isCollide(coin, player1)) {
        coin.remove();
        points1 = points1 + 1;
        updateUI()
        return;
        }
    if (isCollide(coin, player2)) {
        coin.remove();
        points2 = points2 + 1;
        updateUI()
        return;
        }

    if (top < window.innerHeight - 50) {
      requestAnimationFrame(fall);
    } else {
      coin.remove();
    }
  }
  fall();
}
function animateBomb(bomb){
  if (gameOver) {
    bomb.remove(); 
    return;
  }
  let top = 0;
  function fall() {
    top += 10; 
    bomb.style.top = top + "px";

    if (isCollide(bomb, player1)) {
        bomb.remove();
        lives1 = lives1 - 1;
        updateUI()
        return;
        }
    if (isCollide(bomb, player2)) {
        bomb.remove();
        lives2 = lives2 - 1;
        updateUI()
        return;
        }

    if (top < window.innerHeight - 50) {
      requestAnimationFrame(fall);
    } else {
      bomb.remove();
    }
  }
  fall();
}
function spawnImageLeft() {
  const coin = document.createElement("img");
  coin.src = "cartoin.jpg";
  coin.style.width = "50px";
  coin.style.height = "50px";
  coin.style.position = "absolute";
  let itemX = Math.random() * (window.innerWidth / 2 - playerSize);
  coin.style.left = itemX + "px";
  coin.style.top = 0 + "px";
  gameArea1.appendChild(coin);
  animateCoin(coin);
}
function spawnImageRight() {
  const coin = document.createElement("img");
  coin.src = "cartoin.jpg";
  coin.style.width = "50px";
  coin.style.height = "50px";
  coin.style.position = "absolute";
  let itemX1 = Math.random() * (window.innerWidth / 2 - playerSize);
  coin.style.left = itemX1 + "px";
  coin.style.top = 0 + "px";
  gameArea2.appendChild(coin);
  animateCoin(coin);
}
function spawnBombLeft() {
  const bomb = document.createElement("img");
  bomb.src = "bomb.jpg";
  bomb.style.width = "50px";
  bomb.style.height = "50px";
  bomb.style.position = "absolute";
  let itemX = Math.random() * (window.innerWidth / 2 - playerSize);
  bomb.style.left = itemX + "px";
  bomb.style.top = 0 + "px";
  gameArea1.appendChild(bomb);
  animateBomb(bomb);
}
function spawnBombRight() {
  const bomb = document.createElement("img");
  bomb.src = "bomb.jpg";
  bomb.style.width = "50px";
  bomb.style.height = "50px";
  bomb.style.position = "absolute";
  let itemX1 = Math.random() * (window.innerWidth / 2 - playerSize);
  bomb.style.left = itemX1 + "px";
  bomb.style.top = 0 + "px";
  gameArea2.appendChild(bomb);
  animateBomb(bomb);
}
function spawnImageRightLoop() {
  if (gameOver) return;
  spawnImageRight();

  if (rateGold > 300) rateGold -= 100;

  setTimeout(spawnImageRightLoop, rateGold);
}

function spawnImageLeftLoop() {
  if (gameOver) return;
  spawnImageLeft();

  if (rateGold > 300) rateGold -= 100;

  setTimeout(spawnImageLeftLoop, rateGold);
}

function spawnBombRightLoop() {
  if (gameOver) return;
  spawnBombRight();

  if (rateBomb > 500) rateBomb -= 100;

  setTimeout(spawnBombRightLoop, rateBomb);
}

function spawnBombLeftLoop() {
  if (gameOver) return;
  spawnBombLeft();

  if (rateBomb > 500) rateBomb -= 100;

  setTimeout(spawnBombLeftLoop, rateBomb);
}
function startGame(){
    if (menu) document.body.removeChild(menu);
    if (startButton) document.body.removeChild(startButton);
    movePlayer();
    spawnImageRightLoop();
    spawnImageLeftLoop();
    spawnBombRightLoop();
    spawnBombLeftLoop();
  }
function startMenu(){
  menu = document.createElement("div");
  menu.innerHTML="Salam.<br>Qızılları yığın və bombalardan uzaq durun.<br>Player 1 - w & d<Br>Player 2 - < & >"
  menu.style.left=660 + "px";
  menu.style.top = 300 + "px";
  menu.style.width = 250 + "px";
  menu.style.height= 100 +"px";
  menu.style.position="absolute"
  menu.style.backgroundColor="white"
  menu.style.borderStyle="solid"
  menu.style.borderWidth=2 + "px";
  menu.style.textAlign="center";
  menu.style.fontFamily="sans-serif"
  document.body.appendChild(menu);
  startButton = document.createElement("button");
  startButton.innerHTML="Başla";
  startButton.style.top= 405 + "px";
  startButton.style.left=745 + "px";
  startButton.style.width=50 + "px";
  startButton.style.height=30 + "px";
  startButton.style.textAlign="center";
  startButton.style.fontFamily="sans-serif"
  startButton.style.position="absolute"
  startButton.style.backgroundColor="white"
  startButton.addEventListener("click",startGame);
  document.body.appendChild(startButton);
}
startMenu();
