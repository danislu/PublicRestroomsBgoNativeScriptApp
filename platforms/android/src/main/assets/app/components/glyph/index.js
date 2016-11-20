"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Glyph = (function () {
    function Glyph() {
    }
    return Glyph;
}());
exports.Glyph = Glyph;
var GlyphComponent = (function () {
    function GlyphComponent(router) {
        this.router = router;
        this.firstName = "John";
        this.lastName = "Doe";
        this.glyphs = [];
        var charCode = 5000;
        for (; charCode <= 5500; charCode++) {
            var glyph = new Glyph();
            glyph.icon = String.fromCharCode(charCode);
            glyph.code = charCode.toString(16);
            this.addGlyph(glyph);
        }
    }
    GlyphComponent.prototype.addGlyph = function (glyph) {
        this.glyphs.push(glyph);
    };
    GlyphComponent.prototype.click = function () {
        this.router.navigate(["/map"]);
    };
    GlyphComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "glyph",
            templateUrl: "./index.html",
            styleUrls: ["./index.css"]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], GlyphComponent);
    return GlyphComponent;
}());
exports.GlyphComponent = GlyphComponent;
//# sourceMappingURL=index.js.map