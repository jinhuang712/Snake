let canvas;
let context;
let snake;

window.onload = function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    snake = new Snake();
    setInterval(game, 1000 / 10);
};

let grid_size = 20,
    tile_count = 20;
let food_x = 15,
    food_y = 15;

function game() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    snake.show();

    context.fillStyle = "red";
    context.fillRect(food_x * grid_size, food_y * grid_size,
                     grid_size - 2, grid_size - 2);

    if (!snake.move()) {
        // snake.flash();
        snake = new Snake();
        spawn_food();
        return;
    }

    if (food_x === snake.x && food_y === snake.y) {
        snake.length++;
        spawn_food();
    }
}

function spawn_food() {
    food_x = Math.floor(Math.random() * tile_count);
    food_y = Math.floor(Math.random() * tile_count);
    if (snake.on_body(food_x, food_y))
        spawn_food();
}

function keyPush(event) {
    const keyName = event.key;
    let x_speed, y_speed;
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
    }
    snake.direct(x_speed, y_speed);
}
