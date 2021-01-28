const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const scoreNode = document.getElementById("score");

let isJumping = false;
let dinoPosition = 0;
let score = 0;

scoreNode.innerHTML = score;

const handleKeyUp = (e) => {
  if (e.code === "Space" && !isJumping) {
    jump();
  }
};

const jump = () => {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (dinoPosition >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (dinoPosition <= 0) {
          clearInterval(downInterval);
          isJumping = false;
          score++;
          scoreNode.innerHTML = score;
        } else {
          dinoPosition -= 20;
          dino.style.bottom = dinoPosition + "px";
        }
      }, 20);
    } else {
      // Subindo
      dinoPosition += 20;
      dino.style.bottom = dinoPosition + "px";
    }
  }, 20);
};

const generateCactus = () => {
  const cactus = document.createElement("div");
  let cactusPosition = 1100;
  let randomTime = Math.random() * 6000;

  cactus.classList.add("cactus");
  cactus.style.left = "1100px";
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition <= -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && dinoPosition < 60) {
      clearInterval(leftInterval);
      let finalScore = score;
      document.body.innerHTML = `<h1 id='game-over'>Fim do jogo</h1>
        <h2 id='final-score'>Pontuação final: ${finalScore}</h2>
        <div class=button-holder><button onclick='reload()'>Reiniciar</button></div>`;
    } else {
      cactusPosition -= 10;
      cactus.style.left = `${cactusPosition}px`;
    }
  }, 20);

  setTimeout(generateCactus, randomTime);
};

generateCactus();
document.addEventListener("keyup", (e) => {
  handleKeyUp(e);
});

function reload() {
  window.location.reload();
}
