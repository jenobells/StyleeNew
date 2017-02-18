var app = angular.module("styleCamera", []);

app.controller("cameraController", function($scope) {
  $scope.video = document.getElementById("video");
  $scope.canvas = document.getElementById("canvas");
  // Let's mirror the video so it looks like a normal selfie cam
  $scope.video.style.cssText =
    "-moz-transform: scale(-1, 1); \
     -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
     transform: scale(-1, 1); filter: FlipH;";

  // Get access to the camera!
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      $scope.video.src = window.URL.createObjectURL(stream);
      $scope.video.play();
    });
  }

  $scope.photos = [];

  $scope.takePhoto = function() {
    // Elements for taking the snapshot
    $scope.context = canvas.getContext("2d");
    $scope.video = document.getElementById("video");

    $scope.canvas.width = $scope.video.videoWidth;
    $scope.canvas.height = $scope.video.videoHeight;
    $scope.context.drawImage($scope.video, 0, 0, $scope.video.videoWidth, $scope.video.videoHeight);
    $scope.photos.unshift(canvas.toDataURL('image/png'));
    // Also mirror the canvas so it is the exact copy of the pic
    $scope.canvas.style.cssText =
       "display: none \
       -moz-transform: scale(-1, 1); \
       -webkit-transform: scale(-1, 1); \
       -o-transform: scale(-1, 1); \
       transform: scale(-1, 1); \
       filter: FlipH; \
       width: 100%";
  }
});
