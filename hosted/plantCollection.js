let plantCollection = {}; //Holds the collection of plants
let plotTex;
const loader = PIXI.Loader.shared;

/* sprite sheets babey! */
loader
    .add("assets/images/sprite-sheets/snake.json")
    .add("assets/images/sprite-sheets/snake-sprout.json")
    .add("assets/images/sprite-sheets/peace-lily.json")
    .add("assets/images/sprite-sheets/peace-lily-sprout.json")
    .add("assets/images/sprite-sheets/jade.json")
    .add("assets/images/sprite-sheets/jade-sprout.json")
    .add("assets/images/sprite-sheets/fiddle-leaf.json")
    .add("assets/images/sprite-sheets/fiddle-sprout.json")
    .add("assets/images/sprite-sheets/cactus.json")
    .add("assets/images/sprite-sheets/cactus-sprout.json")
    .add("assets/images/sprite-sheets/aloe.json")
    .add("assets/images/sprite-sheets/aloe-sprout.json")
    .add("assets/images/sprite-sheets/brown.json")
    .load(init);

/*************Adding all of the plants to the collection *********/
// [0] -- sprout stage
// [1] -- full growth

function init() {
    console.log("sprite sheets loaded!");
    const brownSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/brown.json"].spritesheet;
    plotTex = brownSheet.animations["brown"];

    let aloeSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/aloe.json"].spritesheet;
    let aloeSproutSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/aloe-sprout.json"].spritesheet;
    plantCollection["aloe"] = [];
    plantCollection["aloe"][0] = aloeSproutSheet.animations["aloe-sprout"];
    plantCollection["aloe"][1] = aloeSheet.animations["Aloe"];

    let fiddleSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/fiddle-leaf.json"].spritesheet;
    let fiddleSproutSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/fiddle-sprout.json"].spritesheet;
    plantCollection["fiddle"] = [];
    plantCollection["fiddle"][0] = fiddleSproutSheet.animations["fiddle-sprout"];
    plantCollection["fiddle"][1] = fiddleSheet.animations["Fiddle Leaf"];

    let jadeSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/jade.json"].spritesheet;
    let jadeSproutSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/jade-sprout.json"].spritesheet;
    plantCollection["jade"] = [];
    plantCollection["jade"][0] = jadeSproutSheet.animations["jade-sprout"];
    plantCollection["jade"][1] = jadeSheet.animations["Jade"];

    let peaceSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/peace-lily.json"].spritesheet;
    let peaceSproutSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/peace-lily-sprout.json"].spritesheet;
    plantCollection["peace"] = [];
    plantCollection["peace"][0] = peaceSproutSheet.animations["peace-lily-sprout"];
    plantCollection["peace"][1] = peaceSheet.animations["Peace Lilly"];

    let snakeSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/snake.json"].spritesheet;
    let snakeSproutSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/snake-sprout.json"].spritesheet;
    plantCollection["snake"] = [];
    plantCollection["snake"][0] = snakeSproutSheet.animations["snake-sprout"]
    plantCollection["snake"][1] = snakeSheet.animations["snake-plant"];

    let cactusSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/cactus.json"].spritesheet;
    let cactusSproutSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/cactus-sprout.json"].spritesheet;
    plantCollection["cactus"] = [];
    plantCollection["cactus"][0] = cactusSproutSheet.animations["cactus-sprout"];
    plantCollection["cactus"][1] = cactusSheet.animations["Cactus"];

    /*************************************************************/
}