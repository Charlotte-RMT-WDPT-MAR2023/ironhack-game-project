//settings button

var btnOpenModal = document.getElementById("btn-settings");
  var modal = document.getElementById("settings-modal");

  btnOpenModal.onclick = function() {
    modal.style.display = "block";
  }






//prepare constants
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight * .99;
const duckBG = new Image();
duckBG.src = "./images/Ducks.jpg";
let frames = 0;
let score = 0;
let life = 4;
let animation;
let difficulty = 0;
let timer = 61;
const input = document.getElementById("typeHere");
const wordsOnscreen = [];
let wordsArray = [];

// //resize canvas to window size
// function resizeCanvas() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerWidth * 0.5;
// }
// resizeCanvas();
// window.addEventListener("resize", resizeCanvas);

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
      // input.addEventListener('input', checkWord);
      difficulty = 1;
      wordsArray = wordsThree.concat(wordsFour);
      game();
      };
  //Easy Button
    document.getElementById('btn-easy').onclick = () => {
      togglescreen("start-screen", false);
      togglescreen("game-screen", true);
      // input.addEventListener('input', checkWord);
      difficulty = 2;
      wordsArray = wordsThree.concat(wordsFour).concat(wordsFive);
      game();
      };
  //Medium Button
    document.getElementById('btn-med').onclick = () => {
      togglescreen("start-screen", false);
      togglescreen("game-screen", true);
      // input.addEventListener('input', checkWord);
      difficulty = 3;
      wordsArray = wordsFive.concat(wordsSix).concat(wordsSeven);
      game();
      };
  //Hard Button
    document.getElementById('btn-hard').onclick = () => {
      togglescreen("start-screen", false);
      togglescreen("game-screen", true);
      // input.addEventListener('input', checkWord);
      difficulty = 3;
      wordsArray = wordsTen.concat(wordsNine).concat(wordsEight).concat(wordsFive).concat(wordsSix).concat(wordsSeven);
      game();
      };
  //German Button
    document.getElementById('btn-german').onclick = () => {
      togglescreen("start-screen", false);
      togglescreen("game-screen", true);
      // input.addEventListener('input', checkWord);
      difficulty = 2;
      wordsArray = wordsGerman;
      game();
      };

  };

  //reset button
  document.getElementById("btn-play-again").onclick = () => {
    togglescreen("start-screen", true);
    togglescreen("game-screen", false);
    togglescreen("gameover-screen", false);
    // input.addEventListener("input", checkWord);
    frames = 0;
    score = 0;
    life = 4;
    wordsOnscreen.length = 0;
    timer = 61;
    input.value = '';
    canvas.style.filter = "blur(0px)";
    // game();
  };


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
    if(wordsOnscreen[i].direction === 0){wordsOnscreen[i].x += -(1 + wordsOnscreen[i].speed);}
    if(wordsOnscreen[i].direction === 1){wordsOnscreen[i].x += (1 + wordsOnscreen[i].speed);}
    wordsOnscreen[i].update();
  }
  //every 4.8 secs for kids
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
  let speed = Math.floor(Math.random() * difficulty)
  if(direction === 0){x = canvas.width;}
  if(direction === 1){x = -ctx.measureText(word).width;}
  wordsOnscreen.push(new WordGenerator(height, 'white', word, direction, x, speed));

  }
}

//Function to check if word is on screen
function checkWord(){
  let isolateWord = wordsOnscreen.map(item => item.word)
    if(isolateWord.includes(input.value)){
        wordsOnscreen.splice(isolateWord.indexOf(input.value), 1);
        input.value = '';
        score++;
    }
    document.getElementById('score').innerHTML = `Score: ${score}`
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
}

//Onscreen timer
function countdown(){
  if(frames % 60 === 0 && difficulty > 1){
    timer--;
    document.getElementById('timer').innerHTML = `Timer: ${timer}`;}
}

//Win Condition
function win(){
  if(score === +document.getElementById('kids-goal').value && difficulty === 1 || timer < 0){
    cancelAnimationFrame(animation);
    //togglescreen("game-screen", false);
    togglescreen("gameover-screen", true);
    canvas.style.filter = "blur(5px)";
  }
}

//lose condition
function lose(){
  if(difficulty > 1 && life < 1){
    cancelAnimationFrame(animation);
    togglescreen("gameover-screen", true);
  }
}


//Looping game function

function game(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(duckBG, 0, 0, canvas.width, canvas.height);
  moveWords();
  countdown();
  frames++
  checkWord();
  animation = requestAnimationFrame(game);
  loseLife();
  lose();
  win();
}


