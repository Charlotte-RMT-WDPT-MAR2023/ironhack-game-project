//prepare constants
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const duckBG = new Image();
duckBG.src = './images/Ducks.jpg';
let score = 0;
const input = document.getElementById('typeHere');

//Add event listener to the button
window.onload = () => {
    document.getElementById('btn-kids').onclick = () => {
    document.getElementById('btn-kids').style.visibility = 'hidden';
    input.addEventListener('input', checkWord);
    kidsGame();
    };
  };



//Add event listener to the Input
//Add functions to start game
function kidsGame(){
    ctx.drawImage(duckBG, 0, 0, canvas.width, canvas.height);
}

function checkWord(event){
    if(input.value === 'test'){
        input.value = '';
        score++;
    }
}
//Background to canvas
//Base Game