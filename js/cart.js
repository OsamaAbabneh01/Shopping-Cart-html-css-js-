let links = document.querySelector(".links");
let authenticatedUser = document.querySelector(".authenticated-user");
let usernameProfile = document.querySelector(".username-profile");
let badge = document.querySelector(".badge");
let cartIcon = document.querySelector(".fa-cart-shopping");
let cartProducts = document.querySelector(".cart-products");
let counter = 0;
let cartProductsList = [];
let products = [];

if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
}

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

function removeProductCartFromList(item) {
    let el = cartProductsList.find(e => e.name === item.name) 
    if (el && el.count > 1) {
        el.count--;
    } else {
        let index = cartProductsList.findIndex(e => e.name === item.name);
        cartProductsList.splice(index, 1);
    }
    localStorage.setItem("cartProductsList", JSON.stringify(cartProductsList));
    
    console.log(cartProductsList.length)
    if (cartProductsList.length === 0) {
        cartProducts.style.display = "none";
        badge.style.display = "none";
    }
}

function removeFromCart(id) {
    if (!localStorage.getItem("token")) {
        setTimeout(() => {
            window.location = "login.html";
        }, 500);
        return;
    }
    badge.style.display = "block";
    badge.innerHTML = --counter;
    if (counter === 0) {
        document.querySelector(".section-home").style.display = "block";
    }
    localStorage.setItem("counter", counter);
    let item = products.find(e => e.id === id);
    removeProductCartFromList(item);
    drowCartProducts();
    drowProducts();
}

function drowProducts() {
    let nameList = cartProductsList.map(item => item.name);
    products = products.filter(product => nameList.includes(product.name)); 

    let productsUI = products.map((item) => {
        let cartItem = cartProductsList.find(e => e.name === item.name);
        return `
            <div class="product-item">
                <img class="product-item-img" src="${item.imgUrl}" alt="img">
                <div class="product-item-desc">
                    <h3>${item.name}</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Iure laudantium tenetur fugit sint consectetur non.</p>
                    <span>Size: ${item.size}</span>
                </div>
                <button onclick="removeFromCart(${item.id})">Remove From Cart</button>
                <span class="count"> ${cartItem.count} </span>
            </div>
        `;
    });

    document.querySelector(".products").innerHTML = productsUI.join("");
}

drowProducts();

function drowCartProducts() {
    let cartProductsUI = cartProductsList.map((item) => {
        return `<li>${item.name} (${item.count})</li>`
    });
    document.querySelector(".cart-products").innerHTML = cartProductsUI.join("");
}

cartIcon.addEventListener("click", () => {
    if (counter === 0)
        return;
    let cartProducts = document.querySelector(".cart-products");
    if (cartProducts.style.display === "block") {
        cartProducts.style.display = "none";
    } else {
        cartProducts.style.display = "block";
    }
});

window.addEventListener("DOMContentLoaded", () => {
    if (counter > 0) {
        badge.style.display = "block";
        badge.innerHTML = counter;
        localStorage.setItem("counter", counter);
        drowCartProducts();
        document.querySelector(".section-home").style.display = "none";        
    }
});