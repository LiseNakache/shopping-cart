var source = $('#card-template').html();
var template = Handlebars.compile(source)

//click handlers
$('.view-cart').on('click', function () {
  $(".shopping-cart").toggle();
});

$('.cart-list').on('click', '.remove-item', function () {
  removeItem(this)
});

$('.clear-cart').on('click', function () {
  clearCart();
});


var cart = [];

var addItem = function (item, price) {
  var cartItem = {
    item: item,
    price: price,
    quantity: 1
  };

  var itemExist = false;

  if (cart.length === 0) {
    cart.push(cartItem);
  } else {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].item === item) {
        cart[i].quantity++;
        cart[i].price = price * (cart[i].quantity);
        itemExist = true;
      }
    }
    if (itemExist === false) {
      cartItem.quantity = 1;
      cart.push(cartItem);
    }
  }
}


var updateCart = function (price) {
  $('.cart-list').empty();
  $('.total').empty();

  for (i = 0; i < cart.length; i++) {
    var newHTML = template(cart[i]);
    $('.cart-list').append(newHTML);
  }
  _getTotal();
}


var _getTotal = function () {
  var total = 0;
  for (i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }
  // $('.total').empty()
  // $('.total').append(total); --> add a string and not a number

  $('.total').html(total);
}

var clearCart = function () {
  cart = [];
  updateCart();
}

var removeItem = function (btn) {
  //remove from the array
  var item = $(btn).closest('.cart-list');
  var specificItem = $(btn).closest('.item-template').find('p');
  var itemIndex = specificItem.index();
  cart.splice(itemIndex, 1);

  // remove from the page
  specificItem.remove()
  _getTotal();
}

$('.add-to-cart').on('click', function () {
  var item = $(this).closest(".item").data().name
  var price = $(this).closest(".item").data().price

  addItem(item, price);
  updateCart(price);


});

// update the cart as soon as the page loads!IMPORTANT FOR LOCAL STORAGE
updateCart();
