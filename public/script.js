var source = $('#card-template').html();
var template = Handlebars.compile(source)

$('.view-cart').on('click', function () {
  $(".shopping-cart").toggle();
});

// an array with all of our cart items
var cart = [];

var addItem = function (a, b) {
  var cartItem = {
    item: a,
    price: b
  };
  cart.push(cartItem);
}


var updateCart = function (price) {
  var totalPrice = 0;
// totalPrice inside the function, or the totalPrice will keep storing the price and adding it again
  $('.cart-list').empty();
  $('.total').empty();
  for (i = 0; i < cart.length; i++) {
    var newHTML = template(cart[i]);
    $('.cart-list').append(newHTML);
    totalPrice += cart[i].price;
   
  }
  $('.total').append(totalPrice);
//append after the for loop or it will append every time, so adding but not additionner
}

var clearCart = function () {
cart = [];
updateCart();
}


$('.add-to-cart').on('click', function () {
  var item = $(this).closest(".item").data().name
  var price = $(this).closest(".item").data().price

  addItem(item, price);
  updateCart(price);
});



$('.clear-cart').on('click', function () {
  clearCart();
});

// update the cart as soon as the page loads!
updateCart();
