const cards = document.querySelectorAll('.memory-card');
const scoreTag = document.querySelector('.score');
const instructionsTag = document.querySelector('.instructions');
const board = document.querySelector('.memory-game');
const underlay = document.querySelector('.underlay')


let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;
let matchedArr = [];
let score = 0;


function setWindowSize() {
    let bs = getComputedStyle(board);
    let height = bs.getPropertyValue('height');
    let width = parseFloat(height, 10) * 5 / 4 + 'px';
    board.style.setProperty('width', width);
    underlay.style.setProperty('width', width);
}


function flipCard() {
    if(boardLocked) return;
    if(this === firstCard) return;

    this.classList.add('flip')

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return    
    }
    
    hasFlippedCard = false;
    secondCard = this;

    isMatch() ? disableCards() : unflipCards();

    if(hasWon()) {
        score ++;
        scoreTag.textContent = 'Turns: ' + score;
        instructionsTag.textContent = 'You win';
    }
}


function isMatch() {
    return firstCard.dataset.image === secondCard.dataset.image;
}


function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedArr.push(firstCard);
    matchedArr.push(secondCard);
}


function unflipCards() {
    boardLocked = true
    score++
    scoreTag.textContent = 'Turns: ' + score;
    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard = null;
    secondCard = null;
    boardLocked = false
    }, 1500);
}


function reset() {
    hasFlippedCard = false;
    boardLocked = true;
    firstCard = null;
    secondCard = null;
    matchedArr = []
    score = 0;
    scoreTag.textContent = 'Turns: ' + score;
    instructionsTag.textContent = 'Pick a card';
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    setTimeout(() => {
        shuffle();
        boardLocked = false;
    }, 500);
    
}


function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 100);
        card.style.order = randomPos;
    });
}


function hasWon() {
    return matchedArr.length === cards.length;
}


reset();
setWindowSize();
window.onresize = setWindowSize;