function Snake() {
    this.x = 10;
    this.y = 10;
    this.xspeed = 0;
    this.yspeed = 0;
    this.trail = [];
    this.length = 5;

    this.reset = function () {
        this.x = 10;
        this.y = 10;
        this.xspeed = 0;
        this.yspeed = 0;
        this.trail = [];
        this.length = 5;
    };

    this.show = function() {
        context.fillStyle="lime";
        this.paint();
    };

    this.flash = function() {
        for (let i = 0; i < 2; i++) {
            // todo fix flash blinking mechanism
            context.fillStyle="white";
            this.paint();
            setTimeout(this.show, 1000);
        }
    };

    this.paint = function() {
        for (let i = 0; i < this.trail.length; i++) {
            context.fillRect(this.trail[i].x * grid_size,
                this.trail[i].y * grid_size,
                grid_size - 2, grid_size - 2);
        }
    };

    this.move = function() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        this.trail.push({x:this.x, y:this.y});

        while (this.trail.length > this.length) {
            this.trail.shift();
        }
    };

    this.direct = function(x, y) {
        if (this.xspeed === 0 && this.yspeed === 0) {
            // stub
        } else if (x === -this.xspeed || y === -this.yspeed) {
            return;
        }
        this.xspeed = x;
        this.yspeed = y;
    };

    this.body_ahead = function() {
        // todo eat own body still happens
        if (this.xspeed === 0 || this.yspeed === 0)
            return false;
        let next_x = this.x + this.xspeed;
        let next_y = this.y + this.yspeed;
        for (let i = 0; i < this.trail.length; i++) {
            if (next_x === this.trail[i].x && next_y === this.trail[i].y) {
                return true;
            }
        }
        return false;
    };

    this.on_body = function (x, y) {
        for (let i = 0; i < this.trail.length; i++) {
            if (x === this.trail[i].x && y === this.trail[i].y) {
                return true;
            }
        }
        return false;
    }
}