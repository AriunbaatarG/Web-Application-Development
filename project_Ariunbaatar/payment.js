$(document).ready(function () {
  $("#paymentForm").on("submit", function (event) {
    event.preventDefault();

    setTimeout(function () {
      alert("Your payment has been accepted!");
      window.location.href = "index.html";
    }, 2000);
  });

  var isDrawing = false;
  var lastX = 0;
  var lastY = 0;
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  $(canvas).mousedown(function (e) {
    isDrawing = true;
    var rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
  });

  $(canvas).mousemove(function (e) {
    if (!isDrawing) return;
    var rect = canvas.getBoundingClientRect();
    var currentX = e.clientX - rect.left;
    var currentY = e.clientY - rect.top;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(currentX, currentY);
    context.strokeStyle = "#000";
    context.lineWidth = 7;
    context.lineCap = "round";
    context.stroke();
    lastX = currentX;
    lastY = currentY;
  });

  $(canvas).mouseup(function () {
    isDrawing = false;
  });

  $(canvas).mouseout(function () {
    isDrawing = false;
  });
});
