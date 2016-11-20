"use strict";
var map_1 = require("./components/map");
var name_1 = require('./components/name');
exports.routes = [
    { path: "", component: name_1.NameComponent },
    { path: "map", component: map_1.MapComponent }
];
exports.navigatableComponents = [
    map_1.MapComponent,
    name_1.NameComponent
];
//# sourceMappingURL=routing.js.map