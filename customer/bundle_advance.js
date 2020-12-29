console.log("bundle test");
if (typeof ot_bundlfy_checkJS == "undefined") {
	var ot_bundlfy_checkJS = 1;
	// Shop Name
	const ot_bundlfy_shopName = Shopify.shop;
	// Current product id
	var ot_bundlfy_productId = __st.rid;
	// Root Link
	var ot_bundlfy_rootLink = 'https://haolocal.omegatheme.com/omegashopifyapp/customer';

	var ot_bundlfy_settings;
	if (typeof $ == "undefined") {
		javascript: (function (e, s) {
			e.src = s;
			e.onload = function () {
				$ = jQuery.noConflict();
				ot_bundlfy_init();
			};
			document.head.appendChild(e);
		})(
			document.createElement("script"),
			"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
		);
	} else {
		ot_bundlfy_init();
	}

	async function ot_bundlfy_init() {
		ot_bundlfy_settings = await ot_bundlfy_getSettings();
		console.log(ot_bundlfy_settings);
		if (ot_bundlfy_settings) {
			if (ot_bundlfy_settings.enable_admin_mode == 0) {
				ot_bundlfy_loadFile();
			} else {
				if (typeof adminBarInjector != "undefined" && adminBarInjector) {
					ot_bundlfy_loadFile();
				}
			}
		}
	}

	function ot_bundlfy_loadFile() {
		$('head').append(`
			<link href="${ot_bundlfy_rootLink}/assets/css/bundle_advance.css?v=${ot_bundlfy_settings.v}" rel="stylesheet" type="text/css" media="all">
		`);
		Shopify.money_format = ot_bundlfy_settings.money_format;
		console.log("Shopify.money_format", Shopify.money_format);
		let currentUrl = window.location.href.split('/');
		if (currentUrl.indexOf('cart') > -1) {

			ot_bundlfy_getScript(`${ot_bundlfy_rootLink}/assets/js/cart.js?v=${ot_bundlfy_settings.v}`);
		}
		else if (currentUrl.indexOf('products') > -1) {
			console.log(ot_bundlfy_settings.v);
			ot_bundlfy_getScript(`${ot_bundlfy_rootLink}/assets/js/product.js?v=${ot_bundlfy_settings.v}`);
		}
		// if (currentUrl.indexOf('cart') == -1 && $(`form[action^="/cart"]`).length > 0) {
		//     $.getScript(`${ot_bundlfy_rootLink}/assets/js/ajaxCart.js?v=${ot_bundlfy_settings.v}`);
		// }
	}

	function ot_bundlfy_getSettings() {
		return new Promise(resolve => {
			$.ajax({
				url: `${ot_bundlfy_rootLink}/bundle_advance.php`,
				type: 'GET',
				data: {
					shop: Shopify.shop,
					action: 'checkExpiredAndGetSettings',
				},
				dataType: 'json',
				cache: true
			}).done(result => {
				if (!(result.expired)) {
					resolve(result.settings)
				} else {
					resolve(null)
				}
			})
		})
	}

	function ot_bundlfy_getScript(source, callback) {
		var script = document.createElement('script');
		var prior = document.getElementsByTagName('script')[0];
		script.async = 1;

		script.onload = script.onreadystatechange = function (_, isAbort) {
			if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
				script.onload = script.onreadystatechange = null;
				script = undefined;

				if (!isAbort) { if (callback) callback(); }
			}
		};

		script.src = source;
		prior.parentNode.insertBefore(script, prior);
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

	Shopify.ot_bundlfy_queue = [];

	Shopify.ot_bundlfy_moveAlong = function () {
		// If we still have requests in the queue, let's process the next one.
		if (Shopify.ot_bundlfy_queue.length) {
			var request = Shopify.ot_bundlfy_queue.shift();
			// pass the properties into addItem as well
			Shopify.ot_bundlfy_addItem(request.variantId, request.quantity, request.properties, Shopify.ot_bundlfy_moveAlong);
		}
		// If the queue is empty, we will execute the callback
		else {
			document.location.href = '/cart';
		}
	};

	// Create a new Shopify.addItem function that takes the 'properties' parameter
	Shopify.ot_bundlfy_addItem = function (id, qty, properties, callback) {
		var params = {
			quantity: qty,
			id: id
		};
		if (properties != false) {
			params.properties = properties;
		}
		$.ajax({
			type: 'POST',
			url: '/cart/add.js',
			dataType: 'json',
			data: params,
			success: function () {
				if (typeof callback === 'function') {
					callback();
				}
			},
			error: function () { }
		});
	}

	Shopify.ot_bundlfy_pustToQueue = function (variantID, quantity, properties) {
		Shopify.ot_bundlfy_queue.push({
			variantId: variantID,
			quantity: quantity,
			properties: properties ? properties : ''
		});
	}
}