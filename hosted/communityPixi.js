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
        transparent: true,
        width: w,
        height: h,
        view: document.querySelector('#pixiCanvas'),
        resolution: 2,
        antialias: false,
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
    PIXI.settings.ROUND_PIXELS = true;
    PIXI.settings.PRECISION_FRAGMENT = 'highp';

    const container = new PIXI.Container(); //main container
    const commContainer = new PIXI.Container();
    const seedContainer = new PIXI.Container();

    let pixiCanvas = d3.select('#pixiCanvas');


    /***** BACKGROUND *****/

    let communityBackground = PIXI.Texture.from('assets/images/buildings/communityBuildingsFinalCropped.png');
    let personalBackground = PIXI.Texture.from('assets/images/buildings/personalGardenWindow2.png');
    //let background = new PIXI.Sprite(communityBackground);
    let background = new PIXI.extras.TilingSprite(communityBackground, window.innerWidth, 800);

    background.anchor.x = 0;
    background.anchor.y = 0;
    background.position.x = 0;
    background.position.y = 100;
    background.tileScale.x = .8;
    background.tileScale.y = .74;

    background.height = window.innerHeight - 100;
    //background.width = window.innerWidth;
    // background.height = window.innerHeight;
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
    for (let i = 0; i < 18; i++) {
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

    let visitComm; //Visit community garden button
    let personalView = false; //Used to indicate whether or not user is in personal or community view
    let userPersonal = false; //Used to indicate if they are seeing their own garden or someone else's
    let initialPlant = false; //Used to indicate if a user is trying to plant something

    /**************************************/

    createCommunityGarden();

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

            communityGardenArray[i].sprite.x = (app.screen.width / 2);
            communityGardenArray[i].sprite.y = (app.screen.height / 2);

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
        createNavButton();

        initCircles(garden);

        Object.values(plots).forEach(plot => {
            container.addChild(plot);
        });

        personalView = true;

    }

    function createNavButton() {
        //Visit the Community
        visitComm = new PIXI.Sprite.from('assets/images/navSign/backButton.png');
        visitComm.anchor.set(0.5);
        visitComm.scale.set(.75, .75);
        visitComm.x = app.screen.width - 200;
        visitComm.y = (app.screen.height / 2) - 45;
        visitComm.interactive = true;
        visitComm.buttonMode = true;
        visitComm.on('pointerover', () => {
            visitComm.texture = PIXI.Texture.from('assets/images/navSign/backButtonHover.png');
        });
        visitComm.on('pointerout', () => {
            visitComm.texture = PIXI.Texture.from('assets/images/navSign/backButton.png');
        });

        visitComm.on('pointerdown', () => {
            //planterBox.destroy();
            createCommunityGarden();
            destroyPersonalGardenView();
            personalView = false;
        });

        container.addChild(visitComm);
    }

    //Creates the initial circles
    //Adds them to plot object
    function initCircles(garden) {

        plot1 = new PIXI.AnimatedSprite(plotTex);
        createPlot(plot1, 375, 625, garden.username);
        plots["plot1"] = plot1;

        plot2 = new PIXI.AnimatedSprite(plotTex);
        createPlot(plot2, 475, 585, garden.username);
        plots["plot2"] = plot2;

        plot3 = new PIXI.AnimatedSprite(plotTex);
        createPlot(plot3, 600, 625, garden.username);
        plots["plot3"] = plot3;

        plot4 = new PIXI.AnimatedSprite(plotTex);
        createPlot(plot4, 700, 585, garden.username);
        plots["plot4"] = plot4;

        plot5 = new PIXI.AnimatedSprite(plotTex);
        createPlot(plot5, 850, 625, garden.username);
        plots["plot5"] = plot5;

        plot6 = new PIXI.AnimatedSprite(plotTex);
        createPlot(plot6, 925, 585, garden.username);
        plots["plot6"] = plot6;

        //If the user has already planted plants --> update the garden to show their plants
        garden.personal ? getUserPlants() : getCommunityPlants(garden.plants);

        if (garden.personal) {
            userPersonal = true;
            clearButton = new PIXI.Sprite.from('assets/images/navSign/clearButton.png');;
            clearButton.anchor.set(0.5)
            clearButton.scale.set(.75, .75);
            clearButton.interactive = true;
            clearButton.buttonMode = true;
            clearButton.x = 200;
            clearButton.y = 400;

            clearButton.on('pointerdown', () => {
                $('#clear').show();
            });
            clearButton.on('pointerover', () => {
                clearButton.texture = PIXI.Texture.from('assets/images/navSign/clearButtonHover.png');
            });
            clearButton.on('pointerout', () => {
                clearButton.texture = PIXI.Texture.from('assets/images/navSign/clearButton.png');
            });

            container.addChild(clearButton);
        } else {
            userPersonal = false;
        }
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
        plot.anchor.set(0.5, 1);
        plot.scale.set(0.75, 0.75);
        plot.x = x;
        plot.y = y;

        if (communityGardenArray[0].username === username) {
            // plot.on('pointerdown', changeColor);
            plot.interactive = true;
            plot.buttonMode = true;
            plot.on('pointerdown', (function (e) {
                console.log(plot.textures[0].textureCacheIds[0]);
                let textureName = plot.textures[0].textureCacheIds[0];
                switch (textureName) {
                    case "brown.png":
                        plotSpot = e.target; //Sets selected plot to the current target
                        createSeedPackets(e, username);
                        break;
                    case "aloe-sprout.png":
                    case "cactus-sprout.png":
                    case "fiddle-sprout.png":
                    case "jade-sprout.png":
                    case "peace-lily-sprout.png":
                    case "snake-sprout.png":
                        messageModal(e, username, "placeholder", "placeholder");
                        break;
                    default:
                        console.log("You can't add any more messages");
                }

                // if (textureName === "brown.png") {
                //     plotSpot = e.target; //Sets selected plot to the current target
                //     createSeedPackets(e, username);
                // } else {
                //     console.log(plot);
                //     //TODO: Only open modal if the plant isn't at growth stage 1
                //     messageModal(e, username, "placeholder", "placeholder");
                // }
            }));
        }
    }

    //Updates the garden to show the correct plant texture
    function updatePlots(data) {
        let plantArr = data;
        plantArr.forEach(plant => {
            if (plots[plant.location] !== undefined) {
                plots[plant.location].textures = plantCollection[plant.plantType][plant.growthStage];
                plots[plant.location].animationSpeed = 0.3;
                plots[plant.location].play();
            }
        })
    }

    function createSeedPackets(target, username) {
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
        packetButtons(aloeSeeds, "aloe", "Aloe Vera", (app.screen.width / 2) - 300, (app.screen.height / 4), 6, target, username);
        seedContainer.addChild(aloeSeeds);

        cactusSeeds = new PIXI.Sprite.from('assets/images/plant-cards/cactus-card.png');
        packetButtons(cactusSeeds, "cactus", "Cactus", (app.screen.width / 2), (app.screen.height / 4), 5, target, username);
        seedContainer.addChild(cactusSeeds);

        fiddleSeeds = new PIXI.Sprite.from('assets/images/plant-cards/fiddle-leaf-card.png');
        packetButtons(fiddleSeeds, "fiddle", "Fiddle Leaf", (app.screen.width / 2) + 300, (app.screen.height / 4), 4, target, username);
        seedContainer.addChild(fiddleSeeds);

        jadeSeeds = new PIXI.Sprite.from('assets/images/plant-cards/jade-card.png');
        packetButtons(jadeSeeds, "jade", "Jade", (app.screen.width / 2) - 300, (app.screen.height) - 200, 3, target, username);
        seedContainer.addChild(jadeSeeds);

        peaceSeeds = new PIXI.Sprite.from('assets/images/plant-cards/peace-lily-card.png');
        packetButtons(peaceSeeds, "peace", "Peace Lily", (app.screen.width / 2), (app.screen.height) - 200, 2, target, username);
        seedContainer.addChild(peaceSeeds);

        snakeSeeds = new PIXI.Sprite.from('assets/images/plant-cards/snake-plant-card.png');
        packetButtons(snakeSeeds, "snake", "Snake Plant", (app.screen.width / 2) + 300, (app.screen.height) - 200, 1, target, username);
        seedContainer.addChild(snakeSeeds);

        container.addChild(seedContainer);

        seedContainer.sortableChildren = true;
        seedContainer.children.sort((a, b) => {
            return a.zIndex - b.zIndex;
        });
        seedContainer.updateTransform();
    }

    function packetButtons(packet, seedType, plantName, x, y, z, target, username) {
        packet.interactive = true;
        packet.buttonMode = true;
        packet.anchor.set(0.5, 0.5);
        packet.x = x;
        packet.y = y;
        packet.zIndex = z;
        packet.scale.x = .9;
        packet.scale.y = .9;


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
            initialPlant = true;
            addPlant(plotSpot, seedType, plantName, 0);
            //messageModal(target, username, seedType, plantName);
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

        visitComm.destroy();

        if (userPersonal) {
            clearButton.destroy();
        }
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
            initialPlant = false;
            target.textures = plantCollection[plantType][growthStage];

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


    function messageModal(e, username, seedType, plantName) {
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

                let currentPlant, currentPlantName, currentPrompt;
                if (initialPlant) {
                    currentPlant = seedType;
                    currentPlantName = plantName
                    currentPrompt = "none"
                } else {
                    currentPlant = res.plant.plantType;
                    currentPlantName = res.plant.plantName;
                    currentPrompt = res.plant.prompt
                }

                console.log(currentPlant);
                // Changes image based on current plant clicked on
                $('#modalImg').attr("src", `assets/images/profilePlants/${currentPlant}Profile.png`);

                $('#messageTitle').text(`${userCapped}'s ${currentPlantName}`);
                $('#messageLabel').text(`Let ${userCapped} know ${currentPrompt === "none" ? 'they can achieve their goals' : res.plant.prompt}`);
                //$('#messageLabel').text(`Let ${userCapped} know they can achieve their goals`);
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
                    if (initialPlant) {
                        addPlant(plotSpot, currentPlant, plantName, 0);
                    } else {
                        plots[selectedPlot].textures = plantCollection[currentPlant][1]; //Cheese the growing of the plant
                        plots[selectedPlot].animationSpeed = 0.3;
                        plots[selectedPlot].play();
                    }
                    
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

        if (personalView) {
            background.tileScale.x = .75;
            background.tileScale.y = .8;
            background.position.y = 0;
            background.position.x = 0;

            background.height = window.innerHeight;

            visitComm.x = 450;
            visitComm.y = 675;

            if (userPersonal) {
                clearButton.x = 850;
                clearButton.y = 675;
            }

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
            background.tileScale.x = .8;
            background.tileScale.y = .74;
            background.position.x = 0;
            background.position.y = 100;

            background.height = window.innerHeight - 100;

            //communtiy plant boxes
            for (let i = 0; i < communityGardenArray.length; i++) {
                if (i % 2 == 0) {
                    // first row
                    communityGardenArray[i].sprite.y = 350;
                } else {
                    // second row
                    communityGardenArray[i].sprite.y = 500;
                }

                if (i <= 1) {
                    communityGardenArray[i].sprite.x = 380;
                } else if (i > 1 && i <= 3) {
                    communityGardenArray[i].sprite.x = 480;
                } else if (i > 3 && i <= 5) {
                    communityGardenArray[i].sprite.x = 580;
                } else if (i > 5 && i <= 7) {
                    communityGardenArray[i].sprite.x = 700;
                } else if (i > 7 && i <= 9) {
                    communityGardenArray[i].sprite.x = 800;
                } else if (i > 9 && i <= 11) {
                    communityGardenArray[i].sprite.x = 900;
                } else if (i > 11 && i <= 13) {
                    communityGardenArray[i].sprite.x = 1020;
                } else if (i > 13 && i <= 15) {
                    communityGardenArray[i].sprite.x = 1120;
                } else if (i > 15 && i <= 17) {
                    communityGardenArray[i].sprite.x = 1220;
                }

                // if(window.innerWidth <= communityGardenArray[i].sprite.x) {
                //     console.log(communityGardenArray);
                //     communityGardenArray[i].sprite.destroy();
                //     communityGardenArray.splice(i);
                // }
            }

            if (window.innerWidth <= 1220) {
                //console.log('delete some boxes');
                // communityGardenArray.pop();
                // communityGardenArray.pop();
            }
        }

        commContainer.x = 0;
        commContainer.y = 0;


        app.render(container);
    }
});