var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var interval = 100;

canvas.width = 400;
canvas.height = 400;

var score = 0;
var displayScore = document.querySelector("#score");

var snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

var appleX = 100;
var appleY = 100;

function drawApple(appleX, appleY) {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX, appleY, 10, 10);
}

function checkAppleCollision() {
  var newAppleX = Math.floor((Math.random() * canvas.width) / 10) * 10;
  var newAppleY = Math.floor((Math.random() * canvas.height) / 10) * 10;
  for (var i = 0; i < snake.length; i++) {
    if (newAppleX === snake[i].x && newAppleY === snake[i].y) {
      return checkAppleCollision();
    }
  }
  appleX = newAppleX;
  appleY = newAppleY;
}

function updateScore() {
  displayScore.innerHTML = `<strong>Score : ${score}</strong>`;
}

function drawSnake() {
  for (var i = 0; i < snake.length; i++) {
    ctx.fillStyle = "black";
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
}
var dx = 10;
var dy = 0;
var gameStarted = false;

function startGame(int) {
  snake = [
    // premier = tête du serpent
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 },
  ];
  dx = 10;
  dy = 0;
  appleX = 100;
  appleY = 100;
  gameStarted = true;
  setTimeout(main, int);
}

function moveSnake() {
  var snakeHead = { x: snake[0].x + dx, y: snake[0].y + dy };
  // When the snake eats the apple
  if (appleX === snake[0].x && appleY === snake[0].y) {
    checkAppleCollision();
    snake.unshift(snakeHead);
    // console.log(snake);
    score++;
  } else {
    snake.pop();
    snake.unshift(snakeHead);
  }
}

function gameOver() {
  ctx.fillStyle = "#40B140";
  ctx.font = "50px Verdana";
  ctx.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
  gameStarted = false;
  interval = 100;
}

function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= canvas.width ||
    snake[0].y < 0 ||
    snake[0].y >= canvas.height
  ) {
    gameOver();
  }
  for (var i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      gameOver();
    }
  }
}

var startBtn = document.querySelector("#start");
document.addEventListener("keydown", function (event) {
  if (!gameStarted) {
    startBtn.addEventListener("click", function () {
      score = 0;
      startGame(interval);
    });
  } else {
    switch (event.keyCode) {
      // Left
      case 37:
        dx = -10;
        dy = 0;
        break;
      // Up
      case 38:
        dx = 0;
        dy = -10;
        break;
      // Right
      case 39:
        dx = 10;
        dy = 0;
        break;
      // Down
      case 40:
        dx = 0;
        dy = 10;
        break;
    }
  }
});

function main() {
  // Effacer le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Mettre à jour la position du serpent
  moveSnake();

  // Vérifier les collisions
  checkCollision();

  // Dessiner le serpent
  drawSnake();

  // Dessiner la pomme
  drawApple(appleX, appleY);

  // Gérer l'affichage du score
  updateScore();

  if (gameStarted) {
    // Répéter la boucle
    setTimeout(main, interval);
  }
}
