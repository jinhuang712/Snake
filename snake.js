function Snake() {
    this.x = 10;
    this.y = 10;
    this.xspeed = 0;
    this.yspeed = 0;
    this.trail = [];
    this.length = 5;

    this.direct = function(x, y) {
        if (this.xspeed === 0 && this.yspeed === 0) {
            // stub
        } else if (x === -this.xspeed || y === -this.yspeed) {
            return;
        }
        this.xspeed = x;
        this.yspeed = y;
    };

    this.show = function() {
        context.fillStyle="lime";
        for (let i = 0; i < this.trail.length; i++) {
            context.fillRect(this.trail[i].x * grid_size,
                this.trail[i].y * grid_size,
                grid_size - 2, grid_size - 2);
        }
        this.x += this.xspeed;
        this.y += this.yspeed;
        this.trail.push({x:this.x, y:this.y});

        while (this.trail.length > this.length) {
            this.trail.shift();
        }
    }
}