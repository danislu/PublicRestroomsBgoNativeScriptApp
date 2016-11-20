"use strict";
var map_1 = require("./components/map");
var glyph_1 = require("./components/glyph");
var tab_1 = require("./components/tab");
var info_1 = require("./components/info");
exports.routes = [
    { path: "glyph", component: glyph_1.GlyphComponent },
    { path: "", component: map_1.MapComponent },
    { path: "tab", component: tab_1.TabComponent },
];
exports.navigatableComponents = [
    tab_1.TabComponent,
    map_1.MapComponent,
    glyph_1.GlyphComponent,
    info_1.InfoComponent
];
//# sourceMappingURL=routing.js.map