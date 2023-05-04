//prepare constants
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const duckBG = new Image();
duckBG.src = "./images/Ducks.jpg";
let frames = 0;
let score = 0;
let difficulty = 0;
const input = document.getElementById("typeHere");
const wordsOnscreen = [];
let wordsArray = [];

//resize canvas to window size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth * 0.5;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// start screen/game screen/game over

function togglescreen(id, toggle) {
  let element = document.getElementById(id);
  let display = toggle ? "block" : "none";
  element.style.display = display;
}

//Add event listener to the button
window.onload = () => {
  document.getElementById("btn-kids").onclick = () => {
    togglescreen("start-screen", false);
    togglescreen("game-screen", true);
    togglescreen("gameover-screen", false);
    input.addEventListener("input", checkWord);
    difficulty = 1;
    wordsArray = wordsThree.concat(wordsFour);
    kidsGame();
  };

  document.getElementById("btn-play-again").onclick = () => {
    togglescreen("start-screen", false);
    togglescreen("game-screen", true);
    togglescreen("gameover-screen", false);
    input.addEventListener("input", checkWord);
    frames = 0;
    score = 0;
    wordsOnscreen.length = 0;
    kidsGame();
  };
};

//Create Class for the Word Generator
class WordGenerator {
  constructor(height, color, word, direction, x) {
    this.height = height;
    this.color = color;
    this.word = word.toLowerCase();
    this.x = x;
    this.direction = direction;
  }

  update() {
    ctx.font = "bold 48px sans-serif";
    ctx.fillStyle = this.color;
    ctx.fillText(this.word, this.x, this.height);
  }
}

function moveWords() {
  for (i = 0; i < wordsOnscreen.length; i++) {
    if (wordsOnscreen[i].direction === 0) {
      wordsOnscreen[i].x += -1;
    }
    if (wordsOnscreen[i].direction === 1) {
      wordsOnscreen[i].x += 1;
    }
    wordsOnscreen[i].update();
  }
  //every 2.4 secs
  if (frames % 120 === 0) {
    let height = 50 + Math.floor(Math.random() * (canvas.height - 50));
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    let color = `rgb(${red},${green},${blue})`;
    let iWord = Math.floor(Math.random() * wordsArray.length);
    let direction = Math.floor(Math.random() * 2);
    let word = wordsArray[iWord];
    let x;
    if (direction === 0) {
      x = canvas.width;
    }
    if (direction === 1) {
      x = -word.length * 48;
    }
    wordsOnscreen.push(new WordGenerator(height, color, word, direction, x));
  }
}

//Function to check if word is on screen
function checkWord() {
  let isolateWord = wordsOnscreen.map((item) => item.word);
  if (isolateWord.includes(input.value)) {
    wordsOnscreen.splice(isolateWord.indexOf(input.value), 1);
    input.value = "";
    score++;
    document.getElementById("annex").innerHTML = `Score: ${score}`;
  }
}

// function loseLife(){}

//Looping game function: kids
function kidsGame() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(duckBG, 0, 0, canvas.width, canvas.height);
  moveWords();
  checkWord();
  let animation = requestAnimationFrame(kidsGame);
  if (score === 4) {
    cancelAnimationFrame(animation);
    togglescreen("start-screen", false);
    togglescreen("game-screen", false);
    togglescreen("gameover-screen", true);
  }
}
