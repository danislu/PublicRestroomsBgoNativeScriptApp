"use strict";
var actionTypes = require("./actiontypes");
var core_1 = require("@angular/core");
var ng2_redux_1 = require("ng2-redux");
var http_1 = require("@angular/http");
var MapActions = (function () {
    function MapActions(ngRedux, http) {
        this.ngRedux = ngRedux;
        this.http = http;
        this.init();
    }
    MapActions.prototype.init = function () {
        this.getMarkers();
    };
    MapActions.prototype.centerOnDevice = function () {
        this.isLoadingChanged(true);
        /*Geolocation.getCurrentPosition()
            .then((pos: any) => this.centerChanged({lat: pos.coords.latitude, lng: pos.coords.longitude }))
            .then(() => this.isLoadingChanged(false));*/
    };
    MapActions.prototype.isLoadingChanged = function (loading) {
        return this.ngRedux.dispatch({
            type: actionTypes.IS_LOADING_POS,
            payload: loading
        });
    };
    MapActions.prototype.centerChanged = function (center) {
        return this.ngRedux.dispatch({
            type: actionTypes.CHANGE_CENTER,
            payload: center
        });
    };
    MapActions.prototype.zoomChanged = function (zoom) {
        return this.ngRedux.dispatch({
            type: actionTypes.CHANGE_ZOOM,
            payload: zoom
        });
    };
    MapActions.prototype.clearMarkers = function () {
        return this.ngRedux.dispatch({
            type: actionTypes.CLEAR_MARKERS
        });
    };
    MapActions.prototype.addMarker = function (marker) {
        console.log("addMarker " + marker);
        return this.ngRedux.dispatch({
            type: actionTypes.ADD_MARKER,
            payload: marker
        });
    };
    MapActions.prototype.getMarkers = function () {
        var _this = this;
        var url = "https://dl.dropboxusercontent.com/u/17093134/dokart.json";
        fetch(url)
            .then(function (response) { return response.json(); })
            .then(function (data) { return data.entries; })
            .then(function (entries) { return entries.map(function (e) { return _this.createMarker(e); }); })
            .then(function (markers) {
            _this.clearMarkers();
            markers.forEach(function (m) { return _this.addMarker(m); });
        })
            .catch(function (error) { return _this.ngRedux.dispatch({
            type: "ERROR",
            message: error
        }); })
            .then(function () { return _this.ngRedux.dispatch({
            type: actionTypes.INIT_UPDATE,
            payload: {
                done: true
            }
        }); });
    };
    MapActions.prototype.createMarker = function (dass) {
        return {
            pos: {
                lat: parseFloat(dass.latitude),
                lng: parseFloat(dass.longitude)
            },
            //icon: 'https://dl.dropboxusercontent.com/u/17093134/restroom.png',
            content: dass.plassering + "\n* Pris: " + (dass.pris === "NULL" ? "Gratis" : dass.pris + " kr") + "\n" + (dass.pissoir_only !== "NULL" ? "* Bare pissoir" : "") + "\n" + (dass.stellerom !== "NULL" ? "* Har stellerom" : "") + "\n" + (dass.rullestol !== "NULL" ? "* Rullestol tilgang" : "")
        };
    };
    MapActions = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux, http_1.Http])
    ], MapActions);
    return MapActions;
}());
exports.MapActions = MapActions;
//# sourceMappingURL=map.actions.js.map