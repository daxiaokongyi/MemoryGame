const gameContainer = document.getElementById('game');
const resultContainer = document.getElementById('result');
const resultHolder = document.getElementById('resultHolder');
const buttonHolder = document.getElementById('buttonHolder');

let pairCards = 0;
let COLORS = [];
let startDashBord = document.querySelector('#startBtn');
let cardOne = null;
let cardTwo = null;
let Cardslocked = false;
let startBtnLocked = false;
let matched = 0;
let score = 0;

// set the current best score
let curBest = document.getElementById('highestScore');
console.log(curBest);
if (localStorage.getItem('bestScore')) {
  curBest.innerText = `Highest Score: ${localStorage.getItem('bestScore')}`;
} else {
  curBest.innerText = `Highest Score: `;
}
// reset score to 0
let curScore = document.getElementById('curScore');
curScore.innerText = `Score: ${score}`;

// add Event Listener to startBtn
startDashBord.addEventListener('click', function (e) {
  // ensure the start button until the round is over
  if (startBtnLocked) {
    return;
  }
  startBtnLocked = true;

  // get number of cards user would like to play
  pairCards = document.querySelector('input[type=text]').value;

  // set colors for each card randomly
  for (let i = 0; i < pairCards; i++) {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let curColor = `rgb(${r},${g},${b})`;
    COLORS.push(curColor);
    COLORS.push(curColor);
  }

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement('div');
      newDiv.style.borderRadius = '1rem';

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener('click', handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }

  // when the DOM loads
  createDivsForColors(shuffledColors);
});

// TODO: Implement this function!
function handleCardClick(event) {
  // lock if two cards are locked
  if (Cardslocked) {
    return;
  }
  if (event.target.classList.contains('flipped')) {
    return;
  }

  score += 1;
  curScore.innerText = `Score: ${score}`;

  // you can use event.target to see which element was clicked
  // console.log('you just clicked', event.target);
  let curCard = event.target;
  // console.log(curCard.className);
  curCard.style.backgroundColor = curCard.className;
  // once a card is flipped, have it be inactive

  if (!cardOne || !cardTwo) {
    // make the clicked card flipped
    curCard.classList.add('flipped');
    // have card one clicked
    cardOne = cardOne || curCard;
    // have card two clicked
    cardTwo = cardOne === curCard ? null : curCard;

    // console.log(cardOne);
    // console.log(cardTwo);
  }

  // lock two cards, after two are flipped

  if (cardOne && cardTwo) {
    Cardslocked = true;

    // case if one and twp have the same colors
    if (cardOne.className === cardTwo.className) {
      console.log('paired');
      // updated how much cards are paired
      matched += 2;
      // // End Game when all of cards are paired
      // if (matched === COLORS.length) {
      //   alert('Good Game!');
      //   return;
      // }
      // console.log(matched);
      // reset or move on to another two new cards
      cardOne = null;
      cardTwo = null;
      // unlock new cards
      Cardslocked = false;
    } else {
      console.log('try again');
      setTimeout(function () {
        // no pair happened, flip cards without displaying colors
        cardOne.style.backgroundColor = '';
        cardTwo.style.backgroundColor = '';
        // flip it back to face down again
        cardOne.classList.remove('flipped');
        cardTwo.classList.remove('flipped');
        // reset card one and two
        cardOne = null;
        cardTwo = null;
        // unlock those two cards
        Cardslocked = false;
      }, 1000);
    }
    // console.log(COLORS.length);
    // End Game when all of cards are paired
    if (matched === COLORS.length) {
      let goodGame = document.createElement('h1');

      // get the current best score
      let bestScore = localStorage.getItem('bestScore') || Infinity;
      // console.log(bestScore);

      // update best score
      if (score < bestScore) {
        localStorage.setItem('bestScore', score);
        goodGame.innerText = `Congratulations! Your Score is ${score}, which is a New Best Score!`;
      } else {
        goodGame.innerText = `Good game! Your Score is: ${score}`;
      }

      resultHolder.append(goodGame);

      // create the second button, restart
      let restartBtn = document.createElement('button');
      restartBtn.innerText = 'Restart';
      restartBtn.classList.add('button');

      // reset after clicking restart button
      restartBtn.addEventListener('click', function () {
        console.log(COLORS);
        COLORS = [];
        console.log(COLORS);
        console.log(gameContainer);
        gameContainer.innerHTML = '';
        buttonHolder.innerHTML = '';
        resultHolder.innerHTML = '';
        document.querySelector('input[type=text]').value = '';
        startBtnLocked = false;
        score = 0;
        matched = 0;

        curBest.innerText = `Highest Score: ${localStorage.getItem(
          'bestScore'
        )}`;

        curScore.innerText = `Score: ${score}`;
      });

      buttonHolder.append(restartBtn);

      resultContainer.append(resultHolder);
      resultContainer.append(buttonHolder);
    }
  }
}

// set color on description
let description = document.querySelector('#description');

setInterval(function () {
  let r = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  description.style.color = `rgb(${r}, ${g}, ${b})`;
}, 1000);
