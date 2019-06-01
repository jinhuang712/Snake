function Snake() {
    this.x = 10;
    this.y = 10;
    this.xspeed = 0;
    this.yspeed = 0;
    this.trail = [];
    this.length = 5;

    this.show = function () {
        context.fillStyle = "lime";
        this.paint();
    };

    this.flash = async function () {
        let snake = this;
        let is_white = false;
        const alter_paint = function () {
            if (is_white) {
                is_white = false;
                context.fillStyle = "white";
            } else {
                is_white = true;
                context.fillStyle = "lime";
            }
            snake.paint();
        };
        for (let i = 0; i < 4; i++)
             await setTimeout(alter_paint, 500);
    };

    this.paint = function () {
        for (let i = 0; i < this.trail.length; i++) {
            context.fillRect(this.trail[i].x * grid_size,
                             this.trail[i].y * grid_size,
                             grid_size - 2, grid_size - 2);
        }
    };

    this.move = function () {
        let next_x = this.x + this.xspeed;
        let next_y = this.y + this.yspeed;
        if (next_x === -1 || next_y === -1)
            return false;
        if (next_x === grid_size || next_y === grid_size)
            return false;
        if (this.stationary()) {
            // stub
        } else if (this.on_body(next_x, next_y))
            return false;

        this.x += this.xspeed;
        this.y += this.yspeed;
        this.trail.push({x: this.x, y: this.y});

        while (this.trail.length > this.length) {
            this.trail.shift();
        }
        return true;
    };

    this.direct = function (x, y) {
        // todo changing direction too fast result in eating itself
        if (this.stationary()) {
            // stub
        } else if (x === -this.xspeed || y === -this.yspeed)
            return;

        this.xspeed = x;
        this.yspeed = y;
    };

    this.on_body = function (x, y) {
        for (let i = 0; i < this.trail.length; i++)
            if (x === this.trail[i].x && y === this.trail[i].y)
                return true;
        return false;
    };

    this.stationary = function () {
        return this.xspeed === 0 && this.yspeed === 0;
    }
}