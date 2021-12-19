import {
	incrementCustomProperty,
	setCustomProperty,
	getCustomProperty,
} from './updateCustomProperty.js';

const world = document.querySelector('[data-world]');

// time in ms
// half a second between cactuses is the minimum
// max time is 2 seconds between the cactuses
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;
const SPEED = 0.05;

let nextCactusTime;

export function setupCactus() {
	nextCactusTime = CACTUS_INTERVAL_MIN;
}

export function updateCactus(delta, speedScale) {
	if (nextCactusTime <= 0) {
		createCactus();

		nextCactusTime =
			randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
			speedScale;
	}

	nextCactusTime -= delta;
}

function createCactus() {
	const cactus = document.createElement('div');
	// allows you to select this element using dataset (for example [data-cactus])
	cactus.dataset.cactus = true;
	cactus.src = '../images/cactus.png';
	cactus.classList.add('cactus');
	setCustomProperty(cactus, '--left', 100);

	world.append(cactus);
}
