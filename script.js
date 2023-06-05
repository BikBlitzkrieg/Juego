// Array de imágenes de animales
const animals = [
    'animal1.png',
    'animal2.png',
    'animal3.png',
    'animal4.png',
    'animal5.png',
    'animal6.png',
    'animal7.png',
    'animal8.png'
];

// Duplica el array para tener pares de cada imagen
const cards = animals.concat(animals);

// Función para barajar las tarjetas de manera aleatoria
function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Baraja las tarjetas
const shuffledCards = shuffle(cards);

// Genera la cuadrícula de tarjetas en el HTML
const memoryGameContainer = document.querySelector('.memory-game');
shuffledCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.innerHTML = `<img src="${card}" alt="animal">`;
    memoryGameContainer.appendChild(cardElement);
});

// Variables para controlar el juego
let flippedCards = [];
let matchedCards = [];

// Función para voltear una tarjeta
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Función para verificar si las tarjetas son iguales
function checkMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    if (card1.innerHTML === card2.innerHTML) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);

        if (matchedCards.length === cards.length) {
            setTimeout(() => {
                alert('¡Felicitaciones! ¡Has ganado el juego!');
            }, 500);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}

// Agrega el evento de clic a cada tarjeta
const cardElements = document.querySelectorAll('.card');
cardElements.forEach(card => card.addEventListener('click', flipCard));