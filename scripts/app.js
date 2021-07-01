const gameGrid = document.getElementsByClassName('game-grid')[0];

for (let i = 1; i <= 9; i++)
  gameGrid.innerHTML += `<div class="boxes box${i}"></div>`


const restartGame = document.querySelector('.restart>button');

restartGame.addEventListener("click", restart);

function restart() {
  lineAnimation();
}
lineAnimation();
function lineAnimation() {
  let h_Line = document.getElementsByClassName('h-line');
  let v_Line = document.getElementsByClassName('v-line');
  h_Line = Array.from(h_Line);
  v_Line = Array.from(v_Line);
  h_Line.forEach(item => {
    item.style.transition = " 0s";
    item.style.transform = "scalex(0)"
  });
  v_Line.forEach(item => {
    item.style.transition = " 0s";
    item.style.transform = "scaley(0)"
  });
  setTimeout(() => {
    h_Line.forEach(item => {
      item.style.transition = "0.4s ease-in-out"
      item.style.transform = "scalex(1)";
    });
    v_Line.forEach(item => {
      item.style.transition = "0.4s ease-in-out"
      item.style.transform = "scaley(1)";
    });
  }, 0);
}

let circleCard = document.getElementsByClassName('circle')[0];
let crossCard = document.getElementsByClassName('cross')[0];

crossCard.addEventListener('click', playerSelect);
circleCard.addEventListener('click', playerSelect);

let userSelect;

function playerSelect() {
  let classlist = Array.from(this.classList);
  console.log(classlist);
  if (!classlist.includes('shadow')) {
    this.classList.toggle('shadow');
    let arr = ['circle', 'cross'];
    userSelect = this.classList[0];
    arr.splice(arr.indexOf(this.classList[0]), 1);
    arr[0] === 'cross' ? crossCard.classList.toggle('shadow') : circleCard.classList.toggle('shadow');
  }
}

let boxes = document.getElementsByClassName('boxes');
boxes = Array.from(boxes);

boxes.forEach(item => {
  item.addEventListener('click', userClick);
});

function userClick() {
  crossCard.removeEventListener('click', playerSelect);
  circleCard.removeEventListener('click', playerSelect);
  console.log(userSelect);
  console.log("hello");

}