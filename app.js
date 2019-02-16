// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/jpg");
    //alert(cameraSensor.toDataURL("image/webp"));
    //download(cameraSensor.toDataURL("image/jpg"), "Test123.png", "image/png");
    Upload(cameraSensor.toDataURL("image/jpg"));
    cameraOutput.classList.add("taken");
    // track.stop();
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);


// Install ServiceWorker
if ('serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.');
  navigator.serviceWorker.register( '/camera-app/part-2/sw.js' , { scope : ' ' } ).then(function() {
    console.log('CLIENT: service worker registration complete.');
  }, function() {
    console.log('CLIENT: service worker registration failure.');
  });
} else {
  console.log('CLIENT: service worker is not supported.');
}

function Upload(sData)
{
    var xValue = { "Data": sData};
    //$.ajax({
    //    type: "POST",
    //    data: JSON.stringify(xData),
    //    url: "http://localhost:64176/api/values",
    //    dataType: "json",
    //    context: document.body,
    //    contentType: 'application/json; charset=utf-8'
    //})success: function (result) {
    //    alert(result);
    //};

    //$.ajax({
    //    async: false,
    //    type: "POST",
    //    url: "http://localhost:64176/api/values",
    //    data: JSON.stringify(xData),
    //    dataType: "json",
    //    contentType: 'application/json; charset=utf-8'
    //}).success(function (data) {
    //    alert(data);
    //    });


    $.ajax({
        type: 'POST',
        url: 'http://localhost:800/api/values',
        data: xValue,
        dataType: "json",
        contentType: 'application/x-www-form-urlencoded',
        success: function (result) {
            alert("OK");
        },
        error: function (err) {
           // alert(err);
        }
    });

}
