function collectObject(identifier){
  return  document.getElementById(identifier)
}


const startButton =  collectObject('start')
const stopButton = collectObject('stop')
const userOutput = collectObject('output')

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



startButton.onclick = () => {
  recognition.start()

    
}
stopButton.onclick = () => {
  recognition.end()   
}


recognition.onresult = function(event) {
  // console.log(event)
  // console.log(event.results[0][0])
  upDateText(event)
}

const upDateText = (event) => {
  return new Promise((resolve, reject) => {
      var text = event
      userOutput.innerHTML = text
      resolve(text)
  })
}

  function setup() {
      return new Promise((resolve, reject) => {
      createCanvas(640,480);
      background(178, 14, 14);
      
      resolve()
      })
  }
