let plantCollection = {}; //Holds the collection of plants

/*************Adding all of the plants to the collection *********/
// [0] -- sprout stage
// [1] -- full growth

let aloeSprout = PIXI.Texture.from('assets/images/plants/aloe-sprout.png');
let aloe = PIXI.Texture.from('assets/images/plants/aloe.png');
plantCollection["aloe"] = [];
plantCollection["aloe"][0] = aloeSprout;
plantCollection["aloe"][1] = aloe;

let fiddleSprout = PIXI.Texture.from('assets/images/plants/fiddle-sprout.png');
let fiddleLeaf = PIXI.Texture.from('assets/images/plants/fiddle-leaf.png');
plantCollection["fiddle"] = [];
plantCollection["fiddle"][0] = fiddleSprout;
plantCollection["fiddle"][1] = fiddleLeaf;

let jadeSprout = PIXI.Texture.from('assets/images/plants/jade-sprout.png');
let jade = PIXI.Texture.from('assets/images/plants/jade.png');
plantCollection["jade"] = [];
plantCollection["jade"][0] = jadeSprout;
plantCollection["jade"][1] = jade;

let peaceSprout = PIXI.Texture.from('assets/images/plants/peace-lily-sprout.png');
let peaceLily = PIXI.Texture.from('assets/images/plants/peace-lily.png');
plantCollection["peace"] = [];
plantCollection["peace"][0] = peaceSprout;
plantCollection["peace"][1] = peaceLily;

let snakeSprout = PIXI.Texture.from('assets/images/plants/snake-sprout.png');
let snake = PIXI.Texture.from('assets/images/plants/snake.png');
plantCollection["snake"] = [];
plantCollection["snake"][0] = snakeSprout;
plantCollection["snake"][1] = snake;

/*************************************************************/