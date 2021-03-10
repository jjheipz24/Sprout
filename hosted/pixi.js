// checks to make sure document is loaded
document.addEventListener('DOMContentLoaded', function () {
    let popup = document.getElementById("message");

    let w = window.innerWidth;
    let h = window.innerHeight;
    // Creates pixi app
    // const app = new PIXI.Application({
    const app = new PIXI.Renderer({
        backgroundColor: 0x043535,
        width: w,
        height: h,
        view: document.querySelector('#pixiCanvas'),
        resolution: window.devicePixelRatio,
        autoDensity: true
    });

    window.addEventListener('resize', resize);

    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;

        app.resize(w, h);
    }

    // Scale mode for all textures, will retain pixelation
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    const container = new PIXI.Container(); //main container

    Storage.prototype.setObj = function (key, obj) {
        return this.setItem(key, JSON.stringify(obj))
    }
    Storage.prototype.getObj = function (key) {
        return JSON.parse(this.getItem(key))
    }

    let circles = []; //Holds the white placeholder spots
    let colors = {}; //holds the color textures

    let white = PIXI.Texture.from('assets/images/test/white.png');

    let blue = PIXI.Texture.from('assets/images/test/blue.png');
    colors["blue"] = blue;
    let orange = PIXI.Texture.from('assets/images/test/orange.png');
    colors["orange"] = orange;
    let green = PIXI.Texture.from('assets/images/test/green.png');
    colors["green"] = green;
    let pink = PIXI.Texture.from('assets/images/test/pink.png');
    colors["pink"] = pink;
    let purple = PIXI.Texture.from('assets/images/test/purple.png');
    colors["purple"] = purple;
    let yellow = PIXI.Texture.from('assets/images/test/yellow.png');
    colors["yellow"] = yellow;

    if (localStorage.getObj("circles") === null) {
        initCircles();
    } else {
        circles = localStorage.getObj("circles");
    }

    // initCircles();
    //Create the initial circles
    function initCircles() {
        for (let i = 0; i < 6; i++) {
            let circle = new PIXI.Sprite(white);
            circle.interactive = true;
            circle.buttonMode = true;
            circle.anchor.set(0.5);
            circle.scale.set(.75, .75);
            circle.x = (app.screen.width / 2) - ((i % 3) * 150) + 150;
            circle.y = (app.screen.height / 2) - (Math.floor(i / 3) * 150);
            circle.on('pointerdown', changeColor);

            circles.push(circle);
        }
    }

    circles.forEach(circle => {
        container.addChild(circle);
    })


    //Handles changing the circle color
    function changeColor() {
        console.log(this.x);
        let key = Object.keys(colors)[rand()];
        this.texture = colors[key];
    }

    //Generates a random number based on number of textures
    function rand() {
        return Math.floor(Math.random() * Math.floor(Object.keys(colors).length));
    }

    // let test = new PIXI.Sprite(blue);
    // let test2 = new PIXI.Sprite(orange);
    // test.anchor.set(0.5);
    // test.scale.set(.75, .75);
    // test2.anchor.set(0.5);
    // test2.scale.set(.75, .75);

    // colors.push(test2);

    // colors[0].x = 500;
    // colors[0].y = 300;

    // container.addChild(test);
    // container.addChild(colors[0]);


    /*********** Animation **********/
    //Starts animation -- runs every few intervals
    const ticker = new PIXI.Ticker();
    ticker.add(animate);
    ticker.start();

    //Place positioning in here to keep items positioned regardless of window size
    function animate() {
        // test.x = app.screen.width / 2;
        // test.y = app.screen.height / 2;
        for (let i = 0; i < 6; i++) {
            circles[i].x = (app.screen.width / 2) - ((i % 3) * 150) + 150;
            circles[i].y = (app.screen.height / 2) - (Math.floor(i / 3) * 150);
        }

        // localStorage.setObj("circles", circles);

        app.render(container);
    }
});