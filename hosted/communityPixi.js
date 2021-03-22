// let addWheelListener = require('./lib/addWheelListener');

// checks to make sure document is loaded
document.addEventListener('DOMContentLoaded', function () {
    let popup = document.getElementById("message");

    // const renderer = new PIXI.CanvasRenderer();
    // renderer.render(new PIXI.Container());


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

    // function zoom(garden, x, y, isZoomIn) {
    //     direction = isZoomIn ? 1 : -1;
    //     let factor = (1 + direction * 0.1);
    //     garden.scale.x *= factor;
    //     garden.scale.y *= factor;
    // }

    // Scale mode for all textures, will retain pixelation
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    const container = new PIXI.Container(); //main container
    const commContainer = new PIXI.Container();
    let pixiCanvas = d3.select('#pixiCanvas');


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
    // Global Variables

    let planterBox;

    //six hardcoded plots
    let plot1;
    let plot2;
    let plot3;
    let plot4;
    let plot5;
    let plot6;

    let plots = {}; //Holds the placeholder spots
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

    //All of the colors
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

    /**************************************/

    let garden1, garden2, garden3, garden4;

    let communityGardenArray = [garden1, garden2, garden3, garden4];

    const gardenUnhovered = PIXI.Texture.from('assets/images/smallGarden.png');
    const gardenHovered = PIXI.Texture.from('assets/images/smallGardenHover.png');

    let communityButton;
    let personal = false;

    createCommunityGarden();

    function createCommunityGarden() {
        commContainer.x = 0;
        commContainer.y = 0;
        container.addChild(commContainer);

        for (let i = 0; i < communityGardenArray.length; i++) {
            communityGardenArray[i] = new PIXI.Sprite(gardenUnhovered);
            // let frames = ["assets/images/smallGarden.png", "assets/images/smallGardenHover"]
            // communityGardenArray[i] = new PIXI.animate.MovieClip.prototype.fromFrames(frames);
            communityGardenArray[i].interactive = true;
            communityGardenArray[i].buttonMode = true;

            communityGardenArray[i].anchor.set(0.5);
            communityGardenArray[i].scale.set(.85, .85);

            if (i % 2) {
                communityGardenArray[i].x = 150;
            } else {
                communityGardenArray[i].x = 600;
            }

            if (i < 2) {
                communityGardenArray[i].y = 150;
            } else {
                communityGardenArray[i].y = 500;
            }

            // communityGardenArray[i].mouseout = function(mouseData) {
            //     // communityGardenArray[i].gotoAndStop(0);
            //     communityGardenArray[i].aplha = 1;
            // }

            commContainer.addChild(communityGardenArray[i]);

            communityGardenArray[i].on('pointerover', () => {
                communityGardenArray[i].texture = gardenHovered;
                // communityGardenArray[i].aplha = .5;
                // communityGardenArray[i].gotoAndStop(1);
            });

            communityGardenArray[i].on('pointerout', () => {
                communityGardenArray[i].texture = gardenUnhovered;
                // communityGardenArray[i].aplha = .5;
                // communityGardenArray[i].gotoAndStop(1);
            });
            communityGardenArray[i].on('pointerdown', () => {
                //console.log("app");
                for (let j = 0; j < communityGardenArray.length; j++) {
                    //console.log(j);
                    communityGardenArray[j].destroy();
                    // zoom(communityGardenArray[j], communityGardenArray[j].x, 
                    //     communityGardenArray[j].y, 100);
                }
                createPersonalGarden();
            });
        }
    }

    const zoomed = event => {
        const offset = [event.transform.x, event.transform.y]

        const {k} = event.transform;
        container.scale.set(k, k);
        container.position.set(offset[0], offset[1]);
    }

    let zoom = d3.zoom()
        .scaleExtent([1, 2])
        .translateExtent([
            [0, 0],
            [w, h]
        ])
        .on("zoom", event => zoomed(event));

    pixiCanvas.call(zoom)
        .call(zoom.transform, d3.zoomIdentity
            .scale(1));


    // let personalGarden = new PIXI.Sprite.from('assets/images/smallGarden.png');
    // personalGarden.anchor.set(0.5);
    // personalGarden.scale.set(.85, .85);
    // personalGarden.x = app.screen.width / 2;
    // personalGarden.y = app.screen.height / 2;
    // container.addChild(personalGarden);


    // Creates Personal Garden view
    function createPersonalGarden() {
        //Initializes the planter box
        planterBox = new PIXI.Sprite.from('assets/images/test/planterbox.png');
        planterBox.anchor.set(0.5);
        planterBox.scale.set(.75, .75);
        planterBox.x = app.screen.width / 2;
        planterBox.y = app.screen.height / 2;
        container.addChild(planterBox);

        initCircles();

        Object.values(plots).forEach(plot => {
            container.addChild(plot);
        })

        //Changes the circles to the locally stored color
        if (localStorage.getItem("plantData") !== null) {
            plants = JSON.parse(localStorage.getItem("plantData"));
            let plantsArr = Object.entries(plants); //converts parsed JSON object to array
            //console.log(plantsArr);
            for (let i = 0; i < plantsArr.length; i++) {
                plots[plantsArr[i][0]].texture = colors[plantsArr[i][1]];
            }
        };

        personal = true;

        createSignNav();
    }

    function createSignNav() {
        //community button
        communityButton = new PIXI.Sprite.from('assets/images/communityButton.png');
        communityButton.anchor.set(0.5);
        communityButton.scale.set(.75, .75);
        communityButton.x = app.screen.width - 200;
        communityButton.y = app.screen.height / 4;

        communityButton.interactive = true;
        communityButton.buttonMode = true;

        communityButton.on('pointerdown', () => {
            planterBox.destroy();
            createCommunityGarden();
            destroyCircles();
            personal = false;
            container.removeChild(this);
            communityButton.destroy();
        });

        container.addChild(communityButton);
    }

    //Creates the initial circles
    //Adds them to plot object
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

    function destroyCircles() {
        plot1.destroy();
        plot2.destroy();
        plot3.destroy();
        plot4.destroy();
        plot5.destroy();
        plot6.destroy();
    }

    //Adds the repeated properties
    function createPlot(plot, x, y) {
        plot.interactive = true;
        plot.buttonMode = true;
        plot.anchor.set(0.5);
        plot.scale.set(0.95, 0.95);
        plot.x = x;
        plot.y = y;
        plot.on('pointerdown', changeColor);
    }

    //Handles changing the circle color
    function changeColor() {
        let selected = Object.keys(plots)[Object.values(plots).indexOf(this)]; //Grabs the key of the selected plant plot
        let colorKey = Object.keys(colors)[rand()]; //gets a random key
        this.texture = colors[colorKey]; //changes the color of the selected plot

        plants[selected] = colorKey; //Updates the selected plot's color value in plants object
        //console.log(plants);
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

        if (personal) {
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

            localStorage.setItem('plantData', JSON.stringify(plants)); //sends plants object to local storage

            communityButton.x = app.screen.width - 200;
            communityButton.y = app.screen.height / 4;

        }

        commContainer.x = 0;
        commContainer.y = 0;


        app.render(container);
    }
});