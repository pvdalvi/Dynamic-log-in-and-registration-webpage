// Store logged-in user
function setLoggedInUser(user) {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
}

// Get logged-in user
function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

// Logout function
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  updateNavbar();
  window.location.href = "index.html";
}

// Update navbar dynamically
function updateNavbar() {
  const user = getLoggedInUser();
  const nav = document.getElementById("navbar");
  if (!nav) return;

  if (user) {
    nav.innerHTML = `
      <a href="index.html" class="me-3">Home</a>
      <a href="profile.html" class="me-3">Profile</a>
      <a href="#" onclick="logoutUser()">Logout</a>
    `;
  } else {
    nav.innerHTML = `
      <a href="index.html" class="me-3">Home</a>
      <a href="index.html" class="me-3">Login</a>
      <a href="index.html">Register</a>
    `;
  }
}

window.onload = updateNavbar;