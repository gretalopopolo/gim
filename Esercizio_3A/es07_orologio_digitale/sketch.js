function setup() {
	createCanvas(windowWidth, windowHeight);
	console.log("ciao a tutti");
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(255); // Pulisce lo sfondo ad ogni frame

	let h = hour();
	let m = minute();
	let s = second();

	if (h < 10) {
		h = "0" + h;
	}
	if (m < 10) {
		m = "0" + m;
	}
	if (s < 10) {
		s = "0" + s;
	}

	let ora = h + ":" + m + ":" + s;

	textAlign(CENTER, CENTER);
	textSize(50);
	fill(0); // Colore del testo (nero)
	text(ora, width / 2, height / 2);
}
