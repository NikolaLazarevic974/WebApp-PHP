function addToCart(id, brand, name, type, price, image_path, description) {
    let data = {
        id: id,
        brand: brand,
        name: name,
        type: type,
        price: price,
        image_path: image_path,
        description: description,
        quantity: 1
    };

    let currentState = JSON.parse(localStorage.getItem(localStorageConstants.cart));

    if (currentState) {
        currentState = changeState(currentState, data);
        localStorage.setItem(localStorageConstants.cart, JSON.stringify(currentState));
    } else {
        let cartData = {
            items: [data]
        }

        localStorage.setItem(localStorageConstants.cart, JSON.stringify(cartData));
    }

    showCartNotification();
    getCart("#cart-panel");

    toastr.remove();
    toastr.success("Cart is updated!");
}

function removeFromCart(id) {
    let currentState = JSON.parse(localStorage.getItem(localStorageConstants.cart));

    if (currentState) {
        for (let i = 0; i < currentState.items.length; i++) {
            if (currentState.items[i].id === id) {
                let currentQuantity = currentState.items[i].quantity;

                if (currentQuantity <= 1) {
                    currentState.items.splice(i, 1);
                } else {
                    currentState.items[i].quantity = currentQuantity - 1;
                }
            }
        }
    }

    localStorage.setItem(localStorageConstants.cart, JSON.stringify(currentState));

    showCartNotification();
    getCart("#cart-panel");

    toastr.remove();
    toastr.success("Cart is updated!");
}

function renderCard(data, panel) {
    if (data.length > 0) {
        $.each(data, function (i, item) {
            console.log(item);
            $(panel).append(
                '<div class="col-md-4">' +
                '<div class="card">' +
                '<img src="' + item.image_path + '" style="height: 350px; overflow: hidden; object-fit: cover;" alt="...">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + item.name + ' ( ' + item.price + ' €)' + '</h5>' +
                '<p class="card-text"> ' + item.type + ' - ' + item.brand + ' </p>' +
                '<div class="d-flex justify-content-between">' +
                '<button class="btn btn-danger add-article" data-id="' + item.id + '" data-brand="' + item.brand + '" data-name="' + item.name + '" data-type="' + item.type + '" data-price="' + item.price + '" data-image-path="' + item.image_path + '">+</button>' +
                '<button class="btn btn-light quantity" id="quantity-button-' + item.id + '">' + checkQuantity(item.id) + '</button>' +
                '<button class="btn btn-dark remove-article" data-id="' + item.id + '">-</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });

        $(panel).fadeIn("slow");
    }
}


function totalPrice() {
    let currentState = JSON.parse(localStorage.getItem(localStorageConstants.cart));
    let totalPrice = 0;

    if (currentState && currentState.items && currentState.items.length > 0) {
        for (let i = 0; i < currentState.items.length; i++) {
            totalPrice = totalPrice + (currentState.items[i].price * currentState.items[i].quantity);
        }
    }

    $("#checkout-button").empty();
    $("#checkout-button").html("Checkout - " + totalPrice.toFixed(2) + " €");
}

function getAllArticles(panel) {
    $.get("/articleListApi", function (response) {
        let jsonResponse = JSON.parse(response);

        renderCard(jsonResponse, panel);
    });
}

function getCart(panel) {
    $(panel).empty();
    $(panel).hide();

    let currentState = JSON.parse(localStorage.getItem(localStorageConstants.cart));
    console.log(currentState);

    if (currentState && currentState.items && currentState.items.length > 0) {
        renderCard(currentState.items, panel);
    } else {
        if (window.location.pathname === "/cart") {
            window.location.href = "/noItemsInCart";
        }
    }

    totalPrice();
}

function changeState(currentState, data) {
    let addNewItem = true;

    for (let i = 0; i < currentState.items.length; i++) {
        if (currentState.items[i].id === data.id) {
            let currentQuantity = currentState.items[i].quantity;

            currentState.items[i] = data;

            currentState.items[i].quantity = currentQuantity + 1;

            addNewItem = false;
        }
    }

    if (addNewItem) {
        currentState.items.push(data);
    }

    return currentState;
}

function checkQuantity(id) {
    let currentState = JSON.parse(localStorage.getItem(localStorageConstants.cart));
    let quantity = 0;

    if (currentState) {
        for (let i = 0; i < currentState.items.length; i++) {
            if (currentState.items[i].id == id) {
                quantity = currentState.items[i].quantity;
            }
        }
    }

    return quantity;
}

function showCartNotification() {
    let currentState = JSON.parse(localStorage.getItem(localStorageConstants.cart));

    if (currentState && currentState.items && currentState.items.length > 0) {
        $("#shopping-cart").addClass("notification bg-primary rounded-circle");
    } else {
        $("#shopping-cart").removeClass("notification bg-primary rounded-circle");
    }
}

function saveCart() {
    let currentState = JSON.parse(localStorage.getItem(localStorageConstants.cart));
    let totalPrice = 0;

    if (currentState && currentState.items && currentState.items.length > 0) {
        for (let i = 0; i < currentState.items.length; i++) {
            totalPrice = totalPrice + (currentState.items[i].price * currentState.items[i].quantity);
        }

        let data = {
            total_price: totalPrice,
            cart: currentState
        }

        $.post("/cartPost", data, function () {
            toastr.success("Successfully completed order!")
            localStorage.removeItem(localStorageConstants.cart);

            setTimeout(function (){
                window.location.href = "/";
            }, 5000);
        });
    }
}


function createGraph(setData, graph, chartType, options){
    new Chart(graph, {
        type: chartType,
        data: setData,
        options: options
    });
}
