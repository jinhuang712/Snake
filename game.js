let canvas;
let context;
let snake;

const REFRESH_RATE = 1000 / 10;
const FLASH_COUNT = 4;
const GRID_SIZE  = 20,
      TILE_COUNT = 20;

const directions = {
    STATIC: 0,
    UP:     1,
    LEFT:   2,
    DOWN:   3,
    RIGHT:  4,
    properties: {
        0: {x_speed: 0,     y_speed: 0},
        1: {x_speed: 0,     y_speed: -1},
        2: {x_speed: -1,    y_speed: 0},
        3: {x_speed: 0,     y_speed: 1},
        4: {x_speed: 1,     y_speed: 0}
    }
};

let world_matrix = [];

window.onload = function () {
    canvas = document.getElementById("canvas");
    canvas.width = GRID_SIZE * TILE_COUNT;
    canvas.height = GRID_SIZE * TILE_COUNT;
    context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    initialize_world();
};

let food_x = 15,
    food_y = 15;
let next_direction = directions.STATIC;

function game(dead = 0) {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (!dead) {
        snake.direct(directions.properties[next_direction].x_speed,
                     directions.properties[next_direction].y_speed);
        let snakeMoved = snake.move();
        render_food();
        snake.show();

        if (!snakeMoved) {
            clearInterval(game.timeID);
            setTimeout(`game(${dead + 1})`, REFRESH_RATE);
            return;
        }
        if (food_x === snake.x && food_y === snake.y) {
            snake.length++;
            spawn_food();
        }
    } else {
        // todo make death animation another function so the game func could be smaller in size
        if (dead > FLASH_COUNT * 2) {
            initialize_world();
            return;
        } else if (dead % 2) {
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
        } else {
            render_food();
            snake.show();
        }
        setTimeout(`game(${dead + 1})`, REFRESH_RATE);
    }
}

function spawn_food() {
    if (snake.length >= TILE_COUNT * TILE_COUNT - 1)
        return;
    food_x = Math.floor(Math.random() * TILE_COUNT);
    food_y = Math.floor(Math.random() * TILE_COUNT);
    if (world_matrix[food_x][food_y])
        spawn_food();
}

function render_food() {
    context.fillStyle = "red";
    context.fillRect(food_x * GRID_SIZE, food_y * GRID_SIZE,
                     GRID_SIZE - 2, GRID_SIZE - 2);
}

// todo could also implement action queue
function keyPush(event) {
    const keyName = event.key;
    switch (keyName) {
        case 'ArrowUp': case 'w':
            next_direction = directions.UP;
            break;
        case 'ArrowLeft': case 'a':
            next_direction = directions.LEFT;
            break;
        case 'ArrowDown': case 's':
            next_direction = directions.DOWN;
            break;
        case 'ArrowRight': case 'd':
            next_direction = directions.RIGHT;
            break;
        default:
            break;
    }
}

function initialize_world() {
    snake = new Snake();

    //  initialize world matrix that stores if there is
    //  a piece of snake body on that location
    world_matrix = [];
    for (let i = 0; i < TILE_COUNT; i++)
        world_matrix.push(Array(TILE_COUNT).fill(false));
    world_matrix[snake.x][snake.y] = true;

    next_direction = directions.STATIC;
    spawn_food();
    game.timeID = setInterval(game, REFRESH_RATE);
}
