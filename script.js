const container = document.querySelector(".container");

const getCustomProperty = (elem, prop) => {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
};

const setProp = (elem, prop, value) => {
  return elem.style.setProperty(prop, value);
};

const incProp = (elem, prop, incVal) => {
  setProp(elem, prop, getCustomProperty(elem, prop) + incVal);
};

let DELTA = 0;
let lastTime = null;
const loop = (time) => {
  if (lastTime == null) {
    lastTime = 0;
    window.requestAnimationFrame(loop);
    return;
  }
  DELTA = time - lastTime - 10;
  lastTime = time;
  moveBlocks()
  window.requestAnimationFrame(loop);
};

window.requestAnimationFrame(loop);


let INITIAL = 0;
const MAX = 400;
const MIN = 700;
let TIMING = 0;
const blockArr = []
const createBlock = () => {
  const block = document.createElement("div");
  setProp(block, "--left", 200);
  block.classList.add("block");
  container.append(block);
  blockArr.push(block)
  incProp(block, "--left", DELTA * -0.1);
};


const moveBlocks = () => {
    blockArr.forEach(blc => {
      incProp(blc, "--left", -DELTA * .1)
    })
    INITIAL = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
    TIMING += DELTA * 0.7;
    if (TIMING > INITIAL) {
      game = true;
      createBlock(INITIAL);
      TIMING -= INITIAL;
    }
}