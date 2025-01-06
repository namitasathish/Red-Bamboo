
function getFormattedDate() {
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
}


function displaySeatAvailability() {
   
    var currentDate = getFormattedDate();
    document.getElementById("currentDate").innerText = currentDate;


    var reservations = JSON.parse(localStorage.getItem("reservations")) || [];


    var categories = {
        "Breakfast": { time: "07:00-10:00", seats: 50, reservedSeats: 0 },
        "Lunch": { time: "12:00-15:00", seats: 50, reservedSeats: 0 },
        "Dinner": { time: "18:00-23:00", seats: 50, reservedSeats: 0 }
    };

    reservations.forEach(function(reservation) {
        var reservationTime = reservation.time;
        var guests = reservation.guests; // Number of guests

        if (reservationTime >= "07:00" && reservationTime <= "10:00") {
            categories["Breakfast"].reservedSeats += guests;
        } else if (reservationTime >= "12:00" && reservationTime <= "15:00") {
            categories["Lunch"].reservedSeats += guests;
        } else if (reservationTime >= "18:00" && reservationTime <= "23:00") {
            categories["Dinner"].reservedSeats += guests;
        }
    });


    var reservationsList = document.getElementById("reservationsList");
    reservationsList.innerHTML = ""; // Clear existing seat availability

    for (var category in categories) {
        var categoryData = categories[category];
        var availableSeats = categoryData.seats - categoryData.reservedSeats;
        var categoryBox = document.createElement("div");
        categoryBox.classList.add("reservation-box");

        var categoryContent = `
            <h4>${category} (${categoryData.time})</h4>
            <p>Available Seats: ${availableSeats} / ${categoryData.seats}</p>
        `;

        categoryBox.innerHTML = categoryContent;
        reservationsList.appendChild(categoryBox);
    }
}

document.getElementById('reservationForm').onsubmit = function(event) {
    event.preventDefault(); // Prevent page reload


    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var guests = document.getElementById("guests").value;


    var newReservation = {
        name: name,
        email: email,
        phone: phone,
        date: date,
        time: time,
        guests: parseInt(guests) // Ensure the number of guests is an integer
    };

   
    var reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    reservations.push(newReservation);


    localStorage.setItem("reservations", JSON.stringify(reservations));


    document.getElementById("reservationForm").reset();

    displaySeatAvailability();
    document.getElementById("reservationsContainer").style.display = "block";
}

window.onload = function() {

    document.getElementById("reservationsContainer").style.display = "none";
    displaySeatAvailability();
};
