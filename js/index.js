//prepare constants and initial values
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight * .99;

const duckBG = new Image();
duckBG.src = "./images/Ducks.jpg";
const flameBG = new Image();
flameBG.src = './images/burning-fire.jpg';

let frames = 0;
let score = 0;
let life = 4;
let animation;
let difficulty = 1;
let timer = 61;
let german = 0;
const input = document.getElementById("typeHere");
const wordsOnscreen = [];
let wordsArray = wordsThree.concat(wordsFour);

//Hiding Screen function
function togglescreen(id, toggle) {
  let element = document.getElementById(id);
  let display = toggle ? "block" : "none";
  element.style.display = display;
}

//Add event listener to the button
window.onload = () => {

//Start Button
  document.getElementById("btn-start").onclick = () => {
    togglescreen("start-screen", false);
    togglescreen("game-screen", true);
    game();
  }

//Kids Button
  document.getElementById("btn-kid").onclick = () => {
    difficulty = 1;
    german = 0;
    wordsArray = wordsThree.concat(wordsFour);
  };

//Easy Button
  document.getElementById("btn-easy").onclick = () => {
    difficulty = 2;
    german = 0;
    wordsArray = wordsThree.concat(wordsFour).concat(wordsFive);
  };

//Medium Button
  document.getElementById("btn-med").onclick = () => {
    difficulty = 3;
    german = 0;
    wordsArray = wordsFive.concat(wordsSix).concat(wordsSeven);
  };

//Hard Button
  document.getElementById("btn-hard").onclick = () => {
    difficulty = 3;
    german = 0;
    wordsArray = wordsTen
      .concat(wordsNine)
      .concat(wordsEight)
      .concat(wordsFive)
      .concat(wordsSix)
      .concat(wordsSeven);
  };

//German Button
  document.getElementById('btn-german').onclick = () => {
    difficulty = 2;
    wordsArray = wordsGerman;
    german = 1;
  };};

//reset button
document.getElementById("btn-play-again").onclick = () => {
  togglescreen("start-screen", true);
  togglescreen("game-screen", false);
  togglescreen("gameover-screen", false);
  frames = 0;
  score = 0;
  life = 4;
  wordsOnscreen.length = 0;
  timer = 61;
  input.value = '';
  canvas.style.filter = "blur(0px)";
  document.getElementById('life').innerHTML = ``;
  document.getElementById('timer').innerHTML = ``;
  modal.style.display = "none";
};
  

//music
const music = document.getElementById("music");
music.volume = 0.1;
const correctSound = document.getElementById("correct-sound");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
music.load();


//Create Class for the Word Generator
class WordGenerator {
  constructor(height, color, word, direction, x, speed) {
    this.height = height;
    this.color = color;
    this.word = word.toLowerCase();
    this.x = x;
    this.direction = direction;
    this.speed = speed;
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
      wordsOnscreen[i].x += -(1 + wordsOnscreen[i].speed);
    }
    if (wordsOnscreen[i].direction === 1) {
      wordsOnscreen[i].x += 1 + wordsOnscreen[i].speed;
    }
    wordsOnscreen[i].update();
  }

  //every 4.8 secs for kids with difficulty variance
  if (frames % (280 - 40 * difficulty) === 0) {
    let height = 50 + Math.floor(Math.random() * (canvas.height - 50));
    // let red = Math.floor(Math.random() * 255);
    // let green = Math.floor(Math.random() * 255);
    // let blue = Math.floor(Math.random() * 255);
    // let color = `rgb(${red},${green},${blue})`;
    let iWord = Math.floor(Math.random() * wordsArray.length);
    let direction = Math.floor(Math.random() * 2);
    let word = wordsArray[iWord];
    let x;
    let speed = Math.floor(Math.random() * difficulty);
    if (direction === 0) {
      x = canvas.width;
    }
    if (direction === 1) {
      x = -ctx.measureText(word).width;
    }
    wordsOnscreen.push(
      new WordGenerator(height, "white", word, direction, x, speed)
    );
  }
}

//Function to check if word is on screen
function checkWord() {
  let isolateWord = wordsOnscreen.map((item) => item.word);
  if (isolateWord.includes(input.value)) {
    wordsOnscreen.splice(isolateWord.indexOf(input.value), 1);
    input.value = "";
    score++;
    correctSound.play();
  }
  document.getElementById("score").innerHTML = `Score: ${score}`;
}

function loseLife() {
  if (difficulty > 1) {
    document.getElementById("life").innerHTML = `Life: ${life}`;
  }
  for (i = 0; i < wordsOnscreen.length; i++) {
    if (
      wordsOnscreen[i].direction === 0 &&
      wordsOnscreen[i].x < -ctx.measureText(wordsOnscreen[i].word).width
    ) {
      wordsOnscreen.splice(i, 1);
      if (difficulty > 1) {
        life--;
      }
    }
    if (wordsOnscreen[i].direction === 1 && wordsOnscreen[i].x > canvas.width) {
      wordsOnscreen.splice(i, 1);
      if (difficulty > 1) {
        life--;
      }
    }
  }
}

//Onscreen timer
function countdown() {
  if (frames % 60 === 0 && difficulty > 1) {
    timer--;
    document.getElementById("timer").innerHTML = `Timer: ${timer}`;
  }
}

//Win Condition
function win() {
  if (score === +document.getElementById("kids-goal").value  ||  timer < 0) {
    cancelAnimationFrame(animation);
    togglescreen("gameover-screen", true);
    canvas.style.filter = "blur(5px)";
    document.getElementById('win-lose').innerHTML = '<img src="./images/8706.png" id="win" alt=""/>';
    music.pause();
    winSound.play();
  }
}

//lose condition
function lose() {
  if (difficulty > 1 && life < 1) {
    cancelAnimationFrame(animation);
    togglescreen("gameover-screen", true);
    canvas.style.filter = "blur(5px)";
    document.getElementById('win-lose').innerHTML = '<img src="./images/te856-removebg-preview.png" id="lose" alt=""/>';
    music.pause();
    loseSound.play();
  }
}

//Looping game function
function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(german===0){ctx.drawImage(duckBG, 0, 0, canvas.width, canvas.height);}
  if(german===1){ctx.drawImage(flameBG, 0, 0, canvas.width, canvas.height);}
  document.getElementById('goal').innerHTML = `Goal: ${+document.getElementById('kids-goal').value}`;
  moveWords();
  countdown();
  music.play();
  frames++;
  checkWord();
  animation = requestAnimationFrame(game);
  loseLife();
  lose();
  win();
}
