let canvas;
let context;
window.onload=function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000/15);
};

let head_x = 10, head_y = 10;
let grid_size = 20, tile_count = 20;
let food_x = 15, food_y = 15;
let x_velocity = 0, y_velocity = 0;
let trail = []; // the snakes body
let tail = 5; // the size of the snake

function game() {
    head_x += x_velocity;
    head_y += y_velocity;
    // wrapping, where touching the edge of the game canvas does not kill the snake
    // todo: make snake die when touching the edges
    if (head_x < 0) {
        head_x = tile_count - 1;
    }
    if (head_x > tile_count - 1) {
        head_x = 0;
    }
    if (head_y < 0) {
        head_y = tile_count - 1;
    }
    if (head_y > tile_count - 1) {
        head_y = 0;
    }
    context.fillStyle="black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle="lime";
    for (let i = 0; i < trail.length; i++) {
        context.fillRect(trail[i].x * grid_size, trail[i].y * grid_size, grid_size - 2, grid_size - 2);
        if (trail[i].x === head_x && trail[i].y === head_y) {
            // todo: losing animation
            tail = 5;
        }
    }
    trail.push({x:head_x, y:head_y});

    while (trail.length > tail) {
        trail.shift();
    }

    if (food_x === head_x && food_y === head_y) {
        tail++;
        // todo: need a while loop to make sure the apple does not spawn on the snake body
        food_x = Math.floor(Math.random() * tile_count);
        food_y = Math.floor(Math.random() * tile_count);
    }

    context.fillStyle="red";
    context.fillRect(food_x * grid_size, food_y * grid_size, grid_size - 2, grid_size - 2);
}

function keyPush(event) {
    const keyName = event.key;
    let x_v_, y_v_;
    switch (keyName) {
        case 'ArrowLeft':
            x_v_ = -1;
            y_v_ = 0;
            break;
        case 'ArrowUp':
            x_v_ = 0;
            y_v_ = -1;
            break;
        case 'ArrowRight':
            x_v_ = 1;
            y_v_ = 0;
            break;
        case 'ArrowDown':
            x_v_ = 0;
            y_v_ = 1;
            break;
    }
    if (x_velocity === 0 && y_velocity === 0) {
        // stub
    } else if (x_v_ === -x_velocity || y_v_ === -y_velocity) {
        return;
    }
    x_velocity = x_v_;
    y_velocity = y_v_;
}