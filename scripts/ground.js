import {
	incrementCustomProperty,
	setCustomProperty,
	getCustomProperty,
} from './updateCustomProperty.js';

const SPEED = 0.2;
const ground = document.querySelectorAll('[data-ground]');

export function setupGround() {
	setCustomProperty(ground[0], '--left', 0);
	setCustomProperty(ground[1], '--left', 300);
}

export function updateGround(delta, speedScale) {
	ground.forEach((grnd) => {
		incrementCustomProperty(grnd, '--left', delta * speedScale * SPEED * -1);

		if (getCustomProperty(grnd, '--left') <= -300) {
			incrementCustomProperty(grnd, '--left', 600);
		}
	});
}
