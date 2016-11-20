"use strict";
var map_1 = require("./components/map");
var glyph_1 = require("./components/glyph");
var tab_1 = require("./components/tab");
exports.routes = [
    { path: "", component: glyph_1.GlyphComponent },
    { path: "map", component: map_1.MapComponent },
    { path: "tab", component: tab_1.TabComponent },
];
exports.navigatableComponents = [
    tab_1.TabComponent,
    map_1.MapComponent,
    glyph_1.GlyphComponent
];
//# sourceMappingURL=routing.js.map