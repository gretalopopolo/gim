let posX, velX;
let posY, velY;
let ballColor;
let ballSize;
let targetSize;

let bgHue;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100);
  background(0);

  posX = width / 2;
  posY = height / 2;
  velX = random([-1, 1]) * random(2, 22);
  velY = random([-1, 1]) * random(5, 12);

  ballColor = color(random(360), 80, 100);
  targetSize = random(10, 150); // inizio con range ampio
  ballSize = targetSize;

  bgHue = random(360);
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
    cambiaDimensione();
  }

  // Rimbalzo sui bordi orizzontali
  if (posX <= 0 || posX >= width) {
    velX *= -1;
    cambiaAspetto();
    cambiaDimensione();
  }

  // Anima dimensione palla verso targetSize
  ballSize += (targetSize - ballSize) * 0.2;

  fill(ballColor);
  noStroke();
  drawingContext.shadowBlur = 60;
  drawingContext.shadowColor = ballColor;
  ellipse(posX, posY, ballSize);
}

function cambiaAspetto() {
  ballColor = color(random(360), 80, 100);
}

function cambiaDimensione() {
  targetSize = random(10, 150); // range maggiore per più differenza
}
