"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var store_1 = require("./store");
exports.store = store_1.store;
__export(require("./map"));
exports.GoogleMapsApi = {
    Keys: {
        Android: "AIzaSyAf28o-lSKrx64YnaiJks6zhP8tOl2fIq4",
        iOs: "AIzaSyBN_bNiILAlV0IM9apz3_oGzq8tg8kmOTQ",
        Js: "AIzaSyAguErZzGhpzaku0WHXpGB4Ce4JYmNWa-U"
    }
};
//ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyAf28o-lSKrx64YnaiJks6zhP8tOl2fIq4" --variable API_KEY_FOR_IOS="AIzaSyBN_bNiILAlV0IM9apz3_oGzq8tg8kmOTQ" --variable API_KEY_FOR_WEB="AIzaSyAguErZzGhpzaku0WHXpGB4Ce4JYmNWa-U" 
//# sourceMappingURL=index.js.map