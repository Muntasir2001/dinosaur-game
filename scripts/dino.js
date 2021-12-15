const dino = document.querySelector('[data-dino]');

const JUMP_SPEED = 0.45;
const GRAVITY = 0.011;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100; //every single frame of dino should last for 100 ms

let isJumping;
let currentFrameTime;
let dinoFrame;

export function setupDino() {
	isJumping = false;
	currentFrameTime = 0;
	dinoFrame = 0;
}

export function updateDino(delta, speedScale) {
	handleRun(delta, speedScale);
	handleJump();
}

/* for moving through different animations */
function handleRun(delta, speedScale) {
	if (isJumping) {
		dino.src = '../images/dino-stationary.png';

		return;
	}

	if (currentFrameTime >= FRAME_TIME) {
		// when we go to last frame, its gonna go back to first frame automatically (still can't understand the logic lol, actually nevermind)
		dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
		dino.src = `../images/dino-run-${dinoFrame}.png`;

		currentFrameTime -= FRAME_TIME;
	}

	currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
	if (!isJumping) return;
}
