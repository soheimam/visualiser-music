var song;
var amp;
var button;
var fft = new p5.FFT();
var colorPalette = ["#000", "#72fbfd", "#54B1D9", "#00CC99"];


function toggleSong() {
    if (song.isPlaying()) {
      song.pause();
    } else {
      song.play();
    }
  }

  function preload() {
    song = loadSound('song2.mp3');
  }
  
  function setup() {
    createCanvas(windowWidth, windowHeight);
    button = createButton('toggle');
    button.mousePressed(toggleSong);
    song.play();
    fft = new p5.FFT();
    pieces = 6;
    radius = windowHeight / 2;
    
  }

  function draw() {

    

    background(colorPalette[0]);

    fft.analyze();
    var bass = fft.getEnergy("bass");
    var treble = fft.getEnergy(100, 150);


    var mapbass = map(bass, 0, 255, -100, 800);
    var scalebass = map(bass, 0, 255, 0.5, 1.2);

    var mapTreble = map(treble, 0, 255, -radius / 2, radius * 2);
    var scaleTreble = map(treble, 0, 255, 1, 1.5);

    mapMouseX = map(mouseX, 0, width, 2, 0.1);
    mapMouseY = map(mouseY, 0, height, windowHeight / 4, windowHeight / 6);

    pieces = mapMouseX;
    radius = mapMouseY;



    translate(width / 2, height / 2);

    for (i = 0; i < pieces; i += 0.01) {

        rotate(TWO_PI * pieces);

        push();
        strokeWeight(1);
        stroke(colorPalette[1]);
        scale(scalebass);
        rotate(frameCount * -0.5);
        line(mapbass, radius / 2, radius, radius);
        line(-mapbass, -radius / 2, radius, radius);
        pop();

     
        push();
        stroke(colorPalette[3]);
        scale(scaleTreble);
        line(mapTreble, radius / 2, radius, radius);
        pop();

    }

}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}