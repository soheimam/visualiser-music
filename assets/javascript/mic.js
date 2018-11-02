let mic;

function setup(){
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
}

function draw(){

  background(0) ;
 
 

  console.log(vol)
  fill(131, 255, 0);
  noStroke();
  
    var vol = mic.getLevel();
    ellipse(windowWidth/2, windowHeight/2, 500, vol * 500);


    
   
}