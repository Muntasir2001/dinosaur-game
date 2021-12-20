import { updateGround, setupGround } from './ground.js';
import { updateDino, setupDino, getDinoRect, setDinoLoose } from './dino.js';
import { updateCactus, setupCactus, getCactusRects } from './cactus.js';

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const world = document.querySelector('[data-world]');
const startScreenText = document.querySelector('.start-screen');
const scoreNumber = document.querySelector('.score');

window.addEventListener('load', setPixelToWorldScale);
window.addEventListener('resize', setPixelToWorldScale);

/* keydown event listener */
document.addEventListener('keydown', handleStart, { once: true });

// setupGround();

let lastTime;
let speedScale = 1;
let score = 0;

function update(time) {
	if (lastTime == null) {
		lastTime = time;
		window.requestAnimationFrame(update);
		return;
	}

	const delta = time - lastTime;
	// console.log(delta);

	updateGround(delta, speedScale);
	updateSpeedScale(delta);
	updateScore(delta);
	updateDino(delta, speedScale);
	updateCactus(delta, speedScale);

	if (checkLose()) return handleLoose();

	lastTime = time;
	window.requestAnimationFrame(update);
}

function handleLoose() {
	setDinoLoose();
	setTimeout(() => {
		document.addEventListener('keydown', handleStart, { once: true });
		startScreenText.style.display = 'block';
	}, 100);
}

function checkLose() {
	const dinoRect = getDinoRect();

	return getCactusRects().some((rect) => isCollision(rect, dinoRect));
}

function isCollision(rect1, rect2) {
	return (
		rect1.left < rect2.right &&
		rect1.top < rect2.bottom &&
		rect1.right > rect2.left &&
		rect1.bottom > rect2.top
	);
}

function updateSpeedScale(delta) {
	speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
	// every sec u get 10 points
	score += delta * 0.01;

	scoreNumber.textContent = Math.floor(score);
}

function setPixelToWorldScale(e) {
	let worldToPixelScale;

	if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
		worldToPixelScale = window.innerWidth / WORLD_WIDTH;
	} else {
		worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
	}

	world.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
	world.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}

function handleStart() {
	startScreenText.style.display = 'none';

	lastTime = null;
	score = 0;

	setupGround();
	setupDino();
	setupCactus();

	window.requestAnimationFrame(update);
}
