document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("event-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      sport: document.getElementById("sport").value,
      start_time: document.getElementById("start-time").value,
      end_time: document.getElementById("end-time").value,
      location: {
        latitude: parseFloat(document.getElementById("latitude").value),
        longitude: parseFloat(document.getElementById("longitude").value),
      },
      place: document.getElementById("place").value,
      organizer: {
        first_name: document.getElementById("fname").value,
        last_name: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        phone_number: document.getElementById("phonenumber").value,
      },
    };

    fetch("gamesData.json")
      .then((response) => response.json())
      .then((data) => {
        data.games.push(formData);

        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "gamesData.json";
        document.body.appendChild(a);

        a.click();

        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        form.reset();
      })
      .catch((error) => {
        console.error("Error reading file:", error);
        alert("Error reading file. Please try again later.");
      });
  });
});
