let canvas;
let context;
let snake;
const REFRESH_RATE = 1000 / 10;

window.onload = function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    snake = new Snake();
    game.timeID = setInterval(game, REFRESH_RATE);
};

const GRID_SIZE  = 20,
      TILE_COUNT = 20;
let food_x = 15,
    food_y = 15;

const FLASH_COUNT = 4;

function game(dead = 0) {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    snake.show();
    render_food();

    if (!dead) {
        if (!snake.move()) {
            clearInterval(game.timeID);
            setTimeout(`game(${dead + 1})`, REFRESH_RATE);
            return;
        }
        if (food_x === snake.x && food_y === snake.y) {
            snake.length++;
            spawn_food();
        }
    } else {
        if (dead > FLASH_COUNT * 2) {
            snake = new Snake();
            spawn_food();
            game.timeID = setInterval(game, REFRESH_RATE);
            return;
        } else if (dead % 2) {
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
        } else {
            snake.show();
            render_food();
        }
        setTimeout(`game(${dead + 1})`, REFRESH_RATE);
    }
}

function spawn_food() {
    food_x = Math.floor(Math.random() * TILE_COUNT);
    food_y = Math.floor(Math.random() * TILE_COUNT);
    if (snake.on_body(food_x, food_y))
        spawn_food();
}

function render_food() {
    context.fillStyle = "red";
    context.fillRect(food_x * GRID_SIZE, food_y * GRID_SIZE,
                     GRID_SIZE - 2, GRID_SIZE - 2);
}

// todo fix pressing too quickly result in dead snake
function keyPush(event) {
    const keyName = event.key;
    let x_speed = 0, y_speed = 0;
    switch (keyName) {
        case 'ArrowLeft':
            x_speed = -1;
            y_speed = 0;
            break;
        case 'ArrowUp':
            x_speed = 0;
            y_speed = -1;
            break;
        case 'ArrowRight':
            x_speed = 1;
            y_speed = 0;
            break;
        case 'ArrowDown':
            x_speed = 0;
            y_speed = 1;
            break;
        default:
            return;
    }
    snake.direct(x_speed, y_speed);
}
