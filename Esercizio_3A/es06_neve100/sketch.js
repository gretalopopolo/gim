let fiocchi = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 500; i++) {
    fiocchi.push({
      px: random(0, width),
      py: random(-100, 0),
      dim: random(10, 20),
      vel: random(1, 3), // velocità massima
      vy: 0              // velocità attuale (parte da 0)
    });
  }
}

function draw() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < fiocchi.length; i++) {
    let f = fiocchi[i];

    // Aumenta dolcemente la velocità fino a vel
    f.vy = lerp(f.vy, f.vel, 0.01);

    f.px += random(-1.5, 1.5);
    f.py += f.vy;

    if (f.py > height) {
      f.py = 0;
      f.px = random(0, width);
      f.vy = 0; // riavvia la discesa dolce
    }

    textSize(f.dim);
    text("*", f.px, f.py);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
