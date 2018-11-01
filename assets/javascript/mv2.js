function myFunction() {
    alert("This page contains flashing colours and movement.");
  }
  let song;
  let button;
  let fft = new p5.FFT();
  let colorPalette = ["#0C0A3E", "#ff9900", "#DAFF7D", "#FFE74C", "#FF5964"];

  
function preload() {
  song = loadSound('song2.mp3');
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    button = createButton('Pause');
    button.mousePressed(toggleSong);
    song.play();
    fft = new p5.FFT();
    pieces = 4;
    radius = windowHeight / 4;   
  }
  function draw() {
      background(colorPalette[0]);
      fft.analyze();
      let bass = fft.getEnergy("bass");
      let mid = fft.getEnergy(60, 250);
      let treble = fft.getEnergy(100, 150);

      let mapbass = map(bass, 0, 255, 100, -800);
      let scalebass = map(bass, 0, 255, 0.5, 1.2);

      let mapMid = map(mid, 0, 255, -radius * 2, radius * 2);
      var scaleMid = map(mid, 0, 255, 1, 1.5);

      let mapTreble = map(treble, 0, 255, -radius / 2, radius * 2);
      let scaleTreble = map(treble, 0, 255, 1, 1.5);

      mapMouseX = map(mouseX, 0, width, 2, 0.1);
      mapMouseY = map(mouseY, 0, height, windowHeight / 4, windowHeight / 6);

    pieces = mapMouseX;
    radius = mapMouseY;
      
    translate(width / 2, height / 2);
      for (let i = 0; i < pieces; i+= 0.1) {
          
          rotate(QUARTER_PI * pieces);
          noFill();

            push();
            strokeWeight(1);
            stroke(colorPalette[3]);
            // scale(scalebass);
            rotate(frameCount * -0.5);
            strokeWeight(2)
            fill(colorPalette[3])
            ellipse(600, 600, mapbass, mapbass)
            // line(mapbass + i / 2, mapbass - i / 2, mapMouseY * i / 2, 3);
            // line(mapbass - i / 2, mapTreble + i / 2, mapMouseX * i / 2, 3);
            pop();

            //
            //-mapbass, -radius / 2, radius, radius
            
            push();
        stroke(colorPalette[4]);
        scale(scaleMid);
        rotate(frameCount * -0.8);
        strokeWeight(2)
        line(mapMid, radius / 2, radius, radius);
        pop();
        
            push();
            stroke(colorPalette[1]);
            scale(scaleTreble * 0.5);
            strokeWeight(2)
            line(mapTreble + i / 2, mapTreble - i / 2, mapMouseY * i / 2, 3);
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