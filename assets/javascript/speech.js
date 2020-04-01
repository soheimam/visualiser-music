
let font

function preload() {
  font = loadFont('../assets/spacegrotesk-medium.otf')
}

function collectObject(identifier){
  return  document.getElementById(identifier)
}


const startButton =  collectObject('start')
const stopButton = collectObject('stop')


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
// var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();

// objectRec = {}

// var properties = [];
// var objectRec = {};
// objectRec["01"] = properties.label;
// objectRec["02"] = properties.value;
// properties.push(objectRec);

let graphic






startButton.onclick = () => {
  recognition.start()

    
}
stopButton.onclick = () => {
  location.reload();
  // recognition.stop()  
 
}


recognition.onresult = function(event) {
  // console.log(event)
  // console.log(event.results[0][0])
  upDateText(event.results[0][0].transcript)
}

const upDateText = (event) => {
  return new Promise((resolve, reject) => {
      var text = event
      
      graphic.text(text, windowWidth*0.5,windowHeight *0.5 - 100)

      console.log(text)
      resolve(text)
  })
}



  function setup() {
      return new Promise((resolve, reject) => {
        createCanvas(windowWidth, windowHeight);
        background(178, 14, 14);
        graphic = createGraphics(windowWidth, windowHeight);

        graphic.textFont(font)
        graphic.fill('#FFFFFF')
        graphic.textSize(200);
        graphic.textAlign(CENTER,CENTER);
        
        resolve()
      })
  }

  function draw() {

  //
    background("#000000")

   
    
    const tiles = 60;
    const tileSize = windowWidth / tiles
    
    // loop over each tile
    for (let x = 0; x < tiles; x++) {
      //the first for loop runs 10 times
    
      for (let y = 0; y < tiles; y++)
       {
       
        // our second for loop runs 10 times for every loop x runs 
        // y * 10

        // the speed of the wave frameCount * 0.05
        // the total equation is the distance of the wave 
        //x * 0.5 this controls the speed of the x axis - note the smaller the we times the less difference
        //there is between frames
        const distortion = sin(frameCount * 0.05 + x * 0.2 + y * 0.5 + 20) * 70
     
        // think of this as applying the grid to the source in the graphics buffer
        //sx where we start X
        const sx = x *  tileSize +  distortion 
        //sy wwhere we start Y 
        const sy = y * tileSize +  (distortion * 0.5 - 20)

        const sw =  tileSize 
        //the height of the tile
        const sh =  tileSize 
  
        // and this as applying the grid to the destination on the canvas
        //where it lands on the x
        const dx = x * tileSize
        //where we it lands on the Y
        const dy = y * tileSize  
        //the width when it animates
        const dw = tileSize 
        //height when it animates 
        const dh = tileSize  
  
        //	grided image from buffer into main canvas
        image(graphic, dx, dy, dw, dh, sx, sy, sw, sh)
     }
    }


  }

  
 function mousePressed() {
  clear();
}
  
