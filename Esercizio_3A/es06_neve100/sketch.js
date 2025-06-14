let fiocchi = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  creaFiocchi(500);
}

function draw() {
  background(10, 10, 40); // sfondo blu scuro
  fill(255);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < fiocchi.length; i++) {
    let f = fiocchi[i];

    f.vy = lerp(f.vy, f.vel, 0.01);
    f.angle += f.angleSpeed;
    let oscillation = sin(f.angle) * f.amplitude;

    let jitter = f.dim < 40 ? random(-0.15, 0.15) : 0;

    f.px += oscillation + jitter;
    f.py += f.vy;

    if (f.py > height) {
      f.py = random(-height * 1.5, 0);
      f.px = random(20, width - 20);
      f.vy = 0;
      f.angle = random(TWO_PI);
    }

    textSize(f.dim);
    text("*", f.px, f.py);
  }
}

function creaFiocchi(n, posX = null, posY = null) {
  for (let i = 0; i < n; i++) {
    let dim = random() < 0.2 ? random(40, 60) : random(10, 30);

    fiocchi.push({
      px: posX !== null ? posX : random(20, width - 20),
      py: posY !== null ? posY : random(-height * 1.5, 0),
      dim: dim,
      vel: random(0.2, 0.7),
      vy: 0,
      angle: random(TWO_PI),
      angleSpeed: random(0.003, 0.008),
      amplitude: random(0.03, 0.1)
    });
  }
}

function mousePressed() {
  let spacing = 25; // distanza tra i fiocchi
  let baseX = mouseX;
  let baseY = mouseY;

  for (let i = 0; i < 5; i++) {
    creaFiocchi(1, baseX, baseY);
    let last = fiocchi[fiocchi.length - 1];
    last.px += (i - 2) * spacing;
    last.py += (i % 2 === 0 ? 1 : -1) * spacing * floor(i / 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
