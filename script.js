import { setupGround, updateGround } from "./ground.js";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_INCREMENT = 0.0001;
const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");
const startElem = document.querySelector("[data-start-screen]");

setWorldScale();
window.addEventListener("resize", setWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

let lastTime;
let speedScale;
let score;
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const deltaTime = time - lastTime;

  updateGround(deltaTime, speedScale);
  updateSpeedScale(deltaTime);
  updateScore(deltaTime);

  lastTime = time;

  window.requestAnimationFrame(update);
}

function updateScore(deltaTime) {
  score += deltaTime * 0.01;
  scoreElem.textContent = Math.floor(score);
}

function handleStart() {
  lastTime = null;
  setupGround();
  speedScale = 1;
  score = 0;
  startElem.classList.add("hide");
  window.requestAnimationFrame(update);
}

function updateSpeedScale(deltaTime) {
  speedScale += deltaTime * SPEED_INCREMENT;
}

function setWorldScale() {
  let worldScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldScale = window.innerHeight / WORLD_HEIGHT;
  }
  worldElem.style.width = `${WORLD_WIDTH * worldScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldScale}px`;
}
