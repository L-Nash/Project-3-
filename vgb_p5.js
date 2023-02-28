var song;
var button;

function setup() {
    createCanvas(200,200);
    song = loadSound("spacewhoosh.mp3", loaded);
    button = createButton("sound");
    button.mousePressed(togglePlaying);
    background(51);

}
function loaded() {
    console.log("loaded");

}

function togglePlaying(){
    song.play();
    song.setVolume(0.3);
    button.html("sound");
}

