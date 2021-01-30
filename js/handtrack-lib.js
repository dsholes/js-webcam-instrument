const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

let isVideo = false;
let model = null;
let noteOff = true;

const modelParams = {
  flipHorizontal: true,   // flip e.g for video  
  maxNumBoxes: 2,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.7,    // confidence threshold for predictions.
}

trackButton.addEventListener("click", function () {
  Tone.start()
  toggleVideo();
});

function toggleVideo() {
  if (!isVideo) {
    updateNote.innerText = "Starting video"
    startVideo();
  } else {
    updateNote.innerText = "Stopping video"
    handTrack.stopVideo(video)
    isVideo = false;
    updateNote.innerText = "Video stopped"
  }
}

function startVideo() {
  handTrack.startVideo(video).then(function (status) {
    console.log("video started", status);
    if (status) {
      updateNote.innerText = "Video started. Now tracking"
      isVideo = true
      runDetection()
    } else {
      updateNote.innerText = "Please enable video"
    }
  });
}

function runDetection() {
  model.detect(video).then(predictions => {
    console.log("Predictions: ", predictions);
    if (Object.keys(predictions).length !== 0) {
      var [x,y,width,height] = predictions[0]['bbox'];
      var bbox_center_x = ((x + width) / 2) / 450;
      var bbox_center_y = ((y + height) / 2) / 338;
      updateNote.innerText = [bbox_center_x,bbox_center_y]
      //updateNote.innerText = predictions[0]['bbox'];
      console.log(bbox_center_x);
      move(bbox_center_x, bbox_center_y);
      if (noteOff){
        triggerAttack(bbox_center_x, bbox_center_y);
        noteOff = false;
      }
    } else {
      if (noteOff == false){
        synth.triggerRelease();
        noteOff = true
      }
    }
    model.renderPredictions(predictions, canvas, context, video);
    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
  // detect objects in the image.
  model = lmodel
  updateNote.innerText = "Loaded Model!"
  trackButton.disabled = false
});