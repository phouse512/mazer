window.onload = function() {
    document.getElementById("game").style.background = "#637074";
    game();
}

function game() {
    var colorMap = {
        0: "#D3D3D3",
        1: "#2F2F2F",
        2: "#e2543e"
    }

    var EASY_MAP = {
        'map': [
            [1, 1, 1, 1, 2, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        'left_position_x': 50,
        'left_position_y': 40,
        'right_position_x': 310,
        'right_position_y': 40,
        'top_position_x': 110,
        'top_position_y': 5,
        'bottom_position_x': 110,
        'bottom_position_y': 215
    }

    var SQR_SIZE = 20;
    var container = document.getElementById("game");
    var MAP_HOR_OFFSET = 100;
    var MAP_VERT_OFFSET = 50;

    var app = new PLAYGROUND.Application({
        paths: {
            images: "static/images/",
            sounds: "static/sounds/"
        },
        preferedAudioFormat: "mp3",
        height: 500,
        width: 700,
        container: document.getElementById("game"),
        create: function() {
            this.map = EASY_MAP.map;
            this.player = {
                x: 5,
                y: 5,
                color: "#e2543e"
            };
            this.top_opacity = 1;
            this.left_opacity = 1;
            this.bottom_opacity = 1;
            this.right_opacity = 1;
            
            // load images
            this.loadImage("bar");
            this.loadImage("bar_horizontal");

            // load sounds
            this.loadSounds("pulse", "bg");
        },
        ready: function() {
            console.log("ready");
            this.bg_sound = this.music.play("bg", true);
            this.music.setVolume(this.bg_sound, 0.2);
        },
        display_walls: function() {
            y = this.player.y;
            x = this.player.x;

            if (this.map[y][x-1] != 0) {
                this.left_opacity = 0;
            }
            if (this.map[y][x+1] != 0) {
                this.right_opacity = 0;
            }
            if (this.map[y-1][x] != 0) {
                this.top_opacity = 0;
            }
            if (this.map[y+1][x] != 0) {
                this.bottom_opacity = 0;
            }
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

            //this.layer.drawImage(this.images.bar, EASY_MAP.left_position_x, EASY_MAP.left_position_y);
            //this.layer.drawImage(this.images.bar, EASY_MAP.right_position_x, EASY_MAP.right_position_y);
            //this.layer.drawImage(this.images.bar_horizontal, EASY_MAP.top_position_x, EASY_MAP.top_position_y);
            
            //var blendedBot = cq(this.images.bar_horizontal).blend("#637074", "normal", 0.2);
            //this.layer.drawImage(blendedBot.canvas, EASY_MAP.bottom_position_x, EASY_MAP.bottom_position_y);
           
            // opacity for buttons
            if (this.top_opacity < 1) {
               this.top_opacity += .02;
               var blendedTop = cq(this.images.bar_horizontal).blend("#637074", "normal", this.top_opacity);
               this.layer.drawImage(blendedTop.canvas, EASY_MAP.top_position_x, EASY_MAP.top_position_y);
            }

            if (this.bottom_opacity < 1) {
               this.bottom_opacity += .02;
               var blendedBot = cq(this.images.bar_horizontal).blend("#637074", "normal", this.bottom_opacity);
               this.layer.drawImage(blendedBot.canvas, EASY_MAP.bottom_position_x, EASY_MAP.bottom_position_y);
            }
            
            if (this.left_opacity < 1) {
               this.left_opacity += .02;
               var blendedLeft = cq(this.images.bar).blend("#637074", "normal", this.left_opacity);
               this.layer.drawImage(blendedLeft.canvas, EASY_MAP.left_position_x, EASY_MAP.left_position_y);
            }

            if (this.right_opacity < 1) {
               this.right_opacity += .02;
               var blendedRight = cq(this.images.bar).blend("#637074", "normal", this.right_opacity);
               this.layer.drawImage(blendedRight.canvas, EASY_MAP.right_position_x, EASY_MAP.right_position_y);
            }
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
            var test = this.sound.play("pulse", false);
//            this.sound.setVolume(test, 2);
            this.display_walls();
        }
    });
}
