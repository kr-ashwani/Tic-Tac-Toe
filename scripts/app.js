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
let gameInformation = document.getElementsByClassName('information')[0].firstElementChild;
let crossScore = 0, circleScore = 0;
let displayCrossScore = document.getElementsByClassName('crossmark')[0].lastElementChild;
let displayCircleScore = document.getElementsByClassName('circlemark')[0].lastElementChild;


function restart() {
  lineAnimation();
  resetGameInformation();
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
  resetPlayerSelect();
  winnerArray = [];
}
function resetGameInformation() {
  if (userSelect === 'crossmark')
    gameInformation.textContent = "You opted for X";
  else
    gameInformation.textContent = "You opted for O";
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

function resetPlayerSelect() {
  let arr = ['circlemark', 'crossmark'];
  let compSelect = arr.filter((item) => userSelect !== item);
  compSelect = document.getElementsByClassName(`${compSelect}`)[0];
  let check = document.getElementsByClassName(`${userSelect}`)[0];
  if (!Array.from(check.classList).includes('shadow'))
    check.classList.toggle('shadow');
  if (Array.from(compSelect.classList).includes('shadow'))
    compSelect.classList.toggle('shadow');
}


let circleCard = document.getElementsByClassName('circlemark')[0];
let crossCard = document.getElementsByClassName('crossmark')[0];

crossCard.addEventListener('click', playerSelect);
circleCard.addEventListener('click', playerSelect);

let clickCount = 0;
let userSelect = "crossmark";

function playerSelect() {
  let userClassList = Array.from(this.classList);
  if (clickCount === 0) {
    if (!userClassList.includes('shadow')) {
      this.classList.toggle('shadow');
      let arr = ['circlemark', 'crossmark'];
      userSelect = this.classList[0];
      arr.splice(arr.indexOf(this.classList[0]), 1);
      arr[0] === 'crossmark' ? crossCard.classList.toggle('shadow') : circleCard.classList.toggle('shadow');
      if (displayCrossScore.textContent !== '-' || displayCircleScore.textContent !== '-') {
        displayCrossScore.textContent = '-';
        displayCircleScore.textContent = '-';
        displayCrossScore.style.marginTop = '-5px';
        displayCrossScore.style.fontSize = '2.3rem';
        displayCrossScore.style.fontWeight = '500';
        displayCircleScore.style.marginTop = '-5px';
        displayCircleScore.style.fontSize = '2.3rem';
        displayCircleScore.style.fontWeight = '500';
        crossScore = 0; circleScore = 0;
      }
    }
    if (userSelect === 'crossmark')
      gameInformation.textContent = "You opted for X";
    else
      gameInformation.textContent = "You opted for O";
  }
  else
    this.classList.toggle('shadow');

}



boxes.forEach(item => {
  item.addEventListener('click', userClick);
});

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

function userTurn(user, element) {
  if (user === 'crossmark' && winnerArray.length !== 3) {
    setTimeout(() => gameInformation.textContent = "O's Turn", 200);
  }
  else if (user !== 'crossmark' && winnerArray.length !== 3) {
    setTimeout(() => gameInformation.textContent = "X's Turn", 200);
  }
  if (clickCount < 5) {
    playerSelect.call(crossCard, user);     //when user selects the box then its removed
  }
  let removeBox = Number(element.parentElement.classList[1].slice(-1));
  noOfBoxes.splice(noOfBoxes.indexOf(removeBox), 1);
  symbolAnimation(user, element);
  let winnerAns = getWinner(user);
  if (winnerAns) {                //when user selects the box then its removed
    taskOnWinning(user);
  }
  if (noOfBoxes.length === 0 && !winnerAns)
    winnerAnimation('draw');
}

function computerTurn(computer) {
  if (computer === 'crossmark' && winnerArray.length !== 3) {
    setTimeout(() => gameInformation.textContent = "O's Turn", 850);
  }
  else if (computer !== 'crossmark' && winnerArray.length !== 3) {
    setTimeout(() => gameInformation.textContent = "X's Turn", 850);
  }
  playerSelect.call(circleCard, computer);            //for enabling shadow on computer's scorecard
  boxes.forEach(item => {                             //removing event when it's computer's turn
    item.removeEventListener('click', userClick);
  });
  setTimeout(() => {                                  //adding event after computer's turn
    boxes.forEach(item => {                           //but on remaining boxes only
      if (boxEvent.includes(Number(item.classList[1].slice(-1))))    //after 800ms user will be able to click b0xes
        item.addEventListener('click', userClick);    //when user selects the box then its removed
    });
    playerSelect.call(circleCard, computer);              //for disabling shadow on computer's scorecard
    playerSelect.call(crossCard, user);                   //for enabling shadow on user's scorecard
  }
    , 800);
  let boxSelected = levelOfGame();
  setTimeout(() => {
    symbolAnimation(computer, boxSelected);
    if (getWinner(computer))
      taskOnWinning(computer);
  }, 400);
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
  let crossCard = document.querySelector('.winnerCard').firstElementChild;
  let circleCard = document.querySelector('.winnerCard').lastElementChild;
  crossCard.style.left = "0px";
  circleCard.style.right = "0px";
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
  winnerCard.style.transform = 'scale(1) translateY(0px)translateX(0px)';
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
  scoreUpatde(winner);
  restartGame.removeEventListener("click", restart);
  gameOverOverlay.style.zIndex = '3';
  let winnerCard = document.getElementsByClassName('winnerCard')[0];
  let message = document.getElementsByClassName('message')[0];
  let gameGrid = document.getElementsByClassName('game-grid')[0];
  message.style.transition = '0.6s cubic-bezier(.17,.67,.4,1.07)';
  gameGrid.style.transition = "0.6s ease-in-out";
  winnerCard.style.transition = "0.8s ease-in-out";
  message.style.zIndex = '5';
  if (winnerClass === 'cross')
    setTimeout(() => gameInformation.textContent = "X is winner", 500);
  else
    setTimeout(() => gameInformation.textContent = "O is winner", 500);
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
      winnerCard.style.transform = 'scale(2) translateY(0px)translateX(12px)';
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
  setTimeout(() => gameInformation.textContent = "DRAW!", 200);
  let winnerCard = document.getElementsByClassName('winnerCard')[0];
  let crossCard = document.querySelector('.winnerCard').firstElementChild;
  let message = document.getElementsByClassName('message')[0];
  let gameGrid = document.getElementsByClassName('game-grid')[0];
  winnerCard.firstElementChild.classList.toggle('cross');
  let child = document.createElement('div');
  child.classList.add('circle');
  winnerCard.appendChild(child);
  let circleCard = document.querySelector('.winnerCard').lastElementChild;
  circleCard.style.right = '25px';
  winnerCard.style.width = '200px';
  winnerCard.style.transform = 'scale(0.5)';
  message.style.zIndex = '5';
  winnerCard.style.zIndex = '5';
  winnerCard.style.opacity = '1';
  message.firstElementChild.textContent = 'DRAW!';
  message.style.transition = '0.6s cubic-bezier(.17,.67,.4,1.07)';
  gameGrid.style.transition = "0.6s ease-in-out";
  winnerCard.style.transition = "0.8s ease-in-out";
}

let share = document.getElementsByClassName('fa-share-alt')[0];

share.addEventListener("click", shareAnimation);
let remember = 1;
function shareAnimation() {
  let shareBox = document.getElementsByClassName('share-box')[0];
  if (remember === 1) {
    shareBox.style.zIndex = '2';
    shareBox.style.opacity = '1 ';
    shareBox.style.pointerEvents = 'all';
    shareBox.style.transform = 'translateY(60px)'; remember++;
  }
  else if (remember === 2) {
    shareBox.style.zIndex = '-1';
    shareBox.style.opacity = '0';
    shareBox.style.pointerEvents = 'none';
    shareBox.style.transform = 'translateY(30px)'; remember--;
  }
}


function scoreUpatde(symbol) {
  if (symbol === 'crossmark') {
    if (displayCrossScore.textContent === '-') {
      displayCrossScore.style.marginTop = '0px';
      displayCrossScore.style.fontSize = '1.3rem';
      displayCrossScore.style.fontWeight = '600';
    }
    displayCrossScore.textContent = ++crossScore;
  }
  else {
    if (displayCircleScore.textContent === '-') {
      displayCircleScore.style.marginTop = '0px';
      displayCircleScore.style.fontSize = '1.3rem';
      displayCircleScore.style.fontWeight = '600';
    }
    displayCircleScore.textContent = ++circleScore;
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

let closeToWin = [];
function getWinner(initialSymbol, noOfBoxes = 3) {
  symbol = initialSymbol === 'crossmark' ? 'cross' : 'circle';
  notsymbol = initialSymbol === 'crossmark' ? 'circle' : 'cross';
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
      if (compareBox === symbol)
        count++;
      else if (compareBox === notsymbol) {
        count = 0; break;
      }
    }
    if (count === noOfBoxes && calcArray.length === 3)
      break;
    calcArray.length = 0;
    j += 3;
    rowLast += 3;
  }
  if (count === noOfBoxes) {
    closeToWin = [...calcArray];
    if (count === 3)
      winnerArray = [...calcArray];
    return true;
  }
  calcArray.length = 0;
  j = 1; count = 0;
  for (let i = 1; i <= 3; i++) {
    count = 0;
    for (let k = j; k <= colLast; k = k + 3) {
      compareBox = document.querySelector(`.box${k}`).firstElementChild.classList[0];
      calcArray.push(k);
      if (compareBox === symbol)
        count++;
      else if (compareBox === notsymbol) {
        count = 0; break;
      }
    }
    if (count === noOfBoxes && calcArray.length === 3)
      break;
    calcArray.length = 0;
    j++;
    colLast++;
  }
  if (count === noOfBoxes) {
    closeToWin = [...calcArray];
    if (count === 3)
      winnerArray = [...calcArray];
    return true;
  }
  calcArray.length = 0;
  count = 0;
  for (let i = 1; i <= 9; i = i + 4) {
    compareBox = document.querySelector(`.box${i}`).firstElementChild.classList[0];
    calcArray.push(i);
    if (compareBox === symbol)
      count++;
    else if (compareBox === notsymbol) {
      count = 0; break;
    }
  }
  if (count === noOfBoxes) {
    closeToWin = [...calcArray];
    if (count === 3)
      winnerArray = [...calcArray];
    return true;
  }
  calcArray.length = 0;
  count = 0;
  for (let i = 3; i <= 7; i = i + 2) {
    compareBox = document.querySelector(`.box${i}`).firstElementChild.classList[0];
    calcArray.push(i);
    if (compareBox === symbol)
      count++;
    else if (compareBox === notsymbol) {
      count = 0; break;
    }
  }
  if (count === noOfBoxes) {
    closeToWin = [...calcArray];
    if (count === 3)
      winnerArray = [...calcArray];
    return true;
  }
  calcArray.length = 0;
  return false;
}

function levelOfGame() {
  if (levelButton.value === 'easy')
    return randomBoxSelection();
  else if (levelButton.value === 'medium') {
    if (getWinner(computer, 2)) {
      return getOneBox();
    }
    else if (getWinner(user, 2)) {
      return getOneBox();
    }
    else
      return randomBoxSelection();
  }
  else if (levelButton.value === 'impossible') {
    return impossibleLevel();
  }
}

function getOneBox() {
  for (let value of closeToWin) {
    if (document.querySelector(`.box${value}`).firstElementChild.classList.length === 0) {
      boxEvent.splice(boxEvent.indexOf(value), 1);
      noOfBoxes.splice(noOfBoxes.indexOf(value), 1);
      return document.querySelector(`.box${value}`).firstElementChild
    }
  }
}

function impossibleLevel() {
  if (clickCount === 1) {
    getWinner(user, 1);
    let index;
    let randomArr = [1, 3, 7, 9];
    let randomNo = Math.floor(Math.random() * 4);
    for (let value of closeToWin)
      if (document.querySelector(`.box${value}`).firstElementChild.classList.length !== 0)
        index = value;
    if (index === 1 || index === 3 || index === 7 || index === 9) {
      boxEvent.splice(boxEvent.indexOf(5), 1);
      noOfBoxes.splice(noOfBoxes.indexOf(5), 1);
      return document.querySelector(`.box${5}`).firstElementChild;
    }
    else if (index === 2 || index === 8) {
      boxEvent.splice(boxEvent.indexOf(index + 1), 1);
      noOfBoxes.splice(noOfBoxes.indexOf(index + 1), 1);
      return document.querySelector(`.box${index + 1}`).firstElementChild
    }
    else if (index === 4 || index === 6) {
      boxEvent.splice(boxEvent.indexOf(index + 3), 1);
      noOfBoxes.splice(noOfBoxes.indexOf(index + 3), 1);
      return document.querySelector(`.box${index + 3}`).firstElementChild
    }
    else {
      boxEvent.splice(boxEvent.indexOf(randomArr[randomNo]), 1);
      noOfBoxes.splice(noOfBoxes.indexOf(randomArr[randomNo]), 1);
      return document.querySelector(`.box${randomArr[randomNo]}`).firstElementChild
    }
  }
  else {
    if (getWinner(computer, 2)) {
      return getOneBox();
    }
    else if (getWinner(user, 2)) {
      return getOneBox();
    }
    else
      return oneTrickBox();
  }
}

function oneTrickBox() {
  if (getWinner(computer, 1)) {
    let index;
    for (let value of closeToWin)
      if (document.querySelector(`.box${value}`).firstElementChild.classList.length !== 0)
        index = value;
    if (closeToWin[0] === 1 && closeToWin[1] === 5 || closeToWin[0] === 3 && closeToWin[1] === 5) {
      if (document.querySelector(`.box${5}`).firstElementChild.classList.length === 0) {
        boxEvent.splice(boxEvent.indexOf(closeToWin[1]), 1);
        noOfBoxes.splice(noOfBoxes.indexOf(closeToWin[1]), 1);
        return document.querySelector(`.box${closeToWin[1]}`).firstElementChild;
      }
    }
    else if (index === closeToWin[2]) {
      boxEvent.splice(boxEvent.indexOf(closeToWin[0]), 1);
      noOfBoxes.splice(noOfBoxes.indexOf(closeToWin[0]), 1);
      return document.querySelector(`.box${closeToWin[0]}`).firstElementChild;
    }
    else {
      boxEvent.splice(boxEvent.indexOf(closeToWin[2]), 1);
      noOfBoxes.splice(noOfBoxes.indexOf(closeToWin[2]), 1);
      return document.querySelector(`.box${closeToWin[2]}`).firstElementChild;
    }
  }
  return randomBoxSelection();
}