const gameContainer = document.getElementById('game');
let cardOne = null;
let cardTwo = null;
let Cardslocked = false;
let matched = 0;

const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
];

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

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // lock if two cards are locked
  if (Cardslocked) {
    return;
  }
  if (event.target.classList.contains('flipped')) {
    return;
  }
  // you can use event.target to see which element was clicked
  // console.log('you just clicked', event.target);
  let curCard = event.target;
  curCard.style.backgroundColor = curCard.className;
  // once a card is flipped, have it be inactive

  if (!cardOne || !cardTwo) {
    // make the clicked card flipped
    curCard.classList.add('flipped');
    // have card one clicked
    cardOne = cardOne || curCard;
    // have card two clicked
    cardTwo = cardOne === curCard ? null : curCard;

    console.log(cardOne);
    console.log(cardTwo);
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
      console.log(matched);
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
    // End Game when all of cards are paired
    if (matched === COLORS.length) {
      alert('Good Game!');
      return;
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
