document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const registerButton = document.getElementById("registerButton");

  registerButton.addEventListener("click", async (event) => {
    event.preventDefault(); // prevent page reload

    const userData = {
      firstName: document.getElementById("fNameInput").value.trim(),
      lastName: document.getElementById("lNameInput").value.trim(),
      email: document.getElementById("emailInput").value.trim(),
      username: document.getElementById("usernameInput").value.trim(),
      password: document.getElementById("passwordInput").value.trim(),
    };

    // Send to backend
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    alert(result.message);
  });
});