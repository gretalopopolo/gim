let fiocchi = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  creaFiocchi(500);
}

function draw() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < fiocchi.length; i++) {
    let f = fiocchi[i];

    f.vy = lerp(f.vy, f.vel, 0.01);

    f.angle += f.angleSpeed;

    let oscillation = sin(f.angle) * f.amplitude;

    f.px += oscillation + random(-0.3, 0.3);
    f.py += f.vy;

    if (f.py > height) {
      f.py = random(-height, 0);
      f.px = random(0, width);
      f.vy = 0;
      f.angle = random(TWO_PI);
    }

    textSize(f.dim);
    text("*", f.px, f.py);
  }
}

function creaFiocchi(n, posX = null, posY = null) {
  for (let i = 0; i < n; i++) {
    // dimensioni più variabili, da piccolissimi a molto grandi
    let dim;
    if (random() < 0.3) {
      // 30% fiocchi grandi
      dim = random(50, 80);
    } else {
      // 70% fiocchi piccoli
      dim = random(10, 30);
    }
    fiocchi.push({
      px: posX !== null ? posX + random(-15, 15) : random(width),
      py: posY !== null ? posY + random(-15, 15) : random(-height, 0),
      dim: dim,
      vel: random(1, 3),
      vy: 0,
      angle: random(TWO_PI),
      angleSpeed: random(0.01, 0.03),
      amplitude: random(0.5, 1.5)
    });
  }
}

function mousePressed() {
  creaFiocchi(5, mouseX, mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
