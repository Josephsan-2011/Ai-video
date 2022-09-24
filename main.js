
objects = [];
status1 = "";

function preload() {
  video = createVideo('video.mp4');
}


function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video.hide();
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status1 = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 480, 380);
  if (status1 != "") {
    objectDetector.detect(video, gotResult)
    for (let index = 0; index < objects.length; index++) {
      document.getElementById("status").innerHTML = "Status : Objects Detected";
      document.getElementById("number_of_objects").innerHTML = "Number of objects detected " + objects.length;
      fill("black")
      percent = floor(objects[index].confidence*100);
      text(objects[index].label+" "+percent,objects[index].x,objects[index].y)
      noFill()
      stroke("red")
      rect(objects[index].x,objects[index].y,objects[index].width,objects[index].height)
    }
  }
}
