"use strict";
var core_1 = require("@angular/core");
var store_1 = require("./../../store");
var ng2_redux_1 = require("ng2-redux");
var AppComponent = (function () {
    function AppComponent(redux) {
        this.redux = redux;
        redux.provideStore(store_1.store);
    }
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "main",
            template: "<page-router-outlet></page-router-outlet>"
        }), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=index.js.map