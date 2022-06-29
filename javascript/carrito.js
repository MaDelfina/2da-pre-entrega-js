let carts = document.querySelectorAll('.btn-carritos');

let products = stock;

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function numeroCarrito() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCarts', JSON.stringify(cartItems))
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    console.log('costo final es', cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.precio);
    } else {
        localStorage.setItem('totalCost', product.precio);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCarts');
    cartItems = JSON.parse(cartItems);
    let productosConteiner = document.querySelector('.productos');
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if (cartItems && productosConteiner) {
        productosConteiner.innerHTML = '';
        Object.values(cartItems).map(item => {
            productosConteiner.innerHTML += `
            <div class="producto">
                <ion-icon name="close-outline"></ion-icon>
                <img src="../imagenes/bombachas/${item.img}jpeg">
                <span>${item.name}</span>
            </div>
            <div class="precio">$${item.precio},00</div>
            <div class="cantidad">
                <span>${item.inCarts}</span>
            </div>
            <div class="total">
                $${item.inCarts * item.precio},00
            </div>
            `;
        })
    }
}

numeroCarrito();
displayCart();