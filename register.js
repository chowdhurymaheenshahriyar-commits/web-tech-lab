const form = document.getElementById("registerForm");

form.addEventListener("submit", function (event) {
 event.preventDefault(); // stops page reload on submit
 clearErrors();

 let name = document.getElementById("name");
 let email = document.getElementById("email");
 let mobile = document.getElementById("mobile");
 let password = document.getElementById("password");
 let confirm = document.getElementById("confirm");
 let role = document.querySelector('input[name="role"]:checked');
 let terms = document.getElementById("terms");
 let valid = true;

 // Name validation
 if (name.value.trim() === "") {
 showError(name, "nameError", "Name is required.");
 valid = false;
 } else if (!/^[A-Za-z ]+$/.test(name.value.trim())) {
 showError(name, "nameError", "Only letters and spaces are allowed.");
 valid = false;
 } else if (name.value.trim().length < 3) {
 showError(name, "nameError", "Name must be at least 3 characters.");
 valid = false;
 } else {
 showSuccess(name);
 }

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

 // Mobile validation (013 to 019)
 if (mobile.value.trim() === "") {
 showError(mobile, "mobileError", "Mobile number is required.");
 valid = false;
 } else if (!/^01[3-9][0-9]{8}$/.test(mobile.value.trim())) {
 showError(mobile, "mobileError", "Must be 11 digits starting with 013-019.");
 valid = false;
 } else {
 showSuccess(mobile);
 }

 // Password strength validation
 let pw = password.value;
 if (pw === "") {
 showError(password, "passwordError", "Password is required.");
 valid = false;
 } else if (pw.length < 8) {
 showError(password, "passwordError", "Password must be at least 8 characters.");
 valid = false;
 } else if (!/[A-Z]/.test(pw)) {
 showError(password, "passwordError", "Add at least one uppercase letter.");
 valid = false;
 } else if (!/[a-z]/.test(pw)) {
 showError(password, "passwordError", "Add at least one lowercase letter.");
 valid = false;
 } else if (!/[0-9]/.test(pw)) {
 showError(password, "passwordError", "Add at least one digit.");
 valid = false;
 } else if (!/[^A-Za-z0-9]/.test(pw)) {
 showError(password, "passwordError", "Add at least one special character.");
 valid = false;
 } else {
 showSuccess(password);
 }

 // Confirm password validation
 if (confirm.value === "") {
 showError(confirm, "confirmError", "Please confirm your password.");
 valid = false;
 } else if (confirm.value !== pw) {
 showError(confirm, "confirmError", "Passwords do not match.");
 valid = false;
 } else {
 showSuccess(confirm);
 }

 // Role (radio)
 if (role === null) {
 document.getElementById("roleError").innerHTML = "Please select Attendee or Organizer.";
 valid = false;
 }

 // Terms (checkbox)
 if (!terms.checked) {
 document.getElementById("termsError").innerHTML = "You must accept the terms.";
 valid = false;
 }

 // Success
 if (valid) {
 let message = "Account created for " + name.value.trim() + " as " + role.value;
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
