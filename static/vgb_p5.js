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



// var sound;

// function preload()
// {
// sound = loadsound("spacewhoosh.mp3");

// }

// function setup()
// {
//     createCanvas(200,200);

//     textAlign(CENTER);
//     Filler(100);
//     noStroke();
//     text("sound", width/2, height/2);

// }

// function draw()
// {

// }

// function mousePressed()
// {
//     sound.play();

// }


// let button = alert("17 Fireballs hit Earth Daily");
// let text;