(function ($, window, document) {

    //$('.cart-count').text(sessionStorage.getItem("cartItems"));
    
    var productJSON = {
        "products": [
            {
                "id": 1,
                "name": "Adult Male Bike",
                "price": 20.50,
                "image": "img/adult_male_bike.jpeg",
                "product_type": "bike"
            },
            {
                "id": 2,
                "name": "Adult Female Bike",
                "price": 20.50,
                "image": "img/adult_female_bike.jpeg",
                "product_type": "bike"
            },
            {
                "id": 3,
                "name": "Kids Unisex Bike",
                "price": 12.75,
                "image": "img/kids_unisex_bike.jpeg",
                "product_type": "bike"
            },
            {
                "id": 4,
                "name": "Adult Unisex Helmet",
                "price": 4.00,
                "image": "img/adult_unisex_helmet.jpeg",
                "product_type": "accessory"
            },
            {
                "id": 5,
                "name": "Kids Unisex Helmet",
                "price": 3.50,
                "image": "img/kids_unisex_helmet.jpeg",
                "product_type": "accessory"
            },
            {
                "id": 6,
                "name": "Insurance",
                "price": 9.99,
                "image": "img/protection_plan.jpeg",
                "product_type": "addon"
            }
        ]
    };

    var tpl = _.template($('.products-list-template').html());
    var tplString = tpl(productJSON);
    $('#products').html(tplString);

    var $filters = $('.filter [data-filter]'),
        $boxes = $('#products [data-cat]');

    $filters.on('click', function (e) {
        e.preventDefault();
        var $this = $(this);

        $filters.removeClass('btn-danger');
        $this.addClass('btn-danger');

        var $filterColor = $this.attr('data-filter');

        if ($filterColor == 'all') {
            $boxes.removeClass('is-animated').fadeOut().promise().done(function () {
                $boxes.addClass('is-animated').fadeIn();
            });
        } else {
            $boxes.removeClass('is-animated').fadeOut().promise().done(function () {
                $boxes.filter(function (i, el) {
                    return el.dataset.cat.split(',').indexOf($filterColor) !== -1;
                })
                    .addClass('is-animated').fadeIn();
            });
        }
    });


    $('#myModal').on('show.bs.modal', function (e) {
        var prodName = $(e.relatedTarget).data('product-name');
        $(e.currentTarget).find('#bikeId').val($(e.relatedTarget).data('product-id'));
        $(e.currentTarget).find('#bikeName').val($(e.relatedTarget).data('product-name'));
        $(e.currentTarget).find('#bikePrice').val($(e.relatedTarget).data('product-price'));
        $(e.currentTarget).find('#bikeImage').val($(e.relatedTarget).data('product-image'));

        $(e.currentTarget).find('#exampleModalLongTitle').text(prodName);
        $('.invalid-feedback, .valid-feedback').hide();
        $("#bookNowForm").get(0).reset();
    });

    /*$('form[id="bookNowForm"]').validate({
        submitHandler: function (form) {
            form.submit();
        }
    });*/

    $("#btnAdd2Card").click(function (event) {
        var productObj = {
            product: {},
            accessoryOne: {},
            accessoryTwo: {},
            insurance: {}
        };
        var cartItems = 0;
        var form = $("#bookNowForm");
        var isDateValid = isTimeValid = false;

        if (form[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        $('.invalid-feedback, .valid-feedback').hide();

        var selectedDate = $('#chooseDate').val();
        var selectedTime = $('#chooseTime').val();

        if (selectedDate.length < 1) {
            $('.chooseDate .invalid-feedback').show();
        } else {
            var dateMMDDYYYRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
            if (dateMMDDYYYRegex.test(selectedDate)) {
                $('.chooseDate .valid-feedback').show();
                isDateValid = true;
            } else {
                $('.chooseDate .invalid-feedback').show();
            }
        }

        if(selectedTime.length < 1) {
            $('.chooseTime .invalid-feedback').show();
        } else {
            var timeHHMMRegex = /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/;
            if(timeHHMMRegex.test(selectedTime)) {
                $('.chooseTime .valid-feedback').show();
                isTimeValid = true;
            } else {
                $('.chooseTime .invalid-feedback').show();
            }
        }

        if(isDateValid && isTimeValid) {
            productObj["product"].id = $('#bikeId').val();
            productObj["product"].name = $('#bikeName').val();
            productObj["product"].image = $('#bikeImage').val();
            productObj["product"].price = $('#bikePrice').val();
            productObj["product"].selectedDate = selectedDate;
            productObj["product"].selectedTime = selectedTime;
            
            //sessionStorage.setItem("cartCount", sessionStorage.getItem("cartCount") + 1);
            ++cartItems;

            if($('#accessory-1').is(':checked')) {
                productObj["accessoryOne"].id = $('#accessory-1').is(':checked') ? "4" : "";
                productObj["accessoryOne"].name = $('#accessory-1').is(':checked') ? $('#accessory-1').val() : "";
                productObj["accessoryOne"].price = $('#accessory-1').is(':checked') ? "4.00" : "";
                productObj["accessoryOne"].image = $('#accessory-1').is(':checked') ? "img/kids_unisex_helmet.jpeg" : "";
                //sessionStorage.setItem("cartCount", sessionStorage.getItem("cartCount") + 1);
                ++cartItems;
            }

            if($('#accessory-2').is(':checked')) {
                productObj["accessoryTwo"].id = $('#accessory-2').is(':checked') ? "5" : "";
                productObj["accessoryTwo"].name = $('#accessory-2').is(':checked') ? $('#accessory-2').val() : "";
                productObj["accessoryTwo"].price = $('#accessory-2').is(':checked') ? "3.50" : "";
                productObj["accessoryTwo"].image = $('#accessory-2').is(':checked') ? "img/adult_unisex_helmet.jpeg" : "";
                //sessionStorage.setItem("cartCount", sessionStorage.getItem("cartCount") + 1);
                ++cartItems;
            }

            if($('#insurance').is(':checked')) {
                productObj["insurance"].id = $('#insurance').is(':checked') ? "6" : "";
                productObj["insurance"].name = $('#insurance').is(':checked') ? $('#insurance').val() : "";
                productObj["insurance"].price = $('#insurance').is(':checked') ? "9.99" : "";
                productObj["insurance"].image = $('#insurance').is(':checked') ? "img/protection_plan.jpeg" : "";
                //sessionStorage.setItem("cartCount", sessionStorage.getItem("cartCount") + 1);
                ++cartItems;
            }
            sessionStorage.setItem(productObj.product.id, JSON.stringify(productObj));

            setTimeout(function() {
                //$('.cart-count').text(sessionStorage.getItem("cartItems"));
                $('#myModal').modal('toggle');
                window.location.reload();
            }, 2000);
        }
    });

    $('#chooseDate').focusin(function() {
        $('.chooseDate .invalid-feedback').hide();
        $('.chooseDate .valid-feedback').hide();
        $(this).val("");
    });

    $('#chooseTime').focusin(function() {
        $('.chooseTime .invalid-feedback').hide();
        $('.chooseTime .valid-feedback').hide();
        $(this).val("");
    });


}(window.jQuery, window, document));
