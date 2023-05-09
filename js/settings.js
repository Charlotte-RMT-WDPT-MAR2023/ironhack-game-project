//settings
const btnOpenModal = document.getElementById("btn-settings");
const modal = document.getElementById("settings-modal");
const btnSave = document.getElementById("btn-save");

btnOpenModal.onclick = function () {
  modal.style.display = "block";
};

//basically just a close button
btnSave.onclick = function () {
  modal.style.display = "none";
};

const btnMusicOn = document.getElementById("btn-music-on");
const btnMusicOff = document.getElementById("btn-music-off");
const btnKid = document.getElementById("btn-kid");
const btnEasy = document.getElementById("btn-easy");
const btnMed = document.getElementById("btn-med");
const btnHard = document.getElementById("btn-hard");
const btnGerman = document.getElementById("btn-german");

btnMusicOn.addEventListener("click", () => {
  btnMusicOn.classList.add("selected");
  btnMusicOff.classList.remove("selected");
  music.volume = 0.1;
});

btnMusicOff.addEventListener("click", () => {
  btnMusicOff.classList.add("selected");
  btnMusicOn.classList.remove("selected");
  music.volume = 0;
});

btnKid.addEventListener("click", () => {
  btnKid.classList.add("selected");
  btnEasy.classList.remove("selected");
  btnMed.classList.remove("selected");
  btnHard.classList.remove("selected");
  btnGerman.classList.remove("selected");
});

btnEasy.addEventListener("click", () => {
  btnEasy.classList.add("selected");
  btnKid.classList.remove("selected");
  btnMed.classList.remove("selected");
  btnHard.classList.remove("selected");
  btnGerman.classList.remove("selected");
});

btnMed.addEventListener("click", () => {
  btnMed.classList.add("selected");
  btnKid.classList.remove("selected");
  btnEasy.classList.remove("selected");
  btnHard.classList.remove("selected");
  btnGerman.classList.remove("selected");
});

btnHard.addEventListener("click", () => {
  btnHard.classList.add("selected");
  btnKid.classList.remove("selected");
  btnEasy.classList.remove("selected");
  btnMed.classList.remove("selected");
  btnGerman.classList.remove("selected");
});

btnGerman.addEventListener("click", () => {
  btnGerman.classList.add("selected");
  btnKid.classList.remove("selected");
  btnEasy.classList.remove("selected");
  btnMed.classList.remove("selected");
  btnHard.classList.remove("selected");
});
