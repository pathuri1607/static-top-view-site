(function ($, window, document) {

    $('.cart-count').text(localStorage.length);
    var total = 0;

    var cartJSON = {
        "cartItems" : []
    };

    for (var i = 0, len = localStorage.length; i < len; ++i) {
        var cartKey = localStorage.key(i);
        var cartItem = JSON.parse(localStorage.getItem(cartKey));
        cartJSON.cartItems.push(cartItem);
        total += +cartItem.price + +cartItem.accessoryOnePrice + +cartItem.accessoryTwoPrice + +cartItem.insurancePrice;
    }
    total = total.toFixed(2);
    var tpl = _.template($('.shopping-list-template').html());
    var tplString = tpl(cartJSON);
    $('#cartItems').html(tplString);

    $('.total').html('<b>$'+total+'</b>');

    $("#btnRemoveItem").click(function (e) {
        event.preventDefault();        
        localStorage.removeItem($(event.currentTarget).data('product-id'));
        window.location.reload();
    });

}(window.jQuery, window, document));