import { updateGround, setupGround } from './ground.js';
import { updateDino, setupDino } from './dino.js';
import { updateCactus, setupCactus } from './cactus.js';

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

	lastTime = time;
	window.requestAnimationFrame(update);
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
