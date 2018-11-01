function myFunction() {
  alert("This page contains flashing colours and movement.");
}
let song;
let button;
let fft = new p5.FFT();
let colorPalette = ["#0C0A3E", "#e500ff", "#54B1D9", "#00CC99", "#5dff00"];



  function preload() {
    song = loadSound('../assets/music/song.mp3');
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    button = createButton('Pause');
    button.mousePressed(toggleSong);
    song.play();
    fft = new p5.FFT();
    pieces = 6;
    radius = windowHeight / 2;
    
  }

  function draw() {

    

    background(colorPalette[0]);

    fft.analyze();
    var bass = fft.getEnergy(10,250);
    var treble = fft.getEnergy(100, 150);
    var mid = fft.getEnergy(60, 250);

    var mapbass = map(bass, 0, 255, -100, 800);
    var scalebass = map(bass, 0, 255, 0.5, 1.2);

    var mapTreble = map(treble, 0, 255, -radius / 2, radius * 2);
    var scaleTreble = map(treble, 0, 255, 1, 1.5);

    var mapmid = map(mid, 0, 255, -radius * 2, radius * 2);
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
        stroke(colorPalette[2]);
        scale(scalebass);
        rotate(frameCount * -0.5);
        line(mapbass, radius / 2, radius, radius);
  
        line(-mapbass, -radius / 2, radius, radius);
        pop();

     
        push();
        stroke(colorPalette[1]);
        scale(scaleTreble * 0.5);
        line(mapTreble, radius / 2, radius, radius);
        pop();

        push();
        stroke(colorPalette[4]);
        scale(scalemid);
        rotate(frameCount * 0.8);
        line(mapmid, -radius * 2, radius, radius);
        pop();

    }

}
function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}