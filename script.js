let frame = -1;
let speed = 1;

function nextframe() {
	frame++;

	let mario = document.getElementById("marioSPR");
	let hitboxG = document.getElementById("marioBOXg");
	let hitboxB = document.getElementById("marioBOXb");

	hitboxB.style.visibility = "hidden";

	var collided = false;
	var x = 477 - speed * 40 * frame;
	if (checkWallOverlap(x)) {
		collided = true;
		x = 150;
	}
	var xHB = x - speed * 40;
	var y = 38;

	mario.style.left = x + "px";
	mario.style.top = y + "px";

	hitboxB.style.left = hitboxG.style.left = xHB + "px";
	hitboxB.style.top = hitboxG.style.top = y + "px";

	if (checkWallOverlap(xHB)) {
		hitboxB.style.visibility = "unset";
	}

	if (collided) {
		frame--;
	}
}

function changeSpeed(changeBy) {
	frame = -1;
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
	var linex = x;
	var linew = x + 62;
	var linei = linex + (linew - linex) * 0.5;

	var wallx = 100;
	var wallw = wallx + 50;

	return (linex >= wallx && linex <= wallw) || (linei >= wallx && linei <= wallw) || (linew >= wallx && linew <= wallw);
}

nextframe();
