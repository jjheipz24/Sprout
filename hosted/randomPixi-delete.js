    // Opt-in to interactivity
    // sprite.interactive = true;

    //   // scales sprite
    //   sprite.scale.set(.1 , .1 );

    // // Shows hand cursor
    // sprite.buttonMode = true;

    // // Pointers normalize touch and mouse
    // sprite.on('pointerdown', onClick);

    // // Alternatively, use the mouse & touch events:
    // // sprite.on('click', onClick); // mouse-only
    // // sprite.on('tap', onClick); // touch-only

    // app.stage.addChild(sprite);

    
    for (let i = 0; i < 5; i++) {
        createSeed(
            ((i % 5) * 40) + 50,
            (Math.floor(i / 5) * 40) + 25,
        );
    }

    function createSeed(x, y) {
        // create seed
        const plant = PIXI.Sprite.from('assets/images/seed.png');

        // scales sprite
        plant.scale.set(.1, .1);

        // enable the seed to be interactive... this will allow it to respond to mouse and touch events
        plant.interactive = true;

        // this button mode will mean the hand cursor appears when you roll over the seed with your mouse
        plant.buttonMode = true;

        // center the seed's anchor point
        plant.anchor.set(0.5);

        // make it a bit bigger, so it's easier to grab
        //plant.scale.set(3);

        // setup events for mouse + touch using
        // the pointer events
        plant
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove)


        // For mouse-only events
        // .on('mousedown', onDragStart)
        // .on('mouseup', onDragEnd)
        // .on('mouseupoutside', onDragEnd)
        // .on('mousemove', onDragMove);

        // For touch-only events
        // .on('touchstart', onDragStart)
        // .on('touchend', onDragEnd)
        // .on('touchendoutside', onDragEnd)
        // .on('touchmove', onDragMove);

        // move the sprite to its designated position
        plant.x = x;
        plant.y = y;

        // add it to the stage
        // app.stage.addChild(plant);
    }

    function onDragStart(event) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    function onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }

    function onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }


    // Create grid of plants
    // for (let i = 0; i < 5; i++) {
    //     const plant = new PIXI.Sprite.from('assets/images/plant.png');
    //     plant.anchor.set(0.5);
    //     plant.x = (i % 5) * 80;
    //     plant.y = Math.floor(i / 5) * 40;
    //     plant.scale.set(.075, .075);

    //     //making plants interactive
    //     plant.interactive = true;
    //     plant.buttonMode = true;
    //     plant.on('pointerdown', onClick);

    //     container.addChild(plant);
    // }

    // Set the initial position
    // sprite.anchor.set(0.5);
    // sprite.x = app.screen.width / 2;
    // sprite.y = app.screen.height / 2;  