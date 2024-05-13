$(document).ready(function () {
  let user = {
    username: "admin",
    password: "password123",
  };

  $("form").on("submit", function (e) {
    e.preventDefault();

    var inputUsername = $("#username").val();
    var inputPassword = $("#password").val();

    if (inputUsername === user.username && inputPassword === user.password) {
      $(".loginpage").hide();
      $(".clubmanager").hide();
      $(".footer").hide();
      $("#loginlink").text("Log out");

      fetch("gamesData.json")
        .then((response) => response.json())
        .then((data) => displayGameData(data.games))
        .catch((error) => console.error("Error loading game data:", error));
    } else {
      alert("Incorrect username or password!");
    }
  });

  function displayGameData(games) {
    var content = games
      .map(function (game) {
        return `
                <div class="game">
                    <p>Sport: ${game.sport}</p>
                    <p>Location: ${game.place} (${game.location.latitude}, ${game.location.longitude})</p>
                    <p>Time: ${game.start_time} - ${game.end_time}</p>
                    <button onclick="signUp('${game.sport}, ${game.place}')">Sign Up</button>
                </div>
            `;
      })
      .join("");

    $(document.body).append(`<div class="gamesData">${content}</div>`);
  }

  window.signUp = function (sport) {
    alert(`Signed up for ${sport}`);
  };
});
