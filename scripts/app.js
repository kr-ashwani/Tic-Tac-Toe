const gameGrid = document.getElementsByClassName('game-grid')[0];

for (let i = 1; i <= 9; i++)
  gameGrid.innerHTML += `<div class="boxes box${i}"> <div class=""></div> </div>`;

let boxes = document.getElementsByClassName('boxes');
boxes = Array.from(boxes);
const restartGame = document.querySelector('.restart>button');

restartGame.addEventListener("click", restart);
let pop_up = document.getElementById('pop');
// pop_up.classList.toggle('pop-up');

function restart() {
  boxes.forEach(item => item.firstElementChild.setAttribute('style', null));
  lineAnimation();
  resetCrossCircle();
  addClickToBoxes();
  crossCard.addEventListener('click', playerSelect);
  circleCard.addEventListener('click', playerSelect);
  boxes.forEach(item => {
    item.addEventListener('click', userClick);
  });
  noOfBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  boxEvent = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  clickWork = false;
  clickCount = 0;
  userSelect = "crossmark";
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


let circleCard = document.getElementsByClassName('circlemark')[0];
let crossCard = document.getElementsByClassName('crossmark')[0];

crossCard.addEventListener('click', playerSelect);
circleCard.addEventListener('click', playerSelect);

let userSelect = "crossmark";

function playerSelect() {
  let classlist = Array.from(this.classList);
  if (!classlist.includes('shadow')) {
    this.classList.toggle('shadow');
    let arr = ['circlemark', 'crossmark'];
    userSelect = this.classList[0];
    arr.splice(arr.indexOf(this.classList[0]), 1);
    arr[0] === 'crossmark' ? crossCard.classList.toggle('shadow') : circleCard.classList.toggle('shadow');
  }
}



boxes.forEach(item => {
  item.addEventListener('click', userClick);
});

let clickCount = 0;
let userSelectBox;
let user;
let computer;
let boxEvent = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function userClick() {
  clickCount++;
  if (clickCount === 1) {
    clickWork = true;
    crossCard.removeEventListener('click', playerSelect);
    circleCard.removeEventListener('click', playerSelect);
    user = userSelect;
    computer = user === 'circlemark' ? 'crossmark' : 'circlemark';
  }
  if (clickCount <= 5) {
    let removeListener = Number(this.classList[1].slice(-1));
    boxEvent.splice(boxEvent.indexOf(removeListener), 1);
    this.removeEventListener('click', userClick);
    userSelectBox = this.classList[1];
    userTurn(user, this.firstElementChild);
    if (clickCount === 1)
      clickWork = false;
    if (clickCount <= 4 && (typeof pop_up.classList[0] === 'undefined'))
      computerTurn(computer);
  }
}

function symbolAnimation(symbol, element) {
  if (symbol === "crossmark") {
    element.classList.toggle('cross');
    element.style.setProperty('--crossScale', '0')
    setTimeout(() => {
      element.style.setProperty('--crossScale', '1')
    }, 0);
  }
  else if (symbol === "circlemark") {
    element.classList.toggle('circle');
    element.style.transform = "scale(0)"
    setTimeout(() => {
      element.style.transition = "0.3s ease-in-out";
      element.style.transform = "scale(1)";
    }, 0);
  }
}

function resetCrossCircle() {
  boxes.forEach(item => {
    item.firstElementChild.classList = "";
  });
}
function addClickToBoxes() {
  boxes.forEach(item => {
    item.addEventListener('click', userClick);
  });
}


let noOfBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function userTurn(user, element) {
  let removeBox = Number(element.parentElement.classList[1].slice(-1));
  noOfBoxes.splice(noOfBoxes.indexOf(removeBox), 1);
  symbolAnimation(user, element);
  if (getWinner(user)) {
    console.log(user, " is winner");
    pop_up.classList.toggle('pop-up');
  }
}

function computerTurn(computer) {
  boxes.forEach(item => {
    item.removeEventListener('click', userClick);
  });
  let randomChoice;
  randomChoice = Math.floor(Math.random() * noOfBoxes.length);
  let boxSelected = document.querySelector(`.box${noOfBoxes[randomChoice]}`).firstElementChild;
  boxEvent.splice(boxEvent.indexOf(noOfBoxes[randomChoice]), 1);
  noOfBoxes.splice(randomChoice, 1);
  setTimeout(() => {
    symbolAnimation(computer, boxSelected);
    if (getWinner(computer)) {
      console.log(computer, " is winner");
      pop_up.classList.toggle('pop-up');
    }
  }, 400);
  setTimeout(() => {
    boxes.forEach(item => {
      if (boxEvent.includes(Number(item.classList[1].slice(-1))))
        item.addEventListener('click', userClick);
    });
  }
    , 800)
}





function getWinner(symbol) {
  symbol = symbol === 'crossmark' ? 'cross' : 'circle';
  let compareBox;
  let rowLast = 3, colLast = 7;
  let count = 0, j = 1;
  for (let i = 1; i <= 3; i++) {
    count = 0;
    for (let k = j; k <= rowLast; k++) {
      compareBox = document.querySelector(`.box${k}`).firstElementChild.classList[0];
      if (compareBox === symbol) {
        count++;
      }
      if (count === 3)
        return true;
    }
    j += 3;
    rowLast += 3;
  }
  j = 1; count = 0;
  for (let i = 1; i <= 3; i++) {
    count = 0;
    for (let k = j; k <= colLast; k = k + 3) {
      compareBox = document.querySelector(`.box${k}`).firstElementChild.classList[0];
      if (compareBox === symbol)
        count++;
      if (count === 3)
        return true;
    }
    j++;
    colLast++;
  }
  count = 0;
  for (let i = 1; i <= 9; i = i + 4) {
    compareBox = document.querySelector(`.box${i}`).firstElementChild.classList[0];
    if (compareBox === symbol)
      count++;
    if (count === 3)
      return true;
  }
  count = 0;
  for (let i = 3; i <= 7; i = i + 2) {
    compareBox = document.querySelector(`.box${i}`).firstElementChild.classList[0];
    if (compareBox === symbol)
      count++;
    if (count === 3)
      return true;
  }
  return false;
}




restartGame.addEventListener("click", checkPopUp);

function checkPopUp() {
  console.log(pop_up.classList[0]);
  if (pop_up.classList[0] === 'pop-up')
    pop_up.classList.toggle('pop-up')
}