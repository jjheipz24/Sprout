// checks to make sure document is loaded
document.addEventListener('DOMContentLoaded', function () {
    let csrf;
    // const renderer = new PIXI.CanvasRenderer();
    // renderer.render(new PIXI.Container());
    const getToken = () => {
        sendAjax('GET', '/getToken', null, (result) => {
            csrf = result.csrfToken;
        });
    };

    getToken();

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
    const commContainer = new PIXI.Container();
    let pixiCanvas = d3.select('#pixiCanvas');


    /***** BACKGROUND *****/

    let backgroundImg = PIXI.Texture.from('assets/images/test/planter-background.png');
    let background = new PIXI.Sprite(backgroundImg);
    background.anchor.x = 0;
    background.anchor.y = 0;
    background.position.x = 0;
    background.position.y = 0;
    background.width = window.innerWidth;
    background.height = window.innerHeight;
    container.addChild(background);

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

    let clearButton; //clears the garden

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

    let gardenData; //Holds any pre-existing garden info

    let selectedSeed; //Sets the current seed a user wants to plant
    let seedName; //Sets the name of the added seed

    let aloeSeeds, cactusSeeds, fiddleSeeds, jadeSeeds, peaceSeeds, snakeSeeds; //All of the seed packets

    //All of the colors
    let brown = PIXI.Texture.from('assets/images/test/brown.png');
    colors["brown"] = brown;
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

    let garden1, garden2, garden3, garden4;

    let communityGardenArray = [garden1, garden2, garden3, garden4];

    const gardenUnhovered = PIXI.Texture.from('assets/images/smallGarden.png');
    const gardenHovered = PIXI.Texture.from('assets/images/smallGardenHover.png');

    //Nav Sign
    let pole, viewGarden, visitComm, about;
    let personal = false;

    /**************************************/

    createCommunityGarden();
    createSignNav();

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
                for (let j = 0; j < communityGardenArray.length; j++) {
                    communityGardenArray[j].destroy();
                }
                createPersonalGarden();
            });
        }
    }

    const zoomed = event => {
        const offset = [event.transform.x, event.transform.y]

        const {
            k
        } = event.transform;
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

    // Creates Personal Garden view
    function createPersonalGarden() {
        //Initializes the planter box
        planterBox = new PIXI.Sprite.from('assets/images/test/planter-angled.png');
        planterBox.anchor.set(0.5);
        planterBox.scale.set(.75, .75);
        planterBox.x = app.screen.width / 2;
        planterBox.y = app.screen.height / 2;
        container.addChild(planterBox);

        initCircles();

        Object.values(plots).forEach(plot => {
            container.addChild(plot);
        });

        createSeedPackets();

        personal = true;

        //createSignNav();
    }

    function createSignNav() {
        //pole
        pole = new PIXI.Sprite.from('assets/images/navSign/Pole.png');
        pole.anchor.set(0.5);
        pole.scale.set(.75, .75);
        pole.x = app.screen.width - 200;
        pole.y = app.screen.height / 2;

        //View Your Garden
        viewGarden = new PIXI.Sprite.from('assets/images/navSign/view-your-garden.png');
        viewGarden.anchor.set(0.5);
        viewGarden.scale.set(.75, .75);
        viewGarden.x = app.screen.width - 200;
        viewGarden.y = (app.screen.height / 2) - 110;
        viewGarden.interactive = true;
        viewGarden.buttonMode = true;
        viewGarden.on('pointerover', () => {
            viewGarden.texture = PIXI.Texture.from('assets/images/navSign/view-your-garden-hover.png');
        });
        viewGarden.on('pointerout', () => {
            viewGarden.texture = PIXI.Texture.from('assets/images/navSign/view-your-garden.png');
        });
        viewGarden.on('pointerdown', () => {
            for (let j = 0; j < communityGardenArray.length; j++) {
                communityGardenArray[j].destroy();
            }
            createPersonalGarden();
        });

        //Visit the Community
        visitComm = new PIXI.Sprite.from('assets/images/navSign/visit-community.png');
        visitComm.anchor.set(0.5);
        visitComm.scale.set(.75, .75);
        visitComm.x = app.screen.width - 200;
        visitComm.y = (app.screen.height / 2) - 45;
        visitComm.interactive = true;
        visitComm.buttonMode = true;
        visitComm.on('pointerover', () => {
            visitComm.texture = PIXI.Texture.from('assets/images/navSign/visit-community-hover.png');
        });
        visitComm.on('pointerout', () => {
            visitComm.texture = PIXI.Texture.from('assets/images/navSign/visit-community.png');
        });

        visitComm.on('pointerdown', () => {
            planterBox.destroy();
            createCommunityGarden();
            destroyPersonalGardenView();
            personal = false;
        });

        //About Sprout
        about = new PIXI.Sprite.from('assets/images/navSign/about-sprout.png');
        about.anchor.set(0.5);
        about.scale.set(.75, .75);
        about.x = app.screen.width - 200;
        about.y = (app.screen.height / 2) + 20;
        about.interactive = true;
        about.buttonMode = true;
        about.on('pointerover', () => {
            about.texture = PIXI.Texture.from('assets/images/navSign/about-sprout-hover.png');
        });
        about.on('pointerout', () => {
            about.texture = PIXI.Texture.from('assets/images/navSign/about-sprout.png');
        });

        container.addChild(pole);
        container.addChild(viewGarden);
        container.addChild(visitComm);
        container.addChild(about);
    }

    //Creates the initial circles
    //Adds them to plot object
    function initCircles() {

        // console.log($.get('/getPlants', function(data, status){
        //     console.log(data);
        // }))

        plot1 = new PIXI.Sprite(brown);
        createPlot(plot1, (app.screen.width / 2), (app.screen.height / 2));
        plots["plot1"] = plot1;

        plot2 = new PIXI.Sprite(brown);
        createPlot(plot2, (app.screen.width / 2), (app.screen.height / 2));
        plots["plot2"] = plot2;

        plot3 = new PIXI.Sprite(brown);
        createPlot(plot3, (app.screen.width / 2), (app.screen.height / 2));
        plots["plot3"] = plot3;

        plot4 = new PIXI.Sprite(brown);
        createPlot(plot4, (app.screen.width / 2), (app.screen.height / 2));
        plots["plot4"] = plot4;

        plot5 = new PIXI.Sprite(brown);
        createPlot(plot5, (app.screen.width / 2), (app.screen.height / 2));
        plots["plot5"] = plot5;

        plot6 = new PIXI.Sprite(brown);
        createPlot(plot6, (app.screen.width / 2), (app.screen.height / 2));
        plots["plot6"] = plot6;

        //If the user has already planted plants --> update the garden to show their plants
        $.get('/getPlants', function (data, status) {
            console.log(data);
            gardenData = data.plants;
            if (gardenData.length !== 0) {
                updatePlots(gardenData);
            };
        });

        clearButton = new PIXI.Sprite.from('assets/images/test/yellow.png');
        clearButton.anchor.set(0.5)
        clearButton.scale.set(.75, .75);
        clearButton.interactive = true;
        clearButton.buttonMode = true;
        clearButton.x = 200;
        clearButton.y = 400;

        clearButton.on('pointerdown', () => {
            console.log("cleared");
            $.ajax({
                url: '/clear',
                type: 'DELETE',
                headers: {
                    'x-csrf-token': csrf
                },
                success: function (result) {
                    console.log("Success")
                }
            });
        })

        container.addChild(clearButton);
    }

    //Adds the repeated properties
    function createPlot(plot, x, y) {
        plot.interactive = true;
        plot.buttonMode = true;
        plot.anchor.set(0.5);
        plot.scale.set(0.70, 0.70);
        plot.x = x;
        plot.y = y;
        // plot.on('pointerdown', changeColor);
        plot.on('pointerdown', (function (e) {
            const textureName = plot.texture.textureCacheIds[0];
            textureName === "assets/images/test/brown.png" ? addPlant(e, selectedSeed, seedName) : messageModal(e);
        }));
    }

    //Updates the garden to show the correct plant texture
    function updatePlots(data) {
        let plantArr = data;
        plantArr.forEach(plant => {
            plots[plant.location].texture = plantCollection[plant.plantType][plant.growthStage];
        })
    }

    function createSeedPackets() {
        aloeSeeds = new PIXI.Sprite.from('assets/images/plant-cards/aloe-card.png');
        packetButtons(aloeSeeds, "aloe", "Aloe Vera", (app.screen.width / 6), (app.screen.height - 100));
        container.addChild(aloeSeeds);

        cactusSeeds = new PIXI.Sprite.from('assets/images/plant-cards/cactus-card.png');
        packetButtons(cactusSeeds, "cactus", "Cactus", (app.screen.width / 6) + 200, (app.screen.height - 100));
        container.addChild(cactusSeeds);

        fiddleSeeds = new PIXI.Sprite.from('assets/images/plant-cards/fiddle-card.png');
        packetButtons(fiddleSeeds, "fiddle", "Fiddle Leaf", (app.screen.width / 6) + 400, (app.screen.height - 100));
        container.addChild(fiddleSeeds);

        jadeSeeds = new PIXI.Sprite.from('assets/images/plant-cards/jade-card.png');
        packetButtons(jadeSeeds, "jade", "Jade", (app.screen.width / 6) + 600, (app.screen.height - 100));
        container.addChild(jadeSeeds);

        peaceSeeds = new PIXI.Sprite.from('assets/images/plant-cards/peace-card.png');
        packetButtons(peaceSeeds, "peace", "Peace Lily", (app.screen.width / 6) + 800, (app.screen.height - 100));
        container.addChild(peaceSeeds);

        snakeSeeds = new PIXI.Sprite.from('assets/images/plant-cards/snake-card.png');
        packetButtons(snakeSeeds, "snake", "Snake Plant", (app.screen.width / 6) + 1000, (app.screen.height - 100));
        container.addChild(snakeSeeds);
    }

    function packetButtons(packet, seedType, plantName, x, y) {
        packet.interactive = true;
        packet.buttonMode = true;
        packet.anchor.set(0.5);
        packet.scale.set(0.60, 0.60);
        packet.x = x;
        packet.y = y;
        // plot.on('pointerdown', changeColor);
        packet.on('pointerdown', () => {
            selectedSeed = seedType;
            seedName = plantName;
        });
    }
    //Destroys each plot when personal garden is no longer in view
    function destroyPersonalGardenView() {
        plot1.destroy();
        plot2.destroy();
        plot3.destroy();
        plot4.destroy();
        plot5.destroy();
        plot6.destroy();

        clearButton.destroy();

        aloeSeeds.destroy();
        cactusSeeds.destroy();
        fiddleSeeds.destroy();
        jadeSeeds.destroy();
        peaceSeeds.destroy();
        snakeSeeds.destroy();
    }

    //Use for adding a plant to a plot
    function addPlant(e, plantType, seedName) {
        let selectedPlot = Object.keys(plots)[Object.values(plots).indexOf(e.target)]; //Location of where the seed is planted
        if (plantType === undefined) {
            console.log("No plant seeds selected");
        } else {
            e.target.texture = plantCollection[plantType][0];

            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/newPlant');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('x-csrf-token', csrf);

            const formData = `plantType=${plantType}&plantName=${seedName}&location=${selectedPlot}&prompt=test`;

            xhr.send(formData);
            e.stopPropagation();
        }

        // $.get('/getPlants', function (data, status) {
        //     console.log(data);
        // });
    }

    //TODO: Figure out a way to add the plant name (seedName)

    function messageModal(e) {
        $('#message').show();
        let selectedPlot = Object.keys(plots)[Object.values(plots).indexOf(e.target)];

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/getPlantInfo');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('x-csrf-token', csrf);

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                const user = res.username;
                const userCapped = user.charAt(0).toUpperCase() + user.slice(1);

                $('#messageTitle').text(`${userCapped}'s ${res.plant.plantName}`);
                $('#messageLabel').text(`Let ${res.username} know ${res.plant.prompt ? res.plant.prompt : 'they can achieve their goals'}`);

                $('.saveBtn').click(e => {
                    sendMessage(user, selectedPlot);
                })
            }
        };
        const formData = `location=${selectedPlot}`;
        xhr.send(formData);
    }

    function sendMessage(username, selectedPlot) {
        let message = $('#messageField').val().trim();

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/addMessage');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('x-csrf-token', csrf);

        const formData = `username=${username}&message=${message}&location=${selectedPlot}`;
        xhr.send(formData);

        $('#message').hide();
    }

    /*********** Animation **********/
    //Starts animation -- runs every few intervals
    const ticker = new PIXI.Ticker();
    ticker.add(animate);
    ticker.start();

    //Place positioning in here to keep items positioned regardless of window size
    function animate() {

        background.width = window.innerWidth;
        background.height = window.innerHeight;
        pole.x = app.screen.width - 200;
        pole.y = app.screen.height / 2;
        viewGarden.x = app.screen.width - 200;
        viewGarden.y = (app.screen.height / 2) - 110;
        visitComm.x = app.screen.width - 200;
        visitComm.y = (app.screen.height / 2) - 45;
        about.x = app.screen.width - 200;
        about.y = (app.screen.height / 2) + 20;

        if (personal) {

            clearButton.x = 200;
            clearButton.y = 400;

            planterBox.x = app.screen.width / 2;
            planterBox.y = app.screen.height / 2;

            //Plant plots
            plot1.x = (app.screen.width / 2) - 65;
            plot1.y = (app.screen.height / 2) - 115;

            plot2.x = (app.screen.width / 2) + 50;
            plot2.y = (app.screen.height / 2) - 55;

            plot3.x = (app.screen.width / 2) + 160;
            plot3.y = (app.screen.height / 2);

            plot4.x = (app.screen.width / 2) - 170;
            plot4.y = (app.screen.height / 2) - 55;

            plot5.x = (app.screen.width / 2) - 60;
            plot5.y = (app.screen.height / 2) + 20;

            plot6.x = (app.screen.width / 2) + 40;
            plot6.y = (app.screen.height / 2) + 80;

            //Seed packets
            aloeSeeds.x = (app.screen.width / 6);
            aloeSeeds.y = (app.screen.height) - 100;

            cactusSeeds.x = (app.screen.width / 6) + 200;
            cactusSeeds.y = (app.screen.height) - 100;

            fiddleSeeds.x = (app.screen.width / 6) + 400;
            fiddleSeeds.y = (app.screen.height) - 100;

            jadeSeeds.x = (app.screen.width / 6) + 600;
            jadeSeeds.y = (app.screen.height) - 100;

            peaceSeeds.x = (app.screen.width / 6) + 800;
            peaceSeeds.y = (app.screen.height) - 100;

            snakeSeeds.x = (app.screen.width / 6) + 1000;
            snakeSeeds.y = (app.screen.height) - 100;

        }

        commContainer.x = 0;
        commContainer.y = 0;


        app.render(container);
    }
});