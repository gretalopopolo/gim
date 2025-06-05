let serifFont;

function preload() {
	// Uso font di sistema serif "Georgia"
	serifFont = 'Bodoni';
}

function setup() { 
	createCanvas(windowWidth, windowHeight);
	textAlign(CENTER, CENTER);
	textSize(56);  // Numeri leggermente più grandi
	textFont(serifFont);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(200);
	noStroke();

	translate(width / 2, height / 2);

	// Cerchio giallo come bordo (più grande)
	fill(255, 230, 100);  // giallo chiaro
	ellipse(0, 0, 470);   // più grande del cerchio bianco

	// Cerchio bianco centrale
	fill(255);
	ellipse(0, 0, 450);

	// Numeri dell'orologio (con margine interno)
	fill(0);
	for (let i = 1; i <= 12; i++) {
		let angle = (i / 12) * TWO_PI - HALF_PI;
		let x = cos(angle) * 190;
		let y = sin(angle) * 190;
		text(i, x, y);
	}

	// Ore - più fine e centrata
	push();
	const angoloOre = (hour() % 12 + minute() / 60) / 12 * TWO_PI;
	rotate(angoloOre);
	fill(255, 0, 0);
	rect(-5, 9, 10, -100);
	pop();

	// Minuti - più fine e centrata
	push();
	const angoloMinuti = minute() / 60 * TWO_PI;
	rotate(angoloMinuti);
	fill(255, 0, 0);
	rect(-4, 10, 8, -140);
	drawHeart(0, -140, 40);
	pop();

	// Secondi (lancetta più corta, più fine e centrata)
	push();
	const angoloSecondi = second() / 60 * TWO_PI;
	rotate(angoloSecondi);
	fill(225, 0, 0);
	rect(-2, 10, 4, -140);
	drawHeart(0, -140, 30);
	pop();

	// Centrino
	fill(255, 0, 0);
	ellipse(0, 0, 20);
}

function drawHeart(x, y, s) {
	push();
	translate(x, y);
	rotate(PI);
	scale(s / 100);
	fill(255, 0, 0);
	beginShape();
	vertex(0, -40);
	bezierVertex(25, -60, 55, -35, 0, 20);
	bezierVertex(-55, -35, -25, -60, 0, -40);
	endShape(CLOSE);
	pop();
}
