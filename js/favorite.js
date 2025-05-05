let productsFavorite = JSON.parse(localStorage.getItem("productsFavorite")) || [];

function removeFromFavorite(id) {
    productsFavorite = productsFavorite.filter(e => e.id !== id);
    localStorage.setItem("productsFavorite", JSON.stringify(productsFavorite));
    console.log(productsFavorite.length);
    drowFavorite();
}

function drowFavorite() {
    if (productsFavorite.length > 0) {
        document.querySelector(".section-home").style.display = "none";
    } else {
        document.querySelector(".section-home").style.display = "block";
    }

    let favoriteProductsDom = document.querySelector(".favorite-products");
    let productsFavoriteUI = productsFavorite.map(item => {
        return `
            <div class="product-item">
                <img class="product-item-img" src="${item.imgUrl}" alt="img">
                <div class="product-item-desc">
                    <h3>${item.name}</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Iure laudantium tenetur fugit sint consectetur non.</p>
                    <span>Size: ${item.size}</span>
                </div>
                <button onclick="removeFromFavorite(${item.id})">Remove From Favarites</button>
            </div>
        `;
    });
    favoriteProductsDom.innerHTML = productsFavoriteUI.join("");
}

window.addEventListener("DOMContentLoaded", () => {
    drowFavorite();
});