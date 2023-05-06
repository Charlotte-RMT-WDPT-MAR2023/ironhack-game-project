//settings

const btnOpenModal = document.getElementById("btn-settings");
const modal = document.getElementById("settings-modal");
const btnSave = document.getElementById("btn-save");

btnOpenModal.onclick = function () {
  modal.style.display = "block";
};

btnSave.onclick = function () {
  modal.style.display = "none";
  const difficulty = "kids";
  const goal = 4;
  const musicState = true;

  if (document.getElementById("btn-kid").classList.contains("selected")) {
    difficulty = "kids";
  } else if (
    document.getElementById("btn-easy").classList.contains("selected")
  ) {
    difficulty = "easy";
  } else if (
    document.getElementById("btn-med").classList.contains("selected")
  ) {
    difficulty = "medium";
  } else if (
    document.getElementById("btn-hard").classList.contains("selected")
  ) {
    difficulty = "hard";
  } else if (
    document.getElementById("btn-german").classList.contains("selected")
  ) {
    difficulty = "german";
  }

  goal = parseInt(document.getElementById("kids-goal").value);

  musicState = document.getElementById("music-toggle").checked;
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
});

btnMusicOff.addEventListener("click", () => {
  btnMusicOff.classList.add("selected");
  btnMusicOn.classList.remove("selected");
});

btnKid.addEventListener("click", () => {
  btnKid.classList.add("selected");
});

btnEasy.addEventListener("click", () => {
  btnEasy.classList.add("selected");
});

btnMed.addEventListener("click", () => {
  btnMed.classList.add("selected");
});

btnHard.addEventListener("click", () => {
  btnHard.classList.add("selected");
});

btnHard.addEventListener("click", () => {
  btnEasy.classList.add("selected");
});
