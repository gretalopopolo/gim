let posX, velX;
let posY, velY;
let ballColor;
let ballSize;
let targetSize;

let paddleWidth = 40;
let paddleHeight = 200;
let p1Y, p2Y;
let paddleSpeed = 14;

let score1 = 0;
let score2 = 0;

let trail = [];
let maxTrailLength = 30;

function setup() {
  createCanvas(1600, 1200);
  colorMode(HSB, 360, 100, 100, 1);
  background(0);
  textAlign(CENTER, TOP);
  textSize(64);

  posX = width / 2;
  posY = height / 2;
  velX = random([-1, 0.5]) * random(10, 21);
  velY = random([-1, 0.5]) * random(2, 15);

  ballColor = color(random(360), 80, 100);
  targetSize = random(60, 140);
  ballSize = targetSize;

  p1Y = height / 2 - paddleHeight / 2;
  p2Y = height / 2 - paddleHeight / 2;
}

function draw() {
  background(0);

  posX += velX;
  posY += velY;

  if (posY <= 0 || posY >= height) {
    velY *= -1;
    cambiaAspetto();
  }

  if (posX <= paddleWidth && posY > p1Y && posY < p1Y + paddleHeight) {
    velX *= -1;
    cambiaAspetto();
    posX = paddleWidth + 1;
  }

  if (posX >= width - paddleWidth && posY > p2Y && posY < p2Y + paddleHeight) {
    velX *= -1;
    cambiaAspetto();
    posX = width - paddleWidth - 1;
  }

  if (posX < 0) {
    score2++;
    resetBall();
  } else if (posX > width) {
    score1++;
    resetBall();
  }

  trail.push({ x: posX, y: posY, size: ballSize, col: ballColor });

  if (trail.length > maxTrailLength) {
    trail.shift();
  }

  noStroke();
  for (let i = 0; i < trail.length; i++) {
    let alpha = map(i, 0, trail.length, 0, 0.7);
    let size = map(i, 0, trail.length, trail[i].size * 0.5, trail[i].size);
    fill(hue(trail[i].col), saturation(trail[i].col), brightness(trail[i].col), alpha);
    ellipse(trail[i].x, trail[i].y, size);
  }

  ballSize += (targetSize - ballSize) * 0.2;
  fill(ballColor);
  noStroke();
  drawingContext.shadowBlur = 120;
  drawingContext.shadowColor = ballColor;
  ellipse(posX, posY, ballSize);

  drawPaddles();
  movePlayers();
  showScore();
}

function cambiaAspetto() {
  ballColor = color(random(360), 80, 100);
  targetSize = random(60, 140);
}

function resetBall() {
  posX = width / 2;
  posY = height / 2;
  velX = random([-1, 1]) * random(10, 21);
  velY = random([-1, 1]) * random(10, 19);
  cambiaAspetto();
  trail = [];
}

function drawPaddles() {
  noStroke();
  fill(0, 0, 100);
  rect(0, p1Y, paddleWidth, paddleHeight);
  rect(width - paddleWidth, p2Y, paddleWidth, paddleHeight);
}

function movePlayers() {
  if (keyIsDown(87)) p1Y -= paddleSpeed;
  if (keyIsDown(83)) p1Y += paddleSpeed;
  if (keyIsDown(UP_ARROW)) p2Y -= paddleSpeed;
  if (keyIsDown(DOWN_ARROW)) p2Y += paddleSpeed;

  p1Y = constrain(p1Y, 0, height - paddleHeight);
  p2Y = constrain(p2Y, 0, height - paddleHeight);
}

function showScore() {
  fill(0, 0, 100);
  noStroke();
  textSize(64);
  text(score1 + " : " + score2, width / 2, 40);
  textSize(48);
  text("PUNTEGGIO", width / 2, 110);
}
