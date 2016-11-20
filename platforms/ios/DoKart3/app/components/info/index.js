"use strict";
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var page_1 = require("ui/page");
var InfoComponent = (function () {
    function InfoComponent(params, page, vcRef) {
        var _this = this;
        this.params = params;
        this.page = page;
        this.vcRef = vcRef;
        page.on("shownModally", function () {
            console.log("InfoComponent ctor");
            _this.markerInfo = params.context;
        });
    }
    InfoComponent.prototype.onClose = function () {
        this.params.closeCallback();
    };
    InfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "info-modal",
            templateUrl: "./index.html"
        }), 
        __metadata('design:paramtypes', [dialogs_1.ModalDialogParams, page_1.Page, core_1.ViewContainerRef])
    ], InfoComponent);
    return InfoComponent;
}());
exports.InfoComponent = InfoComponent;
//# sourceMappingURL=index.js.map