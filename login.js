const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
 event.preventDefault(); // stops page reload on submit
 clearErrors();

 let email = document.getElementById("email");
 let password = document.getElementById("password");
 let role = document.getElementById("role");
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

 // Password validation
 if (password.value === "") {
 showError(password, "passwordError", "Password is required.");
 valid = false;
 } else if (password.value.length < 8) {
 showError(password, "passwordError", "Password must be at least 8 characters.");
 valid = false;
 } else {
 showSuccess(password);
 }

 // Role validation
 if (role.value === "") {
 showError(role, "roleError", "Please select a role.");
 valid = false;
 } else {
 showSuccess(role);
 }

 // Success
 if (valid) {
 let message = "Login successful. Welcome, " + email.value.trim() + " (" + role.value + ")";
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
