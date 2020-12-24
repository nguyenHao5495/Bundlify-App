
if (typeof $ == "undefined") {
    javascript: (function (e, s) {
        e.src = s;
        e.onload = function () {
            $ = jQuery.noConflict();
            console.log("abc");
        };
        document.head.appendChild(e);
    })(
        document.createElement("script"),
        "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    );
} else {
    console.log("abc");
}