const gameGrid = document.getElementsByClassName('game-grid')[0];

for (let i = 1; i <= 9; i++)
  gameGrid.innerHTML += `<div class="boxes box${i}"> <div class=""></div> </div>`;

let boxes = document.getElementsByClassName('boxes');
boxes = Array.from(boxes);
const restartGame = document.querySelector('.restart>button');
let gameOverOverlay = document.querySelector('.lineanimation');
let levelButton = document.querySelector('.level > select');
levelButton.addEventListener("change", restart);
levelButton.addEventListener("change", removeOverlay);
restartGame.addEventListener("click", restart);
restartGame.addEventListener("click", removeOverlay);
let winnerArray = [];

function restart() {
  rayAnimation();
  resetBoxesTransform();                //and adding opacity -5 to winnerCard and removing its class
  removeTransformOriginLine();
  boxes.forEach(item => item.firstElementChild.setAttribute('style', null));
  resetCrossCircle();
  addClickToBoxes();
  crossCard.addEventListener('click', playerSelect);
  circleCard.addEventListener('click', playerSelect);
  boxes.forEach(item => {
    item.addEventListener('click', userClick);
  });
  noOfBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  boxEvent = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  clickCount = 0;
  userSelect = Array.from(crossCard.classList).includes('shadow') ? "crossmark" : "circlemark";
  winnerArray = [];
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
    let zIndexOfOverlay = getComputedStyle(gameOverOverlay).getPropertyValue('z-index');
    if (clickCount <= 4 && zIndexOfOverlay === '-3')
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

function userTurn(user, element) {                     //when user selects the box then its removed
  let removeBox = Number(element.parentElement.classList[1].slice(-1));
  noOfBoxes.splice(noOfBoxes.indexOf(removeBox), 1);
  symbolAnimation(user, element);
  let winnerAns = getWinner(user);
  if (winnerAns) {
    taskOnWinning(user);
  }
  if (noOfBoxes.length === 0 && !winnerAns)
    winnerAnimation('draw');
}

function computerTurn(computer) {
  boxes.forEach(item => {                             //removing event when it's computer's turn
    item.removeEventListener('click', userClick);
  });
  setTimeout(() => {                                  //adding event after computer's turn
    boxes.forEach(item => {                           //but on remaining boxes only
      if (boxEvent.includes(Number(item.classList[1].slice(-1))))
        item.addEventListener('click', userClick);
    });
  }
    , 800);                                          //after 800ms user will be able to click b0xes
  let boxSelected = levelOfGame();
  setTimeout(() => {
    symbolAnimation(computer, boxSelected);
    if (getWinner(computer))
      taskOnWinning(computer);
  }, 400);
}




let closeToWin = [];
function getWinner(symbol, noOfBoxes = 3) {
  symbol = symbol === 'crossmark' ? 'cross' : 'circle';
  let compareBox;
  closeToWin = [];
  let calcArray = [];
  let rowLast = 3, colLast = 7;
  let count = 0, j = 1;
  for (let i = 1; i <= 3; i++) {
    count = 0;
    for (let k = j; k <= rowLast; k++) {
      compareBox = document.querySelector(`.box${k}`).firstElementChild.classList[0];
      calcArray.push(k);
      if (compareBox === symbol) {
        count++;
      }
      if (count === noOfBoxes) {
        closeToWin = [...calcArray];
        if (count === 3)
          winnerArray = [...calcArray];
        if (count === 2) {
          if (checkThirdBox())
            continue;
        }
        return true;
      }
    }
    calcArray.length = 0;
    j += 3;
    rowLast += 3;
  }
  calcArray.length = 0;
  j = 1; count = 0;
  for (let i = 1; i <= 3; i++) {
    count = 0;
    for (let k = j; k <= colLast; k = k + 3) {
      compareBox = document.querySelector(`.box${k}`).firstElementChild.classList[0];
      calcArray.push(k);
      if (compareBox === symbol) {
        count++;
      }
      if (count === noOfBoxes) {
        closeToWin = [...calcArray];
        if (count === 3)
          winnerArray = [...calcArray];
        if (count === 2) {
          if (checkThirdBox())
            continue;
        }
        return true;
      }
    }
    calcArray.length = 0;
    j++;
    colLast++;
  }
  calcArray.length = 0;
  count = 0;
  for (let i = 1; i <= 9; i = i + 4) {
    compareBox = document.querySelector(`.box${i}`).firstElementChild.classList[0];
    calcArray.push(i);
    if (compareBox === symbol) {
      count++;
    }
    if (count === noOfBoxes) {
      closeToWin = [...calcArray];
      if (count === 3)
        winnerArray = [...calcArray];
      if (count === 2) {
        if (checkThirdBox())
          continue;
      }
      return true;
    }
  }
  calcArray.length = 0;
  count = 0;
  for (let i = 3; i <= 7; i = i + 2) {
    compareBox = document.querySelector(`.box${i}`).firstElementChild.classList[0];
    calcArray.push(i);
    if (compareBox === symbol) {
      count++;
    }
    if (count === noOfBoxes) {
      closeToWin = [...calcArray];
      if (count === 3)
        winnerArray = [...calcArray];
      if (count === 2) {
        if (checkThirdBox())
          continue;
      }
      return true;
    }
  }
  calcArray.length = 0;
  return false;
}


function removeOverlay() {
  let zIndexOfOverlay = getComputedStyle(gameOverOverlay).getPropertyValue('z-index');
  if (zIndexOfOverlay === '3')
    gameOverOverlay.style.zIndex = '-3'
}

function rayAnimation(value = 0) {
  if (winnerArray[0] === 1) {
    if (winnerArray[1] === 2) {
      document.querySelector('.h-slash1').style.transform = `scalex(${value})`;
    }
    else if (winnerArray[1] === 4) {
      document.querySelector('.v-slash1').style.transform = `scaley(${value})`;
    }
    else if (winnerArray[1] === 5) {
      document.querySelector('.r-slash1').style.transform = `scalex(${value})`;
    }
  }
  else if (winnerArray[0] === 3) {
    if (winnerArray[1] === 6) {
      document.querySelector('.v-slash3').style.transform = `scaley(${value})`;
    }
    if (winnerArray[1] === 5) {
      document.querySelector('.r-slash3').style.transform = `scaley(${value})`;
    }
  }
  else if (winnerArray[0] === 4 || winnerArray[0] === 7)
    document.querySelector(`.h-slash${winnerArray[0]}`).style.transform = `scalex(${value})`;
  else if (winnerArray[0] === 2 || winnerArray[0] === 3)
    document.querySelector(`.v-slash${winnerArray[0]}`).style.transform = `scaley(${value})`;
}

function setColor(winner) {
  let color = winner === 'crossmark' ? '#545454' : '#f2ebd3';
  if (winnerArray[0] === 1) {
    if (winnerArray[1] === 2) {
      document.querySelector('.h-slash1').style.background = color;
    }
    else if (winnerArray[1] === 4) {
      document.querySelector('.v-slash1').style.background = color;
    }
    else if (winnerArray[1] === 5) {
      document.querySelector('.r-slash1').style.background = color;
    }
  }
  else if (winnerArray[0] === 3) {
    if (winnerArray[1] === 6) {
      document.querySelector('.v-slash3').style.background = color;
    }
    if (winnerArray[1] === 5) {
      document.querySelector('.r-slash3').style.background = color;
    }
  }
  else if (winnerArray[0] === 4 || winnerArray[0] === 7)
    document.querySelector(`.h-slash${winnerArray[0]}`).style.background = color;
  else if (winnerArray[0] === 2 || winnerArray[0] === 3)
    document.querySelector(`.v-slash${winnerArray[0]}`).style.background = color;
}


function moveAnimation() {
  let left, right, top, bottom, mid;
  left = document.querySelector(`.box${winnerArray[0]}`);
  mid = document.querySelector(`.box${winnerArray[1]}`)
  right = document.querySelector(`.box${winnerArray[2]}`);
  line = document.querySelector(`.h-slash${winnerArray[0]}`);
  if (winnerArray[0] === 1 && winnerArray[1] == 2) {
    left.style.transform = "translateX(107%) translateY(107%)";
    mid.style.transform = "translateY(107%)";
    right.style.transform = "translateX(-107%) translateY(107%)";
    line.style.transform = "scaleX(0) translateY(120px)"
  }
  else if (winnerArray[0] === 7 && winnerArray[1] == 8) {
    left.style.transform = "translateX(107%) translateY(-107%)";
    mid.style.transform = "translateY(-107%)";
    right.style.transform = "translateX(-107%) translateY(-107%)";
    line.style.transform = "scaleX(0) translateY(-120px)"
  }
  else if (winnerArray[0] === 1 && winnerArray[1] == 4) {
    line = document.querySelector(`.v-slash${winnerArray[0]}`);
    left.style.transform = "translateX(107%) translateY(107%)";
    mid.style.transform = "translateX(107%)";
    right.style.transform = "translateX(107%) translateY(-107%)";
    line.style.transform = "scaleY(0) translateX(120px)"
  }
  else if (winnerArray[0] === 3 && winnerArray[1] == 6) {
    line = document.querySelector(`.v-slash${winnerArray[0]}`);
    left.style.transform = "translateX(-107%) translateY(107%)";
    mid.style.transform = "translateX(-107%)";
    right.style.transform = "translateX(-107%) translateY(-107%)";
    line.style.transform = "scaleY(0) translateX(-120px)"
  }
  else if (winnerArray[0] === 4 && winnerArray[1] === 5) {
    left.style.transform = "translateX(107%)";
    right.style.transform = "translateX(-107%)";
    line.style.transform = "scaleX(0)"
  }
  else if (winnerArray[0] === 2 && winnerArray[1] === 5) {
    line = document.querySelector(`.v-slash${winnerArray[0]}`);
    left.style.transform = "translateY(107%)";
    right.style.transform = "translateY(-107%)";
    line.style.transform = "scaleY(0)"
  }
  else if (winnerArray[1] === 5 && winnerArray[0] === 1) {
    line = document.querySelector(`.r-slash${winnerArray[0]}`);
    left.style.transform = "translateY(107%)translateX(107%)";
    right.style.transform = "translateY(-107%)translateX(-107%)";
    line.style.transform = "scaleX(0)"
  }
  else if (winnerArray[1] === 5 && winnerArray[0] === 3) {
    left = document.querySelector(`.box${winnerArray[0]}`);
    right = document.querySelector(`.box${winnerArray[2]}`);
    line = document.querySelector(`.r-slash${winnerArray[0]}`);
    left.style.transform = "translateY(107%)translateX(-107%)";
    right.style.transform = "translateY(-107%)translateX(107%)";
    line.style.transform = "scaleY(0)"
  }
}

function resetBoxesTransform() {
  boxes.forEach(item => {
    item.style.transform = null;
  });
  let winnerCard = document.getElementsByClassName('winnerCard')[0];
  winnerCard.style.zIndex = '-5';         //arr.lenght=0 wiill not work in DOMTokenList
  winnerCard.firstElementChild.classList.remove('cross', 'circle');
  let message = document.getElementsByClassName('message')[0];
  let gameGrid = document.getElementsByClassName('game-grid')[0];
  gameGrid.style.transition = "null";
  message.style.transition = "null";
  winnerCard.style.transition = "null";
  winnerCard.style.transform = 'null';
  message.style.transform = 'null'
  winnerCard.style.opacity = '0';
  message.style.opacity = '0'
  gameGrid.style.opacity = '1';
  message.style.zIndex = '-5';
  winnerCard.style.zIndex = '-5';
  gameGrid.style.transform = 'scale(1)';
  winnerCard.style.transform = 'scale(1) translateY(0px)';
  message.style.transform = 'translateY(0px)';
  winnerCard.style.width = '110px';
  if (message.firstElementChild.textContent === 'DRAW!')
    winnerCard.removeChild(winnerCard.lastChild);
  message.firstElementChild.textContent = 'WINNER!';
}

function transformOriginLine() {
  let lines = document.getElementsByClassName('ray');
  lines = Array.from(lines);
  lines.forEach((item) => {
    item.style.transformOrigin = "center";
  })
}
function removeTransformOriginLine() {
  if (winnerArray.length !== 0) {
    let lines = document.getElementsByClassName('ray');
    lines = Array.from(lines);
    lines.forEach((item) => {
      item.style.setProperty('transform-origin', 'var(--dir)');
    })
  }
}




function taskOnWinning(winner) {     //winner can be either 'crossmark' or 'circle'
  console.log("winner Array is :-  ", winnerArray);
  let winnerClass = winner === 'crossmark' ? 'cross' : 'circle';
  console.log(winner, " is winner." + " class is ", winnerClass);
  setColor(winner);
  restartGame.removeEventListener("click", restart);
  gameOverOverlay.style.zIndex = '3';
  let winnerCard = document.getElementsByClassName('winnerCard')[0];
  let message = document.getElementsByClassName('message')[0];
  let gameGrid = document.getElementsByClassName('game-grid')[0];
  message.style.transition = '0.6s cubic-bezier(.17,.67,.4,1.07)';
  gameGrid.style.transition = "0.6s ease-in-out";
  winnerCard.style.transition = "0.8s ease-in-out";
  message.style.zIndex = '5';
  setTimeout(() => {
    rayAnimation(1);
  }, 500);
  setTimeout(() => {
    transformOriginLine();
  }, 700);
  setTimeout(() => {
    winnerCard.firstElementChild.classList.toggle(winnerClass);
    moveAnimation();
    winnerCard.style.zIndex = '5';
    winnerCard.style.opacity = '1';
    setTimeout(() => {
      winnerAnimation('win');
    }
      , 225);
  }
    , 900)
}


function winnerAnimation(gameStatus) {
  restartGame.removeEventListener("click", restart);
  let winnerCard = document.getElementsByClassName('winnerCard')[0];
  let message = document.getElementsByClassName('message')[0];
  let gameGrid = document.getElementsByClassName('game-grid')[0];
  if (gameStatus === 'draw')
    draw();
  setTimeout(() => {
    gameGrid.style.transform = 'scale(0.5)';
    if (gameStatus === 'draw')
      winnerCard.style.transform = 'scale(1.5) translateY(0px)';
    else
      winnerCard.style.transform = 'scale(2.5) translateY(-10px)';
    setTimeout(() => {
      message.style.transform = 'translateY(-50px)'
      message.style.opacity = '1';
      restartGame.addEventListener("click", restart);
    }
      , 400);
    gameGrid.style.opacity = '0';
  }
    , 300);

}
function draw() {
  let winnerCard = document.getElementsByClassName('winnerCard')[0];
  let message = document.getElementsByClassName('message')[0];
  let gameGrid = document.getElementsByClassName('game-grid')[0];
  winnerCard.firstElementChild.classList.toggle('cross');
  winnerCard.style.width = '200px';
  let child = document.createElement('div');
  child.classList.add('circle');
  winnerCard.appendChild(child);
  winnerCard.style.transform = 'scale(0.5)';
  message.style.zIndex = '5';
  winnerCard.style.zIndex = '5';
  winnerCard.style.opacity = '1';
  message.firstElementChild.textContent = 'DRAW!';
  message.style.transition = '0.6s cubic-bezier(.17,.67,.4,1.07)';
  gameGrid.style.transition = "0.6s ease-in-out";
  winnerCard.style.transition = "0.8s ease-in-out";
}

let selectOneBox;
function levelOfGame() {
  if (levelButton.value === 'easy')
    return randomBoxSelection();
  else if (levelButton.value === 'medium') {
    if (getWinner(computer, 2)) {
      let boxSelected = document.querySelector(`.box${selectOneBox}`).firstElementChild;
      boxEvent.splice(boxEvent.indexOf(selectOneBox), 1);
      noOfBoxes.splice(noOfBoxes.indexOf(selectOneBox), 1);
      return boxSelected;
    }
    else if (getWinner(user, 2)) {
      let boxSelected = document.querySelector(`.box${selectOneBox}`).firstElementChild;
      boxEvent.splice(boxEvent.indexOf(selectOneBox), 1);
      noOfBoxes.splice(noOfBoxes.indexOf(selectOneBox), 1);
      return boxSelected;
    }
    else
      return randomBoxSelection();
  }
}

function randomBoxSelection() {
  let randomChoice;
  randomChoice = Math.floor(Math.random() * noOfBoxes.length);
  let boxSelected = document.querySelector(`.box${noOfBoxes[randomChoice]}`).firstElementChild;
  boxEvent.splice(boxEvent.indexOf(noOfBoxes[randomChoice]), 1);
  noOfBoxes.splice(randomChoice, 1);
  return boxSelected;
}

function checkThirdBox() {
  if (closeToWin.length === 2) {
    let thirdBox = document.querySelector(`.box${closeToWin[1] + closeToWin[1] - closeToWin[0]}`).firstElementChild;
    if (thirdBox.classList.length !== 0)
      return true;
    else
      selectOneBox = closeToWin[1] + closeToWin[1] - closeToWin[0];
  }
  else {
    let firstCheck, secondCheck;
    let firstBox = document.querySelector(`.box${closeToWin[0]}`).firstElementChild;
    let secondBox = document.querySelector(`.box${closeToWin[1]}`).firstElementChild;
    if (firstBox.classList.length !== 0) {
      firstCheck = true;
      selectOneBox = closeToWin[1];
    }
    if (secondBox.classList.length !== 0) {
      secondCheck = true;
      selectOneBox = closeToWin[0];
    }
    return firstCheck && secondCheck;
  }
}