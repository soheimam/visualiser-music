
let song;
let button;
let fft = new p5.FFT();
let colorPalette = ["#0C0A3E", "#e500ff", "#54B1D9", "#00CC99", "#5dff00"];



  function preload() {
    song = loadSound('../assets/music/song4.mp3');
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    song.play();
    fft = new p5.FFT();
    pieces = 32;
    radius = 200;
    
  }

  function draw() {

    

    background(colorPalette[0]);

    fft.analyze();
    var bass = fft.getEnergy(60,250);
    var treble = fft.getEnergy(100, 150);
    var mid = fft.getEnergy(2, 500);

    var mapbass = map(bass,100,140,180,220);
    var scalebass = map(bass, 0, 255, 0.5, 1.2);

    var mapTreble = map( treble, 0, 255, -200, 200 );
    var scaleTreble = map(treble, 0, 255, 1, 1.5);

    var mapmid = map( mid, 100, 200, 355, 455 );
    var scalemid = map(mid, 60, 255, 1, 1.5);

    mapMouseX = map(mouseX, 0, width, 2, 0.1);
    mapMouseY = map(mouseY, 0, height, windowHeight / 4, windowHeight / 6);

    pieces = mapMouseX;
    radius = mapMouseY;

    translate(width / 2, height / 2);

    for (i = 0; i < pieces; i += 0.01) {

        rotate(TWO_PI * pieces);
        push();
        strokeWeight(1);
        noFill();
        stroke(colorPalette[2]);
        scale(scalebass *2);
        rotate(frameCount * 0.5);
        ellipse(0, mapbass, 20, mapbass);
        pop();

        push();
        strokeWeight(1);
        stroke(colorPalette[4]);
        scale(scaleTreble * 0.5);
        line(mapTreble, radius / 2, radius, mapMouseX);
        line(radius, mapTreble * 2, mapTreble,  mapMouseY);
        line(radius, radius* 2, mapTreble,  mapMouseY);
        pop();

        push();
        noFill();
        strokeWeight(1);
        stroke(colorPalette[1]);
        scale(scalemid);
        rotate(frameCount * 0.8);
        ellipse(0, mapmid, 20, mapmid);
        ellipse(0, mapmid * 2, 20, mapmid *2);
        pop();
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}