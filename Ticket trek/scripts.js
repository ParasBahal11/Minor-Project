// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Get the dark mode toggle button and body element
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

// Check if dark mode is already saved in localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
}

// Function to toggle dark mode
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
});

document.addEventListener("DOMContentLoaded", () => {
    const searchToggle = document.getElementById("searchToggle");
    const searchInput = document.getElementById("searchInput");
    const searchModal = document.querySelector(".Search-modal");
    const closeBtn = document.querySelector(".Search-close-btn");
    const movieCards = document.querySelectorAll(".movie-card");
    const sliders = document.querySelectorAll(".slide");

    // Hide modal on page load
    searchModal.style.display = "none";

    // Show/Hide Search Input
    searchToggle.addEventListener("click", () => {
        searchInput.classList.toggle("show");
        searchInput.focus();
    });

    // Handle Search on Enter Key
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();

          
            if (!query) return;

            let found = false;

            // Search in movie cards
            movieCards.forEach((card) => {
                const movieTitle = card.querySelector("h3").textContent.toLowerCase();
                if (movieTitle.includes(query)) {
                    found = true;
                    card.scrollIntoView({ behavior: "smooth", block: "center" });
                    card.style.animation = "highlight 1s ease";
                    setTimeout(() => card.style.animation = "", 1000);
                }
            });

            // Search in sliders
            sliders.forEach((slide) => {
                const altText = slide.querySelector("img").alt.toLowerCase();
                if (altText.includes(query)) {
                    found = true;
                    slide.scrollIntoView({ behavior: "smooth", block: "center" });
                    slide.style.animation = "highlight 1s ease";
                    setTimeout(() => slide.style.animation = "", 1000);
                }
            });

            // Show modal only if no match is found
            if (!found) {
                searchModal.style.display = "flex";
            }

            // Hide search input after a search
            searchInput.classList.remove("show");
            searchInput.value = ""; // Clear the input
        }
    });

    // Close Modal
    closeBtn.addEventListener("click", () => searchModal.style.display = "none");

    // Close Modal on Outside Click
    window.addEventListener("click", (e) => {
        if (e.target === searchModal) searchModal.style.display = "none";
    });

    // Show user's initial on homepage
    const userInitial = localStorage.getItem("userInitial");
    const userLogo = document.getElementById('userLogo');

    if (userInitial) {
        userLogo.textContent = userInitial;
        userLogo.style.display = 'flex';
    }

    // Update authMenu based on login state
    const authMenu = document.getElementById('authMenu');
    if (userInitial) {
        authMenu.innerHTML = `<button class="logout-btn" onclick="handleLogout()"><i class="fa fa-sign-out"></i> Logout</button>`;
    } else {
        authMenu.innerHTML = `<a href="login/index.html"><i class="fa fa-user"></i> Login</a>`;
    }

    // Handle Logout
    function handleLogout() {
        localStorage.removeItem('userInitial');
        authMenu.innerHTML = `<a href="login/index.html"><i class="fa fa-user"></i> Login</a>`;
        window.location.reload();
    }
});

// Slider functionality
let slideIndex = 0;
showSlides(slideIndex);

function showSlides(index) {
    const slides = document.querySelectorAll('.slide');
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
    slides.forEach(slide => slide.style.display = 'none');
    slides[slideIndex].style.display = 'block';
}

document.querySelector('.prev-btn').addEventListener('click', () => showSlides(--slideIndex));
document.querySelector('.next-btn').addEventListener('click', () => showSlides(++slideIndex));

// Trailer modal functionality
const trailerModal = document.getElementById('trailerModal');
const trailerFrame = document.getElementById('trailerFrame');
const closeModal = document.querySelector('.close');

function openTrailerModal(element) {
    const trailerURL = element.dataset.trailer;
    if (trailerURL) {
        trailerFrame.src = trailerURL;
        trailerModal.style.display = 'block';
    }
}

document.querySelectorAll('.movie-card').forEach(item => {
    item.addEventListener('click', (event) => {
        if (!event.target.classList.contains('book-now-btn')) openTrailerModal(item);
    });
});

document.querySelectorAll('.slide').forEach(item => {
    item.addEventListener('click', (event) => {
        if (!event.target.classList.contains('trailer-btn')) openTrailerModal(item);
    });
});

closeModal.addEventListener('click', () => {
    trailerModal.style.display = 'none';
    trailerFrame.src = '';
});

window.addEventListener('click', (event) => {
    if (event.target === trailerModal) {
        trailerModal.style.display = 'none';
        trailerFrame.src = '';
    }
});

// Booking button functionality
const bookingList = document.getElementById('bookingList');
document.querySelectorAll('.book-now-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const movieName = button.dataset.movie;
        const listItem = document.createElement('li');
        listItem.textContent = `Booking confirmed for ${movieName}`;
        bookingList.appendChild(listItem);
    });
});

// Pre-page loader
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.style.display = 'none';
        document.getElementById('website-content').style.display = 'block';
    }, 4000); // Set to 4 seconds
});

// Booking button functionality for storing movie details
document.querySelectorAll('.book-now-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
        const movieName = event.target.getAttribute('data-movie');
        const moviePrice = event.target.getAttribute('data-price');
        if (movieName && moviePrice) {
            localStorage.setItem('selectedMovie', JSON.stringify({ name: movieName, price: moviePrice }));
            window.location.href = "Booking/index.html";
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const userInitial = localStorage.getItem("userInitial");
    const authMenu = document.getElementById('authMenu');

    if (userInitial) {
        // User is logged in
        authMenu.innerHTML = `
            <button class="logout-btn" onclick="handleLogout()">
                <i class="fa fa-sign-out"></i> Logout
            </button>
        `;
    } else {
        // User is not logged in
        authMenu.innerHTML = `
            <a href="login/index.html"><i class="fa fa-user"></i> Login</a>
        `;
    }
});

// Handle Logout
function handleLogout() {
    // Clear user data from localStorage
    localStorage.removeItem('userInitial');

    // Update the authMenu to show the Login link instead of Logout button
    const authMenu = document.getElementById('authMenu');
    authMenu.innerHTML = `
        <a href="login/index.html"><i class="fa fa-user"></i> Login</a>
    `;

    // Optionally, you can also refresh the page to reset the session or show logged-out state
    window.location.reload();
}
