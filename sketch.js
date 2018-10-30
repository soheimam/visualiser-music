let song;
let amp;
let button;

let volhistory = [];

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('song.mp3');
}

function setup() {
  createCanvas(1200, 800);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();
  console.log(amp)
}

function draw() {
  background(0);
  let vol = amp.getLevel();
  volhistory.push(vol);
  // console.log(volhistory);
  stroke(255);
  fill(0, 255, 191,1);

  translate(width / 2, height / 2);
  beginShape();
  for (let i = 0; i < 360; i++) {
    let r = map(volhistory[i],0, 1, 10, 400);
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }

}