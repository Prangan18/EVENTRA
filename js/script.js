// ==========================================
// EVENTRA - EVENT MANAGEMENT SYSTEM
// ==========================================

const API_URL = "http://localhost:5000";


// ==========================================
// EVENT DATA
// ==========================================

const events = {
    "Tech Innovation Summit": {
        date: "15 December 2026",
        location: "Bhubaneswar, India",
        category: "Technology",
        description: "Explore artificial intelligence, robotics, machine learning and emerging technologies. Connect with innovators and technology enthusiasts."
    },

    "Neon Nights Music Festival": {
        date: "20 December 2026",
        location: "Kolkata, India",
        category: "Music",
        description: "Experience an unforgettable evening featuring live music, performances and entertainment."
    },

    "Entrepreneurship Connect": {
        date: "05 January 2027",
        location: "New Delhi, India",
        category: "Business",
        description: "Meet industry leaders, startup founders and aspiring entrepreneurs. Discover opportunities and build connections."
    },

    "National Sports Championship": {
        date: "12 January 2027",
        location: "Mumbai, India",
        category: "Sports",
        description: "Witness incredible athletic performances and exciting sporting competitions."
    }
};


// ==========================================
// VIEW EVENT DETAILS AND REGISTRATION
// ==========================================

function viewEvent(eventName) {

    const event = events[eventName];

    if (!event) {
        alert("Event not found!");
        return;
    }

    closeModal();

    const modal = document.createElement("div");
    modal.id = "eventModal";

    modal.innerHTML = `
        <div class="event-modal-content">

            <button class="close-modal" onclick="closeModal()">×</button>

            <span class="modal-category">${event.category}</span>

            <h2>${eventName}</h2>

            <p>${event.description}</p>

            <div class="modal-details">
                <p>📅 ${event.date}</p>
                <p>📍 ${event.location}</p>
                <p>🎟 Registration fee: To be announced</p>
            </div>

            <h3>Register for this Event</h3>

            <form id="registrationForm">

                <input
                    type="text"
                    id="userName"
                    placeholder="Full Name"
                    required
                >

                <input
                    type="email"
                    id="userEmail"
                    placeholder="Email Address"
                    required
                >

                <input
                    type="tel"
                    id="userPhone"
                    placeholder="Phone Number"
                    pattern="[0-9]{10}"
                    title="Enter a valid 10-digit phone number"
                    required
                >

                <button type="submit" class="register-btn">
                    Register Now →
                </button>

            </form>

        </div>
    `;

    document.body.appendChild(modal);


    // SEND REGISTRATION TO MONGODB

    document.getElementById("registrationForm")
        .addEventListener("submit", async function(e) {

            e.preventDefault();

            const submitButton = this.querySelector("button[type='submit']");
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";

            const registration = {
                eventName: eventName,
                name: document.getElementById("userName").value.trim(),
                email: document.getElementById("userEmail").value.trim(),
                phone: document.getElementById("userPhone").value.trim()
            };

            try {

                const response = await fetch(`${API_URL}/api/register`, {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(registration)
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || "Registration failed.");
                }

                alert("Registration Successful! Welcome to EVENTRA.");

                closeModal();

            } catch (error) {

                console.error("Registration Error:", error);

                alert("Registration failed: " + error.message);

                submitButton.disabled = false;
                submitButton.textContent = "Register Now →";

            }

        });
}


// ==========================================
// CLOSE EVENT MODAL
// ==========================================

function closeModal() {

    const modal = document.getElementById("eventModal");

    if (modal) {
        modal.remove();
    }

}


// ==========================================
// EVENT SEARCH
// ==========================================

let selectedCategory = "all";

function searchEvents() {

    displayFilteredEvents();

    clearTimeout(window.searchScrollTimer);

    const searchInput = document.getElementById("eventSearch");

    if (!searchInput) return;

    const searchValue = searchInput.value.trim();

    if (searchValue.length > 0) {

        window.searchScrollTimer = setTimeout(() => {

            const eventsGrid = document.getElementById("eventsGrid");

            if (eventsGrid) {
                eventsGrid.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        }, 400);

    }

}


// ==========================================
// CATEGORY FILTERING
// ==========================================

function filterEvents(category, button) {

    selectedCategory = category;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    displayFilteredEvents();

}


// ==========================================
// DISPLAY FILTERED EVENTS
// ==========================================

function displayFilteredEvents() {

    const searchInput = document.getElementById("eventSearch");
    const eventsGrid = document.getElementById("eventsGrid");

    if (!searchInput || !eventsGrid) return;

    const searchValue = searchInput.value.toLowerCase().trim();

    const cards = document.querySelectorAll(".event-card");

    let visibleCount = 0;

    cards.forEach(card => {

        const title = card.querySelector("h3");

        const info = card.querySelector(".event-info");

        const eventName = title ? title.textContent.toLowerCase() : "";

        const category = (card.dataset.category || "").toLowerCase();

        const description = info ? info.textContent.toLowerCase() : "";

        const matchesSearch =
            eventName.includes(searchValue) ||
            category.includes(searchValue) ||
            description.includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {

            card.style.display = "block";
            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    let message = document.getElementById("noEvents");

    if (!message) {

        message = document.createElement("p");

        message.id = "noEvents";
        message.className = "no-events";

        message.textContent = "No events found. Try another search!";

        eventsGrid.after(message);

    }

    message.hidden = visibleCount !== 0;

}


// ==========================================
// GET STARTED BUTTON
// ==========================================

document.querySelectorAll("a, button").forEach(element => {

    if (element.textContent.trim() === "Get Started") {

        element.addEventListener("click", function(e) {

            e.preventDefault();

            document.getElementById("events")?.scrollIntoView({
                behavior: "smooth"
            });

        });

    }

});


// ==========================================
// DARK / LIGHT THEME SWITCH
// ==========================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", function() {

        document.body.classList.toggle("light-theme");

        const isLight = document.body.classList.contains("light-theme");

        themeToggle.textContent = isLight ? "🌙" : "☀️";

        localStorage.setItem(
            "eventraTheme",
            isLight ? "light" : "dark"
        );

    });


    // RESTORE SAVED THEME

    if (localStorage.getItem("eventraTheme") === "light") {

        document.body.classList.add("light-theme");

        themeToggle.textContent = "🌙";

    }

}


// ==========================================
// CONTACT FORM
// ==========================================

/// CONTACT FORM - EVENTRA BACKEND

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) {
        console.error("Contact form not found!");
        return;
    }

    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        const status = document.getElementById("contactStatus");
        const button = contactForm.querySelector("button[type='submit']");

        button.disabled = true;
        button.textContent = "Sending...";

        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            status.textContent = "Message successfully saved!";
            contactForm.reset();

        } catch (error) {
            console.error("Contact submission failed:", error);
            status.textContent = "Could not send message. Check backend.";

        } finally {
            button.disabled = false;
            button.textContent = "Send Message →";
        }
    });

});