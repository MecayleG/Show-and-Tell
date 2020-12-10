const URL = "https://teachablemachine.withgoogle.com/models/txUw7MWU2/";
const URLAudio = "https://teachablemachine.withgoogle.com/models/v-k7to6aL/";


let model, webcam, labelContainer, maxPredictions;

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
    }


    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    recognizer.listen(result => {
        const scores = result.scores; // probability of prediction for each class
        // render the probability scores per class
        for (let i = 0; i < classLabels.length; i++) {
            const audioclassPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
            // audioLabelContainer.childNodes[i].innerHTML = audioclassPrediction;
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

const fruitList = ['apple', 'banana', 'orange'];

const appleConfirmation = new Audio('audio/confirm_apple.mp3');
const bananaConfirmation = new Audio('audio/confirm_banana.mp3');
const orangeConfirmation = new Audio('audio/confirm_orange.mp3');

const appleFact1 = new Audio('audio/facts_apple.mp3');
const appleQuestion1 = new Audio('audio/apple1.mp3');
const appleQuestion2 = new Audio('audio/apple2.mp3');


async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

function checkFruit(){

    if(fruitList === "apple"){

    appleConfirmation.play();

    }
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);

    let highestProb = 0.90;
    let fruitName = '';

    prediction.forEach(function(element) {
        console.log(element);
        if (element.probability > highestProb) {
            fruitName = element.className;
            if (fruitName === 'Apple') {

                appleConfirmation.play()
            }
        }
        // } else if (fruitName === 'Banana') {
        //     bananaConfirmation.play()
        // } else if (fruitName === 'Orange') {
        //     orangeConfirmation.play()
        // }
        console.log(fruitName)
    }); // for (let i = 0; i < maxPredictions; i++) {
    //     const classPrediction =
    //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //     console.log(classPrediction);
    //     if (classPrediction > 0.95) {
    //     }

    // labelContainer.childNodes[i].innerHTML = classPrediction;
}