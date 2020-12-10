    // // more documentation available at
    // // https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

    // // the link to your model provided by Teachable Machine export panel
    // const URLAudio = "https://teachablemachine.withgoogle.com/models/v-k7to6aL/";

    // async function createModel() {
    //     const checkpointURL = URLAudio + "model.json"; // model topology
    //     const metadataURLAudio = URLAudio + "metadata.json"; // model metadata

    //     const recognizer = speechCommands.create(
    //         "BROWSER_FFT", // fourier transform type, not useful to change
    //         undefined, // speech commands vocabulary feature, not useful for your models
    //         checkpointURL,
    //         metadataURLAudio);

    //     // check that model and metadata are loaded via HTTPS requests.
    //     await recognizer.ensureModelLoaded();

    //     return recognizer;
    // }

    // async function initAudio() {
    //     const recognizer = await createModel();
    //     const classLabels = recognizer.wordLabels(); // get class labels
    //     const audioLabelContainer = document.getElementById("label-container");
    //     for (let i = 0; i < classLabels.length; i++) {
    //         audioLabelContainer.appendChild(document.createElement("div"));
    //     }


    //     // listen() takes two arguments:
    //     // 1. A callback function that is invoked anytime a word is recognized.
    //     // 2. A configuration object with adjustable fields
    //     recognizer.listen(result => {
    //         const scores = result.scores; // probability of prediction for each class
    //         // render the probability scores per class
    //         for (let i = 0; i < classLabels.length; i++) {
    //             const audioclassPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
    //             audioLabelContainer.childNodes[i].innerHTML = audioclassPrediction;
    //         }
    //     }, {
    //         includeSpectrogram: true, // in case listen should return result.spectrogram
    //         probabilityThreshold: 0.75,
    //         invokeCallbackOnNoiseAndUnknown: true,
    //         overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
    //     });

    //     // Stop the recognition in 5 seconds.
    //     // setTimeout(() => recognizer.stopListening(), 5000);
    // }
