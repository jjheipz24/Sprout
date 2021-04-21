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
        backgroundColor: 0x62C4D4,
        width: w,
        height: h,
        view: document.querySelector('#pixiCanvas'),
        resolution: window.devicePixelRatio,
        //resolution: 1,
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
    const seedContainer = new PIXI.Container();

    let pixiCanvas = d3.select('#pixiCanvas');


    /***** BACKGROUND *****/

    let communityBackground = PIXI.Texture.from('assets/images/buildings/communityBuildingsFinal2.png');
    let personalBackground = PIXI.Texture.from('assets/images/PersonalBackground.png');
    let background = new PIXI.Sprite(communityBackground);
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

    let gardenData; //Holds any pre-existing garden info

    let plotSpot; //Place where user wants seed planted

    let seedPacketsVisible; //boolean that says whether or not the seed packets are displaying

    let aloeSeeds, cactusSeeds, fiddleSeeds, jadeSeeds, peaceSeeds, snakeSeeds; //All of the seed packets

    //All of the colors
    let brown = PIXI.Texture.from('assets/images/test/brown.png');
    let blue = PIXI.Texture.from('assets/images/test/blue.png');
    let orange = PIXI.Texture.from('assets/images/test/orange.png');
    let green = PIXI.Texture.from('assets/images/test/green.png');
    let pink = PIXI.Texture.from('assets/images/test/pink.png');
    let purple = PIXI.Texture.from('assets/images/test/purple.png');
    let yellow = PIXI.Texture.from('assets/images/test/yellow.png');

    let communityGardenArray = [];

    //bump up to 20 instead of 4 when we're ready for the full community garden
    for (let i = 0; i < 8; i++) {
        let personal;
        //if you want personal garden to not be the first garden, change the conditional # to something other than 0
        i === 0 ? personal = true : personal = false;

        communityGardenArray.push({
            name: `garden${i}`,
            num: i,
            personal,
        })
    }

    $.get('/getUserName', function (data, status) {
        communityGardenArray[0].username = data.username;
    });

    const gardenUnhovered = PIXI.Texture.from('assets/images/buildings/c-planterbox.png');
    const gardenHovered = PIXI.Texture.from('assets/images/buildings/c-planterbox-hover.png');

    //Nav Sign
    let pole, viewGarden, visitComm, about;
    let personal = false;

    /**************************************/

    createCommunityGarden();
    createSignNav();

    function createCommunityGarden() {
        background.texture = communityBackground;
        commContainer.x = 0;
        commContainer.y = 0;
        container.addChild(commContainer);
        pullGardens();

        for (let i = 0; i < communityGardenArray.length; i++) {
            communityGardenArray[i].sprite = new PIXI.Sprite(gardenUnhovered);
            // let frames = ["assets/images/smallGarden.png", "assets/images/smallGardenHover"]
            // communityGardenArray[i] = new PIXI.animate.MovieClip.prototype.fromFrames(frames);
            communityGardenArray[i].sprite.interactive = true;
            communityGardenArray[i].sprite.buttonMode = true;

            communityGardenArray[i].sprite.anchor.set(0.5);
            communityGardenArray[i].sprite.scale.set(.85, .85);

            // if (i % 2) {
            //     communityGardenArray[i].sprite.x = 150;
            // } else {
            //     communityGardenArray[i].sprite.x = 600;
            // }

            // if (i < 2) {
            //     communityGardenArray[i].sprite.y = 150;
            // } else {
            //     communityGardenArray[i].sprite.y = 500;
            // }

            // communityGardenArray[i].mouseout = function(mouseData) {
            //     // communityGardenArray[i].gotoAndStop(0);
            //     communityGardenArray[i].aplha = 1;
            // }

            commContainer.addChild(communityGardenArray[i].sprite);

            communityGardenArray[i].sprite.on('pointerover', () => {
                communityGardenArray[i].sprite.texture = gardenHovered;
                // communityGardenArray[i].aplha = .5;
                // communityGardenArray[i].gotoAndStop(1);
            });

            communityGardenArray[i].sprite.on('pointerout', () => {
                communityGardenArray[i].sprite.texture = gardenUnhovered;
                // communityGardenArray[i].aplha = .5;
                // communityGardenArray[i].gotoAndStop(1);
            });
            communityGardenArray[i].sprite.on('pointerdown', () => {
                for (let j = 0; j < communityGardenArray.length; j++) {
                    communityGardenArray[j].sprite.destroy();
                }
                createPersonalGarden(communityGardenArray[i]);
            });
        }
        // row 1, column 1 - top left
        communityGardenArray[0].sprite.x = (app.screen.width / 2) - 110;
        communityGardenArray[0].sprite.y = (app.screen.height / 2) - 110;

        // row 1, column 2 - top middle
        communityGardenArray[1].sprite.x = (app.screen.width / 2);
        communityGardenArray[1].sprite.y = (app.screen.height / 2) - 110;

        // row 1, column 3 - top right
        communityGardenArray[2].sprite.x = (app.screen.width / 2) + 110;
        communityGardenArray[2].sprite.y = (app.screen.height / 2) - 110;

        // row 2, column 1 - middle left
        communityGardenArray[3].sprite.x = (app.screen.width / 2) - 110;
        communityGardenArray[3].sprite.y = (app.screen.height / 2) + 42;

        // row 2, column 2 - middle middle
        communityGardenArray[4].sprite.x = (app.screen.width / 2);
        communityGardenArray[4].sprite.y = (app.screen.height / 2) + 42;

        // row 2, column 3 - middle left
        communityGardenArray[5].sprite.x = (app.screen.width / 2) + 110;
        communityGardenArray[5].sprite.y = (app.screen.height / 2) + 42;

        // row 3, column 2 - bottom middle
        communityGardenArray[6].sprite.x = (app.screen.width / 2) + 10;
        communityGardenArray[6].sprite.y = (app.screen.height / 2) + 250;

        // row 3, column 3 - bottom bottom lol
        communityGardenArray[7].sprite.x = (app.screen.width / 2) + 120;
        communityGardenArray[7].sprite.y = (app.screen.height / 2) + 250;
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
    function createPersonalGarden(garden) {
        background.texture = personalBackground;
        //Initializes the planter box
        planterBox = new PIXI.Sprite.from('assets/images/planterBox.png');
        planterBox.anchor.set(0.5);
        planterBox.scale.set(.75, .75);
        planterBox.x = app.screen.width / 2 + 50;
        planterBox.y = app.screen.height / 2 - 35;
        container.addChild(planterBox);

        console.log(garden);
        initCircles(garden);

        Object.values(plots).forEach(plot => {
            container.addChild(plot);
        });

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
                communityGardenArray[j].sprite.destroy();
            }
            createPersonalGarden(communityGardenArray[0]);
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
    function initCircles(garden) {

        plot1 = new PIXI.Sprite(brown);
        createPlot(plot1, (app.screen.width / 2), (app.screen.height / 2), garden.username);
        plots["plot1"] = plot1;

        plot2 = new PIXI.Sprite(brown);
        createPlot(plot2, (app.screen.width / 2), (app.screen.height / 2), garden.username);
        plots["plot2"] = plot2;

        plot3 = new PIXI.Sprite(brown);
        createPlot(plot3, (app.screen.width / 2), (app.screen.height / 2), garden.username);
        plots["plot3"] = plot3;

        plot4 = new PIXI.Sprite(brown);
        createPlot(plot4, (app.screen.width / 2), (app.screen.height / 2), garden.username);
        plots["plot4"] = plot4;

        plot5 = new PIXI.Sprite(brown);
        createPlot(plot5, (app.screen.width / 2), (app.screen.height / 2), garden.username);
        plots["plot5"] = plot5;

        plot6 = new PIXI.Sprite(brown);
        createPlot(plot6, (app.screen.width / 2), (app.screen.height / 2), garden.username);
        plots["plot6"] = plot6;

        //If the user has already planted plants --> update the garden to show their plants
        garden.personal ? getUserPlants() : getCommunityPlants(garden.plants);

        clearButton = new PIXI.Sprite(yellow);
        clearButton.anchor.set(0.5)
        clearButton.scale.set(.75, .75);
        clearButton.interactive = true;
        clearButton.buttonMode = true;
        clearButton.x = 200;
        clearButton.y = 400;

        clearButton.on('pointerdown', () => {
           $('#clear').show();
        })

        container.addChild(clearButton);

    }

    function getUserPlants() {
        $.get('/getPlants', function (data, status) {
            console.log(data);
            gardenData = data.plants;
            if (gardenData.length !== 0) {
                updatePlots(gardenData);
            };
        });
    }

    function getCommunityPlants(plants) {
        gardenData = plants;
        if (plants.length !== 0) {
            updatePlots(gardenData);
        }
    }


    //Adds the repeated properties
    function createPlot(plot, x, y, username) {
        plot.interactive = true;
        plot.buttonMode = true;
        plot.anchor.set(0.5, 1);
        plot.scale.set(0.75, 0.75);
        plot.x = x;
        plot.y = y;
        // plot.on('pointerdown', changeColor);
        plot.on('pointerdown', (function (e) {
            const textureName = plot.texture.textureCacheIds[0];
            if (textureName === "assets/images/test/brown.png") {
                plotSpot = e.target; //Sets selected plot to the current target
                createSeedPackets();
            } else {
                //TODO: Only open modal if the plant isn't at growth stage 1
                messageModal(e, username)
            }
        }));
    }

    //Updates the garden to show the correct plant texture
    function updatePlots(data) {
        let plantArr = data;
        plantArr.forEach(plant => {
            if (plots[plant.location] !== undefined) {
                plots[plant.location].texture = plantCollection[plant.plantType][plant.growthStage];
            }

        })
    }

    function createSeedPackets() {
        seedPacketsVisible = true;

        closeButton = new PIXI.Sprite.from('assets/images/test/pink.png');
        closeButton.anchor.set(0.5)
        closeButton.scale.set(.75, .75);
        closeButton.interactive = true;
        closeButton.buttonMode = true;
        closeButton.x = (app.screen.width / 6) - 100;
        closeButton.y = (app.screen.height / 2) - 100;

        closeButton.on('pointerdown', () => {
            destroySeedPackets();
        });

        container.addChild(closeButton);

        aloeSeeds = new PIXI.Sprite.from('assets/images/plant-cards/aloe-card.png');
        packetButtons(aloeSeeds, "aloe", "Aloe Vera", (app.screen.width / 2) - 300, (app.screen.height / 4), 6);
        seedContainer.addChild(aloeSeeds);

        cactusSeeds = new PIXI.Sprite.from('assets/images/plant-cards/cactus-card.png');
        packetButtons(cactusSeeds, "cactus", "Cactus", (app.screen.width / 2), (app.screen.height / 4), 5);
        seedContainer.addChild(cactusSeeds);

        fiddleSeeds = new PIXI.Sprite.from('assets/images/plant-cards/fiddle-card.png');
        packetButtons(fiddleSeeds, "fiddle", "Fiddle Leaf", (app.screen.width / 2) + 300, (app.screen.height / 4), 4);
        seedContainer.addChild(fiddleSeeds);

        jadeSeeds = new PIXI.Sprite.from('assets/images/plant-cards/jade-card.png');
        packetButtons(jadeSeeds, "jade", "Jade", (app.screen.width / 2) - 300, (app.screen.height) - 200, 3);
        seedContainer.addChild(jadeSeeds);

        peaceSeeds = new PIXI.Sprite.from('assets/images/plant-cards/peace-card.png');
        packetButtons(peaceSeeds, "peace", "Peace Lily", (app.screen.width / 2), (app.screen.height) - 200, 2);
        seedContainer.addChild(peaceSeeds);

        snakeSeeds = new PIXI.Sprite.from('assets/images/plant-cards/snake-card.png');
        packetButtons(snakeSeeds, "snake", "Snake Plant", (app.screen.width / 2) + 300, (app.screen.height) - 200, 1);
        seedContainer.addChild(snakeSeeds);

        container.addChild(seedContainer);

        seedContainer.sortableChildren = true;
        seedContainer.children.sort((a, b) => {
            return a.zIndex - b.zIndex;
        });
        seedContainer.updateTransform();
    }

    function packetButtons(packet, seedType, plantName, x, y, z) {
        packet.interactive = true;
        packet.buttonMode = true;
        //packet.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        //packet.scale.set(1.5, 1.5);
        packet.anchor.set(0.5);
        packet.x = x;
        packet.y = y;
        packet.zIndex = z;

        //Attempt to make seed packet move to the front on hover
        // packet.on('pointerover', () => {
        //     const ogX = packet.x;
        //     const ogIdx = seedContainer.children.indexOf(packet);

        //     const first = seedContainer.children[5];

        //     packet.x = seedContainer.children[5].x;
        //     seedContainer.children[5] = packet;

        //     seedContainer.children[ogIdx] = first;
        //     seedContainer.children[ogIdx].x = ogX;
        // });

        packet.on('pointerdown', () => {

            addPlant(plotSpot, seedType, plantName, 0);
            destroySeedPackets();
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
    }

    function destroySeedPackets() {
        aloeSeeds.destroy();
        cactusSeeds.destroy();
        fiddleSeeds.destroy();
        jadeSeeds.destroy();
        peaceSeeds.destroy();
        snakeSeeds.destroy();
        closeButton.destroy();
        container.removeChild(seedContainer);
        seedPacketsVisible = false;
    }

    //Use for adding a plant to a plot
    function addPlant(target, plantType, seedName, growthStage) {
        //let selectedPlot = Object.keys(plots)[Object.values(plots).indexOf(e.target)]; //Location of where the seed is planted
        let selectedPlot = Object.keys(plots)[Object.values(plots).indexOf(target)]; //Location of where the seed is planted
        if (plantType === undefined) {
            console.log("No plant seeds selected");
        } else {
            target.texture = plantCollection[plantType][growthStage];

            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/newPlant');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('x-csrf-token', csrf);

            const formData = `plantType=${plantType}&plantName=${seedName}&location=${selectedPlot}&growthStage=${growthStage}&prompt=test`;

            xhr.send(formData);
            // add something here to add the plant to the gardenData so it can appear/disappear

            // gardenData.push({formData}); -- not quite right hmm
            // console.log('in addplant', gardenData);
            //e.stopPropagation();
        }
    }


    function messageModal(e, username) {
        $('#message').show();
        let selectedPlot = Object.keys(plots)[Object.values(plots).indexOf(e.target)];

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/getPlantInfo');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('x-csrf-token', csrf);

        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const res = JSON.parse(this.responseText);
                const userCapped = username.charAt(0).toUpperCase() + username.slice(1);
                let currentPlant = res.plant.plantType;
                let currentPlantName = res.plant.plantName;

                // Changes image based on current plant clicked on
                $('#modalImg').attr("src", `assets/images/profilePlants/${res.plant.plantType}Profile.png`);

                $('#messageTitle').text(`${userCapped}'s ${res.plant.plantName}`);
                $('#messageLabel').text(`Let ${userCapped} know ${res.plant.prompt ? res.plant.prompt : 'they can achieve their goals'}`);
                $('.saveBtn').off();
                $('.saveBtn').on("click", function () {
                    sendMessage(username, selectedPlot, currentPlant, currentPlantName);
                })
            }
        };
        const formData = `location=${selectedPlot}&username=${username}`;
        xhr.send(formData);
    }

    function sendMessage(username, selectedPlot, currentPlant, plantName) {
        // let message = $('#messageField').val().trim();
        let message = document.querySelector('#messageField').value;
        message = message.trim();
        if (message === null || message === "") {
            console.log("Please type a message");
        } else {
            console.log('sending message!');
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/addMessage');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('x-csrf-token', csrf);

            //This runs if the http request was sent!!
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    //TODO: make an updatePlant/growPlant function
                    //addPlant(plots[selectedPlot], currentPlant, plantName, 1);
                    plots[selectedPlot].texture = plantCollection[currentPlant][1]; //Cheese the growing of the plant
                    document.querySelector('#messageField').value = "";
                    $('#message').hide();
                }
            };

            const formData = `username=${username}&message=${message}&location=${selectedPlot}`;
            xhr.send(formData);
        }

    }

    /*********************** COMMUNITY GARDEN TIME ***********************/
    function pullGardens() {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', '/loadRandomGardens');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const randomGardens = JSON.parse(xhr.response).randomGardens;

                communityGardenArray.forEach(garden => {
                    if (!garden.personal) {
                        garden.username = randomGardens[garden.num] ? randomGardens[garden.num].username : 'test';
                        garden.plants = randomGardens[garden.num] ? randomGardens[garden.num].plants : [];
                    }
                });
            }
        };

        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('x-csrf-token', csrf);

        xhr.send();
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
        pole.x = 200;
        pole.y = ((app.screen.height / 2) + 125);
        viewGarden.x = 200;
        viewGarden.y = ((app.screen.height / 2) + 20);
        visitComm.x = 200;
        visitComm.y = ((app.screen.height / 2) + 85);
        about.x = 200;
        about.y = ((app.screen.height / 2) + 150);

        if (personal) {

            clearButton.x = 600;
            clearButton.y = 600;

            planterBox.x = app.screen.width / 2 + 50;
            planterBox.y = app.screen.height / 2 - 35;

            //Plant plots
            plot1.x = (app.screen.width / 2) - 300;
            plot1.y = (app.screen.height / 2) - 85;

            plot2.x = (app.screen.width / 2) - 50;
            plot2.y = (app.screen.height / 2) - 85;

            plot3.x = (app.screen.width / 2) + 200;
            plot3.y = (app.screen.height / 2) - 85;

            plot4.x = (app.screen.width / 2) - 200;
            plot4.y = (app.screen.height / 2) + 10;

            plot5.x = (app.screen.width / 2) + 40;
            plot5.y = (app.screen.height / 2) + 10;

            plot6.x = (app.screen.width / 2) + 280;
            plot6.y = (app.screen.height / 2) + 10;

            if (seedPacketsVisible) {
                //Seed packets
                aloeSeeds.x = (app.screen.width / 2) - 300;
                aloeSeeds.y = (app.screen.height / 4);

                cactusSeeds.x = (app.screen.width / 2);
                cactusSeeds.y = (app.screen.height / 4);

                fiddleSeeds.x = (app.screen.width / 2) + 300;
                fiddleSeeds.y = (app.screen.height / 4);

                jadeSeeds.x = (app.screen.width / 2) - 300;
                jadeSeeds.y = (app.screen.height) - 200;

                peaceSeeds.x = (app.screen.width / 2);
                peaceSeeds.y = (app.screen.height) - 200;

                snakeSeeds.x = (app.screen.width / 2) + 300;
                snakeSeeds.y = (app.screen.height) - 200;
            }

        } else {
            //communtiy plant boxes
            // row 1, column 1 - top left
            communityGardenArray[0].sprite.x = (app.screen.width / 2) - 110;
            communityGardenArray[0].sprite.y = (app.screen.height / 2) - 110;

            // row 1, column 2 - top middle
            communityGardenArray[1].sprite.x = (app.screen.width / 2);
            communityGardenArray[1].sprite.y = (app.screen.height / 2) - 110;

            // row 1, column 3 - top right
            communityGardenArray[2].sprite.x = (app.screen.width / 2) + 110;
            communityGardenArray[2].sprite.y = (app.screen.height / 2) - 110;

            // row 2, column 1 - middle left
            communityGardenArray[3].sprite.x = (app.screen.width / 2) - 110;
            communityGardenArray[3].sprite.y = (app.screen.height / 2) + 42;

            // row 2, column 2 - middle middle
            communityGardenArray[4].sprite.x = (app.screen.width / 2);
            communityGardenArray[4].sprite.y = (app.screen.height / 2) + 42;

            // row 2, column 3 - middle left
            communityGardenArray[5].sprite.x = (app.screen.width / 2) + 110;
            communityGardenArray[5].sprite.y = (app.screen.height / 2) + 42;

            // row 3, column 2 - bottom middle
            communityGardenArray[6].sprite.x = (app.screen.width / 2) + 10;
            communityGardenArray[6].sprite.y = (app.screen.height / 2) + 250;

            // row 3, column 3 - bottom bottom lol
            communityGardenArray[7].sprite.x = (app.screen.width / 2) + 120;
            communityGardenArray[7].sprite.y = (app.screen.height / 2) + 250;
        }


        commContainer.x = 0;
        commContainer.y = 0;


        app.render(container);
    }
});