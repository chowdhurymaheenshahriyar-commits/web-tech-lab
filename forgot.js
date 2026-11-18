const form = document.getElementById("forgotForm");

form.addEventListener("submit", function (event) {
 event.preventDefault(); // stops page reload on submit
 clearErrors();

 let email = document.getElementById("email");
 let valid = true;

 // Email validation
 if (email.value.trim() === "") {
 showError(email, "emailError", "Email is required.");
 valid = false;
 } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
 showError(email, "emailError", "Enter a valid email address.");
 valid = false;
 } else {
 showSuccess(email);
 }

 // Success
 if (valid) {
 let message = "Reset link sent to " + email.value.trim();
 form.reset();
 clearErrors();
 document.getElementById("result").innerHTML = message;
 }
});

// ---------- Functions ----------

// Show error
function showError(input, errorId, message) {
 input.classList.add("errorBorder");
 input.classList.remove("successBorder");
 document.getElementById(errorId).innerHTML = message;
}

// Show success
function showSuccess(input) {
 input.classList.remove("errorBorder");
 input.classList.add("successBorder");
}

// Clear all errors
function clearErrors() {
 let errors = document.querySelectorAll(".error");
 errors.forEach(function (item) {
 item.innerHTML = "";
 });
 let fields = document.querySelectorAll("input, select, textarea");
 fields.forEach(function (field) {
 field.classList.remove("errorBorder");
 field.classList.remove("successBorder");
 });
 document.getElementById("result").innerHTML = "";
}
