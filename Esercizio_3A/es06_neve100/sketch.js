let fiocchi = [];
let numFiocchi = 600;

function setup() {
  createCanvas(windowWidth, windowHeight);
  creaFiocchi(numFiocchi);
}

function draw() {
  background(0, 30, 60);
  fill(255);
  noStroke();

  for (let f of fiocchi) {
    f.x += sin(f.angle) * 0.5;
    f.angle += f.angleSpeed;

    f.y += f.speed;

    if (f.y > height) {
      f.y = random(-50, 0);
      f.x = random(width);
    }

    push();
    translate(f.x, f.y);
    drawFiocco(f.shape, f.size);
    pop();
  }
}

function creaFiocchi(n, posX = null, posY = null) {
  for (let i = 0; i < n; i++) {
    let size = random() < 0.15 ? random(20, 30) : random(5, 15);
    fiocchi.push({
      x: posX !== null ? posX + random(-30, 30) : random(width),
      y: posY !== null ? posY + random(-30, 30) : random(-height, 0),
      size: size,
      speed: map(size, 5, 30, 1, 3),
      angle: random(TWO_PI),
      angleSpeed: random(0.01, 0.03),
      shape: random(['circle', 'star', 'cross', 'simpleSnowflake'])
    });
  }
}

function mousePressed() {
  creaFiocchi(5, mouseX, mouseY);  // ora 5 fiocchi a ogni click
}

function drawFiocco(shape, size) {
  switch(shape) {
    case 'circle':
      ellipse(0, 0, size);
      break;
    case 'star':
      star(0, 0, size / 4, size / 2, 5);
      break;
    case 'cross':
      stroke(255);
      strokeWeight(2);
      line(-size / 2, 0, size / 2, 0);
      line(0, -size / 2, 0, size / 2);
      noStroke();
      break;
    case 'simpleSnowflake':
      stroke(255);
      strokeWeight(1.5);
      for (let i = 0; i < 6; i++) {
        rotate(PI / 3);
        line(0, 0, 0, size / 2);
      }
      noStroke();
      break;
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
