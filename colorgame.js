document.addEventListener('DOMContentLoaded', () => {
    // Función para generar un color aleatorio en formato rgb
    function randomColor() {
        const r = Math.floor(Math.random() * 100);
        const g = Math.floor(Math.random() * 150);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Función que genera un arreglo de colores aleatorios
    function generateRandomColors(num) {
        const colors = [];
        for (let i = 0; i < num; i++) {
            colors.push(randomColor());
        }
        return colors;
    }

    // Función que selecciona un color aleatorio del arreglo
    function pickColor(colors) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    // Función para cambiar el color de todos los cuadrados al color ganador
    function changeColors(color) {
        squares.forEach(square => {
            square.style.backgroundColor = color;
        });
    }

    // Función que configura la dificultad y actualiza el juego
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

    // Función para manejar el clic en cada cuadrado
    function handleSquareClick(square) {
        square.addEventListener('click', function () {
            if (gameOver) return; // Si el juego ya terminó, no hacer nada

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

    // Función para manejar el clic en los botones de modo (Easy / Hard)
    function handleModeButtonClick(button, num) {
        button.addEventListener('click', function () {
            modeButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            numberOfSquares = button.textContent === "Easy" ? 3 : 6; // Usamos un operador ternario para determinar la dificultad
            setDifficulty(numberOfSquares);
        });
    }

    // Inicialización del juego
    function init() {
        numberOfSquares = 6; // Número inicial de cuadrados (Hard mode)
        colors = []; // Arreglo vacío para colores
        pickedColor = ""; // Color inicial vacío
        gameOver = false; // Estado del juego

        setDifficulty(numberOfSquares); // Configurar dificultad inicial
        setupModeButtons(); // Configurar botones de modo
        setupSquares(); // Configurar los cuadrados
        resetButton.addEventListener('click', resetGame); // Evento para reiniciar el juego
    }

    // Función para configurar los botones de modo
    function setupModeButtons() {
        handleModeButtonClick(hardButton, 6); // Botón para modo Hard
        handleModeButtonClick(easyButton, 3);  // Botón para modo Easy
    }

    // Función para configurar los cuadrados
    function setupSquares() {
        squares.forEach((square, index) => {
            square.style.backgroundColor = colors[index];
            handleSquareClick(square); // Asignar evento de clic a cada cuadrado
        });
    }

    // DOM Elements
    const colorDisplay = document.getElementById('colorDisplay');
    const messageDisplay = document.getElementById('message');
    const body = document.querySelector('body');
    const resetButton = document.getElementById('reset');
    const hardButton = document.getElementById('hard');
    const easyButton = document.getElementById('easy');
    const squares = document.querySelectorAll('.square');
    const modeButtons = document.querySelectorAll('.mode');  // Para los botones de Easy y Hard

    let numberOfSquares; // Número de cuadrados
    let colors; // Colores generados
    let pickedColor; // Color seleccionado
    let gameOver; // Estado del juego

    // Inicializar el juego
    init();
});
