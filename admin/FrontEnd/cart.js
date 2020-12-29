
let ot_bundlfy_discountPrice = 0;
let ot_bundlfy_cart;
ot_bundlfy_cartInit();
console.log("cart nhé");
async function ot_bundlfy_cartInit() {
    ot_bundlfy_cart = await ot_bundlfy_getCart();
    ot_bundlfy_discountPrice = await ot_bundlfy_createDiscountPrice();
    console.log(ot_bundlfy_discountPrice);
    if (ot_bundlfy_discountPrice > 0) {
        ot_bundlfy_displayDiscountPrice();
        let newAttribute = {
            "Source": ot_bundlfy_settings.order_tag
        };
        ot_bundlfy_updateCartAttribute(newAttribute);
    } else {
        let newAttribute = {
            "Source": ''
        };
        ot_bundlfy_updateCartAttribute(newAttribute);
    }
}

function ot_bundlfy_displayDiscountPrice() {
    let originalTotalPrice = Shopify.formatMoney(ot_bundlfy_cart.total_price);
    console.log(originalTotalPrice);
    if (ot_bundlfy_settings.total_price_class && ot_bundlfy_settings.total_price_class != '') {
        $(`${ot_bundlfy_settings.total_price_class}`).html(`
            <span class="ot-combo-cart__subtotal money" style="text-decoration: line-through">
                ${originalTotalPrice}
            </span>
        `);
    } else if ($(`:contains(${originalTotalPrice})`).length > 0 || !$(`:contains(${originalTotalPrice}):last`).is(':hidden')) {
        $(`:contains(${originalTotalPrice}):last`).html(`
            <span class="ot-combo-cart__subtotal money" style="text-decoration: line-through">
                ${originalTotalPrice}
            </span>
        `);
    } else {
        $(`.cart__subtotal`).html(`
            <span class="ot-combo-cart__subtotal money" style="text-decoration: line-through">
                ${originalTotalPrice}
            </span>
        `);
    }

    if ($('.ot-combo-cart__subtotal').length > 0) {
        let newTotalPrice = Shopify.formatMoney(ot_bundlfy_cart.total_price - ot_bundlfy_discountPrice);
        $('.ot-combo-cart__subtotal')
            .parent()
            .append(`
                <span class="ot-combo-cart__discounted-price money" style="display: block;">
                    ${newTotalPrice}
                </span>
            `);
    }
    //OT_03a5ea41763778bc
}

$("#checkout_new").on('click', function (e) {
    if (ot_bundlfy_discountPrice > 0) {
        console.log("checkout");
        e.preventDefault();
        ot_bundlfy_createDiscountCode(ot_bundlfy_discountPrice)
            .then(discountCode => {
                console.log(discountCode);
                if (discountCode && discountCode.code) {
                    window.location = `/checkout.json?discount=${discountCode.code}`;
                }
            });
        return false;
    }
});

// ----------- Api ------------

function ot_bundlfy_createDiscountPrice() {
    return new Promise(resolve => {
        $.ajax({
            url: `${ot_bundlfy_rootLink}/customer/bundle_advance.php`,
            type: 'POST',
            data: {
                shop: Shopify.shop,
                action: 'createDiscountPrice',
                cart: ot_bundlfy_cart,
                customerId: __st.cid
            },
            dataType: 'json'
        }).done(result => {
            resolve(result);
        });
    });
}

function ot_bundlfy_createDiscountCode(discountPrice) {
    return new Promise(resolve => {
        $.ajax({
            url: `${ot_bundlfy_rootLink}/customer/bundle_advance.php`,
            type: 'POST',
            data: {
                shop: Shopify.shop,
                action: 'createDiscountCode',
                discountPrice: discountPrice / 100,
            },
            dataType: 'json'
        }).done(result => {
            resolve(result);
        });
    });
}

function ot_bundlfy_getCart() {
    return new Promise(resolve => {
        $.ajax({
            url: `/cart.js`,
            type: 'GET',
            dataType: 'json'
        }).done(result => {
            let data = {};
            data.total_price = result.total_price;
            data.items = result.items.map(item => {
                let reducedItem = {
                    product_id: item.product_id,
                    original_price: item.original_price,
                    line_price: item.line_price,
                    quantity: item.quantity,
                    variant_id: item.variant_id
                }
                return reducedItem;
            });
            resolve(data);
        });
    });
}

function ot_bundlfy_updateCartAttribute(attributes) {
    $.ajax({
        type: 'POST',
        url: '/cart/update.js',
        dataType: 'json',
        data: {
            attributes: attributes
        }
    });
}

// ---------End Api -----------