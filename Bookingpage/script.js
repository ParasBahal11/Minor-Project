
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const seats = document.querySelectorAll(".row .seat:not(.sold)");
  const count = document.getElementById("count");
  const total = document.getElementById("total");
  const movieNameElement = document.getElementById("selected-movie");

  // Get movie data from localStorage
  const movieData = JSON.parse(localStorage.getItem("selectedMovie"));
  let ticketPrice = 0;

  if (movieData) {
    movieNameElement.textContent = `${movieData.name} (Rs. ${movieData.price})`;
    ticketPrice = parseInt(movieData.price, 10);
  } else {
    alert("No movie selected! Redirecting to the homepage.");
    window.location.href = "../index.html";
    return;
  }

  // Save selected seat indices to localStorage
  function saveSelectedSeats(seatsIndex) {
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  }

  // Update UI and localStorage with selected seats and totals
  function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    saveSelectedSeats(seatsIndex);

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
  }

  // Populate UI with saved data from localStorage
  function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.includes(index)) {
          seat.classList.add("selected");
        }
      });
    }
  }

  // Initialize UI
  populateUI();
  updateSelectedCount();

  // Seat click event
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("sold")) {
      e.target.classList.toggle("selected");
      updateSelectedCount();
    }
  });
});


const bookNowBtn = document.getElementById("book-now");
const formCard = document.getElementById("booking-form-card");
const ticketSection = document.getElementById("ticket-section");
const ticketDetails = document.getElementById("ticket-details");
const downloadTicketBtn = document.getElementById("download-ticket");
const bookingForm = document.getElementById("booking-form");

const selectedMovie = document.getElementById("selected-movie");
const totalSeats = document.getElementById("count");
const totalPrice = document.getElementById("total");

const movieNameInput = document.getElementById("movie-name");
const totalSeatsInput = document.getElementById("total-seats");
const totalPriceInput = document.getElementById("total-price");

bookNowBtn.addEventListener("click", () => {
  formCard.classList.remove("hidden");

  movieNameInput.value = selectedMovie.textContent;
  totalSeatsInput.value = totalSeats.textContent;
  totalPriceInput.value = totalPrice.textContent;
});


bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const customerName = document.getElementById("customer-name").value;
  const customerNumber = document.getElementById("customer-number").value;
  const paymentMethod = document.getElementById("payment-method").value;

  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = currentDate.toLocaleDateString();
  const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

  // Generate Ticket Details
  ticketDetails.innerHTML = `
    <strong>Customer Name:</strong> ${customerName}<br>
    <strong>Customer Number:</strong> ${customerNumber}<br>
    <strong>Movie Name:</strong> ${movieNameInput.value}<br>
    <strong>Total Seats:</strong> ${totalSeatsInput.value}<br>
    <strong>Total Price:</strong> RS. ${totalPriceInput.value}<br>
    <strong>Date:</strong> ${date}<br>
    <strong>Time:</strong> ${time}<br>
    <strong>Day:</strong> ${day}<br>
    <p>&copy; TICKET TREK</p>
    <p>Thanks for watching!</p>
  `;

  // Hide form and show ticket
  formCard.classList.add("hidden");
  ticketSection.classList.remove("hidden");
});

// Download Ticket as PDF
downloadTicketBtn.addEventListener("click", () => {
  const jsPDF = window.jspdf.jsPDF;
  const pdf = new jsPDF();

  // Add Ticket Content
  pdf.setFont("helvetica", "bold");
  pdf.text("Your Ticket", 105, 20, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.text(ticketDetails.innerText, 10, 40);

  // Save PDF
  pdf.save("ticket.pdf");
});

// Redirect to the homepage
function goToHomepage() {
  window.location.href = "../index.html"; 
}
