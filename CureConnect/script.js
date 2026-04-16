// Menu bar toggle functionality
let menubar = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menubar.onclick = () => {
    menubar.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", function () {
    let showFormButton = document.getElementById("showFormButton");
    let popupContainer = document.getElementById("popupContainer");
    let appointmentForm = document.getElementById("appointmentForm");
    let appointmentDetails = document.getElementById("appointmentDetails");
    let backButton = document.getElementById("backButton");
    let backToHome = document.getElementById("backToHome");
    let printButton = document.getElementById("printReceipt");
    let content = document.querySelector(".content");

    // Doctor List
    let doctors = {
        "Cardiologist": "Dr. Rajesh Sharma",
        "Dermatologist": "Dr. Sunita Verma",
        "Neurologist": "Dr. Arvind Kumar",
        "Orthopedic": "Dr. Neha Gupta"
    };

    // ✅ Show Form on Button Click
    showFormButton.addEventListener("click", function () {
        popupContainer.classList.add("show");
        popupContainer.classList.remove("hidden");
        content.classList.add("blur");
    });

    // ✅ Hide Form on Back Button Click
    backButton.addEventListener("click", function () {
        popupContainer.classList.remove("show");
        popupContainer.classList.add("hidden");
        content.classList.remove("blur");
    });

    // ✅ Form Submission
    // Function to generate a random alphanumeric string
    function generateAppointmentID() {
        let datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
        let randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
        return `APT-${datePart}-${randomPart}`;
    }
    
    

// Function to generate a random number
function generateRandomNumber(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}

// Function to generate a unique ID (you can use a library like uuid for more robust solutions)
function generateUniqueId() {
    return generateAppointmentID();
}

// Update the form submission logic to include these generated values
appointmentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let specialization = document.getElementById("specialization").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    if (!name || !email || !phone || !specialization || !date || !time) {
        alert("Please fill all fields!");
        return;
    }

    let assignedDoctor = doctors[specialization];

    // Generate Appointment ID, UHID, and PRN Number
    let appointmentId = generateUniqueId();
    let uhid = 'UHID-' + generateRandomNumber(8);
    let prnNumber = 'PRN-' + generateRandomNumber(6);

    // Show Appointment Details
    document.getElementById("dName").innerText = name;
    document.getElementById("dEmail").innerText = email;
    document.getElementById("dPhone").innerText = phone;
    document.getElementById("dSpecialization").innerText = specialization;
    document.getElementById("dDoctor").innerText = assignedDoctor;
    document.getElementById("dDate").innerText = date;
    document.getElementById("dTime").innerText = time;
    document.getElementById("dAppointmentId").innerText = appointmentId;
    document.getElementById("dUHID").innerText = uhid;
    document.getElementById("dPRN").innerText = prnNumber;

    // Hide form and show appointment details
    popupContainer.classList.add("hidden"); // Form hide
    popupContainer.classList.remove("show");

    appointmentDetails.style.display = "flex"; // **Fixed: Now visible**
    appointmentDetails.classList.remove("hidden");
    appointmentDetails.classList.add("show");

    content.classList.remove("blur");
});
    // ✅ Back to Home from Appointment Details (Fixed)
    backToHome.addEventListener("click", function () {
        appointmentDetails.style.display = "none"; // **Fixed: Now properly hides**
        appointmentDetails.classList.add("hidden"); 

        content.classList.remove("blur");
    });

    // ✅ Print Receipt
    printButton.addEventListener("click", function () {
        window.print();
    });

    // ✅ Scrolling Fixes
    function disableScroll() {
        document.body.classList.add("no-scroll");
        document.documentElement.classList.add("no-scroll");
    }

    function enableScroll() {
        document.body.classList.remove("no-scroll");
        document.documentElement.classList.remove("no-scroll");
    }

    showFormButton.addEventListener("click", function () {
        popupContainer.classList.add("show");
        popupContainer.classList.remove("hidden");
        content.classList.add("blur");
        disableScroll();
    });

    backButton.addEventListener("click", function () {
        popupContainer.classList.remove("show");
        popupContainer.classList.add("hidden");
        content.classList.remove("blur");
        enableScroll();
    });

    backToHome.addEventListener("click", function () {
        appointmentDetails.style.display = "none"; // **Fixed**
        appointmentDetails.classList.add("hidden");
        enableScroll();
    });

    appointmentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        popupContainer.classList.add("hidden");
        appointmentDetails.style.display = "flex"; // **Fixed**
        appointmentDetails.classList.remove("hidden");
        appointmentDetails.classList.add("show");
        content.classList.remove("blur");
        enableScroll();
    });

});



document.addEventListener("DOMContentLoaded", function () {
    let contactMenuItem = document.querySelector("#contactm"); // Contact menu का ID पकड़ो
    let contactSection = document.getElementById("popupForm"); // Contact Form को पकड़ो

    if (contactMenuItem) {
        contactMenuItem.addEventListener("click", function (event) {
            event.preventDefault(); // Default behavior रोकें (जैसे anchor link navigation)
            
            contactSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to contact form
            openForm(); // Contact form open करो
        });
    }
});

function openForm() {
    let form = document.getElementById("popupForm");
    if (form) {
        form.style.display = "block";  // ✅ Fix: Ensure Form opens
    }
}

function closeForm() {
    let form = document.getElementById("popupForm");
    if (form) {
        form.style.display = "none";  // ✅ Fix: Ensure Form closes
    }
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting
    
    // Show success message
    document.getElementById("successMessage").style.display = "block";

    // Clear form fields after submission
    setTimeout(() => {
        document.getElementById("contactForm").reset();
        document.getElementById("successMessage").style.display = "none";
    }, 3000);
});


document.addEventListener("DOMContentLoaded", function () {
    let detailsPopup = document.querySelector(".appointment-details");
    let overlay = document.querySelector(".appointment-overlay");
    let openBtn = document.querySelector("#open-appointment-details"); // Button to open
    let closeBtn = document.querySelector("#close-appointment-details"); // Button to close

    openBtn.addEventListener("click", function () {
        detailsPopup.style.display = "block";
        overlay.style.display = "block";
    });

    closeBtn.addEventListener("click", function () {
        detailsPopup.style.display = "none";
        overlay.style.display = "none";
    });
});