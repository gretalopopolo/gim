let posX, velX;
let posY, velY;
let ballColor;
let ballSize;
let targetSize;

let bgHue;  // Per il colore di sfondo che cambia velocemente

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100);
  background(0);

  posX = random(width);
  velX = random(5, 12);
  posY = random(height);
  velY = random(5, 20);

  ballColor = color(random(360), 80, 100);
  targetSize = random(30, 350);
  ballSize = targetSize;

  bgHue = random(360); // Inizializza il colore di sfondo
}

function draw() {
  // Cambia il colore dello sfondo ad ogni frame (scorre lentamente)
  bgHue = (bgHue + 1) % 360;  // Cambia il valore hue ad ogni frame (più veloce del cambio pallina)

  noStroke();
  fill(bgHue, 80, 15, 0.05);  // Colore scuro ma con sfumatura e trasparenza per scia
  rect(0, 0, width, height);

  posX += velX;
  posY += velY;

  if (posX >= width || posX <= 0) {
    velX *= -1;
    cambiaAspetto();
  }

  if (posY >= height || posY <= 0) {
    velY *= -1;
    cambiaAspetto();
  }

  ballSize += (targetSize - ballSize) * 0.2;

  fill(ballColor);
  noStroke();
  drawingContext.shadowBlur = 60;
  drawingContext.shadowColor = ballColor;
  ellipse(posX, posY, ballSize);
}

function cambiaAspetto() {
  ballColor = color(random(360), 80, 100);
  targetSize = random(30, 350);
}
