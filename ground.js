import { getProperty, incrementProperty, setProperty } from "./updateProperties.js";

const SPEED = 0.05;
const groundElems = document.querySelectorAll('[data-ground]');

export function setupGround() {
    setProperty(groundElems[0], "--left", 0);
    setProperty(groundElems[1], "--left", 300);
}

export function updateGround(delta,speedScale) {
     groundElems.forEach(ground => {
        incrementProperty(ground,"--left", speedScale * delta * SPEED * -1)

        if(getProperty(ground, "--left") <= -300) {
            incrementProperty(ground, "--left", 600)
        }
     })
}
