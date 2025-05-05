let allProducts = JSON.parse(localStorage.getItem("products"));
let productID = parseInt(localStorage.getItem("itemID"));

let item = allProducts.find(item => item.id === productID)

function drowProduct() {
    let itemDom = document.querySelector(".product-details");
    itemDom.innerHTML = `
        <img src="${item.imgUrl}">
        <h3 onclick="goToDetails(${item.id})">${item.name}</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Iure laudantium tenetur fugit sint consectetur non.</p>
        <span>Size: ${item.size}</span>
    `;
}

drowProduct();