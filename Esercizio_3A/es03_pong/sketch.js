let posX, velX;
let posY, velY;
let ballColor;
let ballSize;
let targetSize;

let bgHue;

let paddleWidth = 20;
let paddleHeight = 100;
let p1Y, p2Y;
let paddleSpeed = 7;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100);
  background(0);

  posX = width / 2;
  posY = height / 2;
  velX = random([-1, 1]) * random(5, 12);
  velY = random([-1, 1]) * random(5, 12);

  ballColor = color(random(360), 80, 100);
  targetSize = random(30, 70);
  ballSize = targetSize;

  bgHue = random(360);

  // Posizione iniziale palette
  p1Y = height / 2 - paddleHeight / 2;
  p2Y = height / 2 - paddleHeight / 2;
}

function draw() {
  // Sfondo animato
  bgHue = (bgHue + 1) % 360;
  noStroke();
  fill(bgHue, 80, 15, 0.05);
  rect(0, 0, width, height);

  // Muovi palla
  posX += velX;
  posY += velY;

  // Rimbalzo su alto/basso
  if (posY <= 0 || posY >= height) {
    velY *= -1;
    cambiaAspetto();
  }

  // Collisione con paddle sinistra (Giocatore 1)
  if (posX <= paddleWidth && posY > p1Y && posY < p1Y + paddleHeight) {
    velX *= -1;
    cambiaAspetto();
    posX = paddleWidth + 1;
  }

  // Collisione con paddle destra (Giocatore 2)
  if (posX >= width - paddleWidth && posY > p2Y && posY < p2Y + paddleHeight) {
    velX *= -1;
    cambiaAspetto();
    posX = width - paddleWidth - 1;
  }

  // Punto perso (fuori dai bordi orizzontali)
  if (posX < 0 || posX > width) {
    resetBall();
  }

  // Animazione palla
  ballSize += (targetSize - ballSize) * 0.2;
  fill(ballColor);
  noStroke();
  drawingContext.shadowBlur = 60;
  drawingContext.shadowColor = ballColor;
  ellipse(posX, posY, ballSize);

  // Disegna paddles
  drawPaddles();

  // Movimento giocatori
  movePlayers();
}

function cambiaAspetto() {
  ballColor = color(random(360), 80, 100);
  targetSize = random(30, 70);
}

function resetBall() {
  posX = width / 2;
  posY = height / 2;
  velX = random([-1, 1]) * random(5, 12);
  velY = random([-1, 1]) * random(5, 12);
  cambiaAspetto();
}

function drawPaddles() {
  noStroke();
  fill(0, 0, 100); // bianco
  rect(0, p1Y, paddleWidth, paddleHeight); // Giocatore 1 (sinistra)
  rect(width - paddleWidth, p2Y, paddleWidth, paddleHeight); // Giocatore 2 (destra)
}

function movePlayers() {
  // Giocatore 1 (W/S)
  if (keyIsDown(87)) { // W
    p1Y -= paddleSpeed;
  }
  if (keyIsDown(83)) { // S
    p1Y += paddleSpeed;
  }

  // Giocatore 2 (UP/DOWN)
  if (keyIsDown(UP_ARROW)) {
    p2Y -= paddleSpeed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    p2Y += paddleSpeed;
  }

  // Limiti paddle
  p1Y = constrain(p1Y, 0, height - paddleHeight);
  p2Y = constrain(p2Y, 0, height - paddleHeight);
}
