let cursorX = 0;
let cursorY = 0;
let score = 0;


class Game {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.player = null;
        this.blobs = [];
        this.x = this.width / 2;
        this.y = this.height / 2;
    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        console.log("canvas")
        const ctx = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height;
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        document.body.appendChild(canvas);
        return ctx;
    }

    createEntity(type, color, speed) {
        if (type === 'player') {
            this.player = new Blob(this.x, this.y, 25, color, speed);
        } else if (type === 'food') {
            this.blobs.push(new Blob(c.randomIntFromRange(10, this.width - 10), c.randomIntFromRange(10, this.width - 10), 10, color));
        }
    }

    setup() {
        this.createEntity("player", "red", 10);
    }

    randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    write(text, x, y, color) {
        ctx.fillStyle = color;
        ctx.font = "15px Arial";
        ctx.fillText(text, x, y);
    }

    reset(event) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        score = 0;
        clearInterval(event);
    }
}

class Blob {
    constructor(x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
    }

    getDistanceTo0(x1, y1) {
        return Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2))
    }

    update(cursorX, cursorY) {
        let factor;
        let dir = { x: cursorX, y: cursorY };
        dir.x -= this.x;
        dir.y -= this.y;
        if(this.getDistanceTo0(dir.x, dir.y)>=6){
            factor = this.speed / this.getDistanceTo0(dir.x, dir.y);
        } else {
            factor = 0 ;
        }
        let velX = dir.x * factor;
        let velY = dir.y * factor;
        this.x += velX;
        this.y += velY;
    }

    collides(p) {
        return (Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2) <= Math.pow(p.radius - this.radius, 2));
    }

    render() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
}

var c = new Game(innerWidth, innerHeight, "black", 10);
var ctx = c.createCanvas()
c.setup();

addEventListener('mousemove', tellPos, true);

function tellPos(p) {
    cursorX = p.offsetX;
    cursorY = p.offsetY;
}

setInterval(function () {
    c.createEntity("food", "blue")
}, 2000);

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, c.width, c.height);
    for (var i = 0; i < c.blobs.length; i++) {
        c.blobs[i].render();
    }
    c.blobs.forEach(function (e) {
        if (e.collides(c.player)) {
            let index = c.blobs.indexOf(e);
            c.player.radius += 1;
            score += 1;
            if (index > -1) {
                c.blobs.splice(index, 1);
            }
        }
    })
    c.write("Score: " + score, 10, 20, "black");

    c.player.update(cursorX, cursorY);
    c.player.render();
}

animate();