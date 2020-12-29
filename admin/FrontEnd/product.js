
let ot_bundlfy_mainClass = 'ot-bundlfy';
let ot_bundlfy_loader = ot_bundlfy_mainClass + '-loader';
let ot_bundlfy_msgClass = ot_bundlfy_mainClass + '-msg';
let ot_bundlfy_layoutInline = ot_bundlfy_mainClass + '-layout-inline';
let ot_bundlfy_layoutSeparateLine = ot_bundlfy_mainClass + '-layout-separate-line';
let ot_bundlfy_listProductsClass = ot_bundlfy_mainClass + '-list-products';
let ot_bundlfy_product = ot_bundlfy_mainClass + '-product';
let ot_bundlfy_product_img = ot_bundlfy_mainClass + '-product-img';
let ot_bundlfy_product_title = ot_bundlfy_mainClass + '-product-title';
let ot_bundlfy_product_price = ot_bundlfy_mainClass + '-product-price';
let ot_bundlfy_product_variants = ot_bundlfy_mainClass + '-product-variants';
let ot_bundlfy_product_select_variant = ot_bundlfy_mainClass + '-product-current-variant';
let ot_bundlfy_product_checkbox = ot_bundlfy_mainClass + '-product-checkbox';
let ot_bundlfy_product_plus = ot_bundlfy_mainClass + '-product-plus';
let ot_bundlfy_add_btn = ot_bundlfy_mainClass + '-add-btn';
let ot_bundlfy_product_clearBoth = ot_bundlfy_mainClass + '-clear-both';
let ot_bundlfy_bundles = [];


ot_bundlfy_products();
console.log('vao product:', ot_bundlfy_settings)
async function ot_bundlfy_products() {
    ot_bundlfy_createParentClass();
    ot_bundlfy_applyCss();
    ot_bundlfy_showLoadingSpinner();
    ot_bundlfy_bundles = await ot_bundlfy_getBundles();
    ot_bundlfy_hideLoadingSpinner();
    let i = 0;
    ot_bundlfy_bundles.forEach((bundle, index) => {
        i++;
        if (i <= ot_bundlfy_settings.max_bundles) {
            ot_bundlfy_displayBundle(bundle, index);
        }
    });
}
function ot_bundlfy_showLoadingSpinner() {

    $(`.${ot_bundlfy_mainClass}`).append(`
        <div class="${ot_bundlfy_loader}" style="text-align: center;">
            <div></div>
        </div>
    `);
}
function ot_bundlfy_hideLoadingSpinner() {
    $(`.${ot_bundlfy_mainClass} .${ot_bundlfy_loader}`).remove();
}
function ot_bundlfy_applyCss() {
    $('body').append(`
        <style>
            .${ot_bundlfy_mainClass} .${ot_bundlfy_msgClass} {
                font-size: ${ot_bundlfy_settings.title_text_size}px;
                color: ${ot_bundlfy_settings.title_text_color};
                background-color: ${ot_bundlfy_settings.title_background_color};
            }
            .${ot_bundlfy_mainClass} .${ot_bundlfy_add_btn} p {
                font-size: ${ot_bundlfy_settings.button_text_size}px;
                color: ${ot_bundlfy_settings.button_text_color};
                background-color: ${ot_bundlfy_settings.button_background_color};
            }
            .${ot_bundlfy_mainClass} .${ot_bundlfy_loader} div {
                border-top: 2px solid ${ot_bundlfy_settings.button_background_color};
            }
            ${ot_bundlfy_settings.custom_css}
        </style>
    `);
}
function ot_bundlfy_createParentClass() {
    if ($(`.${ot_bundlfy_mainClass}`).length == 0) {
        if (ot_bundlfy_settings.custom_position && ot_bundlfy_settings.custom_position != '') {
            $(`${ot_bundlfy_settings.custom_position}`).append(`
                <div class="${ot_bundlfy_mainClass}"></div>
            `);
        } else {
            $(`${ot_bundlfy_settings.position}`).append(`
                <div class="${ot_bundlfy_mainClass}"></div>
            `);
        }
    }
}
function ot_bundlfy_displayBundle(bundle, index) {
    let ot_bundlfy_currentClass = ot_bundlfy_mainClass + '-no-' + index;
    $(`.${ot_bundlfy_mainClass}`).append(`
        <div class="${ot_bundlfy_currentClass}" ot-bundle-id="${bundle.id}"></div>
    `);
    ot_bundlfy_displayMsg(ot_bundlfy_currentClass, bundle);
    ot_bundlfy_displayListProducts(ot_bundlfy_currentClass, bundle);
    ot_bundlfy_displayAddBtn(ot_bundlfy_currentClass, bundle);
    ot_bundlfy_displayDiscountPrice(bundle.id);
}
function ot_bundlfy_displayMsg(comboClass, bundle) {
    $(`.${comboClass}`).append(`
        <p class="${ot_bundlfy_msgClass}">${bundle.bundle_msg}</p>
    `);
}
function ot_bundlfy_displayListProducts(Class, bundle) {
    $(`.${Class}`).append(`
        <div class="${ot_bundlfy_listProductsClass} ${bundle.bundle_layout == 'inline' ? ot_bundlfy_layoutInline : ot_bundlfy_layoutSeparateLine}"></div>
    `);
    bundle.products.forEach((product, index) => {
        $(`.${Class} .${ot_bundlfy_listProductsClass}`).append(`
            <div class="${ot_bundlfy_product}" ot-product-id="${product.id}"></div>
        `);
        $(`.${Class} .${ot_bundlfy_listProductsClass} [ot-product-id="${product.id}"]`).append(`
            <div class="${ot_bundlfy_product_img}">
                <a target="_blank" href="${product.handle}" >
                    <img src="${product.image.src ? product.image.src : ''}" alt="${product.handle}">
                </a>
            </div>
        `);
        $(`.${Class} .${ot_bundlfy_listProductsClass} [ot-product-id="${product.id}"]`).append(`
            <div class="${ot_bundlfy_product_title}">
                <p title="${product.title}">${product.title}</p>
            </div>
        `);
        $(`.${Class} .${ot_bundlfy_listProductsClass} [ot-product-id="${product.id}"]`).append(`
            <div class="${ot_bundlfy_product_variants}">
                <select class="${ot_bundlfy_product_select_variant}" onchange="ot_bundlfy_updateVariantPrice(${bundle.id}, ${product.id})">
                </select>
            </div>
        `);
        product.variants.forEach(variant => {
            $(`.${Class} .${ot_bundlfy_listProductsClass} [ot-product-id="${product.id}"] .${ot_bundlfy_product_select_variant}`).append(`
                <option value="${variant.id}_${variant.price}_${product['product_quantity']}">${variant.title}</option>
            `);
        });
        if (product.variants.length <= 1) {
            $(`.${Class} .${ot_bundlfy_listProductsClass} [ot-product-id="${product.id}"] .${ot_bundlfy_product_select_variant}`).css("display", "none");
        }
        $(`.${Class} .${ot_bundlfy_listProductsClass} [ot-product-id="${product.id}"]`).append(`
            <div class="${ot_bundlfy_product_price}">
				<p><span class="money">${Shopify.formatMoney(product.variants[0].price * 100)}</span></p>
            </div>
        `);
        $(`.${Class} .${ot_bundlfy_listProductsClass} [ot-product-id="${product.id}"]`).append(`
            <div class="${ot_bundlfy_product_checkbox}">
                <input type="checkbox" onchange="ot_bundlfy_displayDiscountPrice(${bundle.id})" checked="checked"> 
            </div>
        `);
        $(`.${Class} .${ot_bundlfy_listProductsClass} [ot-product-id="${product.id}"]`).append(`
            <div class="${ot_bundlfy_product_clearBoth}"></div>
        `);
        if (index != 0) {
            $(`.${Class} .${ot_bundlfy_listProductsClass} [ot-product-id="${product.id}"]`).append(`
                <div class="${ot_bundlfy_product_plus}">
                    <img src="//cdn.shopify.com/s/files/1/0002/7728/2827/t/2/assets/ba-plus_38x.png?10643061042407540549" />
                </div>
            `);
        }
    });
}

function ot_bundlfy_displayAddBtn(comboClass, bundle) {
    $(`.${comboClass}`).append(`
        <div class="${ot_bundlfy_add_btn}">
            <p onclick="ot_bundlfy_addBundle(${bundle.id})">
                <span class="top">${ot_bundlfy_settings.button_text}</span>
                <span class="bottom"></span>
            </p>
        </div>
    `);
}
function ot_bundlfy_displayDiscountPrice(bundleId) {
    let bundle = ot_bundlfy_bundles.find(e => e.id == bundleId);
    let discountedPrice = ot_bundlfy_calculateDiscountPrice(bundle);
    let discountText = ot_bundlfy_settings.button_discount_text;
    if (ot_bundlfy_settings.typeRule == 0) {
        discountText = discountText.replace('{{discount}}', '<span class="money">' + Shopify.formatMoney(discountedPrice * 100) + '</span>');
    } else {
        discountText = discountText.replace('{{discount}}', '<span>' + discountedPrice + '%</span>');
    }

    $(`[ot-bundle-id=${bundleId}] .${ot_bundlfy_add_btn} .bottom`).html(discountText);
}
Shopify.formatMoney = function (cents, format) {
    if (typeof cents === 'string') {
        cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || this.money_format);

    function defaultOption(opt, def) {
        return (typeof opt == 'undefined' ? def : opt);
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal = defaultOption(decimal, '.');

        if (isNaN(number) || number == null) {
            return 0;
        }

        number = (number / 100.0).toFixed(precision);

        var parts = number.split('.'),
            dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
            cents = parts[1] ? (decimal + parts[1]) : '';

        return dollars + cents;
    }
    switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
    }
    return formatString.replace(placeholderRegex, value);
}
function ot_bundlfy_calculateDiscountPrice(bundle) {
    let totalPrice = 0;
    let numberOfProducts = 0;
    $(`[ot-bundle-id=${bundle.id}] .${ot_bundlfy_product_select_variant}`).each(function () {
        if ($(this).parent().parent().children(`.${ot_bundlfy_product_checkbox}`).children('input').is(':checked')) {
            let variantId_price_quantity = $(this).val();
            let data = variantId_price_quantity.split('_');
            let price = data[1];
            let quantity = data[2];
            totalPrice += Number(price) * Number(quantity);
            numberOfProducts += Number(quantity);
        }
    });
    let rule = bundle.rules.find(e => {
        return e.quantity == numberOfProducts;
    });
    let discountedPrice = 0;
    if (rule) {

        switch (rule.discount_type) {
            case "percent_off":
                discountedPrice = totalPrice * rule.amount / 100;
                break;
            case "fixed_price_off":
                if (totalPrice > rule.amount) {
                    discountedPrice = rule.amount;
                } else {
                    discountedPrice = totalPrice;
                }
                break;
            case "fixed_last_price":
                if (totalPrice > rule.amount) {
                    discountedPrice = totalPrice - rule.amount;
                } else {
                    discountedPrice = totalPrice;
                }
                break;
            default:
                break;
        }
    }
    if (ot_bundlfy_settings.typeRule == 1) {
        discountedPrice = (discountedPrice / totalPrice).toFixed(2) * 100;
    }
    return discountedPrice;
}
function ot_bundlfy_updateVariantPrice(bundleId, productId) {
    let variantId_price_quantity = $(`[ot-bundle-id=${bundleId}] [ot-product-id=${productId}] .${ot_bundlfy_product_select_variant}`).val();
    let price = variantId_price_quantity.split('_')[1];
    $(`[ot-bundle-id=${bundleId}] [ot-product-id=${productId}] .${ot_bundlfy_product_price} p`).text(Shopify.formatMoney(price * 100));
    ot_bundlfy_displayDiscountPrice(bundleId);
}
function ot_bundlfy_addBundle(bundleId) {
    let listSelectedVariants = $(`[ot-bundle-id=${bundleId}] .${ot_bundlfy_product_select_variant}`);

    listSelectedVariants.each((index, select) => {
        if ($(select).parent().parent().children(`.${ot_bundlfy_product_checkbox}`).children('input').is(':checked')) {
            let variantId_price_quantity = $(select).val();
            console.log(variantId_price_quantity);
            let data = variantId_price_quantity.split("_");
            let variantId = data[0];
            let quantity = data[2];
            Shopify.ot_bundlfy_pustToQueue(variantId, quantity);
        }
        if (index == (listSelectedVariants.length - 1)) {
            Shopify.ot_bundlfy_moveAlong();
        }
    });
}
function ot_bundlfy_getBundles() {
    return new Promise(resolve => {
        $.ajax({
            url: `${ot_bundlfy_rootLink}/customer/bundle_advance.php`,
            type: 'GET',
            data: {
                shop: Shopify.shop,
                action: 'getBundles',
                productId: ot_bundlfy_productId,
                customerId: __st.cid
            },
            dataType: 'json'
        }).done(result => {
            resolve(result);
        })
    })
}
