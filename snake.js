let canvas;
let context;
window.onload=function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000/15);
};

let px, py;     // the position of the head
let gs, tc;     //
let ax, ay;     // the position of the `apple`
let x_v, y_v;   // the position of the velocity with direction on x and y axis
px = py = 10;
gs = tc = 20;
ax = ay = 15;
x_v = y_v = 0;
let trail = []; // the snakes body
let tail = 5; // the size of the snake

function game() {
    px += x_v;
    py += y_v;
    // wrapping, where touching the edge of the game canvas does not kill the snake
    // todo: make snake die when touching the edges
    if (px < 0) {
        px = tc - 1;
    }
    if (px > tc - 1) {
        px = 0;
    }
    if (py < 0) {
        py = tc - 1;
    }
    if (py > tc - 1) {
        py = 0;
    }
    context.fillStyle="black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle="lime";
    for (let i = 0; i < trail.length; i++) {
        context.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        if (trail[i].x === px && trail[i].y === py) {
            // todo: losing animation
            tail = 5;
        }
    }
    trail.push({x:px, y:py});

    while (trail.length > tail) {
        trail.shift();
    }

    if (ax === px && ay === py) {
        tail++;
        // todo: need a while loop to make sure the apple does not spawn on the snake body
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
    }

    context.fillStyle="red";
    context.fillRect(ax*gs, ay*gs, gs - 2, gs - 2);
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
    if (x_v === 0 && y_v === 0) {
        // stub
    } else if (x_v_ === -x_v || y_v_ === -y_v) {
        return;
    }
    x_v = x_v_;
    y_v = y_v_;
}