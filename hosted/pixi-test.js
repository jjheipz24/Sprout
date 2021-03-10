// const { render } = require("node-sass");

// checks to make sure document is loaded
document.addEventListener('DOMContentLoaded', function () {
    let popup = document.getElementById("message");

    let w = window.innerWidth;
    let h = window.innerHeight;
    // Creates pixi app
    // const app = new PIXI.Application({
    const app = new PIXI.Renderer({
        // backgroundColor: 0x043535,
        backgroundColor: 0xffffff,
        width: w,
        height: h,
        view: document.querySelector('#pixiCanvas'),
        resolution: window.devicePixelRatio,
        autoDensity: true
    });

    // document.body.appendChild(app.view);

    window.addEventListener('resize', resize);

    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;

        app.resize(w, h);
    }

    // Scale mode for all textures, will retain pixelation
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    // creates sprite from image
    //const sprite = PIXI.Sprite.from('plant.png');

    const container = new PIXI.Container(); //main container

    // // Move container to the center
    // container.x = (app.screen.width / 2) - (container.width / 2);
    // container.y = (app.screen.height / 2) - (container.height / 2);

    // // // Center sprite in local container coordinates
    // container.pivot.x = container.width / 2;
    // container.pivot.y = container.height / 2;
    // app.stage.addChild(container);


    let plants = []; //Holds an array of the plants spawned
    let pos = 0; //sets the initial position
    const staticButtonTexture = PIXI.Texture.from('assets/images/button.png');
    const hoveredButtonTexture = PIXI.Texture.from('assets/images/button-hover.png');

    //BUTTON: Generates a new plant
    const addPlantButton = new PIXI.Sprite(staticButtonTexture);
    addPlantButton.anchor.set(0.5);
    addPlantButton.interactive = true;
    addPlantButton.buttonMode = true;
    // addPlantButton.x = 0;
    // addPlantButton.y = 0;

    addPlantButton
        .on('pointerdown', addPlant)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);
    // app.stage.addChild(addPlantButton);
    container.addChild(addPlantButton);

    let colors = []
    let blue = PIXI.Texture.from('assets/images/test/blue.png');
    let orange = PIXI.Texture.from('assets/images/test/orange.png');
    
    let test = new PIXI.Sprite(blue);
    let test2 = new PIXI.Sprite(orange);
    test.anchor.set(0.5);
    test.scale.set(.75, .75);
    test2.anchor.set(0.5);
    test2.scale.set(.75, .75);

    colors.push(test2);

    colors[0].x = 500;
    colors[0].y = 300;

    container.addChild(test);
    container.addChild(colors[0]);
    //Adds plants
    function addPlant() {

        //Only lets 6 plants get planted
        if (pos < 6) {
            let newPlant = new PIXI.Sprite.from('assets/images/plant.png');
            newPlant.anchor.set(0.5);
            newPlant.x = (app.screen.width / 2) + (pos % 3) * 80;
            newPlant.y = (app.screen.height / 2) + Math.floor(pos / 3) * 100;
            newPlant.scale.set(.075, .075);

            newPlant.interactive = true;
            newPlant.buttonMode = true;
            newPlant.on('pointerdown', onClick);
            plants.push(newPlant);
            container.addChild(newPlant);

            pos++;
        } else {
            console.log("Too many plants");
        }

    }

    let numClicks = 0;

    function onClick() {
        if (numClicks < 5) {
            this.scale.x *= 1.25;
            this.scale.y *= 1.25;
            numClicks++;
            displayPopup();
        } else {
            console.log("cant grow any more today :(");
        }

    }

    function displayPopup() {
        popup.style.display = "block";
    }

    function onButtonOver() {
        this.texture = hoveredButtonTexture;
    }

    function onButtonOut() {
        this.texture = staticButtonTexture;
    }


    /*********** Animation **********/
    //Starts animation -- runs every few intervals
    const ticker = new PIXI.Ticker();
    ticker.add(animate);
    ticker.start();

    //Place positioning in here to keep items positioned regardless of window size
    function animate() {
        addPlantButton.x = 120;
        addPlantButton.y = 100;
        test.x = app.screen.width / 2;
        test.y = app.screen.height / 2;

        app.render(container);
    }

});