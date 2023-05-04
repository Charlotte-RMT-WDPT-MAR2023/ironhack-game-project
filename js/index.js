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

//Add event listener to the button
window.onload = () => {
    document.getElementById('btn-kids').onclick = () => {
    document.getElementById('btn-kids').style.visibility = 'hidden';
    input.addEventListener('input', checkWord);
    kidsGame();
    difficulty = 1;
    };
  };

//Create Class for the Word Generator
class WordGenerator{
  constructor(height, color, word){
    this.height = height;
    this.color = color;
    this.word = word;
    this.x = canvas.width
  }

  update() {
    ctx.font = '36px serif';
    ctx.fillStyle = this.color;
    ctx.fillText(this.word.toUpperCase(), this.x, this.height);
  }

}

function moveWords(){
  for (i = 0; i < wordsOnscreen.length; i++) {
    wordsOnscreen[i].x += -1;
    wordsOnscreen[i].update();
    
  }
  //every 2.4 secs
  if(frames % 120 === 0){
  let height = Math.floor(Math.random() * (canvas.height-50));
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let color = `rgb(${red},${green},${blue})`;
  let iWord = Math.floor(Math.random() * wordsKids.length)
  let word = wordsKids[iWord];
  wordsOnscreen.push(new WordGenerator(height, color, word));
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
    if(input.value === 'test'){
        input.value = '';
        score++;
        document.getElementById('annex').innerHTML = `Score: ${score}`
    }
}
