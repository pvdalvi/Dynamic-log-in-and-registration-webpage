// Fetch users from JSON + localStorage
function getUsers(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "users.json", true);
  xhr.onload = function() {
    let fileUsers = [];
    if (xhr.status === 200) {
      fileUsers = JSON.parse(xhr.responseText);
    }
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const allUsers = [...fileUsers, ...localUsers];
    callback(allUsers);
  };
  xhr.send();
}

// Save newly registered users in localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Register user
function registerUser(userData) {
  getUsers(users => {
    if (users.some(u => u.username === userData.username || u.email === userData.email)) {
      alert("Username or Email already exists!");
      return;
    }

    userData.id = Date.now();

    // Save new user in localStorage
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    localUsers.push(userData);
    saveUsers(localUsers);

    setLoggedInUser(userData);
    updateNavbar();
    alert("Registration successful! Redirecting to profile...");
    window.location.href = "profile.html";
  });
}

// Login user
function loginUser(username, password) {
  getUsers(users => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      setLoggedInUser(foundUser);
      updateNavbar();
      alert(`Welcome ${foundUser.name}!`);
      window.location.href = "profile.html";
    } else {
      alert("Invalid username or password!");
    }
  });
}

// Register form submit
document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const userData = {
    username: document.getElementById("regUsername").value.trim(),
    email: document.getElementById("regEmail").value.trim(),
    password: document.getElementById("regPassword").value.trim(),
    name: document.getElementById("regName").value.trim(),
    about: document.getElementById("regAbout").value.trim() || "No info provided"
  };

  if (!userData.username || !userData.email || !userData.password || !userData.name) {
    alert("All fields are required!");
    return;
  }

  if (userData.password.length < 6) {
    alert("Password must be at least 6 characters!");
    return;
  }

  registerUser(userData);
  this.reset();
});

// Login form submit
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!username || !password) {
    alert("Please fill in all fields!");
    return;
  }

  loginUser(username, password);
  this.reset();
});
