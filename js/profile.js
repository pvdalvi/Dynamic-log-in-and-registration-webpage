window.onload = function () {
  updateNavbar();
  const user = getLoggedInUser();
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("userName").textContent = user.name;
  document.getElementById("userEmail").textContent = user.email;
  document.getElementById("userUsername").textContent = user.username;
  document.getElementById("userAbout").textContent = user.about || "No info provided";
};

function logout() {
  logoutUser();
}

function deleteAccount() {
  if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

  const loggedInUser = getLoggedInUser();
  let localUsers = JSON.parse(localStorage.getItem("users")) || [];
  
  // Remove user from localStorage users
  localUsers = localUsers.filter(u => u.username !== loggedInUser.username);
  localStorage.setItem("users", JSON.stringify(localUsers));

  // Remove logged-in user
  localStorage.removeItem("loggedInUser");
  updateNavbar();

  alert("Your account has been deleted successfully!");
  window.location.href = "index.html";
}