let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");

document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("username", username.value.trim());
    localStorage.setItem("email", email.value.trim());
    localStorage.setItem("password", password.value);
    setTimeout(() => {
        window.location = "login.html";
    }, 1000)
})