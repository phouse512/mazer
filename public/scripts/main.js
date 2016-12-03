window.onload = function() {
    document.getElementById("game").style.background = "#637074";
    game();
}

function game() {
    var colorMap = {
        0: "#ffffff",
        1: "#212227",
        2: "#e2543e"
    }

    var EASY_MAP = [
        [1, 1, 1, 1, 2, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    var SQR_SIZE = 20;
    var container = document.getElementById("game");
    var MAP_HOR_OFFSET = 100;
    var MAP_VERT_OFFSET = 50;

    var app = new PLAYGROUND.Application({
        paths: {
            images: "static/images/"
        },
        height: 500,
        width: 700,
        container: document.getElementById("game"),
        create: function() {
            this.map = EASY_MAP;
            this.player = {
                x: 5,
                y: 5,
                color: "#e2543e"
            };

            this.loadImage("bar");
        },
        is_empty_location: function(to_x, to_y) {
            if (to_y >= this.map.length) {
                console.log('no room on the y axis');
                return false;
            }

            if (to_x >= this.map[0].length) {
                console.log('no room on the x axis');
                return false;
            }

            if (this.map[to_y][to_x] == 1) {
                console.log('that\'s a wall yo');
                return false;
            }
            
            console.log('dis is a valid move');
            return true;
        },
        preload: function() {
        },
        render: function(dt) {
            this.layer.clear("#637074");
            var map = this.map;
            
            // display map
            for (var i=0; i<map.length; i++) {
                for (var j=0; j< map[i].length; j++) {
                    this.layer.fillStyle(colorMap[map[i][j]]).fillRect(SQR_SIZE*j + MAP_HOR_OFFSET, SQR_SIZE*i + MAP_VERT_OFFSET, SQR_SIZE, SQR_SIZE);
                }
            }

            this.layer.drawImage(this.images.bar, MAP_HOR_OFFSET - 50, MAP_VERT_OFFSET- 10);
            this.layer.drawImage(this.images.bar, this.map.length * SQR_SIZE + MAP_HOR_OFFSET, 0);
            
            // display user
            this.layer.fillStyle(this.player.color).fillRect(this.player.x*SQR_SIZE + MAP_HOR_OFFSET, this.player.y*SQR_SIZE + MAP_VERT_OFFSET, SQR_SIZE, SQR_SIZE);
        },
        keyup: function(event) {
            var is_valid, newX, newY;
            if (event.key == 'up') {
                is_valid = this.is_empty_location(this.player.x, this.player.y-1);
                newX = this.player.x;
                newY = this.player.y-1;
            } else if (event.key == 'down') {
                is_valid = this.is_empty_location(this.player.x, this.player.y+1);
                newX = this.player.x;
                newY = this.player.y+1;
            } else if (event.key == 'left') {
                is_valid = this.is_empty_location(this.player.x-1, this.player.y);
                newX = this.player.x-1;
                newY = this.player.y;
            } else if (event.key == 'right') {
                is_valid = this.is_empty_location(this.player.x+1, this.player.y);
                newX = this.player.x+1;
                newY = this.player.y;
            }
            
            if (is_valid) {
                this.player.x = newX;
                this.player.y = newY;
            }
        }
    });
}
