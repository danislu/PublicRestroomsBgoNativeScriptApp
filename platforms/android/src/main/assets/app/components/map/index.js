"use strict";
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ng2_redux_1 = require("ng2-redux");
var actions_1 = require("./../../actions");
var nativescript_google_maps_sdk_1 = require("nativescript-google-maps-sdk");
/*
latitude="{{ latitude }}"
            longitude="{{ longitude }}"
            zoom="{{ zoom | async }}"
            bearing="{{ bearing }}"
            tilt="{{ tilt }}"
            padding="{{ padding }}"
            mapReady="onMapReady"
            markerSelect="onMarkerSelect"
            markerBeginDragging="onMarkerBeginDragging"
            markerEndDragging="onMarkerEndDragging"
            markerDrag="onMarkerDrag"
            cameraChanged="onCameraChanged"
 */
var element_registry_1 = require("nativescript-angular/element-registry");
// Important - must register MapView plugin in order to use in Angular templates
element_registry_1.registerElement("MapView", function () { return require("nativescript-google-maps-sdk").MapView; });
var style = require("./googlemapsstyle.json");
var MapComponent = (function () {
    function MapComponent(mapActions) {
        var _this = this;
        this.mapActions = mapActions;
        this.layout = "0,*";
        this.title = "hjhjhjhjhjhjh";
        this.mapView = null;
        this.currentMarkers = [];
        this.onMapReady = function ($event) {
            _this.mapView = $event.object;
            _this.mapView.setStyle(style);
            _this.markers.subscribe(function (markers) {
                markers.forEach(function (marker, idx) {
                    var m = new nativescript_google_maps_sdk_1.Marker();
                    m.position = nativescript_google_maps_sdk_1.Position.positionFromLatLng(marker.pos.lat, marker.pos.lng);
                    // m.snippet = marker.content;
                    /*
                    const icon = new Image();
                    icon.imageSource.loadFromResource('icon');
    
                    m.icon = icon;
                    */
                    m.title = "Marker";
                    m.snippet = marker.content;
                    m.userData = { index: idx };
                    _this.mapView.addMarker(m);
                });
            });
        };
        this.onMarkerSelect = function ($event) {
            // console.dir($event.marker);
            var marker = $event.marker;
            _this.mapView.ios.selectedMarker = marker.ios;
            // this.layout = "auto,*";
            // this.title = marker.userData;
            // console.log(marker.snippet);
            marker.showInfoWindow();
        };
        this.mapActions.getMarkers();
    }
    ;
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
            templateUrl: "./view.html"
        }), 
        __metadata('design:paramtypes', [actions_1.MapActions])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=index.js.map