import {
  getProperty,
  incrementProperty,
  setProperty,
} from "./updateProperties.js";

const dinoElement = document.querySelector("[data-dino]");

const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const DINO_FRAME_DURATION = 100;

let isJumping;
let currentFrameDuration;
let dinoFrame;
let yAxisVelocity;
export function setUpDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFrameDuration = 0;
  setProperty(dinoElement, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
  yAxisVelocity = 0;
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElement.src = "imgs/dino-stationary.png";
    return;
  }

  if (currentFrameDuration >= DINO_FRAME_DURATION) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoElement.src = `imgs/dino-run-${dinoFrame}.png`;
    currentFrameDuration -= DINO_FRAME_DURATION;
  }
  currentFrameDuration += delta + speedScale;
}

export function getDinoRect() {
  return dinoElement.getBoundingClientRect();
}

function handleJump(delta) {
  if (!isJumping) return;

  incrementProperty(dinoElement, "--bottom", yAxisVelocity * delta);
  if (getProperty(dinoElement, "--bottom") <= 0) {
    setProperty(dinoElement, "--bottom", 0);
    isJumping = false;
  }
  yAxisVelocity -= GRAVITY * delta;
}

export function setDinoLoose(){
  dinoElement.src = "imgs/dino-lose.png"
  //document.removeEventListener("keydown", onJump);
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return;
  yAxisVelocity = JUMP_SPEED;
  isJumping = true;
}
