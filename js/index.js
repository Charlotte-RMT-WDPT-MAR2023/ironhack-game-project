//prepare constants
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const duckBG = new Image();
duckBG.src = './images/Ducks.jpg';
let frames = 0;
let score = 0;
let difficulty = 0;
const input = document.getElementById('typeHere');
const wordsOnscreen = [];
let wordsArray = [];

//Add event listener to the button
window.onload = () => {
    document.getElementById('btn-kids').onclick = () => {
      document.getElementById('btn-kids').style.visibility = 'hidden';
      input.addEventListener('input', checkWord);
      difficulty = 1;
      wordsArray = wordsThree.concat(wordsFour);
      kidsGame();
      };
  };

//Create Class for the Word Generator
class WordGenerator{
  constructor(height, color, word, direction, x){
    this.height = height;
    this.color = color;
    this.word = word.toLowerCase();
    this.x = x;
    this.direction = direction
  }

  update() {
    ctx.font = 'bold 36px sans-serif';
    ctx.fillStyle = this.color;
    ctx.fillText(this.word, this.x, this.height);
  }

}

function moveWords(){
  for (i = 0; i < wordsOnscreen.length; i++) {
    if(wordsOnscreen[i].direction === 0){wordsOnscreen[i].x += -1;}
    if(wordsOnscreen[i].direction === 1){wordsOnscreen[i].x += 1;}
    wordsOnscreen[i].update();
  }
  //every 2.4 secs
  if(frames % 120 === 0){
  let height = 50 + Math.floor(Math.random() * (canvas.height-50));
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let color = `rgb(${red},${green},${blue})`;
  let iWord = Math.floor(Math.random() * wordsArray.length);
  let direction = Math.floor(Math.random() * 2);
  let word = wordsArray[iWord];
  let x;
  if(direction === 0){x = canvas.width;}
  if(direction === 1){x = -word.length*30;}
  wordsOnscreen.push(new WordGenerator(height, color, word, direction, x));
  }

}


//Word Generator
// const makeWord = {
//     y: Math.floor(Math.random() * 300)+ 50,
//     x: canvas.width,
//     speed: -1,
//     i: Math.floor(Math.random() * (wordsKids.length -1)),
    
//     move: function() {
//       this.x += this.speed;
//     },
//     draw: function() {
//         ctx.font = '36px serif';
//         ctx.fillStyle = 'white';
//         ctx.fillText(wordsKids[this.i].toUpperCase(), this.x, this.y);
//     },
//   }
// function generateWord(){
//   if(frames % 60 === 0){
//       wordsOnscreen.unshift(makeWord);
//       wordsOnscreen[0].y = Math.floor(Math.random() * 300)+ 50,
//       wordsOnscreen[0].x = canvas.width;
//       wordsOnscreen[0].i = Math.floor(Math.random() * wordsKids.length -1);
//   }
//     }



//Add event listener to the Input
//Add functions to start game
function kidsGame(){

    // generateWord();
    frames++
    
    // for(i=0;i<wordsOnscreen.length;i++){
    //     wordsOnscreen[i].move();
    // }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(duckBG, 0, 0, canvas.width, canvas.height);
    moveWords();
    // for(i=0;i<wordsOnscreen.length;i++){
    //     wordsOnscreen[0].draw();
    // }
    checkWord();
    let animation = requestAnimationFrame(kidsGame);
    if(score === 4){
      cancelAnimationFrame(animation);
    alert('Program Working So far');}
}




//Function to check if word is on screen
function checkWord(){
  let isolateWord = wordsOnscreen.map(item => item.word)
    if(isolateWord.includes(input.value)){
        wordsOnscreen.splice(isolateWord.indexOf(input.value), 1);
        input.value = '';
        score++;
        document.getElementById('annex').innerHTML = `Score: ${score}`
    }
}
