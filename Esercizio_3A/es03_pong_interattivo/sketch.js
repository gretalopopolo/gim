let posX, velX;
let posY, velY;
let ballColor;
let ballSize;
let targetSize;

let paddleWidth, paddleHeight;
let p1Y, p2Y;
let paddleSpeed;

let score1 = 0;
let score2 = 0;

let trail = [];
let maxTrailLength = 30;

let gameStarted = false;
let button;

const BASE_WIDTH = 1600;
const BASE_HEIGHT = 1200;

let scaleX, scaleY, scale;
let buttonHue = 0; // <-- Variabile per cambiare colore del pulsante

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateScales();

  textAlign(CENTER, CENTER);
  textSize(48 * scale);
  colorMode(HSB, 360, 100, 100, 1);

  // Pulsante "Inizia partita"
  button = createButton("Inizia partita");
  button.position(width / 2 - 80, height / 2 + 60 * scale);  // più in basso
  button.style("font-size", `${24 * scale}px`);
  button.style("padding", "12px 24px");
  button.style("color", "white"); // Colore del testo del pulsante
  button.mousePressed(startGame);
}

function startGame() {
  gameStarted = true;
  button.hide();
  resetGame();
}

function resetGame() {
  score1 = 0;
  score2 = 0;

  posX = width / 2;
  posY = height / 2;
  velX = random([-1, 0.5]) * random(10, 21) * scale;
  velY = random([-1, 0.5]) * random(2, 15) * scale;

  ballColor = color(random(360), 80, 100);
  targetSize = random(60, 140) * scale;
  ballSize = targetSize;

  const uniformScale = min(scaleX, scaleY);
  paddleWidth = 40 * uniformScale;
  paddleHeight = 200 * uniformScale;
  paddleSpeed = 14 * uniformScale;

  p1Y = height / 2 - paddleHeight / 2;
  p2Y = height / 2 - paddleHeight / 2;

  trail = [];
}

function draw() {
  if (!gameStarted) {
    background(0);
    fill(0, 0, 100);
    text("Benvenuto nel Pong Colorato!", width / 2, height / 2 - 30 * scale);

    // Colore ciclico per il pulsante
    buttonHue = (buttonHue + 1) % 360;
    let btnColor = color(buttonHue, 80, 100);
    button.style("background-color", btnColor.toString());

    return;
  }

  background(0);

  posX += velX;
  posY += velY;

  if (posY <= 0 || posY >= height) {
    velY *= -1;
    cambiaAspetto();
  }

  if (posX <= 30 + paddleWidth && posY > p1Y && posY < p1Y + paddleHeight) {
    velX *= -1;
    cambiaAspetto();
    posX = 30 + paddleWidth + 1;
  }

  if (posX >= width - paddleWidth - 30 && posY > p2Y && posY < p2Y + paddleHeight) {
    velX *= -1;
    cambiaAspetto();
    posX = width - paddleWidth - 30 - 1;
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
  drawingContext.shadowBlur = 120 * scale;
  drawingContext.shadowColor = ballColor;
  ellipse(posX, posY, ballSize);

  drawPaddles();
  movePlayers();
  showScore();
}

function cambiaAspetto() {
  ballColor = color(random(360), 80, 100);
  targetSize = random(60, 140) * scale;
}

function resetBall() {
  posX = width / 2;
  posY = height / 2;
  velX = random([-1, 1]) * random(10, 21) * scale;
  velY = random([-1, 1]) * random(10, 19) * scale;
  cambiaAspetto();
  trail = [];
}

function drawPaddles() {
  noStroke();

  // Player 1 - Azzurro, spostato a destra di 30 px
  fill(190, 80, 100); // HSB azzurro
  rect(30, p1Y, paddleWidth, paddleHeight);

  // Player 2 - Rosa, spostato a sinistra di 30 px
  fill(320, 80, 100); // HSB rosa
  rect(width - paddleWidth - 30, p2Y, paddleWidth, paddleHeight);
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

  // Punteggio principale
  textSize(64 * scale);
  text(score1 + " : " + score2, width / 2, 80 * scaleY);  // <-- alzato da 90 * scaleY a 80 * scaleY

  // Titolo
  textSize(48 * scale);
  text("PUNTEGGIO", width / 2, 160 * scaleY);

  // Istruzioni
  textSize(16 * scale); // più piccola
  text(
    "Premi le freccette per muovere il giocatore di destra e i tasti WASD per muovere il giocatore di sinistra",
    width / 2,
    230 * scaleY  // abbassato da 210 a 230
  );

  // Icone
  drawKeyIcons();
}

function drawKeyIcons() {
  const size = 22 * scale;
  const spacing = 10 * scale;
  const baseY = 310 * scaleY;

  // WASD (a sinistra)
  drawKeyIcon(width / 2 - 160 * scale, baseY - size, "W", size);
  drawKeyIcon(width / 2 - 200 * scale, baseY, "A", size);
  drawKeyIcon(width / 2 - 160 * scale, baseY, "S", size);
  drawKeyIcon(width / 2 - 120 * scale, baseY, "D", size);

  // Frecce (a destra)
  drawArrowIcon(width / 2 + 120 * scale, baseY - size, "up", size);
  drawArrowIcon(width / 2 + 120 * scale, baseY + size, "down", size);
  drawArrowIcon(width / 2 + 80 * scale, baseY, "left", size);
  drawArrowIcon(width / 2 + 160 * scale, baseY, "right", size);
}

function drawArrowIcon(x, y, direction, size) {
  push();
  translate(x, y);
  fill(255);
  noStroke();
  beginShape();
  if (direction === "up") {
    vertex(0, -size / 2);
    vertex(-size / 2, size / 2);
    vertex(size / 2, size / 2);
  } else if (direction === "down") {
    vertex(0, size / 2);
    vertex(-size / 2, -size / 2);
    vertex(size / 2, -size / 2);
  } else if (direction === "left") {
    vertex(-size / 2, 0);
    vertex(size / 2, -size / 2);
    vertex(size / 2, size / 2);
  } else if (direction === "right") {
    vertex(size / 2, 0);
    vertex(-size / 2, -size / 2);
    vertex(-size / 2, size / 2);
  }
  endShape(CLOSE);
  pop();
}

function drawKeyIcon(x, y, letter, size) {
  push();
  translate(x, y);
  rectMode(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(1.5);
  rect(0, 0, size, size, 4 * scale);
  fill(0);
  noStroke();
  textSize(size * 0.6);
  textAlign(CENTER, CENTER);
  text(letter, 0, 0);
  pop();
}
function calculateScales() {
  scaleX = windowWidth / BASE_WIDTH;
  scaleY = windowHeight / BASE_HEIGHT;
  scale = ((scaleX + scaleY) / 2) * 0.8;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateScales();

  if (!gameStarted) {
    button.position(width / 2 - 80, height / 2 + 60 * scale);
  }

  const uniformScale = min(scaleX, scaleY);
  paddleWidth = 40 * uniformScale;
  paddleHeight = 200 * uniformScale;
  paddleSpeed = 14 * uniformScale;

  p1Y = constrain(p1Y, 0, height - paddleHeight);
  p2Y = constrain(p2Y, 0, height - paddleHeight);
}
