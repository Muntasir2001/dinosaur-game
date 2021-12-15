import { updateGround, setupGround } from './ground.js';

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;

const world = document.querySelector('[data-world]');

// setPixelToWorldScale();
window.addEventListener('load', setPixelToWorldScale);
window.addEventListener('resize', setPixelToWorldScale);

setupGround();

let lastTime;
function update(time) {
	if (lastTime == null) {
		lastTime = time;
		window.requestAnimationFrame(update);
		return;
	}

	const delta = time - lastTime;
	console.log(delta);

	updateGround(delta, 1);

	lastTime = time;
	window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

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
