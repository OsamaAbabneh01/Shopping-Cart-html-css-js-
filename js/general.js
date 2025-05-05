let links = document.querySelector(".links");
let authenticatedUser = document.querySelector(".authenticated-user");
let usernameProfile = document.querySelector(".username-profile");
let badge = document.querySelector(".badge");
let cartIcon = document.querySelector(".fa-cart-shopping");
let counter = 0;
let cartProductsList = [];

if (localStorage.getItem("cartProductsList")) {
    cartProductsList = JSON.parse(localStorage.getItem("cartProductsList"));
}

if (localStorage.getItem("counter")) {
    counter = parseInt(localStorage.getItem("counter"));
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("token")) {
        links.style.display = "none";
        authenticatedUser.style.display = "flex";
        usernameProfile.innerHTML = localStorage.getItem("username");
    }
});

document.querySelector(".logout").addEventListener("click", () => {
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 1000);
});

function drowCartProducts() {
    let cartProductsUI = cartProductsList.map((item) => {
        return `<li>${item.name} (${item.count})</li>`
    });
    cartProductsUI.push('<button><a href="./cart.html">view all products</a></button>');
    document.querySelector(".cart-products").innerHTML = cartProductsUI.join("");
}

cartIcon.addEventListener("click", () => {
    let cartProducts = document.querySelector(".cart-products");
    if (cartProducts.style.display === "block") {
        cartProducts.style.display = "none";
    } else {
        cartProducts.style.display = "block";
    }
});

window.addEventListener("pageshow", () => {
    if (counter > 0) {
        badge.style.display = "block";
        badge.innerHTML = counter;
        localStorage.setItem("counter", counter);
        drowCartProducts();
    }
});