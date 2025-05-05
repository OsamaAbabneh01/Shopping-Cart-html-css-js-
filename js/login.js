let email = document.getElementById("email");
let password = document.getElementById("password");
let message = document.querySelector(".message");

document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (email.value.trim() === localStorage.getItem("email") &&
        password.value === localStorage.getItem("password")) {
            localStorage.setItem("token", true);
            setTimeout(() => {
                window.location = "index.html";
            }, 1000);
    } else {
        message.innerHTML = "Wrong Credentials<br/>Invalid email or password";
        message.style.display = "block";
    }
});