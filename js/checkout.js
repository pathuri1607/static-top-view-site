(function ($, window, document) {
    //console.log("checkout...");

    $('.invalid-feedback').hide();

    var cartCount = (sessionStorage.length == 0) ? 0 : sessionStorage.length - 1;
    $('.cart-count').text(cartCount);
    var total = 0;

    var cartJSON = {
        "cartItems" : []
    };

    for (var i = 0, len = sessionStorage.length; i < len; ++i) {
        var cartKey = sessionStorage.key(i);
        var cartItem = JSON.parse(sessionStorage.getItem(cartKey));
        //console.log(cartItem);

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
    //console.log(cartJSON);
    total = total.toFixed(2);
    var tpl = _.template($('.shopping-list-template').html());
    var tplString = tpl(cartJSON);
    //console.log(tplString);
    $('#cartItems').html(tplString);

    $('.total').html('<b>$'+total+'</b>');

    $('.cartTotal b').text(cartCount);
    //$('.cartTotal b').text($('#cartItems .cartItem').length);
    //$('.cart-count').text($('#cartItems .cartItem').length);

    $(".btnRemoveItem").click(function (e) {
        e.preventDefault();
        sessionStorage.removeItem($(e.currentTarget).data('product-id'));
        window.location.reload();
    });

    $("#orderplace").click(function (e) {
        e.preventDefault();

        var isErrors = true;

        $('.invalid-feedback').hide();

        if($('#fname').val() === "") {
            $('.invalid-feedback.fname').show();
            isErrors = false;
        } else {
            sessionStorage.setItem("fullName", $('#fname').val());
        }
        if($('#email').val() === "") {
            $('.invalid-feedback.email').show();
            isErrors = false;
        }
        if($('#adr').val() === "") {
            $('.invalid-feedback.adr').show();
            isErrors = false;
        }
        if($('#city').val() === "") {
            $('.invalid-feedback.city').show();
            isErrors = false;
        }
        if($('#state').val() === "") {
            $('.invalid-feedback.state').show();
            isErrors = false;
        }
        if($('#zip').val() === "") {
            $('.invalid-feedback.zip').show();
            isErrors = false;
        }

        if($('#cname').val() === "") {
            $('.invalid-feedback.cname').show();
            isErrors = false;
        }
        if($('#ccnum').val() === "") {
            $('.invalid-feedback.ccnum').show();
            isErrors = false;
        }
        if($('#expmonth').val() === "") {
            $('.invalid-feedback.expmonth').show();
            isErrors = false;
        }
        if($('#expyear').val() === "") {
            $('.invalid-feedback.expyear').show();
            isErrors = false;
        }
        if($('#cvv').val() === "") {
            $('.invalid-feedback.cvv').show();
            isErrors = false;
        }

        if(isErrors) {
            window.location.href = "successMsg.html";
        } else {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    })

}(window.jQuery, window, document));