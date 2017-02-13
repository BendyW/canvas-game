var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var speed = 1;


window.onload = function (event) {
    hero.initHero();
    // var button = document.getElementsByTagName('button')[0];
    // button.addEventListener('click', realTime);
    animateCanvas();
    document.addEventListener('keydown', function(event){
        switch(event.which) {
            case 37: //left
                hero.changeDirection('left');
                console.log('left')
                break;
            case 38: //up
                hero.changeDirection('up');
                break;
            case 39: //right
                hero.changeDirection('right');
                break;
            case 40: //down
                hero.changeDirection('down');
                break;
        }
    });

}

function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    hero.drawBody();
}

var hero = {
    body: [],
    direction: '',

    //Personal Choice
    CreateBody: function (_x, _y) {
        return {
            x: _x,
            y: _y
        }
    },

    initHero: function(){
        this.body.push(new this.CreateBody(2,2));
    },
    removeLastPos: function() {
        this.body.pop();
    },
    move: function() {
        var first = this.body[0];
        switch(this.direction){
            case 'right':
                hero.body.unshift(new this.CreateBody(first.x+speed,first.y));
                this.removeLastPos();
                break;
            case 'left':
                hero.body.unshift(new this.CreateBody(first.x-speed,first.y));
                this.removeLastPos();
                console.log('happening');
                break;
            case 'up':
                hero.body.unshift(new this.CreateBody(first.x,first.y-speed));
                this.removeLastPos();
                break;
            case 'down':
                hero.body.unshift(new this.CreateBody(first.x,first.y+speed));
                this.removeLastPos();
                break;
        }
    },
    changeDirection: function(newDirection){
        switch(this.direction){
            case 'right':
                if(newDirection === 'left')
                    return;
                break;
            case 'left':
                if(newDirection === 'right')
                    return;
                break;
            case 'up':
                if(newDirection === 'down')
                    return;
                break;
            case 'down':
                if(newDirection === 'up')
                    return;
                break;
        }
        this.direction = newDirection;
    },

    drawBody: function () {
        ctx.beginPath();
        ctx.rect((this.body[0].x-1)*20, (this.body[0].y-1)*20, 19, 19);
        ctx.fillStyle = "#000000";
        ctx.fill();
    }
}


var frameCounter = 0;
var moveOnFrameCount = 2;



function animateCanvas(){
    if(frameCounter >= moveOnFrameCount){
        frameCounter = 0;
        hero.move()

    }else{
        frameCounter++
    }
    draw();
    window.requestAnimationFrame(animateCanvas)
}