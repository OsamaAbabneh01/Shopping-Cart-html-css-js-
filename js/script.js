let links = document.querySelector(".links");
let authenticatedUser = document.querySelector(".authenticated-user");
let usernameProfile = document.querySelector(".username-profile");
let badge = document.querySelector(".badge");
let cartIcon = document.querySelector(".fa-cart-shopping");
let counter = 0;
let cartProductsList = [];
let products = [
    {
        id: 1,
        name: "Blender",
        size: "small",
        imgUrl: "./images/img01.webp"
    },
    {
        id: 2,
        name: "Device Stand",
        size: "large",
        imgUrl: "./images/img02.avif"
    },
    {
        id: 3,
        name: "Electric Kettle",
        size: "medium",
        imgUrl: "./images/img03.webp"
    },
    {
        id: 4,
        name: "Space Heater",
        size: "small",
        imgUrl: "./images/img04.jpg"
    },
    {
        id: 5,
        name: "Bicycle",
        size: "small",
        imgUrl: "./images/img05.jpg"
    },
    {
        id: 6,
        name: "Motor",
        size: "small",
        imgUrl: "./images/img06.webp"
    },
    {
        id: 7,
        name: "Labtop",
        size: "small",
        imgUrl: "./images/img07.webp"
    },
    {
        id: 8,
        name: "Drill",
        size: "small",
        imgUrl: "./images/img08.jpg"
    }
];

localStorage.setItem("products", JSON.stringify(products));

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

function addProductCartToList(item) {
    let el;
    if (el = cartProductsList.find(e => e.name === item.name)) {
        el.count++;
    } else {
        cartProductsList.push({ name: item.name, count: 1 });
    }
    localStorage.setItem("cartProductsList", JSON.stringify(cartProductsList));
}

function addToCart(id) {
    if (!localStorage.getItem("token")) {
        setTimeout(() => {
            window.location = "login.html";
        }, 500);
        return;
    }
    badge.style.display = "block";
    badge.innerHTML = ++counter;
    localStorage.setItem("counter", counter);
    let item = products.find(e => e.id === id);
    addProductCartToList(item);
    drowCartProducts();
}

function goToDetails(id) {
    localStorage.setItem("itemID", id);
    window.location = "details.html";
}

function heartColoring() {
    let productsFavorite = JSON.parse(localStorage.getItem("productsFavorite")) || [];
    icons = document.querySelectorAll(".fa-heart") || [];
    icons.forEach((element, index) => {
        if (productsFavorite.some(e => e.id === products[index].id)) {
            element.style.color = "red";
        }
    });
}

function addToFavorite(id, icon) {
    let productsFavorite = JSON.parse(localStorage.getItem("productsFavorite")) || [];
    if (productsFavorite.some(e => e.id === id)) {
        productsFavorite = productsFavorite.filter(item => item.id !== id);
        localStorage.setItem("productsFavorite", JSON.stringify(productsFavorite));
        icon.style.color = "rgb(197, 192, 192)";        
    } else {
        let item = products.find(e => e.id === id);
        productsFavorite.push(item);
        localStorage.setItem("productsFavorite", JSON.stringify(productsFavorite));
        icon.style.color = "red";
    }
}

function drowProducts(allProducts = []) {
    let productsUI = allProducts.map((item) => {
        return `
            <div class="product-item">
                <img class="product-item-img" src="${item.imgUrl}" alt="img">
                <div class="product-item-desc">
                    <h3 onclick="goToDetails(${item.id})">${item.name}</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Iure laudantium tenetur fugit sint consectetur non.</p>
                    <span>Size: ${item.size}</span>
                </div>
                <button onclick="addToCart(${item.id})">Add To Cart</button>
                <i class="fa-solid fa-heart" onclick="addToFavorite(${item.id}, this)"></i>
            </div>
        `;
    });

    document.querySelector(".products").innerHTML = productsUI.join("");
    heartColoring();
}

drowProducts(products);

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

function search(name, arr) {
    let item = arr.filter(e => e.name.toLowerCase().includes(name.toLowerCase().trim()));
    return item;
}

document.getElementById("search").addEventListener("keyup", (e) => {
    let items = search(e.target.value.trim(), products);
    if(items.length === 0) {
        drowProducts(products);
    } else {
        drowProducts(items);
    }
});

