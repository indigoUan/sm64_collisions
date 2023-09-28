let speed = 1;

var first = true;
var oldX = 477;

function nextframe() {
	let mario = document.getElementById("marioSPR");
	let hitboxG = document.getElementById("marioBOXg");
	let hitboxB = document.getElementById("marioBOXb");

	var x = oldX - speed * 40 * (first? 0 : 1);
	if (hitboxB.style.visibility == "unset") {
		x = 150;
	}
	var xHB = x - speed * 40;
	var y = 38;

	hitboxB.style.visibility = "hidden";

	mario.style.left = x + "px";
	mario.style.top = y + "px";

	hitboxB.style.left = hitboxG.style.left = xHB + "px";
	hitboxB.style.top = hitboxG.style.top = y + "px";

	if (checkWallOverlap(xHB)) {
		hitboxB.style.visibility = "unset";
	}

	first = false;
	oldX = x;
}

function changeSpeed(changeBy) {
	oldX = 477;
	first = true;
	speed += changeBy;
	if (speed <= 1) {
		speed = 1;
	}
	if (speed >= 11) {
		speed = 11;
	}
	nextframe();
}

function checkWallOverlap(x) {
	let linex = x;
	let linew = x + 62;
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
	if (speed >= 11) {
		speed = 11;
	}
}

nextframe();
