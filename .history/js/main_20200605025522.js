if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

//initial add to listener//

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('removItem')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('add-to-cart')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    document.getElementsByClassName('add-products')[0].addEventListener('click', addItemToList)
    document.getElementById('message').addEventListener('click', contactMSG)
    document.getElementById('checkout').addEventListener('click', checkOut)



    $(document).ready(function() {
        $(this).scrollTop(0);
    });

}
/////////////////////////FUNCTIOS/////////////////////////////////


function checkOut() {
    $('#checkout').attr("data-dismiss", "modal");
    alert("Merci Pour Votre Achat...")

    ready();
}

function contactMSG() {
    alert('Merci... Notre équipe vous contactera dans les plus brefs délais..');
}

function showCartIcon() {
    document.getElementById("cart").style.display = "flex";

}

function hideCartIcon() {
    var car = document.getElementById('#cart')
    document.getElementById("cart").style.display = "none";
}

function rm() {
    var cart = $('#cart');
    var cartTotal = cart.attr('data-totalitems');
    var newCartTotal = parseInt(cartTotal) - 1;

    if (newCartTotal == 0) {
        hideCartIcon()
        setTimeout(function() {

            cart.addClass('shake').attr('data-totalitems', newCartTotal);

        })
    } else {
        setTimeout(function() {

            cart.addClass('shake').attr('data-totalitems', newCartTotal);

        })
    }
}

function rmpourch() {


    var cart = $('#cart');
    var cartTotal = cart.attr('data-totalitems');
    var newCartTotal = 0;

    setTimeout(function() {

        cart.addClass('shake').attr('data-totalitems', newCartTotal);

    })
    hideCartIcon()
}

function purchaseClicked() {
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
    rmpourch()

    function close() {
        var mod = document.getElementById('exampleModalLong')
        mod.style.display = "none";
    }
    close()

}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()

    rm()

}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function numberCart() {
    var a = $(this)
    let cart = $('#cart')
    var cartTotal = cart.attr('data-totalitems')

    var newCartTotal = parseInt(cartTotal) + 1;
    if (newCartTotal == 1) {
        showCartIcon()

        a.addClass('sendtocart')
        setTimeout(function() {
            a.removeClass('sendtocart')
            cart.addClass('shake').attr('data-totalitems', newCartTotal)
            setTimeout(function() {
                cart.removeClass('shake')
            }, 25)
        }, 35)
    } else {
        a.addClass('sendtocart')
        setTimeout(function() {
            a.removeClass('sendtocart')
            cart.addClass('shake').attr('data-totalitems', newCartTotal)
            setTimeout(function() {
                cart.removeClass('shake')
            }, 25)
        }, 35)
    }
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('title')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('pic-1')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
    numberCart()

}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    var cartItemPrice= document.getElementsByClassName('cart-quantity-input')
    for (let index = 0; index < cartItemNames.length; index++) {
        if (cartItemNames[index].innerText == title) {//vérification si produit existe déjà
            alert('This item is already added to the cart')
            cartItemPrice[index].value++
            updateCartTotal()
            cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
            return
             
        }
        
    }

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <i class="far removItem fa-trash-alt"></i>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('removItem')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

//Ajouter nouveau produit
function addItemToList() {
    var title = document.getElementById('name').value
    var price = document.getElementById('price').value

    function inputToURL(inputElement) {
        var file = inputElement.files[0];
        return window.URL.createObjectURL(file);
    }
    var imageSrc = inputToURL(document.getElementById('files'));

    var para = document.createElement('div')
    para.classList.add('col-md-3')
    para.classList.add('col-6')
    para.classList.add('col-sm-4')
    para.classList.add('pb-3')
    var list = document.getElementById('listproduct')

    var cartRowContents = `
   
        <div class="product-grid card">
         <div class="product-image">
                <img class="pic-1" src="${imageSrc}" >
        </div>
        <div class="product-content">
            <h3 class="title bolded">
                <p>${title} </p>
            </h3>
            <div class="price">
                <p class="price">$${price}</p>
            </div>
            <a class="add-to-cart btn btn-danger text-white">Ajouter</a>
        </div>
</div>`

    para.innerHTML = cartRowContents
    list.appendChild(para)
    alert("Vous avez ajouter un produit dans la liste de produits..")
        /*   document.getElementsByClassName('formName').reset()
           document.getElementsByClassName('formPrice').reset()
           document.getElementsByClassName('formPhoto').reset()*/
    var m = document.getElementById('add-product')
    m.reset()
    para.addEventListener('click', addToCartClicked)



}
/*move()

function move() {
    const element = document.getElementById('about');

    if (element) {
        window.scroll({
            top: element.scrollTop,
            behavior: 'smooth',
        })
    }
}*/