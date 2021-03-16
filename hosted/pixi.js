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

    /***** WE WILL EVENTUALLY NEED THIS FOR THE BACKGROUND *****/

    // let backgroundImg = PIXI.Texture.from('assets/images/test/planter-background.png');
    // let background = new PIXI.Sprite(backgroundImg);
    // background.anchor.x = 0;
    // background.anchor.y = 0;
    // background.position.x = 0;
    // background.position.y = 0;
    // background.width = window.innerWidth;
    // background.height = window.innerHeight;
    //container.addChild(background);

    /**************************************/

    //Might have to delete this idk
    // Storage.prototype.setObj = function (key, obj) {
    //     return this.setItem(key, JSON.stringify(obj))
    // }
    // Storage.prototype.getObj = function (key) {
    //     return JSON.parse(this.getItem(key))
    // }

    let planterBox = new PIXI.Sprite.from('assets/images/test/planterbox.png');
    planterBox.anchor.set(0.5);
    planterBox.scale.set(.75, .75);
    planterBox.x = app.screen.width / 2;
    planterBox.y = app.screen.height / 2;
    container.addChild(planterBox);

    let plot1;
    let plot2;
    let plot3;
    let plot4;
    let plot5;
    let plot6;

    let plots = {}; //Holds the white placeholder spots
    let colors = {}; //holds the color textures
    //Holds all of the plants and current textures
    let plants = {
        "plot1": "white",
        "plot2": "white",
        "plot3": "white",
        "plot4": "white",
        "plot5": "white",
        "plot6": "white",
    };

    let white = PIXI.Texture.from('assets/images/test/white.png');
    colors["white"] = white;
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

    //Might have to delete this too lol
    // if (localStorage.getObj("circles") === null) {
    //     initCircles();
    // } else {
    //     circles = localStorage.getObj("circles");
    // }

    initCircles();

    //Create the initial circles
    function initCircles() {

        plot1 = new PIXI.Sprite(white);
        createPlot(plot1, (app.screen.width / 2) - 200, (app.screen.height / 2) - 85);
        plots["plot1"] = plot1;

        plot2 = new PIXI.Sprite(white);
        createPlot(plot2, (app.screen.width / 2), (app.screen.height / 2) - 85);
        plots["plot2"] = plot2;

        plot3 = new PIXI.Sprite(white);
        createPlot(plot3, (app.screen.width / 2) + 200, (app.screen.height / 2) - 85);
        plots["plot3"] = plot3;

        plot4 = new PIXI.Sprite(white);
        createPlot(plot4, (app.screen.width / 2) - 200, (app.screen.height / 2) + 85);
        plots["plot4"] = plot4;

        plot5 = new PIXI.Sprite(white);
        createPlot(plot5, (app.screen.width / 2), (app.screen.height / 2) + 85);
        plots["plot5"] = plot5;

        plot6 = new PIXI.Sprite(white);
        createPlot(plot6, (app.screen.width / 2) + 200, (app.screen.height / 2) + 85);
        plots["plot6"] = plot6;

    }

    function createPlot(plot, x, y) {
        plot.interactive = true;
        plot.buttonMode = true;
        plot.anchor.set(0.5);
        plot.scale.set(0.95, 0.95);
        plot.x = x;
        plot.y = y;
        plot.on('pointerdown', changeColor);
    }

    Object.values(plots).forEach(plot => {
        container.addChild(plot);
    })

    //Changes the circles to the locally stored color
    if (localStorage.getItem("plantData") !== null) {
        plants = JSON.parse(localStorage.getItem("plantData"));
        let plantsArr = Object.entries(plants);
        console.log(plantsArr);
        for (let i = 0; i < plantsArr.length; i++) {
            plots[plantsArr[i][0]].texture = colors[plantsArr[i][1]];
        }
    };

    /**** Reference of manually setting the texture of a specific plot****/
    //plots["plot5"].texture = blue;
    /************/

    //Handles changing the circle color
    function changeColor() {
        let selected = Object.keys(plots)[Object.values(plots).indexOf(this)]; //Grabs the key of the selected plant plot
        let colorKey = Object.keys(colors)[rand()]; //gets a random key
        this.texture = colors[colorKey]; //changes the color of the selected plot

        plants[selected] = colorKey;
        console.log(plants);
    }

    //Generates a random number based on number of textures
    function rand() {
        return Math.floor(Math.random() * Math.floor(Object.keys(colors).length));
    }


    /*********** Animation **********/
    //Starts animation -- runs every few intervals
    const ticker = new PIXI.Ticker();
    ticker.add(animate);
    ticker.start();

    //Place positioning in here to keep items positioned regardless of window size
    function animate() {

        // background.width = window.innerWidth;
        // background.height = window.innerHeight;

        planterBox.x = app.screen.width / 2;
        planterBox.y = app.screen.height / 2;

        //Plant plots
        plot1.x = (app.screen.width / 2) - 200;
        plot1.y = (app.screen.height / 2) - 85;

        plot2.x = (app.screen.width / 2);
        plot2.y = (app.screen.height / 2) - 85;

        plot3.x = (app.screen.width / 2) + 200;
        plot3.y = (app.screen.height / 2) - 85;

        plot4.x = (app.screen.width / 2) - 200;
        plot4.y = (app.screen.height / 2) + 85;

        plot5.x = (app.screen.width / 2);
        plot5.y = (app.screen.height / 2) + 85;

        plot6.x = (app.screen.width / 2) + 200;
        plot6.y = (app.screen.height / 2) + 85;


        // for (let i = 0; i < 6; i++) {
        //     circles[i].x = (app.screen.width / 2) - ((i % 3) * 150) + 150;
        //     circles[i].y = (app.screen.height / 2) - (Math.floor(i / 3) * 150);
        // }

        localStorage.setItem('plantData', JSON.stringify(plants));

        app.render(container);
    }
});