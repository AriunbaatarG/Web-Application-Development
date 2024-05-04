document.addEventListener("DOMContentLoaded", function () {
  const box = document.getElementById("box");

  function setWidthHeight() {
    const width = document.getElementById("boxWidth").value;
    const height = document.getElementById("boxHeight").value;
    box.style.width = width + "px";
    box.style.height = height + "px";
  }

  function setBorderSize() {
    const borderWidth = document.getElementById("borderWidth").value;
    box.style.borderWidth = borderWidth + "px";
  }

  function setBorderColor(color) {
    box.style.borderColor = color;
  }

  function setBorderStyle(style) {
    box.style.borderStyle = style;
  }

  function setBoxBackgroundColor(color) {
    box.style.backgroundColor = color;
  }

  document
    .querySelector(".setWidthHeight")
    .addEventListener("click", setWidthHeight);

  document
    .querySelector(".boxBorder button")
    .addEventListener("click", setBorderSize);

  document
    .querySelector(".button_color_green")
    .addEventListener("click", () => setBorderColor("green"));
  document
    .querySelector(".button_color_red")
    .addEventListener("click", () => setBorderColor("red"));
  document
    .querySelector(".button_color_orange")
    .addEventListener("click", () => setBorderColor("orange"));

  const buttonStyles = document.querySelectorAll(".button_style");
  buttonStyles.forEach(function (button) {
    button.addEventListener("click", function () {
      setBorderStyle(button.textContent.toLowerCase());
    });
  });

  document
    .querySelector(".border_color_green")
    .addEventListener("click", () => setBoxBackgroundColor("green"));
  document
    .querySelector(".border_color_red")
    .addEventListener("click", () => setBoxBackgroundColor("red"));
  document
    .querySelector(".border_color_orange")
    .addEventListener("click", () => setBoxBackgroundColor("orange"));
});
