
function setLoggedInUser(user) {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
}
function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  updateNavbar();
  window.location.href = "index.html?page=login";
}
function updateNavbar() {
  const user = getLoggedInUser();
  const nav = document.getElementById("navbar");

  if (!nav) return;

  if (user) {
    nav.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
      <li class="nav-item"><a class="nav-link" href="profile.html">Profile</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="logoutUser()">Logout</a></li>
    `;
  } else {
    nav.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="index.html?page=login">Login</a></li>
      <li class="nav-item"><a class="nav-link" href="index.html?page=register">Register</a></li>
    `;
  }
}
window.onload = updateNavbar;


function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}


function showRegister() {
  document.getElementById("loginCard")?.classList.add("d-none");
  document.getElementById("registerCard")?.classList.remove("d-none");
}
function showLogin() {
  document.getElementById("registerCard")?.classList.add("d-none");
  document.getElementById("loginCard")?.classList.remove("d-none");
}
function showAlert(message, type = "danger") {
  const alertBox = document.getElementById("alertBox");
  alertBox.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
}


window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");

  if (page === "register") {
    showRegister();
  } else {
    showLogin();
  }
});


document.getElementById("registerForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const userData = {
    name: document.getElementById("regName").value,
    email: document.getElementById("regEmail").value,
    password: document.getElementById("regPassword").value,
    about: document.getElementById("regAbout").value
  };

  let users = getUsers();

  if (users.find(u => u.email === userData.email)) {
    showAlert("Email already registered!", "warning");
    return;
  }

  users.push(userData);
  saveUsers(users);

  showAlert("Registration successful! Please login.", "success");
  setTimeout(() => (window.location.href = "index.html?page=login"), 1500);
});


document.getElementById("loginForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  let users = getUsers();
  let user = users.find(u => u.email === email && u.password === password);

  if (user) {
    setLoggedInUser(user);
    window.location.href = "profile.html";
  } else {
    showAlert("Invalid email or password!", "danger");
  }
});


if (window.location.pathname.includes("profile.html")) {
  let user = getLoggedInUser();
  if (!user) {
    window.location.href = "index.html?page=login";
  } else {
    document.getElementById("userName").textContent = user.name;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("userAbout").textContent = user.about || "—";
  }
}


function deleteAccount() {
  let user = getLoggedInUser();
  if (!user) return;

  let users = getUsers().filter(u => u.email !== user.email);
  saveUsers(users);

  localStorage.removeItem("loggedInUser");
  alert("Account deleted.");
  window.location.href = "index.html?page=login";
}
