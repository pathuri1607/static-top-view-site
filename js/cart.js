(function ($, window, document) {

    var cartCount = (sessionStorage.length == 0) ? 0 : sessionStorage.length - 1;
    $('.cart-count').text(cartCount);
    var total = 0;

    var cartJSON = {
        "cartItems" : []
    };

    for (var i = 0, len = sessionStorage.length; i < len; ++i) {
        var cartKey = sessionStorage.key(i);
        var cartItem = JSON.parse(sessionStorage.getItem(cartKey));

        if(cartItem.product && Object.keys(cartItem.product).length !== 0) {
            total += +cartItem.product.price;
            cartJSON.cartItems.push(cartItem.product);
        }

        if(cartItem.accessoryOne && Object.keys(cartItem.accessoryOne).length !== 0) {
            total +=  +cartItem.accessoryOne.price;
            cartJSON.cartItems.push(cartItem.accessoryOne);
        }
        if(cartItem.accessoryTwo && Object.keys(cartItem.accessoryTwo).length !== 0) {
            total +=  +cartItem.accessoryTwo.price;
            cartJSON.cartItems.push(cartItem.accessoryTwo);
        }
        if(cartItem.insurance && Object.keys(cartItem.insurance).length !== 0) {
            total +=  +cartItem.insurance.price;
            cartJSON.cartItems.push(cartItem.insurance);
        }
    }
    total = total.toFixed(2);
    var tpl = _.template($('.shopping-list-template').html());
    var tplString = tpl(cartJSON);
    $('#cartItems').html(tplString);

    $('.total').html('<b>$'+total+'</b>');

    $(".btnRemoveItem").click(function (e) {
        e.preventDefault();        
        sessionStorage.removeItem($(e.currentTarget).data('product-id'));
        window.location.reload();
    });

}(window.jQuery, window, document));