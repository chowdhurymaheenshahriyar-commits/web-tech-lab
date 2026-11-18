const form = document.getElementById("resetForm");

form.addEventListener("submit", function (event) {
 event.preventDefault(); // stops page reload on submit
 clearErrors();

 let password = document.getElementById("password");
 let confirm = document.getElementById("confirm");
 let valid = true;

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

 // Success
 if (valid) {
 form.reset();
 clearErrors();
 document.getElementById("result").innerHTML = "Password reset successful. You can now login.";
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
