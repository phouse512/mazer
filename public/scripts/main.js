var colorMap = {
    0: "#ffffff",
    1: "#000000",
    2: "#e2543e"
}

var app = new PLAYGROUND.Application({

    create: function() {
        this.map = [[1, 1, 1, 1], [1, 0, 0, 1], [1, 2, 0, 1], [1, 1, 1, 1]];

    },
    preload: function() {
    },
    render: function(dt) {
        this.layer.clear("#ffffff");
        var map = this.map;
        
        xRand = Math.floor(Math.random() * 10);
        yRand = Math.floor(Math.random() * 10);

//        this.layer.fillStyle("#e2543e").fillRect(xRand*20, yRand*20, 20, 20);
        //this.layer.fillStyle("#e2543e").fillRect(20, 20, 50, 50);
        for (var i=0; i<map.length; i++) {
            for (var j=0; j< map[i].length; j++) {
                this.layer.fillStyle(colorMap[map[i][j]]).fillRect(20*i, 20*j, 20, 20);
            }
        }
    },
    keyup: function(event) {
        console.log(event.key);
        if (event.key == 'up') {
            console.log('up');
        }
    }
});
