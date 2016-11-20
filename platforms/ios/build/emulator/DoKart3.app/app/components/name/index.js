"use strict";
var core_1 = require('@angular/core');
var router_1 = require("@angular/router");
var NameComponent = (function () {
    function NameComponent(router) {
        this.router = router;
        this.firstName = 'John';
        this.lastName = 'Doe';
    }
    NameComponent.prototype.click = function () {
        //alert(`${this.firstName} ${this.lastName}`);
        this.router.navigate(['/map']);
    };
    NameComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'nameit',
            templateUrl: './name.xml'
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], NameComponent);
    return NameComponent;
}());
exports.NameComponent = NameComponent;
//# sourceMappingURL=index.js.map