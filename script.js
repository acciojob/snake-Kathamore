//your code here
const gameContainer = document.getElementById("gameContainer");
const scoreElement = document.getElementById("score");

// Constants
const gridSize = 40;
const pixelSize = 10;
const initialSpeed = 100; // milliseconds
const foodClass = "food";
const snakeClass = "snakeBodyPixel";

// Initial snake position and direction
let snake = [{ row: 20, col: 1 }];
let direction = "right";

// Initialize score
let score = 0;
scoreElement.textContent = score;

// Generate a random position for food
function generateFood() {
    let foodPixel;
    do {
        foodPixel = {
            row: Math.floor(Math.random() * gridSize) + 1,
            col: Math.floor(Math.random() * gridSize) + 1
        };
    } while (isOccupiedBySnake(foodPixel));
    return foodPixel;
}

// Check if a pixel is occupied by the snake
function isOccupiedBySnake(pixel) {
    return snake.some(segment => segment.row === pixel.row && segment.col === pixel.col);
}

// Update the game grid with the snake and food
function updateGrid() {
    // Clear the grid
    gameContainer.innerHTML = "";

    // Add the snake to the grid
    snake.forEach(segment => {
        const pixel = document.createElement("div");
        pixel.className = snakeClass;
        pixel.style.gridRow = segment.row;
        pixel.style.gridColumn = segment.col;
        gameContainer.appendChild(pixel);
    });

    // Add the food to the grid
    const foodPixel = generateFood();
    const food = document.createElement("div");
    food.className = foodClass;
    food.style.gridRow = foodPixel.row;
    food.style.gridColumn = foodPixel.col;
    gameContainer.appendChild(food);
}

// Move the snake
function moveSnake() {
    const head = { ...snake[0] };
    
    switch (direction) {
        case "up":
            head.row--;
            break;
        case "down":
            head.row++;
            break;
        case "left":
            head.col--;
            break;
        case "right":
            head.col++;
            break;
    }
    
    // Check for collisions
    if (head.row < 1 || head.row > gridSize || head.col < 1 || head.col > gridSize || isOccupiedBySnake(head)) {
        // Game over
        clearInterval(gameInterval);
        alert("Game over! Your score: " + score);
        return;
    }
    
    // Check if the snake ate food
    if (head.row === foodPixel.row && head.col === foodPixel.col) {
        snake.unshift(head);
        score += 10;
        scoreElement.textContent = score;
        foodPixel = generateFood();
    } else {
        // Move the snake
        snake.unshift(head);
        snake.pop();
    }
    
    updateGrid();
}

// Handle key events to change the snake's direction
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (direction !== "down") direction = "up";
            break;
        case "ArrowDown":
            if (direction !== "up") direction = "down";
            break;
        case "ArrowLeft":
            if (direction !== "right") direction = "left";
            break;
        case "ArrowRight":
            if (direction !== "left") direction = "right";
            break;
    }
});

// Start the game loop
let foodPixel = generateFood();
updateGrid();
const gameInterval = setInterval(moveSnake, initialSpeed);
// This code creates a basic snake game that moves the snake, handles collisions, and keeps track of the score. You can further enhance it by adding features like speed control, game restart, and more complex behavior.




