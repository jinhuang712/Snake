function Snake(init_x = 10, init_y = 10) {
    // todo later make snake spawn in random position
    this.x = init_x;
    this.y = init_y;
    this.xspeed = 0;
    this.yspeed = 0;
    this.trail = [{x: this.x, y: this.y}];
    this.length = 5;

    this.show = function () {
        context.fillStyle = "lime";
        this.paint();
    };

    this.paint = function () {
        for (let i = 0; i < this.trail.length; i++) {
            context.fillRect(this.trail[i].x * GRID_SIZE,
                             this.trail[i].y * GRID_SIZE,
                             GRID_SIZE - 2, GRID_SIZE - 2);
        }
    };

    this.move = function () {
        let next_x = this.x + this.xspeed;
        let next_y = this.y + this.yspeed;
        if (next_x === -1 || next_y === -1)
            return false;
        if (next_x === TILE_COUNT || next_y === TILE_COUNT)
            return false;
        if (this.stationary()) {
            // stub
        } else if (world_matrix[next_x][next_y])
            return false;

        this.x += this.xspeed;
        this.y += this.yspeed;
        world_matrix[this.x][this.y] = true;
        this.trail.push({x: this.x, y: this.y});

        while (this.trail.length > this.length) {
            let piece = this.trail.shift();
            world_matrix[piece.x][piece.y] = false;
        }
        return true;
    };

    this.direct = function (x, y) {
        if (this.stationary()) {
            // stub
        } else if (x === -this.xspeed || y === -this.yspeed)
            return;

        this.xspeed = x;
        this.yspeed = y;
    };

    this.stationary = function () {
        return this.xspeed === 0 && this.yspeed === 0;
    }
}