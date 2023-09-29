let stepsize = 36;
let speed = 1;

let lastpos = 477 + 36;

function nextframe() {
	let mario = document.getElementById("marioSPR");
	let steps = [ document.getElementById("marioStep1"), document.getElementById("marioStep2"), document.getElementById("marioStep3"), document.getElementById("marioStep4") ];

	let x = lastpos;

	let brokeout = 4;
	for (let i = 0; i < steps.length; i++) {
		let stepX = x - (i + 1) * (stepsize * 0.25) * speed;
		steps[i].style.left = stepX + "px";
		steps[i].style.opacity = 0.2 + 0.1 * i;
		if (checkWallOverlap(stepX)) {
			brokeout = i;
			break;
		}
		lastpos = stepX;
	}
	for (let i = brokeout; i < steps.length; i++) {
		steps[i].style.opacity = 0.0;
	}

	mario.style.left = x + "px";
}

function changeSpeed(changeTo) {
	lastpos = 477;
	speed = changeTo;
	if (speed <= 1) {
		speed = 1;
	}
	if (speed >= 16) {
		speed = 16;
	}
	nextframe();
}

function checkWallOverlap(x) {
	let linex = x;
	let linew = x + 46;
	let linei = linex + (linew - linex) * 0.5;

	let wallx = 100;
	let wallw = wallx + 50;

	return (linex >= wallx && linex <= wallw) || (linei >= wallx && linei <= wallw) || (linew >= wallx && linew <= wallw);
}

let urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("hidecredit") === "true") {
	document.getElementById("credit").style.visibility = "hidden";
}
if (urlParams.has("bgcolor")) {
	document.body.style.backgroundColor = "#" + urlParams.get("bgcolor");
}
if (urlParams.has("initialspeed")) {
	speed = parseFloat(urlParams.get("initialspeed"));
	if (speed <= 1 || isNaN(speed)) {
		speed = 1;
	}
	if (speed >= 16) {
		speed = 16;
	}
}
if (urlParams.has("stepsize")) {
	stepsize = parseFloat(urlParams.get("stepsize"));
	if (stepsize <= 1 || isNaN(speed)) {
		stepsize = 1;
	}
	if (stepsize >= 400) {
		stepsize = 400;
	}
	lastpos = 477 + stepsize;
}

nextframe();
