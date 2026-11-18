const form = document.getElementById("profileForm");
let hasPicture = false; // becomes true after a picture is saved

form.addEventListener("submit", function (event) {
 event.preventDefault(); // stops page reload on submit
 clearErrors();

 let picture = document.getElementById("picture");
 let name = document.getElementById("name");
 let email = document.getElementById("email");
 let mobile = document.getElementById("mobile");
 let bio = document.getElementById("bio");
 let valid = true;

 // Picture validation (optional, but checked if chosen)
 if (picture.files.length > 0) {
 let file = picture.files[0];
 if (file.type !== "image/jpeg" && file.type !== "image/png") {
 showError(picture, "pictureError", "Only JPG or PNG images are allowed.");
 valid = false;
 } else if (file.size > 2 * 1024 * 1024) {
 showError(picture, "pictureError", "Image must be 2 MB or smaller.");
 valid = false;
 } else {
 showSuccess(picture);
 }
 }

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

 // Bio validation (maximum 100 characters)
 if (bio.value.trim().length > 100) {
 showError(bio, "bioError", "Bio must be at most 100 characters.");
 valid = false;
 } else {
 showSuccess(bio);
 }

 // Success: update the profile card on the left
 if (valid) {
 document.getElementById("viewName").innerHTML = name.value.trim();
 document.getElementById("viewEmail").innerHTML = email.value.trim();
 document.getElementById("viewMobile").innerHTML = mobile.value.trim();
 document.getElementById("viewBio").innerHTML = bio.value.trim();

 let avatar = document.getElementById("avatar");
 if (picture.files.length > 0) {
 avatar.style.backgroundImage = "url(" + URL.createObjectURL(picture.files[0]) + ")";
 avatar.innerHTML = "";
 hasPicture = true;
 } else if (!hasPicture) {
 avatar.innerHTML = name.value.trim().charAt(0).toUpperCase();
 }

 document.getElementById("result").innerHTML = "Profile updated successfully";
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
