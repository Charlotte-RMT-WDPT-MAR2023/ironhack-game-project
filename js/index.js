//prepare constants
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const duckBG = new Image();
duckBG.src = "./images/Ducks.jpg";
let frames = 0;
let score = 0;
let life = 4;
let animation;
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

  //Kids Button
    document.getElementById('btn-kids').onclick = () => {
      togglescreen("start-screen", false);
    togglescreen("game-screen", true);
      input.addEventListener('input', checkWord);
      difficulty = 1;
      wordsArray = wordsThree.concat(wordsFour);
      game();
      };
  //Easy Button
    document.getElementById('btn-easy').onclick = () => {
      togglescreen("start-screen", false);
    togglescreen("game-screen", true);
      input.addEventListener('input', checkWord);
      difficulty = 2;
      wordsArray = wordsThree.concat(wordsFour).concat(wordsFive);
      game();
      };
  //Medium Button
    document.getElementById('btn-med').onclick = () => {
      togglescreen("start-screen", false);
    togglescreen("game-screen", true);
      input.addEventListener('input', checkWord);
      difficulty = 3;
      wordsArray = wordsFive.concat(wordsSix).concat(wordsSeven);
      game();
      };
  //Hard Button
  //German Button
    document.getElementById('btn-german').onclick = () => {
      togglescreen("start-screen", false);
    togglescreen("game-screen", true);
      input.addEventListener('input', checkWord);
      difficulty = 2;
      wordsArray = wordsGerman;
      game();
      };

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
    if(wordsOnscreen[i].direction === 0){wordsOnscreen[i].x += -difficulty;}
    if(wordsOnscreen[i].direction === 1){wordsOnscreen[i].x += difficulty ;}
    wordsOnscreen[i].update();
  }
  //every 4.8 secs
  if(frames % (280 - 40*difficulty) === 0){
  let height = 50 + Math.floor(Math.random() * (canvas.height-50));
  // let red = Math.floor(Math.random() * 255);
  // let green = Math.floor(Math.random() * 255);
  // let blue = Math.floor(Math.random() * 255);
  // let color = `rgb(${red},${green},${blue})`;
  let iWord = Math.floor(Math.random() * wordsArray.length);
  let direction = Math.floor(Math.random() * 2);
  let word = wordsArray[iWord];
  let x;
  if(direction === 0){x = canvas.width;}
  if(direction === 1){x = -ctx.measureText(word).width;}
  wordsOnscreen.push(new WordGenerator(height, 'white', word, direction, x));

  }
}

//Function to check if word is on screen
function checkWord(){
  let isolateWord = wordsOnscreen.map(item => item.word)
    if(isolateWord.includes(input.value)){
        wordsOnscreen.splice(isolateWord.indexOf(input.value), 1);
        input.value = '';
        score++;
        document.getElementById('score').innerHTML = `Score: ${score}`
    }
}

function loseLife(){
  if(difficulty > 1){document.getElementById('life').innerHTML = `Life: ${life}`;}
  for (i = 0; i < wordsOnscreen.length; i++) {
    if(wordsOnscreen[i].direction === 0 && wordsOnscreen[i].x < -ctx.measureText(wordsOnscreen[i].word).width){
      wordsOnscreen.splice(i, 1);
      if(difficulty > 1){life--}
    }
    if(wordsOnscreen[i].direction === 1 && wordsOnscreen[i].x > canvas.width){
      wordsOnscreen.splice(i, 1);
      if(difficulty > 1){life--};
    }
  }
  //win condition
  if(score === +document.getElementById('kids-goal').value && difficulty === 1 || frames === 3600){
    cancelAnimationFrame(animation);
  alert('Win Condition');}
  //lose condition
  if(difficulty > 1 && life === 0){
    cancelAnimationFrame(animation);
  alert('Lose Condition');}
}

//Looping game function: kids

function game(){

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(duckBG, 0, 0, canvas.width, canvas.height);
  moveWords();
  frames++
  checkWord();

  animation = requestAnimationFrame(game);
  loseLife();
   togglescreen("game-screen", false);
   togglescreen("gameover-screen", true);
}


