import { getCactusRects, setupCactus, updateCactus } from "./cactus.js";
import { getDinoRect, setDinoLoose, setUpDino, updateDino } from "./dino.js";
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
  updateDino(deltaTime, speedScale);
  updateCactus(deltaTime, speedScale);
  updateSpeedScale(deltaTime);
  updateScore(deltaTime);
  if (checkLoose()) {
    return handleLoose();
  }

  lastTime = time;

  window.requestAnimationFrame(update);
}

function checkLoose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((cactusRect) =>
    isCollision(cactusRect, dinoRect)
  );
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function handleLoose() {
  setDinoLoose();
  //Giving time to show that You lost
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    startElem.classList.remove("hide");
  }, 100);
}

function updateScore(deltaTime) {
  score += deltaTime * 0.01;
  scoreElem.textContent = Math.floor(score);
}

function handleStart() {
  lastTime = null;
  setupGround();
  setUpDino();
  setupCactus();
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
