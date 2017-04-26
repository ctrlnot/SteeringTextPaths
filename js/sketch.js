var font;
var word;
var fontSize = 224;

var vehicles = [];

function preload() {
    font = loadFont('fonts/AvenirNextLTPro-Demi.otf');
}

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('content');

    newSketch();
}

function draw() {
    background(51);

    for (var i = 0; i < vehicles.length; i++) {
        var v = vehicles[i];
        v.behaviors();
        v.update();
        v.show();
    }
}

function newSketch() {
    // Remove last sketch
    for (var i = vehicles.length - 1; i >= 0; i--) {
        vehicles.splice(i, 1);
    }

    textFont(font);
    textSize(fontSize);
    word = document.getElementById("input-word").value;
    var points = font.textToPoints(word, width / 2, height / 2, fontSize);

    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var r = random(100, 255);
        var g = random(100, 255);
        var b = random(100, 255);
        var vehicle = new Vehicle(pt.x - Math.floor(textWidth(word) / 2), pt.y + 50, r, g, b);
        vehicles.push(vehicle);
    }
}