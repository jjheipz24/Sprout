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
    .add("assets/images/sprite-sheets/aloe-seeds.json")
    .add("assets/images/sprite-sheets/brown.json")
    .load(init);

/*************Adding all of the plants to the collection *********/
// [0] -- seed stage
// [1] -- sprout stage
// [2] -- full growth

function init() {
    console.log("sprite sheets loaded!");
    const brownSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/brown.json"].spritesheet;
    plotTex = brownSheet.animations["brown"];

    let aloeSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/aloe.json"] !== undefined ? PIXI.Loader.shared.resources["assets/images/sprite-sheets/aloe.json"].spritesheet : "no sheet";
    let aloeSproutSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/aloe-sprout.json"] !== undefined ? PIXI.Loader.shared.resources["assets/images/sprite-sheets/aloe-sprout.json"].spritesheet : "no sheet";
    let aloeSeedSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/aloe-seeds.json"] !== undefined ? PIXI.Loader.shared.resources["assets/images/sprite-sheets/aloe-seeds.json"].spritesheet : "no sheet";
    plantCollection["aloe"] = [];
    plantCollection["aloe"][0] = aloeSeedSheet !== "no sheet" ? aloeSeedSheet.animations["aloe-seeds"] : [PIXI.Texture.from("assets/images/plants/seeds.png")];
    plantCollection["aloe"][1] = aloeSproutSheet !== "no sheet" ? aloeSproutSheet.animations["aloe-sprout"] : [PIXI.Texture.from("assets/images/plants/aloe-sprout.png")];
    plantCollection["aloe"][2] = aloeSheet !== "no sheet" ? aloeSheet.animations["Aloe"] : [PIXI.Texture.from("assets/images/plants/aloe.png")];

    let fiddleSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/fiddle-leaf.json"] !== undefined ? PIXI.Loader.shared.resources["assets/images/sprite-sheets/fiddle-leaf.json"].spritesheet : "no sheet";
    let fiddleSproutSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/fiddle-sprout.json"] !== undefined ? PIXI.Loader.shared.resources["assets/images/sprite-sheets/fiddle-sprout.json"].spritesheet : "no sheet";
    plantCollection["fiddle"] = [];
    plantCollection["fiddle"][0] = fiddleSproutSheet !== "no sheet" ? fiddleSproutSheet.animations["fiddle-sprout"] : [PIXI.Texture.from("assets/images/plants/fiddle-sprout.png")];
    plantCollection["fiddle"][1] = fiddleSheet !== "no sheet" ? fiddleSheet.animations["Fiddle Leaf"] : [PIXI.Texture.from("assets/images/plants/fiddle-leaf.png")];

    let jadeSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/jade.json"] !== undefined ? PIXI.Loader.shared.resources["assets/images/sprite-sheets/jade.json"].spritesheet : "no sheet";
    let jadeSproutSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/jade-sprout.json"] !== undefined ? PIXI.Loader.shared.resources["assets/images/sprite-sheets/jade-sprout.json"].spritesheet : "no sheet";
    plantCollection["jade"] = [];
    plantCollection["jade"][0] = jadeSproutSheet !== "no sheet" ? jadeSproutSheet.animations["jade-sprout"] : [PIXI.Texture.from("assets/images/plants/jade-sprout.png")];
    plantCollection["jade"][1] = jadeSheet !== "no sheet" ? jadeSheet.animations["Jade"] : [PIXI.Texture.from("assets/images/plants/jade.png")];

    let peaceSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/peace-lily.json"] !== undefined ? PIXI.Loader.shared.resources["assets/images/sprite-sheets/peace-lily.json"].spritesheet : "no sheet";
    let peaceSproutSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/peace-lily-sprout.json"] !== undefined ? PIXI.Loader.shared.resources["assets/images/sprite-sheets/peace-lily-sprout.json"].spritesheet : "no sheet";
    plantCollection["peace"] = [];
    plantCollection["peace"][0] = peaceSproutSheet !== "no sheet" ? peaceSproutSheet.animations["peace-lily-sprout"] : [PIXI.Texture.from('assets/images/plants/peace-lily-sprout.png')];
    plantCollection["peace"][1] = peaceSheet !== "no sheet" ? peaceSheet.animations["Peace Lilly"] : [PIXI.Texture.from('assets/images/plants/peace-lily.png')];

    let snakeSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/snake.json"] !== undefined ? PIXI.Loader.shared.resources["assets/images/sprite-sheets/snake.json"].spritesheet : "no sheet";
    let snakeSproutSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/snake-sprout.json"] !== undefined ? PIXI.Loader.shared.resources["assets/images/sprite-sheets/snake-sprout.json"].spritesheet : "no sheet";
    plantCollection["snake"] = [];
    plantCollection["snake"][0] = snakeSproutSheet !== "no sheet" ? snakeSproutSheet.animations["snake-sprout"] : [PIXI.Texture.from('assets/images/plants/snake-sprout.png')];
    plantCollection["snake"][1] = snakeSheet !== "no sheet" ? snakeSheet.animations["snake-plant"] : [PIXI.Texture.from('assets/images/plants/snake.png')];

    let cactusSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/cactus.json"] !== undefined ? PIXI.Loader.shared.resources["assets/images/sprite-sheets/cactus.json"].spritesheet : "no sheet";
    let cactusSproutSheet = PIXI.Loader.shared.resources["assets/images/sprite-sheets/cactus-sprout.json"] !== undefined ? PIXI.Loader.shared.resources["assets/images/sprite-sheets/cactus-sprout.json"].spritesheet : "no sheet";
    plantCollection["cactus"] = [];
    plantCollection["cactus"][0] = cactusSproutSheet !== "no sheet" ? cactusSproutSheet.animations["cactus-sprout"] : [PIXI.Texture.from('assets/images/plants/cactus-sprout.png')];
    plantCollection["cactus"][1] = cactusSheet !== "no sheet" ? cactusSheet.animations["Cactus"] : [PIXI.Texture.from('assets/images/plants/cactus.png')];
    /*************************************************************/
}