"use strict";
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ng2_redux_1 = require("ng2-redux");
var actions_1 = require("./../../actions");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
var page_1 = require("ui/page");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var info_1 = require("./../info");
var element_registry_1 = require("nativescript-angular/element-registry");
// Important - must register MapView plugin in order to use in Angular templates
element_registry_1.registerElement("MapView", function () { return require("nativescript-google-maps-sdk").MapView; });
var style = require("./googlemapsstyle.json");
var MapComponent = (function () {
    function MapComponent(page, mapActions, modal, vcRef, resolver) {
        var _this = this;
        this.page = page;
        this.mapActions = mapActions;
        this.modal = modal;
        this.vcRef = vcRef;
        this.resolver = resolver;
        this.infoHtml = "";
        this.activeMarker = null;
        this.mapView = null;
        this.currentMarkers = [];
        this._pendingDispose = [];
        this.onMapReady = function ($event) {
            _this.mapView = $event.object;
            _this.mapView.setStyle(style);
            _this.markers.subscribe(function (markers) {
                markers.forEach(function (marker, idx) {
                    var m = new nativescript_google_maps_sdk_1.Marker();
                    m.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(marker.pos.lat, marker.pos.lng);
                    m.userData = { index: idx, info: marker.content };
                    _this.mapView.addMarker(m);
                });
            });
        };
        this.wait = function (milliSeconds) {
            return new Promise(function (resolve, reject) {
                return setTimeout(function () { return resolve(milliSeconds); }, milliSeconds);
            });
        };
        this.onMarkerSelect = function ($event) {
            var marker = $event.marker;
            var info = marker.userData.info;
            _this.showModal(info);
        };
        modal.registerViewContainerRef(this.vcRef);
        page.actionBarHidden = true;
        this.mapActions.getMarkers();
    }
    ;
    MapComponent.prototype.loadComponent = function (componentType) {
        var factory = this.resolver.resolveComponentFactory(componentType);
        var componentRef = this.vcRef.createComponent(factory, this.vcRef.length, this.vcRef.parentInjector);
        this._pendingDispose.push(componentRef);
        return Promise.resolve(componentRef);
    };
    MapComponent.prototype.dispose = function () {
        this.disposeComponents();
    };
    MapComponent.prototype.disposeComponents = function () {
        while (this._pendingDispose.length > 0) {
            var componentRef = this._pendingDispose.pop();
            componentRef.destroy();
        }
    };
    MapComponent.prototype.showModal = function (info) {
        var _this = this;
        console.log("showModal");
        this.loadComponent(info_1.InfoComponent)
            .then(function (ref) {
            var comp = ref.instance;
            var options = {
                context: info,
                fullscreen: false,
                viewContainerRef: comp.vcRef
            };
            return _this.modal.showModal(info_1.InfoComponent, options);
        })
            .then(function (res) { return console.log("done"); });
    };
    MapComponent.prototype.updateMapCenter = function (_a) {
        var latitude = _a.latitude, longitude = _a.longitude;
        this.mapView.latitude = latitude;
        this.mapView.longitude = longitude;
        this.mapView.updateCamera();
    };
    MapComponent.prototype.makeSnippetString = function (dass) {
        return dass.plassering + "\nPris: " + (dass.pris === "NULL" ? "Gratis" : dass.pris + " kr") + "\n" + (dass.pissoir_only !== "NULL" ? "* Bare pissoir" : "") + "\n" + (dass.stellerom !== "NULL" ? "* Har stellerom" : "") + "\n" + (dass.rullestol !== "NULL" ? "* Rullestol tilgang" : "");
    };
    MapComponent.prototype.makeSnippetHtmlString = function (dass) {
        return "<h2>" + dass.plassering + "</h2>\n            <ul>\n                <li>Pris: " + (dass.pris === "NULL" ? "Gratis" : dass.pris + " kr") + "</li>\n                " + (dass.pissoir_only !== "NULL" ? "<li>Bare pissoir</li>" : "") + "\n                " + (dass.stellerom !== "NULL" ? "<li>Har stellerom</li>" : "") + "\n                " + (dass.rullestol !== "NULL" ? "<li>Rullestol tilgang</li>" : "") + "\n            </ul>";
    };
    MapComponent.prototype.centerOnDevice = function () {
        this.mapActions.centerOnDevice();
    };
    MapComponent.prototype.removeClicked = function () {
        this.mapActions.clearMarkers();
    };
    MapComponent.prototype.centerChanged = function ($event) {
        this.mapActions.centerChanged($event);
    };
    MapComponent.prototype.zoomChanged = function ($event) {
        this.mapActions.zoomChanged($event);
    };
    MapComponent.entries = [
        info_1.InfoComponent
    ];
    MapComponent.exports = [
        info_1.InfoComponent
    ];
    __decorate([
        ng2_redux_1.select(function (state) { return state.map.zoom; }), 
        __metadata('design:type', rxjs_1.Observable)
    ], MapComponent.prototype, "zoom", void 0);
    __decorate([
        ng2_redux_1.select(function (state) { return state.map.center.lat; }), 
        __metadata('design:type', rxjs_1.Observable)
    ], MapComponent.prototype, "lat", void 0);
    __decorate([
        ng2_redux_1.select(function (state) { return state.map.center.lng; }), 
        __metadata('design:type', rxjs_1.Observable)
    ], MapComponent.prototype, "lng", void 0);
    __decorate([
        ng2_redux_1.select(function (state) { return state.map.markers; }), 
        __metadata('design:type', rxjs_1.Observable)
    ], MapComponent.prototype, "markers", void 0);
    __decorate([
        ng2_redux_1.select(function (state) { return state.map.isLoadingPosition; }), 
        __metadata('design:type', rxjs_1.Observable)
    ], MapComponent.prototype, "isLoadingPosition", void 0);
    MapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "map",
            templateUrl: "./view.html",
            entryComponents: [info_1.InfoComponent],
            providers: [dialogs_1.ModalDialogParams]
        }), 
        __metadata('design:paramtypes', [page_1.Page, actions_1.MapActions, dialogs_1.ModalDialogService, core_1.ViewContainerRef, core_1.ComponentFactoryResolver])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=index.js.map