function setup(){
    //put set up code here
    createCanvas(640,480);
    // background(178, 14, 14);
}

function draw(){
    //ellipse(50,50,80,80);
    if(mouseIsPressed){
        fill (254, 245, 198);
        stroke(214, 0, 0);  
         // Setting the outline (stroke) to black
    } else {
        fill(255)
    }
    rect(mouseX, mouseY, 80,80)
    }
