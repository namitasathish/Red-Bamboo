
var modal = document.getElementById("reviewModal");
var btn = document.getElementById("addReviewBtn");
var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


document.getElementById('reviewForm').onsubmit = function(event) {
    event.preventDefault(); // Prevent page reload

    var title = document.getElementById("reviewTitle").value;
    var text = document.getElementById("reviewText").value;

    // Create an object for the new review
    var newReview = {
        title: title,
        text: text
    };

  
    var reviews = JSON.parse(localStorage.getItem("reviews")) || [];


    reviews.push(newReview);

 
    localStorage.setItem("reviews", JSON.stringify(reviews));

    modal.style.display = "none";

  
    document.getElementById("reviewForm").reset();

    displayReviews();
}


function displayReviews() {
    var reviewsContainer = document.getElementById("reviewsContainer");

  
    reviewsContainer.innerHTML = '';


    var reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.forEach(function(review) {
        var reviewDiv = document.createElement("div");
        reviewDiv.classList.add("review");

        var reviewTitle = document.createElement("h3");
        reviewTitle.textContent = review.title;

        var reviewText = document.createElement("p");
        reviewText.textContent = review.text;

        reviewDiv.appendChild(reviewTitle);
        reviewDiv.appendChild(reviewText);

        reviewsContainer.appendChild(reviewDiv);
    });
}

// Display saved reviews when the page loads
window.onload = displayReviews;
