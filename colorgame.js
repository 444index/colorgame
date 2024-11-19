document.addEventListener('DOMContentLoaded', () => {
    function randomColor() {
        const r = Math.floor(Math.random() * 100);
        const g = Math.floor(Math.random() * 150);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function generateRandomColors(num) {
        const colors = [];
        for (let i = 0; i < num; i++) {
            colors.push(randomColor());
        }
        return colors;
    }

    function pickColor(colors) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    function changeColors(color) {
        squares.forEach(square => {
            square.style.backgroundColor = color;
        });
    }

    function setDifficulty(num) {
        colors = generateRandomColors(num);
        pickedColor = pickColor(colors);
        
        colorDisplay.textContent = pickedColor;
        messageDisplay.textContent = "";
        gameOver = false;
        resetButton.textContent = "Nuevos Colores";

        squares.forEach((square, index) => {
            if (index < num) {
                square.style.backgroundColor = colors[index];
                square.style.display = "block";
            } else {
                square.style.display = "none";
            }
        });

        document.querySelector('h1').style.backgroundColor = "#6e95b4";
    }

    function handleSquareClick(square) {
        square.addEventListener('click', function () {
            if (gameOver) return;

            const clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "¡Muy bien!";
                changeColors(pickedColor);
                document.querySelector('h1').style.backgroundColor = pickedColor;
                resetButton.textContent = "¿Otra vez?";
                gameOver = true;
            } else {
                this.style.backgroundColor = body.style.backgroundColor;
                messageDisplay.textContent = "¡Intentalo nuevamente!";
            }
        });
    }

    function handleModeButtonClick(button, num) {
        button.addEventListener('click', function () {
            modeButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            numberOfSquares = button.textContent === "Easy" ? 3 : 6;
            setDifficulty(numberOfSquares);
        });
    }

    function init() {
        numberOfSquares = 6; 
        colors = []; 
        pickedColor = ""; 
        gameOver = false; 

        setDifficulty(numberOfSquares); 
        setupModeButtons(); 
        setupSquares();
        resetButton.addEventListener('click', resetGame); 
    }

    function setupModeButtons() {
        handleModeButtonClick(hardButton, 6);
        handleModeButtonClick(easyButton, 3); 
    }

    function setupSquares() {
        squares.forEach((square, index) => {
            square.style.backgroundColor = colors[index];
            handleSquareClick(square); 
        });
    }
    
    const colorDisplay = document.getElementById('colorDisplay');
    const messageDisplay = document.getElementById('message');
    const body = document.querySelector('body');
    const resetButton = document.getElementById('reset');
    const hardButton = document.getElementById('hard');
    const easyButton = document.getElementById('easy');
    const squares = document.querySelectorAll('.square');
    const modeButtons = document.querySelectorAll('.mode');  

    let numberOfSquares;
    let colors; 
    let pickedColor; 
    let gameOver; 

    // me ayudé con ChatGPT así que si hay inconcluencias es por eso mismo u.u
    init();
});
