// Initialize EmailJS
emailjs.init("UiUgHW1Zbi-6NNZz-");

// Modal Elements
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const closeModal = document.querySelector(".close");
const form = document.getElementById("registrationForm");
const familyDetails = document.getElementById("familyDetails");
const attendance = document.getElementById("attendance");
const successMessage = document.getElementById("successMessage");

// Open Modal
btn.onclick = () => {
  modal.style.display = "block";
};

// Close Modal
closeModal.onclick = () => {
  modal.style.display = "none";
  form.reset();
  successMessage.style.display = "none";
};

// Close modal if clicking outside it
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    form.reset();
    successMessage.style.display = "none";
  }
};

// Show/Hide Family Details
attendance.onchange = () => {
  if (attendance.value === "family") {
    familyDetails.style.display = "block";
  } else {
    familyDetails.style.display = "none";
  }
};

// Generate a unique ticket number
function generateTicketNumber() {
  const prefix = "FF-";
  const randomNumber = Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase(); // Generate random alphanumeric string
  return `${prefix}${randomNumber}`;
}

// Handle Form Submission
form.onsubmit = async (event) => {
  event.preventDefault();

  // Collect form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const attendanceType = attendance.value;
  const kids = document.getElementById("kids").value || 0;

  // Generate ticket number
  const ticketNumber = generateTicketNumber();

  // Prepare email data
  const emailParams = {
    name,
    email,
    dob,
    attendance: attendanceType,
    kids: attendanceType === "family" ? kids : "0",
    ticket_number: ticketNumber,
  };

  // Send email using EmailJS
  try {
    await emailjs.send("service_hpdvswl", "template_dsngumg", emailParams);
    successMessage.innerHTML = `Registration successful! Your ticket number is <strong>${ticketNumber}</strong>. Check your email for confirmation.`;
    successMessage.style.display = "block";
    form.reset();
  } catch (error) {
    successMessage.innerHTML = "Failed to send email. Please try again later.";
    successMessage.style.display = "block";
    console.error("EmailJS Error:", error);
  }
};
