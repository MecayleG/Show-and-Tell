const URL = "https://teachablemachine.withgoogle.com/models/txUw7MWU2/";
const URLAudio = "https://teachablemachine.withgoogle.com/models/v-k7to6aL/";

let model, webcam, labelContainer, maxPredictions, listening = false, currentWordSpoken = "", fruitName = "";

const introduction = new Audio('audio/intro.mp3');

const appleConfirmation = new Audio('audio/confirm_apple.mp3');
const bananaConfirmation = new Audio('audio/confirm_banana.mp3');
const orangeConfirmation = new Audio('audio/confirm_orange.mp3');

const appleFact = new Audio('audio/facts_apple.mp3');
const appleQuestion1 = new Audio('audio/apple1.mp3');
const appleQuestion2 = new Audio('audio/apple2.mp3');

function startListening() {
    listening = true;
    currentWordSpoken = ""
}

function stopListening() {
    listening = false;
    currentWordSpoken = "";
}

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}
//setting up the audio model

async function createModel() {
    const checkpointURL = URLAudio + "model.json"; // model topology
    const metadataURLAudio = URLAudio + "metadata.json"; // model metadata

    const recognizer = speechCommands.create(
        "BROWSER_FFT", // fourier transform type, not useful to change
        undefined, // speech commands vocabulary feature, not useful for your models
        checkpointURL,
        metadataURLAudio);

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();

    return recognizer;
}

async function initAudio() {
    const recognizer = await createModel();
    const classLabels = recognizer.wordLabels(); // get class labels
    const audioLabelContainer = document.getElementById("label-container");
    for (let i = 0; i < classLabels.length; i++) {
        audioLabelContainer.appendChild(document.createElement("div"));
        console.log(audioLabelContainer);
    }


    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    recognizer.listen(result => {
        const scores = result.scores; // probability of prediction for each class
        // render the probability scores per class
        
        const highVoice = 0.90;
        let command = ''
        if (listening) { 
            
            
            for (let i = 0; i < classLabels.length; i++) {
                const scoresList = result.scores[i].toFixed(2);
                const scoreLabel = classLabels[i]
                // const audioclassPrediction = scoreLevels  + ": " + scoresList.toFixed(2);
                // get the highest score
                if (scoresList > highVoice) {
                    command = scoreLabel

                    // if(fruitName === ""){
                    //     introduction.play();
                    // }
                    if (fruitName !== "") {
                        predict();
                        startListening()
                        // yes  do what you want todo
                        switch (command) {
                            case 'Yes':
                                stopListening();
                               appleFact.play();
                                break;
                            case 'No':
                                // orangeConfirmation.play();
                               stopListening();
                                break;
                            default:
                                return "";
                        }
                    }
                //         else if (fruitName == ""){
                //             introduction.play();

                       
                // }
    console.log(command);
                    
            }

            // const scoreLevels = result.scores[i];
            // console.log(scoresLevels)

            
            // const highVoice = 0.90;
            // const command = ''
            // // get the highest score
            // if (scoresList > highVoice) {
            //     command = scoreLevels
            // }
            // if this score is high

            // at this point we should have a fruitName
            
                setTimeout(function(){
                    
                    
                    stopListening()  },7000);
                    
                // 
                // appleFact1.play();
                // hide the div
                // no
            }



        }




    }, {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
    });

    // Stop the recognition in 5 seconds.
    // setTimeout(() => recognizer.stopListening(), 5000);
}




async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}





var playedIntro = false;

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);

    let highestProb = 0.90;

    if (!playedIntro) {
        introduction.play();
        playedIntro = true;
    } else {

        prediction.forEach(function (element) {
            // console.log(element);
            if (element.probability > highestProb) {
                fruitName = element.className;
    
    
                switch (fruitName) {
                    case 'Apple':
                        appleConfirmation.play();
                        startListening();
                        break;
                    case 'Orange':
                        orangeConfirmation.play();
                        startListening();
                        break;
                    default:
                        
                        setTimeout(function(){
                            introduction.pause() ;
                            introduction.currentTime = 0;
                     },3000);
        
                } 
    
            }     
    });

    
}
}


        // } else if (fruitName === 'Banana') {
        //     bananaConfirmation.play()
        // } else if (fruitName === 'Orange') {
        //     orangeConfirmation.play()

    /// for (let i = 0; i < maxPredictions; i++) {
    //     const classPrediction =
    //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //     console.log(classPrediction);
    //     if (classPrediction > 0.95) {
    //     }

    // labelContainer.childNodes[i].innerHTML = classPrediction;
